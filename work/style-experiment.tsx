import { Circuit } from "@tscircuit/core"
import { AutoroutingPipelineSolver11_Simplification } from "@tscircuit/capacity-autorouter"
import { analyzePcbStyle, renderPcbStyleSvg } from "@tscircuit/circuit-json-pcb-style-analysis"
import { EventEmitter } from "node:events"
import { writeFileSync } from "node:fs"
import { Children, cloneElement, isValidElement } from "react"
import Board from "../index"
import { SavedNativePours } from "../data/saved-native-pours"
import { savedRoutes } from "../data/saved-route-geometry"
import { checkRouting } from "./check-baseline"

const board = Board()
const children = Children.toArray(board.props.children).filter(child =>
  !(isValidElement(child) && child.type === SavedNativePours))
const circuit = new Circuit()
circuit.schematicDisabled = true
const targeted = process.argv.includes("--targeted")
type ThroughCopper = [kind: "through_obstacle", startX: number, startY: number, endX: number, endY: number, from: string, to: string, width: number]
type StyledRoute = [name: string, nets: string[], ports: string[], points: (typeof savedRoutes[number][3][number] | ThroughCopper)[]]
let exportedRoutes: StyledRoute[] = []
let routingResult: { before: any[]; traces: any[] } | undefined
const round = (n: number) => Math.round(n * 1e7) / 1e7
const geometry = (points: any[]) => JSON.stringify(points.map(p => p[0] === "via"
  ? [p[0], round(p[1]), round(p[2]), p[3], p[4]]
  : p[0] === "through_obstacle" ? [p[0], ...p.slice(1, 5).map(round), ...p.slice(5)]
  : [round(p[0]), round(p[1]), p[2], p[3]]))
const routePoints = (route: any[]) => route.map(p => p.route_type === "wire"
  ? [p.x, p.y, p.layer, p.width]
  : p.route_type === "via" ? ["via", p.x, p.y, p.from_layer, p.to_layer, p.via_diameter ?? null, p.via_hole_diameter ?? null]
    : p.route_type === "through_obstacle" || p.route_type === "through_pad" ? ["through_obstacle", p.start.x, p.start.y, p.end.x, p.end.y, p.from_layer ?? p.start_layer, p.to_layer ?? p.end_layer, p.width]
    : (() => { throw Error(`Unsupported saved-route point ${p.route_type}`) })())
