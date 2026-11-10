import {expect,test} from "bun:test"
import {Circuit} from "@tscircuit/core"
import {checkSurfacePourClearance} from "../scripts/check-surface-pour-clearance"

// Actual native TSX reproduces the pour's polygon offset around a round BGA pad.
async function roundPadFill(clearance:number){
 const c=new Circuit({platform:{partsEngineDisabled:true,netlistDrcChecksDisabled:true}})
 c.schematicDisabled=true
 c.add(<board width={8} height={8} layers={8} pcbRelative routingDisabled minTraceToPadEdgeClearance={.1} minPadEdgeToPadEdgeClearance={.1}>
  <net name="GND"/><net name="SIGNAL"/>
  <chip name="P1" pcbX={0} pcbY={0} pinLabels={{pin1:"SIGNAL"}} connections={{pin1:"net.SIGNAL"}} footprint={<footprint><smtpad portHints={["1"]} shape="circle" radius={.2} pcbX={0} pcbY={0}/></footprint>}/>
  <copperpour layer="top" connectsTo="net.GND" clearance={clearance} unbroken outline={[{x:-3,y:-3},{x:3,y:-3},{x:3,y:3},{x:-3,y:3}]}/>
 </board>)
 await c.renderUntilSettled()
 const records=c.getCircuitJson()as any[]
 expect(records.filter(r=>r.type.endsWith("_error"))).toEqual([])
 return checkSurfacePourClearance(records)
}

test("nominal 0.1mm pour offset reproduces an undersized BGA-pad gap",async()=>{
 const r=await roundPadFill(.1)
 expect(r.failures.length).toBeGreaterThan(0)
 expect(Math.min(...r.minimums.map(x=>x.minimumOtherNetCopperGapMm))).toBeLessThan(.1)
})

test("0.105mm source offset preserves the board's 0.1mm copper rule",async()=>{
 const r=await roundPadFill(.105)
 expect(r.failures).toEqual([])
 expect(Math.min(...r.minimums.map(x=>x.minimumOtherNetCopperGapMm))).toBeGreaterThanOrEqual(.1)
})

// The unnormalized checker reported ten false gaps, including zero.
import {renderMicronPourRepro} from "./micron-pour-repro"
test("micron-sized pour edges do not create phantom clearance failures",async()=>{
 const records=await renderMicronPourRepro()
 expect(records.filter(r=>r.type.endsWith("_error"))).toEqual([])
 const result=checkSurfacePourClearance(records)
 expect(result.failures).toEqual([])
 expect(Math.min(...result.minimums.map(x=>x.minimumOtherNetCopperGapMm))).toBeGreaterThan(.103)
})
