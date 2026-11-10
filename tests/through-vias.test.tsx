import { expect, test } from "bun:test"
import { Circuit } from "@tscircuit/core"
import { checkThroughVias } from "../scripts/check-through-vias"
import { bindFrozenCopperRegion } from "../data/native-pour-region-adapter"

// Actual native TSX: the checker consumes rendered geometry, never a handmade
// Circuit JSON fixture. Each case occupies a separate part of the board.
async function fixture() {
  const circuit = new Circuit({platform:{partsEngineDisabled:true, netlistDrcChecksDisabled:true}})
  circuit.schematicDisabled = true
  circuit.add(<board width={40} height={30} outline={[{x:-20,y:-15},{x:20,y:-15},{x:20,y:15},{x:-20,y:15}]} layers={8} pcbRelative routingDisabled allowBlindAndBuriedVias isViaInPadAllowed
    minTraceToPadEdgeClearance={0.1} minPadEdgeToPadEdgeClearance={0.1}
    minViaHoleEdgeToViaHoleEdgeClearance={0.1} minPlatedHoleDrillEdgeToDrillEdgeClearance={0.15}>
    <net name="A" /><net name="B" />
    <via name="TRACE_CROSSING" pcbX={-10} pcbY={0} fromLayer="top" toLayer="inner1" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.A" />
    <via name="B_LEFT" pcbX={-11} pcbY={0} fromLayer="top" toLayer="bottom" connectsTo="net.B" />
    <via name="B_RIGHT" pcbX={-9} pcbY={0} fromLayer="top" toLayer="bottom" connectsTo="net.B" />
    <trace name="CROSSING" from=".B_LEFT > .bottom" to=".B_RIGHT > .bottom" width={0.1}
      pcbPath={['.B_LEFT > .bottom', {x:0,y:0,via:true,fromLayer:'bottom',toLayer:'inner6'}, {x:2,y:0}, {x:2,y:0,via:true,fromLayer:'inner6',toLayer:'bottom'}, '.B_RIGHT > .bottom']} />
    <via name="SAME_NET" pcbX={0} pcbY={0} fromLayer="top" toLayer="inner1" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.A" />
    <via name="SAME_NET_THROUGH" pcbX={0} pcbY={0} fromLayer="top" toLayer="bottom" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.A" />
    <via name="BURIED" pcbX={3} pcbY={0} fromLayer="inner2" toLayer="inner3" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.A" />
    <chip name="PAD" pcbX={3} pcbY={0} pinLabels={{pin1:'B'}} connections={{pin1:'net.B'}} footprint={<footprint><smtpad portHints={['1']} pcbX={0} pcbY={0} shape="rect" width={0.4} height={0.4} /></footprint>} />
    <via name="POUR_SHORT" pcbX={7} pcbY={0} fromLayer="top" toLayer="inner1" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.A" />
    <via name="POUR_HOLE" pcbX={10} pcbY={0} fromLayer="top" toLayer="inner1" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.A" />
    <copperpour name="FROZEN_B" layer="inner4" connectsTo="net.B" ref={p=>bindFrozenCopperRegion(p,'M6,-2L12,-2L12,2L6,2ZM9,-1L9,1L11,1L11,-1Z')} />
    <via name="FUTURE_A" pcbX={-4} pcbY={5} fromLayer="top" toLayer="inner1" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.A" />
    <via name="FUTURE_B" pcbX={-3.65} pcbY={5} fromLayer="top" toLayer="inner1" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.B" />
    <via name="CLEARANCE_A" pcbX={0} pcbY={5} fromLayer="top" toLayer="inner1" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.A" />
    <via name="CLEARANCE_B" pcbX={0.35} pcbY={5} fromLayer="top" toLayer="bottom" holeDiameter={0.15} outerDiameter={0.3} connectsTo="net.B" />
  </board>)
  await circuit.renderUntilSettled()
  const records = circuit.getCircuitJson() as any[]
  expect(records.filter(r=>r.type.endsWith('_error'))).toEqual([])
  return checkThroughVias(records)
}

test("through-via inventory detects other-net traces, SMT pads, pour copper and clearance; exempts same-net copper and pour holes", async () => {
  const report = await fixture()
  const at = (x: number, y=0) => report.inventory.find(v=>Math.abs(v.x-x)<1e-6 && v.y===y)!
  expect(at(-10).conflicts.some(c=>c.otherType==='pcb_trace' && c.layer==='inner6' && c.kind==='short')).toBe(true)
  expect(at(0).conflicts).toEqual([])
  expect(at(3).conflicts.some(c=>c.otherType==='pcb_smtpad' && c.layer==='top' && c.kind==='short')).toBe(true)
  expect(at(7).conflicts.some(c=>c.otherType==='pcb_copper_pour' && c.layer==='inner4' && c.kind==='short')).toBe(true)
  expect(at(10).conflicts).toEqual([])
  expect(at(0,5).conflicts.some(c=>c.kind==='clearance' && c.gapMm===0.05)).toBe(true)
  expect(report.simultaneousConflicts.some(c=>[c.a,c.b].includes(at(-4,5).id) && [c.a,c.b].includes(at(-3.65,5).id))).toBe(true)
  expect(report.batchSafeIds).not.toContain(at(-4,5).id)
  expect(report.batchSafeIds).toContain(at(10).id)
}, 30000)

