import {Children,cloneElement,isValidElement} from 'react'
import data from '../data/cloud-typec-hook-route.json'
/** Remove an actual Type-C control hairpin; exact real endpoints, layer, width and vias preserved. */
export function applyTypecHookCleanup(node:any):any{
 if(Array.isArray(node))return node.map(applyTypecHookCleanup)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyTypecHookCleanup(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name==='CLOUD_LOCAL_14_TYPEC_3A_OK'){
  p.pcbPathRelativeTo='.Processor > .U1 > .A1'
  p.pcbPaths=[[p.from,...data.points.map(([x,y])=>({x,y,layer:'top'})),p.to]]
  delete p.pcbPath
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyTypecHookCleanup))
}
