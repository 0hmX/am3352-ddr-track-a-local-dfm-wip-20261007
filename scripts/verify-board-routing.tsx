import { Circuit } from "@tscircuit/core"
import * as checks from "@tscircuit/checks"
import { getFullConnectivityMapFromCircuitJson } from "circuit-json-to-connectivity-map"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createHash } from "node:crypto"
import { dirname, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import Flatbush from "flatbush"
import { Children, cloneElement, createElement } from "react"
import Board from "../index"

// Reuse the installed checks package's exact geometry converter without modifying
// the package or guessing pad/pour geometry. Fail closed if its internals change.
const checkPath = import.meta.resolve("@tscircuit/checks").replace("file://", "")
const checkSource = readFileSync(checkPath, "utf8")
const helpers = ["convertCircuitJsonToFlattenJs", "touchesPour", "polygonContainsPoint"]
for (const helper of helpers) if (!checkSource.includes(`function ${helper}(`)) throw Error(`Checks geometry API changed: ${helper}`)
const geometryPath = resolve("node_modules/.cache/board-validation/checks-geometry.mjs")
mkdirSync(dirname(geometryPath), { recursive: true })
writeFileSync(geometryPath, `${checkSource}\nexport { ${helpers.join(", ")} };\n`)
const { convertCircuitJsonToFlattenJs: convert, touchesPour: touches } = await import(pathToFileURL(geometryPath).href)
const args=process.argv.slice(2)
const option=(name:string)=>args.includes(name)?args[args.indexOf(name)+1]:undefined
const input=option("--json")
const candidates=args.includes("--candidates")
const platedDrillPolicy=option("--plated-drill-clearance")
const platedDrillMinimum=platedDrillPolicy===undefined ? 0.2 : Number(platedDrillPolicy)
if (!Number.isFinite(platedDrillMinimum) || platedDrillMinimum<0) throw Error("Invalid --plated-drill-clearance")
if (input && candidates) throw Error("--candidates requires native TSX compilation, not --json")
const output = resolve(option("--output") ?? (args[0] && !args[0].startsWith("--") ? args[0] : "work/rest/validation"))
mkdirSync(output, { recursive: true })
const sha = (s: string) => createHash("sha256").update(s).digest("hex")
const id = (r: any) => r[`${r.type}_id`]
const copperTypes = ["pcb_smtpad", "pcb_plated_hole", "pcb_via", "pcb_trace", "pcb_copper_pour"]
const nativeNames = ["checkTracesAreContiguous", "checkEachPcbTraceNonOverlapping", "checkPadTraceClearance", "checkViaTraceClearance", "checkViaPadClearance", "checkDifferentNetViaSpacing", "checkSameNetViaSpacing", "checkPcbTracesOutOfBoard", "checkHoleTraceClearance", "checkCopperToBoardEdgeClearance", "checkViasOffBoard", "checkPadPadClearance", "checkCopperPourShorts", "checkPcbTraceSelfShorts", "checkDanglingTraces", "checkSourceTracesMatchPcbTraceThickness"]

function analyze(records: any[]) {
  const logical = getFullConnectivityMapFromCircuitJson(records)
  const board = records.find(r => r.type === "pcb_board")
  const stack = ["top", ...Array.from({length: board.num_layers - 2}, (_, i) => `inner${i + 1}`), "bottom"]
  const span = (r: any) => r.type === "pcb_hole" ? stack : stack.slice(Math.min(...r.layers.map((l: string) => stack.indexOf(l))), Math.max(...r.layers.map((l: string) => stack.indexOf(l))) + 1)
  const native = Object.fromEntries(nativeNames.map(name => {
    const errors=(checks as any)[name](structuredClone(records))
    console.log(name,errors.length)
    return [name,errors]
  }))
  const converted = convert(records, { elementTypes: copperTypes, strict: true, curveTolerance: 1e-6 })
  const copper = converted.elements.flatMap((e: any) => e.shapes.map((shape: any) => ({...e, shape})))
  const parent = copper.map((_: any, i: number) => i)
  const root = (n: number): number => parent[n] === n ? n : parent[n] = root(parent[n])
  const join = (a: number, b: number) => { parent[root(a)] = root(b) }
  const barrels = new Map<string, number>()
  const layers = new Map<string, number[]>()
  copper.forEach((e: any, i: number) => {
    const entries = layers.get(e.layer) ?? []; entries.push(i); layers.set(e.layer, entries)
    if (["pcb_via", "pcb_plated_hole"].includes(e.elementType)) {
      if (barrels.has(e.elementId)) join(i, barrels.get(e.elementId)!)
      else barrels.set(e.elementId, i)
    }
  })
  const contacts: any[] = []
  const contactIndices:number[]=[]
  for (const [layer, entries] of layers) {
    const index = new Flatbush(entries.length)
    for (const i of entries) { const b = copper[i].shape.box; index.add(b.xmin, b.ymin, b.xmax, b.ymax) }
    index.finish()
    for (const i of entries) {
      const a = copper[i], b = a.shape.box
      for (const k of index.search(b.xmin, b.ymin, b.xmax, b.ymax)) {
        const j = entries[k]; if (i >= j) continue
        const other = copper[j]
        if (root(i) === root(j)) continue
        if (!touches(a.shape, other.shape)) continue
        join(i, j)
        const netA = a.sourceElement.source_net_id ?? a.elementId, netB = other.sourceElement.source_net_id ?? other.elementId
        if (!logical.areIdsConnected(netA, netB) && netA !== netB) { contacts.push({layer, a:a.elementId, b:other.elementId}); contactIndices.push(i) }
      }
    }
  }
  const sourcePorts = new Map(records.filter(r => r.type === "source_port").map(r => [r.source_port_id, r]))
  const components = new Map(records.filter(r => r.type === "source_component").map(r => [r.source_component_id, r]))
  // Manual via endpoint ports are routing artifacts, not required component pins.
  const ports = records.filter(r => r.type === "pcb_port" && components.has(sourcePorts.get(r.source_port_id)?.source_component_id))
  const rootsByPort = new Map<string, Set<number>>()
  const shortedRoots=new Set(contactIndices.map(root))
  copper.forEach((e: any, i: number) => {
    const port = e.sourceElement.pcb_port_id
    if (!port) return
    const roots = rootsByPort.get(port) ?? new Set(); roots.add(root(i)); rootsByPort.set(port, roots)
  })
  const nets = records.filter(r => r.type === "source_net").map(net => {
    const pins = ports.filter(p => logical.areIdsConnected(p.source_port_id, net.source_net_id)).map(p => {
      const sp = sourcePorts.get(p.source_port_id), component = components.get(sp?.source_component_id)
      return { port: p.pcb_port_id, selector: `${component?.name}.${sp?.name}`, roots: [...rootsByPort.get(p.pcb_port_id) ?? []] }
    })
    const groups = new Map<number, string[]>()
    for (const p of pins) for (const key of p.roots) { const a = groups.get(key) ?? []; a.push(p.selector); groups.set(key, a) }
    const largest = Math.max(0, ...[...groups.values()].map(a => a.length))
    const physicallyConnected=pins.length>0 && groups.size===1 && pins.every(p=>p.roots.length>0)
    const shorted=pins.some(p=>p.roots.some(key=>shortedRoots.has(key)))
    return { name:net.name, pinCount:pins.length, physicalGroups:groups.size, missingCopper:pins.filter(p => !p.roots.length).map(p => p.selector), connected:physicallyConnected && !shorted, physicallyConnected, shorted, largestConnectedPinGroup:largest, connectionsNeeded:Math.max(0, groups.size - 1) + pins.filter(p => !p.roots.length).length, groups:[...groups.values()] }
  })
  // Supplement native checks: via/PTH/NPTH drill spacing and trace-to-plated
  // drill clearance are not covered by the eight routing geometry checks.
  const drills = records.filter(r => ["pcb_via", "pcb_plated_hole", "pcb_hole"].includes(r.type))
  const drillRecords = drills.map(r => ({...r, type:"pcb_hole", pcb_hole_id:id(r), hole_shape:r.type === "pcb_hole" ? r.hole_shape : r.shape === "pill" ? "rotated_pill" : "circle"}))
  const drillShapes = convert(drillRecords, { elementTypes:["pcb_hole"], strict:true, curveTolerance:1e-6 }).elements
  const drillById = new Map(drillShapes.map((e: any) => [e.elementId, e.shapes[0]]))
  const distance = (a: any, b: any) => touches(a,b) ? 0 : a.distanceTo(b)[0]
  const drillSpacing: any[] = [], traceToPlatedHole: any[] = []
  for (let i=0; i<drills.length; i++) for (let j=i+1; j<drills.length; j++) {
    const a=drills[i], b=drills[j]
    if (!span(a).some((l: string) => span(b).includes(l))) continue
    // Distinct via pairs are covered by native via checks. Coincident same-net
    // route-emitted records describe a shared physical drill, not two holes.
    if (a.type === "pcb_via" && b.type === "pcb_via") {
      if (Math.hypot(a.x-b.x,a.y-b.y)>1e-9 || logical.areIdsConnected(id(a),id(b))) continue
    }
    const gap=distance(drillById.get(id(a)),drillById.get(id(b)))
    const minimum=a.type === "pcb_via" && b.type === "pcb_via" ? board.min_via_hole_edge_to_via_hole_edge_clearance : board.min_plated_hole_drill_edge_to_drill_edge_clearance
    if (gap+1e-6<minimum) drillSpacing.push({a:id(a),b:id(b),gap,minimum})
  }
  for (const hole of drills.filter(r => r.type !== "pcb_hole")) {
    const shape=drillById.get(id(hole)), minimum=platedDrillMinimum
    for (const trace of converted.elements.filter((e: any) => e.elementType === "pcb_trace" && span(hole).includes(e.layer))) {
      if (logical.areIdsConnected(id(hole),trace.elementId)) continue
      const b=shape.box, c=trace.bounds
      if (c.xmin>b.xmax+minimum || c.xmax<b.xmin-minimum || c.ymin>b.ymax+minimum || c.ymax<b.ymin-minimum) continue
      const gap=Math.min(...trace.shapes.map((s: any) => distance(s,shape)))
      if (gap+1e-6<minimum) traceToPlatedHole.push({hole:id(hole),trace:trace.elementId,layer:trace.layer,gap,minimum})
    }
  }
  return { counts:Object.fromEntries([...copperTypes,"source_net","pcb_port","pcb_hole"].map(type => [type,records.filter(r=>r.type===type).length])), native, supplemental:{drillSpacing,traceToPlatedHole,physicalDifferentNetContacts:contacts}, connectivity:{netCount:nets.length, connectedNets:nets.filter(n=>n.connected).length, physicallyConnectedNets:nets.filter(n=>n.physicallyConnected).length, shortedNets:nets.filter(n=>n.shorted).length, unroutedNets:nets.filter(n=>!n.physicallyConnected && n.pinCount>1).length, singletonNets:nets.filter(n=>n.pinCount===1).length, nets} }
}

function failureKeys(report: any, records: any[]) {
  const elements = new Map(records.map(r => [id(r),r]))
  const label = (key: string): any => {
    const r=elements.get(key); if (!r) return key
    if (r.type === "source_component" || r.type === "source_net") return `${r.type}:${r.name}`
    if (r.type === "source_port") return [label(r.source_component_id),r.name]
    if (r.type === "source_trace") return [r.type,...r.connected_source_port_ids.map(label).sort(),...r.connected_source_net_ids.map(label).sort()]
    if (r.type === "pcb_port") return [r.type,label(r.source_port_id),r.x,r.y,r.layers]
    if (r.type === "pcb_component") return [r.type,label(r.source_component_id)]
    if (r.type === "pcb_trace") return [r.type,r.route.map((p:any)=>Object.fromEntries(Object.entries(p).filter(([k])=>!k.endsWith("_id"))))]
    return [r.type,r.shape,r.x,r.y,r.layer,r.layers,r.radius,r.width,r.height,r.outer_diameter,r.hole_diameter,r.outer_width,r.outer_height,r.points,r.brep_shape]
  }
  const stable = (value:any): any => {
    if (typeof value === "string") return elements.has(value) ? stable(label(value)) : value
    if (typeof value === "number") return Math.round(value*1e6)/1e6
    if (Array.isArray(value)) return value.map(stable)
    if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().filter(k=>k!=="message" && k!=="pcb_error_id" && !k.endsWith("_error_id")).map(k=>[k,stable(value[k])]))
    return value
  }
  return Object.fromEntries([...Object.entries(report.native),...Object.entries(report.supplemental)].map(([name,errors]:any)=>[name,errors.map((e:any)=>sha(JSON.stringify(stable(e))))]))
}

