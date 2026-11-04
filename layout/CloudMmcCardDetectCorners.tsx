import {Children, cloneElement, isValidElement} from 'react'
import routes from '../data/cloud-mmc-card-detect-corners.json'

/** Fixed-terminal Top card-detect path; inherited reference gap remains documented. */
export function applyMmcCardDetectCorners(node:any):any {
  if (Array.isArray(node)) return node.map(applyMmcCardDetectCorners)
  if (!isValidElement(node)) return node
  if (typeof node.type === 'function') return applyMmcCardDetectCorners(node.type(node.props))
  const p:any = {...node.props}
  const points = (routes as any)[p.name]
  if (node.type === 'trace' && points) {
    if (!p.from || !p.to) throw new Error(`Missing actual endpoints on ${p.name}`)
    p.pcbPaths = [[p.from, ...points.map(([x,y]:number[]) => ({x,y,layer:'top'})), p.to]]
    delete p.pcbPath
    p.pcbPathRelativeTo = '.Processor > .U1 > .A1'
  }
  return cloneElement(node, p, ...Children.toArray(node.props.children).map(applyMmcCardDetectCorners))
}
