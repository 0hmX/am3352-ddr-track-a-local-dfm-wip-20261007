import {Children,cloneElement,isValidElement} from 'react'

/** Local ties between the continuous Inner3 reference and the Top-side Inner1 reference. */


/** Keep the reviewed HDMI 5V trace body; ground barrel spans live at their native source. */
export function applyControlReferenceRemedies(node:any):any{
 if(Array.isArray(node))return node.map(applyControlReferenceRemedies)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyControlReferenceRemedies(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name==='HDMIPWR_HDMI_5V_13'){
  if(p.width!==0.15)throw Error('HDMI 5V width changed unexpectedly')
  p.pcbPaths=[[p.from,{x:56.99,y:-31.5},{x:56.99,y:-31.62},{x:52.1,y:-36.51},{x:46,y:-36.51},p.to]]
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyControlReferenceRemedies))
}
