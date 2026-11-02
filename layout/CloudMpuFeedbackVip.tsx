import {Children,cloneElement,isValidElement} from 'react'
/** One actual L_PWR2 pad barrel, with an Inner2 copper tap and an Inner5 feedback endpoint. */
export function applyMpuFeedbackVip(node:any):any {
 if(Array.isArray(node))return node.map(applyMpuFeedbackVip)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyMpuFeedbackVip(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='via'&&p.name==='MPU_SOURCE')p.toLayer='inner5'
 if(node.type==='via'&&p.name==='MPU226_FEEDBACK_V1')return null
 if(node.type==='trace'&&p.name==='MPU226_FEEDBACK_2')return null
 if(node.type==='trace'&&p.name==='MPU_MAIN_0'){
  p.from='MPU_MAIN_V0.inner2'
  p.to='net.VDD_MPU'
  p.pcbPaths=[[p.from,{x:12.5,y:4.5},{x:16.835,y:8.835},{x:21.3,y:8.835}]]
 }
 if(node.type==='trace'&&p.name==='MPU226_FEEDBACK_1'){
  p.to='MPU_SOURCE.inner5'
  p.pcbPaths=[[p.from,{x:19.8,y:3.6,layer:'inner5'},{x:19.8,y:7.335,layer:'inner5'},{x:21.3,y:8.835,layer:'inner5'},p.to]]
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyMpuFeedbackVip))
}
