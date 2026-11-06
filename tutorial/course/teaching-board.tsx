import { analog } from "tscircuit"
import { Buffer, type Drive, extraction, teachingIbis } from "./teaching-buffer"

export type LineBoardProps = {
  name: string
  drive?: Drive
  corner?: "typical" | "minimum" | "maximum"
  /** Bend points between the two chips, in board mm (pcbPath is relative to U1's centre, so only x is shifted). */
  bends?: { x: number; y: number; via?: boolean; fromLayer?: string; toLayer?: string }[]
  /** Copper layer count and which layers get a GND pour. */
  layers?: 2 | 4
  pours?: ("bottom" | "inner1" | "inner2")[]
  /** Second trace for crosstalk lessons: centre-to-centre spacing in mm (also the chips' I/O pad pitch). */
  victimSpacing?: number
  bitDuration?: string
  bits?: string
  span?: number
}

/** Default: 4-layer board, 0.16 mm trace on top over a GND pour on inner1 (≈ 45 Ω). */
export const LineBoard = ({
  name, drive = "LVCMOS33_12MA", corner = "typical", bends = [], victimSpacing,
  bitDuration = "2ns", bits = "1011001110001111", span = 10,
  layers = 4, pours = ["inner1"],
}: LineBoardProps) => {
  const sim = `.${name}`
  const lanes = [{ name: "AGG", from: ".U1 > .IO1", to: ".U2 > .IO1" }]
  if (victimSpacing) lanes.push({ name: "VIC", from: ".U1 > .IO2", to: ".U2 > .IO2" })
  const states: Record<string, any> = {
    ".U1 > .IO1": { isOutput: true, isOutputEnabled: true },
    ".U2 > .IO1": { isOutput: false },
    ".U1 > .IO2": victimSpacing ? { isOutput: true, isOutputEnabled: true } : { isOutput: false },
    ".U2 > .IO2": { isOutput: false },
  }
  return (
    <board width={`${2 * span + 12}mm`} height="30mm" layers={layers} thickness="1.6mm"
      fabricatorPreset="jlcpcb_standard" routingDisabled>
      <Buffer name="U1" x={-span} side={1} pitch={victimSpacing ?? 2} />
      <Buffer name="U2" x={span} side={-1} pitch={victimSpacing ?? 2} />
      <trace name="LINE" from=".U1 > .IO1" to=".U2 > .IO1" thickness="0.16mm"
        pcbPath={[".U1 > .IO1", ...bends.map((p) => ({ ...p, x: p.x + span })), ".U2 > .IO1"]} />
      {victimSpacing && (
        <trace name="VICTIM" from=".U1 > .IO2" to=".U2 > .IO2" thickness="0.16mm"
          pcbPath={[".U1 > .IO2", ...bends.map((p) => ({ x: p.x + span, y: p.y - victimSpacing })), ".U2 > .IO2"]} />
      )}
      {pours.map((layer) => <copperpour key={layer} connectsTo="net.GND" layer={layer} />)}

      <ibismodel componentRef=".U1" {...teachingIbis(drive, corner)} />
      <ibismodel componentRef=".U2" {...teachingIbis(drive, corner)} />
      <voltagesource name="VSUPPLY" voltage="3.3V" connections={{ pin1: ".U1 > .VDD", pin2: ".U1 > .GND" }} />
      <voltageprobe name="TX" connectsTo=".U1 > .IO1" referenceTo=".U1 > .GND" />
      <voltageprobe name="RX" connectsTo=".U2 > .IO1" referenceTo=".U2 > .GND" />
      {victimSpacing && <voltageprobe name="VIC_NEAR" connectsTo=".U1 > .IO2" referenceTo=".U1 > .GND" />}
      {victimSpacing && <voltageprobe name="VIC_FAR" connectsTo=".U2 > .IO2" referenceTo=".U2 > .GND" />}

      <analog.transientsimulation name={name} spiceEngine="pcb_spice" duration="200ns" timePerStep="10ps"
        ibisPinStates={states}
        pcbSpiceChannel={{
          reduction: "straightened-stages", sections: 12, lanes, referencePinRef: ".U1 > .GND", extraction,
          ...(bends.some((p) => p.via) && {
            via: { platingThickness: "0.025mm", equivalentWidth: "0.1mm", omitThroughViaStubs: true },
            // The via barrel has no plane under it, so its return is written by hand:
            // a GND return 1 mm to the side, like a stitching via next to the signal via.
            straightenedStageProfiles: {
              via: {
                spacing: "0.1mm", relativePermittivity: 4.42,
                return: { width: "0.3mm", thickness: "0.025mm", lengthFactor: 1, centerY: "1mm", centerZ: "0mm" },
              },
            },
          }),
        }} />
      <analog.digitalstimulus name={`${name}_BITS`} simulationRef={sim} sourcePinRef=".U1 > .IO1"
        bitDuration={bitDuration} startTime="0ns" initialState={0}
        transmittedData={{ transmissionType: "bits", bits, repeat: true }} />
      {victimSpacing && (
        <analog.digitalstimulus name={`${name}_QUIET`} simulationRef={sim} sourcePinRef=".U1 > .IO2"
          bitDuration={bitDuration} startTime="0ns" initialState={0}
          transmittedData={{ transmissionType: "bits", bits: "0", repeat: true }} />
      )}
      <analog.eyediagram name={`${name}_EYE`} simulationRef={sim} probeRef=".RX"
        unitInterval={bitDuration} timeOrigin="0ns" startTime="20ns" />
    </board>
  )
}
