import {Children,cloneElement,isValidElement} from 'react'
import route from '../data/cloud-mdio-inner4-route.json'
/** Real MDIO endpoint spans and nearby ground returns; validated with the companion Top PGOOD route. */
export function applyMdioInner4Candidate(x:any):any {
 if(Array.isArray(x))return x.map(applyMdioInner4Candidate)
 if(!isValidElement(x))return x
 if(typeof x.type==='function')return applyMdioInner4Candidate(x.type(x.props))
 const p:any={...x.props}
 if(x.type==='trace'&&p.name==='CLOUD_ETH_LAYERED_ETH_MDIO'){
  if(p.from!=='.Processor > .U1 > .M17'||p.to!=='.Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .2')throw new Error('MDIO actual terminal identity changed')
  const ps=route.points!.map(([x,y])=>({x,y,layer:'inner4'}));const a=ps[0],b=ps[ps.length-1]
  p.width=.1;p.pcbPathRelativeTo='.Processor > .U1 > .A1';p.pcbPaths=[[p.from,{x:a.x,y:a.y,via:true,fromLayer:'top',toLayer:'inner4'},...ps,{x:b.x,y:b.y,via:true,fromLayer:'inner4',toLayer:'top'},p.to]]
 }
 return cloneElement(x,p,...Children.toArray(x.props.children).map(applyMdioInner4Candidate))
}

export function CloudMdioReferenceBridges(){return <group name="Cloud_MDIO_reference_bridges" pcbX={0} pcbY={0} pcbRelative><via name="MDIO_I4_RETURN_0" pcbX={1.633169} pcbY={5.711889} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.GND"/></group>}
