import {Children,cloneElement,isValidElement} from 'react'
import data from '../data/cloud-i2c-sda-real-pull.json'
/** Whole actual 10k R_PWR5 move; real-terminal SDA tree, three midpoint sites removed.
 * The single existing SCL midpoint remains explicit. No new signal midpoint. */
export function applyI2cSdaRealPull(node:any):any {
 if(Array.isArray(node))return node.map(applyI2cSdaRealPull)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyI2cSdaRealPull(node.type(node.props))
 const p:any={...node.props},s=data.placement
 if(p.name==='R_PWR5')Object.assign(p,{pcbX:s.center[0],pcbY:s.center[1],pcbRotation:s.rotation,layer:s.layer})
 if(node.type==='via'&&p.connectsTo==='.Power_management > .R_PWR5 > .pin2')Object.assign(p,{pcbX:s.v3[0],pcbY:s.v3[1],fromLayer:'bottom',toLayer:'inner5'})
 if(node.type==='trace'){
  const r=data.routes.find(r=>r.name===p.name)
  if(r){Object.assign(p,{from:r.from,to:r.to,width:.1,pcbPathRelativeTo:'.Processor > .U1 > .A1',pcbPaths:[[r.from,...r.points,r.to]]});delete p.pcbPath}
 }
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyI2cSdaRealPull(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyI2cSdaRealPull))
}
