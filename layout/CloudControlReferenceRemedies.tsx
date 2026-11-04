import {Children,cloneElement,isValidElement} from 'react'

/** Local ties between the continuous Inner3 reference and the Top-side Inner1 reference. */
export function CloudControlReferenceReturns(){return <>
 <via name="CONTROL_GND_RETURN_SDA_ESD" pcbX={54.673686} pcbY={-26.525} fromLayer="inner1" toLayer="inner3" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.GND" />
 <via name="CONTROL_GND_RETURN_CEC_U17" pcbX={47.909699} pcbY={-30.040437} fromLayer="inner1" toLayer="inner3" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.GND" />
 <via name="CONTROL_GND_RETURN_CEC_DIODE" pcbX={49.175} pcbY={-35.523686} fromLayer="inner1" toLayer="inner3" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.GND" />
 </>}

/** Pure mapper: extend the existing real J17 GND pad barrel; retain exact signal bodies. */
export function applyControlReferenceRemedies(node:any):any{
 if(Array.isArray(node))return node.map(applyControlReferenceRemedies)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyControlReferenceRemedies(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='via'&&p.connectsTo==='.HDMI > .J_HDMI > .17'){
  if(p.pcbX!==59.69||p.pcbY!==-32||p.fromLayer!=='top')throw Error('Unexpected J17 GND pad geometry')
  p.toLayer='inner3'
 }
 if(node.type==='trace'&&p.name==='HDMIPWR_HDMI_5V_13'){
  if(p.width!==0.15)throw Error('HDMI 5V width changed unexpectedly')
  p.pcbPaths=[[p.from,{x:56.99,y:-31.5},{x:56.99,y:-31.62},{x:52.1,y:-36.51},{x:46,y:-36.51},p.to]]
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyControlReferenceRemedies))
}
