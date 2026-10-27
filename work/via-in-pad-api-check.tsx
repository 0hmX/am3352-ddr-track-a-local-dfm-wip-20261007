import { Circuit } from "@tscircuit/core"

// Small native TSX API probe. No Circuit JSON files are created or edited.
const circuit = new Circuit()
circuit.schematicDisabled = true
circuit.add(<board width={10} height={10} layers={8} routingDisabled isViaInPadAllowed autorouter={{ allowViaInPad: true }}>
  <chip name="U_TEST" pinLabels={{ pin1: ["A1"] }} connections={{ pin1: "net.GND" }} footprint={<footprint>
    <smtpad portHints={["pin1"]} pcbX={0} pcbY={0} shape="circle" radius={0.2} />
    <via name="padVia" pcbX={0} pcbY={0} holeDiameter={0.15} outerDiameter={0.3} fromLayer="top" toLayer="bottom" />
  </footprint>} />
</board>)
await circuit.renderUntilSettled()
const records = circuit.getCircuitJson()
const via = records.find(record => record.type === "pcb_via")
const trace = records.find(record => record.type === "source_trace" && record.source_trace_id === via?.source_trace_id)
console.log({
  viaCount: records.filter(record => record.type === "pcb_via").length,
  viaCenter: via && [via.x, via.y],
  viaLayers: via?.layers,
  hasConnectedSourceTrace: Boolean(trace),
  connectedNetCount: trace?.connected_source_net_ids.length,
  errors: records.filter(record => record.type.endsWith("_error")).map(record => ({ type: record.type, message: (record as any).message })),
})
