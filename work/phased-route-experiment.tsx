import { Circuit } from "@tscircuit/core"
import { analyzePcbStyle } from "@tscircuit/circuit-json-pcb-style-analysis"
import { checkEachPcbPortConnectedToPcbTraces } from "@tscircuit/checks"
import { getFullConnectivityMapFromCircuitJson } from "circuit-json-to-connectivity-map"
import { Children, cloneElement, isValidElement } from "react"
import { writeFileSync } from "node:fs"
import Board from "../index"
import { AM3352 } from "../components/AM3352"
import { W631GG6MB_12 } from "../imports/W631GG6MB_12"
import { TimingConstraints } from "../design/timing-constraints"
import { PowerPlanes } from "../layout/PowerPlanes"
import { SavedRoutes } from "../layout/SavedRoutes"
import { SavedNativeVias } from "../data/saved-native-vias"
import { savedRoutes } from "../data/saved-route-geometry"
import { checkRouting } from "./check-baseline"

// Compile native TSX in memory; export only native TSX routing-phase paths.
const started = Date.now()
const log = (kind: string, value: unknown) => console.log(`${((Date.now() - started) / 1000).toFixed(1)}s ${kind}`, JSON.stringify(value))
const original = Board()
const omit = new Set([SavedRoutes, SavedNativeVias, PowerPlanes])
function omitUnresolvableReferenceBound(node: any): any {
  if (!isValidElement(node)) return node
  const props = node.props as any
  return cloneElement(node as any, {
    ...(node.type === "bus" && props.maxLength?.reference ? { maxLength: undefined } : {}),
    ...(props.children ? { children: Children.map(props.children, omitUnresolvableReferenceBound) } : {}),
  })
}
const children = Children.toArray(original.props.children).filter(child =>
  !isValidElement(child) || !omit.has(child.type as any),
).map(child => {
  if (!isValidElement(child)) return child
  if (child.type === TimingConstraints) return omitUnresolvableReferenceBound(TimingConstraints())
  if (child.type === AM3352 || child.type === W631GG6MB_12) return cloneElement(child as any, { viaInPad: true, viaInPadToLayer: "inner2" })
  return child
})
const placement = new Circuit()
placement.schematicDisabled = true
placement.add(cloneElement(original, { routingDisabled: true, allowBlindAndBuriedVias: true, children }))
log("placement", "Rendering the native components and pad-centered vias")
await placement.renderUntilSettled()
const placementChecks = await checkRouting(placement.getCircuitJson(), ["checkViaPadClearance", "checkDifferentNetViaSpacing", "checkSameNetViaSpacing"])
if (placementChecks.some(check => check.failure || check.findings)) throw Error("Native via-in-pad placement failed clearance validation before routing")
const netNames = placement.db.source_net.list().map(net => net.name)
const groundNet = placement.db.source_net.list().find(net => net.name === "GND")!
const logical = getFullConnectivityMapFromCircuitJson(placement.getCircuitJson())
const componentNames = new Map(placement.db.source_component.list().map(component => [component.source_component_id, component.name]))
const pcbComponents = new Map(placement.db.pcb_component.list().map(component => [component.pcb_component_id, component]))
const pcbPorts = new Map(placement.db.pcb_port.list().map(port => [port.pcb_port_id, port]))
const sourcePorts = new Map(placement.db.source_port.list().map(port => [port.source_port_id, port]))
const groundVias = placement.db.pcb_via.list().filter(via => logical.areIdsConnected(via.pcb_via_id, groundNet.source_net_id))
const allVias = placement.db.pcb_via.list()
const groundViaIds = new Set(groundVias.map(via => via.pcb_via_id))
const foreignPads = placement.db.pcb_smtpad.list().filter(pad => !logical.areIdsConnected(pad.pcb_smtpad_id, groundNet.source_net_id))
const groundHoles = placement.db.pcb_plated_hole.list().filter(hole => logical.areIdsConnected(hole.pcb_plated_hole_id, groundNet.source_net_id))
const groundDefinitions: { name: string; x: number; y: number; from: "top" | "bottom"; to: "inner1" | "inner6"; selector: string }[] = []
const centers = new Set<string>()
const adjustedGroundPads: { selector: string; offset: number; conflicts: number }[] = []
function padDistance(x: number, y: number, pad: any): number {
  if (pad.shape === "circle") return Math.hypot(x - pad.x, y - pad.y) - pad.radius
  if (pad.shape === "polygon") {
    let inside = false, distance = Infinity
    for (let i = 0, j = pad.points.length - 1; i < pad.points.length; j = i++) {
      const a = pad.points[j], b = pad.points[i], dx = b.x - a.x, dy = b.y - a.y
      const t = Math.max(0, Math.min(1, ((x - a.x) * dx + (y - a.y) * dy) / (dx * dx + dy * dy || 1)))
      distance = Math.min(distance, Math.hypot(x - a.x - t * dx, y - a.y - t * dy))
      if ((a.y > y) !== (b.y > y) && x < (b.x - a.x) * (y - a.y) / (b.y - a.y) + a.x) inside = !inside
    }
    return inside ? -distance : distance
  }
  const angle = -(pad.ccw_rotation ?? 0) * Math.PI / 180
  const dx = x - pad.x, dy = y - pad.y
  const radius = pad.shape.includes("pill") ? Math.min(pad.width, pad.height) / 2 : pad.corner_radius ?? 0
  const qx = Math.abs(dx * Math.cos(angle) - dy * Math.sin(angle)) - pad.width / 2 + radius
  const qy = Math.abs(dx * Math.sin(angle) + dy * Math.cos(angle)) - pad.height / 2 + radius
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - radius
}
function viaConflicts(x: number, y: number, from: string, to: string) {
  return allVias.filter(via => {
    const distance = Math.hypot(x - via.x, y - via.y)
    const sameLayer = via.layers.includes(from as any) || via.layers.includes(to as any)
    return distance < 0.075 + via.hole_diameter / 2 + 0.102 || !groundViaIds.has(via.pcb_via_id) && sameLayer && distance < 0.15 + via.outer_diameter / 2 + 0.102
  })
}
const offsets = Array.from({ length: 25 }, (_, xi) => Array.from({ length: 25 }, (_, yi) => ({ x: (xi - 12) * 0.025, y: (yi - 12) * 0.025 }))).flat().sort((a, b) => Math.hypot(a.x, a.y) - Math.hypot(b.x, b.y))
for (const pad of placement.db.pcb_smtpad.list()) {
  if (!logical.areIdsConnected(pad.pcb_smtpad_id, groundNet.source_net_id)) continue
  const component = pcbComponents.get(pad.pcb_component_id)
  const componentName = component && componentNames.get(component.source_component_id)
  if (componentName === "U1" || componentName === "U3") continue
  const pcbPort = pad.pcb_port_id ? pcbPorts.get(pad.pcb_port_id) : undefined
  const sourcePort = pcbPort && sourcePorts.get(pcbPort.source_port_id)
  if (!componentName || !sourcePort) throw Error(`Ground pad lacks a source selector: ${pad.pcb_smtpad_id}`)
  let x = (pad as any).x ?? pcbPort!.x, y = (pad as any).y ?? pcbPort!.y
  if (!Number.isFinite(x) || !Number.isFinite(y)) throw Error(`Ground pad has no finite center: ${pad.pcb_smtpad_id}`)
  const from = pad.layer as "top" | "bottom"
  if (from !== "top" && from !== "bottom") throw Error(`Unexpected SMT layer: ${from}`)
  const to = from === "top" ? "inner1" : "inner6"
  const sameCenter = (item: any) => Math.hypot(item.x - x, item.y - y) < 1e-6
  if (groundVias.some(via => sameCenter(via) && via.layers.includes(from) && via.layers.includes(to))) continue
  if (groundHoles.some(hole => sameCenter(hole) && hole.pcb_port_id === pad.pcb_port_id)) continue
  const selector = `.${componentName} > .${sourcePort.pin_number ? `pin${sourcePort.pin_number}` : sourcePort.name}`
  const conflicts = viaConflicts(x, y, from, to)
  if (conflicts.length) {
    const candidate = offsets.map(offset => ({ x: x + offset.x, y: y + offset.y, offset: Math.hypot(offset.x, offset.y) })).find(point =>
      padDistance(point.x, point.y, pad) <= -0.076 &&
      !viaConflicts(point.x, point.y, from, to).length &&
      foreignPads.every(other => other.layer !== from || padDistance(point.x, point.y, other) >= 0.252),
    )
    if (!candidate) throw Error(`No legal in-pad ground via position for ${selector}`)
    x = candidate.x; y = candidate.y
    adjustedGroundPads.push({ selector, offset: candidate.offset, conflicts: conflicts.length })
  }
  const key = `${from}:${x.toFixed(6)}:${y.toFixed(6)}`
  if (centers.has(key)) continue
  centers.add(key)
  groundDefinitions.push({ name: `groundPadVia${groundDefinitions.length}`, x, y, from, to, selector })
}
const GroundVias = () => <>{groundDefinitions.map(via => <via key={via.name} name={via.name} pcbX={via.x} pcbY={via.y} fromLayer={via.from} toLayer={via.to} holeDiameter={0.15} outerDiameter={0.3} connectsTo={via.selector} />)}</>
writeFileSync(new URL("./phased-route-ground-vias.tsx", import.meta.url), `// Native ground pad vias: top pads reach inner1, bottom pads reach inner6.\nexport function GroundVias() {\n  return <>\n${groundDefinitions.map(via => `    <via name=${JSON.stringify(via.name)} pcbX={${via.x}} pcbY={${via.y}} fromLayer=${JSON.stringify(via.from)} toLayer=${JSON.stringify(via.to)} holeDiameter={0.15} outerDiameter={0.3} connectsTo=${JSON.stringify(via.selector)} />`).join("\n")}\n  </>\n}\n`)
log("ground-vias", { generated: groundDefinitions.length, existingGroundVias: groundVias.length, groundPlatedHoles: groundHoles.length, adjustedGroundPads })
const groundedPlacement = new Circuit()
groundedPlacement.schematicDisabled = true
groundedPlacement.add(cloneElement(original, { routingDisabled: true, allowBlindAndBuriedVias: true, children: [...children, <GroundVias key="ground-vias" />, <PowerPlanes key="ground-planes" />] }))
await groundedPlacement.renderUntilSettled()
const groundedRecords = groundedPlacement.getCircuitJson()
const groundPlacementChecks = await checkRouting(groundedRecords, ["checkViaPadClearance", "checkDifferentNetViaSpacing", "checkSameNetViaSpacing"])
if (groundPlacementChecks.some(check => check.failure || check.findings)) throw Error("Direct ground pad vias failed clearance validation")
const groundLogical = getFullConnectivityMapFromCircuitJson(groundedRecords)
const groundId = groundedPlacement.db.source_net.list().find(net => net.name === "GND")!.source_net_id
const groundPortErrors = checkEachPcbPortConnectedToPcbTraces(groundedRecords).filter(error => error.pcb_port_ids?.some(id => groundLogical.areIdsConnected(id, groundId)))
log("ground-physical-connectivity", { pours: groundedPlacement.db.pcb_copper_pour.list().length, findings: groundPortErrors.length, examples: groundPortErrors.slice(0, 5).map(error => error.message) })
if (groundPortErrors.length) throw Error("Native GND pad vias and pours do not physically connect all ground ports")
if (process.argv.includes("--placement-only")) process.exit(0)
const nominalWidths = new Map<string, number>()
for (const [, nets, , points] of savedRoutes) {
  const width = Math.max(0.1, ...points.filter(point => typeof point[0] === "number").map(point => Number(point[3])))
  for (const net of nets) nominalWidths.set(net, Math.max(width, nominalWidths.get(net) ?? 0.1))
}
const phaseForNet = (name: string) => /^DDR_/.test(name) ? 1
  : /^(HDMI_|LCD_|VIDEO_|SYSBOOT)/.test(name) ? 2
  : /^(ETH_|RMII|PHY_|USB|USBC_|TYPEC_)/.test(name) ? 3
  : /^(V\d|VDD_|SYS_5V$|CAP_|PMIC_SW|PMIC_INT_LDO$|INPUT_)/.test(name) ? 4 : 5
