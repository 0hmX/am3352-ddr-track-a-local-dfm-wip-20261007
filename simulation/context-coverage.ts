import { sha256 } from "./shared"

// This module inventories native records; it never infers an electrical short from proximity.
export type NativeRecord = { type: string; [field: string]: any }
export const conductiveTypes = new Set(["pcb_trace", "pcb_via", "pcb_copper_pour", "pcb_smtpad", "pcb_plated_hole"])
export const nativeId = (r: NativeRecord): string => r[`${r.type}_id`]
const fingerprint = (r: unknown) => sha256(JSON.stringify(r))
export type Point = [number, number]
export type Bounds = [number, number, number, number]

class Components {
  parent = new Map<string, string>()
  root(id: string): string { const parent = this.parent.get(id); if (!parent) { this.parent.set(id, id); return id }; if (parent === id) return id; const result = this.root(parent); this.parent.set(id, result); return result }
  join(ids: string[]) { if (!ids.length) return; const roots = ids.map(id => this.root(id)).sort(); for (const id of roots) this.parent.set(id, roots[0]) }
}

export function electricalMembership(records: NativeRecord[]) {
  const graph = new Components(), byId = new Map(records.map(r => [nativeId(r), r]))
  for (const r of records) {
    if (["source_port", "source_net"].includes(r.type)) graph.root(nativeId(r))
    if (r.type === "source_trace") graph.join([nativeId(r), ...(r.connected_source_port_ids ?? []), ...(r.connected_source_net_ids ?? [])])
    if (r.type === "source_component_internal_connection") graph.join(r.source_port_ids ?? [])
  }
  const nets = records.filter(r => r.type === "source_net")
  // Native via ports on opposite layers are one explicit barrel, even when one
  // port has no separate source_trace. Validate association; do not merge named conflicts.
  for (const via of records.filter(r => r.type === "pcb_via")) {
    const ports = (via.pcb_port_ids ?? []).map((id: string) => byId.get(id))
    if (ports.some((p: NativeRecord | undefined) => !p || Math.hypot(p.x - via.x, p.y - via.y) > 1e-8 || p.layers.some((l: string) => !via.layers.includes(l)))) continue
    const refs = [via.source_net_id, via.source_trace_id, byId.get(via.pcb_trace_id)?.source_trace_id, ...ports.map((p: NativeRecord) => p.source_port_id)].filter((id): id is string => typeof id === "string")
    const roots = new Set(refs.map(id => graph.root(id)))
    const namedRoots = new Set(nets.filter(n => roots.has(graph.root(n.source_net_id))).map(n => graph.root(n.source_net_id)))
    if (namedRoots.size <= 1) graph.join(refs)
  }
  function membership(r: NativeRecord) {
    const direct = [r.source_net_id, r.source_trace_id]
    if (r.pcb_trace_id && r.type !== "pcb_trace") direct.push(byId.get(r.pcb_trace_id)?.source_trace_id)
    for (const port of [r.pcb_port_id, ...(r.pcb_port_ids ?? [])].filter(Boolean)) direct.push(byId.get(port)?.source_port_id)
    const evidence = [...new Set(direct.filter((v): v is string => typeof v === "string"))]
    const roots = [...new Set(evidence.map(id => graph.root(id)))].sort()
    const matching = nets.filter(n => roots.includes(graph.root(n.source_net_id)))
    return { roots, sourceNetIds: matching.map(n => n.source_net_id).sort(), sourceNetNames: matching.map(n => n.name).sort(), evidence,
      status: roots.length === 1 ? "resolved_logical_component" : roots.length ? "conflicting_logical_components" : "no_electrical_association",
      physicalConnectivityProven: false }
  }
  return { membership, root: (id: string) => graph.root(id) }
}

export function objectBounds(r: NativeRecord): Bounds {
  if (r.type === "pcb_trace") {
    const width = Math.max(...r.route.filter((p: any) => p.route_type === "wire").map((p: any) => p.width)) / 2
    return [Math.min(...r.route.map((p: any) => p.x)) - width, Math.min(...r.route.map((p: any) => p.y)) - width, Math.max(...r.route.map((p: any) => p.x)) + width, Math.max(...r.route.map((p: any) => p.y)) + width]
  }
  if (r.type === "pcb_copper_pour") {
    const points = r.brep_shape.outer_ring.vertices
    return [Math.min(...points.map((p: any) => p.x)), Math.min(...points.map((p: any) => p.y)), Math.max(...points.map((p: any) => p.x)), Math.max(...points.map((p: any) => p.y))]
  }
  const radius = r.type === "pcb_via" ? r.outer_diameter / 2 : r.shape === "circle" ? (r.radius ?? r.outer_diameter / 2) : undefined
  if (radius !== undefined) return [r.x - radius, r.y - radius, r.x + radius, r.y + radius]
  const w = r.width ?? r.outer_width, h = r.height ?? r.outer_height, angle = (r.ccw_rotation ?? 0) * Math.PI / 180
  const dx = (Math.abs(w * Math.cos(angle)) + Math.abs(h * Math.sin(angle))) / 2, dy = (Math.abs(w * Math.sin(angle)) + Math.abs(h * Math.cos(angle))) / 2
  return [r.x - dx, r.y - dy, r.x + dx, r.y + dy]
}

