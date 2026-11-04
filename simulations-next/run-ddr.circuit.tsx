import { Circuit } from "@tscircuit/core"
import { cloneElement } from "react"
import Board from "../index"
import DdrIbisBoard from "./ibis.circuit"

// Compile the same physical board and nominal stackup used by verify-ddr.tsx,
// only to resolve the routed DQ/DQS pads. The simulation itself renders the
// native TSX board with its declarations as children.
const physical = new Circuit({ platform: { partsEngineDisabled: true, netlistDrcChecksDisabled: true } })
physical.schematicDisabled = true
physical.add(cloneElement(Board(), { fabricatorPreset: "jlcpcb_standard" }))
await physical.renderUntilSettled()
export const physicalRecords = physical.getCircuitJson()

export default function RunDdr() {
  return <DdrIbisBoard circuitJson={physicalRecords} />
}
