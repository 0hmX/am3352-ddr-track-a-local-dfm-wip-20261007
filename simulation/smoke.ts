import { sha256, matrixResidual, writeJson } from "./shared"
import type { RunSolver } from "./types"
type Point = [number, number, number]
const norm = (p: number[]) => Math.hypot(...p)
const midpoint = (a: Point, b: Point): Point => { const p = a.map((v, i) => (v + b[i]) / 2); return p.map(v => v / norm(p)) as Point }
export function sphereFixture(level: number) {
  const phi = (1 + Math.sqrt(5)) / 2
  const points = [[-1,phi,0],[1,phi,0],[-1,-phi,0],[1,-phi,0],[0,-1,phi],[0,1,phi],[0,-1,-phi],[0,1,-phi],[phi,0,-1],[phi,0,1],[-phi,0,-1],[-phi,0,1]].map(p => p.map(v => v/norm(p)) as Point)
  const ids = [[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]]
  let triangles = ids.map(t => t.map(i => points[i]))
  for (let i = 0; i < level; i++) triangles = triangles.flatMap(([a,b,c]) => { const d=midpoint(a,b),e=midpoint(b,c),f=midpoint(c,a); return [[a,d,f],[d,b,e],[f,e,c],[d,e,f]] })
  const files: Record<string, string> = { "channel.lst": "* Nested spherical conductors in vacuum; mm coordinates\nC inner.txt 1 0 0 0\nC outer.txt 1 0 0 0\n" }
  for (const [name, radius] of [["inner", 1], ["outer", 2]] as const) files[`${name}.txt`] = "* Inscribed spherical mesh\n" + triangles.map(t => `T ${name} ${t.flatMap(p => p.map(v => (v*radius).toPrecision(17))).join(" ")}`).join("\n") + "\n"
  const coupled = 4 * Math.PI * 8.8541878128e-12 * .002, outer = 4 * Math.PI * 8.8541878128e-12 * .002
  return { files, panels: 2*triangles.length, analyticFarads: [[coupled,-coupled],[-coupled,coupled+outer]], geometryHash: sha256(JSON.stringify(files)) }
}
export function parseSmoke(stdout: string, panels: number) {
  if (/not converging|failed in|Skipping the panel|degenerate/i.test(stdout)) throw Error("Native diagnostic rejected")
  const counts = [...stdout.matchAll(/Number of panels after refinement:\s*(\d+)/g)]
  if (Number(counts.at(-1)?.[1]) !== panels) throw Error("Fixed panel count changed")
  const match = [...stdout.matchAll(/Capacitance matrix is:\s*\nDimension\s+2\s+x\s+2\s*\n/g)].at(-1)
  if (!match) throw Error("Missing two-conductor capacitance matrix")
  const rows = stdout.slice(match.index! + match[0].length).split(/\r?\n/).slice(0,2).map(r => r.trim().split(/\s+/))
  if (!rows[0][0].endsWith("_inner") || !rows[1][0].endsWith("_outer")) throw Error("Conductor order mismatch")
  const matrix = rows.map(row => row.slice(1).map(v => Number(v)*.001))
  if (matrix.some(row => row.length !== 2 || row.some(v => !Number.isFinite(v)))) throw Error("Invalid matrix")
  const [[a,b],[c,d]] = matrix, reciprocity = Math.abs(b-c)/Math.max(a,d)
  if (!(a>0 && d>0 && b<=0 && c<=0 && a*d-((b+c)/2)**2>0 && reciprocity<=.025)) throw Error("Matrix passivity/reciprocity gate failed")
  return { matrixFarads: matrix, reciprocityResidual: reciprocity }
}
export async function runSmoke(solver: RunSolver, output: string) {
  const runs = []
  for (const level of [2,3]) {
    const fixture = sphereFixture(level), args = ["channel.lst","-b","-m1e32","-d1e-36","-mc1","-t1e-6","-pj","-r","-e","-f0"]
    if (16 * fixture.panels ** 2 > 512 * 1024 ** 2) throw Error("Smoke dense-link estimate exceeds 512 MiB")
    const result = await solver({ solver: "fastercap", files: fixture.files, args, outputFiles: [] })
    if (/assert|failed|degenerate|skipping the panel/i.test(result.stderr)) throw Error("Native stderr diagnostic")
    const parsed = parseSmoke(result.stdout, fixture.panels)
    runs.push({ level, panels: fixture.panels, geometryHash: fixture.geometryHash, args, ...parsed, analyticRelativeError: matrixResidual(parsed.matrixFarads, fixture.analyticFarads) })
  }
  const meshChange = matrixResidual(runs[1].matrixFarads, runs[0].matrixFarads)
  const evidence = { status: runs[1].analyticRelativeError<=.010 && meshChange<=.010 ? "synthetic_smoke_passed" : "rejected", runs, meshChange, analyticTolerance: .010, meshTolerance: .010, scope: "Two-mesh analytic smoke only. One sub-1% step is not full convergence qualification; no board RLC or eye result." }
  await writeJson(`${output}/smoke.json`, evidence)
  if (evidence.status !== "synthetic_smoke_passed") throw Error(`Analytic/mesh smoke gate failed: ${JSON.stringify(evidence)}`)
  return evidence
}
