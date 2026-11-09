import { getFullConnectivityMapFromCircuitJson } from "circuit-json-to-connectivity-map"
import Flatbush from "flatbush"
import { createHash } from "node:crypto"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { checksGeometrySha256, convert, touches } from "./board-check-geometry"

const id = (r: any): string => r[`${r.type}_id`]
const round = (n: number) => Math.round(n * 1e6) / 1e6
export const isThrough = (v: any) => v.layers.includes("top") && v.layers.includes("bottom")

/** Add copper only on newly spanned layers. Never infer electrical identity from
 * physical contact: same-net exemptions use the schematic connectivity map. */
export function checkThroughVias(records: any[]) {
  const board = records.find(r => r.type === "pcb_board")
  if (!board) throw Error("Missing pcb_board")
  const stack = ["top", ...Array.from({length: board.num_layers - 2}, (_, i) => `inner${i + 1}`), "bottom"]
  const span = (v: any) => {
    const indices = v.layers.map((l: string) => stack.indexOf(l))
    if (indices.some((i: number) => i < 0)) throw Error(`Unknown layer on ${id(v)}`)
    return stack.slice(Math.min(...indices), Math.max(...indices) + 1)
  }
  const conn = getFullConnectivityMapFromCircuitJson(records)
  const netKey = (r: any) => conn.getNetConnectedToId(r.source_net_id ?? id(r)) ?? `unassigned:${id(r)}`
  const netNames = new Map<string, string[]>()
  for (const r of records.filter(r => r.type === "source_net")) {
    const key = netKey(r), names = netNames.get(key) ?? []
    if (!names.includes(r.name)) names.push(r.name); netNames.set(key, names)
  }
  const byId = new Map(records.map(r => [id(r), r]))
  const label = (r: any) => r.type === "pcb_trace" ? byId.get(r.source_trace_id)?.name ?? byId.get(r.source_trace_id)?.display_name ?? id(r)
    : r.type === "pcb_smtpad" || r.type === "pcb_plated_hole" ? `${byId.get(byId.get(r.pcb_port_id)?.source_port_id)?.name ?? id(r)} (${byId.get(byId.get(r.pcb_component_id)?.source_component_id)?.name ?? "pad"})`
    : byId.get(r.source_trace_id)?.display_name ?? id(r)
  const names = (r: any) => netNames.get(netKey(r)) ?? [netKey(r)]
  const vias = records.filter(r => r.type === "pcb_via")
  const nonThrough = vias.filter(v => !isThrough(v))
  const minimum = (type: string) => {
    const key = type === "pcb_trace" ? "min_trace_to_pad_edge_clearance" : "min_pad_edge_to_pad_edge_clearance"
    if (!Number.isFinite(board[key])) throw Error(`Missing board clearance: ${key}`)
    return board[key]
  }
  // Treat via copper as solid disks: another net inside the drilled area is also
  // unsafe. Pour holes are retained; they are intentional copper exclusions.
  const converted = convert(records, {elementTypes:["pcb_trace", "pcb_via", "pcb_smtpad", "pcb_plated_hole", "pcb_copper_pour"], includeDrillHoles:false, strict:true, curveTolerance:1e-6})
  const copper = converted.elements.flatMap((e: any) => e.shapes.map((shape: any) => ({...e, shape})))
  const byLayer = new Map<string, any>()
  for (const layer of stack) {
    const elements = copper.filter((e: any) => e.layer === layer)
    if (!elements.length) continue
    const index = new Flatbush(elements.length)
    for (const e of elements) { const b = e.shape.box; index.add(b.xmin, b.ymin, b.xmax, b.ymax) }
    index.finish(); byLayer.set(layer, {elements, index})
  }
  const viaShapes = new Map(copper.filter((e: any) => e.elementType === "pcb_via").map((e: any) => [e.elementId, e.shape]))
  const inventory = nonThrough.map(v => {
    const shape: any = viaShapes.get(id(v)), b = shape.box
    const conflicts = new Map<string, any>()
    const addedLayers = stack.filter(l => !span(v).includes(l))
    for (const layer of addedLayers) {
      const group = byLayer.get(layer)
      if (!group) continue
      const margin = Math.max(minimum("pcb_trace"), minimum("pcb_via"))
      for (const k of group.index.search(b.xmin-margin, b.ymin-margin, b.xmax+margin, b.ymax+margin)) {
        const other = group.elements[k], r = other.sourceElement
        if (netKey(v) === netKey(r)) continue
        const contact = touches(shape, other.shape)
        const gap = contact ? 0 : shape.distanceTo(other.shape)[0]
        const required = minimum(other.elementType)
        if (!contact && gap + 1e-6 >= required) continue
        const key = `${layer}:${other.elementId}`
        const finding = {layer, otherId:other.elementId, otherType:other.elementType, otherName:label(r), otherNets:names(r), kind:contact ? "short" : "clearance", gapMm:round(gap), minimumMm:required}
        if (!conflicts.has(key) || gap < conflicts.get(key).gapMm) conflicts.set(key, finding)
      }
    }
    return {id:id(v), name:label(v), nets:names(v), x:round(v.x), y:round(v.y), layers:span(v), addedLayers, conflicts:[...conflicts.values()]}
  })
  // Independently safe extensions may collide with one another on a layer that
  // neither currently occupies. Report these pairs before selecting a batch.
  const safe = inventory.filter(v => !v.conflicts.length)
  const simultaneousConflicts: any[] = []
  for (let i=0; i<safe.length; i++) for (let j=i+1; j<safe.length; j++) {
    const a = byId.get(safe[i].id), b = byId.get(safe[j].id)
    if (netKey(a) === netKey(b)) continue
    const gap = Math.hypot(a.x-b.x, a.y-b.y) - (a.outer_diameter+b.outer_diameter)/2
    if (gap + 1e-6 < minimum("pcb_via")) simultaneousConflicts.push({a:id(a), b:id(b), kind:gap <= 0 ? "short" : "clearance", gapMm:round(gap), minimumMm:minimum("pcb_via")})
  }
  const blocked = new Set(simultaneousConflicts.flatMap(p => [p.a, p.b]))
  const batchSafeIds = safe.filter(v => !blocked.has(v.id)).map(v => v.id)
  const shorting = inventory.filter(v => v.conflicts.some(c => c.kind === "short"))
  return {
    summary:{totalVias:vias.length, throughVias:vias.length-nonThrough.length, nonThroughVias:nonThrough.length, shortingConversions:shorting.length, clearanceOnlyConversions:inventory.filter(v=>v.conflicts.length && !shorting.includes(v)).length, conflictFreeConversions:safe.length, pourOnlyConflicts:inventory.filter(v=>v.conflicts.length && v.conflicts.every(c=>c.otherType==="pcb_copper_pour")).length, nonPourConflicts:inventory.filter(v=>v.conflicts.some(c=>c.otherType!=="pcb_copper_pour")).length, simultaneousConflictPairs:simultaneousConflicts.length, batchSafeConversions:batchSafeIds.length},
    rules:{copperToTraceMm:minimum("pcb_trace"), copperToPadViaPourMm:minimum("pcb_via"), viaDrillToDrillMm:board.min_via_hole_edge_to_via_hole_edge_clearance, platedDrillToDrillMm:board.min_plated_hole_drill_edge_to_drill_edge_clearance},
    scope:["Conflicts are other-net copper shorts or clearance violations only on newly spanned layers. Same-net copper contact is exempt.", "All trace segments, expanded via/PTH spans, rotated SMT/PTH pads, and pours with inner rings use installed native-check geometry.", "Pour copper uses the board pad-copper clearance; the source pour clearance is not serialized. Pours are checked as emitted, not automatically repoured.", "Batch-safe excludes both endpoints of any future via-via collision. Run native drill, continuity, clearance and Gerber checks on the resulting board.", "Existing-layer defects, NPTH spacing, board edges and same-net drill spacing are outside this conversion inventory; native/supplemental checks remain required.", "This is routing evidence, not fabrication or SI/PI qualification."],
    batchSafeIds, simultaneousConflicts, inventory,
  }
}

