import {Children,cloneElement,isValidElement} from 'react'
/** Same real endpoints and .100 mm width. The Top branch and all ground returns stay exact. */
export function applySys1D5AccessRelief(node:any):any{
 if(Array.isArray(node))return node.map(applySys1D5AccessRelief)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applySys1D5AccessRelief(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name==='SYSBOOT1_RELOCATED_1'){
  if(p.width!==.1)throw Error('Unexpected SYS1 width')
  p.pcbPaths=[[p.from,{x:10.85,y:-5.55},{x:10.675,y:-5.55},{x:10.425,y:-5.8},{x:10.425,y:-6.5},{x:10.965,y:-7.04},{x:11.7,y:-7.04},p.to]]
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applySys1D5AccessRelief))
}
