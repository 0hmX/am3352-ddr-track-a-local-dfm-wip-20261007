import { test, expect } from "bun:test"
import { mkdtemp, writeFile, readFile, readdir } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { segmentDistance, selectNeighbors, type Segment } from "./neighbors"
import { sha256, writeJson, matrixResidual } from "./shared"
import { requestFingerprint, verifiedCache, createSolver } from "./solver-cache"

test("interior crossings are retained even when endpoint distances are large", () => {
  const first: Segment = { start: [-10, 0, 0], end: [10, 0, 0], widthMm: .1 }
  const second: Segment = { start: [0, -10, .2], end: [0, 10, .2], widthMm: .1 }
  expect(segmentDistance(first, second)).toBeCloseTo(.2, 12)
  expect(selectNeighbors({ nets: [{ name: "victim", segments: [first] }, { name: "aggressor", segments: [second] }], seeds: ["victim"], radiusMm: .2 }).map(net => net.name)).toEqual(["victim", "aggressor"])
})

test("expanded neighborhoods retain full route objects and do not drop neighbors", () => {
  const nets = [0, .5, 1.1].map((y, index) => ({ name: `net${index}`, segments: [{ start: [0, y, 0] as [number, number, number], end: [10, y, 0] as [number, number, number], widthMm: .1 }] }))
  const narrow = selectNeighbors({ nets, seeds: ["net0"], radiusMm: .5 })
  const wide = selectNeighbors({ nets, seeds: ["net0"], radiusMm: 1 })
  expect(narrow).toHaveLength(2)
  expect(wide).toHaveLength(3)
  expect(wide[0]).toBe(nets[0])
  expect(() => selectNeighbors({ nets, seeds: ["missing"], radiusMm: 1 })).toThrow()
})

test("checkpoint identity changes with geometry, binary and tolerances", () => {
  const request = { solver: "fastercap" as const, files: { "channel.lst": "physical copper" }, args: ["-a0.01"], outputFiles: [] }
  const identity = { binaryHash: "binary", wrapperHash: "wrapper" }
  const original = requestFingerprint(request, identity)
  expect(requestFingerprint({ ...request, args: ["-a0.02"] }, identity)).not.toBe(original)
  expect(requestFingerprint(request, { ...identity, binaryHash: "other" })).not.toBe(original)
  expect(requestFingerprint({ ...request, files: { "channel.lst": "changed copper" } }, identity)).not.toBe(original)
})

test("resume rejects tampered or failed native outputs", async () => {
  const directory = await mkdtemp(join(tmpdir(), "sim-cache-test-"))
  await writeJson(join(directory, "request.json"), { outputFiles: [] })
  await writeFile(join(directory, "stdout.log"), "original")
  await writeFile(join(directory, "stderr.log"), "")
  const receipt = { status: "completed", exitCode: 0, fingerprint: "match", requestHash: sha256(JSON.stringify({ outputFiles: [] })), hashes: { "stdout.log": sha256("original"), "stderr.log": sha256("") } }
  await writeJson(join(directory, "terminal.json"), receipt)
  expect((await verifiedCache(directory, "match"))?.stdout).toBe("original")
  await writeFile(join(directory, "stdout.log"), "tampered")
  expect(await verifiedCache(directory, "match")).toBeUndefined()
  await writeJson(join(directory, "terminal.json"), receipt)
  await writeJson(join(directory, "request.json"), { outputFiles: ["unverified.txt"] })
  expect(await verifiedCache(directory, "match")).toBeUndefined()
  await writeFile(join(directory, "stdout.log"), "original")
  await writeJson(join(directory, "terminal.json"), { ...receipt, exitCode: 1 })
  expect(await verifiedCache(directory, "match")).toBeUndefined()
})

test("convergence comparison rejects nonfinite or mismatched matrices", () => {
  expect(matrixResidual([[1]], [[1.01]])).toBeCloseTo(.01 / 1.01)
  expect(() => matrixResidual([[0]], [[0]])).toThrow()
  expect(() => matrixResidual([[1]], [[1, 2]])).toThrow()
})

if (process.env.RUN_RESOURCE_TESTS === "1") test("native assertions terminate only the spawned process group and reject the run", async () => {
  const directory = await mkdtemp(join(tmpdir(), "sim-native-stop-test-"))
  const executable = join(directory, "asserting-fixture.sh")
  await writeFile(executable, '#!/bin/sh\nprintf \'solver.cpp: assert "finite" failed in Solve().\\n\' >&2\nsleep 10\n', { mode: 0o700 })
  const solver = createSolver({ root: directory, binaries: { fastercap: executable, fasthenry: executable, ngspice: executable }, fingerprint: "assertion-process-test", timeoutSeconds: 15 })
  const start = Date.now()
  await expect(solver({ solver: "fastercap", args: [], files: {}, outputFiles: [] })).rejects.toThrow("Native assertion")
  expect(Date.now() - start).toBeLessThan(5000)
}, 20000)

if (process.env.RUN_RESOURCE_TESTS === "1") test("concurrent requests execute sequentially, resume avoids execution, and timeout is terminal", async () => {
  const directory = await mkdtemp(join(tmpdir(), "sim-sequential-test-")), executable = join(directory, "fixture.sh")
  await writeFile(executable, '#!/bin/sh\nif [ "$1" = hang ]; then sleep 10; exit 0; fi\nif ! mkdir active 2>/dev/null; then exit 71; fi\nsleep 0.2\nrmdir active\nprintf "completed %s\\n" "$1"\n', { mode: 0o700 })
  const solver = createSolver({ root: directory, binaries: { fastercap: executable, fasthenry: executable, ngspice: executable }, fingerprint: "sequential-test", timeoutSeconds: 1 })
  const request = (arg: string) => ({ solver: "fastercap" as const, args: [arg], files: {}, outputFiles: [] })
  const results = await Promise.all([solver(request("a")), solver(request("b"))])
  expect(results.map(r => r.stdout.trim())).toEqual(["completed a", "completed b"])
  const before = await readdir(join(directory, "native-runs"))
  expect((await solver(request("a"))).stdout).toBe(results[0].stdout)
  expect(await readdir(join(directory, "native-runs"))).toEqual(before)
  for (const key of before) expect((await readdir(join(directory,"native-runs",key))).filter(n=>n.startsWith("attempt-"))).toHaveLength(1)
  await expect(solver(request("hang"))).rejects.toThrow("stopped")
  const terminals = []
  for (const key of await readdir(join(directory,"native-runs"))) terminals.push(JSON.parse(await readFile(join(directory,"native-runs",key,"attempt-001","terminal.json"),"utf8")))
  expect(terminals.filter(t=>t.status==="failed")).toHaveLength(1)
  expect(terminals.find(t=>t.status==="failed").exitCode).toBe(124)
}, 15000)
