import { Circuit } from "@tscircuit/core"
import { cloneElement } from "react"
import Board from "../../index"
import DdrIbisBoard from "../../simulations-next/ibis.circuit"

// Render the physical source just as the DDR verifier does, then supply it to
// the existing simulation component. This currently fails in ImportedBoard:
// the HDMI resistor arrays emit simulation_spice_subcircuit records.
const physical = new Circuit({ platform: { partsEngineDisabled: true, netlistDrcChecksDisabled: true } })
physical.schematicDisabled = true
physical.add(cloneElement(Board(), { fabricatorPreset: "jlcpcb_standard" }))
await physical.renderUntilSettled()
const simulation = new Circuit({ platform: { partsEngineDisabled: true, netlistDrcChecksDisabled: true } })
simulation.add(<DdrIbisBoard circuitJson={physical.getCircuitJson()} />)
await simulation.renderUntilSettled()
