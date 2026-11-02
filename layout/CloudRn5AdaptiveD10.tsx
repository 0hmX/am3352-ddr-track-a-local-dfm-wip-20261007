import {Children,cloneElement,isValidElement} from 'react'
import route from '../data/cloud-rn5-adaptive-d10.json'
/** Original-map D10 reconciliation with the complete RN5 source bundle. No endpoint, span, or return change. */
export function applyRn5AdaptiveD10(node:any):any{
 if(Array.isArray(node))return node.map(applyRn5AdaptiveD10)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyRn5AdaptiveD10(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name==='CLOUD_RN4_ENDPOINT_HDMI_D10'){
  p.pcbPathRelativeTo='.Processor > .U1 > .A1'
  p.pcbPaths=[[p.from,{x:route.a[0],y:route.a[1],via:true,fromLayer:'top',toLayer:'inner2'},...route.points.map(([x,y]:number[])=>({x,y,layer:'inner2'})),{x:route.b[0],y:route.b[1],via:true,fromLayer:'inner2',toLayer:'bottom'},p.to]]
  delete p.pcbPath
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyRn5AdaptiveD10))
}
