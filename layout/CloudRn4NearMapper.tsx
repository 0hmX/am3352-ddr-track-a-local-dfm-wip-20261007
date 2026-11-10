import {Children,cloneElement,isValidElement} from 'react'
import removed from '../data/cloud-rn4-near-retired.json'
import d21 from '../data/cloud-rn4-d21-relief.json'
import mapping from '../data/cloud-rn4-near-mapping.json'
const traces=new Set(removed)
/** Whole real RN4/R1/R9 moves, exact isolated33ohm pair permutation, and bounded D21/return companion. Exact selected geometry; combined validation is required after composition. */
function plan(node:any):any {
 if(Array.isArray(node))return node.map(plan)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return plan(node.type(node.props))
 const p:any={...node.props}
 if(p.name==='RN_HDMI_4'){Object.assign(p,{pcbX:19,pcbY:-16.5,pcbRotation:270,layer:'bottom'});p.connections=Object.fromEntries(Object.entries(mapping.after).map(([pin,net])=>['pin'+pin,'net.'+net]))}
 if(node.type==='trace'&&traces.has(p.name))return null
 if(node.type==='via'){
  if(['SYS13_RN4_VIP','SYS1_RN4_VIP','SYS1_R1_VIP'].includes(p.name))return null
  if(p.connectsTo==='.Boot_and_clock > .R_BOOT1 > .pin2')return null
  if(p.connectsTo==='.Boot_and_clock > .R_BOOT9 > .pin2')Object.assign(p,{pcbX:11.91,pcbY:-4.4,fromLayer:'bottom',toLayer:'inner6'})
 }
 if(p.name==='R_BOOT1')Object.assign(p,{pcbX:11.5,pcbY:-9.98,pcbRotation:90,layer:'top'})
 if(p.name==='R_BOOT9')Object.assign(p,{pcbX:11.4,pcbY:-4.4,pcbRotation:180,layer:'bottom'})
 if(node.type==='trace'&&p.name===d21.traceName){p.pcbPathRelativeTo='.Processor > .U1 > .A1';p.pcbPaths=[[p.from,{x:d21.points[0][0],y:d21.points[0][1],layer:'top'},{x:d21.points[0][0],y:d21.points[0][1],via:true,fromLayer:'top',toLayer:'bottom'},...d21.points.map(([x,y])=>({x,y,layer:'bottom'})),p.to]];delete p.pcbPath}
 if(node.type==='silkscreentext'){
  if(p.text==='RN_HDMI_4')Object.assign(p,{pcbX:20.5,pcbY:-16.5,fontSize:.4})
  const label:any={R_BOOT1:[12.4,-9.98],R_BOOT9:[11.4,-5.25]}[p.text]
  if(label)Object.assign(p,{pcbX:label[0],pcbY:label[1],fontSize:.4})
 }
 if(p.footprint&&isValidElement(p.footprint))p.footprint=plan(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(plan))
}
export function applyRn4NearMove(node:any){return plan(node)}
