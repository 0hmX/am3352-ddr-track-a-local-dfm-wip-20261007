import { readFileSync, writeFileSync } from "node:fs"
const directory=process.argv[2]
const records=JSON.parse(readFileSync(`${directory}/board.circuit.json`,"utf8"))
const source=new Map(records.filter((r:any)=>r.type==="source_trace").map((r:any)=>[r.source_trace_id,r.name]))
const groups={BYTE0:[...Array.from({length:8},(_,i)=>`DDR_D${i}`),"DDR_DQM0","DDR_DQS0","DDR_DQSn0"],BYTE1:[...Array.from({length:8},(_,i)=>`DDR_D${i+8}`),"DDR_DQM1","DDR_DQS1","DDR_DQSn1"],ADDRESS:[...Array.from({length:13},(_,i)=>`DDR_A${i}`),...Array.from({length:3},(_,i)=>`DDR_BA${i}`),"DDR_CK","DDR_CKn","DDR_CKE","DDR_CSn0","DDR_RASn","DDR_CASn","DDR_WEn","DDR_ODT"]}
const wanted=new Set(Object.values(groups).flat())
const routes=records.filter((r:any)=>r.type==="pcb_trace"&&wanted.has(source.get(r.source_trace_id) as string)).map((r:any)=>{
 let length=0
 for(let i=1;i<r.route.length;i++)length+=Math.hypot(r.route[i].x-r.route[i-1].x,r.route[i].y-r.route[i-1].y)
 const vias=records.filter((v:any)=>v.type==="pcb_via"&&v.pcb_trace_id===r.pcb_trace_id)
 return {name:source.get(r.source_trace_id),planarLengthMm:length,layers:[...new Set(r.route.filter((p:any)=>p.route_type==="wire").map((p:any)=>p.layer))],vias:vias.map((v:any)=>({x:v.x,y:v.y,layers:v.layers,holeDiameterMm:v.hole_diameter,landDiameterMm:v.outer_diameter})),points:r.route.map((p:any)=>({x:p.x,y:p.y,layer:p.layer,kind:p.route_type,fromLayer:p.from_layer,toLayer:p.to_layer}))}
})
const spread=(rows:any[])=>rows.length?Math.max(...rows.map(r=>r.planarLengthMm))-Math.min(...rows.map(r=>r.planarLengthMm)):null
const result={qualification:"Geometric review only; incomplete groups, unconfirmed fabrication stack and clock; no timing/SI approval",nominalScreensMm:{withinGroup:0.635,differentialPair:0.127},groups:Object.fromEntries(Object.entries(groups).map(([group,names])=>{const rows=routes.filter((r:any)=>names.includes(r.name));return [group,{routed:rows.length,required:names.length,missing:names.filter(n=>!rows.some((r:any)=>r.name===n)),planarSpreadMm:spread(rows)}]})),pairs:[["DDR_CK","DDR_CKn"],["DDR_DQS0","DDR_DQSn0"],["DDR_DQS1","DDR_DQSn1"]].map(names=>({names,routed:routes.filter((r:any)=>names.includes(r.name)).length,planarSkewMm:routes.filter((r:any)=>names.includes(r.name)).length===2?spread(routes.filter((r:any)=>names.includes(r.name))):null})),routes}
writeFileSync(`${directory}/ddr-review.json`,JSON.stringify(result,null,2))
console.log(JSON.stringify({...result,routes:undefined},null,2))