function exportNamedRoutes(before: any[], traces: any[]) {
  const originalTraces = before.filter(record => record.type === "pcb_trace")
  if (originalTraces.length !== savedRoutes.length || traces.length !== savedRoutes.length) throw Error("Cleanup changed trace count")
  const definitions = new Map(originalTraces.map((trace, index) => {
    const definition = savedRoutes[index]
    if (geometry(routePoints(trace.route)) !== geometry(definition[3])) throw Error(`Original route order/geometry mismatch: ${definition[0]}`)
    return [trace.pcb_trace_id, definition]
  }))
  exportedRoutes = traces.map(trace => {
    const definition = definitions.get(trace.pcb_trace_id)
    if (!definition) throw Error(`Missing original definition for ${trace.pcb_trace_id}`)
    const metadata = new Map(definition[3].flatMap(point => typeof point[0] !== "number" || !point.slice(4).some(Boolean)
      ? [] : [[`${round(point[0])},${round(point[1])},${point[2]}`, point.slice(4)]]))
    const points = routePoints(trace.route).map(point => typeof point[0] !== "number" ? point
      : [...point, ...(metadata.get(`${round(point[0])},${round(point[1])},${point[2]}`) ?? [])])
    return [definition[0], definition[1], definition[2], points] as StyledRoute
  })
  const changed = exportedRoutes.filter((definition, index) => geometry(definition[3]) !== geometry(savedRoutes[index][3])).length
  writeFileSync(new URL("./style-targeted-routes.tsx", import.meta.url),
    `import type { SavedRouteDefinition } from "../layout/SavedRoutes"\ntype ThroughCopper = [kind: "through_obstacle", startX: number, startY: number, endX: number, endY: number, from: string, to: string, width: number]\ntype StyledRoute = [name: string, nets: string[], ports: string[], points: (SavedRouteDefinition[3][number] | ThroughCopper)[]]\n\n// Native TSX route definitions: named nets/ports, no persisted Circuit JSON IDs.\nexport const savedRoutes: StyledRoute[] = [\n${exportedRoutes.map(definition => `  ${JSON.stringify(definition)},`).join("\n")}\n]\n`)
  console.log(`Exported ${exportedRoutes.length} named TSX route definitions (${changed} changed; ${exportedRoutes.flatMap(definition => definition[3]).filter(point => point[0] === "through_obstacle").length} through-copper transitions)`)
}
const targetedAlgorithm = async (input: any) => {
  const router = new EventEmitter() as any
  router.input = input
  router.isRouting = false
  router.stop = () => { router.isRouting = false }
  router.start = async () => {
    if (router.isRouting) return
    router.isRouting = true
    try {
      const before = circuit.getCircuitJson()
      const beforeIssues = analyzePcbStyle(before).issues
      const targets = new Set(beforeIssues.map(issue => issue.pcbTraceId))
      writeFileSync(new URL("./style-targeted-before.svg", import.meta.url), renderPcbStyleSvg(before, beforeIssues))
      const solver = new AutoroutingPipelineSolver11_Simplification(input, {
        iterations: 1, enableCrossingViaReduction: false, enableVertexShortcuts: true,
      })
      while (!solver.prepareTraceSimplificationSolver?.solved && !solver.failed) solver.step()
      if (solver.failed) throw Error(solver.error)
      const prepared = solver.prepareTraceSimplificationSolver!.getOutput()
      const mutableNames = new Set<string>()
      for (const trace of prepared.preparedTraces) {
        if (!trace.mutableHdRoute) continue
        if (targets.has(trace.originalTrace.pcb_trace_id)) {
          mutableNames.add(trace.mutableHdRoute.connectionName)
        } else {
          prepared.immutableHdRoutes.push(trace.mutableHdRoute)
          trace.mutableHdRoute = undefined
        }
      }
      prepared.mutableHdRoutes = prepared.mutableHdRoutes.filter(route => mutableNames.has(route.connectionName))
      console.log(`Targeted cleanup: ${targets.size} failing traces, ${prepared.mutableHdRoutes.length} mutable uniform-width routes, ${prepared.immutableHdRoutes.length} immutable route fragments`)
      let lastLog = Date.now()
      while (!solver.solved && !solver.failed && router.isRouting) {
        const until = Date.now() + 50
        do { solver.step() } while (!solver.solved && !solver.failed && Date.now() < until)
        if (Date.now() - lastLog > 15_000) {
          let active: any = solver
          const stages: string[] = []
          while (active) { stages.push(`${active.getSolverName?.() ?? active.constructor.name} ${(active.progress ?? 0).toFixed(3)}`); active = active.activeSubSolver }
          console.log(stages.join(" > "))
          lastLog = Date.now()
        }
        await new Promise(resolve => setTimeout(resolve, 0))
      }
      if (solver.failed) throw Error(solver.error)
      if (!router.isRouting) return
      const traces = solver.getOutputSimplifiedPcbTraces()
      routingResult = { before, traces }
      router.isRouting = false
      router.emit("complete", { type: "complete", traces })
    } catch (error) {
      router.isRouting = false
      router.emit("error", { type: "error", error })
    }
  }
  return router
}
const started = Date.now()
circuit.on("autorouting:start", (event: any) => console.log(
  `Routing phase started after ${((Date.now() - started) / 1000).toFixed(1)}s: ${event.simpleRouteJson?.connections?.length ?? "?"} connections, ${event.simpleRouteJson?.traces?.length ?? 0} existing traces`))
