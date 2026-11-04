import { simulation } from "@tscircuit/core"
import { cloneElement } from "react"
import Board from "../index"

/** Board-world positions: mm, +X right, +Y up, +Z above the board. */
export default function ReturnCurrentBoard({ cases }) {
  const board = Board()
  return cloneElement(board, { fabricatorPreset: "jlcpcb_standard" },
    board.props.children,
    cases.map((channel) => (
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
    )),
  )
}
