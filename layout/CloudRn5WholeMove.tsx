import {Children,cloneElement,isValidElement} from 'react'
import placements from '../data/cloud-rn5-placements.json'
import cke from '../data/cloud-rn5-cke-route.json'
const removedTraces=new Set(['VIDEO_SYSBOOT4_20','CLOUD_SYSBOOT_REV3_SYSBOOT8','CLOUD_SYSBOOT_REV3_SYSBOOT12','CLOUD_SYSBOOT_REV3_SYSBOOT8_STRAP','CLOUD_SYSBOOT_REV3_SYSBOOT12_STRAP'])
const removedVias=new Set(['SYS8_ARRAY_VIP','SYS12_ARRAY_VIP'])
/** Whole original-map array/pull moves and exact route replacement; no native JSON authoring. */
export function applyRn5WholeInputMove(node:any):any {
 if(Array.isArray(node))return node.map(applyRn5WholeInputMove)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyRn5WholeInputMove(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&removedTraces.has(p.name))return null
 if(node.type==='via'&&removedVias.has(p.name))return null
 const move=placements.find(x=>x.ref===p.name)
 if(move)Object.assign(p,{pcbX:move.center[0],pcbY:move.center[1],pcbRotation:move.rotation,layer:move.layer})
 if(p.name==='RN_HDMI_5')Object.assign(p,{pcbX:12.4,pcbY:-15.65,pcbRotation:180,layer:'bottom'})
 if(p.name==='R_BOOT0')Object.assign(p,{pcbX:11.34,pcbY:-15.5,pcbRotation:180,layer:'top'})
 if(node.type==='via'){
  for(const m of placements)if(p.connectsTo===`.Boot_and_clock > .${m.ref} > .pin2`)Object.assign(p,{pcbX:m.other[0],pcbY:m.other[1],fromLayer:m.layer,toLayer:m.otherEnd})
  if(p.connectsTo==='.Boot_and_clock > .R_BOOT0 > .pin2')Object.assign(p,{pcbX:10.83,pcbY:-15.5,fromLayer:'top',toLayer:'inner5'})
  if(p.name==='SYS12_CPU_RETURN')Object.assign(p,{pcbX:7.4,pcbY:-6})
  if(p.name==='SYS15_RETURN_CPU')Object.assign(p,{pcbX:5.6,pcbY:-3.325})
  if(p.name==='SYS15_RETURN_ARRAY')Object.assign(p,{pcbX:5.4,pcbY:-10.4})
  if(p.name==='SYS8_12_ARRAY_RETURN')Object.assign(p,{pcbX:6.116667,pcbY:-15.225,fromLayer:'inner3',toLayer:'inner6'})
  if(Math.abs(p.pcbX-12.4)<1e-8&&Math.abs(p.pcbY+15.65)<1e-8&&p.fromLayer==='inner1'&&p.toLayer==='inner6')p.pcbY=-15.75
 }
 if(node.type==='trace'&&p.name==='DDR_CKE'){
  const points=cke.points.map(([x,y])=>({x,y})),from=p.from,to=p.to
  delete p.pcbPaths
  p.pcbPath=[from,{...points[0],via:true,fromLayer:'top',toLayer:cke.layer},...points,{...points[points.length-1],via:true,fromLayer:cke.layer,toLayer:'top'},to]
 }
 const labels:any={R_BOOT0:[11.35,-16.2],R_BOOT4:[6.1,-16.3],R_BOOT8:[14.75,-14.25],R_BOOT12:[6.4,-14.05],RN_HDMI_5:[12.4,-17.05]}
 if((node.type==='silkscreentext'||node.type==='silkscreentext')&&labels[p.text])Object.assign(p,{pcbX:labels[p.text][0],pcbY:labels[p.text][1],fontSize:.4})
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyRn5WholeInputMove(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyRn5WholeInputMove))
}