const phaseNames = ["Ground pad vias", "DDR memory", "Video and HDMI", "Ethernet and USB", "Power rails", "Remaining control signals"]
log("phase-net-counts", phaseNames.map((name, phase) => ({ phase, name, nets: netNames.filter(net => net !== "GND" && phaseForNet(net) === phase).length })))

const circuit = new Circuit()
circuit.schematicDisabled = true
let previousProgress = 0
circuit.on("solver:started", (event: any) => {
  const input = event.solverParams?.input
  log("solver", { name: event.solverName, connections: input?.connections?.length, obstacles: input?.obstacles?.length, buses: input?.buses?.length, pairs: input?.differentialPairs?.length })
})
circuit.on("autorouting:start", (event: any) => log("phase-start", { phase: event.routingPhaseIndex, name: event.phaseName, connections: event.connectionCount, obstacles: event.obstacleCount }))
circuit.on("autorouting:error", (event: any) => log("phase-error", { phase: event.routingPhaseIndex, error: event.error?.message ?? String(event.error) }))
circuit.on("autorouting:progress", (event: any) => {
  if (Date.now() - previousProgress < 20_000) return
  previousProgress = Date.now()
  log("progress", { phase: event.phaseName, order: event._actualRoutingPhaseOrderIndex, progress: event.progress })
})
circuit.on("autorouting:end", (event: any) => {
  const phase = event.routingPhaseIndex
  log("phase-end", { phase, paths: event.pcbTracePaths?.length, unavailable: event.pcbTracePathsUnavailableReason })
  if (!event.pcbTracePaths?.length) return
  writeFileSync(new URL(`./phased-route-${phase}.tsx`, import.meta.url),
    `import type { FanoutTracePath } from "@tscircuit/props"\n\n// Native routing-phase paths compiled from TSX; no Circuit JSON snapshot.\nexport const paths: FanoutTracePath[] = ${JSON.stringify(event.pcbTracePaths, null, 2)}\n`)
})
circuit.add(cloneElement(original, {
  routingDisabled: false,
  isViaInPadAllowed: true,
  allowBlindAndBuriedVias: true,
  autorouter: { preset: "auto_local", allowViaInPad: true },
  autorouterVersion: "latest",
  autorouterEffortLevel: "2x",
  preflightRoutingCheckPolicy: "none",
  routeRemaining: false,
  children: [...children, <GroundVias key="ground-vias" />, <PowerPlanes key="ground-planes" />,
    ...netNames.filter(name => name !== "GND").map(name => <net key={name} name={name} routingPhaseIndex={phaseForNet(name)} nominalTraceWidth={nominalWidths.get(name) ?? 0.1} />),
    ...phaseNames.slice(1).map((name, i) => <autoroutingphase key={name} phaseIndex={i + 1} name={name} autorouter={{ preset: "auto_local", allowViaInPad: true }} />),
  ],
}))
await circuit.renderUntilSettled()
const records = circuit.getCircuitJson()
const errors = records.filter(record => record.type.endsWith("_error"))
const { issues } = analyzePcbStyle(records)
log("completed", {
  traces: records.filter(record => record.type === "pcb_trace").length,
  vias: records.filter(record => record.type === "pcb_via").length,
  pours: records.filter(record => record.type === "pcb_copper_pour").length,
  styleIssues: issues.length,
  errorCounts: Object.fromEntries([...new Set(errors.map(error => error.type))].map(type => [type, errors.filter(error => error.type === type).length])),
  errors: errors.slice(0, 10).map((error: any) => ({ type: error.type, message: error.message })),
})
await checkRouting(records, ["runAllNetlistChecks", "checkTracesAreContiguous", "checkEachPcbPortConnectedToPcbTraces", "checkEachPcbTraceNonOverlapping", "checkPadTraceClearance", "checkViaTraceClearance", "checkViaPadClearance", "checkDifferentNetViaSpacing", "checkSameNetViaSpacing", "checkPcbTracesOutOfBoard", "checkPcbBusLengthSkew"])
