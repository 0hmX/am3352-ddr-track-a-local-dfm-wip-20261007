import { Circuit } from "@tscircuit/core"
import * as checks from "@tscircuit/checks"
import { Children, cloneElement, isValidElement } from "react"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"
import Board from "../index"
import { SavedRoutes, type SavedRouteDefinition } from "../layout/SavedRoutes"
import { savedRoutes as baselineRoutes } from "../data/saved-route-geometry"
import { pcbGeometryFingerprint } from "../layout/saved-geometry-guard"

// Compare independently rendered TSX sources. Compiled circuit data is never
// serialized; only normalized diagnostic findings are printed.
const checkNames = [
  "runAllNetlistChecks", "checkSourceTracesHavePcbTraces",
  "checkTracesAreContiguous", "checkEachPcbPortConnectedToPcbTraces",
  "checkEachPcbTraceNonOverlapping", "checkPadTraceClearance",
  "checkViaTraceClearance", "checkViaPadClearance",
  "checkDifferentNetViaSpacing", "checkPcbTracesOutOfBoard",
] as const

function referenceNames(records: any[], routes: SavedRouteDefinition[]) {
  const names = new Map<string, string>()
  const identify = (record: any, name: string) => {
    const id = record[`${record.type}_id`]
    if (typeof id === "string") names.set(id, `${record.type}:${name}`)
  }
  const ref = (id: string) => names.get(id) ?? id
  for (const r of records) {
    if (r.type === "source_component") identify(r, r.name)
    if (r.type === "source_net") identify(r, r.name)
  }
  for (const r of records) {
    if (r.type === "source_port") identify(r, `${ref(r.source_component_id)}.${r.pin_number || r.name}`)
    if (r.type === "pcb_component") identify(r, ref(r.source_component_id))
  }
  for (const r of records) {
    if (r.type === "pcb_port") identify(r, ref(r.source_port_id))
    if (r.type === "source_trace") identify(r, JSON.stringify([
      (r.connected_source_port_ids ?? []).map(ref).sort(),
      (r.connected_source_net_ids ?? []).map(ref).sort(),
    ]))
  }
  let traceIndex = 0
  for (const r of records) {
    if (r.type === "pcb_trace") {
      const route = routes[traceIndex++]
      if (!route) throw Error("Rendered trace count exceeds the authored route count")
      identify(r, route[0])
    }
    if (["pcb_via", "pcb_smtpad", "pcb_plated_hole", "pcb_hole"].includes(r.type)) {
      identify(r, JSON.stringify([
        ref(r.source_net_id), ref(r.pcb_port_id), ref(r.pcb_component_id),
        r.x, r.y, r.layer, r.layers, r.shape, r.hole_diameter,
        r.outer_diameter, r.width, r.height, r.radius,
      ]))
    }
  }
  if (traceIndex !== routes.length) throw Error(`Expected ${routes.length} authored traces, rendered ${traceIndex}`)
  return names
}

export function findingFingerprints(findings: any[], records: any[], routes: SavedRouteDefinition[]) {
  const names = referenceNames(records, routes)
  const fingerprints = new Map<string, number>()
  for (const finding of findings) {
    const normalize = (value: any, key = ""): any => {
      if (typeof value === "string") return names.get(value) ?? value
      if (Array.isArray(value)) {
        const entries = value.map(entry => normalize(entry))
        return key.endsWith("_ids") ? entries.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))) : entries
      }
      if (value && typeof value === "object") return Object.fromEntries(
        Object.keys(value).sort().filter(k => k !== `${finding.type}_id`).map(k => [k, normalize(value[k], k)]),
      )
      return value
    }
    const fingerprint = JSON.stringify(normalize(finding))
    fingerprints.set(fingerprint, (fingerprints.get(fingerprint) ?? 0) + 1)
  }
  return fingerprints
}

