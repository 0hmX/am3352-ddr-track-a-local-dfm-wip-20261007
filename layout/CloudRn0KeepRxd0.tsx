import {Children,cloneElement,isValidElement} from 'react'
export function applyKeepRxd0(x:any):any{
 if(Array.isArray(x))return x.map(applyKeepRxd0)
 if(!isValidElement(x))return x
 if(typeof x.type==='function')return applyKeepRxd0(x.type(x.props))
 const p:any={...x.props}
 if(x.type==='trace'&&p.name==='CLOUD_RN0_NEAR_HDMI_D17'){
  let n=0
  p.pcbPaths=p.pcbPaths.map((path:any[])=>path.map(q=>{
   if(q&&typeof q==='object'&&!q.via&&Math.abs(q.y-2.385)<1e-8&&[33.615,10.39].some(v=>Math.abs(q.x-v)<1e-8)){n++;return{...q,x:q.x-.015,y:2.4}}
   return q
  }))
  if(n!==2)throw Error(`Keep-RXD0 expected2 D17 lane vertices, got${n}`)
 }
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyKeepRxd0(p.footprint)
 return cloneElement(x,p,...Children.toArray(x.props.children).map(applyKeepRxd0))
}
