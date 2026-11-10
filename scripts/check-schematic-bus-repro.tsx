import assert from "node:assert/strict"
import { Circuit } from "@tscircuit/core"
import Reproduction from "../docs/schematic-visual/reproductions/duplicate-pin-with-physical-island"

// Exercise actual TSX rather than constructing solver input or Circuit JSON.
for (const workaround of [false, true]) {
  const circuit = new Circuit()
  circuit.pcbDisabled = true
  circuit.add(<Reproduction workaround={workaround}/>)
  if (workaround) {
    await circuit.renderUntilSettled()
    assert.equal(circuit.getCircuitJson().filter(e => e.type.startsWith("schematic_") && e.type.endsWith("_error")).length, 0)
    console.log("Workaround: schematic rendered without errors")
  } else {
    await assert.rejects(circuit.renderUntilSettled(), /Duplicate pinId detected/)
    console.log("Reproduction: expected duplicate-pin failure")
  }
}
process.exit(0)
