import {Children,cloneElement,isValidElement} from 'react'

/** Local ties between the continuous Inner3 reference and the Top-side Inner1 reference. */
export function CloudControlReferenceReturns(){return <>
 <via name="CONTROL_GND_RETURN_SDA_ESD" pcbX={54.673686} pcbY={-26.525} fromLayer="inner1" toLayer="inner3" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.GND" />
 <via name="CONTROL_GND_RETURN_CEC_U17" pcbX={47.909699} pcbY={-30.040437} fromLayer="inner1" toLayer="inner3" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.GND" />
 <via name="CONTROL_GND_RETURN_CEC_DIODE" pcbX={49.175} pcbY={-35.523686} fromLayer="inner1" toLayer="inner3" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.GND" />
 </>}

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
