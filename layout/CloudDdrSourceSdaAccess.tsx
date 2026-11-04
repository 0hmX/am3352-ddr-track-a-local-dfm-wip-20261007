import {Children,cloneElement,isValidElement} from 'react'
import route from '../data/cloud-ddr-source-sda-access.json'
import outline from '../data/cloud-ddr-source-sda-outline.json'
/** Conditional I2C companion. Existing endpoints/spans and source authority trace remain unchanged.
 * .60 mm requested widening retains the existing .20 mm native pour clearance.
 * Actual emitted width and all rail groups must be rechecked with the complete I2C tree.
 */
export function applyDdrSourceSdaAccess(node:any):any {
 if(Array.isArray(node))return node.map(applyDdrSourceSdaAccess)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyDdrSourceSdaAccess(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name==='DDR15_SOURCE_INNER5'){
  if(p.from!=='DDR15_SOURCE_TRANSITION.inner5'||p.to!=='DDR15_FEED_61.inner5')throw new Error('DDR source terminal identity changed')
  p.width=.30;p.pcbPathRelativeTo='.Processor > .U1 > .A1'
  p.pcbPaths=[[p.from,...route.points.map(([x,y])=>({x,y})),p.to]]
 }
 if(node.type==='copperpour'&&p.name==='DDR15_SOURCE_INNER5_WIDE'){
  if(p.layer!=='inner5'||p.connectsTo!=='net.DDR_1V5')throw new Error('DDR source widening identity changed')
  p.outline=outline
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyDdrSourceSdaAccess))
}
