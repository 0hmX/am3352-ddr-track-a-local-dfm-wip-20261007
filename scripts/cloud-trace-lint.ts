import { readFileSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { execFileSync } from "node:child_process"
const directory=process.argv[2], modulePath=process.argv[3]
if(!directory || !modulePath)throw Error("Provide native export directory and official style analyzer module path")
const {analyzePcbStyle}=await import(pathToFileURL(resolve(modulePath)).href)
const records=JSON.parse(readFileSync(`${directory}/board.circuit.json`,"utf8"))
const result=analyzePcbStyle(records)
let analyzerCommit=null
try{analyzerCommit=execFileSync("git",["-C",dirname(resolve(modulePath)),"rev-parse","HEAD"],{encoding:"utf8"}).trim()}catch{}
const byType:Record<string,number>={}
for(const issue of result.issues)byType[issue.lineItemType]=(byType[issue.lineItemType]??0)+1
writeFileSync(`${directory}/official-trace-lint.json`,JSON.stringify({analyzer:"@tscircuit/circuit-json-pcb-style-analysis",analyzerCommit,options:"Upstream defaults; no findings suppressed",...result},null,2))
console.log(JSON.stringify({issues:result.issues.length,byType,analyzerCommit},null,2))
process.exitCode=result.issues.length?1:0
