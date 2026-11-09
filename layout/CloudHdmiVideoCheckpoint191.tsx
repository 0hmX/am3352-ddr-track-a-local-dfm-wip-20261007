import {Children,cloneElement,isValidElement} from 'react'
import {CloudHdmiVideoRoutes as BaseVideo49} from './CloudHdmiVideoBaseRoutes'
import route from '../data/cloud-sysboot4-route.json'
const sections=route.sections
const first=sections[0].points[0],last=sections.at(-1)!.points.at(-1)!
const path:any[]=[route.from,{x:first[0],y:first[1],via:true,fromLayer:'top',toLayer:sections[0].layer}]
for(let i=0;i<sections.length;i++){
 const s=sections[i]
 if(i)path.push({x:s.points[0][0],y:s.points[0][1],via:true,fromLayer:sections[i-1].layer,toLayer:s.layer})
 path.push(...s.points.map(([x,y])=>({x,y,layer:s.layer})))
}
path.push({x:last[0],y:last[1],via:true,fromLayer:sections.at(-1)!.layer,toLayer:'top'},route.to)
function replace(node:any):any{
 if(!isValidElement(node))return node
 const p:any=node.props
 if(node.type==='trace'&&p.name==='VIDEO_SYSBOOT4_20')return cloneElement(node,{pcbPaths:[path]} as any)
 return cloneElement(node,{},...Children.toArray(p.children).map(replace))
}
/** Same video49, with the single SYSBOOT4 trunk replaced and one retained through Ground return. */
export function CloudHdmiVideoRoutes(){return <>{replace(BaseVideo49())}<via name="SYSBOOT4_RETURN_0" pcbX={-.131259} pcbY={2.40765} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.GND"/></>}