export function insideRing(point: Point, ring: Point[]): boolean {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i], b = ring[j]
    if ((a[1] > point[1]) !== (b[1] > point[1]) && point[0] < (b[0] - a[0]) * (point[1] - a[1]) / (b[1] - a[1]) + a[0]) inside = !inside
  }
  return inside
}
const edgeDistance = (p: Point, a: Point, b: Point) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], lengthSquared = dx * dx + dy * dy
  const t = lengthSquared ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / lengthSquared)) : 0
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy)
}
export function diskInsidePour(point: Point, radius: number, pour: NativeRecord): { contained: boolean; clearanceMm: number } {
  if (pour.shape !== "brep" || !Number.isFinite(radius) || radius <= 0) throw Error("Explicit BREP and positive copper radius required")
  const rings: Point[][] = [pour.brep_shape.outer_ring, ...pour.brep_shape.inner_rings].map(ring => ring.vertices.map((p: any) => [p.x, p.y]))
  if ([pour.brep_shape.outer_ring, ...pour.brep_shape.inner_rings].some(r => r.vertices.some((v: any) => v.bulge))) throw Error("Curved BREP boundary requires explicit handling")
  const clearanceMm = Math.min(...rings.flatMap(ring => ring.map((a, i) => edgeDistance(point, a, ring[(i + 1) % ring.length])))) - radius
  return { contained: insideRing(point, rings[0]) && !rings.slice(1).some(r => insideRing(point, r)) && clearanceMm > 1e-10, clearanceMm }
}

