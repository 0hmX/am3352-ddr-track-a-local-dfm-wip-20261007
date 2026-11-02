import { test, expect } from "bun:test"
import { planCoupled } from "./plan"
import { sphereFixture, parseSmoke } from "./smoke"
const records = [
  { type: "pcb_stackup", layers: [{layer_type:"copper",layer:"top",thickness:.035},{layer_type:"dielectric",thickness:.2},{layer_type:"copper",layer:"bottom",thickness:.035}] },
  ...[0,.2,10].map((y,i)=>({type:"pcb_trace",pcb_trace_id:`trace${i}`,route:[{route_type:"wire",x:0,y,layer:"top",width:.1},{route_type:"wire",x:1,y,layer:"top",width:.1}]})),
  {type:"pcb_copper_pour",pcb_copper_pour_id:"ground"}, {type:"pcb_via",pcb_via_id:"context_via",x:9,y:9,layers:["top","bottom"]}
]
test("planner retains full selected native routes and all non-trace context",()=>{
  const result = planCoupled(records,["trace0"],.2)
  expect(result.selected.map(n=>n.name)).toEqual(["trace0","trace1"])
  expect(result.selected[0].nativeTrace).toBe(records[1])
  expect(result.omittedTraceIds).toEqual(["trace2"])
  expect(result.retainedContextObjectIds).toEqual(["ground","context_via"])
  expect(result.solverReady).toBe(false)
})
test("planner rejects an unrepresented layer transition",()=>{
  const changed = structuredClone(records) as any[]; changed[1].route[1].layer="bottom"
  expect(()=>planCoupled(changed,["trace0"],.2)).toThrow("without native via")
})
test("smoke fixtures retain distinct geometry hashes and parser rejects bad conductor order",()=>{
  const coarse=sphereFixture(2),fine=sphereFixture(3)
  expect(coarse.panels).toBe(640);expect(fine.panels).toBe(2560)
  expect(coarse.geometryHash).not.toBe(fine.geometryHash)
  expect(()=>parseSmoke("Number of panels after refinement: 640\nCapacitance matrix is:\nDimension 2 x 2\ng_outer 1 0\ng_inner 0 1\n",640)).toThrow("order")
})
