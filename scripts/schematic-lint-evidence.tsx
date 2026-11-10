import { createHash } from "node:crypto"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

// Run after `tsci build index.tsx`. Compare complete PCB and source records,
// including IDs, geometry, net membership, routes, pours, and component positions.
// Supplier fetch diagnostics have random IDs/network results, and the project
// metadata intentionally hashes the edited TSX. Neither describes connectivity.
const volatile = new Set(["source_component_availability_warning", "source_part_not_found_warning", "source_project_metadata"])
const [output, baseline, input = "dist/index/circuit.json"] = process.argv.slice(2)
if (!output) throw new Error("Usage: bun scripts/schematic-lint-evidence.tsx <output-dir> [baseline-circuit.json]")
const circuit = JSON.parse(readFileSync(input, "utf8"))
const canonical = (value: any): any => Array.isArray(value) ? value.map(canonical) :
  value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value
const digest = (value: any) => createHash("sha256").update(JSON.stringify(canonical(value))).digest("hex")
const physical = (records: any[]) => records.filter(r => r.type.startsWith("pcb_") || r.type.startsWith("source_"))
const summarize = (records: any[]) => Object.fromEntries([...new Set(physical(records).map(r => r.type))].sort().map(type => {
  // Stock capacitor symbols reorder, and sometimes omit, polarity synonyms on
  // rotation. Numbered pin identities and every connection remain comparable.
  const elements = records.filter(r => r.type === type).map(r => type === "source_port" ?
    { ...r, port_hints: r.port_hints?.filter((hint: string) => !["pos", "neg", "anode", "cathode"].includes(hint)).sort() } : type === "source_missing_manufacturer_part_number_warning" ?
    { ...r, message: r.message.replace(/chip#\d+/g, "chip#runtime") } : r)
  return [type, { count: elements.length, sha256: digest(elements) }]
}))
// Compare the electrical partition of every numbered terminal and scoped net.
// Adding a terminal already on the same net to a native trace draws a local wire
// without changing the partition; every PCB record still compares field-for-field.
const connectivity = (records: any[]) => {
  const parent = new Map<string, string>()
  const root = (id: string): string => { const p = parent.get(id); if (!p) { parent.set(id, id); return id }; if (p === id) return id; const r = root(p); parent.set(id, r); return r }
  for (const r of records) {
    if (r.type === "source_port") root(r.source_port_id)
    if (r.type === "source_net") root(r.source_net_id)
    const ids = r.type === "source_trace" ? [...r.connected_source_port_ids, ...r.connected_source_net_ids] :
      r.type === "source_component_internal_connection" ? r.source_port_ids : []
    for (const id of ids.slice(1)) parent.set(root(id), root(ids[0]))
  }
  const groups = new Map<string, string[]>()
  for (const id of parent.keys()) { const key = root(id); if (!groups.has(key)) groups.set(key, []); groups.get(key)!.push(id) }
  return [...groups.values()].map(group => group.sort()).sort((a, b) => a[0].localeCompare(b[0]))
}
const summary = summarize(circuit)
if (baseline) {
  const original = JSON.parse(readFileSync(baseline, "utf8"))
  const before = summarize(original)
  if (digest(connectivity(original)) !== digest(connectivity(circuit))) throw new Error("Source terminal/net connectivity changed")
  const changed = [...new Set([...Object.keys(before), ...Object.keys(summary)])]
    .filter(type => type !== "source_trace" && !volatile.has(type) && JSON.stringify(before[type]) !== JSON.stringify(summary[type]))
  if (changed.length) throw new Error(`PCB/source records changed: ${changed.join(", ")}`)
}
mkdirSync(output, { recursive: true })
writeFileSync(`${output}/pcb-source-fingerprints.json`, JSON.stringify({ ...summary, electrical_connectivity: { sha256: digest(connectivity(circuit)), groups: connectivity(circuit).length } }, null, 2) + "\n")
for (const sheet of circuit.filter((r: any) => r.type === "schematic_sheet")) {
  const name = sheet.name ?? sheet.display_name ?? sheet.schematic_sheet_id
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  // Fit the actual sheet contents rather than shrinking them inside a large frame.
  const focused = circuit.filter((r: any) => r.type !== "schematic_sheet" &&
    (!r.type.startsWith("schematic_") || r.schematic_sheet_id === sheet.schematic_sheet_id))
  const svg = convertCircuitJsonToSchematicSvg(focused, { width: 1400, height: 1000 })
  writeFileSync(`${output}/${slug}.svg`, svg)
}
console.log(`${Object.keys(summary).length} PCB/source record types fingerprinted; ${baseline ? "PCB exact and terminal/net partitions identical (native trace forms may differ; polarity synonyms and runtime chip counters normalized; supplier diagnostics and TSX hash excluded); " : ""}schematic sheets rendered to ${output}`)
