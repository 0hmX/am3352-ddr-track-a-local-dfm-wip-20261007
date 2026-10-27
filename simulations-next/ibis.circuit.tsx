import { analog } from "@tscircuit/core"
import { ImportedBoard } from "./saved-board"
import { resolveDdrChannel } from "./channels"
import { createDdrIbisModels, modelCornerSupplyV } from "./ibis-models"

/** Fixed PRBS7 sequence, repeated; this is a finite SI test, not a BER claim. */
function prbs7() {
  let state = 0x7f
  let bits = ""
  for (let i = 0; i < 127; i++) {
    bits += state & 1
    state = (state >> 1) | (((state ^ (state >> 1)) & 1) << 6)
  }
  return bits
}

/** Native vendor-IBIS investigation declarations on the supplied routed PCB.
 * The current routed-copper extractor retains selected GND only. This is not
 * the full-copper Maxwell model and cannot establish actual-board DDR margin.
 */
export default function DdrIbisBoard({
  circuitJson,
  byte = 0,
  dataSignal = `DDR_D${byte * 8}`,
  direction = "write",
  corner = "typical",
  drive = "slow9mA",
  ramOdt = "ODT_60",
  uiNs = 1.5625,
}) {
  const data = resolveDdrChannel(circuitJson, dataSignal)
  const dqs = resolveDdrChannel(circuitJson, `DDR_DQS${byte}`)
  const dqsn = resolveDdrChannel(circuitJson, `DDR_DQSn${byte}`)
  const models = createDdrIbisModels({ byte, direction, corner, drive, ramOdt, ramDataPin: data.loadBall, cpuDataPin: data.sourceBall })
  const channels = [data, dqs, dqsn]
  const names = ["DQ", "DQS", "DQSn"]
  const output = (channel) => direction === "write" ? channel.source : channel.load
  const input = (channel) => direction === "write" ? channel.load : channel.source
  const driverGround = direction === "write" ? ".U1 > .A1" : ".U3 > .B1"
  const receiverGround = direction === "write" ? ".U3 > .B1" : ".U1 > .A1"
  const bitDuration = `${uiNs}ns`
  // Writes are center-aligned. Reads are edge-aligned and require PHY sampling shift.
  const strobeStart = `${direction === "write" ? uiNs / 2 : 0}ns`
  const channel = {
    reduction: "routed-copper" as const,
    sections: 12,
    lanes: channels.map((route, i) => ({ name: names[i], from: output(route), to: input(route) })),
    referencePinRef: driverGround,
    extraction: {
      minimumFrequency: "1Hz", maximumFrequency: "1GHz", modelFrequency: "100MHz",
      filaments: 3, refinementFilaments: 5, convergenceTolerance: 0.05,
      capacitanceTolerance: 0.02, reciprocityTolerance: 0.025,
      dcResistanceTolerance: 0.002, maxPanelLength: "2mm", groundMeshSize: "3mm",
    },
    relativePermittivity: 4.1,
    via: { platingThickness: "0.025mm", equivalentWidth: "0.1mm", omitThroughViaStubs: true },
  }
  const states = Object.fromEntries(channels.flatMap(route => [
    [output(route), { isOutput: true, isOutputEnabled: true }],
    [input(route), { isOutput: false }],
  ]))
  return (
    <ImportedBoard circuitJson={circuitJson} fabricatorPreset="jlcpcb_standard">
      <ibismodel componentRef="chip.U1" {...models.cpu} />
      <ibismodel componentRef="chip.U3" {...models.ram} />
      <voltagesource name="DDR_VDDQ" voltage={`${modelCornerSupplyV[corner]}V`} connections={{ pin1: ".U1 > .E5", pin2: ".U1 > .A1" }} />
      <voltageprobe name="DQ_RX" connectsTo={input(data)} referenceTo={receiverGround} />
      <voltageprobe name="DQ_TX" connectsTo={output(data)} referenceTo={driverGround} />
      <voltageprobe name="DQS_RX" connectsTo={input(dqs)} referenceTo={input(dqsn)} />
      {(["QUIET", "SWITCHING"] as const).map(activity => {
        const name = `BYTE${byte}_${direction.toUpperCase()}_${activity}`
        const simulationRef = `.${name}`
        return [
          <analog.transientsimulation key={name} name={name} spiceEngine="pcb_spice"
            duration="512ns" timePerStep="10ps" pcbSpiceChannel={channel} ibisPinStates={states} />,
          <analog.digitalstimulus key={`${name}_DQ`} name={`${name}_DQ`} simulationRef={simulationRef}
            sourcePinRef={output(data)} bitDuration={bitDuration} startTime="0ns" initialState={0}
            transmittedData={{ transmissionType: "bits", bits: prbs7(), repeat: true }} />,
          <analog.digitalstimulus key={`${name}_DQS`} name={`${name}_DQS`} simulationRef={simulationRef}
            sourcePinRef={output(dqs)} bitDuration={bitDuration} startTime={strobeStart} initialState={0}
            transmittedData={{ transmissionType: "bits", bits: activity === "QUIET" ? "0" : "01", repeat: true }} />,
          <analog.digitalstimulus key={`${name}_DQSn`} name={`${name}_DQSn`} simulationRef={simulationRef}
            sourcePinRef={output(dqsn)} bitDuration={bitDuration} startTime={strobeStart} initialState={0} inverted
            transmittedData={{ transmissionType: "bits", bits: activity === "QUIET" ? "0" : "01", repeat: true }} />,
          <analog.eyediagram key={`${name}_DQ_eye`} name={`${name}_DQ_eye`} simulationRef={simulationRef}
            probeRef=".DQ_RX" unitInterval={bitDuration} timeOrigin="0ns" startTime="40ns" />,
          <analog.eyediagram key={`${name}_DQS_eye`} name={`${name}_DQS_eye`} simulationRef={simulationRef}
            probeRef=".DQS_RX" unitInterval={bitDuration} timeOrigin={strobeStart} startTime="40ns" />,
        ]
      })}
    </ImportedBoard>
  )
}
