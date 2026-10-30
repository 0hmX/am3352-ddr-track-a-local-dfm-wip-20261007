import { BusLanesPipelineSolver, type SimpleRouteJson } from '@tscircuit/bus-lanes-solver'
import { Circuit, getSimpleRouteJsonFromCircuitJson } from '@tscircuit/core'
import { Children, cloneElement } from 'react'
import { mkdirSync, rmSync } from 'node:fs'
import Board from '../index'
import { DdrRoutes } from '../layout/DdrRoutes'
import { ProvisionalDdrRoutes } from '../layout/ProvisionalDdrRoutes'
import { ProvisionalDdrAddressRoutes } from '../layout/ProvisionalDdrAddressRoutes'
import { ProvisionalDdrByte0Routes } from '../layout/ProvisionalDdrByte0Routes'
import { ProvisionalDdrByte1Routes } from '../layout/ProvisionalDdrByte1Routes'
import { ddrRoutes } from '../data/ddr-routes'
// Exploration only: this does not apply copper and is not DDR qualification.
// Uses native physical pad/hole obstacles and pad-centered signal vias, but
// excludes mounted candidate traces; don't combine results without rechecking.
// The optional separate-group mode assigns each DDR group a dedicated layer.
// Solver acceptance does not establish external tuning, minimum meander
// dimensions, full-board clearance, or cross-layer-group skew.
const groupName = process.env.SEPARATE_GROUP?.toUpperCase()
const groupFor = (name: string) => /^DDR_D([0-7]|QM0|QS0|QSn0)$/.test(name) ? 'BYTE0' : /^DDR_D([89]|1[0-5]|QM1|QS1|QSn1)$/.test(name) ? 'BYTE1' : 'ADDRESS'
const groupLayers: Record<string,string> = { BYTE0:'inner2', BYTE1:'bottom', ADDRESS:'inner4' }
if (groupName && !(groupName in groupLayers)) throw Error('SEPARATE_GROUP must be BYTE0, BYTE1, or ADDRESS')
const layer = process.argv[2] || (groupName ? groupLayers[groupName] : 'bottom')
if (!['top', 'inner2', 'inner4', 'bottom'].includes(layer)) throw Error('Choose top, inner2, inner4, or bottom')
if (groupName) {
  groupLayers[groupName] = layer
  if (new Set(Object.values(groupLayers)).size !== 3) throw Error('The selected layer conflicts with another dedicated DDR group layer')
}
const plan = ddrRoutes.map(route => ({...route, layer:groupName ? groupLayers[groupFor(route.name)] : route.layer}))
const caseName = `${groupName ? `separate-${groupName.toLowerCase()}-` : ''}${layer}${process.env.PAIR_ONLY ? '-pair' : ''}`
mkdirSync('work/ddr/experiments', { recursive: true })
rmSync(`work/ddr/experiments/${caseName}.json`, { force: true })
rmSync(`work/ddr/experiments/${caseName}-report.json`, { force: true })
rmSync(`work/ddr/experiments/${caseName}-audit.json`, { force: true })
const c = new Circuit({platform:{partsEngineDisabled:true,netlistDrcChecksDisabled:true}})
c.schematicDisabled = true
const board=Board()
const children=Children.toArray(board.props.children).filter((child:any)=>![DdrRoutes, ProvisionalDdrRoutes, ProvisionalDdrAddressRoutes, ProvisionalDdrByte0Routes, ProvisionalDdrByte1Routes].includes(child.type))
c.add(cloneElement(board,{},children)); await c.renderUntilSettled()
const records=c.getCircuitJson() as any[]
const components=new Map(records.filter(r=>r.type==='source_component').map(r=>[r.source_component_id,r.name]))
const ports=new Map(records.filter(r=>r.type==='source_port').map(r=>[r.source_port_id,r]))
const nets=new Map(records.filter(r=>r.type==='source_net').map(r=>[r.source_net_id,r.name]))
const bindings=new Map(records.filter(r=>r.type==='source_trace').flatMap(r=>r.connected_source_port_ids.flatMap((id:string)=>r.connected_source_net_ids.map((n:string)=>[id,nets.get(n)]))))
const terminals=records.filter(r=>r.type==='pcb_port'&&ports.has(r.source_port_id)).map(p=>{const port:any=ports.get(p.source_port_id);return {x:p.x,y:p.y,pcb_port_id:p.pcb_port_id,net:bindings.get(p.source_port_id),component:components.get(port.source_component_id)}})
const allLayers=['top','inner1','inner2','inner3','inner4','inner5','inner6','bottom']
const endpoints=plan.flatMap(route=>terminals.filter(p=>p.net===route.name&&(p.component==='U1'||p.component==='U3')).map(p=>({...p,toLayer:route.layer})))
if(plan.some(r=>endpoints.filter(p=>p.net===r.name).length!==2)) throw Error('missing endpoints')
const vias=endpoints.filter(p=>p.toLayer!=='top').map(p=>({type:'via',shape:'circle' as const,center:{x:p.x,y:p.y},width:.3,height:.3,layers:allLayers.slice(0,allLayers.indexOf(p.toLayer)+1),connectedTo:[String(p.net),p.pcb_port_id]}))
const routes=plan.filter(r=>groupName ? groupFor(r.name)===groupName : r.layer===layer)
const connections=routes.map(r=>({name:r.name,nominalTraceWidth:.1,pointsToConnect:endpoints.filter(p=>p.net===r.name).map(p=>({x:p.x,y:p.y,layer,pcb_port_id:p.pcb_port_id}))}))
const groups=[['BYTE0',routes.filter(r=>/^DDR_D([0-7]|QM0|QS0|QSn0)$/.test(r.name))],['BYTE1',routes.filter(r=>/^DDR_D([89]|1[0-5]|QM1|QS1|QSn1)$/.test(r.name))],['ADDRESS',routes.filter(r=>!/^DDR_D/.test(r.name))]] as const
const buses=groups.filter(([,rs])=>rs.length>1).map(([name,rs])=>({busId:name,name,connectionNames:rs.map(r=>r.name),allowedLayers:[layer],maxLengthSkew:process.env.RELAX?100:.635}))
const differentialPairs=([['DDR_DQS0','DDR_DQSn0'],['DDR_DQS1','DDR_DQSn1'],['DDR_CK','DDR_CKn']] as [string,string][]).filter(pair=>pair.every(name=>routes.some(r=>r.name===name))).map(connectionNames=>({connectionNames,lengthTolerance:.127,traceGap:.12}))
const keepout={center:{x:0,y:-15.5},width:4,height:7,layers:allLayers,connectedTo:[]}
const { simpleRouteJson: physical } = getSimpleRouteJsonFromCircuitJson({ circuitJson: records, minTraceWidth: .1, minTraceToPadEdgeClearance: .1 })
// Preserve source IDs and add the connection names used by this experiment.
for (const obstacle of physical.obstacles) obstacle.connectedTo = [...obstacle.connectedTo, ...obstacle.connectedTo.map(id => nets.get(id)).filter((name): name is string => typeof name === 'string')]
// Package identity lets the coupled-pair solver search alternate package exits.
for (const via of vias) (via as any).componentId = physical.obstacles.find(p => Math.hypot(p.center.x-via.center.x,p.center.y-via.center.y)<.001)?.componentId
const pairNames = new Set(differentialPairs.flatMap(pair => pair.connectionNames))
const input:SimpleRouteJson={layerCount:8,minTraceWidth:.1,defaultObstacleMargin:.1,minTraceToPadEdgeClearance:.1,minBoardEdgeClearance:.2,bounds:{minX:-14,maxX:14,minY:-37,maxY:1},connections:process.env.PAIR_ONLY?connections.filter(c=>pairNames.has(c.name)):connections,obstacles:[...vias,...physical.obstacles,...(process.env.NO_KEEPOUT?[]:[keepout])],buses:process.env.PAIR_ONLY?[]:buses,differentialPairs}
const solver=new BusLanesPipelineSolver(input,{fanout:'none',smoothTuning:true,denseSearch:true})
const start=Date.now(); let last=''; while(!solver.solved&&!solver.failed&&Date.now()-start<60000) {solver.step(); if(solver.phase!==last){last=solver.phase;console.log(layer,last,Date.now()-start)}}
if(!solver.solved&&!solver.failed)solver.tryFinalAcceptance()
const report={layer,group:groupName??null,groupLayers:groupName?groupLayers:null,requestedConnections:input.connections.map(c=>c.name),plannedVias:vias.length,solved:solver.solved,failed:solver.failed,phase:solver.phase,error:solver.error,secs:(Date.now()-start)/1000,traces:solver.traces.length,keepout:process.env.NO_KEEPOUT?null:keepout,relaxedSkew:!!process.env.RELAX,pairOnly:!!process.env.PAIR_ONLY,obstacles:input.obstacles.length,warning:'Exploratory candidate only; external tuning, meander dimensions, and full-board timing require independent validation.'}
console.log(JSON.stringify(report))
await Bun.write(`work/ddr/experiments/${caseName}-report.json`,JSON.stringify(report,null,2))
if(solver.solved)await Bun.write(`work/ddr/experiments/${caseName}.json`,JSON.stringify(solver.getOutput()))
else process.exitCode=1
