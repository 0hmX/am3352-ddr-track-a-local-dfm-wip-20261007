import {Children,cloneElement,isValidElement} from 'react'
const points=[[6,-3.6],[6.4125,-4.0125],[6.4125,-4.6508],[6.55,-4.7883],[6.9883,-4.7883],[9.475,-7.275],[9.725,-7.275],[9.85,-7.4],[9.85,-9.075],[10.15,-9.375],[10.15,-9.475]]
/** Preserve true VSYNC terminal vias and full path width; repair two foreign-reference cuts by moving copper only. */
export function applyVsyncReferenceBody(node:any):any {
 if(Array.isArray(node))return node.map(applyVsyncReferenceBody)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyVsyncReferenceBody(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name==='RN6_INPUT_HDMI_VSYNC'){
  p.width=.1;p.pcbPathRelativeTo='.Processor > .U1 > .A1'
  p.pcbPaths=[[p.from,{x:6,y:-3.6,via:true,fromLayer:'top',toLayer:'inner2'},...points.map(([x,y])=>({x,y,layer:'inner2'})),{x:10.15,y:-9.475,via:true,fromLayer:'inner2',toLayer:'bottom'},p.to]]
  delete p.pcbPath
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyVsyncReferenceBody))
}
