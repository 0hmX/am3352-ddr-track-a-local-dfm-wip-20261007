import {Children,cloneElement,isValidElement} from 'react'
/** Whole R5 relocation with its real existing GND feed; both native footprint pads move. */
export function moveR5(node:any):any {
 if(Array.isArray(node))return node.map(moveR5)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return moveR5(node.type(node.props))
 const p:any={...node.props}
 if(p.name==='R_BOOT5')Object.assign(p,{pcbX:8.09,pcbY:-5.2,pcbRotation:0,layer:'bottom'})
 if(node.type==='via'&&p.connectsTo==='.Boot_and_clock > .R_BOOT5 > .pin2')Object.assign(p,{pcbX:7.58,pcbY:-5.2,fromLayer:'bottom',toLayer:'inner6'})
 return cloneElement(node,p,...Children.toArray(node.props.children).map(moveR5))
}
