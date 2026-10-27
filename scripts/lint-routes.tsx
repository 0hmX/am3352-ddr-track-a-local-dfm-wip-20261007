import { Circuit } from "@tscircuit/core"
import { analyzePcbStyle, renderPcbStyleSvg } from "@tscircuit/circuit-json-pcb-style-analysis"
import { mkdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import Board from "../index"

// Install the full official analyzer without changing package metadata:
// bun add --no-save --ignore-scripts @tscircuit/circuit-json-pcb-style-analysis@https://jscdn.tscircuit.com/@tscircuit/circuit-json-pcb-style-analysis/0.0.7.tgz
const strict = process.argv.includes("--strict")
const svgIndex = process.argv.indexOf("--svg")
const circuit = new Circuit()
console.log("Rendering the TSX board in memory for route-style checks…")
circuit.add(<Board />)
await circuit.renderUntilSettled()
const records = circuit.getCircuitJson()
const renderErrors = records.filter(record => record.type.endsWith("_error"))
const { issues } = analyzePcbStyle(records, strict
  ? { maxSegmentLengthMm: 1e-6, angleToleranceDegrees: 0.1 } : {})
const traces = records.filter(record => record.type === "pcb_trace")
const counts = new Map<string, number>()
for (const issue of issues) counts.set(issue.lineItemType, (counts.get(issue.lineItemType) ?? 0) + 1)
console.log(`PCB route style (${strict ? "strict 0.1°" : "full upstream defaults"}): ${issues.length} issues across ${traces.length} traces`)
for (const [type, count] of counts) console.log(`  ${type}: ${count}`)
for (const issue of issues.slice(0, 20)) {
  console.log(`  ${issue.pcbTraceId}, ${issue.layer}, route ${issue.startRouteIndex}–${issue.endRouteIndex}: ${issue.message}`)
}
if (issues.length > 20) console.log(`  … ${issues.length - 20} further issues`)
if (renderErrors.length) console.error(`${renderErrors.length} render errors: ${[...new Set(renderErrors.map(record => record.type))].join(", ")}`)

if (svgIndex !== -1) {
  const output = process.argv[svgIndex + 1]
  if (!output?.endsWith(".svg")) throw Error("--svg requires an SVG output path")
  const outputPath = resolve(output)
  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, renderPcbStyleSvg(records, issues))
  console.log(`Style overview: ${outputPath}`)
}
// Compiled circuit data lives only in memory; no Circuit JSON is persisted.
process.exitCode = issues.length || renderErrors.length ? 1 : 0
