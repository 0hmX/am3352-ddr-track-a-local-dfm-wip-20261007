import {Children,cloneElement,isValidElement} from 'react'
import data from '../data/cloud-pmic-pull.json'
/** Preserve real R_PWR4 10k part and net topology, relocate both real pads. */
export function applyPmicInterruptPull(node:any):any {
 if(Array.isArray(node))return node.map(applyPmicInterruptPull)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyPmicInterruptPull(node.type(node.props))
 const p:any={...node.props},q=data.placement
 if(p.name==='R_PWR4')Object.assign(p,{pcbX:q.center[0],pcbY:q.center[1],pcbRotation:q.rotation,layer:q.layer})
 if(node.type==='via'&&p.connectsTo==='.Power_management > .R_PWR4 > .pin2')Object.assign(p,{pcbX:q.v3[0],pcbY:q.v3[1],fromLayer:'top',toLayer:'inner5'})
 if(node.type==='trace'){
  const r:any=data.routes.find(r=>r.name===p.name)
  if(r){const ps=r.points.map(([x,y]:number[])=>({x,y,layer:r.layer})),first=ps[0],last=ps[ps.length-1];Object.assign(p,{from:r.from,to:r.to,width:r.width,pcbPathRelativeTo:'.Processor > .U1 > .A1',pcbPaths:[[r.from,...(r.fromLayer!==r.layer?[{...first,via:true,fromLayer:r.fromLayer,toLayer:r.layer}]:[]),...ps,...(r.toLayer!==r.layer?[{...last,via:true,fromLayer:r.layer,toLayer:r.toLayer}]:[]),r.to]]});delete p.pcbPath}
 }
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyPmicInterruptPull(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyPmicInterruptPull))
}