test("a through barrel exposes an explicit inner-layer port without changing adjoining trace layers", async () => {
  const circuit = new Circuit({platform:{partsEngineDisabled:true, netlistDrcChecksDisabled:true}})
  circuit.schematicDisabled = true
  circuit.add(<board width={10} height={10} layers={8} pcbRelative routingDisabled>
    <net name="A" />
    <via name="LEFT" pcbX={-1} pcbY={0} fromLayer="top" toLayer="bottom" connectsTo="net.A"><port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)} /></via>
    <via name="RIGHT" pcbX={1} pcbY={0} fromLayer="top" toLayer="bottom" connectsTo="net.A"><port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)} /></via>
    <trace from="LEFT.inner4" to="RIGHT.inner4" width={.1} pcbPaths={[["LEFT.inner4",{x:0,y:0},{x:2,y:0},"RIGHT.inner4"]]} />
  </board>)
  await circuit.renderUntilSettled()
  const records = circuit.getCircuitJson() as any[]
  expect(records.filter(r=>r.type.endsWith('_error'))).toEqual([])
  expect(records.filter(r=>r.type==='pcb_via').every(v=>v.layers.length===8)).toBe(true)
  expect(records.filter(r=>r.type==='pcb_trace').flatMap(t=>t.route).every(p=>p.route_type==='wire' && p.layer==='inner4')).toBe(true)
}, 30000)

test("native pour regeneration clears a new through barrel on an inner layer", async () => {
  const circuit = new Circuit({platform:{partsEngineDisabled:true, netlistDrcChecksDisabled:true}})
  circuit.schematicDisabled = true
  circuit.add(<board width={12} height={12} layers={8} pcbRelative routingDisabled>
    <net name="A" /><net name="B" />
    <via name="A" pcbX={0} pcbY={0} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.A" />
    <via name="B" pcbX={3} pcbY={0} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.B" />
    <copperpour layer="inner4" connectsTo="net.B" unbroken clearance={.2} outline={[{x:-4,y:-4},{x:4,y:-4},{x:4,y:4},{x:-4,y:4}]} />
  </board>)
  await circuit.renderUntilSettled()
  const records = circuit.getCircuitJson() as any[]
  const pours = records.filter(r=>r.type==='pcb_copper_pour')
  expect(records.filter(r=>r.type.endsWith('_error'))).toEqual([])
  expect(pours).toHaveLength(1)
  expect(pours[0].brep_shape.inner_rings.length).toBeGreaterThan(0)
  const { checkCopperPourShorts } = await import('@tscircuit/checks')
  expect(checkCopperPourShorts(records)).toEqual([])
}, 30000)

test("pad-centered through barrels retain original SMT pin nets and contiguous inner routing", async () => {
  const circuit = new Circuit({platform:{partsEngineDisabled:true, netlistDrcChecksDisabled:true}})
  circuit.schematicDisabled = true
  circuit.add(<board width={10} height={10} layers={8} pcbRelative routingDisabled isViaInPadAllowed>
    <net name="A" />
    <chip name="P1" pcbX={-1} pcbY={0} pinLabels={{pin1:'A'}} connections={{pin1:'net.A'}} footprint={<footprint><smtpad portHints={['1']} pcbX={0} pcbY={0} shape="circle" radius={.2} /></footprint>} />
    <chip name="P2" pcbX={1} pcbY={0} pinLabels={{pin1:'A'}} footprint={<footprint><smtpad portHints={['1']} pcbX={0} pcbY={0} shape="circle" radius={.2} /></footprint>} />
    <via name="LEFT" pcbX={-1} pcbY={0} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".P1 > .pin1"><port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)} /></via>
    <via name="RIGHT" pcbX={1} pcbY={0} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".P2 > .pin1"><port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)} /></via>
    <trace from="LEFT.inner4" to="RIGHT.inner4" width={.1} pcbPaths={[["LEFT.inner4","RIGHT.inner4"]]} />
  </board>)
  await circuit.renderUntilSettled()
  const records=circuit.getCircuitJson() as any[]
  const {getFullConnectivityMapFromCircuitJson}=await import('circuit-json-to-connectivity-map')
  const {checkTracesAreContiguous,checkDanglingTraces}=await import('@tscircuit/checks')
  const component=records.find(r=>r.type==='source_component'&&r.name==='P2')
  const pin=records.find(r=>r.type==='source_port'&&r.source_component_id===component.source_component_id)
  const net=records.find(r=>r.type==='source_net'&&r.name==='A')
  expect(records.filter(r=>r.type.endsWith('_error'))).toEqual([])
  expect(getFullConnectivityMapFromCircuitJson(records).areIdsConnected(pin.source_port_id,net.source_net_id)).toBe(true)
  expect(checkTracesAreContiguous(records)).toEqual([])
  expect(checkDanglingTraces(records)).toEqual([])
  expect(records.filter(r=>r.type==='pcb_via').map(v=>v.layers.length)).toEqual([8,8])
  expect(records.filter(r=>r.type==='pcb_trace').flatMap(t=>t.route).every(p=>p.route_type==='wire'&&p.layer==='inner4')).toBe(true)
}, 30000)

