// Grid A* router over the built board's copper (8-layer aware: same-net union-find, via spans,
// drill spacing, pours as keepouts, 45-degree turn costs). Emits a plain TSX routes component.
// usage: bun scripts/route-usb-c-ports.ts dist/assembly/circuit.json scripts/usb-c-ports.route.json layout/UsbCPortRoutes.tsx
// Build the board with the previous UsbCPortRoutes.tsx in place; its own copper is ignored.
type Pt = { x: number; y: number }
const [cjPath, specPath, outPath] = process.argv.slice(2)
const cj: any[] = await Bun.file(cjPath).json()
const spec = await Bun.file(specPath).json()
const ALL = ["top", "inner1", "inner2", "inner3", "inner4", "inner5", "inner6", "bottom"]
const RL: string[] = spec.layers // routing layers
const [X0, X1, Y0, Y1] = spec.bbox
const R = spec.res ?? 0.05
const W = Math.round((X1 - X0) / R) + 1, H = Math.round((Y1 - Y0) / R) + 1
const CLR = spec.clearance ?? 0.12
const VIA_R = 0.15, VIA_HOLE_R = 0.075, VIA_CLR = spec.viaClearance ?? 0.13


// ---------- net connectivity (union-find over source_trace ports+nets, same-name nets) ----------
const parent = new Map<string, string>()
const find = (a: string): string => { let p = parent.get(a) ?? a; if (p === a) return a; p = find(p); parent.set(a, p); return p }
const union = (a: string, b: string) => { const x = find(a), y = find(b); if (x !== y) parent.set(x, y) }
const netByName = new Map<string, string>()
for (const n of cj.filter(e => e.type === "source_net")) { const k = "net:" + n.name; if (netByName.has(n.name)) union(n.source_net_id, netByName.get(n.name)!); else netByName.set(n.name, n.source_net_id) }
for (const st of cj.filter(e => e.type === "source_trace")) { const ids = [...(st.connected_source_port_ids ?? []), ...(st.connected_source_net_ids ?? [])]; ids.push(st.source_trace_id); for (const id of ids.slice(1)) union(ids[0], id) }
const pcbPortToSrc = new Map(cj.filter(e => e.type === "pcb_port").map(e => [e.pcb_port_id, e.source_port_id]))
// a via's per-layer ports are one conductor: join them with the via's own source trace
for (const v of cj.filter(e => e.type === "pcb_via")) { const ids = (v.pcb_port_ids ?? []).map((p: string) => pcbPortToSrc.get(p)).filter(Boolean); if (v.source_trace_id) ids.push(v.source_trace_id); for (const id of ids.slice(1)) union(ids[0], id) }
const grpOf = (e: any): string | undefined => {
  if (e.source_trace_id) return find(e.source_trace_id)
  if (e.pcb_port_id && pcbPortToSrc.get(e.pcb_port_id)) return find(pcbPortToSrc.get(e.pcb_port_id)!)
  return undefined
}
const netGrp = (name: string) => netByName.has(name) ? find(netByName.get(name)!) : "none:" + name

