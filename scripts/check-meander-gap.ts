/** Screen opposing return legs on a sampled path. Distances are in mm. */
export function checkMeanderGap(points: [number, number][], width: number, edgeGap: number) {
  const required = width + edgeGap
  const cumulative = [0]
  for (let i = 1; i < points.length; i++) {
    cumulative.push(cumulative[i - 1] + Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]))
  }
  const pointDistance = (p: number[], a: number[], b: number[]) => {
    const dx = b[0] - a[0], dy = b[1] - a[1]
    const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
    return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
  }
  const orientation = (a: number[], b: number[], c: number[]) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i], b = points[i + 1], dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy)
    if (len < 1e-5) continue
    for (let j = i + 2; j < points.length - 1; j++) {
      // Nearby chords on the same rounded corner are not separate returning arms.
      if (cumulative[j] - cumulative[i + 1] < 1.5 * required) continue
      const c = points[j], d = points[j + 1], ex = d[0] - c[0], ey = d[1] - c[1], otherLen = Math.hypot(ex, ey)
      if (otherLen < 1e-5 || (dx * ex + dy * ey) / (len * otherLen) > -0.9) continue
      const s1 = ((c[0] - a[0]) * dx + (c[1] - a[1]) * dy) / len
      const s2 = ((d[0] - a[0]) * dx + (d[1] - a[1]) * dy) / len
      if (Math.min(len, Math.max(s1, s2)) - Math.max(0, Math.min(s1, s2)) < Math.min(0.005, len / 4, otherLen / 4)) continue
      if (Math.max(a[0], b[0]) + required < Math.min(c[0], d[0]) || Math.max(c[0], d[0]) + required < Math.min(a[0], b[0]) ||
          Math.max(a[1], b[1]) + required < Math.min(c[1], d[1]) || Math.max(c[1], d[1]) + required < Math.min(a[1], b[1])) continue
      const intersects = orientation(a, b, c) * orientation(a, b, d) < 0 && orientation(c, d, a) * orientation(c, d, b) < 0
      const centerDistance = intersects ? 0 : Math.min(pointDistance(a, c, d), pointDistance(b, c, d), pointDistance(c, a, b), pointDistance(d, a, b))
      if (centerDistance < required - 1e-6) return { ok: false, centerDistance, edgeGap: centerDistance - width, indices: [i, j] }
    }
  }
  return { ok: true }
}

if (import.meta.main) {
  const { ddrRoutes } = await import('../data/ddr-routes')
  const names = process.argv.slice(2)
  const selected = names.length ? ddrRoutes.filter(route => names.includes(route.name)) : ddrRoutes
  if (names.some(name => !selected.some(route => route.name === name))) throw new Error('Unknown DDR signal name')
  let failures = 0
  for (const route of selected) {
    const result = checkMeanderGap(route.points, 0.1, 0.2)
    if (!result.ok) { failures++; console.error(`${route.name}: ${result.edgeGap?.toFixed(4)} mm return-leg edge gap`) }
  }
  console.log(`${selected.length} routes screened, ${failures} below the 0.20 mm edge-gap target`)
  if (failures) process.exitCode = 1
}
