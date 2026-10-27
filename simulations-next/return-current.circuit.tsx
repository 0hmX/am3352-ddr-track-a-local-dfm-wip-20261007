import { simulation } from "@tscircuit/core"
import { ImportedBoard } from "./saved-board"

/** Saved board-world positions: mm, +X right, +Y up, +Z above the board. */
export default function ReturnCurrentBoard({ circuitJson, cases }) {
  return (
    <ImportedBoard circuitJson={circuitJson} fabricatorPreset="jlcpcb_standard">
      {cases.map((channel) => (
        <simulation.pcbreturncurrentsimulation key={channel.name} name={channel.name}>
          <simulation.pcbreturncurrentexcitation
            source={channel.source}
            load={channel.load}
            ground="net.GND"
            current="5mA"
            sourceImpedance="40ohm"
            loadImpedance="60ohm"
            returnSource={channel.returnSource}
            returnSink={channel.returnSink}
          />
        </simulation.pcbreturncurrentsimulation>
      ))}
    </ImportedBoard>
  )
}
