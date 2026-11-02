import {Children,cloneElement,isValidElement} from 'react'
import outline from '../data/cloud-sys5v-feed-outline.json'
/** Existing capacitor annuli are used directly; no added or fictitious via port. */
export function applySys5vEndpointCleanup(node:any):any {
 if(Array.isArray(node))return node.map(applySys5vEndpointCleanup)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applySys5vEndpointCleanup(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='via'&&['INPUT_ETH_POWER_BRIDGE_0','INPUT_ETH_POWER_BRIDGE_1'].includes(p.name))return null
 if(node.type==='copperpour'&&['INPUT_POWER_SYS5V_ETH_BRIDGE_0','INPUT_POWER_SYS5V_ETH_BRIDGE_1','INPUT_POWER_SYS5V_ETH_BRIDGE_2'].includes(p.name))return null
 if(node.type==='trace'&&p.name==='CLOUD_ETH_LAYERED_ETH_MDIO'){
  const ps=p.pcbPaths[0],a=ps.findIndex((q:any)=>Math.abs(q?.x-12.3)<1e-6&&Math.abs(q?.y-2.65)<1e-6),b=ps.findIndex((q:any)=>Math.abs(q?.x-42.225)<1e-6&&Math.abs(q?.y+3.675)<1e-6)
  if(a<0||b<a)throw new Error('Exact accepted MDIO tail not found')
  const points=[[12.3,2.65],[34.25,2.65],[40.7,-3.8],[42.1,-3.8],[42.225,-3.675]].map(([x,y])=>({x,y}))
  p.pcbPaths=[[...ps.slice(0,a),...points,...ps.slice(b+1)]]
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applySys5vEndpointCleanup))
}
export function CloudSys5vEndpointStrip(){return <copperpour name="SYS5V_REAL_PAD_INNER2_FEED" layer="inner2" connectsTo="net.SYS_5V" unbroken coveredWithSolderMask clearance={.1} boardEdgeMargin={0} outline={outline}/>}
