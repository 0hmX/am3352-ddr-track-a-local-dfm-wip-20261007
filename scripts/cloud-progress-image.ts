import { readFileSync, writeFileSync } from "node:fs"
import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { Resvg } from "@resvg/resvg-js"
const directory=process.argv[2], title=process.argv[3] ?? "Routing checkpoint"
const records=JSON.parse(readFileSync(`${directory}/board.circuit.json`,"utf8"))
const summary=JSON.parse(readFileSync(`${directory}/connectivity-summary.json`,"utf8"))
const layers=(process.argv[4]?.split(",")??["top","inner2","inner4","bottom"]) as any[]
const region=process.argv[5] ?? "ddr"
const regions={ddr:{label:"DDR region",viewport:{minX:-15,minY:-39,maxX:15,maxY:4}},right:{label:"HDMI and Ethernet",viewport:{minX:4,minY:-39,maxX:70,maxY:26.5}},full:{label:"full board"}} as const
if (!(region in regions)) throw Error("Region must be ddr, right, or full")
const selected=regions[region as keyof typeof regions]
const labels=layers.map((layer,i)=>`${layer === "top" ? "Top" : layer === "bottom" ? "Bottom" : layer.replace("inner","Inner ")} · ${i ? selected.label : "full board"}`)
const panels=layers.map((layer,i)=>{
 const x=(i%2)*1000+20,y=Math.floor(i/2)*660+140
 const svg=convertCircuitJsonToPcbSvg(records,{layer,width:960,height:600,showPcbGroups:false,showCourtyards:false,showPinNumbers:false,...(i && "viewport" in selected?{viewport:selected.viewport}:{})})
 return `<g transform="translate(${x} ${y})"><text x="0" y="-14" fill="#d9e6f4" font-size="24">${labels[i]}</text>${svg}</g>`
}).join("")
const escape=(s:string)=>s.replaceAll("&","&amp;").replaceAll("<","&lt;")
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1460" viewBox="0 0 2000 1460"><rect width="2000" height="1460" fill="#10151c"/><g font-family="DejaVu Sans,sans-serif"><text x="28" y="44" fill="white" font-size="30">${escape(title)}</text><text x="28" y="84" fill="#bbcddd" font-size="22">${summary.connectedNets}/${summary.uniqueNamedNets} named nets connected · ${summary.remainingNets} remaining · ${records.filter((r:any)=>r.type==='pcb_trace').length} traces · ${records.filter((r:any)=>r.type==='pcb_via').length} vias · not fabrication qualified</text>${panels}</g></svg>`
writeFileSync(`${directory}/progress.svg`,svg)
writeFileSync(`${directory}/progress.png`,new Resvg(svg).render().asPng())
console.log(`${directory}/progress.png`)
