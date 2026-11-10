// Native utility treats a top/bottom net label as vertical text, while the SVG
// renders the same power label horizontally. The compact drawing fits visually,
// but the core emits an outside-sheet warning for CAP_VDD_SRAM_CORE.
export default () => <board routingDisabled schAutoLayoutEnabled={false}>
  <schematicsheet name="Power label bounds" sheetWidth={70} sheetHeight={30}/>
  <capacitor name="C1" schSheetName="Power label bounds" capacitance="1uF" footprint="0402" schRotation={-90}>
    <trace from=".C1 > .pin1" to="net.CAP_VDD_SRAM_CORE" schDisplayLabel="CAP_VDD_SRAM_CORE"/>
    <trace from=".C1 > .pin2" to="net.GND" schDisplayLabel="GND"/>
  </capacitor>
</board>
