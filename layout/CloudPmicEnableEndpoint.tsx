import {Children,cloneElement,isValidElement} from 'react'
/** Move the existing transition to the unchanged real pull-resistor pad; no midpoint via. */
export function applyPmicEnableEndpoint(node:any):any{
 if(Array.isArray(node))return node.map(applyPmicEnableEndpoint)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyPmicEnableEndpoint(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name==='CLOUD_LOCAL_CONTROL_V3_2_NEXT_PMIC_POWER_EN'){
  const ps=[[19.6,.9375],[20.0125,1.35],[20.95,1.35],[21.15,1.15],[21.15,.7],[21.65,.2],[23,.2],[23.2,0],[23.2,-2.35],[25.2,-4.35],[25.2,-14.35],[26.89,-16.04],[26.89,-17.5]]
  p.pcbPaths=[[p.from,{x:19.6,y:.9375,via:true,fromLayer:'top',toLayer:'inner4'},...ps.map(([x,y])=>({x,y,layer:'inner4'})),{x:26.89,y:-17.5,via:true,fromLayer:'inner4',toLayer:'top'},p.to]]
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyPmicEnableEndpoint))
}