test("a clearance-safe through extension can create a ground-reference gap", async () => {
  const {convert}=await import('../scripts/board-check-geometry')
  const {Point}=await import('@flatten-js/core')
  const {checkViaTraceClearance}=await import('@tscircuit/checks')
  async function groundCoversTrace(through:boolean){
    const circuit=new Circuit({platform:{partsEngineDisabled:true,netlistDrcChecksDisabled:true}})
    circuit.schematicDisabled=true
    circuit.add(<board width={10} height={10} layers={8} pcbRelative routingDisabled allowBlindAndBuriedVias
      minTraceToPadEdgeClearance={.1} minPadEdgeToPadEdgeClearance={.1}>
      <net name="A"/><net name="B"/><net name="GND"/>
      <via name="LEFT" pcbX={-1} pcbY={.325} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.A"/>
      <via name="RIGHT" pcbX={1} pcbY={.325} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.A"/>
      <via name="B" pcbX={0} pcbY={0} fromLayer="top" toLayer={through?'bottom':'inner5'} holeDiameter={.15} outerDiameter={.3} connectsTo="net.B"/>
      <via name="GROUND" pcbX={3} pcbY={3} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.GND"/>
      <trace from="LEFT.bottom" to="RIGHT.bottom" width={.1} pcbPaths={[["LEFT.bottom","RIGHT.bottom"]]}/>
      <copperpour layer="inner6" connectsTo="net.GND" unbroken clearance={.2} outline={[{x:-4,y:-4},{x:4,y:-4},{x:4,y:4},{x:-4,y:4}]}/>
    </board>)
    await circuit.renderUntilSettled()
    const records=circuit.getCircuitJson() as any[]
    expect(records.filter(r=>r.type.endsWith('_error'))).toEqual([])
    expect(checkViaTraceClearance(records)).toEqual([])
    return convert(records,{elementTypes:['pcb_copper_pour'],includeDrillHoles:false,strict:true,curveTolerance:1e-6}).elements.some((e:any)=>e.shapes.some((s:any)=>s.contains(new Point(0,.325))))
  }
  expect(await groundCoversTrace(false)).toBe(true)
  expect(await groundCoversTrace(true)).toBe(false)
},30000)


test("reproduces CLI success after a native physical connection is removed", async () => {
  const {mkdtempSync,mkdirSync,readFileSync,writeFileSync,rmSync}=await import('node:fs')
  const {resolve}=await import('node:path')
  mkdirSync('work/through-vias',{recursive:true})
  const directory=mkdtempSync(resolve('work/through-vias/connectivity-repro-'))
  async function render(connected:boolean){
    const circuit=new Circuit({platform:{partsEngineDisabled:true,netlistDrcChecksDisabled:true}})
    circuit.schematicDisabled=true
    circuit.add(<board width={10} height={10} layers={8} pcbRelative routingDisabled>
      <net name="PWR"/>
      <chip name="P1" pcbX={-1} pcbY={0} pinLabels={{pin1:'PWR'}} connections={{pin1:'net.PWR'}} footprint={<footprint><smtpad portHints={['1']} pcbX={0} pcbY={0} shape="circle" radius={.2}/></footprint>}/>
      <chip name="P2" pcbX={1} pcbY={0} pinLabels={{pin1:'PWR'}} connections={{pin1:'net.PWR'}} footprint={<footprint><smtpad portHints={['1']} pcbX={0} pcbY={0} shape="circle" radius={.2}/></footprint>}/>
      {connected&&<trace name="FEED" from=".P1 > .pin1" to=".P2 > .pin1" width={.1} pcbPaths={[[".P1 > .pin1",".P2 > .pin1"]]}/>}
    </board>)
    await circuit.renderUntilSettled()
    const records=circuit.getCircuitJson() as any[]
    expect(records.filter(r=>r.type.endsWith('_error'))).toEqual([])
    return records
  }
  try{
    const before=resolve(directory,'before.circuit.json'),after=resolve(directory,'after.circuit.json'),output=resolve(directory,'check')
    writeFileSync(before,JSON.stringify(await render(true)))
    writeFileSync(after,JSON.stringify(await render(false)))
    const child=Bun.spawn([process.execPath,'scripts/verify-board-routing.tsx','--json',after,'--baseline',before,'--output',output],{stdout:'ignore',stderr:'pipe'})
    const exit=await child.exited,report=JSON.parse(readFileSync(resolve(output,'report.json'),'utf8'))
    expect(report.baseline.connectivity.nets.find((n:any)=>n.name==='PWR').connected).toBe(true)
    expect(report.current.connectivity.nets.find((n:any)=>n.name==='PWR').physicalGroups).toBe(2)
    // Reproduces the current false-success exit; the stacked fix must change this to 1.
    expect(exit).toBe(0)
  }finally{rmSync(directory,{recursive:true,force:true})}
},30000)
