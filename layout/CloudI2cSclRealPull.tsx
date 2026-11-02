import {Children,cloneElement,isValidElement} from 'react'
import data from '../data/cloud-i2c-scl-real-pull.json'
/** Whole actual 10k R_PWR6 move; real-terminal SCL tree; final SCL midpoint removed.
 * CPU, PMIC and HDMI pads stay fixed. No new signal midpoint. */
export function applyI2cSclRealPull(node:any):any {
 if(Array.isArray(node))return node.map(applyI2cSclRealPull)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyI2cSclRealPull(node.type(node.props))
 const p:any={...node.props},s=data.placement
 if(p.name==='R_PWR6')Object.assign(p,{pcbX:s.center[0],pcbY:s.center[1],pcbRotation:s.rotation,layer:s.layer})
 if(node.type==='via'&&p.connectsTo==='.Power_management > .R_PWR6 > .pin2')Object.assign(p,{pcbX:s.v3[0],pcbY:s.v3[1],fromLayer:'bottom',toLayer:'inner5'})
 if(node.type==='trace'){
  const r=data.routes.find(r=>r.name===p.name)
  if(r){Object.assign(p,{from:r.from,to:r.to,width:.1,pcbPathRelativeTo:'.Processor > .U1 > .A1',pcbPaths:[[r.from,...r.points,r.to]]});delete p.pcbPath}
 }
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyI2cSclRealPull(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyI2cSclRealPull))
}
