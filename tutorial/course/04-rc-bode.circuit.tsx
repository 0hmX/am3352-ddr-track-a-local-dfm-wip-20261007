import { analog } from "tscircuit"

export default () => (
  <board width="20mm" height="12mm" routingDisabled>
    <voltagesource name="V1" voltage="0V" acMagnitude="1V" />
    <resistor name="R1" resistance="1k" footprint="0402" />
    <capacitor name="C1" capacitance="100nF" footprint="0402" />
    <trace from=".V1 > .pin1" to=".R1 > .pin1" />
    <trace from=".R1 > .pin2" to=".C1 > .pin1" />
    <trace from=".C1 > .pin2" to=".V1 > .pin2" />
    <voltageprobe name="VOUT" connectsTo=".C1 > .pin1" referenceTo=".V1 > .pin2" />
    <analog.acsweepsimulation name="RC_BODE" spiceEngine="ngspice"
      sweepType="decade" startFrequency="10Hz" stopFrequency="1MHz" samplesPerInterval={10} />
  </board>
)
