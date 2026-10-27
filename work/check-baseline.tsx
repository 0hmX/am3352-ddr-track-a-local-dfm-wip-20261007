import { Circuit } from "@tscircuit/core"
import * as checks from "@tscircuit/checks"
import { Children, cloneElement, isValidElement } from "react"
import Board from "../index"
import { SavedNativePours } from "../data/saved-native-pours"
import { getFullConnectivityMapFromCircuitJson } from "circuit-json-to-connectivity-map"

// Read-only diagnostic: TSX is rendered in memory and never serialized.
const started = Date.now()
const log = (message: string) => console.log(`${((Date.now() - started) / 1000).toFixed(1)}s ${message}`)
const defaultChecks = [
  "runAllNetlistChecks",
  "checkSourceTracesHavePcbTraces",
  "checkTracesAreContiguous",
  "checkEachPcbPortConnectedToPcbTraces",
  "checkEachPcbTraceNonOverlapping",
  "checkPadTraceClearance",
  "checkViaTraceClearance",
  "checkViaPadClearance",
  "checkDifferentNetViaSpacing",
  "checkPcbTracesOutOfBoard",
]
export function countViasInPads(records: any[]) {
  const connectivity = getFullConnectivityMapFromCircuitJson(records)
  const pads = records.filter(r => r.type === "pcb_smtpad")
  const supportedShapes = new Set(["circle", "rect", "rotated_rect", "pill", "rotated_pill", "polygon"])
  const unsupported = new Set<string>(pads.filter(pad => !supportedShapes.has(pad.shape)).map(pad => pad.shape))
  const inPad = (p: any, pad: any) => {
    const tolerance = 1e-8
    if (pad.shape === "circle") return Math.hypot(p.x - pad.x, p.y - pad.y) <= pad.radius + tolerance
    if (["rect", "rotated_rect", "pill", "rotated_pill"].includes(pad.shape)) {
      const angle = -(pad.ccw_rotation ?? 0) * Math.PI / 180
      const dx = p.x - pad.x, dy = p.y - pad.y
      const x = Math.abs(dx * Math.cos(angle) - dy * Math.sin(angle))
      const y = Math.abs(dx * Math.sin(angle) + dy * Math.cos(angle))
      const radius = pad.radius ?? pad.corner_radius ?? 0
      if (radius) return Math.hypot(Math.max(0, x - pad.width / 2 + radius), Math.max(0, y - pad.height / 2 + radius)) <= radius + tolerance
      return x <= pad.width / 2 + tolerance && y <= pad.height / 2 + tolerance
    }
    if (pad.shape === "polygon") {
      let inside = false
      for (let i = 0, j = pad.points.length - 1; i < pad.points.length; j = i++) {
        const a = pad.points[j], b = pad.points[i]
        const dx = b.x - a.x, dy = b.y - a.y
        const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy || 1)))
        if (Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy) <= tolerance) return true
        if ((a.y > p.y) !== (b.y > p.y) && p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) inside = !inside
      }
      return inside
    }
    unsupported.add(pad.shape)
    return false
  }
  let sameNetInPad = 0, sameNetAtPadCenter = 0
  const vias = records.filter(r => r.type === "pcb_via")
  for (const via of vias) {
    const matched = pads.filter(pad => via.layers?.includes(pad.layer) && connectivity.areIdsConnected(via.pcb_via_id, pad.pcb_smtpad_id) && inPad(via, pad))
    if (matched.length) sameNetInPad++
    if (matched.some(pad => Math.hypot(via.x - pad.x, via.y - pad.y) <= 1e-6)) sameNetAtPadCenter++
  }
  return { totalVias: vias.length, sameNetInPad, sameNetAtPadCenter, unsupportedPadShapes: [...unsupported] }
}

export async function checkRouting(records: any[], names = defaultChecks) {
  log(`Via-in-pad centers: ${JSON.stringify(countViasInPads(records))}`)
  const results = []
  for (const name of names) {
    const check = (checks as Record<string, any>)[name]
    if (typeof check !== "function") throw Error(`Unknown check: ${name}`)
    log(`START ${name}`)
    try {
      const findings = await check(records)
      const groups = new Map<string, number>()
      for (const finding of findings) groups.set(finding.type, (groups.get(finding.type) ?? 0) + 1)
      log(`RESULT ${name}: ${findings.length} findings (${[...groups].map(([type, count]) => `${type}=${count}`).join(", ")})`)
      for (const finding of findings.slice(0, 3)) log(`  ${String(finding.message).slice(0, 500)}`)
      results.push({ check: name, findings: findings.length })
    } catch (error) {
      const failure = error instanceof Error ? `${error.name}: ${error.message}` : String(error)
      log(`FAILED ${name}: ${failure}`)
      if (error instanceof Error) console.log(error.stack?.split("\n").slice(0, 7).join("\n"))
      results.push({ check: name, failure })
    }
  }
  return results
}

if (import.meta.main) {
const noPours = process.argv.includes("--without-pours")
const requested = process.argv.find(arg => arg.startsWith("--checks="))?.slice(9).split(",").filter(Boolean)
const circuit = new Circuit()
circuit.schematicDisabled = true
const board = Board()
const children = Children.toArray(board.props.children).filter(child =>
  !noPours || !(isValidElement(child) && child.type === SavedNativePours))
circuit.add(cloneElement(board, {}, ...children))
log(`Rendering ${noPours ? "diagnostic WITHOUT frozen copper pours" : "current TSX board, with copper as authored"}`)
await circuit.renderUntilSettled()
const records = circuit.getCircuitJson()
log(`Rendered: ${records.filter(r => r.type === "pcb_trace").length} traces, ${records.filter(r => r.type === "pcb_via").length} vias, ${records.filter(r => r.type === "pcb_copper_pour").length} pours; ${records.filter(r => r.type.endsWith("_error")).length} render errors`)
await checkRouting(records, requested)
log("Checks finished; no Circuit JSON written")
}
