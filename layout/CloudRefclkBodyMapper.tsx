import {Children,cloneElement,isValidElement} from 'react'
import data from '../data/cloud-refclk-body.json'
/** Interim body shortening only: retain exactly the three existing REFCLK barrels, including its unresolved non-pad midpoint. */
export function applyCompactRefclkBody(node:any):any {
 if(Array.isArray(node))return node.map(applyCompactRefclkBody)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyCompactRefclkBody(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name===data.name){
  const geometry=data.route.map((q:any)=>q.route_type==='via'?{x:q.x,y:q.y,via:true,fromLayer:q.from_layer,toLayer:q.to_layer}:{x:q.x,y:q.y,layer:q.layer})
  Object.assign(p,{width:data.width,pcbPathRelativeTo:'.Processor > .U1 > .A1',pcbPaths:[[p.from,...geometry,p.to]]});delete p.pcbPath
 }
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyCompactRefclkBody(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyCompactRefclkBody))
}
