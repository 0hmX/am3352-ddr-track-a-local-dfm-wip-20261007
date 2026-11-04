import {Children,cloneElement,isValidElement} from 'react'
import route from '../data/cloud-mpu-cap1-route.json'
/** Keep both actual capacitor barrels. Tap CAP0's existing Inner5 annulus without inventing a via port. */
export function applyMpuCap1Inner5(node:any):any {
 if(Array.isArray(node))return node.map(applyMpuCap1Inner5)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyMpuCap1Inner5(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&['MPU_CAP0_CAP1_0','MPU_CAP0_CAP1_1'].includes(p.name))return null
 if(node.type==='via'&&p.name==='MPU_CAP0_CAP1_V0')return null
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyMpuCap1Inner5))
}
export function CloudMpuCap1Inner5Route(){return <trace name="MPU_CAP1_CAP0_INNER5_DIRECT" from="MPU_CAP1.inner5" to="net.VDD_MPU" width={.30} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[["MPU_CAP1.inner5",...route.points.map(([x,y])=>({x,y}))]]}/>}
