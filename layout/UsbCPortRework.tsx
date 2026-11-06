import { Children, cloneElement, isValidElement } from "react"
import { removedPowerParts } from "../data/usb-c-ports"

/**
 * Drops the saved copper that belonged to the TUSB320 power-detect path (data/usb-c-ports.tsx):
 * every trace or via whose endpoint selector names a removed part, or one of the three
 * SN74LVC1G98 inputs that are re-strapped. Their replacements are in UsbCPortRoutes.tsx.
 */
const removed = new RegExp(`\\.(${removedPowerParts.join("|")}) > `)
const restrapped = /\.U_TYPEC_NOR > \.(pin)?[136]$/
const stale = (sel: unknown) => typeof sel === "string" && (removed.test(sel) || restrapped.test(sel))

function expand(node: any): any {
  if (Array.isArray(node)) return node.map(expand)
  if (!isValidElement(node)) return node
  if (typeof node.type === "function") return expand((node.type as any)(node.props))
  const kids = Children.toArray((node.props as any).children).map(expand)
  return kids.length ? cloneElement(node, undefined, ...kids) : node
}
const ours = (p: any) => typeof p.name === "string" && p.name.startsWith("USBCP_") // UsbCPortRoutes.tsx output
function walk(node: any, f: (n: any) => void) {
  if (Array.isArray(node)) return node.forEach(n => walk(n, f))
  if (!isValidElement(node)) return
  f(node); Children.toArray((node.props as any).children).forEach(n => walk(n, f))
}

export function applyUsbCPortRework(board: any): any {
  const tree = expand(board)
  // vias tied to removed pads, then traces that end on those pads or vias
  const deadVias = new Set<string>()
  walk(tree, n => { if (n.type === "via" && !ours(n.props) && stale(n.props.connectsTo)) deadVias.add(n.props.name) })
  const dead = (sel: unknown) => stale(sel) || (typeof sel === "string" && deadVias.has(sel.split(".")[0]))
  const filter = (node: any): any => {
    if (Array.isArray(node)) return node.map(filter).filter(n => n !== null)
    if (!isValidElement(node)) return node
    const p: any = node.props
    if (node.type === "via" && deadVias.has(p.name)) return null
    if (node.type === "trace" && !ours(p)) {
      const ends = [p.from, p.to, ...(p.pcbPaths ?? []).flatMap((path: any[]) => [path[0], path[path.length - 1]]), p.pcbPath?.[0]]
      if (ends.some(dead)) return null
    }
    const kids = Children.toArray(p.children)
    return kids.length ? cloneElement(node, undefined, ...kids.map(filter).filter(n => n !== null)) : node
  }
  return filter(tree)
}
