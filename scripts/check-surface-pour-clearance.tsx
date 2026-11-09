import {readFileSync,writeFileSync} from 'node:fs'
import{getFullConnectivityMapFromCircuitJson}from'circuit-json-to-connectivity-map'
import Flatbush from'flatbush'
import{convert,touches}from'./board-check-geometry'
export function checkSurfacePourClearance(records:any[]){
const conn=getFullConnectivityMapFromCircuitJson(records),key=(r:any)=>conn.getNetConnectedToId(r.source_net_id??r[r.type+'_id'])
const board=records.find((r:any)=>r.type==='pcb_board'),required=(o:any)=>o.elementType==='pcb_trace'?board.min_trace_to_pad_edge_clearance:board.min_pad_edge_to_pad_edge_clearance,margin=Math.max(board.min_trace_to_pad_edge_clearance,board.min_pad_edge_to_pad_edge_clearance);if(!Number.isFinite(margin))throw Error('Board copper clearances missing')
const shapes=convert(records,{elementTypes:['pcb_trace','pcb_via','pcb_smtpad','pcb_plated_hole','pcb_copper_pour'],includeDrillHoles:false,strict:true,curveTolerance:1e-6}).elements.filter((e:any)=>['top','bottom'].includes(e.layer)).flatMap((e:any)=>e.shapes.map((shape:any)=>({...e,shape}))),pours=shapes.filter((e:any)=>e.elementType==='pcb_copper_pour'),obs=shapes.filter((e:any)=>e.elementType!=='pcb_copper_pour'),index=new Flatbush(obs.length);for(const e of obs){const b=e.shape.box;index.add(b.xmin,b.ymin,b.xmax,b.ymax)}index.finish();const failures=[],minimums=[]
for(const p of pours){const b=p.shape.box;let gap=Infinity;for(const k of index.search(b.xmin-margin-.001,b.ymin-margin-.001,b.xmax+margin+.001,b.ymax+margin+.001)){const o=obs[k];if(p.layer!==o.layer||key(p.sourceElement)===key(o.sourceElement))continue;const d=touches(p.shape,o.shape)?0:p.shape.distanceTo(o.shape)[0];gap=Math.min(gap,d);if(d+1e-6<required(o))failures.push({pour:p.elementId,other:o.elementId,layer:p.layer,gapMm:d,minimumMm:required(o)})}minimums.push({pour:p.elementId,layer:p.layer,minimumOtherNetCopperGapMm:gap})}
return {minimums,failures}
}
if(import.meta.main){
 const [input,output]=process.argv.slice(2)
 if(!output)throw Error('Usage: bun scripts/check-surface-pour-clearance.tsx <native-board.json> <output.json>')
 const result=checkSurfacePourClearance(JSON.parse(readFileSync(input,'utf8')))
 writeFileSync(output,JSON.stringify(result,null,2)+'\n')
 console.log('Surface pour pieces',result.minimums.length,'clearance failures',result.failures.length)
 if(result.failures.length)process.exit(1)
}
