import {Children,cloneElement,isValidElement} from 'react'
/** Extend existing centered R177 GND feed to the selected Inner3 reference. No component moves. */
export function applyRextGroundReference(node:any):any{
 if(Array.isArray(node))return node.map(applyRextGroundReference)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyRextGroundReference(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='via'&&p.connectsTo==='.HDMI > .R_HDMI_REF_R177 > .pin2')Object.assign(p,{fromLayer:'top',toLayer:'inner3'})
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyRextGroundReference))
}
