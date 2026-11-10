import { createHash } from "node:crypto"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"

// Run after `tsci build index.tsx`. Compare complete PCB and source records,
// including IDs, geometry, net membership, routes, pours, and component positions.
// Supplier fetch diagnostics have random IDs/network results, and the project
// metadata intentionally hashes the edited TSX. Neither describes connectivity.
const volatile = new Set(["source_component_availability_warning", "source_part_not_found_warning", "source_project_metadata"])
const [output, baseline] = process.argv.slice(2)
if (!output) throw new Error("Usage: bun scripts/schematic-lint-evidence.tsx <output-dir> [baseline-circuit.json]")
const circuit = JSON.parse(readFileSync("dist/index/circuit.json", "utf8"))
const canonical = (value: any): any => Array.isArray(value) ? value.map(canonical) :
  value && typeof value === "object" ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value
const digest = (value: any) => createHash("sha256").update(JSON.stringify(canonical(value))).digest("hex")
const physical = (records: any[]) => records.filter(r => r.type.startsWith("pcb_") || r.type.startsWith("source_"))
const summarize = (records: any[]) => Object.fromEntries([...new Set(physical(records).map(r => r.type))].sort().map(type => {
  const elements = records.filter(r => r.type === type)
  return [type, { count: elements.length, sha256: digest(elements) }]
}))
const summary = summarize(circuit)
if (baseline) {
  const before = summarize(JSON.parse(readFileSync(baseline, "utf8")))
  const changed = [...new Set([...Object.keys(before), ...Object.keys(summary)])]
    .filter(type => !volatile.has(type) && JSON.stringify(before[type]) !== JSON.stringify(summary[type]))
  if (changed.length) throw new Error(`PCB/source records changed: ${changed.join(", ")}`)
}
mkdirSync(output, { recursive: true })
writeFileSync(`${output}/pcb-source-fingerprints.json`, JSON.stringify(summary, null, 2) + "\n")
for (const sheet of circuit.filter((r: any) => r.type === "schematic_sheet")) {
  const name = sheet.name ?? sheet.display_name ?? sheet.schematic_sheet_id
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  const svg = convertCircuitJsonToSchematicSvg(circuit, { schematicSheetId: sheet.schematic_sheet_id, width: 1400, height: 1000 })
  writeFileSync(`${output}/${slug}.svg`, svg)
}
console.log(`${Object.keys(summary).length} PCB/source record types fingerprinted; ${baseline ? "all physical/electrical arrays identical to baseline (supplier diagnostics and TSX hash excluded); " : ""}schematic sheets rendered to ${output}`)
