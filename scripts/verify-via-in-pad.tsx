import { Circuit } from "@tscircuit/core"
import { AM3352, pinLabels as cpuLabels } from "../components/AM3352"
import { W631GG6MB_12, pinLabels as ramLabels } from "../imports/W631GG6MB_12"
import { cpuNets, ramNet } from "../logic/connections"

const cpuConnections = Object.fromEntries(Object.entries(cpuLabels).flatMap(([pin, [ball]]) => cpuNets[ball] ? [[pin, `net.${cpuNets[ball]}`]] : []))
const ramConnections = Object.fromEntries(Object.entries(ramLabels).flatMap(([pin, [, signal]]) => ramNet(signal) ? [[pin, `net.${ramNet(signal)}`]] : []))
let originalPads: string[] = []
for (const [enabled, toLayer] of [[false, "bottom"], [true, "bottom"], [true, "inner2"]] as const) {
  const circuit = new Circuit()
  circuit.schematicDisabled = true
  circuit.add(<board width={98} height={65.5} layers={8} routingDisabled isViaInPadAllowed allowBlindAndBuriedVias={toLayer !== "bottom"} autorouter={{ allowViaInPad: true }}
    outline={[{ x: -28, y: 26.5 }, { x: 70, y: 26.5 }, { x: 70, y: -39 }, { x: -28, y: -39 }]}>
    <AM3352 name="U1" pcbX={0} pcbY={0} connections={cpuConnections} noSchematicRepresentation viaInPad={enabled} viaInPadToLayer={toLayer} />
    <W631GG6MB_12 name="U3" pcbX={0} pcbY={-27} connections={ramConnections} noSchematicRepresentation viaInPad={enabled} viaInPadToLayer={toLayer} />
  </board>)
  await circuit.renderUntilSettled()
  const records = circuit.getCircuitJson()
  const errors = records.filter(record => record.type.endsWith("_error"))
  if (errors.length) throw Error(`Render failed: ${errors.map(error => `${error.type}: ${(error as any).message}`).join("; ")}`)
  const pads = records.filter(record => record.type === "pcb_smtpad")
  const padSignatures = pads.map((pad: any) => `${pad.shape}|${pad.x}|${pad.y}|${pad.radius}|${pad.width}|${pad.height}|${pad.ccw_rotation}|${pad.layer}`).sort()
  const vias = records.filter(record => record.type === "pcb_via")
  if (!enabled) {
    originalPads = padSignatures
    if (vias.length) throw Error("Default footprints unexpectedly added vias")
    console.log(`Default unchanged: ${pads.length} pads, no vias`)
    continue
  }
  if (padSignatures.join("\n") !== originalPads.join("\n")) throw Error("Via-in-pad changed the pad geometry")
  const expected = Object.keys(cpuConnections).length + Object.keys(ramConnections).length
  if (vias.length !== expected) throw Error(`Expected ${expected} connected-ball vias; got ${vias.length}`)
  const traces = new Map(records.filter(record => record.type === "source_trace").map(trace => [trace.source_trace_id, trace]))
  const ports = new Map(records.filter(record => record.type === "pcb_port").map(port => [port.pcb_port_id, port]))
  for (const via of vias) {
    const trace = traces.get(via.source_trace_id!)
    if (!trace?.connected_source_net_ids.length) throw Error("Via has no inherited source net")
    const pad = pads.find(pad => Math.hypot(pad.x - via.x, pad.y - via.y) < 1e-8 && trace.connected_source_port_ids.includes(ports.get(pad.pcb_port_id!)?.source_port_id!))
    if (!pad) throw Error("Via does not sit on its own connected pad")
    const expectedLayers = toLayer === "inner2" ? ["top", "inner1", "inner2"] : ["top", "inner1", "inner2", "inner3", "inner4", "inner5", "inner6", "bottom"]
    if (via.hole_diameter !== 0.15 || via.outer_diameter !== 0.3 || via.layers.join() !== expectedLayers.join()) throw Error("Incorrect via dimensions or layer span")
  }
  console.log(`PASS: ${vias.length} connected-ball vias, exact pad centers and net bindings, top→${toLayer}; all ${pads.length} pad geometries preserved`)
}
// Only native TSX sources are stored. Compiled records remain in memory.
