import {Children,cloneElement,isValidElement} from 'react'

/** Trace-only 250um lane relief. Both real terminals, spans and 57.652046399mm length stay exact. */
export function applyPclkCkeWideClearance(node:any):any {
  if(Array.isArray(node)) return node.map(applyPclkCkeWideClearance)
  if(!isValidElement(node)) return node
  if(typeof node.type==='function') return applyPclkCkeWideClearance(node.type(node.props))
  const p:any={...node.props}
  if(node.type==='trace' && p.name==='CLOUD_HDMI_LAYERED_HDMI_PCLK_RX') {
    let replaced=0,inserted=0
    p.pcbPaths=p.pcbPaths.map((path:any[])=>path.flatMap(q=>{
      if(typeof q==='object' && !q.via && q.layer==='inner4') {
        if(Math.abs(q.x-8.65)<1e-7 && Math.abs(q.y+29.7)<1e-7) {
          replaced++; return [{...q,x:8.9,y:-29.95}]
        }
        if(Math.abs(q.x-8.65)<1e-7 && Math.abs(q.y+10.525)<1e-7) {
          inserted++; return [{...q,x:8.9,y:-10.775},q]
        }
      }
      return [q]
    }))
    if(replaced!==1 || inserted!==1) throw new Error('PCLK clearance mapper requires the exact frozen V22 path')
  }
  return cloneElement(node,p,...Children.toArray(node.props.children).map(applyPclkCkeWideClearance))
}
