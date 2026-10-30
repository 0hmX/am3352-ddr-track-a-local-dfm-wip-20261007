/** Compile solver candidates against the real board. Run from the repository root:
 * bun scripts/verify-ddr-candidate.tsx work/ddr/experiments/{top,inner2,inner4,bottom}.json
 * This is a necessary geometry screen, not manufacturing or signal-integrity approval.
 */
import { Circuit } from '@tscircuit/core'
import * as checks from '@tscircuit/checks'
import { getFullConnectivityMapFromCircuitJson } from 'circuit-json-to-connectivity-map'
import { Children, cloneElement, createElement } from 'react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import Board from '../index'
import { ProvisionalDdrRoutes } from '../layout/ProvisionalDdrRoutes'
import { ddrRoutes } from '../data/ddr-routes'
import { checkMeanderGap } from './check-meander-gap'

type Point = { x: number; y: number }
const output = 'work/ddr/candidate-verification'
// Configurable trial region; these dimensions are not a fabrication requirement.
const keepout = { minX: -2, maxX: 2, minY: -19, maxY: -12 }
const width = 0.1, epsilon = 1e-5
const viaDimensions = { holeDiameterMm: 0.20, outerDiameterMm: 0.30 }
// Existing connector body overhangs: do not silently excuse new/worsened extents.
const baselineOverhangs = {
  J_MICROSD: { min_x: -28.28, max_x: -10.58, min_y: -21.38, max_y: -5.68 },
  J_HDMI: { min_x: 59.305, max_x: 73.155, min_y: -37, max_y: -20 },
}
const informational: unknown[] = []
const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)
// Ramer–Douglas–Peucker simplification, matching the exploratory audit tolerance.
function simplify(points: Point[], tolerance=0.03): Point[] {
  if (points.length<3) return points
  const a=points[0], b=points.at(-1)!, dx=b.x-a.x, dy=b.y-a.y, norm=dx*dx+dy*dy
  let maximum=0, index=0
  for (let i=1;i<points.length-1;i++) {
    const p=points[i], t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(norm||1)))
    const deviation=Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)
    if (deviation>maximum) { maximum=deviation; index=i }
  }
  return maximum>tolerance ? [...simplify(points.slice(0,index+1),tolerance).slice(0,-1),...simplify(points.slice(index),tolerance)] : [a,b]
}
// Slab clipping tests complete segments, including a crossing with both ends outside.
function hitsKeepout(a: Point, b: Point) {
  let lo = 0, hi = 1
  for (const [p, delta, min, max] of [[a.x, b.x-a.x, keepout.minX-width/2, keepout.maxX+width/2], [a.y, b.y-a.y, keepout.minY-width/2, keepout.maxY+width/2]]) {
    if (Math.abs(delta) < 1e-12) { if (p < min || p > max) return false }
    else { const ts = [(min-p)/delta, (max-p)/delta].sort((x,y)=>x-y); lo=Math.max(lo,ts[0]); hi=Math.min(hi,ts[1]) }
  }
  return lo <= hi
}
const failures: { check: string; detail: unknown }[] = []
const fail = (check: string, detail: unknown) => failures.push({check, detail})
mkdirSync(output, {recursive:true})
try {
  if (process.argv.length < 3) throw Error('Supply solver JSON files containing traces; all DDR signals are required')
  const candidates = process.argv.slice(2).flatMap(path => {
    const value = JSON.parse(readFileSync(path, 'utf8'))
    if (!Array.isArray(value.traces)) throw Error(`${path}: expected traces array`)
    return value.traces
  })
  const seen = new Set<string>()
  for (const candidate of candidates) {
    const name = candidate.connection_name
    if (!ddrRoutes.some(r=>r.name===name) || seen.has(name)) throw Error(`Unknown or duplicate route: ${name}`)
    seen.add(name)
    if (!Array.isArray(candidate.route) || candidate.route.length < 2) throw Error(`${name}: incomplete geometry`)
    const layer = candidate.route[0].layer
    if (!['top','inner1','inner2','inner3','inner4','inner5','inner6','bottom'].includes(layer)) throw Error(`${name}: invalid layer`)
    if (candidate.route.some(p=>p.route_type!=='wire' || p.layer!==layer || !Number.isFinite(p.x) || !Number.isFinite(p.y) || Math.abs(p.width-width)>epsilon || !Number.isFinite(p.width)))
      throw Error(`${name}: requires finite, uniform 0.10 mm single-layer wire geometry; explicit vias/multilayer candidates are unsupported`)
  }
  const missing = ddrRoutes.filter(r=>!seen.has(r.name)).map(r=>r.name)
  if (missing.length) fail('complete DDR coverage', missing)
  const circuit = new Circuit({platform:{partsEngineDisabled:true,netlistDrcChecksDisabled:true}})
  circuit.schematicDisabled = true
  const board = Board(), children = Children.toArray(board.props.children).filter((child:any)=>child.type!==ProvisionalDdrRoutes)
  for (const candidate of candidates) {
    const meta = ddrRoutes.find(r=>r.name===candidate.connection_name)!
    const from = meta.from.replace('.U1', '.Processor > .U1'), to = meta.to.replace('.U3', '.DDR3 > .U3')
    const points = candidate.route.map(({x,y})=>({x,y})), layer = candidate.route[0].layer
    const pcbPath = layer==='top' ? [from,...points,to] : [from,{...points[0],via:true,fromLayer:'top',toLayer:layer},...points,{...points.at(-1),via:true,fromLayer:layer,toLayer:'top'},to]
    children.push(createElement('trace',{key:meta.name,name:meta.name,from,to,width,pcbPath}))
  }
  circuit.add(cloneElement(board,{fabricatorPreset:'jlcpcb_standard'},children))
  await circuit.renderUntilSettled()
  const records = circuit.getCircuitJson() as any[]
  writeFileSync(`${output}/board.circuit.json`,JSON.stringify(records))
  const renderErrors = records.filter(r=>r.type.endsWith('_error'))
  if (renderErrors.length) fail('native render',{count:renderErrors.length,examples:renderErrors.slice(0,10)})
  const nativeChecks = {}
  for (const name of ['checkTracesAreContiguous','checkEachPcbTraceNonOverlapping','checkPadTraceClearance','checkViaTraceClearance','checkViaPadClearance','checkDifferentNetViaSpacing','checkPcbTracesOutOfBoard','checkHoleTraceClearance','checkSameNetViaSpacing','checkCopperToBoardEdgeClearance','checkViasOffBoard','checkPadPadClearance','checkCopperPourShorts','checkPcbTraceSelfShorts','checkDanglingTraces','checkSourceTracesMatchPcbTraceThickness','checkPcbComponentOverlap','checkPcbComponentsOutOfBoard']) {
    let result = await checks[name](structuredClone(records))
    nativeChecks[name] = result.length
    if (name==='checkPcbComponentsOutOfBoard') result=result.filter(error=>{
      const componentName=records.find(r=>r.type==='source_component' && r.source_component_id===error.source_component_id)?.name
      const baseline=baselineOverhangs[componentName], bounds=error.component_bounds
      if (!baseline || !bounds || !Object.keys(baseline).every(key=>Number.isFinite(bounds[key]) && (key.startsWith('min') ? bounds[key]>=baseline[key]-epsilon : bounds[key]<=baseline[key]+epsilon))) return true
      informational.push({check:name,componentName,classification:'unchanged or reduced baseline connector body overhang',baselineBounds:baseline,actualBounds:bounds,message:error.message})
      return false
    })
    if (result.length) fail(name,{count:result.length,examples:result.slice(0,10)})
  }
  // Nominal fabricator preset, not a fabrication-confirmed stackup.
  const z = new Map<string,number>()
  let depth = 0
  for (const layer of records.find(r=>r.type==='pcb_stackup')?.layers ?? []) {
    if (layer.layer_type==='copper') z.set(layer.layer,depth+layer.thickness/2)
    depth+=layer.thickness
  }
  const logical = getFullConnectivityMapFromCircuitJson(records)
  function port(selector: string) {
    const [componentName, ball] = selector.split(' > ').map(s=>s.slice(1))
    const component = records.find(r=>r.type==='source_component' && r.name===componentName)
    const ports = records.filter(r=>r.type==='source_port' && r.source_component_id===component?.source_component_id && (r.name===ball || r.port_hints?.includes(ball)))
    if (ports.length!==1) throw Error(`Cannot uniquely resolve ${selector}`)
    const pcb = records.filter(r=>r.type==='pcb_port' && r.source_port_id===ports[0].source_port_id)
    if (pcb.length!==1) throw Error(`No unique physical port for ${selector}`)
    return pcb[0]
  }
  // Reserve the other DDR signals' planned via-in-pad lands as obstacles too.
  // The mounted board may contain only a subset of these vias. Candidates can
  // override a saved signal layer; all other assignments remain provisional.
  const copperLayers=['top','inner1','inner2','inner3','inner4','inner5','inner6','bottom']
  const plannedVias=ddrRoutes.flatMap(meta=>{
    const layer=candidates.find(c=>c.connection_name===meta.name)?.route[0]?.layer ?? meta.layer
    return layer==='top' ? [] : [port(meta.from),port(meta.to)].map(p=>({name:meta.name,layer,center:{x:p.x,y:p.y}}))
  })
  const pointSegmentDistance=(p:Point,a:Point,b:Point)=>{
    const dx=b.x-a.x,dy=b.y-a.y,den=dx*dx+dy*dy
    const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(den||1)))
    return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)
  }
  const routes = candidates.map(candidate=>{
    const name=candidate.connection_name, meta=ddrRoutes.find(r=>r.name===name)!, layer=candidate.route[0].layer
    const from=port(meta.from), to=port(meta.to)
    if (!logical.areIdsConnected(from.source_port_id,to.source_port_id)) fail('cross-scope logical connectivity',{name})
    const traces=records.filter(r=>r.type==='pcb_trace' && r.route[0]?.start_pcb_port_id===from.pcb_port_id && r.route.at(-1)?.end_pcb_port_id===to.pcb_port_id)
    if (traces.length!==1) throw Error(`${name}: no unique native trace connecting expected physical pins`)
    const trace=traces[0], points=candidate.route.filter((p,i,a)=>!i || distance(p,a[i-1])>epsilon)
    if (points.length<2) throw Error(`${name}: degenerate route`)
    if (distance(points[0],from)>epsilon || distance(points.at(-1),to)>epsilon) fail('endpoints',{name,from,to})
    const vias=records.filter(r=>r.type==='pcb_via' && r.pcb_trace_id===trace.pcb_trace_id)
    if (vias.length!==(layer==='top'?0:2) || (layer!=='top' && [from,to].some(p=>!vias.some(v=>distance(p,v)<epsilon && v.layers.includes('top') && v.layers.includes(layer))))) fail('via-in-pad',{name,vias})
    if (vias.some(v=>!Number.isFinite(v.hole_diameter) || !Number.isFinite(v.outer_diameter) || Math.abs(v.hole_diameter-viaDimensions.holeDiameterMm)>epsilon || Math.abs(v.outer_diameter-viaDimensions.outerDiameterMm)>epsilon)) fail('via-in-pad dimensions',{name,expected:viaDimensions,actual:vias.map(v=>({holeDiameterMm:v.hole_diameter,outerDiameterMm:v.outer_diameter}))})
    let bends=0, maxTurnDegrees=0
    for (let i=1;i<points.length;i++) {
      if (hitsKeepout(points[i-1],points[i])) { fail('4x7 mm center keepout',{name,segment:i-1}); break }
    }
    for (const via of plannedVias) {
      if (via.name===name || copperLayers.indexOf(layer)>copperLayers.indexOf(via.layer)) continue
      const clearance=Math.min(...points.slice(1).map((p,i)=>pointSegmentDistance(via.center,points[i],p)))-(width+viaDimensions.outerDiameterMm)/2
      if (clearance<0.1-epsilon) fail('planned DDR via clearance',{name,via:via.name,center:via.center,clearanceMm:clearance,minimumMm:0.1})
    }
    const planarMm=points.slice(1).reduce((sum,p,i)=>sum+distance(p,points[i]),0)
    for (let i=1;i<points.length-1;i++) {
      const a=points[i-1], b=points[i], c=points[i+1]
      const ux=b.x-a.x, uy=b.y-a.y, vx=c.x-b.x, vy=c.y-b.y
      maxTurnDegrees=Math.max(maxTurnDegrees,Math.abs(Math.atan2(ux*vy-uy*vx,ux*vx+uy*vy))*180/Math.PI)
    }
    if (maxTurnDegrees>30+1e-4) fail('maximum 30-degree direction change',{name,maxTurnDegrees})
    // RDP + 10-degree turns is a geometric heuristic. Consecutive qualifying
    // turns in the same direction form one turn run, so a sampled rounded corner
    // does not inflate the count at the sampling scale. Turn runs separated by more
    // than 1 mm of path length count separately. This can undercount nearby real
    // corners or split a large rounded corner: it is a screen, not certification.
    const simplified=simplify(points)
    let previousDirection=0, previousTurnArc=-Infinity, arc=0
    for (let i=1;i<simplified.length-1;i++) {
      const a=simplified[i-1], b=simplified[i], c=simplified[i+1]
      arc+=distance(a,b)
      const ux=b.x-a.x, uy=b.y-a.y, vx=c.x-b.x, vy=c.y-b.y
      const cross=ux*vy-uy*vx, angle=Math.atan2(Math.abs(cross),ux*vx+uy*vy)
      if (angle<Math.PI/18) continue
      const direction=Math.sign(cross) || 1
      if (direction!==previousDirection || arc-previousTurnArc>1) bends++
      previousDirection=direction
      previousTurnArc=arc
    }
    if (bends<2) fail('at least two distinct turn runs',{name,bends})
    const returnGap=checkMeanderGap(points.map(p=>[p.x,p.y]),width,0.20)
    if (!returnGap.ok) fail('0.20 mm opposing return-leg gap',{name,...returnGap})
    const viaMm = layer==='top' ? 0 : z.has('top') && z.has(layer) ? 2*Math.abs(z.get('top')!-z.get(layer)!) : null
    if (viaMm===null) fail('missing nominal via depth',{name,layer})
    return {name,layer,planarMm,viaMm,totalMm:viaMm===null?null:planarMm+viaMm,bends,maxTurnDegrees,returnGap}
  })
  const groups = {
    BYTE0:[...Array.from({length:8},(_,i)=>`DDR_D${i}`),'DDR_DQM0','DDR_DQS0','DDR_DQSn0'],
    BYTE1:[...Array.from({length:8},(_,i)=>`DDR_D${i+8}`),'DDR_DQM1','DDR_DQS1','DDR_DQSn1'],
    ADDRESS:ddrRoutes.map(r=>r.name).filter(n=>!/^DDR_D/.test(n)),
    DQS0:['DDR_DQS0','DDR_DQSn0'],DQS1:['DDR_DQS1','DDR_DQSn1'],CK:['DDR_CK','DDR_CKn'],
  }
  const skew = Object.entries(groups).map(([group,names])=>{
    const rows=routes.filter(r=>names.includes(r.name)), limitMm=['DQS0','DQS1','CK'].includes(group)?0.127:0.635
    const planarSkewMm=rows.length===names.length ? Math.max(...rows.map(r=>r.planarMm))-Math.min(...rows.map(r=>r.planarMm)) : null
    const nominalTotalSkewMm=rows.length===names.length && rows.every(r=>r.totalMm!==null) ? Math.max(...rows.map(r=>r.totalMm!))-Math.min(...rows.map(r=>r.totalMm!)) : null
    if (nominalTotalSkewMm===null || nominalTotalSkewMm>limitMm+epsilon) fail('nominal total length skew',{group,planarSkewMm,nominalTotalSkewMm,limitMm})
    return {group,planarSkewMm,nominalTotalSkewMm,limitMm}
  })
  const report={status:failures.length?'FAIL':'INCOMPLETE',qualified:false,electricalSignoff:false,scope:'Necessary geometry screening only; never complete electrical or fabrication signoff',keepout,widthMm:width,viaDimensions,nativeChecks,informational,routes,skew,failures,
    bendHeuristic:'0.03 mm RDP; >=10 degree turns; same-direction turns <=1 mm apart along simplified path count as one run; may undercount close corners or split large rounded corners',
    unverified:['TI inter-net DDR spacing by signal class (including 3w/4w center-to-center rules); native overlap and clearance checks do not enforce these rules','Differential impedance and pair coupling, including separation consistency and uncoupled lengths','External-facing meander orientation','Fabrication-confirmed stackup (total lengths include nominal jlcpcb_standard copper-center via depths only)','Return-leg gap screen covers opposing sampled chords, not arbitrary curve geometry','Reference-plane continuity, impedance and signal integrity']}
  writeFileSync(`${output}/report.json`,JSON.stringify(report,null,2))
  console.log(JSON.stringify({status:report.status,routes:routes.length,nativeChecks,failures:failures.length,report:`${output}/report.json`},null,2))
  // Fail closed: even geometry with no detected violations is not fully qualified.
  process.exitCode=1
} catch (error) {
  writeFileSync(`${output}/report.json`,JSON.stringify({status:'FAIL',qualified:false,electricalSignoff:false,scope:'Incomplete geometry screening; no electrical or fabrication signoff',failures:[...failures,{check:'incomplete or unsupported geometry',detail:String(error)}]},null,2))
  console.error(error)
  process.exitCode=1
}
