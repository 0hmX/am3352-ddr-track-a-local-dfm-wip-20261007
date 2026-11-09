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
