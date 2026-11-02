import {Children,cloneElement,isValidElement} from 'react'
import candidate from '../data/cloud-d21-d22-inner4.json'
/** Fixed physical pads. No plane edits. Exact Astra-selected local coupling envelopes; no global spacing waiver. */
export function applyD21D22Inner4(node:any):any {
 if(Array.isArray(node))return node.map(applyD21D22Inner4)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyD21D22Inner4(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='via'&&(p.name==='D21_CPU_VIP'||p.name==='D21_RN1_VIP'))p.toLayer='inner4'
 if(node.type==='trace'&&p.name==='CLOUD_ETH_HDMI_RGB_D21_ENDPOINT_ONLY'){
  if(p.from!=='D21_CPU_VIP.inner2'||p.to!=='D21_RN1_VIP.inner2')throw Error('D21 endpoint identity changed')
  p.from='D21_CPU_VIP.inner4';p.to='D21_RN1_VIP.inner4';p.width=.1
  p.pcbPathRelativeTo='.Processor > .U1 > .A1';p.pcbPaths=[[p.from,...candidate.d21.points.map(([x,y])=>({x,y,layer:'inner4'})),p.to]];delete p.pcbPath
 }
 if(node.type==='trace'&&p.name==='VIDEO_HDMI_RGB_D22_2'){
  const ps=candidate.d22.points.map(([x,y])=>({x,y,layer:'inner4'}));const a=ps[0],b=ps[ps.length-1]
  p.width=.1;p.pcbPathRelativeTo='.Processor > .U1 > .A1'
  p.pcbPaths=[[p.from,{x:a.x,y:a.y,via:true,fromLayer:'top',toLayer:'inner4'},...ps,{x:b.x,y:b.y,via:true,fromLayer:'inner4',toLayer:'bottom'},p.to]];delete p.pcbPath
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyD21D22Inner4))
}
export function CloudD21CpuReturn(){return <group name="Cloud_D21_I4_return" pcbX={0} pcbY={0} pcbRelative><via name="D21_CPU_I1_I3_RETURN" pcbX={4.8} pcbY={.8} fromLayer="inner1" toLayer="inner3" holeDiameter={.15} outerDiameter={.30} connectsTo="net.GND"/></group>}
