import { spawn } from "node:child_process"
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises"
import { resolve, join } from "node:path"
import type { SolverRequest, SolverResult, RunSolver } from "./types"
import { sha256, writeJson, readJson } from "./shared"

type ToolName = SolverRequest["solver"]
export type SolverContext = {
  root: string
  binaries: Record<ToolName, string>
  fingerprint: string
  timeoutSeconds: number
  fastercapPreconditioner?: "automatic" | "jacobi"
}
type TerminalReceipt = { status: string; hashes: Record<string, string>; exitCode: number; fingerprint: string; elapsedMs: number; requestHash: string }

export async function availableMemoryBytes() {
  const contents = await readFile("/proc/meminfo", "utf8")
  const match = contents.match(/^MemAvailable:\s+(\d+)\s+kB/m)
  if (!match) throw Error("Unable to verify available RAM")
  return Number(match[1]) * 1024
}

export async function verifyResourceBoundary() {
  const groups = await readFile("/proc/self/cgroup", "utf8")
  const group = groups.match(/^0::(.+)$/m)?.[1]
  if (!group) throw Error("A cgroup-v2 memory boundary is required")
  const limit = Number((await readFile(`/sys/fs/cgroup${group}/memory.max`, "utf8")).trim())
  if (!Number.isFinite(limit) || limit > 5 * 1024 ** 3) throw Error("Run under a task-specific cgroup capped at 5 GiB")
  if (await availableMemoryBytes() < 8 * 1024 ** 3) throw Error("Need at least 8 GiB available before a 5 GiB bounded job")
}

export function requestFingerprint(request: SolverRequest, identity: { binaryHash: string; wrapperHash: string }) {
  return sha256(JSON.stringify({ solver: request.solver, args: request.args, outputFiles: request.outputFiles, files: Object.entries(request.files).sort(([first], [second]) => first.localeCompare(second)), ...identity }))
}

export async function verifiedCache(directory: string, fingerprint: string): Promise<SolverResult | undefined> {
  try {
    const receipt = await readJson<TerminalReceipt>(join(directory, "terminal.json"))
    if (receipt.status !== "completed" || receipt.exitCode !== 0 || receipt.fingerprint !== fingerprint) return
    const saved: Record<string, string> = {}
    for (const [filename, expected] of Object.entries(receipt.hashes)) {
      safeFilename(filename)
      const contents = await readFile(join(directory, filename), "utf8")
      if (sha256(contents) !== expected) return
      saved[filename] = contents
    }
    const request = await readJson<SolverRequest>(join(directory, "request.json"))
    if (sha256(JSON.stringify(request)) !== receipt.requestHash || request.outputFiles.some(name => !(name in saved)) || !("stdout.log" in saved) || !("stderr.log" in saved)) return
    return { stdout: saved["stdout.log"], stderr: saved["stderr.log"], exitCode: 0, files: Object.fromEntries(request.outputFiles.map(filename => [filename, saved[filename]])) }
  } catch { return }
}

function safeFilename(filename: string) {
  if (filename.includes("..") || filename.startsWith("/") || !/^[a-zA-Z0-9_.\/-]+$/.test(filename)) throw Error(`Unsafe solver filename ${filename}`)
}

