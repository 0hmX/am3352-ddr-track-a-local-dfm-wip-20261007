import { Circuit } from "@tscircuit/core"
import { Children, cloneElement, createElement } from "react"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { createHash } from "node:crypto"
import { execFileSync } from "node:child_process"
import Board from "../index"

// Compile candidate modules through the native authoring engine, without editing
// the production board or synthesizing Circuit JSON. The manifest is explicit
// about replacements so an already-mounted route set cannot be added twice.
const manifestPath=resolve(process.argv[2] ?? "")
const manifest=JSON.parse(readFileSync(manifestPath,"utf8"))
if(!manifest.output || !Array.isArray(manifest.remove) || !Array.isArray(manifest.add)) throw Error("Expected output, remove[], add[{path,export}]")
const additions=[]
const inputs=[]
for(const item of manifest.add){
 const path=resolve(item.path)
 const module=await import(pathToFileURL(path).href)
 if(typeof module[item.export]!=="function") throw Error(`Missing component ${item.export}`)
 additions.push(createElement(module[item.export],{key:path}))
 inputs.push({...item,sha256:createHash("sha256").update(readFileSync(path)).digest("hex")})
}
const board=Board()
const removed=new Set(manifest.remove)
const children=Children.toArray(board.props.children).filter((child:any)=>!removed.has(child.type?.name))
for(const element of additions)if(children.some((child:any)=>child.type===element.type))throw Error(`Candidate already mounted: ${element.type.name}`)
const c=new Circuit({platform:{partsEngineDisabled:true,netlistDrcChecksDisabled:true}})
c.schematicDisabled=true
c.add(cloneElement(board,{},...children,...additions))
await c.renderUntilSettled()
const records=c.getCircuitJson()
const serialized=JSON.stringify(records)
mkdirSync(manifest.output,{recursive:true})
writeFileSync(`${manifest.output}/board.circuit.json`,serialized)
const summary={sourceCommit:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),workingTreeStatus:execFileSync("git",["status","--porcelain=v1"],{encoding:"utf8"}),manifestPath,remove:manifest.remove,inputs,nativeExportSha256:createHash("sha256").update(serialized).digest("hex"),counts:Object.fromEntries(["pcb_trace","pcb_via","pcb_copper_pour"].map(type=>[type,records.filter(r=>r.type===type).length])),renderErrors:records.filter(r=>r.type.endsWith("_error"))}
writeFileSync(`${manifest.output}/render-summary.json`,JSON.stringify(summary,null,2))
console.log(JSON.stringify(summary,null,2))
if(summary.renderErrors.length)process.exitCode=1
