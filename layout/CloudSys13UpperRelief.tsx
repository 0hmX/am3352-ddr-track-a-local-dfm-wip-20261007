import {Children,cloneElement,isValidElement} from 'react'
/** Unmounted body-only SYS13 relief. Real terminals, vias, width and wire length remain exact. */
export function applySys13UpperRelief(node:any):any {
 if(Array.isArray(node)) return node.map(applySys13UpperRelief)
 if(!isValidElement(node)) return node
 if(typeof node.type==='function') return applySys13UpperRelief(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='trace'&&p.name==='CLOUD_SYSBOOT_ETH_13_CPU_STRAP') {
  const points=[[6.8,-5.2],[7.225,-5.625],[7.225,-11.425],[8.09,-12.29],[8.09,-15]]
  p.pcbPaths=[[p.from,...points.map(([x,y])=>({x,y,layer:'inner4'})),p.to]]
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applySys13UpperRelief))
}
