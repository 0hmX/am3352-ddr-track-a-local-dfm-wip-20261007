import {Children,cloneElement,isValidElement} from 'react'
import replacements from '../data/cloud-control-corner-paths.json'
/** Seven explicit validated path replacements. Endpoints, widths, layers and vias stay unchanged. */
export function applyControlCornerCleanup(node:any):any{
 if(Array.isArray(node))return node.map(applyControlCornerCleanup)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyControlCornerCleanup(node.type(node.props))
 const replacement=node.type==='trace'?replacements.find(r=>r.name===node.props.name):undefined
 return cloneElement(node,replacement?.props??{},...Children.toArray(node.props.children).map(applyControlCornerCleanup))
}
