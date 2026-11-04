import {Children,cloneElement,isValidElement} from 'react'

/** Validated with coordinated DDR A11/A6/WEn relief and bounded spacing review; not standalone. */
export function applyFixedBulkFeedCandidate(node:any):any {
 if(Array.isArray(node))return node.map(applyFixedBulkFeedCandidate)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyFixedBulkFeedCandidate(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='via'&&p.name==='MPU_A2_BULK_V0')return null
 if(node.type==='via'&&p.name==='MPU_BULK')p.toLayer='inner4'
 if(node.type==='trace'&&p.name==='MPU_A2_BULK_1')return null
 if(node.type==='trace'&&p.name==='MPU_A2_BULK_0'){
  p.from='MPU_A2.inner4';p.to='MPU_BULK.inner4';p.width=.30
  p.pcbPathRelativeTo='.Processor > .U1 > .A1'
  p.pcbPaths=[['MPU_A2.inner4',{x:-6.8,y:-6},{x:-6.8,y:-8.1125},{x:-5.4125,y:-9.5},'MPU_BULK.inner4']]
 }
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyFixedBulkFeedCandidate))
}

/** Actual capacitor-ground barrel extension, verified in the combined drilled-reference proof. */
export function applyFixedBulkGroundCandidate(node:any):any {
 if(Array.isArray(node))return node.map(applyFixedBulkGroundCandidate)
 if(!isValidElement(node))return node
 if(typeof node.type==='function')return applyFixedBulkGroundCandidate(node.type(node.props))
 const p:any={...node.props}
 if(node.type==='via'&&p.connectsTo==='.Processor > .C_VDD_MPU_B > .pin2')p.toLayer='inner3'
 return cloneElement(node,p,...Children.toArray(node.props.children).map(applyFixedBulkGroundCandidate))
}
