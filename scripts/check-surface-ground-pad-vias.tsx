import {Children, isValidElement} from "react"
import {createHash} from "node:crypto"
import {readFileSync, writeFileSync} from "node:fs"
import {getFullConnectivityMapFromCircuitJson} from "circuit-json-to-connectivity-map"
import Board from "../index"

// Read-only DC candidates, using actual exported post-drill surface islands.
// Removing a candidate still requires a fresh native + exported connectivity check.
const [circuitPath, groundPath, outputPath,...boundsArgs] = process.argv.slice(2)
if(boundsArgs.length!==0&&boundsArgs.length!==4)throw Error("Optional bounds: xmin xmax ymin ymax")
const [xmin,xmax,ymin,ymax]=boundsArgs.length?boundsArgs.map(Number):[-10,10,-12,12]
if(![xmin,xmax,ymin,ymax].every(Number.isFinite)||xmin>=xmax||ymin>=ymax)throw Error("Invalid bounds")
if (!outputPath) throw Error("Usage: bun scripts/check-surface-ground-pad-vias.tsx <native-board.json> <postdrill-ground.json> <output.json>")
const input=readFileSync(circuitPath), records=JSON.parse(input.toString()), ground=JSON.parse(readFileSync(groundPath,"utf8"))
const sha256=createHash("sha256").update(input).digest("hex")
if(ground.nativeSha256!==sha256||ground.status!=="pass")throw Error("Ground report must pass and match this exact native build")
const conn=getFullConnectivityMapFromCircuitJson(records), id=(r:any)=>r[r.type+"_id"], key=(r:any)=>conn.getNetConnectedToId(r.source_net_id??id(r)), own=key(records.find((r:any)=>r.type==="source_net"&&r.name==="GND"))
const nodes:any[]=[], refs:string[]=[], strings=(x:any):string[]=>typeof x==="string"?[x]:Array.isArray(x)?x.flatMap(strings):x&&typeof x==="object"?Object.values(x).flatMap(strings):[]
function walk(x:any){
  if(Array.isArray(x))return x.forEach(walk)
  if(!isValidElement<any>(x))return
  if(typeof x.type==="function")return walk(x.type(x.props))
  if(x.type==="via")nodes.push(x.props)
  if(x.type==="trace"||x.type==="copperpour")for(const k of ["from","to","connectsTo","pcbPath","pcbPaths"])refs.push(...strings(x.props[k]))
  Children.toArray(x.props.children).forEach(walk)
}
walk(Board())
const barrels=new Map(ground.barrels.map((b:any)=>[b.id,b])), through=ground.barrels.filter((b:any)=>b.span.includes("top")&&b.span.includes("bottom")), candidates:any[]=[], retained:any[]=[]
for(const p of nodes){
  if(!/^CLOUD_GND_PAD_\d+$/.test(p.name)||p.pcbX<xmin||p.pcbX>xmax||p.pcbY<ymin||p.pcbY>ymax)continue
  const matches=records.filter((v:any)=>v.type==="pcb_via"&&key(v)===own&&Math.hypot(v.x-p.pcbX,v.y-p.pcbY)<1e-7)
  if(matches.length!==1)throw Error(`Ambiguous native ground pad via ${p.name}`)
  const v=matches[0], b:any=barrels.get(id(v))
  if(v.layers.includes("top")&&v.layers.includes("bottom"))continue
  const layer=v.layers.includes("top")?"top":v.layers.includes("bottom")?"bottom":null
  const base={name:p.name,index:Number(p.name.split("_").at(-1)),selector:p.connectsTo,x:p.pcbX,y:p.pcbY,from:p.fromLayer,to:p.toLayer,layer}
  if(!layer||!b){retained.push({...base,reason:"No matched surface GND annulus"});continue}
  const pad=records.find((s:any)=>s.type==="pcb_smtpad"&&s.layer===layer&&key(s)===own&&Math.hypot(s.x-p.pcbX,s.y-p.pcbY)<1e-7&&(s.shape==="circle"?s.radius>=v.outer_diameter/2-1e-6:s.shape==="rect"&&Math.min(s.width,s.height)>=v.outer_diameter-1e-6))
  if(!pad){retained.push({...base,reason:"Via land is not contained in a matching SMT pad"});continue}
  if(refs.some(s=>new RegExp("(?:^|[.\\s>])"+p.name+"(?:[.\\s>]|$)").test(s))){retained.push({...base,reason:"Trace/pour selector references this via"});continue}
  const surface=new Set((b.surfaceNeckIslands??b.islands).filter((i:any)=>i[0]===layer).map((i:any)=>i.join(":")))
  const targets=through.filter((t:any)=>(t.surfaceNeckIslands??t.islands).some((i:any)=>i[0]===layer&&surface.has(i.join(":")))).map((t:any)=>({id:t.id,center:t.center,euclideanDistanceMm:Math.hypot(t.center[0]-v.x,t.center[1]-v.y)})).sort((a:any,b:any)=>a.euclideanDistanceMm-b.euclideanDistanceMm)
  if(!targets.length){retained.push({...base,reason:"No through GND barrel on this post-drill surface island"});continue}
  candidates.push({...base,nativeVia:id(v),pad:pad.pcb_smtpad_id,nearestThrough:targets[0]})
}
const report={boundsMm:{xmin,xmax,ymin,ymax},nativeSha256:sha256,surfaceNeckModel:ground.surfaceNeckModel??null,groundReportSha256:createHash("sha256").update(readFileSync(groundPath)).digest("hex"),scope:"Selected rectangle in boundsMm. Native named pad vias only. Same actual post-drill surface copper island as an exported through GND barrel; via land contained in its SMT pad; no trace/pour selector references. DC candidates only, no SI/PI or fabrication qualification.",candidateCount:candidates.length,retainedCount:retained.length,candidates,retained}
writeFileSync(outputPath,JSON.stringify(report,null,2)+"\n")
console.log(JSON.stringify({candidateCount:candidates.length,retainedCount:retained.length}))
