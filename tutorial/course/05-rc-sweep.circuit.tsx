import { analog } from "tscircuit"

export default () => (
  <board routingDisabled>
    <voltagesource name="V1" voltage="3.3V" />
    <resistor name="R1" resistance="1k" footprint="0402" />
    <capacitor name="C1" capacitance="1uF" footprint="0402" />
    <trace from=".V1 > .pin1" to=".R1 > .pin1" />
    <trace from=".R1 > .pin2" to=".C1 > .pin1" />
    <trace from=".C1 > .pin2" to=".V1 > .pin2" />
    <voltageprobe name="VOUT" connectsTo=".C1 > .pin1" referenceTo=".V1 > .pin2" />
    <analog.transientsimulation name="RC_FAMILY" spiceEngine="ngspice" duration="5ms" timePerStep="50us">
      <analog.sweepparameter parameterType="resistance" resistorRef=".R1" values={["500", "1k", "2k"]} />
    </analog.transientsimulation>
  </board>
)
