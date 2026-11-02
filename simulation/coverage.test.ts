import { test, expect } from "bun:test"
import { readFile } from "node:fs/promises"
import { buildCoverage, exportContext, electricalMembership, diskInsidePour, requireQualifiedCoverage, nativeId } from "./context-coverage"

const record = (type: string, id: string, fields: Record<string, unknown> = {}) => ({ type, [`${type}_id`]: id, ...fields })
test("native via ports inherit their explicit net without merging conflicting named nets", () => {
  const records = [record("source_net", "g", { name: "GND" }), record("source_net", "s", { name: "SIG" }), record("source_port", "p1"), record("source_port", "p2"),
    record("pcb_port", "pp1", { source_port_id: "p1", x: 0, y: 0, layers: ["top"] }), record("pcb_port", "pp2", { source_port_id: "p2", x: 0, y: 0, layers: ["inner1"] }),
    record("pcb_via", "v", { source_net_id: "g", x: 0, y: 0, layers: ["top", "inner1"], pcb_port_ids: ["pp1", "pp2"] })]
  expect(electricalMembership(records).membership(records.at(-1)!).sourceNetNames).toEqual(["GND"])
  expect(electricalMembership(records).membership(records.at(-1)!).status).toBe("resolved_logical_component")
  records.push(record("source_trace", "t", { connected_source_port_ids: ["p2"], connected_source_net_ids: ["s"] }))
  expect(electricalMembership(records).membership(records.at(-2)!).status).toBe("conflicting_logical_components")
})
test("coincident unassociated copper is not assigned to a nearby net", () => {
  const records = [record("source_net", "g", { name: "GND" }), record("pcb_via", "v", { x: 0, y: 0, layers: ["top", "inner1"] })]
  expect(electricalMembership(records).membership(records[1]).status).toBe("no_electrical_association")
})
test("reference contact requires copper clearance and respects a cutout", () => {
  const ring = (points: number[][]) => ({ vertices: points.map(([x, y]) => ({ x, y })) })
  const pour = record("pcb_copper_pour", "p", { shape: "brep", brep_shape: { outer_ring: ring([[0, 0], [10, 0], [10, 10], [0, 10]]), inner_rings: [ring([[4, 4], [6, 4], [6, 6], [4, 6]])] } })
  expect(diskInsidePour([2, 2], .1, pour).contained).toBe(true)
  expect(diskInsidePour([5, 5], .1, pour).contained).toBe(false)
  expect(diskInsidePour([3.95, 5], .1, pour).contained).toBe(false)
})
test("lossless inventory verifies hashes and the board gate cannot be promoted by editing metadata", () => {
  const records = [record("pcb_board", "board", { thickness: 1.2 }), record("pcb_stackup", "stack", { layers: [{ thickness: .035 }] }), record("pcb_smtpad", "pad", { x: 0, y: 0, layer: "top", shape: "circle", radius: .2 })]
  const coverage = buildCoverage(records, .025), exported = exportContext(records, coverage)
  expect(exported.objects).toEqual([records[2]])
  const changed = structuredClone(records); changed[2].x = .01
  expect(() => exportContext(changed, coverage)).toThrow("hash mismatch")
  expect(() => exportContext(records, { ...coverage, objects: [] })).toThrow("coverage incomplete")
  expect(() => requireQualifiedCoverage({ status: "solver_context_qualified", objects: [{ plannedPhysicalConductor: "fake" }] })).toThrow("not qualified")
})

if (process.env.SIM_CIRCUIT_JSON) test("public historical integration preserves all 2057 objects and cutouts", async () => {
  const records = JSON.parse(await readFile(process.env.SIM_CIRCUIT_JSON!, "utf8")), before = JSON.stringify(records)
  const coverage = buildCoverage(records, .025), exported = exportContext(records, coverage)
  expect(coverage.summary.counts).toEqual({ pcb_trace: 57, pcb_via: 520, pcb_copper_pour: 4, pcb_smtpad: 1454, pcb_plated_hole: 22 })
  expect(exported.objects.length).toBe(2057)
  expect(coverage.boundaries.filter(b => b.type === "copper_void")).toHaveLength(314)
  for (const object of exported.objects) expect(JSON.stringify(object)).toBe(JSON.stringify(records.find((r: any) => r.type === object.type && nativeId(r) === nativeId(object))))
  expect(JSON.stringify(records)).toBe(before)
  expect(() => requireQualifiedCoverage(coverage)).toThrow("not qualified")
})