// ---------- ignore copper produced by an earlier run of this spec ----------
const ownPrefixes: string[] = spec.routes.map((r: any) => r.name)
const srcTrace = new Map(cj.filter(e => e.type === "source_trace").map(e => [e.source_trace_id, e]))
let prevVias: any[] = []
try { const prev = await Bun.file(spec.previousOutput).text(); prevVias = JSON.parse(prev.match(/const vias = (\[.*\])\n/)![1]) } catch {}
const isPrevVia = (v: any) => prevVias.some(p => Math.abs(p.x - v.x) < 1e-3 && Math.abs(p.y - v.y) < 1e-3)
const isOwnOutput = (e: any) => { if (e.type === "pcb_via" && isPrevVia(e)) return true; const st = srcTrace.get(e.source_trace_id); const n = (st?.name ?? "") + " " + (st?.display_name ?? ""); return ownPrefixes.some(p => n.includes(p)) }
// ---------- obstacle primitives ----------
type Ob = { kind: "seg"; a: Pt; b: Pt; r: number; layers: string[]; tag?: string } | { kind: "rect"; c: Pt; w: number; h: number; rot: number; layers: string[]; tag?: string } | { kind: "circ"; c: Pt; r: number; layers: string[]; tag?: string } | { kind: "poly"; pts: Pt[]; layers: string[] }
const obs: Ob[] = []
const src = new Map(cj.filter(e => e.type === "source_component").map(e => [e.source_component_id, e.name]))
const pcbComp = new Map(cj.filter(e => e.type === "pcb_component").map(e => [e.pcb_component_id, e]))
const tagOf = (e: any) => `${src.get(pcbComp.get(e.pcb_component_id)?.source_component_id) ?? "?"}`
for (const t of cj.filter(e => e.type === "pcb_trace" && !isOwnOutput(e))) {
  const r = t.route
  for (let k = 1; k < r.length; k++) {
    const a = r[k - 1], b = r[k]
    if (a.route_type !== "wire" || b.route_type !== "wire" || a.layer !== b.layer) continue
    obs.push({ kind: "seg", a, b, r: (a.width ?? 0.1) / 2, layers: [a.layer], grp: grpOf(t) } as any)
  }
}
for (const v of cj.filter(e => e.type === "pcb_via" && !isOwnOutput(e))) {
  const ls = v.layers ?? ALL.slice(ALL.indexOf(v.from_layer), ALL.indexOf(v.to_layer) + 1)
  // board rule minTraceToHoleEdgeClearance 0.2: keep traces 0.2 - 0.1 (smallest route clearance) off the drill
  obs.push({ kind: "circ", c: v, r: Math.max(v.outer_diameter / 2, (v.hole_diameter ?? 0.15) / 2 + 0.1), layers: ls, grp: grpOf(v) } as any)
}
for (const p of cj.filter(e => e.type === "pcb_smtpad")) {
  const tag = tagOf(p) + "@" + p.x?.toFixed?.(3) + "," + p.y?.toFixed?.(3)
  const grp = grpOf(p)
  if (p.shape === "circle") obs.push({ kind: "circ", c: p, r: p.radius, layers: [p.layer], tag, grp } as any)
  else if (p.shape === "polygon") obs.push({ kind: "poly", pts: p.points, layers: [p.layer], grp } as any)
  else obs.push({ kind: "rect", c: p, w: p.width, h: p.height, rot: p.ccw_rotation ?? p.rotation ?? 0, layers: [p.layer], tag, grp } as any)
}
for (const p of cj.filter(e => e.type === "pcb_plated_hole")) {
  const tag = tagOf(p) + "@" + p.x.toFixed(3) + "," + p.y.toFixed(3)
  const r = p.outer_diameter ? p.outer_diameter / 2 : Math.max(p.outer_width ?? 0, p.outer_height ?? 0) / 2
  obs.push({ kind: "circ", c: p, r, layers: ALL, tag, grp: grpOf(p) } as any)
}
for (const h of cj.filter(e => e.type === "pcb_hole")) obs.push({ kind: "circ", c: h, r: (h.hole_diameter ?? h.hole_width ?? 1) / 2 + 0.1, layers: ALL })
// copper pours on routing layers are treated as keepouts (inner GND/V3V3 planes re-pour around new copper)
for (const p of cj.filter(e => e.type === "pcb_copper_pour" && RL.includes(e.layer))) {
  const v = p.brep_shape?.outer_ring?.vertices
  if (v?.length) obs.push({ kind: "poly", pts: v, layers: [p.layer] })
}