async function executeRequest(request: SolverRequest, context: SolverContext): Promise<SolverResult> {
  await verifyResourceBoundary()
  if (request.solver === "fastercap" && context.fastercapPreconditioner === "jacobi") {
    request = { ...request, args: [...request.args.filter(argument => argument !== "-ap"), "-pj", "-r"] }
  }
  const binary = context.binaries[request.solver]
  const binaryHash = sha256(await readFile(binary))
  const fingerprint = requestFingerprint(request, { binaryHash, wrapperHash: context.fingerprint })
  const cacheRoot = join(context.root, "native-runs", fingerprint)
  await mkdir(cacheRoot, { recursive: true })
  const attempts = (await readdir(cacheRoot)).filter(name => /^attempt-\d+$/.test(name)).sort()
  for (const attempt of attempts) {
    const cached = await verifiedCache(join(cacheRoot, attempt), fingerprint)
    if (cached) { console.log(`Verified native cache ${request.solver} ${fingerprint}`); return cached }
  }
  const directory = join(cacheRoot, `attempt-${String(attempts.length + 1).padStart(3, "0")}`)
  await mkdir(directory)
  for (const [filename, contents] of Object.entries(request.files)) {
    safeFilename(filename)
    await mkdir(resolve(directory, filename, ".."), { recursive: true })
    await writeFile(join(directory, filename), contents)
  }
  request.outputFiles.forEach(safeFilename)
  await writeJson(join(directory, "request.json"), request)
  const start = Date.now()
  await writeJson(join(directory, "started.json"), { fingerprint, binaryHash, binary, timestamp: new Date().toISOString(), timeoutSeconds: context.timeoutSeconds, ramCapBytes: 5 * 1024 ** 3 })
  console.log(`Starting ${request.solver} in ${directory}`)
  const stdoutFile = Bun.file(join(directory, "stdout.log")).writer()
  const stderrFile = Bun.file(join(directory, "stderr.log")).writer()
  let abortReason: string | undefined
  // --no-fork preserves the detached process-group leader through timeout/exec.
  // Otherwise an assertion can kill flock while its solver child keeps running.
  const child = spawn("flock", ["--no-fork", "-n", join(context.root, "solver.lock"), "timeout", "--signal=TERM", "--kill-after=5s", `${context.timeoutSeconds}s`, "prlimit", "--as=5368709120", "--", binary, ...request.args], {
    cwd: directory, detached: true, stdio: ["ignore", "pipe", "pipe"], env: { ...process.env, OMP_NUM_THREADS: "1", OPENBLAS_NUM_THREADS: "1" },
  })
  let logBytes = 0
  let killTimer: ReturnType<typeof setTimeout> | undefined
  const stop = () => {
    if (!child.pid) return
    try { process.kill(-child.pid, "SIGTERM") } catch { return }
    killTimer ??= setTimeout(() => { try { process.kill(-child.pid!, "SIGKILL") } catch { /* Already exited. */ } }, 5000)
  }
  let diagnosticTail = ""
  const maximumLogBytes = 64 * 1024 ** 2
  for (const [stream, writer] of [[child.stdout, stdoutFile], [child.stderr, stderrFile]] as const) {
    stream.on("data", (chunk: Buffer) => {
      const remaining = Math.max(0, maximumLogBytes - logBytes)
      if (remaining) writer.write(chunk.subarray(0, remaining))
      logBytes += chunk.length
      const diagnostic = diagnosticTail + chunk.toString("utf8")
      diagnosticTail = diagnostic.slice(-512)
      if (/assert[^\n]*failed in/i.test(diagnostic)) abortReason = "Native assertion; no output can be accepted"
      if (logBytes > maximumLogBytes) abortReason = "Native log exceeded 64 MiB limit"
      if (abortReason && child.pid) {
        stop()
      }
    })
  }
  const watchdog = setInterval(async () => {
    try {
      if (await availableMemoryBytes() < 3 * 1024 ** 3 && child.pid) {
        abortReason = "Stopped this solver to preserve 3 GiB host headroom"
        stop()
      }
    } catch (error) { abortReason = String(error); stop() }
  }, 3000)
  const terminal = await new Promise<{ code: number | null; signal: string | null }>((complete, reject) => {
    child.once("error", error => { abortReason = String(error); complete({ code: 127, signal: null }) })
    child.once("close", (code, signal) => complete({ code, signal }))
  }).finally(() => { clearInterval(watchdog); clearTimeout(killTimer) })
  await stdoutFile.end(); await stderrFile.end()
  const stdout = await readFile(join(directory, "stdout.log"), "utf8")
  const stderr = await readFile(join(directory, "stderr.log"), "utf8")
  const files: Record<string, string> = {}
  for (const filename of request.outputFiles) {
    try { files[filename] = await readFile(join(directory, filename), "utf8") } catch { /* Missing output is recorded and rejected by the caller. */ }
  }
  const exitCode = terminal.code ?? 128
  await writeJson(join(directory, "terminal.json"), { status: exitCode === 0 && !abortReason && request.outputFiles.every(filename => filename in files) ? "completed" : "failed", fingerprint, requestHash: sha256(JSON.stringify(request)), binaryHash, exitCode, signal: terminal.signal, abortReason, elapsedMs: Date.now() - start, hashes: Object.fromEntries(Object.entries({ "stdout.log": stdout, "stderr.log": stderr, ...files }).map(([filename, contents]) => [filename, sha256(contents)])) })
  if (exitCode !== 0 || abortReason || request.outputFiles.some(filename => !(filename in files))) throw Error(`${request.solver} stopped: exit=${exitCode}, signal=${terminal.signal}, reason=${abortReason ?? "missing output or see native logs"}; ${directory}`)
  return { stdout, stderr, files, exitCode }
}

export function createSolver(context: SolverContext): RunSolver {
  if (!Number.isFinite(context.timeoutSeconds) || context.timeoutSeconds <= 0 || context.timeoutSeconds > 300) throw Error("Native timeout must be 0 < seconds <= 300")
  let queue = Promise.resolve()
  return request => {
    const result = queue.then(() => executeRequest(request, context))
    queue = result.then(() => {}, () => {})
    return result
  }
}
