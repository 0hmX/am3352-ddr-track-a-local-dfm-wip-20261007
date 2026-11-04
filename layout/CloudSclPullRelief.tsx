import {Children,cloneElement,isValidElement} from 'react'
import data from '../data/cloud-scl-r6-routes.json'
/** Whole real pull-resistor move, two SCL branches, and bounded same-layer Ethernet clearance. */
export function applySclPullAndEthernetRelief(node:any):any{
 if(Array.isArray(node))return node.map(applySclPullAndEthernetRelief)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applySclPullAndEthernetRelief(node.type(node.props))
 const p:any={...node.props},placement=data.placement
 if(p.name==='R_PWR6')Object.assign(p,{pcbX:placement.center[0],pcbY:placement.center[1],pcbRotation:placement.rotation,layer:placement.layer})
 if(node.type==='via'&&p.connectsTo==='.Power_management > .R_PWR6 > .pin2')Object.assign(p,{pcbX:placement.v3Pad[0],pcbY:placement.v3Pad[1],fromLayer:'bottom',toLayer:'inner5'})
 if(node.type==='trace'){
  const r:any=data.routes.find(r=>r.name===p.name)
  if(r){const from=r.from??p.from,to=r.to??p.to,ps=r.points.map(([x,y]:number[])=>({x,y,layer:r.layer})),first=ps[0],last=ps[ps.length-1];Object.assign(p,{from,to,width:r.width,pcbPathRelativeTo:'.Processor > .U1 > .A1',pcbPaths:[[from,...(r.fromLayer!==r.layer?[{...first,via:true,fromLayer:r.fromLayer,toLayer:r.layer}]:[]),...ps,...(r.toLayer!==r.layer&&!r.omitFinalVia?[{...last,via:true,fromLayer:r.layer,toLayer:r.toLayer}]:[]),to]]});delete p.pcbPath}
 }
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applySclPullAndEthernetRelief(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applySclPullAndEthernetRelief))
}
