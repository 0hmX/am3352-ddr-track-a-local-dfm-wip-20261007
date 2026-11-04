import {Children,cloneElement,isValidElement} from 'react'
/** Whole existing10k pull remains on Top; its two real pads and V3 feed move together. */
export function applyWarmResetPull(node:any):any{
 if(Array.isArray(node))return node.map(applyWarmResetPull)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyWarmResetPull(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='group'&&p.name==='CloudWarmResetEndpointRoutes')return null
 if(p.name==='R_PWR3')Object.assign(p,{pcbX:26.75,pcbY:-11.25,pcbRotation:180,layer:'top'})
 if(node.type==='via'&&p.connectsTo==='.Power_management > .R_PWR3 > .pin2')Object.assign(p,{pcbX:26.24,pcbY:-11.25,fromLayer:'top',toLayer:'inner5'})
 if(node.type==='silkscreentext'&&p.text==='R_PWR3')Object.assign(p,{pcbX:26.75,pcbY:-10.55,pcbRotation:0,fontSize:.4})
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyWarmResetPull(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyWarmResetPull))
}
