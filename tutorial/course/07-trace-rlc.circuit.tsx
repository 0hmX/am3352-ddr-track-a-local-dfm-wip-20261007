import { analog } from "tscircuit"

// A 10 cm trace, lumped: ~25 mΩ, 30 nH, 10 pF. Driver: 1 ns edge, 10 Ω output.
export default () => (
  <board routingDisabled>
    <voltagesource name="V1" waveShape="square" voltage="3.3V" frequency="10MHz"
      dutyCycle={0.5} riseTime="1ns" fallTime="1ns" />
    <resistor name="RS" resistance="10" footprint="0402" />
    <inductor name="LT" inductance="30nH" footprint="0402" />
    <capacitor name="CT" capacitance="10pF" footprint="0402" />
    <trace from=".V1 > .pin1" to=".RS > .pin1" />
    <trace from=".RS > .pin2" to=".LT > .pin1" />
    <trace from=".LT > .pin2" to=".CT > .pin1" />
    <trace from=".CT > .pin2" to=".V1 > .pin2" />
    <voltageprobe name="V_RX" connectsTo=".CT > .pin1" referenceTo=".V1 > .pin2" />
    <analog.transientsimulation name="TRACE_RING" spiceEngine="ngspice" duration="60ns" timePerStep="0.05ns" />
  </board>
)
