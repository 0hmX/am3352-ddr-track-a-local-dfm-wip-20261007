import {Children,cloneElement,isValidElement} from 'react'
/** Same-length D14 diagonal relief for the actual V35 WARMRST pull barrel and its GND drill. */
export function applyD14WarmrstRelief(node:any):any{
 if(Array.isArray(node))return node.map(applyD14WarmrstRelief)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyD14WarmrstRelief(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name==='CLOUD_RN4_ENDPOINT_HDMI_D14'){
  p.pcbPaths=p.pcbPaths.map((path:any[])=>path.map(q=>typeof q==='object'&&q&&((Math.abs(q.x-34.45)<1e-6&&Math.abs(q.y+17.95)<1e-6)||(Math.abs(q.x-24.15)<1e-6&&Math.abs(q.y+7.65)<1e-6))?{...q,x:q.x+.6}:q))
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyD14WarmrstRelief))
}
