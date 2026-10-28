import { Circuit } from "@tscircuit/core"
import * as checks from "@tscircuit/checks"
import { mkdirSync, writeFileSync, readFileSync } from "node:fs"
import { createHash } from "node:crypto"
import { cloneElement } from "react"
import Board from "../index"
import { resolveDdrChannel } from "../simulations-next/channels"

const output = process.argv[2] ?? "work/ddr/final"
mkdirSync(output, {recursive:true})
const circuit = new Circuit({platform:{partsEngineDisabled:true,netlistDrcChecksDisabled:true}})
circuit.schematicDisabled = true
// Nominal stackup used for barrel length and field analysis. The live viewer
// currently rejects pcb_stackup metadata, so it is added to this analysis export.
circuit.add(cloneElement(Board(),{fabricatorPreset:"jlcpcb_standard"}))
await circuit.renderUntilSettled()
const records = circuit.getCircuitJson() as any[]
const serialized = JSON.stringify(records)
writeFileSync(`${output}/board.circuit.json`, serialized)
const z = new Map<string,number>()
let depth = 0
for (const layer of records.find(r=>r.type==="pcb_stackup").layers) {
  if (layer.layer_type === "copper") z.set(layer.layer,depth+layer.thickness/2)
  depth += layer.thickness
}
const groups = {
  BYTE0:[...Array.from({length:8},(_,i)=>`DDR_D${i}`),"DDR_DQM0","DDR_DQS0","DDR_DQSn0"],
  BYTE1:[...Array.from({length:8},(_,i)=>`DDR_D${i+8}`),"DDR_DQM1","DDR_DQS1","DDR_DQSn1"],
  ADDRESS:[...Array.from({length:13},(_,i)=>`DDR_A${i}`),...Array.from({length:3},(_,i)=>`DDR_BA${i}`),
    "DDR_CK","DDR_CKn","DDR_CKE","DDR_CSn0","DDR_RASn","DDR_CASn","DDR_WEn","DDR_ODT"],
}
const routes = Object.values(groups).flat().map(name=>{
  const channel = resolveDdrChannel(records,name)
  let planarMm=0,viaMm=0
  for (const [i,p] of channel.trace.route.entries()) {
    if (p.route_type === "via") viaMm += Math.abs(z.get(p.from_layer)!-z.get(p.to_layer)!)
    if (i) planarMm += Math.hypot(p.x-channel.trace.route[i-1].x,p.y-channel.trace.route[i-1].y)
  }
  return {name,from:channel.source,to:channel.load,planarMm,viaMm,totalMm:planarMm+viaMm,
    layer:channel.trace.route.find(p=>p.route_type==="wire"&&p.layer!=="top").layer,
    vias:channel.trace.route.filter(p=>p.route_type==="via").length}
})
const spread = (rows,key) => Math.max(...rows.map(r=>r[key]))-Math.min(...rows.map(r=>r[key]))
const buses = Object.entries(groups).map(([name,nets])=>{
  const rows=routes.filter(r=>nets.includes(r.name))
  return {name,signals:rows.length,planarSkewMm:spread(rows,"planarMm"),totalSkewMm:spread(rows,"totalMm"),limitMm:.635}
})
const pairs = [["DDR_DQS0","DDR_DQSn0"],["DDR_DQS1","DDR_DQSn1"],["DDR_CK","DDR_CKn"]].map(names=>({
  names,skewMm:spread(routes.filter(r=>names.includes(r.name)),"totalMm"),limitMm:.127,
}))
const findings = []
for (const name of ["checkTracesAreContiguous","checkEachPcbTraceNonOverlapping",
  "checkPadTraceClearance","checkViaTraceClearance","checkViaPadClearance","checkDifferentNetViaSpacing",
  "checkSameNetViaSpacing","checkPcbTracesOutOfBoard"]) {
  const errors = await checks[name](records)
  console.log(name,errors.length)
  findings.push({check:name,errors})
}
const renderErrors=records.filter(r=>r.type.endsWith("_error"))
const viaInPad = routes.every(route=>{
  const trace=resolveDdrChannel(records,route.name).trace
  const vias=trace.route.filter(p=>p.route_type==="via")
  return vias.length===2 && [trace.route[0],trace.route.at(-1)].every(endpoint=>
    vias.some(v=>Math.hypot(v.x-endpoint.x,v.y-endpoint.y)<1e-8))
})
let placementUnchanged: boolean | undefined
if (process.argv[3]) {
  const baseline=JSON.parse(readFileSync(process.argv[3],"utf8"))
  const physical = list=>list.filter(r=>["pcb_component","pcb_smtpad","pcb_hole","pcb_plated_hole"].includes(r.type)
    && !String(r.source_component_id).startsWith("source_manually_placed_via"))
  const before=physical(baseline)
  placementUnchanged=before.every(r=>{
    const id=Object.keys(r).find(k=>k===`${r.type}_id`)!
    const after=records.find(a=>a.type===r.type && a[id]===r[id])
    return after && ["x","y","center","rotation","ccw_rotation","layer","width","height","radius"].every(k=>JSON.stringify(r[k])===JSON.stringify(after[k]))
  })
}
const report={boardSha256:createHash("sha256").update(serialized).digest("hex"),signals:routes.length,
  signalVias:routes.reduce((n,r)=>n+r.vias,0),signalViasAtPadCenters:viaInPad,placementUnchanged,
  renderErrors,findings,buses,pairs,routes,
  scope:"DDR signal copper; whole-board power, support-net completion, fabrication and SI qualification are separate checks"}
writeFileSync(`${output}/routing-checks.json`,JSON.stringify(report,null,2))
console.log(JSON.stringify({signals:report.signals,signalVias:report.signalVias,viaInPad,placementUnchanged,buses,pairs,renderErrors},null,2))
if(renderErrors.length || findings.some(f=>f.errors.length) || !viaInPad || placementUnchanged===false ||
  buses.some(b=>b.totalSkewMm>b.limitMm+1e-6 || b.planarSkewMm>b.limitMm+1e-6) || pairs.some(p=>p.skewMm>p.limitMm+1e-6))
  throw new Error("DDR verification failed; inspect routing-checks.json")
