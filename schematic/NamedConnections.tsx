import { Fragment } from "react"
type Endpoint = { name: string; pin: string; net: string; sheet: string; x: number; y: number; anchorSide?: "left" | "right" | "top" | "bottom" }
export type WirePlan = Record<string, { to: string | null; x: number; y: number; connected?: boolean; anchorSide?: "left" | "right" | "top" | "bottom" }>
const selector = (p: Endpoint) => `.${p.name} > .${p.pin}`
/** A short-wire forest per existing net and sheet. No net or terminal is added. */
export function shortWirePlan(endpoints: Endpoint[], maxDistance = 3.5): WirePlan {
  const plan: WirePlan = {}
  for (const ports of Object.values(Object.groupBy(endpoints, p => `${p.sheet}:${p.net}`))) {
    const nodes = ports!, visited = new Set<number>()
    while (visited.size < nodes.length) {
      const root = nodes.findIndex((_, i) => !visited.has(i))
      visited.add(root); plan[selector(nodes[root])] = { to: null, x: nodes[root].x, y: nodes[root].y, anchorSide: nodes[root].anchorSide }
      const cluster = [root]
      while (true) {
        let best: { from: number; to: number; distance: number } | undefined
        for (const from of cluster) for (let to = 0; to < nodes.length; to++) {
          if (visited.has(to)) continue
          const distance = Math.hypot(nodes[from].x - nodes[to].x, nodes[from].y - nodes[to].y)
          if (distance <= maxDistance && (!best || distance < best.distance)) best = { from, to, distance }
        }
        if (!best) break
        plan[selector(nodes[best.to])] = { to: selector(nodes[best.from]), x: nodes[best.to].x, y: nodes[best.to].y }
        visited.add(best.to); cluster.push(best.to)
      }
      plan[selector(nodes[root])].connected = cluster.length > 1
    }
  }
  return plan
}
/** Native paths keep the original trace order and named net membership. */
export function namedConnections(name: string, connections: Record<string, string>, plan?: WirePlan, position: { schX?: number; schY?: number } = {}) {
  return Object.entries(connections).map(([pin, net]) => {
    const from = `.${name} > .${pin}`, label = net.replace(/^net\./, "")
    const wire = plan?.[from]
    if (wire?.to) return <trace key={pin} path={[from, net, wire.to]} schDisplayLabel={label}/>
    return <Fragment key={pin} ><trace from={from} to={net} schDisplayLabel={label}/>{wire?.connected &&
      <netlabel net={label} schX={wire.x - (position.schX ?? 0)} schY={wire.y - (position.schY ?? 0)} anchorSide={wire.anchorSide}/>}</Fragment>
  })
}
