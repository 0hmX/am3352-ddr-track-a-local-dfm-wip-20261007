import { Circuit } from "@tscircuit/core"
import { Children, cloneElement, isValidElement } from "react"
import Board from "../index"
import { SavedRoutes } from "../layout/SavedRoutes"
import { SavedNativeVias } from "../data/saved-native-vias"
import { SavedNativePours } from "../data/saved-native-pours"
import { TimingConstraints } from "../design/timing-constraints"
import { writeFileSync } from "node:fs"
import { PowerPlanes } from "../layout/PowerPlanes"
import { savedRoutes } from "../data/saved-route-geometry"
import { checkRouting } from "./check-baseline"
import { analyzePcbStyle } from "@tscircuit/circuit-json-pcb-style-analysis"
import { AM3352 } from "../components/AM3352"
import { W631GG6MB_12 } from "../imports/W631GG6MB_12"

// Experimental native TSX rendering only. No circuit snapshots are written.
const original = Board()
const omitted = new Set([SavedRoutes, SavedNativeVias, SavedNativePours])
const relaxReferenceBound = (node: any): any => {
  if (!isValidElement(node)) return node
  const props = node.props as any
  return cloneElement(node as any, {
    ...(node.type === "bus" ? { maxLength: undefined } : {}),
    ...(props.children ? { children: Children.map(props.children, relaxReferenceBound) } : {}),
  })
}
const children = Children.toArray(original.props.children).filter(
  child => !isValidElement(child) || !omitted.has(child.type as any),
).map(child => {
  if (!isValidElement(child)) return child
  if (child.type === TimingConstraints) return relaxReferenceBound(TimingConstraints())
  if (child.type === AM3352 || child.type === W631GG6MB_12) return cloneElement(child as any, { viaInPad: true })
  return child
})
const placement = new Circuit()
placement.schematicDisabled = true
placement.add(cloneElement(original, { routingDisabled: true, children }))
await placement.renderUntilSettled()
const netNames = placement.db.source_net.list().map(net => net.name)
const nominalWidths = new Map<string, number>()
for (const [, nets, , points] of savedRoutes) {
  const width = Math.max(0.1, ...points.filter(point => typeof point[0] === "number").map(point => Number(point[3])))
  for (const net of nets) nominalWidths.set(net, Math.max(width, nominalWidths.get(net) ?? 0.1))
}
const circuit = new Circuit()
circuit.schematicDisabled = true
const started = Date.now()
const log = (kind: string, data: unknown) => console.log(`${((Date.now() - started) / 1000).toFixed(1)}s ${kind}`, JSON.stringify(data))
let previousProgress = 0
for (const event of ["autorouting:start", "autorouting:end", "autorouting:error"] as const) {
  circuit.on(event, (data: any) => log(event, {
    name: data?.displayName ?? data?.phaseName ?? data?.name,
    error: data?.error?.message,
    phase: data?.routingPhaseIndex,
    connections: data?.connectionCount,
    obstacles: data?.obstacleCount,
  }))
}
circuit.on("autorouting:end", (data: any) => {
  log("saved-path-availability", { phase: data?.routingPhaseIndex, count: data?.pcbTracePaths?.length, reason: data?.pcbTracePathsUnavailableReason })
  if (!data?.pcbTracePaths?.length) return
  writeFileSync(new URL(`./route-phase-${data.routingPhaseIndex}.tsx`, import.meta.url), `import type { FanoutTracePath } from "@tscircuit/props"\n\n// Native routing phase copper. Generated from TSX; no Circuit JSON snapshot.\nexport const paths: FanoutTracePath[] = ${JSON.stringify(data.pcbTracePaths, null, 2)}\n`)
})
circuit.on("solver:started", (data: any) => {
  const input = data?.solverParams?.input
  log("solver", { name: data?.solverName, connections: input?.connections?.length, obstacles: input?.obstacles?.length, layers: input?.layerCount, buses: input?.buses?.length, pairs: input?.differentialPairs?.length })
})
circuit.on("autorouting:progress", (data: any) => {
  if (Date.now() - previousProgress < 20000) return
  previousProgress = Date.now()
  log("progress", { phase: data?.phaseName, progress: data?.progress, order: data?._actualRoutingPhaseOrderIndex })
})
circuit.add(cloneElement(original, {
  routingDisabled: false,
  isViaInPadAllowed: true,
  autorouter: { preset: "auto_local", allowViaInPad: true },
  autorouterVersion: "latest",
  autorouterEffortLevel: "2x",
  preflightRoutingCheckPolicy: "none",
  routeRemaining: true,
  children: [...children,
    <PowerPlanes />,
    ...netNames.map(name => <net key={name} name={name} routingPhaseIndex={1} nominalTraceWidth={nominalWidths.get(name) ?? 0.1} />),
    <autoroutingphase key="route-main" name="full-board native routing" phaseIndex={1} autorouter={{ preset: "auto_local", allowViaInPad: true }} />,
    <autoroutingphase key="route-cleanup" name="45 degree route cleanup" phaseIndex={99} autorouter="simplify" reroute />,
  ],
}))
await circuit.renderUntilSettled()
const records = circuit.getCircuitJson()
const errors = records.filter(r => r.type.endsWith("_error"))
const counts = Object.fromEntries(["source_component", "source_trace", "pcb_trace", "pcb_via", "pcb_smtpad", "pcb_copper_pour"].map(type => [type, records.filter(r => r.type === type).length]))
const errorCounts = Object.fromEntries([...new Set(errors.map(e => e.type))].map(type => [type, errors.filter(e => e.type === type).length]))
log("complete", { counts, errorCounts, errors: errors.slice(0, 12).map((e: any) => ({ type: e.type, message: e.message })) })
if (!counts.pcb_trace) throw Error("Autorouter produced no traces; this is not a successful reroute")
log("route-style", { issues: analyzePcbStyle(records).issues.length })
await checkRouting(records)
