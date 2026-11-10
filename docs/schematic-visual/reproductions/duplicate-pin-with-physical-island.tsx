/** @tscircuit/eval 0.0.1727: merging existing physical islands with local
 * bus traces duplicates ports in the schematic solver's connectivity map.
 * Set workaround=true to omit the redundant local bus connections. */
export default function DuplicatePinWithPhysicalIsland({ workaround = false }: { workaround?: boolean } = {}) {
  return <board routingDisabled schAutoLayoutEnabled={false}>
    <schematicsheet name="Bypass"/>
    {[1,3,5].map(i => <trace key={`physical${i}`} name={`PHYSICAL_ISLAND_${i}`} from={`.C${i} > .pin1`} to={`.C${i+1} > .pin1`}/>)}
    {!workaround && [[3,5],[1,3]].map(([a,b]) => <trace key={`local${a}`} path={[`.C${a} > .pin1`, "net.V3V3", `.C${b} > .pin1`]}/>)}
    {[1,2,3,4,5,6].map(i => <capacitor key={i} name={`C${i}`} capacitance="100nF" footprint="0402" schSheetName="Bypass" schX={(i-3.5)*2} schRotation={-90} connections={{pin1:"net.V3V3",pin2:"net.GND"}}/>)}
  </board>
}
