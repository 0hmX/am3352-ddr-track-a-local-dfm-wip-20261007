import { Circuit } from "@tscircuit/core"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { Resvg } from "@resvg/resvg-js"
import { mkdirSync, writeFileSync } from "node:fs"
import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import Board from "../index"

const output = process.argv[2] ?? "work/cloud/baseline"
mkdirSync(output, { recursive: true })
const circuit = new Circuit({ platform: { partsEngineDisabled: true, netlistDrcChecksDisabled: true } })
circuit.schematicDisabled = true
circuit.add(<Board />)
await circuit.renderUntilSettled()
const records = circuit.getCircuitJson()
const nativeJson=JSON.stringify(records)
writeFileSync(`${output}/board.circuit.json`, nativeJson)
const summary = {
  sourceCommit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
  workingTreeStatus: execFileSync("git", ["status", "--porcelain=v1"], { encoding: "utf8" }),
  nativeExportSha256: createHash("sha256").update(nativeJson).digest("hex"),
  counts: Object.fromEntries(["source_net", "pcb_component", "pcb_trace", "pcb_via", "pcb_copper_pour"].map(type => [type, records.filter(r => r.type === type).length])),
  renderErrors: records.filter(r => r.type.endsWith("_error")),
}
writeFileSync(`${output}/render-summary.json`, JSON.stringify(summary, null, 2))
for (const layer of ["top", "inner2", "inner4", "bottom"] as const) {
  const svg = convertCircuitJsonToPcbSvg(records, { layer, width: 1600, height: 1200 })
  writeFileSync(`${output}/${layer}.svg`, svg)
  writeFileSync(`${output}/${layer}.png`, new Resvg(svg).render().asPng())
}
console.log(JSON.stringify(summary))
