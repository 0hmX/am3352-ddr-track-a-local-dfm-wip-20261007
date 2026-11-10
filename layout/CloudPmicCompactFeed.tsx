import {Children,cloneElement,isValidElement} from 'react'
import {applyPmicInterruptPull} from './CloudPmicInterruptPull'
function applyFeedDepths(node:any):any {
 if(Array.isArray(node))return node.map(applyFeedDepths)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyFeedDepths(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='via'&&p.name==='V3V3_FEED_50')p.toLayer='inner2'
 if(p.footprint&&isValidElement(p.footprint))p.footprint=applyFeedDepths(p.footprint)
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyFeedDepths))
}
/** Real R_PWR4 move + short genuine-terminal supply join. No plane exception. */
export function applyPmicCompactWithFeed(node:any):any{return applyFeedDepths(applyPmicInterruptPull(node))}
