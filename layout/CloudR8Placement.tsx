import {Children,cloneElement,isValidElement} from 'react'
/** Complete R8 0402 relocation, with its existing ground feed; no offset terminals. */
export function moveR8(node:any):any {
  if(Array.isArray(node))return node.map(moveR8)
  if(!isValidElement(node))return node
  if(typeof node.type==='function')return moveR8(node.type(node.props))
  const p:any={...node.props}
  if(p.name==='R_BOOT8')Object.assign(p,{pcbX:7.9,pcbY:-15.3,pcbRotation:90,layer:'bottom'})
  if(node.type==='via'&&p.connectsTo==='.Boot_and_clock > .R_BOOT8 > .pin2')
    Object.assign(p,{pcbX:7.9,pcbY:-15.81,fromLayer:'bottom',toLayer:'inner6'})
  return cloneElement(node,p,...Children.toArray(node.props.children).map(moveR8))
}
