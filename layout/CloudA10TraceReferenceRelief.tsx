import { Children, cloneElement, isValidElement } from "react"
import delta from "../data/cloud-a10-trace-reference-delta.json"

/** Preserve A10's matched length while moving its body over continuous Inner1 GND. */
export function applyA10TraceOnlyReferenceRelief(node: any): any {
  if (Array.isArray(node)) return node.map(applyA10TraceOnlyReferenceRelief)
  if (!isValidElement(node)) return node
  if (typeof node.type === "function") return applyA10TraceOnlyReferenceRelief(node.type(node.props))
  const p: any = { ...node.props }
  if (node.type === "trace" && p.name === "DDR_A10") {
    const points = p.pcbPath.filter((v: any) => typeof v === "object").map((v: any) => [v.x, v.y])
    if (p.width !== 0.1 || JSON.stringify(points) !== JSON.stringify(delta.before.points)) {
      throw new Error("A10 actual input route changed")
    }
    p.pcbPath = [p.pcbPath[0], ...delta.after.points.map(([x, y]) => ({ x, y })), p.pcbPath[p.pcbPath.length - 1]]
  }
  if (p.footprint && isValidElement(p.footprint)) p.footprint = applyA10TraceOnlyReferenceRelief(p.footprint)
  return cloneElement(node, p, ...Children.toArray(node.props.children).map(applyA10TraceOnlyReferenceRelief))
}
