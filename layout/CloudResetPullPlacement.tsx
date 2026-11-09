import {Children,cloneElement,isValidElement} from 'react'
/** Same real10k pull and same Top side; both pads, its V3 feed and component rotate together. */
export function applyResetPullPlacement(node:any):any{
 if(Array.isArray(node))return node.map(applyResetPullPlacement)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyResetPullPlacement(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name==='CLOUD_V3V3_SURFACE_2')return null
 if(p.name==='R_HDMI_RESET_GPIO_PU')Object.assign(p,{pcbX:32.935,pcbY:13,pcbRotation:180,layer:'top'})
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyResetPullPlacement(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyResetPullPlacement))
}
