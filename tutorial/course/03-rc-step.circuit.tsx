import { analog } from "tscircuit"

export default () => (
  <board width="20mm" height="12mm" routingDisabled>
    <voltagesource name="V1" voltage="3.3V" />
    <resistor name="R1" resistance="1k" footprint="0402" />
    <capacitor name="C1" capacitance="1uF" footprint="0402" />
    <trace from=".V1 > .pin1" to=".R1 > .pin1" />
    <trace from=".R1 > .pin2" to=".C1 > .pin1" />
    <trace from=".C1 > .pin2" to=".V1 > .pin2" />
    <voltageprobe name="VOUT" connectsTo=".C1 > .pin1" referenceTo=".V1 > .pin2" />
    <analog.transientsimulation name="RC_STEP" spiceEngine="ngspice" duration="5ms" timePerStep="10us" />
  </board>
)
