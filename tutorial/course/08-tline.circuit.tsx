import { analog } from "tscircuit"

// A 50 Ω line built by hand: 10 sections of 3 nH + 1.2 pF.
// Z0 = √(L/C) = 50 Ω, delay = 10 × √(LC) = 0.6 ns.
const SECTIONS = 10
export const TransmissionLine = ({ from, to }: { from: string; to: string }) => (
  <>
    {Array.from({ length: SECTIONS }, (_, i) => {
      const a = i === 0 ? from : `net.TL${i}`
      const b = i === SECTIONS - 1 ? to : `net.TL${i + 1}`
      return (
        <group key={i}>
          <inductor name={`L${i}`} inductance="3nH" footprint="0402" connections={{ pin1: a, pin2: b }} />
          <capacitor name={`C${i}`} capacitance="1.2pF" footprint="0402" connections={{ pin1: b, pin2: "net.GND" }} />
        </group>
      )
    })}
  </>
)

export default ({ sourceR = "10", loadR = undefined as string | undefined }) => (
  <board routingDisabled>
    <voltagesource name="V1" waveShape="square" voltage="1V" frequency="50MHz"
      dutyCycle={0.5} riseTime="0.1ns" fallTime="0.1ns"
      connections={{ pin1: "net.SRC", pin2: "net.GND" }} />
    <resistor name="RS" resistance={sourceR} footprint="0402" connections={{ pin1: "net.SRC", pin2: "net.TX" }} />
    <TransmissionLine from="net.TX" to="net.RX" />
    {loadR && <resistor name="RT" resistance={loadR} footprint="0402" connections={{ pin1: "net.RX", pin2: "net.GND" }} />}
    <voltageprobe name="V_TX" connectsTo="net.TX" referenceTo="net.GND" />
    <voltageprobe name="V_RX" connectsTo="net.RX" referenceTo="net.GND" />
    <analog.transientsimulation name="TLINE" spiceEngine="ngspice" duration="10ns" timePerStep="0.01ns" />
  </board>
)
