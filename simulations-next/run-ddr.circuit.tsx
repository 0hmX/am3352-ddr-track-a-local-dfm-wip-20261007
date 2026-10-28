import { Circuit } from "@tscircuit/core"
import { cloneElement } from "react"
import Board from "../index"
import DdrIbisBoard from "./ibis.circuit"

// Compile the same physical board and nominal stackup used by verify-ddr.tsx.
const physical = new Circuit({ platform: { partsEngineDisabled: true, netlistDrcChecksDisabled: true } })
physical.schematicDisabled = true
physical.add(cloneElement(Board(), { fabricatorPreset: "jlcpcb_standard" }))
await physical.renderUntilSettled()
export const physicalRecords = physical.getCircuitJson()

// These unrelated HDMI resistor-array SPICE models are not used by the DDR
// routed-copper experiment. The bridge does not accept saved subcircuits.
const hdmiIds = new Set(physicalRecords.filter(r => r.type === "source_component" && /^RN_HDMI_[0-6]$/.test(r.name ?? "")).map(r => r.source_component_id))
export const ddrInput = physicalRecords.filter(r => r.type !== "simulation_spice_subcircuit" || !hdmiIds.has(r.source_component_id))

export default function RunDdr() {
  return <DdrIbisBoard circuitJson={ddrInput} />
}
