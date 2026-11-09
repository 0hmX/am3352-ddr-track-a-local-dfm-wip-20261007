import {readFileSync,writeFileSync} from "node:fs"

// Read-only native build comparison, including the copper joins adjacent to
// embedded via markers. Usage: bun scripts/compare-trace-centerlines.tsx before.json after.json [report.json]
function snapshot(file:string){
 const records=JSON.parse(readFileSync(file,"utf8")) as any[]
 const sources=new Map(records.filter(r=>r.type==='source_trace').map(r=>[r.source_trace_id,r.name]))
 const traces=new Map<string,string[]>()
 for(const trace of records.filter(r=>r.type==='pcb_trace')){
  const name=sources.get(trace.source_trace_id)
  if(!name||traces.has(name))throw Error('Missing/duplicate physical trace name '+name)
  const segments:string[]=[]
  for(let i=1;i<trace.route.length;i++){
   const a=trace.route[i-1],b=trace.route[i]
   if(a.route_type==='via'&&b.route_type==='via')continue
   const layer=a.route_type==='wire'?a.layer:b.layer
   if(a.route_type==='wire'&&b.route_type==='wire'&&a.layer!==b.layer)continue
   for(const point of [a,b])if(point.route_type==='via'&&![point.from_layer,point.to_layer].includes(layer))throw Error('Invalid via join '+name)
   if(Math.hypot(a.x-b.x,a.y-b.y)<1e-8)continue
   const endpoints=[a,b].map(p=>[p.x,p.y].map(n=>Number(n.toFixed(8)))).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)))
   segments.push(JSON.stringify([layer,a.width??b.width,b.width??a.width,endpoints]))
  }
  traces.set(name,segments.sort())
 }
 return traces
}
const before=snapshot(process.argv[2]),after=snapshot(process.argv[3])
const changed=[...new Set([...before.keys(),...after.keys()])].filter(name=>JSON.stringify(before.get(name))!==JSON.stringify(after.get(name)))
const report={allNonzeroCenterlineSegmentsIncludingViaJoinsUnchanged:changed.length===0,centerlineSegmentCountIncludingViaJoins:[...after.values()].reduce((n,segments)=>n+segments.length,0),roundingMm:1e-8,changedTraces:changed}
if(process.argv[4])writeFileSync(process.argv[4],JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify(report))
if(changed.length)process.exitCode=1
