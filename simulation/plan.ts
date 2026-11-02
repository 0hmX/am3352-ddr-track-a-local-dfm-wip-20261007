import { selectNeighbors, type Segment } from "./neighbors"
import { electricalMembership, type NativeRecord, nativeId } from "./context-coverage"
import { sha256 } from "./shared"

export function planCoupled(records: NativeRecord[], seeds: string[], radiusMm: number) {
  const stack = records.find(r => r.type === "pcb_stackup")
  if (!stack) throw Error("Native stackup required for 3D proximity")
  const heights = new Map<string, number>(); let height = 0
  for (const layer of [...stack.layers].reverse()) { if (!(layer.thickness > 0)) throw Error("Positive layer thickness required"); if (layer.layer_type === "copper") heights.set(layer.layer, height + layer.thickness / 2); height += layer.thickness }
  const z = (layer: string) => { const value = heights.get(layer); if (value === undefined) throw Error(`Unknown copper layer ${layer}`); return value }
  const membership = electricalMembership(records)
  const nets = records.filter(r => r.type === "pcb_trace").map(trace => {
    const segments: Segment[] = []; let previous: [number, number, number] | undefined, previousLayer: string | undefined, previousWidth = 0
    for (const point of trace.route) {
      if (point.route_type === "wire") {
        if (previousLayer && previousLayer !== point.layer) throw Error(`Layer transition without native via in ${nativeId(trace)}`)
        const end: [number, number, number] = [point.x, point.y, z(point.layer)]
        if (!(point.width > 0)) throw Error("Explicit positive native width required")
        segments.push({ start: previous ?? end, end, widthMm: Math.max(previousWidth, point.width) }); previous = end; previousLayer = point.layer; previousWidth = point.width
      } else if (point.route_type === "via") {
        const via = records.find(v => v.type === "pcb_via" && v.pcb_trace_id === nativeId(trace) && Math.hypot(v.x - point.x, v.y - point.y) < 1e-8 && v.layers.includes(point.from_layer) && v.layers.includes(point.to_layer))
        if (!via || previousLayer && previousLayer !== point.from_layer) throw Error(`Missing or inconsistent native via in ${nativeId(trace)}`)
        const start: [number, number, number] = [point.x, point.y, z(point.from_layer)], end: [number, number, number] = [point.x, point.y, z(point.to_layer)]
        if (previous) segments.push({ start: previous, end: start, widthMm: via.outer_diameter })
        segments.push({ start, end, widthMm: via.outer_diameter }); previous = end; previousLayer = point.to_layer; previousWidth = via.outer_diameter
      } else throw Error(`Unsupported native route primitive in ${nativeId(trace)}`)
    }
    return { name: nativeId(trace), segments, nativeTrace: trace, membership: membership.membership(trace), nativeSha256: sha256(JSON.stringify(trace)) }
  })
  const selected = selectNeighbors({ nets, seeds, radiusMm }), ids = new Set(selected.map(n => n.name))
  return { sourceHash: sha256(JSON.stringify(records)), seeds, radiusMm, selected: nets.filter(n => ids.has(n.name)), omittedTraceIds: nets.filter(n => !ids.has(n.name)).map(n => n.name),
    retainedContextObjectIds: records.filter(r => ["pcb_via", "pcb_copper_pour", "pcb_smtpad", "pcb_plated_hole"].includes(r.type)).map(nativeId),
    solverReady: false, limitations: ["Selected native routes are complete; this proximity plan does not prove aggressor completeness", "All non-trace copper remains in the context inventory; no matrices are independently added", "Expansion comparison, conductor contact coverage, reference paths and materials must be qualified before board execution"] }
}
