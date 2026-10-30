import { expect, test } from "bun:test"
import { Circuit } from "@tscircuit/core"
import * as checks from "@tscircuit/checks"
import Board from "../index"
import { provisionalAddressRoutes } from "../layout/ProvisionalDdrAddressRoutes"
import { provisionalByte0Routes } from "../layout/ProvisionalDdrByte0Routes"
import { provisionalByte1Routes } from "../layout/ProvisionalDdrByte1Routes"
import { checkMeanderGap } from "../scripts/check-meander-gap"

function crossesCenter(a: {x:number,y:number}, b: {x:number,y:number}) {
  let low=0, high=1
  for (const [p,d,min,max] of [[a.x,b.x-a.x,-2.05,2.05],[a.y,b.y-a.y,-19.05,-11.95]]) {
    if (Math.abs(d)<1e-12) { if (p<min || p>max) return false; continue }
    const t1=(min-p)/d,t2=(max-p)/d
    low=Math.max(low,Math.min(t1,t2)); high=Math.min(high,Math.max(t1,t2))
    if (low>high) return false
  }
  return true
}

// Integration screens for mounted candidates; these do not qualify DDR signal integrity.
test("provisional DDR routes use pad-centered vias and turns of at most 30 degrees", async () => {
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
  const byte1Lengths = [...lengths]
  // Check the mounted solver candidates on the full board, including their
  // actual via positions and rounded path geometry. Timing remains unfinished.
  for (const candidate of [...provisionalAddressRoutes, ...provisionalByte0Routes, ...provisionalByte1Routes]) {
    const matches = records.filter(r => r.type === "pcb_trace" && sources.get(r.source_trace_id) === candidate.name)
    expect(matches).toHaveLength(1)
    const trace = matches[0], vias = records.filter(r => r.type === "pcb_via" && r.pcb_trace_id === trace.pcb_trace_id)
    expect(vias).toHaveLength(candidate.layer === "top" ? 0 : 2)
    if (candidate.layer !== "top") for (const endpoint of [trace.route[0], trace.route.at(-1)]) {
      expect(vias.some(v => Math.hypot(v.x-endpoint.x, v.y-endpoint.y) < 1e-5 && v.hole_diameter === 0.2 && v.outer_diameter === 0.3)).toBe(true)
    }
    const points = trace.route.filter(p => p.route_type === "wire" && p.layer === candidate.layer).filter((p, i, a) => !i || Math.hypot(p.x-a[i-1].x, p.y-a[i-1].y) > 1e-7)
    expect(points.length).toBeGreaterThan(2)
    if (candidate.name === "DDR_D8" || candidate.name === "DDR_D12") byte1Lengths.push(points.slice(1).reduce((sum,p,i)=>sum+Math.hypot(p.x-points[i].x,p.y-points[i].y),0))
    expect(points.slice(1).some((p,i) => crossesCenter(points[i],p))).toBe(false)
    expect(checkMeanderGap(points.map(p => [p.x,p.y]), 0.1, 0.2).ok).toBe(true)
    for (let i=1; i<points.length-1; i++) {
      const a=points[i-1], b=points[i], c=points[i+1], ux=b.x-a.x, uy=b.y-a.y, vx=c.x-b.x, vy=c.y-b.y
      expect(Math.abs(Math.atan2(ux*vy-uy*vx, ux*vx+uy*vy))*180/Math.PI).toBeLessThanOrEqual(30.0001)
    }
  }
  // These four bottom-layer signals have equal nominal via depth; the other
  // byte-1 signals remain absent and are not qualified by this partial check.
  expect(byte1Lengths).toHaveLength(4)
  expect(Math.max(...byte1Lengths)-Math.min(...byte1Lengths)).toBeLessThanOrEqual(0.635)
  for (const name of ["checkEachPcbTraceNonOverlapping", "checkPadTraceClearance", "checkViaTraceClearance", "checkViaPadClearance", "checkDifferentNetViaSpacing"]) {
    expect(await checks[name](records)).toEqual([])
  }
}, 120000)
