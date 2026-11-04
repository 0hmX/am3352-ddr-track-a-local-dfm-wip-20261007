import { expect, test } from "bun:test"
import { Circuit } from "@tscircuit/core"
import RunDdr, { physicalRecords } from "../simulations-next/run-ddr.circuit"

test("native DDR entry keeps the physical board and declares both experiments", async () => {
  const circuit = new Circuit({ platform: { partsEngineDisabled: true, netlistDrcChecksDisabled: true } })
  circuit.add(<RunDdr />)
  await circuit.renderUntilSettled()
  const output = circuit.getCircuitJson()
  const routes = (records) => records.filter(r => r.type === "pcb_trace").map(r => JSON.stringify(r.route)).sort()
  expect(routes(output)).toEqual(routes(physicalRecords))
  expect(output.filter(r => r.type === "pcb_stackup")).toEqual(physicalRecords.filter(r => r.type === "pcb_stackup"))
  expect(output.filter(r => r.type === "simulation_experiment").map(r => r.name).sort()).toEqual([
    "BYTE0_WRITE_QUIET", "BYTE0_WRITE_SWITCHING",
  ])
  expect(output.filter(r => r.type === "simulation_eye_diagram")).toHaveLength(4)
  expect(output.filter(r => r.type === "simulation_ibis_model").every(r => r.ibis_model_asset.project_relative_path.startsWith("simulations-next/model-review/"))).toBe(true)
}, 300000)
