import { createHash } from "node:crypto"
import { readFile, writeFile, rename, mkdir } from "node:fs/promises"
import { dirname } from "node:path"

export const sha256 = (contents: string | Uint8Array) => createHash("sha256").update(contents).digest("hex")

export async function writeJson(filename: string, receipt: unknown) {
  await mkdir(dirname(filename), { recursive: true })
  const temporary = `${filename}.${process.pid}.tmp`
  await writeFile(temporary, JSON.stringify(receipt, null, 2) + "\n")
  await rename(temporary, filename)
}

export async function readJson<T>(filename: string): Promise<T> {
  return JSON.parse(await readFile(filename, "utf8")) as T
}

export function matrixResidual(first: number[][], second: number[][]) {
  if (first.length !== second.length || first.some((row, index) => row.length !== second[index]?.length)) throw Error("Matrix dimensions differ")
  const denominator = Math.max(...second.flat().map(Math.abs))
  const residual = Math.max(...second.flatMap((row, i) => row.map((entry, j) => Math.abs(entry - first[i][j])))) / denominator
  if (!Number.isFinite(residual)) throw Error("Nonfinite matrix comparison")
  return residual
}
