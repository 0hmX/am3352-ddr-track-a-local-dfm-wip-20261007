import {Children,cloneElement,isValidElement} from 'react'
import {applyControlReferenceRemedies} from './CloudControlReferenceRemedies'
import {applySdaCorridorRelief} from './CloudSdaCorridorMapper'
/** Reviewed whole support-component moves and affected routes. U1/U3 and R177 stay fixed. */
function visit(node:any):any{
 if(Array.isArray(node))return node.map(visit)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return visit(node.type(node.props))
 const p:any={...node.props}
 if(p.name==='R_BOOT7')Object.assign(p,{pcbX:7,pcbY:-9.1,pcbRotation:180,layer:'bottom'})
 if(p.name==='R_BOOT11')Object.assign(p,{pcbX:7.9225,pcbY:-11.8125,pcbRotation:0,layer:'top'})
 if(p.name==='R_HDMI_REF_R188')Object.assign(p,{pcbX:54.95,pcbY:-32.49,pcbRotation:90,layer:'bottom'})
 if(node.type==='via'){
  if(p.connectsTo==='.Boot_and_clock > .R_BOOT7 > .pin2')Object.assign(p,{pcbX:7.51,pcbY:-9.1,fromLayer:'bottom',toLayer:'inner6'})
  if(p.connectsTo==='.Boot_and_clock > .R_BOOT11 > .pin2')Object.assign(p,{pcbX:8.4325,pcbY:-11.8125,fromLayer:'top',toLayer:'inner1'})
  if(p.connectsTo==='.HDMI > .R_HDMI_REF_R188 > .pin1')Object.assign(p,{pcbX:54.95,pcbY:-31.98,fromLayer:'bottom',toLayer:'inner1'})
 }
 if(node.type==='trace'&&(p.name==='VIDEO_HDMI_HPD_37'||p.name==='CLOUD_LOCAL_HDMI_HPDFIRST_8_NEXT_HDMI_DDC_SDA'))return null
 if(node.type==='trace'&&p.name==='VIDEO_SYSBOOT7_21')p.pcbPaths=p.pcbPaths.map((path:any[])=>{
  const at=path.findIndex(q=>typeof q==='object'&&Math.abs(q.x-6.915)<1e-6&&Math.abs(q.y+3.02)<1e-6)
  if(at<0)throw Error('SYS7 lower-stem checkpoint not found')
  return [...path.slice(0,at+1),...[[6.915,-9.565],[6.715,-9.765],[6.2,-9.765],[6,-9.965],[6,-10.225]].map(([x,y])=>({x,y,layer:'bottom'})),path.at(-1)]
 })
 if(node.type==='trace'&&p.name==='RN6_INPUT_HDMI_VSYNC')p.pcbPaths=p.pcbPaths.map((path:any[])=>path.map(q=>{
  if(typeof q!=='object'||Math.abs(q.x-6.35)>1e-6)return q
  if(Math.abs(q.y+3.95)<1e-6)return {...q,x:6.4125,y:-4.0125}
  if(Math.abs(q.y+4.65)<1e-6)return {...q,x:6.4125,y:-4.7125}
  return q
 }))
 return cloneElement(node,p,...Children.toArray(node.props.children).map(visit))
}
export function applyCloudRouting226(node:any):any{return applySdaCorridorRelief(applyControlReferenceRemedies(visit(node)))}
