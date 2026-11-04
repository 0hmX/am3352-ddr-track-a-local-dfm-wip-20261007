import { Children, cloneElement, isValidElement } from 'react'
import routes from '../data/cloud-sys6-real-terminal-routes.json'
/** Selected SYS6 geometry. Power-barrel dependencies remain documented WIP limitations. */
export function applySys6R41CandidateV2(node:any):any {
 if(Array.isArray(node)) return node.map(applySys6R41CandidateV2)
 if(!isValidElement(node)) return node
 if(typeof node.type==='function') return applySys6R41CandidateV2(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name==='CLOUD_V1V8_REBUILD_41') {
  if(p.width!==.3)throw Error('R41 supply width changed')
  return null
 }
 if(node.type==='trace'&&p.name==='RN6_INPUT_HDMI_HSYNC'){
  const ps=routes.hsync
  p.pcbPathRelativeTo='.Processor > .U1 > .A1'
  p.pcbPaths=[[p.from,{x:4.4,y:-3.6,via:true,fromLayer:'top',toLayer:'inner2'},...ps.map(([x,y])=>({x,y,layer:'inner2'})),{x:9.65,y:-9.475,via:true,fromLayer:'inner2',toLayer:'bottom'},p.to]];delete p.pcbPath
 }
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applySys6R41CandidateV2(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applySys6R41CandidateV2))
}
export function CloudSys6RealTerminalRoutes(){
 const traces=[
  {name:'RN3_SYS6_CPU_ARRAY_I5',from:'SYS6_CPU_VIP.inner5',to:'SYS6_RN3_VIP.inner5',layer:'inner5',width:.1,points:routes.cpuToArray},
  {name:'RN3_SYS6_PULL_CPU_I5',from:'SYS6_PULL_VIP.inner5',to:'SYS6_CPU_VIP.inner5',layer:'inner5',width:.1,points:[[3.16,-4],[3.16,-4.96],[3.8,-5.6],[4.8,-5.6],[5.2,-5.2]]},
  {name:'RN3_V1V8_REAL_PAD_TIE_I4',from:'RN3_V1V8_BRIDGE_VIP.inner4',to:'net.V1V8',layer:'inner4',width:.3,points:routes.power},
 ]
 return <group name="Cloud_SYS6_real_terminal_candidate" pcbX={0} pcbY={0} pcbRelative>
  <via name="SYS6_CPU_VIP" pcbX={5.2} pcbY={-5.2} fromLayer="top" toLayer="inner5" holeDiameter={.15} outerDiameter={.30} connectsTo=".Processor > .U1 > .T3"/>
  <via name="SYS6_RN3_VIP" pcbX={6.5} pcbY={-12.475} fromLayer="bottom" toLayer="inner5" holeDiameter={.15} outerDiameter={.30} connectsTo=".HDMI > .RN_HDMI_3 > .3"/>
  <via name="SYS6_PULL_VIP" pcbX={3.16} pcbY={-4} fromLayer="bottom" toLayer="inner5" holeDiameter={.15} outerDiameter={.30} connectsTo=".Boot_and_clock > .R_BOOT6 > .pin1"/>
  <via name="RN3_V1V8_BRIDGE_VIP" pcbX={12.26} pcbY={2.5} fromLayer="bottom" toLayer="inner4" holeDiameter={.15} outerDiameter={.30} connectsTo=".Processor > .C_SRAM_MPU_0 > .pin1"/>
  {traces.map(r=><trace key={r.name} name={r.name} from={r.from} to={r.to} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,...r.points!.map(([x,y])=>({x,y,layer:r.layer})),...(r.to.startsWith('net.')?[]:[r.to])]]}/>)}
 </group>
}
