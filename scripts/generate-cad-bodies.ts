/**
 * Generates simple dimensioned GLB bodies for parts with no KiCad 3D model.
 * Geometry is footprint-local mm, +Z out of the board, origin = footprint origin.
 * Run: bun scripts/generate-cad-bodies.ts
 */
type Box = { min: [number, number, number]; max: [number, number, number]; color: [number, number, number, number]; metallic?: number; roughness?: number }

function glb(boxes: Box[]): Uint8Array {
  const materials: any[] = [], meshes: any[] = [], nodes: any[] = [], accessors: any[] = [], bufferViews: any[] = []
  const chunks: Uint8Array[] = []
  let offset = 0
  const push = (bytes: Uint8Array, target: number) => {
    bufferViews.push({ buffer: 0, byteOffset: offset, byteLength: bytes.byteLength, target })
    chunks.push(bytes); offset += bytes.byteLength
    const pad = (4 - (offset % 4)) % 4
    if (pad) { chunks.push(new Uint8Array(pad)); offset += pad }
    return bufferViews.length - 1
  }
  // 6 faces x 4 verts so each face gets a flat normal
  const faces: [number[], number[]][] = [
    [[0, 0, 1], [0, 1, 3, 2]], [[0, 0, -1], [4, 6, 7, 5]], [[1, 0, 0], [1, 5, 7, 3]],
    [[-1, 0, 0], [0, 2, 6, 4]], [[0, 1, 0], [2, 3, 7, 6]], [[0, -1, 0], [0, 4, 5, 1]],
  ]
  boxes.forEach((b, i) => {
    const corner = (k: number) => [k & 1 ? b.max[0] : b.min[0], k & 2 ? b.max[1] : b.min[1], k & 4 ? b.min[2] : b.max[2]]
    const pos: number[] = [], nrm: number[] = [], idx: number[] = []
    for (const [n, quad] of faces) {
      const base = pos.length / 3
      for (const k of quad) { pos.push(...corner(k)); nrm.push(...n) }
      const [a, bb, c, d] = [base, base + 1, base + 2, base + 3]
      // wind CCW as seen from outside along n
      const p = (j: number) => pos.slice(j * 3, j * 3 + 3)
      const e1 = p(bb).map((v, q) => v - p(a)[q]), e2 = p(c).map((v, q) => v - p(a)[q])
      const cross = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]]
      const ok = cross[0] * n[0] + cross[1] * n[1] + cross[2] * n[2] > 0
      idx.push(...(ok ? [a, bb, c, a, c, d] : [a, c, bb, a, d, c]))
    }
    const posView = push(new Uint8Array(new Float32Array(pos).buffer), 34962)
    const nrmView = push(new Uint8Array(new Float32Array(nrm).buffer), 34962)
    const idxView = push(new Uint8Array(new Uint16Array(idx).buffer), 34963)
    accessors.push({ bufferView: posView, componentType: 5126, count: pos.length / 3, type: "VEC3", min: [b.min[0], b.min[1], b.min[2]], max: [b.max[0], b.max[1], b.max[2]] })
    accessors.push({ bufferView: nrmView, componentType: 5126, count: nrm.length / 3, type: "VEC3" })
    accessors.push({ bufferView: idxView, componentType: 5123, count: idx.length, type: "SCALAR" })
    materials.push({ pbrMetallicRoughness: { baseColorFactor: b.color, metallicFactor: b.metallic ?? 0, roughnessFactor: b.roughness ?? 0.6 } })
    meshes.push({ primitives: [{ attributes: { POSITION: i * 3, NORMAL: i * 3 + 1 }, indices: i * 3 + 2, material: i }] })
    nodes.push({ mesh: i })
  })
  const bin = new Uint8Array(offset); let o = 0
  for (const c of chunks) { bin.set(c, o); o += c.byteLength }
  const json = { asset: { version: "2.0", generator: "am3352 generate-cad-bodies" }, scene: 0, scenes: [{ nodes: nodes.map((_, i) => i) }], nodes, meshes, materials, accessors, bufferViews, buffers: [{ byteLength: bin.byteLength }] }
  let jsonBytes = new TextEncoder().encode(JSON.stringify(json))
  const jpad = (4 - (jsonBytes.byteLength % 4)) % 4
  jsonBytes = new Uint8Array([...jsonBytes, ...new Array(jpad).fill(0x20)])
  const total = 12 + 8 + jsonBytes.byteLength + 8 + bin.byteLength
  const out = new Uint8Array(total), dv = new DataView(out.buffer)
  dv.setUint32(0, 0x46546c67, true); dv.setUint32(4, 2, true); dv.setUint32(8, total, true)
  dv.setUint32(12, jsonBytes.byteLength, true); dv.setUint32(16, 0x4e4f534a, true); out.set(jsonBytes, 20)
  const b0 = 20 + jsonBytes.byteLength
  dv.setUint32(b0, bin.byteLength, true); dv.setUint32(b0 + 4, 0x004e4942, true); out.set(bin, b0 + 8)
  return out
}

const shield: Box["color"] = [0.78, 0.79, 0.8, 1], black: Box["color"] = [0.08, 0.08, 0.09, 1]
const amber: Box["color"] = [1, 0.62, 0.1, 1], green: Box["color"] = [0.15, 0.85, 0.3, 1], marker: Box["color"] = [0.75, 0.75, 0.75, 1]

// Wurth 7499010121A horizontal RJ45 (WE-RJ45 LAN, 10/100, LEDs). KiCad F.Fab body:
// x -5.61..19.69, y -12.545..3.655 (y-up). Port faces +X (board edge). Height 13.65mm per WE drawing.
const rj45: Box[] = [
  { min: [-5.61, -12.545, 0], max: [19.69, 3.655, 13.65], color: shield, metallic: 0.85, roughness: 0.35 },
  { min: [19.69, -10.3, 1.6], max: [19.75, 1.41, 9.8], color: black },        // 8P8C port opening
  { min: [19.69, -11.9, 10.6], max: [19.76, -9.6, 12.2], color: green },      // left LED window
  { min: [19.69, 0.71, 10.6], max: [19.76, 3.01, 12.2], color: amber },       // right LED window
]

// TI RSV0016A UQFN-16, 1.8 x 2.6 x 0.55mm max, pin 1 at upper-left (footprint pin1 = -0.75, 0.6).
const rsv: Box[] = [
  { min: [-0.9, -1.3, 0], max: [0.9, 1.3, 0.55], color: black, roughness: 0.8 },
  { min: [-0.7, 0.95, 0.55], max: [-0.5, 1.15, 0.56], color: marker },
]

const dir = new URL("../models/generated/", import.meta.url).pathname
await Bun.write(dir + "RJ45_Wuerth_7499010121A_Horizontal.glb", glb(rj45))
await Bun.write(dir + "Texas_RSV0016A_UQFN-16_1.8x2.6mm_P0.4mm.glb", glb(rsv))
console.log("wrote", dir)
