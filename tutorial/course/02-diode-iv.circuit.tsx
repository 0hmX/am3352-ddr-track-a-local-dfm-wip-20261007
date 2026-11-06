import { analog } from "tscircuit"

export default () => (
  <board routingDisabled>
    <voltagesource name="V1" voltage="0V" />
    <resistor name="R1" resistance="100" footprint="0402" />
    <diode name="D1" footprint="sod123" />
    <trace from=".V1 > .pin1" to=".R1 > .pin1" />
    <trace from=".R1 > .pin2" to=".D1 > .anode" />
    <trace from=".D1 > .cathode" to=".V1 > .pin2" />
    <voltageprobe name="VD" connectsTo=".D1 > .anode" referenceTo=".D1 > .cathode" />
    <analog.dcsweepsimulation name="DIODE_IV" spiceEngine="ngspice"
      sweepSource=".V1" sweepStart="0V" sweepStop="2V" sweepStep="0.1V" />
  </board>
)
