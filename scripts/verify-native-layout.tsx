import { Circuit } from "@tscircuit/core"
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import Board from "../index"

// Independently captured from the checked routed reference before its removal.
const expected: Record<string, { count: number; sha256: string }> = {
  "segments": {
    "count": 18672,
    "sha256": "0e5974b6ee4a6a89edc105c4e486594fe270a3af9ef25b3c1bcc8166e3e5fda8"
  },
  "vias": {
    "count": 1143,
    "sha256": "090b556763a7a0ae5d20f6d792788428feae569ea25ff6c2a39d38e23eaec74d"
  },
  "pours": {
    "count": 76,
    "sha256": "7a7c3f0fe9ca2eb048bb7de47f7a2982ec6318966fd54aca4723a61fbbb772d5"
  }
}

function stable(value: any): any {
  if (typeof value === "number") return Math.round(value * 1e8)
  if (Array.isArray(value)) return value.map(stable)
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map(k => [k, stable(value[k])]))
  return value ?? null
}
function fingerprints(records: any[]) {
  const nets = new Map(records.filter(r => r.type === "source_net").map(r => [r.source_net_id, r.name]))
  const traces = new Map(records.filter(r => r.type === "source_trace").map(r => [r.source_trace_id, r]))
  const rows: Record<string, string[]> = { segments: [], vias: [], pours: [] }
  for (const r of records) {
    if (r.type === "pcb_trace") {
      const trace = traces.get(r.source_trace_id)
      if (!trace || trace.connected_source_net_ids.length !== 1) throw Error(`Ambiguous route net: ${r.pcb_trace_id}`)
      const net = nets.get(trace.connected_source_net_ids[0])
      for (let i = 1; i < r.route.length; i++) {
        const a = r.route[i - 1], b = r.route[i]
        if (a.route_type !== "wire" || b.route_type !== "wire") continue
        if (a.layer !== b.layer) throw Error("Wire changes layer without a via")
        const points = [[a.x, a.y], [b.x, b.y]].map(p => JSON.stringify(stable(p))).sort()
        if (points[0] !== points[1]) rows.segments.push(JSON.stringify([net, a.layer, stable(a.width), ...points]))
      }
    } else if (r.type === "pcb_via" || r.type === "pcb_copper_pour") {
      const keys = r.type === "pcb_via"
        ? ["x", "y", "hole_diameter", "outer_diameter", "layers", "tented_on_top", "tented_on_bottom"]
        : ["layer", "shape", "brep_shape", "points", "covered_with_solder_mask"]
      rows[r.type === "pcb_via" ? "vias" : "pours"].push(JSON.stringify(stable([nets.get(r.source_net_id), ...keys.map(k => r[k])])) )
    }
  }
  return Object.fromEntries(Object.entries(rows).map(([kind, values]) => [kind, { count: values.length, sha256: createHash("sha256").update(values.sort().join("\n")).digest("hex") }]))
}

if (process.argv[2] === "--capture") {
  console.log(JSON.stringify(fingerprints(JSON.parse(readFileSync(process.argv[3], "utf8"))), null, 2))
} else {
  const circuit = new Circuit()
  circuit.add(<Board />)
  await circuit.renderUntilSettled()
  const records = circuit.getCircuitJson()
  const errors = records.filter(r => r.type.endsWith("_error"))
  if (errors.length) throw Error(`Native render errors: ${errors.map(r => r.type).join(", ")}`)
  const actual = fingerprints(records)
  console.log(JSON.stringify(actual, null, 2))
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw Error("Native copper differs from the checked routed reference")
  console.log("PASS: native segments, widths, layers, net bindings, vias, tenting and pours preserved")
}
