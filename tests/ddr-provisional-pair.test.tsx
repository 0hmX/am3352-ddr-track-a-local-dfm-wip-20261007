import { expect, test } from "bun:test"
import { Circuit } from "@tscircuit/core"
import * as checks from "@tscircuit/checks"
import Board from "../index"

// A narrow integration screen for the actual mounted pair; it is not DDR SI qualification.
test("provisional DQS1 pair uses pad-centered vias and turns of at most 30 degrees", async () => {
  const circuit = new Circuit({ platform: { partsEngineDisabled: true, netlistDrcChecksDisabled: true } })
  circuit.schematicDisabled = true
  circuit.add(<Board />)
  await circuit.renderUntilSettled()
  const records = circuit.getCircuitJson() as any[]
  expect(records.filter(r => r.type.endsWith("_error"))).toEqual([])
  const sources = new Map(records.filter(r => r.type === "source_trace").map(r => [r.source_trace_id, r.name]))
  const lengths: number[] = []
  for (const name of ["DDR_DQS1", "DDR_DQSn1"]) {
    const matches = records.filter(r => r.type === "pcb_trace" && sources.get(r.source_trace_id) === name)
    expect(matches).toHaveLength(1)
    const trace = matches[0], vias = records.filter(r => r.type === "pcb_via" && r.pcb_trace_id === trace.pcb_trace_id)
    expect(vias).toHaveLength(2)
    for (const endpoint of [trace.route[0], trace.route.at(-1)]) {
      expect(vias.some(v => Math.hypot(v.x-endpoint.x, v.y-endpoint.y) < 1e-5 && v.hole_diameter === 0.2 && v.outer_diameter === 0.3)).toBe(true)
    }
    const points = trace.route.filter(p => p.route_type === "wire" && p.layer === "bottom").filter((p, i, a) => !i || Math.hypot(p.x-a[i-1].x, p.y-a[i-1].y) > 1e-7)
    lengths.push(points.slice(1).reduce((sum, p, i) => sum + Math.hypot(p.x-points[i].x,p.y-points[i].y), 0))
    for (let i=1; i<points.length-1; i++) {
      const a=points[i-1], b=points[i], c=points[i+1], ux=b.x-a.x, uy=b.y-a.y, vx=c.x-b.x, vy=c.y-b.y
      expect(Math.abs(Math.atan2(ux*vy-uy*vx, ux*vx+uy*vy))*180/Math.PI).toBeLessThanOrEqual(30.0001)
    }
  }
  expect(Math.abs(lengths[0]-lengths[1])).toBeLessThanOrEqual(0.127)
  for (const name of ["checkEachPcbTraceNonOverlapping", "checkPadTraceClearance", "checkViaTraceClearance", "checkViaPadClearance", "checkDifferentNetViaSpacing"]) {
    expect(await checks[name](records)).toEqual([])
  }
}, 120000)
