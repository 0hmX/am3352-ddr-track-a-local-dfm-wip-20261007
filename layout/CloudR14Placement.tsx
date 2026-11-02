import {Children,cloneElement,isValidElement} from 'react'
/** Whole R14 footprint relocation and its existing V3V3 feed, preserving real pad centers. */
export function moveR14(node:any):any {
 if(Array.isArray(node))return node.map(moveR14)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return moveR14(node.type(node.props))
 const p:any={...node.props}
 if(p.name==='R_BOOT14')Object.assign(p,{pcbX:-1,pcbY:-8,pcbRotation:0,layer:'bottom'})
 if(node.type==='via'&&p.connectsTo==='.Boot_and_clock > .R_BOOT14 > .pin2')
  Object.assign(p,{pcbX:-1.51,pcbY:-8,fromLayer:'bottom',toLayer:'inner5'})
 return cloneElement(node,p,...Children.toArray(node.props.children).map(moveR14))
}
