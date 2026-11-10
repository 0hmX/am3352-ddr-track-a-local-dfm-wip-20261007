import { readFileSync, mkdirSync, writeFileSync } from "node:fs"
import { convertCircuitJsonToSchematicSvg } from "circuit-to-svg"
import { Resvg } from "@resvg/resvg-js"
const [input, output] = process.argv.slice(2)
const circuit = JSON.parse(readFileSync(input, "utf8"))
mkdirSync(output, { recursive: true })
const rows = []
for (const sheet of circuit.filter((r: any) => r.type === "schematic_sheet")) {
  const slug = sheet.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  const records = circuit.filter((r: any) => (["source_component", "source_port", "source_net", "source_trace", "source_component_internal_connection"].includes(r.type)) || (r.type.startsWith("schematic_") && r.schematic_sheet_id === sheet.schematic_sheet_id))
  // Keep the real sheet frame: fit-to-sheet problems must remain visible.
  const svg = convertCircuitJsonToSchematicSvg(records, { width: 1600, height: 1100 })
  writeFileSync(`${output}/${slug}.png`, new Resvg(svg, { font: { loadSystemFonts: false, fontFiles: ["/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Menlo.ttc"], defaultFontFamily: "Arial" } }).render().asPng())
  const warnings = records.filter((r: any) => r.type.startsWith("schematic_") && /_(warning|error)$/.test(r.type))
  const components = records.filter((r: any) => r.type === "schematic_component")
  const wires = records.filter((r: any) => r.type === "schematic_trace")
  const labels = records.filter((r: any) => r.type === "schematic_net_label")
  const points: { x: number; y: number }[] = []
  for (const r of [...components, ...records.filter((r: any) => r.type === "schematic_port"), ...labels]) {
    if (!r.center) continue
    const w = r.size?.width ?? (r.type === "schematic_net_label" ? r.text.length * 0.1 : 0)
    const h = r.size?.height ?? 0.2
    points.push({x:r.center.x-w/2,y:r.center.y-h/2},{x:r.center.x+w/2,y:r.center.y+h/2})
  }
  for (const wire of wires) for (const edge of wire.edges) points.push(edge.from, edge.to)
  const width = Math.max(...points.map(p => p.x)) - Math.min(...points.map(p => p.x))
  const height = Math.max(...points.map(p => p.y)) - Math.min(...points.map(p => p.y))
  const metrics = { components: components.length, wires: wires.length, netLabels: labels.length,
    netLabelShare: labels.length / (components.length + wires.length + labels.length),
    sheetMm: [sheet.sheet_width, sheet.sheet_height], contentBoundsMm: [width * 10, height * 10],
    boundingBoxFill: width * height * 100 / (sheet.sheet_width * sheet.sheet_height) }
  rows.push({ metrics, sheet: sheet.name, image: `${slug}.png`, warnings: warnings.map((r: any) => ({ type: r.type, message: r.message })) })
}
writeFileSync(`${output}/sheets.json`, JSON.stringify(rows, null, 2) + "\n")
console.log(`${rows.length} actual sheets rendered to ${output}`)