if (import.meta.main) {
  const args = process.argv.slice(2)
  const option = (name: string) => args.includes(name) ? args[args.indexOf(name)+1] : undefined
  const input = option("--json"), output = resolve(option("--output") ?? "work/through-vias/inventory")
  mkdirSync(output, {recursive:true})
  let records: any[]
  if (input) records = JSON.parse(readFileSync(input, "utf8"))
  else {
    const { Circuit } = await import("@tscircuit/core")
    const { default: Board } = await import("../index")
    const circuit = new Circuit({platform:{partsEngineDisabled:true, netlistDrcChecksDisabled:true}})
    circuit.schematicDisabled = true
    circuit.add(Board())
    await circuit.renderUntilSettled()
    records = circuit.getCircuitJson()
  }
  const serialized = JSON.stringify(records)
  writeFileSync(`${output}/board.circuit.json`, serialized)
  const report = {inputKind:input ? "cached-native-export" : "native-tsx", inputSha256:createHash("sha256").update(serialized).digest("hex"), checksGeometrySha256, ...checkThroughVias(records)}
  writeFileSync(`${output}/inventory.json`, JSON.stringify(report, null, 2)+"\n")
  const escape = (s: string) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;")
  const board = records.find(r => r.type === "pcb_board")
  const points = report.inventory.map(v => `<circle cx="${v.x}" cy="${-v.y}" r="0.24" fill="${v.conflicts.some(c=>c.kind==='short')?'#fb7185':v.conflicts.length?'#fbbf24':'#34d399'}"><title>${escape(`${v.id} ${v.nets.join(', ')}: ${v.conflicts.length} conflicts`)}</title></circle>`).join("")
  const outline = board.outline.map((p:any)=>`${p.x},${-p.y}`).join(" ")
  writeFileSync(`${output}/conflicts.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${board.center.x-board.width/2-2} ${-board.center.y-board.height/2-6} ${board.width+4} ${board.height+9}" width="1568" height="1120"><rect x="-100" y="-100" width="300" height="300" fill="#111827"/><text x="${board.center.x-board.width/2}" y="${-board.center.y-board.height/2-3}" fill="white" font-size="1.5">Through-via conversion: red=short, amber=clearance, green=no current conflict</text><polygon points="${outline}" fill="#1f2937" stroke="#94a3b8" stroke-width="0.15"/>${points}</svg>\n`)
  console.log(JSON.stringify(report.summary, null, 2))
  if (args.includes("--require-through") && report.summary.nonThroughVias) process.exitCode = 1
}
