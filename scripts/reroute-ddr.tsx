import { BusLanesPipelineSolver, type SimpleRouteJson, type Trace } from '@tscircuit/bus-lanes-solver'
import { Circuit } from '@tscircuit/core'
import { Children, cloneElement } from 'react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import Board from '../index'
import { DdrRoutes } from '../layout/DdrRoutes'
import { ddrRoutes } from '../data/ddr-routes'
import { checkMeanderGap } from './check-meander-gap'

// User-adjustable routing settings, in millimetres. The solver currently has no
// independent meander-gap option. Its pad-clearance setting is a conservative
// search proxy; checkMeanderGap separately screens the emitted return legs.
const minimumMeanderEdgeGap = 0.20
const routeBounds = { minX: -14, maxX: 14, minY: -37, maxY: -2 }
const referenceCopperBounds = { minX: -14, maxX: 14, minY: -37, maxY: 1 }
const plans = [
  { name: 'ADDR_L', layer: 'inner3', nets: ['DDR_A3','DDR_A5','DDR_BA0','DDR_CSn0','DDR_ODT','DDR_BA2','DDR_A7','DDR_RASn'], fixed: [], minLength: 42.9, maxLength: 42.93, clearanceProxy: 0.155 },
  { name: 'ADDR_L3', layer: 'inner5', nets: ['DDR_A0','DDR_A2','DDR_A9','DDR_CASn'], fixed: ['DDR_D8','DDR_D9','DDR_D10','DDR_D11','DDR_D12','DDR_D13','DDR_D14','DDR_D15','DDR_DQM1','DDR_DQS1','DDR_DQSn1'], minLength: 42.32, maxLength: 42.8, clearanceProxy: 0.155 },
  { name: 'ADDR_WE', layer: 'inner2', nets: ['DDR_WEn'], fixed: ['DDR_D0','DDR_D1','DDR_D2','DDR_D3','DDR_D4','DDR_D5','DDR_D6','DDR_D7','DDR_DQM0','DDR_DQS0','DDR_DQSn0'], minLength: 42.94, maxLength: 42.97, clearanceProxy: 0.6 },
  { name: 'ADDR_L2', layer: 'inner4', nets: ['DDR_CKE','DDR_A6'], fixed: ['DDR_CK','DDR_CKn','DDR_A10','DDR_BA1','DDR_A4','DDR_A1','DDR_A11','DDR_A12','DDR_A8'], minLength: 42.52, maxLength: 42.92, clearanceProxy: 0.155 },
] as const
for (const plan of plans) for (const name of [...plan.nets, ...plan.fixed]) {
  const route = ddrRoutes.find(route => route.name === name)
  if (!route || route.layer !== plan.layer) {
    throw new Error(`The saved routing plan is obsolete for ${name}; update its layers and obstacles for the current stackup before rerouting`)
  }
}
const apply = process.argv.includes('--apply')
const output = 'work/ddr/solver-route'
mkdirSync(output, { recursive: true })

// Render the actual native TSX with the previous DDR copper removed. Physical
// pad and net IDs come from this board, not from a hand-written Circuit JSON.
const circuit = new Circuit({ platform: { partsEngineDisabled: true, netlistDrcChecksDisabled: true } })
circuit.schematicDisabled = true
const board = Board()
const children = Children.toArray(board.props.children).filter((child: any) => child.type !== DdrRoutes)
circuit.add(cloneElement(board, {}, children))
await circuit.renderUntilSettled()
const records = circuit.getCircuitJson() as any[]
const components = new Map(records.filter(r => r.type === 'source_component').map(r => [r.source_component_id, r.name]))
const sourcePorts = new Map(records.filter(r => r.type === 'source_port').map(r => [r.source_port_id, r]))
const nets = new Map(records.filter(r => r.type === 'source_net').map(r => [r.source_net_id, r.name]))
const bindings = new Map(records.filter(r => r.type === 'source_trace').flatMap(r => r.connected_source_port_ids.flatMap((id: string) => r.connected_source_net_ids.map((n: string) => [id, nets.get(n)]))))
const terminals = records.filter(r => r.type === 'pcb_port' && sourcePorts.has(r.source_port_id)).map(p => {
  const port: any = sourcePorts.get(p.source_port_id)
  return { x: p.x, y: p.y, pcb_port_id: p.pcb_port_id, net: bindings.get(p.source_port_id), component: components.get(port.source_component_id) }
})
const layers = ['top','inner1','inner2','inner3','inner4','inner5','inner6','bottom']
const endpoints = ddrRoutes.flatMap(route => terminals.filter(p => p.net === route.name && (p.component === 'U1' || p.component === 'U3')).map(p => ({ ...p, toLayer: route.layer })))
for (const route of ddrRoutes) {
  if (endpoints.filter(p => p.net === route.name).length !== 2) throw new Error(`Expected two actual pad endpoints for ${route.name}`)
}
const vias = endpoints.map(p => ({ type: 'via', shape: 'circle' as const, componentId: String(p.component), center: { x: p.x, y: p.y }, width: 0.3, height: 0.3, layers: layers.slice(0, layers.indexOf(p.toLayer) + 1), connectedTo: [String(p.net), p.pcb_port_id] }))
const holes = records.filter(r => r.type === 'pcb_hole' || r.type === 'pcb_plated_hole').map(r => ({ center: { x: r.x, y: r.y }, width: r.outer_diameter ?? r.hole_diameter ?? r.outer_width ?? 1, height: r.outer_diameter ?? r.hole_diameter ?? r.outer_height ?? 1, layers, connectedTo: [] as string[] }))

