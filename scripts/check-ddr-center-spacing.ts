import { ddrRoutes, type DdrRoute } from '../data/ddr-routes'

// Local spacing screen, not whole-route TI qualification. Package escapes,
// return paths, impedance and differential-pair coupling need separate review.
const selected = new Set(['DDR_A0', 'DDR_WEn', 'DDR_A9', 'DDR_CASn', 'DDR_A2'])
const minY = -27, maxY = -10.5, requiredCenterMm = 0.60, widthMm = 0.10
type Point = [number, number]
type Segment = [Point, Point]
export function segments(points: Point[], minY: number, maxY: number): Segment[] {
  return points.slice(1).flatMap((b, i) => {
    const a = points[i], dy = b[1] - a[1]
    let lo = 0, hi = 1
    if (Math.abs(dy) < 1e-12) {
      if (a[1] < minY || a[1] > maxY) return []
    } else {
      const limits = [(minY - a[1]) / dy, (maxY - a[1]) / dy].sort((a, b) => a - b)
      lo = Math.max(0, limits[0]); hi = Math.min(1, limits[1])
      if (lo > hi) return []
    }
    return [[lo, hi].map(t => [a[0] + t * (b[0] - a[0]), a[1] + t * dy]) as Segment]
  })
}
function pointDistance(p: Point, [a, b]: Segment) {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
const cross = (a: Point, b: Point, c: Point) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
function distance(s: Segment, t: Segment) {
  const [a, b] = s, [c, d] = t
  if ([0, 1].every(k => Math.max(a[k], b[k]) >= Math.min(c[k], d[k]) && Math.max(c[k], d[k]) >= Math.min(a[k], b[k])) &&
      cross(a, b, c) * cross(a, b, d) <= 0 && cross(c, d, a) * cross(c, d, b) <= 0) return 0
  return Math.min(pointDistance(a, t), pointDistance(b, t), pointDistance(c, s), pointDistance(d, s))
}
export function measureSpacing(routes: DdrRoute[], layerName: DdrRoute['layer'], minY: number, maxY: number, selected: Set<string>) {
  const layer = routes.filter(r => r.layer === layerName).map(r => ({ ...r, segments: segments(r.points, minY, maxY) }))
  const pairs = []
  for (let i = 0; i < layer.length; i++) for (let j = i + 1; j < layer.length; j++) {
    const a = layer[i], b = layer[j]
    if (!selected.has(a.name) && !selected.has(b.name)) continue
    let centerMm = Infinity
    for (const s of a.segments) for (const t of b.segments) centerMm = Math.min(centerMm, distance(s, t))
    if (!Number.isFinite(centerMm)) throw new Error(`No center geometry for ${a.name}/${b.name}`)
    pairs.push({ names: [a.name, b.name], centerMm, edgeMm: centerMm - widthMm })
  }
  return pairs.sort((a, b) => a.centerMm - b.centerMm)
}

if (import.meta.main) {
  const routes: DdrRoute[] = process.argv[2] ? await Bun.file(process.argv[2]).json() : ddrRoutes
  if ([...selected].some(name => !routes.some(r => r.name === name && r.layer === 'inner2')))
    throw new Error('Missing expected Inner 2 route')
  const pairs = measureSpacing(routes, 'inner2', minY, maxY, selected)
  const failures = pairs.filter(p => p.centerMm < requiredCenterMm - 1e-6)
  console.log(JSON.stringify({ layer: 'inner2', minY, maxY, requiredCenterMm, widthMm, pairs, failures }, null, 2))
  if (failures.length) process.exitCode = 1
}