// ---------- rasterize distance-inflated blocked maps ----------
const idx = (i: number, j: number) => j * W + i
const toI = (x: number) => Math.round((x - X0) / R), toJ = (y: number) => Math.round((y - Y0) / R)
const cx = (i: number) => X0 + i * R, cy = (j: number) => Y0 + j * R
function distTo(o: Ob, x: number, y: number): number {
  if (o.kind === "circ") return Math.hypot(x - o.c.x, y - o.c.y) - o.r
  if (o.kind === "seg") {
    const dx = o.b.x - o.a.x, dy = o.b.y - o.a.y, L2 = dx * dx + dy * dy
    const t = L2 ? Math.max(0, Math.min(1, ((x - o.a.x) * dx + (y - o.a.y) * dy) / L2)) : 0
    return Math.hypot(x - (o.a.x + t * dx), y - (o.a.y + t * dy)) - o.r
  }
  if (o.kind === "rect") {
    const a = -(o.rot * Math.PI) / 180, px = x - o.c.x, py = y - o.c.y
    const lx = px * Math.cos(a) - py * Math.sin(a), ly = px * Math.sin(a) + py * Math.cos(a)
    const qx = Math.abs(lx) - o.w / 2, qy = Math.abs(ly) - o.h / 2
    return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0)
  }
  // polygon: inside => negative
  let inside = false, d = Infinity
  const P = o.pts
  for (let k = 0, m = P.length - 1; k < P.length; m = k++) {
    const a = P[m], b = P[k]
    if ((a.y > y) !== (b.y > y) && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) inside = !inside
    d = Math.min(d, distTo({ kind: "seg", a, b, r: 0, layers: [] }, x, y))
  }
  return inside ? -d : d
}
function bbox(o: Ob) {
  if (o.kind === "circ") return [o.c.x - o.r, o.c.y - o.r, o.c.x + o.r, o.c.y + o.r]
  if (o.kind === "seg") return [Math.min(o.a.x, o.b.x) - o.r, Math.min(o.a.y, o.b.y) - o.r, Math.max(o.a.x, o.b.x) + o.r, Math.max(o.a.y, o.b.y) + o.r]
  if (o.kind === "rect") { const e = Math.hypot(o.w, o.h) / 2; return [o.c.x - e, o.c.y - e, o.c.x + e, o.c.y + e] }
  const xs = o.pts.map(p => p.x), ys = o.pts.map(p => p.y); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]
}
// per layer: min clearance distance field (capped) -> Float32
const CAP = 1.0
const field: Record<string, Float32Array> = {}
for (const L of ALL) field[L] = new Float32Array(W * H).fill(CAP)
const excluded = new Set<string>()
function stamp(o: Ob, fieldsOverride?: Record<string, Float32Array>) {
  const b = bbox(o)
  const i0 = Math.max(0, toI(b[0] - CAP)), i1 = Math.min(W - 1, toI(b[2] + CAP))
  const j0 = Math.max(0, toJ(b[1] - CAP)), j1 = Math.min(H - 1, toJ(b[3] + CAP))
  if (i0 > i1 || j0 > j1) return
  for (const L of o.layers) {
    const f = (fieldsOverride ?? field)[L]; if (!f) continue
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
      const d = distTo(o, cx(i), cy(j)); const k = idx(i, j)
      if (d < f[k]) f[k] = d
    }
  }
}
// endpoints pads are excluded from obstacles (matched by tag) -- applied per route via a temp field
const inBB = (o: Ob) => { const b = bbox(o); return b[2] > X0 - CAP && b[0] < X1 + CAP && b[3] > Y0 - CAP && b[1] < Y1 + CAP }
const pads = obs.filter(o => (o as any).tag && inBB(o))
const nonPad = obs.filter(o => !(o as any).tag && inBB(o))
// 1mm spatial buckets for pads
const bucket = new Map<string, Ob[]>()
for (const o of pads) { const b = bbox(o); for (let x = Math.floor(b[0] - 1); x <= Math.floor(b[2] + 1); x++) for (let y = Math.floor(b[1] - 1); y <= Math.floor(b[3] + 1); y++) { const k = x + "," + y; (bucket.get(k) ?? bucket.set(k, []).get(k)!).push(o) } }
for (const o of nonPad) if (!(o as any).grp) stamp(o)
// net-blind drill spacing per layer: every via / plated hole / hole, any net
const drill: Record<string, Float32Array> = {}
for (const L of ALL) drill[L] = new Float32Array(W * H).fill(CAP)
for (const o of obs) if (o.kind === "circ" && o.layers.length > 1 && inBB(o)) stamp(o, drill)
// same-net-aware field: stamp everything except the routed net's own copper (cached per net group)
const fieldCache = new Map<string, Record<string, Float32Array>>()
function fieldFor(grp: string) {
  let f = fieldCache.get(grp); if (f) return f
  f = {}; for (const L of ALL) f[L] = field[L].slice()
  for (const o of [...nonPad, ...pads]) if ((o as any).grp && (o as any).grp !== grp) stamp(o, f)
  fieldCache.set(grp, f); return f
}
const padField: Record<string, Float32Array> = {}
for (const L of ALL) padField[L] = new Float32Array(W * H).fill(CAP)
// stamp pads individually into their own map so we can "un-stamp" an endpoint by recomputing locally
for (const o of pads) if (!(o as any).grp) stamp(o, padField)
// board edge
const outline = cj.find(e => e.type === "pcb_board")
const bx0 = outline.center.x - outline.width / 2, bx1 = outline.center.x + outline.width / 2
const by0 = outline.center.y - outline.height / 2, by1 = outline.center.y + outline.height / 2
const EDGE = 0.4

