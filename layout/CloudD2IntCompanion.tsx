import { Children, cloneElement, isValidElement } from 'react'
import routes from '../data/cloud-d2-int-companion.json'
/** Same-layer two-body repair; all real signal terminals and barrels retained. */
export function applyD2IntCompanion(x:any):any {
  if (Array.isArray(x)) return x.map(applyD2IntCompanion)
  if (!isValidElement(x)) return x
  if (typeof x.type === 'function') return applyD2IntCompanion(x.type(x.props))
  const p:any = {...x.props}
  const r = x.type === 'trace' && routes.find(r => r.name === p.name)
  if (r) {
    if (!p.pcbPaths || p.pcbPaths.length !== 1) throw Error(`Unexpected route format: ${p.name}`)
    const path=p.pcbPaths[0]
    const at=(q:any,xy:number[]) => q && typeof q === 'object' && !q.via && Math.hypot(q.x-xy[0],q.y-xy[1]) < 1e-6
    const a=path.findIndex((q:any)=>at(q,r.a)), b=path.findLastIndex((q:any)=>at(q,r.b))
    if (a<0 || b<a) throw Error(`Real endpoint assertion failed: ${p.name}`)
    p.pcbPaths=[[...path.slice(0,a),...r.points.map(([x,y])=>({x,y,layer:'inner4'})),...path.slice(b+1)]]
  }
  if (x.type === 'via' && Math.abs(p.pcbX-18.49)<1e-6 && Math.abs(p.pcbY+14.6)<1e-6) {
    if (p.fromLayer !== 'inner1' || p.toLayer !== 'inner3' || p.connectsTo !== 'net.GND') throw Error('Unexpected old SDA return identity')
    p.pcbY=-15.15
  }
  if (p.footprint && isValidElement(p.footprint)) p.footprint=applyD2IntCompanion(p.footprint)
  return cloneElement(x,p,...Children.toArray(x.props.children).map(applyD2IntCompanion))
}
