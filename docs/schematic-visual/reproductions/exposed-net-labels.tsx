// Remove schDisplayLabel from the explicit native traces to reproduce pin-derived
// labels on exposed nets. PCB and source records stay identical in either case.
export default () => <board routingDisabled schAutoLayoutEnabled={false}>
  <schematicsheet name="Test" sheetWidth={40} sheetHeight={30} />
  <subcircuit name="Supply" exposeNets routingDisabled schAutoLayoutEnabled={false}>
    <chip name="U1" schSheetName="Test" schX={0} schY={0} pinLabels={{ pin1: ["1", "IN"], pin2: ["2", "GND"] }} footprint="0402"><trace from=".U1 > .pin1" to="net.SYS_5V" schDisplayLabel="SYS_5V"/><trace from=".U1 > .pin2" to="net.GND" schDisplayLabel="GND"/></chip>
    <capacitor name="C1" schSheetName="Test" schX={4} schY={0} schRotation={-90} capacitance="100nF" footprint="0402"><trace from=".C1 > .pin1" to="net.SYS_5V" schDisplayLabel="SYS_5V"/><trace from=".C1 > .pin2" to="net.GND" schDisplayLabel="GND"/></capacitor>
  </subcircuit>
</board>
