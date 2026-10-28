import { ddrRoutes, type DdrRoute } from '../data/ddr-routes'
import { measureSpacing, segments } from './check-ddr-center-spacing'
import { checkMeanderGap } from './check-meander-gap'

// Check the actual saved polylines in the tuning corridor, not the BGA escapes.
const routes: DdrRoute[] = process.argv[2] ? await Bun.file(process.argv[2]).json() : ddrRoutes
const pairNames = new Set(['DDR_DQS1', 'DDR_DQSn1'])
const counts: Record<string, number> = { DDR_D8: 4, DDR_D9: 4, DDR_D10: 0, DDR_D11: 4, DDR_D12: 4,
  DDR_D13: 3, DDR_D14: 4, DDR_D15: 5, DDR_DQM1: 4, DDR_DQS1: 4, DDR_DQSn1: 4 }
const selected = new Set(Object.keys(counts))
if ([...selected].some(name => !routes.some(r => r.name === name && r.layer === 'bottom')))
  throw new Error('Missing expected Bottom route')
const pairs = measureSpacing(routes, 'bottom', -17.5, -10.6, selected)
const otherPairs = pairs.filter(p => !p.names.every(n => pairNames.has(n)))
const failures: string[] = []
if (otherPairs.some(p => p.centerMm < 0.60 - 1e-6)) failures.push('Inter-signal center spacing below 0.60 mm')
const banks = routes.filter(r => selected.has(r.name) && counts[r.name]).map(r => {
  const top = pairNames.has(r.name) ? -10.6 : -10
  const points = segments(r.points, -17.5, top).flatMap(([a, b], i) => i ? [b] : [a, b])
  const baseline = Math.min(...points.map(p => p[0]))
  const boundaries: number[] = []
  for (const p of points.filter(p => Math.abs(p[0] - baseline) < 0.0002)) {
    if (!boundaries.length || Math.abs(p[1] - boundaries.at(-1)!) > 0.05) boundaries.push(p[1])
  }
  const cells = boundaries.slice(1).map((y, i) => {
    const cell = points.filter(p => p[1] <= boundaries[i] + 1e-7 && p[1] >= y - 1e-7)
    return { pitchMm: boundaries[i] - y, excursionMm: Math.max(...cell.map(p => p[0])) - baseline }
  })
  const minPitchMm = Math.min(...cells.map(c => c.pitchMm))
  const minExcursionMm = Math.min(...cells.map(c => c.excursionMm))
  let minRadiusMm = Infinity
  for (let i = 1; i < points.length - 1; i++) {
    const [a, b, c] = points.slice(i - 1, i + 2)
    const cross = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]))
    const ab = Math.hypot(b[0] - a[0], b[1] - a[1]), bc = Math.hypot(c[0] - b[0], c[1] - b[1])
    if (cross > 1e-10 && ab > 1e-4 && bc > 1e-4)
      minRadiusMm = Math.min(minRadiusMm, ab * bc * Math.hypot(c[0] - a[0], c[1] - a[1]) / (2 * cross))
  }
  const gap = checkMeanderGap(points, 0.10, 0.50)
  if (cells.length !== counts[r.name] || minPitchMm < 1.5 - 1e-4 || minExcursionMm < 0.60 - 1e-4 ||
      minRadiusMm < 0.30 - 1e-4 || !gap.ok) failures.push(`Tuning dimensions failed: ${r.name}`)
  return { name: r.name, lobes: cells.length, minPitchMm, minExcursionMm, minRadiusMm, returnGapPass: gap.ok }
})
console.log(JSON.stringify({ region: { minY: -17.5, maxY: -10.6 }, minimumSpacing: otherPairs[0],
  differentialSpacing: pairs.find(p => p.names.every(n => pairNames.has(n))), banks, failures }, null, 2))
if (failures.length) process.exitCode = 1
