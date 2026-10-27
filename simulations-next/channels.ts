function endpointPortId(point, first) {
  const explicit = first ? point.start_pcb_port_id : point.end_pcb_port_id
  const legacy = point.pcb_port_id
  if (explicit && legacy && explicit !== legacy) throw new Error("Conflicting physical endpoint port metadata")
  return explicit ?? legacy
}

/** Resolve actual physical PCB endpoints, including legacy endpoint IDs. */
export function resolveDdrChannel(circuitJson, logicalSignal) {
  const cpu = circuitJson.find(r => r.type === "source_component" && r.name === "U1")
  const ram = circuitJson.find(r => r.type === "source_component" && r.name === "U3")
  const sources = circuitJson.filter(r => r.type === "source_port" && r.source_component_id === cpu?.source_component_id && r.port_hints?.includes(`${logicalSignal}_${r.name}`))
  if (sources.length !== 1) throw new Error(`CPU signal ${logicalSignal} has no unique physical pin`)
  const source = sources[0]
  const sourcePort = circuitJson.find(r => r.type === "pcb_port" && r.source_port_id === source.source_port_id)
  const routes = circuitJson.filter(r => r.type === "pcb_trace" && (endpointPortId(r.route[0], true) === sourcePort.pcb_port_id || endpointPortId(r.route.at(-1), false) === sourcePort.pcb_port_id))
  if (routes.length !== 1) throw new Error(`${logicalSignal} does not have one complete physical route`)
  const trace = routes[0]
  const sourceFirst = endpointPortId(trace.route[0], true) === sourcePort.pcb_port_id
  const loadPortId = sourceFirst ? endpointPortId(trace.route.at(-1), false) : endpointPortId(trace.route[0], true)
  const loadPort = circuitJson.find(r => r.type === "pcb_port" && r.pcb_port_id === loadPortId)
  const load = circuitJson.find(r => r.type === "source_port" && r.source_port_id === loadPort?.source_port_id && r.source_component_id === ram?.source_component_id)
  if (!load) throw new Error(`${logicalSignal} route does not terminate at an explicit RAM pad`)
  for (const [point, port] of [[sourceFirst ? trace.route[0] : trace.route.at(-1), sourcePort], [sourceFirst ? trace.route.at(-1) : trace.route[0], loadPort]]) {
    if (Math.hypot(point.x - port.x, point.y - port.y) > 1e-5 || !port.layers.includes(point.layer)) throw new Error(`${logicalSignal} endpoint metadata disagrees with physical pad coordinates/layer`)
  }
  if (source.subcircuit_connectivity_map_key !== load.subcircuit_connectivity_map_key) throw new Error(`${logicalSignal} physical endpoints are on different logical nets`)
  return {
    logicalSignal,
    source: `.U1 > .${source.name}`,
    load: `.U3 > .${load.name}`,
    sourcePort,
    loadPort,
    sourcePortId: source.source_port_id,
    loadPortId: load.source_port_id,
    sourceBall: source.name,
    loadBall: load.name,
    trace,
  }
}