// Existing copper is held fixed. The 5 µm simplification is conservative:
// obstacle widths grow by 10 µm to contain the original sampled curve.
function fixedTrace(name: string, compact: boolean): Trace {
  const route = ddrRoutes.find(r => r.name === name)!
  const points = route.points.map(([x, y]) => ({ route_type: 'wire' as const, x, y, layer: route.layer, width: 0.1 }))
  const distance = (p: any, a: any, b: any) => {
    const dx = b.x - a.x, dy = b.y - a.y, t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy || 1)))
    return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy)
  }
  const simplify = (p: typeof points): typeof points => {
    if (p.length < 3) return p
    let max = 0, index = 0
    for (let i = 1; i < p.length - 1; i++) { const d = distance(p[i], p[0], p.at(-1)!); if (d > max) { max = d; index = i } }
    return max > 0.005 ? [...simplify(p.slice(0, index + 1)).slice(0, -1), ...simplify(p.slice(index))] : [p[0], p.at(-1)!]
  }
  return { type: 'pcb_trace', pcb_trace_id: `bus_lane_${name}`, connection_name: name, source_trace_id: name,
    route: compact ? simplify(points).map(p => ({ ...p, width: p.width + 0.01 })) : points }
}
const outputs: { name: string; points: [number, number][] }[] = []
for (const plan of plans) {
  const connections = plan.nets.map(name => ({ name, nominalTraceWidth: 0.1, pointsToConnect: endpoints.filter(p => p.net === name).map(p => ({ x: p.x, y: p.y, layer: plan.layer, pcb_port_id: p.pcb_port_id })) }))
  const input: SimpleRouteJson = { layerCount: 8, minTraceWidth: 0.1, defaultObstacleMargin: 0.1, minTraceToPadEdgeClearance: plan.clearanceProxy, minBoardEdgeClearance: 0.2, bounds: routeBounds,
    connections, obstacles: [...vias, ...holes], traces: plan.fixed.map(name => fixedTrace(name, plan.layer !== 'inner3' || name === 'DDR_RASn')),
    buses: [{ busId: plan.name, name: plan.name, connectionNames: [...plan.nets], maxLengthSkew: 0.5, minLength: plan.minLength, maxLength: plan.maxLength, allowedLayers: [plan.layer] }] }
  const solver = new BusLanesPipelineSolver(input, { fanout: 'none', smoothTuning: true, denseSearch: true })
  const start = Date.now()
  while (!solver.solved && !solver.failed && Date.now() - start < 180_000) solver.step()
  if (!solver.solved && !solver.failed) solver.tryFinalAcceptance()
  if (!solver.solved) throw new Error(`${plan.name} did not solve: ${solver.error ?? solver.phase}`)
  for (const trace of solver.traces) {
    const name = trace.connection_name!
    const points = trace.route.map(p => [Number(p.x.toFixed(9)), Number(p.y.toFixed(9))] as [number, number])
    if (points.some(([x,y]) => x < referenceCopperBounds.minX || x > referenceCopperBounds.maxX || y < referenceCopperBounds.minY || y > referenceCopperBounds.maxY)) throw new Error(`${name} leaves the local ground-pour region`)
    const gap = checkMeanderGap(points, 0.1, minimumMeanderEdgeGap)
    if (!gap.ok) throw new Error(`${name} returning arms violate the ${minimumMeanderEdgeGap} mm edge-gap screen: ${JSON.stringify(gap)}`)
    outputs.push({ name, points })
  }
  console.log(`${plan.name}: ${solver.traces.length} routes solved in ${((Date.now() - start) / 1000).toFixed(1)} s`)
}
if (outputs.length !== 15 || new Set(outputs.map(r => r.name)).size !== 15) throw new Error('Incomplete reroute')
writeFileSync(`${output}/candidate-routes.json`, JSON.stringify(outputs))

// Verify the new routes in memory before touching the saved source. The verifier
// compiles native TSX and checks endpoint, length, via and copper geometry.
for (const candidate of outputs) ddrRoutes.find(r => r.name === candidate.name)!.points = candidate.points
process.argv = [process.argv[0], process.argv[1], `${output}/validation`]
await import('./verify-ddr')
if (apply) {
  const filename = 'data/ddr-routes.tsx'
  let source = readFileSync(filename, 'utf8').replace('// DDR_WEn uses four larger manually refined tuning bends.\n', '')
  for (const { name, points } of outputs) {
    const route = ddrRoutes.find(r => r.name === name)!
    const start = source.indexOf(` {name:${JSON.stringify(name)},`), end = source.indexOf(' ]},', start) + 4
    if (start < 0 || end < 4) throw new Error(`Could not find saved source for ${name}`)
    let block = ` {name:${JSON.stringify(name)},from:${JSON.stringify(route.from)},to:${JSON.stringify(route.to)},layer:${JSON.stringify(route.layer)},points:[\n`
    for (let i = 0; i < points.length; i += 10) block += `  ${points.slice(i, i + 10).map(p => JSON.stringify(p)).join(',')},\n`
    source = source.slice(0, start) + block + ' ]},' + source.slice(end)
  }
  writeFileSync(filename, source)
  console.log(`Applied ${outputs.length} solver-generated routes to ${filename}`)
} else console.log('Candidate verified; pass --apply to update the board source.')
