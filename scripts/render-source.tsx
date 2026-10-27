import { Circuit } from "@tscircuit/core"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { mkdirSync, writeFileSync, readFileSync } from "node:fs"
import { createHash } from "node:crypto"
import { spawnSync } from "node:child_process"
import { resolve } from "node:path"
const root = resolve(import.meta.dir, "..")
const hash = (data: string | Buffer) => createHash("sha256").update(data).digest("hex")
const sourceHashes = () => {
  const result = spawnSync("python3", [resolve(import.meta.dir, "mirror-source.py"), "--source", root, "--hashes"], { encoding: "utf8" })
  if (result.status !== 0) throw new Error(result.stderr)
  return JSON.parse(result.stdout)
}
const before = sourceHashes()
const { default: Board } = await import("../index")
const circuit = new Circuit()
circuit.add(<Board />)
await circuit.renderUntilSettled()
const records = circuit.getCircuitJson()
const directory = resolve(import.meta.dir, "../validation-source")
mkdirSync(directory, { recursive: true })
if (JSON.stringify(before) !== JSON.stringify(sourceHashes())) throw new Error("Native source changed during rendering; rerun before replaying layout")
const payload = JSON.stringify(records)
writeFileSync(`${directory}/native-source.circuit.json`, payload)
writeFileSync(`${directory}/native-render-manifest.json`, JSON.stringify({
  native_sha256: hash(payload), source_files: before, renderer_sha256: hash(readFileSync(import.meta.path)),
}, null, 2) + "\n")
for (const sheet of records.filter(r => r.type === "schematic_sheet")) {
  const name = sheet.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  writeFileSync(`${directory}/${name}.svg`, convertCircuitJsonToSchematicSvg(records, { schematicSheetId: sheet.schematic_sheet_id, width: 1600, height: 1100 }))
}
console.log(`Rendered ${records.filter(r => r.type === "source_component").length} native components on ${records.filter(r => r.type === "schematic_sheet").length} schematic sheets`)
