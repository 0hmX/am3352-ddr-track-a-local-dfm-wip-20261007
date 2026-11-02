import {Children,cloneElement,isValidElement} from 'react'
import data from '../data/cloud-crs-reduced.json'
/** Remove two existing CRS midpoint barrels; retain both true terminal barrels and the first unresolved non-pad midpoint. No new transition. */
export function applyCrsReducedTransitions(node:any):any {
 if(Array.isArray(node))return node.map(applyCrsReducedTransitions)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyCrsReducedTransitions(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name===data.name){
  const geometry=data.route.map((q:any)=>q.route_type==='via'?{x:q.x,y:q.y,via:true,fromLayer:q.from_layer,toLayer:q.to_layer}:{x:q.x,y:q.y,layer:q.layer})
  Object.assign(p,{width:data.width,pcbPathRelativeTo:'.Processor > .U1 > .A1',pcbPaths:[[p.from,...geometry,p.to]]});delete p.pcbPath
 }
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyCrsReducedTransitions(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyCrsReducedTransitions))
}