async function evaluate(label: string, routes: SavedRouteDefinition[]) {
  const start = Date.now()
  const circuit = new Circuit()
  circuit.schematicDisabled = true
  const board = Board()
  const children = Children.toArray(board.props.children).map(child =>
    isValidElement(child) && child.type === SavedRoutes ? <SavedRoutes routes={routes} /> : child)
  circuit.add(cloneElement(board, {}, ...children))
  console.log(`${label}: rendering TSX`)
  await circuit.renderUntilSettled()
  const records = circuit.getCircuitJson()
  console.log(`${label}: rendered ${routes.length} traces in ${((Date.now() - start) / 1000).toFixed(1)} s`)
  let styleCount: number | undefined
  if (process.argv.includes("--style")) {
    const { analyzePcbStyle } = await import("@tscircuit/circuit-json-pcb-style-analysis")
    const { issues } = analyzePcbStyle(records)
    styleCount = issues.length
    const traces = records.filter(r => r.type === "pcb_trace")
    console.log(`${label}: full PCB-style analyzer = ${styleCount} findings`)
    for (const issue of issues) {
      const index = traces.findIndex(trace => trace.pcb_trace_id === issue.pcbTraceId)
      console.log(`STYLE ${label}: ${routes[index]?.[0]} ${issue.lineItemType}: ${issue.message}`)
    }
  }
  const output = new Map<string, Map<string, number>>()
  const geometry = pcbGeometryFingerprint(circuit.db)
  const allChecks: Array<[string, () => any]> = [
    ["renderErrors", () => records.filter(r => r.type.endsWith("_error"))],
    ...checkNames.map(name => [name, () => (checks as Record<string, any>)[name](records)] as [string, () => any]),
  ]
  for (const [name, check] of allChecks) {
    console.log(`${label}: checking ${name}`)
    const findings = await check()
    output.set(name, findingFingerprints(findings, records, routes))
    console.log(`${label}: ${name} = ${findings.length}`)
  }
  return { geometry, output, styleCount }
}

if (import.meta.main) {
  const candidateArgument = process.argv.find(arg => arg.startsWith("--candidate="))?.slice("--candidate=".length)
  const candidateModule = candidateArgument
    ? pathToFileURL(resolve(candidateArgument)).href
    : new URL("./style-targeted-routes.tsx", import.meta.url).href
  const { savedRoutes: candidateRoutes } = await import(candidateModule)
  if (!Array.isArray(candidateRoutes)) throw Error("Candidate TSX module must export savedRoutes")
  if (baselineRoutes.length !== candidateRoutes.length || baselineRoutes.some((route, i) => route[0] !== candidateRoutes[i][0])) {
    throw Error("Baseline and candidate must preserve authored route identities and ordering")
  }
  const baseline = await evaluate("BASELINE", baselineRoutes)
  const candidate = await evaluate("CANDIDATE", candidateRoutes)
  let introduced = 0, removed = 0
  if (baseline.geometry !== candidate.geometry) throw Error("Candidate changed component, pad, via or net-binding geometry")
  for (const [check, before] of baseline.output) {
    const after = candidate.output.get(check)!
    let addedForCheck = 0, removedForCheck = 0
    for (const fingerprint of new Set([...before.keys(), ...after.keys()])) {
      const difference = (after.get(fingerprint) ?? 0) - (before.get(fingerprint) ?? 0)
      if (!difference) continue
      console.log(`${difference > 0 ? "INTRODUCED" : "REMOVED"} ${check} x${Math.abs(difference)} ${fingerprint}`)
      if (difference > 0) addedForCheck += difference
      else removedForCheck -= difference
    }
    introduced += addedForCheck
    removed += removedForCheck
    console.log(`COMPARE ${check}: ${addedForCheck} introduced, ${removedForCheck} removed`)
  }
  console.log(`Exact finding comparison: ${introduced} introduced, ${removed} removed; physical geometry unchanged`)
  if (baseline.styleCount !== undefined) console.log(`PCB-style findings: ${baseline.styleCount} → ${candidate.styleCount}`)
  process.exitCode = introduced ? 1 : 0
}
