import { checkMeanderGap } from './check-meander-gap'

// Screens exploratory SimpleRouteJson output. This is deliberately not an
// acceptance test: it does not check the board, pair coupling, other-net
// spacing, meander amplitude, external-side tuning, or cross-layer timing.
const layer = process.argv[2]
if (!['top', 'inner2', 'inner4', 'bottom'].includes(layer)) throw Error('Choose top, inner2, inner4, or bottom')
const pairOnly = process.argv.includes('--pair')
const groupName = process.argv.find(arg => arg.startsWith('--separate-group='))?.split('=')[1]?.toUpperCase()
if (groupName && !['BYTE0','BYTE1','ADDRESS'].includes(groupName)) throw Error('Choose BYTE0, BYTE1, or ADDRESS for --separate-group')
const caseName = `${groupName ? `separate-${groupName.toLowerCase()}-` : ''}${layer}${pairOnly ? '-pair' : ''}`
const candidate = await Bun.file(`work/ddr/experiments/${caseName}.json`).json()
const keepout = { minX: -2, maxX: 2, minY: -19, maxY: -12 }
type Point = [number, number]
function crossesBox(a: Point, b: Point) {
  let low = 0, high = 1
  for (const [p, d, min, max] of [[a[0], b[0]-a[0], keepout.minX, keepout.maxX], [a[1], b[1]-a[1], keepout.minY, keepout.maxY]]) {
    if (Math.abs(d) < 1e-12) { if (p < min || p > max) return false; continue }
    const t1 = (min-p)/d, t2 = (max-p)/d
    low = Math.max(low, Math.min(t1, t2)); high = Math.min(high, Math.max(t1, t2))
    if (low > high) return false
  }
  return true
}
function simplify(points: Point[], tolerance = 0.03): Point[] {
  if (points.length < 3) return points
  const a = points[0], b = points.at(-1)!, dx = b[0]-a[0], dy = b[1]-a[1], norm = dx*dx+dy*dy
  let max = 0, index = 0
  for (let i = 1; i < points.length-1; i++) {
    const p = points[i], t = Math.max(0, Math.min(1, ((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(norm||1)))
    const dist = Math.hypot(p[0]-a[0]-t*dx, p[1]-a[1]-t*dy)
    if (dist > max) { max = dist; index = i }
  }
  return max > tolerance ? [...simplify(points.slice(0,index+1),tolerance).slice(0,-1),...simplify(points.slice(index),tolerance)] : [a,b]
}
function bends(points: Point[]) {
  const p = simplify(points)
  let count = 0
  for (let i = 1; i < p.length-1; i++) {
    const a=p[i-1], b=p[i], c=p[i+1], ux=b[0]-a[0], uy=b[1]-a[1], vx=c[0]-b[0], vy=c[1]-b[1]
    if (Math.atan2(Math.abs(ux*vy-uy*vx), ux*vx+uy*vy) >= Math.PI/18) count++
  }
  return count
}
function maxTurnDegrees(points: Point[]) {
  const distinct = points.filter((p, i, a) => i === 0 || Math.hypot(p[0] - a[i-1][0], p[1] - a[i-1][1]) > 1e-6)
  let max = 0
  for (let i = 1; i < distinct.length - 1; i++) {
    const a=distinct[i-1], b=distinct[i], c=distinct[i+1], ux=b[0]-a[0], uy=b[1]-a[1], vx=c[0]-b[0], vy=c[1]-b[1]
    max=Math.max(max,Math.abs(Math.atan2(ux*vy-uy*vx,ux*vx+uy*vy))*180/Math.PI)
  }
  return max
}
const traces = candidate.traces.map((trace: any) => {
  const points: Point[] = trace.route.filter((p: any) => p.route_type === 'wire').map((p: any) => [p.x,p.y])
  if (points.length < 2) throw Error(`Insufficient wire points in ${trace.connection_name}`)
  const gap = checkMeanderGap(points, .1, .2)
  return { name: trace.connection_name, crossesCenterKeepout: points.slice(1).some((p,i)=>crossesBox(points[i],p)), bendsAtLeast10DegreesAfter003mmSimplification: bends(points), maxTurnDegrees: maxTurnDegrees(points), returnArmGapScreen: gap }
})
const report = { layer, keepout, traces,
  limitations: ['Bend count depends on simplification and angle threshold.', 'The gap screen checks opposing return arms only and is not a full copper clearance check.', 'Meander amplitude, external-side tuning, pair coupling, all other-net spacing, and full-board timing/DRC remain unverified.'] }
await Bun.write(`work/ddr/experiments/${caseName}-audit.json`, JSON.stringify(report,null,2))
console.log(JSON.stringify(report,null,2))

if (traces.some((t: any) => t.crossesCenterKeepout || t.bendsAtLeast10DegreesAfter003mmSimplification < 2 || t.maxTurnDegrees > 30 + 1e-4 || !t.returnArmGapScreen.ok)) process.exitCode = 1
