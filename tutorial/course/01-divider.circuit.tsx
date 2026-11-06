import { analog } from "tscircuit"

export default () => (
  <board routingDisabled>
    <voltagesource name="V1" voltage="5V" />
    <resistor name="R1" resistance="10k" footprint="0402" />
    <resistor name="R2" resistance="4.7k" footprint="0402" />
    <trace from=".V1 > .pin1" to=".R1 > .pin1" />
    <trace from=".R1 > .pin2" to=".R2 > .pin1" />
    <trace from=".R2 > .pin2" to=".V1 > .pin2" />
    <voltageprobe name="VOUT" connectsTo=".R2 > .pin1" referenceTo=".V1 > .pin2" />
    <analog.dcoperatingpointsimulation name="DIVIDER_OP" spiceEngine="ngspice" />
  </board>
)
