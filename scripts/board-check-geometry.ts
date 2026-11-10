import { createHash } from "node:crypto"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { pathToFileURL } from "node:url"

// The installed checks package bundles its geometry converter. Use that exact
// implementation, including pour inner rings, and fail closed on API changes.
export const checkSource = readFileSync(import.meta.resolve("@tscircuit/checks").replace("file://", ""), "utf8")
export const checksGeometrySha256 = createHash("sha256").update(checkSource).digest("hex")
const helpers = ["convertCircuitJsonToFlattenJs", "touchesPour"]
for (const helper of helpers) if (!checkSource.includes(`function ${helper}(`)) throw Error(`Checks geometry API changed: ${helper}`)
const geometryPath = resolve("node_modules/.cache/board-validation/checks-geometry.mjs")
mkdirSync(dirname(geometryPath), { recursive: true })
writeFileSync(geometryPath, `${checkSource}\nexport { ${helpers.join(", ")} };\n`)
export const { convertCircuitJsonToFlattenJs: convert, touchesPour: touches } = await import(pathToFileURL(geometryPath).href)
