import {Children,cloneElement,isValidElement} from 'react'
import jsonReplacements from '../data/cloud-control-corner-paths.json'
const p=(x:number,y:number)=>({x,y})
/** J_POWER moved +1.465 mm in Y (pads y 17.68 -> 19.145). These two paths replace the stale JSON entries of the same name:
 *  CC2 keeps its inner4 route; CC1 can no longer run under the connector shell on top, so it drops to inner4 at the pad
 *  (pad-centred via) and returns to top west of the shell at (20.6,23.49). */
const jpowerPaths:{name:string,props:any}[]=[
 {name:'CLOUD_LOCAL_23_USBC_CC2',props:{pcbPaths:[['.Power_input > .J_POWER > .B5',{...p(24.25,19.145),via:true,fromLayer:'top',toLayer:'inner4'},p(24.25,19.145),p(22.524,19.145),p(22.335,18.956),p(22.335,17.1382),p(22.2468,17.05),p(18.675,17.05),p(18.275,17.45),p(18.275,22.3),{...p(18.275,22.3),via:true,fromLayer:'inner4',toLayer:'top'},'.Power_input > .U_TYPEC > .2']]}},
 {name:'CLOUD_LOCAL_32_USBC_CC1',props:{pcbPaths:[['.Power_input > .J_POWER > .A5',{...p(27.25,19.145),via:true,fromLayer:'top',toLayer:'inner4'},p(27.25,19.145),p(27.25,22.3),p(26.85,22.7),p(21,22.7),p(20.6,23.1),p(20.6,23.49),{...p(20.6,23.49),via:true,fromLayer:'inner4',toLayer:'top'},p(20.6,23.49),p(19.9495,23.49),p(19.855,23.5845),p(19.855,23.7609),p(19.8109,23.805),p(18.0465,23.805),p(17.715,23.4735),p(17.715,22.868),p(17.883,22.7),p(18.275,22.7),'.Power_input > .U_TYPEC > .1']]}},
]
const replacements=[...jsonReplacements.filter(r=>!jpowerPaths.some(j=>j.name===r.name)),...jpowerPaths]
/** Seven explicit validated path replacements. Endpoints, widths, layers and vias stay unchanged (two authored inline above). */
export function applyControlCornerCleanup(node:any):any{
 if(Array.isArray(node))return node.map(applyControlCornerCleanup)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyControlCornerCleanup(node.type(node.props))
 const replacement=node.type==='trace'?replacements.find(r=>r.name===node.props.name):undefined
 return cloneElement(node,replacement?.props??{},...Children.toArray(node.props.children).map(applyControlCornerCleanup))
}
