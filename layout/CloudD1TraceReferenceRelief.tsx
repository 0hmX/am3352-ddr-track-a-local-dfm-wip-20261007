import { Children, cloneElement, isValidElement } from "react"
import delta from "../data/cloud-d1-trace-reference-delta.json"

/** Preserve D1's matched length with the separately bounded Inner1 reference scopes. */
export function applyD1TraceOnlyReferenceRelief(node: any): any {
  if (Array.isArray(node)) return node.map(applyD1TraceOnlyReferenceRelief)
  if (!isValidElement(node)) return node
  if (typeof node.type === "function") return applyD1TraceOnlyReferenceRelief(node.type(node.props))
  const p: any = { ...node.props }
  if (node.type === "trace" && p.name === "DDR_D1") {
    const points = p.pcbPath.filter((v: any) => typeof v === "object").map((v: any) => [v.x, v.y])
    if (p.width !== 0.1 || JSON.stringify(points) !== JSON.stringify(delta.before.points)) {
      throw new Error("D1 actual input route changed")
    }
    p.pcbPath = [p.pcbPath[0], ...delta.after.points.map(([x, y]) => ({ x, y })), p.pcbPath[p.pcbPath.length - 1]]
  }
  if (p.footprint && isValidElement(p.footprint)) p.footprint = applyD1TraceOnlyReferenceRelief(p.footprint)
  return cloneElement(node, p, ...Children.toArray(node.props.children).map(applyD1TraceOnlyReferenceRelief))
}
