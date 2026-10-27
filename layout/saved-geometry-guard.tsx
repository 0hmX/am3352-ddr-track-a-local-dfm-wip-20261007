// Browser-safe geometry guard; generated baseline from the checked native board.
// Numeric IDs and record ordering are excluded; physical dimensions use 0.1 nm precision.
const expectedGeometryFingerprint = "5c7ef8856a7c24cb"

export function pcbGeometryFingerprint(db: any): string {
  const components = new Map(db.source_component.list().map((r: any) => [r.source_component_id, r.name]))
  const pcbComponents = new Map(db.pcb_component.list().map((r: any) => [r.pcb_component_id, components.get(r.source_component_id)]))
  const ports = new Map(db.source_port.list().filter((r: any) => components.has(r.source_component_id)).map((r: any) => [r.source_port_id, `${components.get(r.source_component_id)}.${r.pin_number || r.name}`]))
  const netNames = new Map(db.source_net.list().map((r: any) => [r.source_net_id, r.name]))
  const netBindings = new Map<string, Set<string>>()
  for (const trace of db.source_trace.list()) {
    for (const id of trace.connected_source_port_ids ?? []) {
      const names = netBindings.get(id) ?? new Set<string>()
      for (const net of trace.connected_source_net_ids ?? []) names.add(String(netNames.get(net)))
      netBindings.set(id, names)
    }
  }
  let expanded = true
  while (expanded) {
    expanded = false
    for (const group of db.source_component_internal_connection.list()) {
      const names = new Set<string>(group.source_port_ids.flatMap((id: string) => [...(netBindings.get(id) ?? [])]))
      for (const id of group.source_port_ids) {
        if ([...(netBindings.get(id) ?? [])].length !== names.size) expanded = true
        netBindings.set(id, new Set(names))
      }
    }
  }
  const pcbPorts = new Map(db.pcb_port.list().map((r: any) => [r.pcb_port_id, ports.get(r.source_port_id)]))
  const fields: Record<string, string[]> = {
    pcb_board: ["center", "width", "height", "thickness", "num_layers", "outline"],
    pcb_component: ["center", "rotation", "layer"],
    pcb_port: ["x", "y", "layers"],
    pcb_smtpad: ["x", "y", "layer", "shape", "radius", "width", "height", "ccw_rotation", "corner_radius", "points", "solder_mask_margin", "is_covered_with_solder_mask"],
    pcb_plated_hole: ["x", "y", "layers", "shape", "hole_diameter", "outer_diameter", "hole_height", "hole_width", "outer_height", "outer_width", "ccw_rotation", "is_covered_with_solder_mask"],
    pcb_via: ["x", "y", "layers", "from_layer", "to_layer", "hole_diameter", "outer_diameter", "tented_on_top", "tented_on_bottom"],
    pcb_hole: ["x", "y", "hole_diameter", "hole_shape", "hole_width", "hole_height"],
  }
  const normalize = (v: any): any => typeof v === "number" ? Math.round(v * 1e7) / 1e7 : Array.isArray(v) ? v.map(normalize) : v && typeof v === "object" ? Object.fromEntries(Object.keys(v).sort().map(k => [k, normalize(v[k])])) : v ?? null
  const rows: string[] = []
  for (const [type, keys] of Object.entries(fields)) {
    for (const r of db[type].list()) {
      const identity = type === "pcb_component" ? components.get(r.source_component_id) : type === "pcb_port" ? ports.get(r.source_port_id) : pcbPorts.get(r.pcb_port_id) ?? pcbComponents.get(r.pcb_component_id) ?? null
      // Manually placed vias create synthetic ports/components; their actual copper is checked below.
      if ((type === "pcb_component" || type === "pcb_port") && !identity) continue
      const namedNets = type === "pcb_via" ? [netNames.get(r.source_net_id)] : type === "pcb_port" ? [...(netBindings.get(r.source_port_id) ?? [])].sort() : null
      rows.push(JSON.stringify([type, identity, namedNets, ...keys.map(k => normalize(r[k]))]))
    }
  }
  const text = rows.sort().join("\n")
  let a = 2166136261, b = 3339675911
  for (let i = 0; i < text.length; i++) {
    a = Math.imul(a ^ text.charCodeAt(i), 16777619)
    b = Math.imul(b ^ text.charCodeAt(i), 2246822519)
  }
  return `${(a >>> 0).toString(16).padStart(8, "0")}${(b >>> 0).toString(16).padStart(8, "0")}`
}

export function assertSavedGeometry(db: any): void {
  const board = db.pcb_board.list()[0]
  const rules: Record<string, number> = {
    min_board_edge_clearance: 0.2, min_pad_edge_to_pad_edge_clearance: 0.1,
    min_plated_hole_drill_edge_to_drill_edge_clearance: 0.15,
    min_trace_to_hole_edge_clearance: 0.2, min_trace_to_pad_edge_clearance: 0.1,
    min_trace_width: 0.1, min_via_hole_diameter: 0.15,
    min_via_hole_edge_to_via_hole_edge_clearance: 0.1, min_via_pad_diameter: 0.3,
  }
  for (const [name, value] of Object.entries(rules)) {
    if (board[name] !== value) throw new Error(`Saved routing requires ${name}=${value}; found ${board[name]}`)
  }
  const actual = pcbGeometryFingerprint(db)
  if (actual !== expectedGeometryFingerprint) throw new Error(`Saved routing requires unchanged PCB placement and footprints (${actual} != ${expectedGeometryFingerprint}). Restore the checked geometry or deliberately reroute and validate the changed board.`)
}
