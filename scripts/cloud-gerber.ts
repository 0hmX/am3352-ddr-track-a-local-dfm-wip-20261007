import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { pathToFileURL } from "node:url"
const directory=process.argv[2],modulePath=process.argv[3]
if(!directory || !modulePath)throw Error("Provide native export directory and installed circuit-json-to-gerber module path")
const {convertCircuitJsonToGerberFiles}=await import(pathToFileURL(resolve(modulePath)).href)
const records=JSON.parse(readFileSync(`${directory}/board.circuit.json`,"utf8"))
const files=convertCircuitJsonToGerberFiles(records,{flip_y_axis:false})
mkdirSync(`${directory}/gerber`,{recursive:true})
for(const [name,content] of Object.entries(files))writeFileSync(`${directory}/gerber/${name}`,content as string)
writeFileSync(`${directory}/gerber-manifest.json`,JSON.stringify({purpose:"Independent geometry verification only; incomplete routing and unqualified fabrication",coordinateConvention:"Board millimeters; +X right,+Y up; flip_y_axis false",files:Object.keys(files)},null,2))
console.log(Object.keys(files))
