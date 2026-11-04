import {Children,cloneElement,isValidElement} from 'react'
/** Same actual pull-down moves on Top; actual signal/GND pads and centered GND feed move together. */
export function applyOscEnablePull(node:any):any{
 if(Array.isArray(node))return node.map(applyOscEnablePull)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyOscEnablePull(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&['CLOUD_LOCAL_60_OSC24_OE','CLOUD_LOCAL_0_NEXT_OSC24_OE'].includes(p.name))return null
 if(p.name==='R_CLOCK_OE_PD')Object.assign(p,{pcbX:5.375,pcbY:-11.9,pcbRotation:0,layer:'top'})
 if(node.type==='via'&&p.connectsTo==='.Boot_and_clock > .R_CLOCK_OE_PD > .pin2')Object.assign(p,{pcbX:5.885,pcbY:-11.9,fromLayer:'top',toLayer:'inner3'})
 if(node.type==='silkscreentext'&&p.text==='R_CLOCK_OE_PD')Object.assign(p,{pcbX:5.375,pcbY:-12.55,pcbRotation:0,fontSize:.35})
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyOscEnablePull(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyOscEnablePull))
}
