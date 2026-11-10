import {Children,cloneElement,isValidElement} from 'react'

export function mapNativeElements(node:any,replace:(element:any)=>any):any {
  if(Array.isArray(node))return node.map(child=>mapNativeElements(child,replace))
  if(!isValidElement<any>(node))return node
  if(typeof node.type==='function')return mapNativeElements(node.type(node.props),replace)
  const replacement=replace(node)
  if(replacement!==node)return replacement
  return node.props.children===undefined?node:cloneElement(node,{children:Children.map(node.props.children,child=>mapNativeElements(child,replace))})
}
