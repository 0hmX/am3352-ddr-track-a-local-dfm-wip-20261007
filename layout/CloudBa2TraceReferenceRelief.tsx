import {Children,cloneElement,isValidElement} from 'react'
import delta from '../data/cloud-ba2-trace-reference-delta.json'
/** BA2 trace-only reference candidate. Preserve both real endpoint via objects. */
export function applyBa2TraceOnlyReferenceRelief(node:any):any {
 if(Array.isArray(node))return node.map(applyBa2TraceOnlyReferenceRelief)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyBa2TraceOnlyReferenceRelief(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name==='DDR_BA2'){
  const points=p.pcbPath.filter((v:any)=>typeof v==='object'&&!v.via).map((v:any)=>[v.x,v.y])
  const first=p.pcbPath[1],last=p.pcbPath[p.pcbPath.length-2]
  if(p.width!==.1||JSON.stringify(points)!==JSON.stringify(delta.before.points)||!first.via||first.fromLayer!=='top'||first.toLayer!=='inner2'||!last.via||last.fromLayer!=='inner2'||last.toLayer!=='top')throw new Error('BA2 actual input route or endpoint spans changed')
  p.pcbPath=[p.pcbPath[0],first,...delta.after.points.map(([x,y])=>({x,y})),last,p.pcbPath[p.pcbPath.length-1]]
 }
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyBa2TraceOnlyReferenceRelief(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyBa2TraceOnlyReferenceRelief))
}
