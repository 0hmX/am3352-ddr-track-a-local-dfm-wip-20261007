import {Children,cloneElement,isValidElement} from 'react'

const points=[
  [38.54992,-25.500066],[34.600066,-25.500066],[27.1,-18],
  [26.55,-18],[25.95,-17.4],[25.95,-17.1],[22.375,-13.525],[5.5,-13.525],
]
/** D6 only: a Top trace and one real array-pad through-via. No intermediate signal transitions. */
export function applyD6TopRoute(node:any):any {
  if(Array.isArray(node))return node.map(applyD6TopRoute)
  if(!isValidElement(node))return node
  if(typeof node.type==='function')return applyD6TopRoute(node.type(node.props))
  const p:any={...node.props}
  if(node.type==='trace'&&p.name==='CLOUD_HDMI_LAYERED_HDMI_D6') {
    p.width=.1
    p.pcbPathRelativeTo='.Processor > .U1 > .A1'
    p.pcbPaths=[[p.from,...points.map(([x,y])=>({x,y,layer:'top'})),
      {x:5.5,y:-13.525,via:true,fromLayer:'top',toLayer:'bottom'},p.to]]
    delete p.pcbPath
  }
  return cloneElement(node,p,...Children.toArray(node.props.children).map(applyD6TopRoute))
}
