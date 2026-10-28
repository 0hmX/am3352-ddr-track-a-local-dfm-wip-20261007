import { expect, test } from "bun:test"
import { Circuit } from "@tscircuit/core"
import { serializeSimulation } from "@tscircuit/pcb-spice-pipeline/tsx"
import RunDdr, { ddrInput, physicalRecords } from "../simulations-next/run-ddr.circuit"

test("native DDR entry retains the physical board and declares both experiments", async () => {
  const removed = physicalRecords.filter(r => !ddrInput.includes(r))
  expect(removed).toHaveLength(7)
  expect(removed.every(r => r.type === "simulation_spice_subcircuit")).toBe(true)
  const circuit = new Circuit({ platform: { partsEngineDisabled: true, netlistDrcChecksDisabled: true } })
  circuit.add(<RunDdr />)
  await circuit.renderUntilSettled()
  const output = serializeSimulation(circuit)
  for (const record of ddrInput.filter(r => r.type === "pcb_trace" || r.type === "pcb_stackup")) {
    expect(output).toContainEqual(record)
  }
  expect(output.filter(r => r.type === "simulation_experiment").map(r => r.name).sort()).toEqual([
    "BYTE0_WRITE_QUIET", "BYTE0_WRITE_SWITCHING",
  ])
  expect(output.filter(r => r.type === "simulation_eye_diagram")).toHaveLength(4)
  expect(output.filter(r => r.type === "simulation_ibis_model").every(r => r.ibis_model_asset.project_relative_path.startsWith("simulations-next/model-review/"))).toBe(true)
}, 120000)
