import { readFile, readdir } from "node:fs/promises"
import { resolve, dirname, join } from "node:path"
import { buildCoverage, exportContext, requireQualifiedCoverage } from "./context-coverage"
import { planCoupled } from "./plan"
import { sha256, writeJson } from "./shared"
import { createSolver } from "./solver-cache"
import { runSmoke } from "./smoke"

const [mode, input, outputArgument, ...args] = process.argv.slice(2), output = resolve(outputArgument ?? ".simulation/results")
try {
  if (["inventory","plan","board"].includes(mode)) {
    if (!input) throw Error("Supply an independently rendered physical Circuit JSON file")
    const records = JSON.parse(await readFile(input, "utf8")), platingMm = Number(process.env.SIM_PLATING_MM)
    if (!(platingMm>0)) throw Error("Declare the plating scenario explicitly, e.g. SIM_PLATING_MM=0.025; this is not fabrication confirmation")
    const coverage = buildCoverage(records, platingMm), intermediate = exportContext(records, coverage)
    await writeJson(`${output}/coverage.json`, coverage); await writeJson(`${output}/native-context.json`, intermediate)
    if (mode === "board") requireQualifiedCoverage(coverage) // Runs before binary/resource setup; cannot be promoted by edited metadata.
    if (mode === "plan") {
      const [radius, ...seeds] = args
      if (!seeds.length) throw Error("plan requires radius-mm and one or more native pcb_trace IDs")
      await writeJson(`${output}/plan.json`, planCoupled(records, seeds, Number(radius)))
    }
    console.log(JSON.stringify({ objects: intermediate.objects.length, sourceHash: coverage.physicalRecordsSha256, solverReady: false }))
  } else if (mode === "smoke") {
    const binary = process.env.FASTER_CAP_BIN
    if (!binary) throw Error("Set FASTER_CAP_BIN to an existing FasterCap executable")
    const directory = dirname(new URL(import.meta.url).pathname), sources: Record<string,string> = {}
    for (const name of (await readdir(directory)).filter(n => n.endsWith(".ts")).sort()) sources[name] = sha256(await readFile(join(directory,name)))
    const fingerprint = sha256(JSON.stringify({ sources, runtime: process.versions, platform: process.platform, architecture: process.arch }))
    const solver = createSolver({ root: output, binaries: { fastercap: resolve(binary), fasthenry: "unused", ngspice: "unused" }, fingerprint, timeoutSeconds: 120 })
    console.log(JSON.stringify(await runSmoke(solver, output)))
  } else throw Error("Commands: inventory INPUT OUTPUT | plan INPUT OUTPUT RADIUS TRACE_ID... | board INPUT OUTPUT | smoke - OUTPUT")
} catch (error) {
  await writeJson(`${output}/terminal.json`, { status: "blocked", command: mode, diagnostic: String(error), acceptedBoardRlc: false, acceptedEye: false })
  console.error(String(error)); process.exitCode = 1
}
