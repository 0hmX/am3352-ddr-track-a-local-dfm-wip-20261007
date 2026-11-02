import * as checks from "@tscircuit/checks"
import { readFileSync, writeFileSync } from "node:fs"
const directory=process.argv[2]
const records=JSON.parse(readFileSync(`${directory}/board.circuit.json`,"utf8"))
const placement=Object.fromEntries(["checkPcbComponentOverlap","checkPcbComponentsMissingCourtyard","checkPcbCourtyardOverKeepout"].map(name=>[name,(checks as any)[name](structuredClone(records))]))
const fullPlacement=await checks.runAllPlacementChecks(structuredClone(records))
const fullPlacementCounts=Object.fromEntries([...new Set(fullPlacement.map((r:any)=>r.type))].map(type=>[type,fullPlacement.filter((r:any)=>r.type===type).length]))
const sources=new Map(records.filter((r:any)=>r.type==="source_trace").map((r:any)=>[r.source_trace_id,r.name]))
const traceGeometry=records.filter((r:any)=>r.type==="pcb_trace").map((trace:any)=>{
 const runs:any[][]=[]
 for(const point of trace.route){if(point.route_type!=="wire"){runs.push([]);continue}const run=runs.at(-1);if(!run||run.at(-1)?.layer!==point.layer)runs.push([point]);else if(Math.hypot(point.x-run.at(-1).x,point.y-run.at(-1).y)>1e-7)run.push(point)}
 let planarLength=0,turnsAbove45=0,reversalsAbove135=0,maximumTurn=0
 for(const run of runs)for(let i=1;i<run.length;i++){
  const a=run[i-1],b=run[i];planarLength+=Math.hypot(b.x-a.x,b.y-a.y)
  if(i+1<run.length){const c=run[i+1],ux=b.x-a.x,uy=b.y-a.y,vx=c.x-b.x,vy=c.y-b.y;const angle=Math.abs(Math.atan2(ux*vy-uy*vx,ux*vx+uy*vy)*180/Math.PI);maximumTurn=Math.max(maximumTurn,angle);if(angle>45.01)turnsAbove45++;if(angle>135)reversalsAbove135++}
 }
 const from=trace.route[0],to=trace.route.at(-1),manhattan=Math.abs(to.x-from.x)+Math.abs(to.y-from.y)
 return {name:sources.get(trace.source_trace_id)??"unnamed trace",planarLengthMm:planarLength,endpointManhattanMm:manhattan,detourRatio:manhattan?planarLength/manhattan:null,maximumSampledTurnDegrees:maximumTurn,turnsAbove45,reversalsAbove135}
})
const result={placement,fullPlacement,fullPlacementCounts,traceGeometry,limitations:["placement preserves the original three-check subset for historical comparison; fullPlacement contains the complete upstream placement suite without suppression.","Supplemental geometry metrics only; run cloud-trace-lint.ts separately for the official trace-style analyzer.","Curved routes are sampled; small successive turns do not establish deliberate path quality. Inspect enlarged native layer images.","Lengths are planar geometry, not electrical timing or impedance checks."]}
writeFileSync(`${directory}/quality.json`,JSON.stringify(result,null,2))
console.log(JSON.stringify({placement:Object.fromEntries(Object.entries(placement).map(([k,v]:any)=>[k,v.length])),fullPlacementCounts,traces:traceGeometry.length,sharpTurnTraces:traceGeometry.filter((r:any)=>r.turnsAbove45).length},null,2))
