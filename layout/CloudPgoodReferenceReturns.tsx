import {Children,cloneElement,isValidElement} from 'react'
import moves from '../data/cloud-pgood-reference-returns.json'
/** Two existing buried GND stitches only. No signal, terminal, midpoint, or scope change. */
export function applyPgoodReferenceReturns(node:any):any {
 const seen=new Set<string>()
 function walk(n:any):any {
  if(Array.isArray(n))return n.map(walk)
  if(!isValidElement(n))return n
  if(typeof n.type==='function')return walk(n.type(n.props))
  const p:any={...n.props}
  if(n.type==='via'){
   const m=moves.find(m=>m.name===p.name)
   if(m){
    const expectedConnection=m.name==='HDMI_ENDPOINT_RETURN_3'?'.Processor > .U1 > .A1':'net.GND'
    if(p.connectsTo!==expectedConnection||p.fromLayer!=='inner1'||p.toLayer!=='inner6'||p.holeDiameter!==.15||p.outerDiameter!==.3)throw Error('Unexpected GND stitch identity '+m.name)
    const same=(xy:number[])=>Math.hypot(p.pcbX-xy[0],p.pcbY-xy[1])<1e-6
    if(!same(m.old)&&!same(m.new))throw Error('Unexpected GND stitch location '+m.name)
    Object.assign(p,{pcbX:m.new[0],pcbY:m.new[1]});seen.add(m.name)
   }
  }
  if(p.footprint&&isValidElement(p.footprint))p.footprint=walk(p.footprint)
  return cloneElement(n,p,...Children.toArray(n.props.children).map(walk))
 }
 const result=walk(node)
 if(seen.size!==2)throw Error('Expected exactly two PGOOD reference returns')
 return result
}
