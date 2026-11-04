import {Children,cloneElement,isValidElement} from 'react'
/** Whole R4 move with its true V3 feed. CPU T1 through-barrel stays unchanged. */
export function applyR4PullCleanup(node:any):any {
 if(Array.isArray(node))return node.map(applyR4PullCleanup)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyR4PullCleanup(node.type(node.props))
 const p:any={...node.props}
 if(p.name==='R_BOOT4')Object.assign(p,{pcbX:5.25,pcbY:-7.13,pcbRotation:180,layer:'bottom'})
 if(node.type==='via'&&p.connectsTo==='.Boot_and_clock > .R_BOOT4 > .pin2')
  Object.assign(p,{pcbX:5.76,pcbY:-7.13,fromLayer:'bottom',toLayer:'inner5'})
 if(node.type==='trace'&&p.name==='VIDEO_SYSBOOT4_20'){
  p.pcbPaths=[[
   '.Processor > .U1 > .T1',
   {x:5.2,y:-6.8,via:true,fromLayer:'top',toLayer:'bottom'},
   {x:5.2,y:-6.8,layer:'bottom'},
   {x:4.87,y:-7.13,layer:'bottom'},
   {x:4.74,y:-7.13,layer:'bottom'},
   '.Boot_and_clock > .R_BOOT4 > .pin1'
  ]]
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyR4PullCleanup))
}
/** Shared with the conditional SYS4 array branch: emit this physical stitch once. */
export function CloudR4CpuReferenceReturn(){return <via name="SYS4_SHARED_CPU_RETURN" pcbX={5.2} pcbY={-7.4} fromLayer="inner1" toLayer="inner6" holeDiameter={.15} outerDiameter={.30} connectsTo="net.GND"/>}
