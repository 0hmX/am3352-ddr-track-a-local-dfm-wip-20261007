import { assertSavedGeometry } from "./saved-geometry-guard"
import { savedRoutes } from "../data/saved-route-geometry"

type Wire = [x: number, y: number, layer: string, width: number, startPort?: string | null, endPort?: string | null, pcbPort?: string | null]
type Via = [kind: "via", x: number, y: number, from: string, to: string, pad: number | null, hole: number | null]
export type SavedRouteDefinition = [name: string, nets: string[], ports: string[], points: (Wire | Via)[]]

// Pinned-core adapter: native pcbtrace currently takes a source ID, not selectors.
// Resolve IDs in PcbManualTraceRender, after native PCB ports exist.
// The ref/lifecycle adapter requires core 0.0.2217; validate before upgrading.
function bindRoute(instance: any, definition: SavedRouteDefinition) {
  if (!instance || instance.savedRouteBound) return
  if (!(instance._materializedRouteViaIndices instanceof Set) || typeof instance.doInitialPcbPrimitiveRender !== "function") {
    throw new Error("SavedRoutes requires the pinned @tscircuit/core 0.0.2217 pcbtrace API")
  }
  instance.savedRouteBound = true
  const [name, nets, ports, points] = definition
  const render = instance.doInitialPcbPrimitiveRender.bind(instance)
  instance.doInitialPcbPrimitiveRender = () => {}
  instance.doInitialPcbManualTraceRender = () => {
    const db = instance.root.db
    if (definition === savedRoutes[0]) assertSavedGeometry(db)
    const components = new Map(db.source_component.list().map((c: any) => [c.source_component_id, c.name]))
    const portKey = (p: any) => `${components.get(p.source_component_id)}.${p.pin_number || p.name}`
    const sourcePorts = new Map(db.source_port.list().map((p: any) => [p.source_port_id, portKey(p)]))
    const netNames = new Map(db.source_net.list().map((n: any) => [n.source_net_id, n.name]))
    const signature = (values: string[]) => [...values].sort().join("|")
    const netSignature = signature(nets)
    const candidates = db.source_trace.list().filter((t: any) => signature(t.connected_source_net_ids.map((id: string) => netNames.get(id))) === netSignature)
    let matches = candidates.filter((t: any) => signature(t.connected_source_port_ids.map((id: string) => sourcePorts.get(id))) === signature(ports))
    // Five legacy debug routes combine a resistor and test-pad in one source
    // trace. Native connectivity represents the same net with separate traces.
    // Require an actual route endpoint and only ports from the original trace.
    if (!matches.length && ports.length === 2 && ports.some(p => p.startsWith("TP_"))) {
      const endpoints = points.flatMap(p => p[0] === "via" ? [] : [p[4], p[5], p[6]]).filter(Boolean)
      matches = candidates.filter((t: any) => t.connected_source_port_ids.length === 1 && t.connected_source_port_ids.every((id: string) => ports.includes(sourcePorts.get(id) as string) && String(sourcePorts.get(id)).startsWith("TP_DBG_") && endpoints.includes(sourcePorts.get(id) as string)))
    }
    if (matches.length !== 1) throw new Error(`Saved route ${name}: expected one logical trace, found ${matches.length}`)
    instance._parsedProps.source_trace_id = matches[0].source_trace_id
    const pcbPorts = new Map(db.pcb_port.list().map((p: any) => [sourcePorts.get(p.source_port_id), p]))
    const connectedPorts = new Set(candidates.flatMap((t: any) => t.connected_source_port_ids))
    // Duplicate pads (e.g. Ethernet shield) may use internally connected ports.
    let expanded = true
    while (expanded) {
      expanded = false
      for (const connection of db.source_component_internal_connection.list()) {
        if (!connection.source_port_ids.some((id: string) => connectedPorts.has(id))) continue
        for (const id of connection.source_port_ids) {
          if (!connectedPorts.has(id)) { connectedPorts.add(id); expanded = true }
        }
      }
    }
    instance._parsedProps.route.forEach((p: any, i: number) => {
      const point = points[i]
      if (point[0] === "via") return
      for (const [field, endpoint] of [["start_pcb_port_id", point[4]], ["end_pcb_port_id", point[5]], ["pcb_port_id", point[6]]] as const) {
        if (!endpoint) continue
        const nativePort = pcbPorts.get(endpoint) as any
        if (!nativePort) throw new Error(`Saved route ${name}: missing native PCB port ${endpoint}`)
        if (!connectedPorts.has(nativePort.source_port_id)) throw new Error(`Saved route ${name}: endpoint ${endpoint} is no longer on ${nets.join(", ")}`)
        p[field] = nativePort.pcb_port_id
      }
    })
    // All physical vias are separately authored by SavedNativeVias, including
    // through vias whose full barrel span exceeds the route's layer transition.
    instance._materializedRouteViaIndices = new Set(points.flatMap((p, i) => p[0] === "via" ? [i] : []))
    render()
  }
}

/** Render inside the board, together with SavedNativeVias; routing stays disabled. */
// Published JSX declarations still describe the older pcbtrace route API.
const NativePcbTrace = "pcbtrace" as any
export function SavedRoutes() {
  return <>{savedRoutes.map(definition => {
    const route = definition[3].map(p => p[0] === "via"
      ? { route_type: "via", x: p[1], y: p[2], from_layer: p[3], to_layer: p[4], via_diameter: p[5], via_hole_diameter: p[6] }
      : { route_type: "wire", x: p[0], y: p[1], layer: p[2], width: p[3] })
    return <NativePcbTrace key={definition[0]} route={route as any} ref={(instance: any) => bindRoute(instance, definition)} />
  })}</>
}
