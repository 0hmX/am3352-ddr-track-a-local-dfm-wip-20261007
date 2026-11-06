import { analog } from "tscircuit"
import { Buffer, extraction, teachingIbis } from "./teaching-buffer"

export default () => (
  <board width="30mm" height="12mm" layers={4} thickness="1.6mm" fabricatorPreset="jlcpcb_standard" routingDisabled>
    <Buffer name="U1" x={-10} side={1} />
    <Buffer name="U2" x={10} side={-1} />
    <trace name="LINE" from=".U1 > .IO1" to=".U2 > .IO1" thickness="0.16mm"
      pcbPath={[".U1 > .IO1", ".U2 > .IO1"]} />
    <copperpour connectsTo="net.GND" layer="inner1" />

    <ibismodel componentRef=".U1" {...teachingIbis()} />
    <ibismodel componentRef=".U2" {...teachingIbis()} />
    <voltagesource name="VSUPPLY" voltage="3.3V" connections={{ pin1: ".U1 > .VDD", pin2: ".U1 > .GND" }} />
    <voltageprobe name="TX" connectsTo=".U1 > .IO1" referenceTo=".U1 > .GND" />
    <voltageprobe name="RX" connectsTo=".U2 > .IO1" referenceTo=".U2 > .GND" />

    <analog.transientsimulation name="MICROSTRIP" spiceEngine="pcb_spice"
      duration="200ns" timePerStep="10ps"
      ibisPinStates={{
        ".U1 > .IO1": { isOutput: true, isOutputEnabled: true },
        ".U2 > .IO1": { isOutput: false },
        ".U1 > .IO2": { isOutput: false },
        ".U2 > .IO2": { isOutput: false },
      }}
      pcbSpiceChannel={{
        reduction: "straightened-stages",
        sections: 12,
        lanes: [{ name: "LINE", from: ".U1 > .IO1", to: ".U2 > .IO1" }],
        referencePinRef: ".U1 > .GND",
        extraction,
      }} />
    <analog.digitalstimulus name="MICROSTRIP_BITS" simulationRef=".MICROSTRIP"
      sourcePinRef=".U1 > .IO1" bitDuration="2ns" startTime="0ns" initialState={0}
      transmittedData={{ transmissionType: "bits", bits: "1011001110001111", repeat: true }} />
    <analog.eyediagram name="MICROSTRIP_EYE" simulationRef=".MICROSTRIP"
      probeRef=".RX" unitInterval="2ns" timeOrigin="0ns" startTime="20ns" />
  </board>
)
