import {Children,cloneElement,isValidElement} from 'react'
/** Move the existing real10k INT pull-up, retaining component identity, pin nets and value. */
export function applyIntPullPlacement(node:any):any{
 if(Array.isArray(node))return node.map(applyIntPullPlacement)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyIntPullPlacement(node.type(node.props))
 const p:any={...node.props}
 if(p.name==='R_HDMI_REF_R158')Object.assign(p,{pcbX:24.75,pcbY:-21.75,pcbRotation:180,layer:'bottom'})
 if(node.type==='via'&&p.connectsTo==='.HDMI > .R_HDMI_REF_R158 > .pin1')Object.assign(p,{pcbX:24.24,pcbY:-21.75,fromLayer:'bottom',toLayer:'inner5'})
 if(node.type==='via'&&p.connectsTo==='net.GND'&&Math.abs(p.pcbX-43.55)<1e-7&&Math.abs(p.pcbY+30.55)<1e-7&&p.fromLayer==='inner1'&&p.toLayer==='inner3')p.pcbX=43.50
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyIntPullPlacement(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyIntPullPlacement))
}