circuit.on("solver:started", (event: any) => console.log(`Solver: ${event.solverName}`))
circuit.on("autorouting:end", (event: any) => {
  console.log(`Native route-path export: ${event.pcbTracePaths?.length ?? 0}; ${event.pcbTracePathsUnavailableReason ?? "available"}`)
  if (event.pcbTracePaths?.length) writeFileSync(new URL(`./style-${targeted ? "targeted" : "all"}-paths.tsx`, import.meta.url),
    `import type { FanoutTracePath } from "@tscircuit/props"\n\n// Native TSX routing paths; no Circuit JSON snapshot.\nexport const paths: FanoutTracePath[] = ${JSON.stringify(event.pcbTracePaths, null, 2)}\n`)
})
circuit.add(cloneElement(board, {
  routingDisabled: false,
  routeRemaining: false,
  isViaInPadAllowed: true,
  autorouter: { local: true, allowViaInPad: true },
}, ...children, <autoroutingphase phaseIndex={99} autorouter="simplify" algorithmFn={targeted ? targetedAlgorithm : undefined} reroute />))
await circuit.renderUntilSettled()
const records = circuit.getCircuitJson()
if (routingResult) {
  try { exportNamedRoutes(routingResult.before, routingResult.traces) }
  catch (error) { console.error("TSX export failed after routing completed:", error) }
}
const { issues } = analyzePcbStyle(records)
writeFileSync(new URL(`./style-${targeted ? "targeted" : "all"}-after.svg`, import.meta.url), renderPcbStyleSvg(records, issues))
const counts = new Map<string, number>()
for (const issue of issues) counts.set(issue.lineItemType, (counts.get(issue.lineItemType) ?? 0) + 1)
console.log(`Simplify completed after ${((Date.now() - started) / 1000).toFixed(1)}s: ${records.filter(r => r.type === "pcb_trace").length} traces, ${issues.length} style issues`)
console.log([...counts].map(([type, count]) => `${type}: ${count}`).join("\n"))
const errors = records.filter(r => r.type.endsWith("_error"))
console.log(`Render errors: ${errors.length}`)
for (const error of errors.slice(0, 10)) console.log(`${error.type}: ${(error as any).message}`)
const nets = new Map(records.filter((r: any) => r.type === "source_net").map((r: any) => [r.source_net_id, r.name]))
const sourceTraces = new Map(records.filter((r: any) => r.type === "source_trace").map((r: any) => [r.source_trace_id, r]))
const pcbTraces = new Map(records.filter((r: any) => r.type === "pcb_trace").map((r: any) => [r.pcb_trace_id, r]))
for (const issue of issues) {
  const source: any = sourceTraces.get((pcbTraces.get(issue.pcbTraceId) as any)?.source_trace_id)
  console.log(`REMAINING ${source?.connected_source_net_ids?.map((id: string) => nets.get(id)).join(", ") ?? "unknown net"}: ${issue.message}`)
}
if (targeted && exportedRoutes.length) {
  const layerIndex = (layer: string) => layer === "top" ? 0 : layer === "bottom" ? 7 : Number(layer.slice(5))
  const physical = new Map<string, any>()
  const originalVias = routingResult?.before.filter(record => record.type === "pcb_via") ?? []
  for (let via of records.filter((r: any) => r.type === "pcb_via") as any[]) {
    // Core may materialize a smaller route via inside an existing full barrel.
    // The original physical copper, drill and tenting remain authoritative.
    via = originalVias.find(original => Math.hypot(original.x - via.x, original.y - via.y) < 1e-6
      && original.source_net_id === via.source_net_id && original.outer_diameter >= via.outer_diameter
      && via.layers.every((layer: string) => original.layers.includes(layer))) ?? via
    const transitionNets = exportedRoutes.filter(definition => definition[3].some(point => point[0] === "via" && Math.hypot(point[1] - via.x, point[2] - via.y) < 1e-6)).flatMap(definition => definition[1])
    const net = nets.get(via.source_net_id) ?? ([...new Set(transitionNets)].length === 1 ? transitionNets[0] : undefined)
    if (!net) throw Error(`Cannot resolve physical via net at ${via.x},${via.y}`)
    const layers = [...via.layers].sort((a: string, b: string) => layerIndex(a) - layerIndex(b))
    const key = JSON.stringify([round(via.x), round(via.y), net, layers, via.hole_diameter, via.outer_diameter])
    if (!physical.has(key)) physical.set(key, { ...via, layers, net })
  }
  const vias = [...physical.values()]
  let transitions = 0
  for (const definition of exportedRoutes) for (const point of definition[3]) if (point[0] === "via") {
    transitions++
    if (!vias.some(via => definition[1].includes(via.net) && Math.hypot(point[1] - via.x, point[2] - via.y) < 1e-6 && via.layers.includes(point[3]) && via.layers.includes(point[4]))) {
      throw Error(`Missing physical via for ${definition[0]} at ${point[1]},${point[2]} ${point[3]}→${point[4]}`)
    }
  }
  const lines = vias.map((via, index) => {
    const tented = via.tented_on_top && via.tented_on_bottom ? "both_sides" : via.tented_on_top ? "top_tented" : via.tented_on_bottom ? "bottom_tented" : undefined
    return `    <via name="savedVia${index}" pcbX={${via.x}} pcbY={${via.y}} holeDiameter={${via.hole_diameter}} outerDiameter={${via.outer_diameter}} fromLayer=${JSON.stringify(via.layers[0])} toLayer=${JSON.stringify(via.layers.at(-1))} connectsTo=${JSON.stringify(`net.${via.net}`)}${tented ? ` tented=${JSON.stringify(tented)}` : ""} />`
  })
  writeFileSync(new URL("./style-targeted-vias.tsx", import.meta.url), `// Physical vias for the targeted TSX routes; names and nets, no Circuit JSON.\nexport function SavedNativeVias() {\n  return <>\n${lines.join("\n")}\n  </>\n}\n`)
  console.log(`Physical vias: ${records.filter(r => r.type === "pcb_via").length} records, ${vias.length} unique; all ${transitions} route transitions covered`)
}
await checkRouting(records)