function padAt(comp: string, x: number, y: number) {
  return pads.filter(o => (o as any).tag.startsWith(comp + "@") && Math.hypot((o as any).c.x - x, (o as any).c.y - y) < 0.05)
}

// ---------- routing ----------
type Ep = { comp: string; port: string; x: number; y: number; layers: string[] }
function findPort(comp: string, port: string): Ep {
  const sc = cj.find(e => e.type === "source_component" && e.name === comp)
  if (!sc) throw new Error("no comp " + comp)
  const sps = cj.filter(e => e.type === "source_port" && e.source_component_id === sc.source_component_id)
  const sp = sps.find(p => p.name === port || p.port_hints?.includes(port))
  if (!sp) throw new Error(`no port ${comp}.${port}: ` + sps.map(p => p.name).join(","))
  const pp = cj.find(e => e.type === "pcb_port" && e.source_port_id === sp.source_port_id)
  return { comp, port, x: pp.x, y: pp.y, layers: pp.layers ?? ["top"] }
}

const extraObs: Ob[] = [] // committed new routes
const out: { traces: any[]; vias: any[] } = { traces: [], vias: [] }

function route(r: any) {
  const w = r.width ?? 0.12
  const from: Ep = findPort(r.from[0], r.from[1])
  const to: Ep | null = r.to ? findPort(r.to[0], r.to[1]) : null
  const fromPads = padAt(r.from[0], from.x, from.y)
  const toPads = to ? padAt(r.to[0], to.x, to.y) : []
  const own = new Set([...fromPads, ...toPads, ...(r.alsoFree ?? []).flatMap((s: any) => { const e = findPort(s[0], s[1]); return padAt(s[0], e.x, e.y) })])
  // local pad field without own pads
  const nl = RL.length
  const F = fieldFor(netGrp(r.net))
  const okLayer = (L: string, i: number, j: number, need: number) => {
    const k = idx(i, j)
    if (F[L][k] < need) return false
    // ungrouped pads (no net) stay obstacles unless they are this route's own endpoints
    if (padField[L][k] < need) {
      const x = cx(i), y = cy(j)
      for (const o of bucket.get(Math.floor(x) + "," + Math.floor(y)) ?? []) if (!(o as any).grp && !own.has(o) && o.layers.includes(L) && distTo(o, x, y) < need) return false
    }
    for (const o of extraObs) if ((o as any).net !== r.net && o.layers.includes(L) && distTo(o, cx(i), cy(j)) < need) return false
    return true
  }
  const edgeOk = (i: number, j: number, m: number) => { const x = cx(i), y = cy(j); return x > bx0 + m && x < bx1 - m && y > by0 + m && y < by1 - m }
  const tNeed = (r.clearance ?? CLR) + w / 2
  const allowL = RL.map(L => !r.layers || r.layers.includes(L))
  const memo = new Map<number, boolean>()
  const passable = (l: number, i: number, j: number) => {
    const key = (l * H + j) * W + i
    let v = memo.get(key); if (v !== undefined) return v
    v = allowL[l] && edgeOk(i, j, EDGE + w / 2) && okLayer(RL[l], i, j, tNeed); memo.set(key, v); return v
  }
  const vmemo = new Map<number, boolean>()
  const spanOf = (la: string, lb: string) => { const x = ALL.indexOf(la), y = ALL.indexOf(lb); return ALL.slice(Math.min(x, y), Math.max(x, y) + 1) }
  const viaOkSpan = (i: number, j: number, span: string[], key: number) => {
    const mk = key * W * H + j * W + i; let v = vmemo.get(mk); if (v !== undefined) return v
    v = edgeOk(i, j, EDGE + VIA_R)
    // via-to-via spacing against this run's vias of any net (board rule: 0.1mm drill edge to drill edge, use 0.1 pad gap)
    if (v) for (const o of extraObs) if (o.kind === "circ" && Math.hypot(cx(i) - o.c.x, cy(j) - o.c.y) < 2 * VIA_R + 0.1) { v = false; break }
    if (v) for (const L of span) if (drill[L][idx(i, j)] < VIA_R + 0.15 || !okLayer(L, i, j, VIA_R + VIA_CLR)) { v = false; break }
    vmemo.set(mk, v); return v
  }
  const viaOk = (i: number, j: number) => viaOkSpan(i, j, ALL, 99) // through via (plane drops, feeds)
  const viaOkBetween = (i: number, j: number, l1: number, l2: number) => viaOkSpan(i, j, spanOf(RL[l1], RL[l2]), l1 * 8 + l2)
  const si = toI(from.x), sj = toJ(from.y)
  const startLayers = from.layers.filter(L => RL.includes(L)).map(L => RL.indexOf(L))
  // goal
  const gi = to ? toI(to.x) : -1, gj = to ? toJ(to.y) : -1
  const goalLayers = to ? new Set((r.toLayers ?? to.layers).filter((L: string) => RL.includes(L)).map((L: string) => RL.indexOf(L))) : null
  const tp: number[][] = r.toPoints ?? []
  const tpSet = new Set(tp.map(([x, y]) => idx(toI(x), toJ(y))))
  const viaGoal = !to // drop to plane via (or onto one of toPoints)
  const VIA_COST = r.viaCost ?? spec.viaCost ?? 40
  // state = cell*9 + heading (0..7 = arrival direction, 8 = none / just changed layer)
  const D = 9, CELLS = W * H
  const N = CELLS * nl * D
  const g = new Float32Array(N).fill(Infinity)
  const par = new Int32Array(N).fill(-1)
  const heap: number[] = [], hf: number[] = []
  const push = (s: number, f: number) => { heap.push(s); hf.push(f); let c = heap.length - 1; while (c > 0) { const p = (c - 1) >> 1; if (hf[p] <= hf[c]) break; [heap[p], heap[c]] = [heap[c], heap[p]];[hf[p], hf[c]] = [hf[c], hf[p]]; c = p } }
  let popF = 0
  const pop = () => { const top = heap[0]; popF = hf[0]; const ls = heap.pop()!, lf = hf.pop()!; if (heap.length) { heap[0] = ls; hf[0] = lf; let c = 0; for (; ;) { const l = 2 * c + 1, rr = l + 1; let m = c; if (l < heap.length && hf[l] < hf[m]) m = l; if (rr < heap.length && hf[rr] < hf[m]) m = rr; if (m === c) break;[heap[m], heap[c]] = [heap[c], heap[m]];[hf[m], hf[c]] = [hf[c], hf[m]]; c = m } } return top }
  const [ta, tb] = tp.length ? [tp[0], tp[tp.length - 1]] : [[0, 0], [0, 0]]
  const segH = (i: number, j: number) => { const x = cx(i), y = cy(j), dx = tb[0] - ta[0], dy = tb[1] - ta[1], L = dx * dx + dy * dy || 1, t = Math.max(0, Math.min(1, ((x - ta[0]) * dx + (y - ta[1]) * dy) / L)); return Math.hypot(x - ta[0] - t * dx, y - ta[1] - t * dy) / R }
  const h = (i: number, j: number) => to ? Math.hypot(i - gi, j - gj) : tp.length ? segH(i, j) : 0
  const enc = (l: number, i: number, j: number, d: number) => ((l * H + j) * W + i) * D + d
  for (const l of startLayers) { const s0 = enc(l, si, sj, 8); g[s0] = 0; push(s0, h(si, sj)) }
  // 8 headings; angle index in 45deg steps for turn cost
  const dirs = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]
  const TURN45 = spec.turn45 ?? 6, TURN90 = spec.turn90 ?? 20 // in grid cells
  let found = -1, iter = 0
  const maxIter = spec.maxIter ?? 6e6
  while (heap.length && iter++ < maxIter) {
    const s = pop(); const d = s % D, cell = (s - d) / D, l = Math.floor(cell / CELLS), rem = cell % CELLS, j = Math.floor(rem / W), i = rem % W
    if (to && i === gi && j === gj && goalLayers!.has(l)) { found = s; break }
    if (viaGoal && (tp.length ? tpSet.has(idx(i, j)) : Math.hypot(i - si, j - sj) * R > (r.minViaDist ?? 0.5)) && viaOk(i, j)) { found = s; break }
    const gs = g[s]
    if (popF - h(i, j) > gs + 1e-3) continue // stale entry
    for (let nd = 0; nd < 8; nd++) {
      let turn = 0
      if (d !== 8) { const t = Math.min((nd - d + 8) % 8, (d - nd + 8) % 8); if (t > 2) continue; turn = t === 1 ? TURN45 : t === 2 ? TURN90 : 0 }
      const [di, dj] = dirs[nd]
      const ni = i + di, nj = j + dj; if (ni < 0 || nj < 0 || ni >= W || nj >= H) continue
      const nearEnd = (Math.hypot(ni - si, nj - sj) * R < 0.35) || (to && Math.hypot(ni - gi, nj - gj) * R < 0.35)
      if (!nearEnd && !passable(l, ni, nj)) continue
      if (nearEnd && !edgeOk(ni, nj, EDGE)) continue
      const ns = enc(l, ni, nj, nd), c = gs + (di && dj ? 1.4142 : 1) * (l === 0 ? (spec.topCost ?? 1) : 1) + turn
      if (c < g[ns]) { g[ns] = c; par[ns] = s; push(ns, c + h(ni, nj)) }
    }
    for (let nl2 = 0; nl2 < nl; nl2++) if (nl2 !== l && allowL[nl2] && viaOkBetween(i, j, l, nl2)) {
      const ns = enc(nl2, i, j, 8), c = gs + VIA_COST
      if (c < g[ns]) { g[ns] = c; par[ns] = s; push(ns, c + h(i, j)) }
    }
  }
  if (found < 0) throw new Error(`route failed: ${r.name} after ${iter} iterations`)
  // reconstruct
  const path: { i: number; j: number; l: number }[] = []
  for (let s = found; s >= 0; s = par[s]) { const cell = Math.floor(s / D), l = Math.floor(cell / CELLS), rem = cell % CELLS; path.push({ l, j: Math.floor(rem / W), i: rem % W }) }
  path.reverse()
  // split per layer
  const legs: { l: number; pts: Pt[] }[] = []
  for (const p of path) {
    const pt = { x: +cx(p.i).toFixed(3), y: +cy(p.j).toFixed(3) }
    const last = legs[legs.length - 1]
    if (!last || last.l !== p.l) legs.push({ l: p.l, pts: [pt] }); else last.pts.push(pt)
  }
  // collapse collinear
  for (const leg of legs) {
    const q = leg.pts; const res = [q[0]]
    for (let k = 1; k < q.length - 1; k++) {
      const a = res[res.length - 1], b = q[k], c = q[k + 1]
      const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x)
      if (Math.abs(cross) > 1e-9) res.push(b)
    }
    if (q.length > 1) res.push(q[q.length - 1]); leg.pts = res
  }
  // snap ends exactly on pads
  legs[0].pts[0] = { x: from.x, y: from.y }
  if (to) legs[legs.length - 1].pts[legs[legs.length - 1].pts.length - 1] = { x: to.x, y: to.y }
  const viaNames: string[] = []
  for (let k = 0; k < legs.length - 1; k++) {
    const p = legs[k].pts[legs[k].pts.length - 1]
    const vn = `${r.name}_V${k}`; viaNames.push(vn)
    const la = RL[legs[k].l], lb = RL[legs[k + 1].l]
    const [fl, tl] = ALL.indexOf(la) < ALL.indexOf(lb) ? [la, lb] : [lb, la]
    out.vias.push({ name: vn, x: p.x, y: p.y, net: r.net, fromLayer: fl, toLayer: tl })
    extraObs.push({ kind: "circ", c: p, r: VIA_HOLE_R + 0.1, layers: ALL, net: r.net } as any)
  }
  if (viaGoal) {
    const lastLeg = legs[legs.length - 1]; const p = lastLeg.pts[lastLeg.pts.length - 1]
    const vn = `${r.name}_VG`; viaNames.push(vn)
    const ll = RL[lastLeg.l]
    out.vias.push({ name: vn, x: p.x, y: p.y, net: r.net, fromLayer: ll === "bottom" ? "top" : ll, toLayer: "bottom" })
    extraObs.push({ kind: "circ", c: p, r: VIA_HOLE_R + 0.1, layers: ALL, net: r.net } as any)
  }
  legs.forEach((leg, k) => {
    for (let m = 1; m < leg.pts.length; m++) extraObs.push({ kind: "seg", a: leg.pts[m - 1], b: leg.pts[m], r: w / 2, layers: [RL[leg.l]], net: r.net } as any)
    if (leg.pts.length < 2) return
    const fromSel = k === 0 ? r.fromSel : `${viaNames[k - 1]}.${RL[leg.l]}`
    const toSel = k === legs.length - 1 ? (viaGoal ? `${viaNames[k]}.${RL[leg.l]}` : r.toSel) : `${viaNames[k]}.${RL[leg.l]}`
    out.traces.push({ name: `${r.name}_${k}`, from: fromSel, to: toSel, width: w, layer: RL[leg.l], points: leg.pts.slice(1, -1) })
  })
  const len = legs.reduce((s, leg) => s + leg.pts.slice(1).reduce((a, p, m) => a + Math.hypot(p.x - leg.pts[m].x, p.y - leg.pts[m].y), 0), 0)
  console.log(`routed ${r.name}: ${legs.map(l => RL[l.l]).join(">")} vias=${viaNames.length} len=${len.toFixed(1)}mm iters=${iter}`)
}

const only = process.env.ONLY
for (const r of spec.routes) if (!only || r.name.includes(only)) route(r)

const fmt = (v: any) => JSON.stringify(v)
const tsx = `/**
 * USB-C port routes (PD sink on J_POWER, USB0 programming port J_USB_PROG). Generated by
 * scripts/route-usb-c-ports.ts from scripts/usb-c-ports.route.json over the built board's
 * copper, then committed as plain TSX. Regenerate rather than hand-edit point lists.
 */
const traces = ${fmt(out.traces)}
const vias = ${fmt(out.vias)}
export function UsbCPortRoutes() {
  return <group name="UsbCPortRoutes" pcbRelative>
    {vias.map(v => <via key={v.name} name={v.name} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer} toLayer={v.toLayer} holeDiameter={0.15} outerDiameter={0.3} connectsTo={\`net.\${v.net}\`} />)}
    {traces.map(t => <trace key={t.name} name={t.name} from={t.from} to={t.to} width={t.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[t.from, ...t.points, t.to]]} />)}
  </group>
}
`
await Bun.write(outPath, tsx)
console.log("wrote", outPath, out.traces.length, "traces", out.vias.length, "vias")
