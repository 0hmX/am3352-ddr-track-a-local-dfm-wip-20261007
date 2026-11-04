import {Children,cloneElement,isValidElement} from 'react'
import routes from '../data/cloud-typec-control-corners.json'
/** Local Type-C signal corners; actual endpoints, layer and width are unchanged. */
export function applyTypecCorners(node:any):any {
  if(Array.isArray(node)) return node.map(applyTypecCorners)
  if(!isValidElement(node)) return node
  if(typeof node.type==='function') return applyTypecCorners(node.type(node.props))
  const p:any={...node.props}, points=(routes as any)[p.name]
  if(node.type==='trace' && points) {
    p.pcbPaths=[[p.from,...points.map(([x,y]:number[])=>({x,y,layer:'top'})),p.to]]
    delete p.pcbPath
    p.pcbPathRelativeTo='.Processor > .U1 > .A1'
  }
  return cloneElement(node,p,...Children.toArray(node.props.children).map(applyTypecCorners))
}
