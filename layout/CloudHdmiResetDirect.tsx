import {Children,cloneElement,isValidElement} from 'react'
import routes from '../data/cloud-hdmi-reset-direct.json'
/** Direct Top RESET corridor and real R183 branch; no footprint, layer or via changes. */
export function applyDirectResetCorridor(node:any):any {
  if(Array.isArray(node)) return node.map(applyDirectResetCorridor)
  if(!isValidElement(node)) return node
  if(typeof node.type==='function') return applyDirectResetCorridor(node.type(node.props))
  const p:any={...node.props}, points=(routes as any)[p.name]
  if(node.type==='trace' && points) {
    if(p.name==='VIDEO_HDMI_RESET_N_41' && (p.from!=='.HDMI > .R_HDMI_REF_R183 > .pin2' || p.to!=='.HDMI > .U_HDMI > .33')) throw new Error('R183 terminal identity changed')
    const path=[p.from,...points.map(([x,y]:number[])=>({x,y,layer:'top'}))]
    if(p.name==='VIDEO_HDMI_RESET_N_30') path.push(p.to)
    p.pcbPaths=[path]
    delete p.pcbPath
    p.pcbPathRelativeTo='.Processor > .U1 > .A1'
  }
  return cloneElement(node,p,...Children.toArray(node.props.children).map(applyDirectResetCorridor))
}
