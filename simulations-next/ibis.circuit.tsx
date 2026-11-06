import { analog } from "@tscircuit/core"
import { cloneElement } from "react"
import Board from "../index"
import { cpuPin, ramPin, resolveDdrChannel } from "./channels"
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

/** Native vendor-IBIS investigation declarations on the actual routed TSX board.
 * `circuitJson` is the compiled physical board, used only to resolve the routed
 * DQ/DQS pads; the declarations are added as children of the native board.
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
  lanes = ["DQ", "DQS", "DQSn"],
  activities = ["QUIET", "SWITCHING"],
  pcbSpiceChannel = undefined,
}) {
  const data = resolveDdrChannel(circuitJson, dataSignal)
  const dqs = resolveDdrChannel(circuitJson, `DDR_DQS${byte}`)
  const dqsn = resolveDdrChannel(circuitJson, `DDR_DQSn${byte}`)
  const models = createDdrIbisModels({ byte, direction, corner, drive, ramOdt, ramDataPin: data.loadBall, cpuDataPin: data.sourceBall })
  const all = { DQ: data, DQS: dqs, DQSn: dqsn }
  const names = lanes
  const channels = names.map(name => all[name])
  const withStrobe = names.includes("DQS")
  const output = (channel) => direction === "write" ? channel.source : channel.load
  const input = (channel) => direction === "write" ? channel.load : channel.source
  const driverGround = direction === "write" ? `${cpuPin}A1` : `${ramPin}B1`
  const receiverGround = direction === "write" ? `${ramPin}B1` : `${cpuPin}A1`
  const bitDuration = `${uiNs}ns`
  // Writes are center-aligned. Reads are edge-aligned and require PHY sampling shift.
  const strobeStart = `${direction === "write" ? uiNs / 2 : 0}ns`
  const channel = pcbSpiceChannel ? { ...pcbSpiceChannel, lanes: channels.map((route, i) => ({ name: names[i], from: output(route), to: input(route) })), referencePinRef: driverGround } : {
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
  // Bound pins outside the simulated lanes stay idle receivers.
  const idle = Object.entries(all).filter(([name]) => !names.includes(name))
    .flatMap(([, route]) => [[route.source, { isOutput: false }], [route.load, { isOutput: false }]])
  const states = Object.fromEntries([...idle, ...channels.flatMap(route => [
    [output(route), { isOutput: true, isOutputEnabled: true }],
    [input(route), { isOutput: false }],
  ])])
  const board = Board()
  return cloneElement(board, { fabricatorPreset: "jlcpcb_standard" },
    board.props.children,
    <>
      <ibismodel componentRef=".Processor > .U1" {...models.cpu} />
      <ibismodel componentRef=".DDR3 > .U3" {...models.ram} />
      <voltagesource name="DDR_VDDQ" voltage={`${modelCornerSupplyV[corner]}V`} connections={{ pin1: `${cpuPin}E5`, pin2: `${cpuPin}A1` }} />
      <voltageprobe name="DQ_RX" connectsTo={input(data)} referenceTo={receiverGround} />
      <voltageprobe name="DQ_TX" connectsTo={output(data)} referenceTo={driverGround} />
      {withStrobe && <voltageprobe name="DQS_RX" connectsTo={input(dqs)} referenceTo={input(dqsn)} />}
      {activities.map(activity => {
        const name = `BYTE${byte}_${direction.toUpperCase()}_${activity}`
        const simulationRef = `.${name}`
        return [
          <analog.transientsimulation key={name} name={name} spiceEngine="pcb_spice"
            duration="512ns" timePerStep="10ps" pcbSpiceChannel={channel} ibisPinStates={states} />,
          <analog.digitalstimulus key={`${name}_DQ`} name={`${name}_DQ`} simulationRef={simulationRef}
            sourcePinRef={output(data)} bitDuration={bitDuration} startTime="0ns" initialState={0}
            transmittedData={{ transmissionType: "bits", bits: prbs7(), repeat: true }} />,
          withStrobe && <analog.digitalstimulus key={`${name}_DQS`} name={`${name}_DQS`} simulationRef={simulationRef}
            sourcePinRef={output(dqs)} bitDuration={bitDuration} startTime={strobeStart} initialState={0}
            transmittedData={{ transmissionType: "bits", bits: activity === "QUIET" ? "0" : "01", repeat: true }} />,
          withStrobe && <analog.digitalstimulus key={`${name}_DQSn`} name={`${name}_DQSn`} simulationRef={simulationRef}
            sourcePinRef={output(dqsn)} bitDuration={bitDuration} startTime={strobeStart} initialState={0} inverted
            transmittedData={{ transmissionType: "bits", bits: activity === "QUIET" ? "0" : "01", repeat: true }} />,
          <analog.eyediagram key={`${name}_DQ_eye`} name={`${name}_DQ_eye`} simulationRef={simulationRef}
            probeRef=".DQ_RX" unitInterval={bitDuration} timeOrigin="0ns" startTime="40ns" />,
          withStrobe && <analog.eyediagram key={`${name}_DQS_eye`} name={`${name}_DQS_eye`} simulationRef={simulationRef}
            probeRef=".DQS_RX" unitInterval={bitDuration} timeOrigin={strobeStart} startTime="40ns" />,
        ]
      })}
    </>,
  )
}