// Fresh checkouts validate absolutely; a saved baseline optionally enables regression comparison.
const baselinePath=option("--baseline") ?? resolve("work/rest/baseline.circuit.json")
const baselineText=args.includes("--absolute") ? "[]" : option("--baseline") || existsSync(baselinePath) ? readFileSync(baselinePath,"utf8") : "[]"
const baselineRecords=JSON.parse(baselineText)
const engineText=readFileSync(import.meta.path,"utf8").split("function analyze(")[1].split("function failureKeys(")[0]
const baselineKey=sha(baselineText+sha(checkSource)+engineText+JSON.stringify(nativeNames)+platedDrillMinimum)
const cachePath=resolve("work/rest/validation/baseline-analysis.json")
mkdirSync(dirname(cachePath),{recursive:true})
if (option("--cache-baseline-from")) {
  const previous=JSON.parse(readFileSync(resolve(option("--cache-baseline-from")!),"utf8"))
  if (previous.baselineSha256!==sha(baselineText) || previous.checksGeometrySha256!==sha(checkSource)) throw Error("Baseline cache provenance mismatch")
  if ((previous.scope.platedDrillClearance?.minimumMm ?? 0.2)!==platedDrillMinimum) throw Error("Baseline plated-drill policy mismatch")
  if (previous.baseline.supplemental.physicalDifferentNetContacts.length) throw Error("Baseline with shorts must be reanalyzed")
  Object.assign(previous.baseline.connectivity,{physicallyConnectedNets:previous.baseline.connectivity.connectedNets,shortedNets:0})
  for (const net of previous.baseline.connectivity.nets) Object.assign(net,{physicallyConnected:net.connected,shorted:false})
  writeFileSync(cachePath,JSON.stringify({key:baselineKey,analysis:previous.baseline}))
  console.log("Baseline cached",cachePath)
  process.exit(0)
}
let cachedBaseline:any
try { const cache=JSON.parse(readFileSync(cachePath,"utf8")); if (cache.key===baselineKey) cachedBaseline=cache.analysis } catch {}
let records:any[]
const candidateNames=["DdrSupportRoutes","PowerRoutes","PowerTrunks","EthernetRoutes","HdmiPairRoutes","VideoRoutes","ControlRoutes","PeripheralRoutes"]
if (input) records=JSON.parse(readFileSync(resolve(input),"utf8"))
else {
  const circuit = new Circuit({platform:{partsEngineDisabled:true,netlistDrcChecksDisabled:true}})
  circuit.schematicDisabled = true
  const board=Board(), extra=[]
  if (candidates) for (const name of candidateNames) {
    const module=await import(pathToFileURL(resolve(`layout/${name}.tsx`)).href)
    if (!module[name]) throw Error(`Missing candidate component ${name}`)
    extra.push(createElement(module[name],{key:name}))
  }
  circuit.add(extra.length ? cloneElement(board,{},...Children.toArray(board.props.children),...extra) : board)
  const progress=setInterval(()=>console.log("Rendering",circuit.getRunningAsyncEffects().map(e=>`${e.phase}: ${e.effectName}`)),30000)
  try { await circuit.renderUntilSettled() } finally { clearInterval(progress) }
  records = circuit.getCircuitJson() as any[]
}
writeFileSync(`${output}/board.circuit.json`,JSON.stringify(records))
console.log(input ? "Analyzing cached native export" : "Native board compiled", records.length, "records")
console.log("Export summary",JSON.stringify({traces:records.filter(r=>r.type==="pcb_trace").length,vias:records.filter(r=>r.type==="pcb_via").length,renderErrors:records.filter(r=>r.type.endsWith("_error"))}))
const baseline=baselineRecords.length ? cachedBaseline ?? analyze(baselineRecords) : {
  counts:{}, native:Object.fromEntries(nativeNames.map(name=>[name,[]])),
  supplemental:{drillSpacing:[],traceToPlatedHole:[],physicalDifferentNetContacts:[]},
  connectivity:{netCount:0,connectedNets:0,physicallyConnectedNets:0,shortedNets:0,unroutedNets:0,singletonNets:0,nets:[]},
}
if (!cachedBaseline) writeFileSync(cachePath,JSON.stringify({key:baselineKey,analysis:baseline}))
console.log(cachedBaseline ? "Baseline cache reused" : "Baseline analyzed")
const current=analyze(records)
const failureCounts=(report: any) => Object.fromEntries([...Object.entries(report.native),...Object.entries(report.supplemental)].map(([key,value]:any)=>[key,value.length]))
const before=failureCounts(baseline),after=failureCounts(current)
const beforeKeys=failureKeys(baseline,baselineRecords),afterKeys=failureKeys(current,records)
const report={generatedAt:new Date().toISOString(),analysisInput:input?{kind:"cached-native-export",path:resolve(input)}:{kind:"native-tsx",entry:resolve("index.tsx"),additionalComponents:candidates?candidateNames:[]},checksGeometrySha256:sha(checkSource),baselineSha256:sha(baselineText),nativeRenderErrors:records.filter(r=>r.type.endsWith("_error")),baseline,current,delta:{failures:Object.fromEntries(Object.keys(after).map(k=>[k,{baseline:before[k],current:after[k],change:after[k]-before[k],newIndices:afterKeys[k].flatMap((v:string,i:number)=>beforeKeys[k].includes(v)?[]:[i]),resolvedIndices:beforeKeys[k].flatMap((v:string,i:number)=>afterKeys[k].includes(v)?[]:[i])}])),newlyConnectedNets:current.connectivity.nets.filter(n=>n.connected && !baseline.connectivity.nets.find(b=>b.name===n.name)?.connected).map(n=>n.name)},scope:{physicalConnectivity:"Geometric copper contact on each layer, barrel bridges across actual via/PTH span, pour inner rings excluded. Does not equate a source net assignment with physical connectivity.",traceToPlatedHole:"Different-net traces versus finished via/PTH drill geometry; intentional same-net pad/via feeds exempt.",failureComparison:"Error IDs and message prose excluded; referenced elements compared by geometry and component/pin names, numeric values rounded to 1e-6 mm. New/resolved indices reference each snapshot's failure arrays.",limits:["No SI/PI, current capacity, impedance, thermal or DDR timing qualification.","Physical contact is zero-margin contact within Flatten's numerical tolerance; native checks enforce configured clearances.","Native checks package geometry internals are copied into an ignored runtime module; source hash recorded and missing functions fail closed."]}}
console.log(JSON.stringify({counts:current.counts,connectivity:{...current.connectivity,nets:undefined},failures:report.delta.failures,newlyConnectedNets:report.delta.newlyConnectedNets},null,2))
const informationalChecks=platedDrillPolicy===undefined ? ["traceToPlatedHole"] : []
Object.assign(report.scope,{informationalChecks,platedDrillClearance:{minimumMm:platedDrillMinimum,enforced:platedDrillPolicy!==undefined,contract:"minTraceToHoleEdgeClearance explicitly applies to NPTH only (installed @tscircuit/props/lib/components/group.ts). Plated-drill margin is an additional opt-in policy.",source:"https://github.com/tscircuit/props/blob/main/lib/components/group.ts"}})
writeFileSync(`${output}/report.json`,JSON.stringify(report,null,2))
if (report.nativeRenderErrors.length || Object.entries(report.delta.failures).some(([name,d])=>!informationalChecks.includes(name) && d.newIndices.length)) process.exitCode=1
