import {Children,cloneElement,isValidElement} from 'react'
const names=new Set(['CLOUD_LOCAL_INPUT8_REPAIR_0_NEXT_WARMRST_N','CLOUD_LOCAL_INPUT8_REPAIR_V2_2_NEXT_WARMRST_N','CLOUD_LOCAL_INPUT8_REPAIR_V2_3_NEXT_WARMRST_N'])
/** Remove only old authored bodies and their embedded barrels; retain all actual components and GND returns. */
export function removeOldWarmResetBodies(node:any):any{
 if(Array.isArray(node))return node.map(removeOldWarmResetBodies)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return removeOldWarmResetBodies(node.type(node.props))
 if(node.type==='group'&&node.props.name==='CloudWarmResetEndpointRoutes')return node
 if(node.type==='trace'&&names.has(node.props.name))return null
 const p:any={...node.props};if(p.footprint&&isValidElement(p.footprint))p.footprint=removeOldWarmResetBodies(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(removeOldWarmResetBodies))
}