export function buildCoverage(records: NativeRecord[], declaredPlatingMm: number) {
  if (!Number.isFinite(declaredPlatingMm) || declaredPlatingMm <= 0) throw Error("Declared plating assumption required")
  const before = fingerprint(records), electrical = electricalMembership(records), byId = new Map(records.map(r => [nativeId(r), r]))
  const copper = records.filter(r => conductiveTypes.has(r.type))
  if (new Set(copper.map(nativeId)).size !== copper.length || copper.some(r => !nativeId(r))) throw Error("Duplicate/missing native copper IDs")
  const objects = copper.map(record => {
    const id = nativeId(record), boundsMm = objectBounds(record), membership = electrical.membership(record)
    if (!boundsMm.every(Number.isFinite)) throw Error(`Unsupported physical bounds: ${id}`)
    return { id, type: record.type, nativeSha256: fingerprint(record), boundsMm, layers: record.layers ?? (record.layer ? [record.layer] : [...new Set((record.route ?? []).flatMap((p: any) => [p.layer, p.from_layer, p.to_layer].filter(Boolean)))]), membership,
      inclusion: { decision: "retain_in_full_context", reason: "Keep every native copper object; no distance-based exclusion has passed boundary sensitivity", wholeObject: true },
      plannedPhysicalConductor: null, physicalGroupingStatus: "needs_verified_contact_graph_not_logical_net_welding" }
  })
  const pours = copper.filter(r => r.type === "pcb_copper_pour"), vias = copper.filter(r => r.type === "pcb_via")
  const viaPourContacts = []
  for (const via of vias) for (const pour of pours) {
    if (!via.layers.includes(pour.layer)) continue
    const vm = electrical.membership(via), pm = electrical.membership(pour)
    const sameLogicalComponent = vm.roots.length === 1 && pm.roots.length === 1 && vm.roots[0] === pm.roots[0]
    const barrelRadiusMm = via.hole_diameter / 2 + declaredPlatingMm
    const containment = diskInsidePour([via.x, via.y], barrelRadiusMm, pour)
    viaPourContacts.push({ viaId: nativeId(via), pourId: nativeId(pour), layer: pour.layer, sameLogicalComponent, barrelRadiusMm, ...containment,
      status: containment.contained ? sameLogicalComponent ? "barrel_contact_proven_under_declared_plating" : "physical_copper_conflicts_with_logical_membership" : "contact_not_proven_by_full_disk_test",
      assumption: `Source supplies drill diameter and span; ${declaredPlatingMm} mm plating is a declared model assumption, not fabrication verification` })
  }
  const planeGraph = new Components()
  for (const p of pours) planeGraph.root(nativeId(p))
  for (const c of viaPourContacts) if (c.status === "barrel_contact_proven_under_declared_plating") planeGraph.join([c.viaId, c.pourId])
  const physicalPlaneGroups = [...new Set(pours.map(p => planeGraph.root(nativeId(p))))].map(root => ({ pourIds: pours.filter(p => planeGraph.root(nativeId(p)) === root).map(nativeId), stitchingViaIds: vias.filter(v => planeGraph.parent.has(nativeId(v)) && planeGraph.root(nativeId(v)) === root).map(nativeId) }))
  const boundaries = pours.flatMap(p => [p.brep_shape.outer_ring, ...p.brep_shape.inner_rings].map((ring, i) => ({ id: `${nativeId(p)}/${i ? `cutout-${i - 1}` : "outer"}`, objectId: nativeId(p), layer: p.layer, type: i ? "copper_void" : "copper_outer", nativeSha256: fingerprint(ring), vertexCount: ring.vertices.length })))
  const stack = records.find(r => r.type === "pcb_stackup")!, board = records.find(r => r.type === "pcb_board")!
  const summary = { conductiveObjects: objects.length, counts: Object.fromEntries([...conductiveTypes].map(t => [t, objects.filter(o => o.type === t).length])), unresolvedMemberships: objects.filter(o => o.membership.status !== "resolved_logical_component").map(o => o.id), unknownPhysicalConductors: objects.length,
    physicalPlaneGroups, viaPourContactCounts: Object.fromEntries([...new Set(viaPourContacts.map(c => c.status))].map(s => [s, viaPourContacts.filter(c => c.status === s).length])), boardDeclaredThicknessMm: board.thickness, stackLayerSumMm: stack.layers.reduce((s: number, l: any) => s + l.thickness, 0) }
  if (fingerprint(records) !== before) throw Error("Native source records changed")
  return { schema: "am3352-context-coverage-v1", physicalRecordsSha256: before, status: "inventory_complete_solver_coverage_incomplete", sourceCoordinatesUnchanged: true, inclusionCriterion: "Retain all native conductive objects and source boundaries; proximity does not join conductors or justify exclusions", electricalMembershipMeaning: "Source net/trace/internal-connection evidence identifies intended logical nets only; it does not prove PCB copper continuity or model package impedance", stackup: { nativeRecord: stack, fabricationVerified: false, declaredPlatingMm, platingFabricationVerified: false },
    summary, objects, boundaries, viaPourContacts, nonconductiveBoundaries: records.filter(r => r.type === "pcb_hole").map(r => ({ id: nativeId(r), nativeSha256: fingerprint(r), representation: "not_in_current_homogeneous_dielectric_model" })),
    blockers: ["All copper is catalogued, but physical conductor islands and pad/trace/barrel contacts are not completely qualified", "This inventory does not implement a qualified native solver exporter", "Logical net labels must not weld physically disconnected copper", "Slotted plated holes and full via/land spans need explicit geometry handling", "Layered dielectrics, fabrication stackup and plating remain unverified; current homogeneous epsilon is an assumption"], acceptedBoardRlc: false, acceptedEye: false }
}

export function exportContext(records: NativeRecord[], coverage: ReturnType<typeof buildCoverage>) {
  if (fingerprint(records) !== coverage.physicalRecordsSha256) throw Error("Physical input hash mismatch")
  const selected = records.filter(r => conductiveTypes.has(r.type))
  if (selected.length !== coverage.objects.length) throw Error("Native object coverage incomplete")
  const byId = new Map(selected.map(r => [nativeId(r), r]))
  for (const object of coverage.objects) if (!byId.has(object.id) || fingerprint(byId.get(object.id)) !== object.nativeSha256) throw Error(`Missing or changed native object: ${object.id}`)
  return { format: "native-copper-context-intermediate-v1", solverReady: false, physicalRecordsSha256: coverage.physicalRecordsSha256,
    warning: "Lossless native-object intermediate; not a solver deck and not a set of equipotential net conductors", objects: selected, boundaries: records.filter(r => ["pcb_board", "pcb_stackup", "pcb_hole"].includes(r.type)), coverageObjectIds: coverage.objects.map(o => o.id) }
}

export function requireQualifiedCoverage(_coverage: unknown): never {
  throw Error("Board solver blocked: physical copper coverage and conductor connectivity are not qualified; this diagnostic workflow has no qualified board exporter")
}
