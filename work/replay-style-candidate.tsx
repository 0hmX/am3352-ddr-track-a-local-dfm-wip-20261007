import { Circuit } from "@tscircuit/core"
import { analyzePcbStyle, renderPcbStyleSvg } from "@tscircuit/circuit-json-pcb-style-analysis"
import { checkViaTraceClearance } from "@tscircuit/checks"
import { Children, cloneElement, isValidElement } from "react"
import { writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"
import Board from "../index"
import { SavedRoutes } from "../layout/SavedRoutes"
import { checkRouting } from "./check-baseline"

const candidateArgument = process.argv.find(arg => arg.startsWith("--candidate="))?.slice("--candidate=".length)
const { savedRoutes } = await import(candidateArgument ? pathToFileURL(resolve(candidateArgument)).href : new URL("../data/saved-route-geometry.tsx", import.meta.url).href)

const circuit = new Circuit()
circuit.schematicDisabled = true
const board = Board()
const children = Children.toArray(board.props.children).map(child =>
  isValidElement(child) && child.type === SavedRoutes ? <SavedRoutes routes={savedRoutes} /> : child)
circuit.add(cloneElement(board, {}, ...children))
await circuit.renderUntilSettled()
const records = circuit.getCircuitJson()
const { issues } = analyzePcbStyle(records)
console.log(`Candidate replay: ${records.filter(r => r.type === "pcb_trace").length} traces, ${records.filter(r => r.type === "pcb_via").length} vias; ${issues.length} style issues`)
const counts = new Map<string, number>()
for (const issue of issues) counts.set(issue.lineItemType, (counts.get(issue.lineItemType) ?? 0) + 1)
console.log([...counts])
writeFileSync(new URL("./style-targeted-replay.svg", import.meta.url), renderPcbStyleSvg(records, issues))
const traces = records.filter((r: any) => r.type === "pcb_trace") as any[]
for (const finding of checkViaTraceClearance(records) as any[]) {
  console.log("VIA CLEARANCE", finding.message, Object.fromEntries(Object.entries(finding).filter(([key]) => /(?:trace|via).*id/.test(key))))
}
for (const issue of issues) {
  const index = traces.findIndex(trace => trace.pcb_trace_id === issue.pcbTraceId)
  console.log("STYLE", savedRoutes[index]?.[0], savedRoutes[index]?.[1], issue.message)
}
await checkRouting(records)
