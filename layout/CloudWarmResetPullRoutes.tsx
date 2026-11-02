import rows from '../data/cloud-warmrst-pull-routes.json'
const cpu=rows.find(r=>r.name==='cpu')!,pmic=rows.find(r=>r.name==='pmic')!,gate=rows.find(r=>r.name==='gate')!
const points=(r:any)=>r.points.map(([x,y]:number[])=>({x,y}))
/** Three existing actual terminals join the existing10k pull's actual signal pad; no intermediate signal via. */
export function CloudWarmResetPullRoutes(){return <group name="CloudWarmResetPullRoutes" pcbRelative>
 <via name="WARMRST_REAL_CPU" pcbX={-6.8} pcbY={.4} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .A10"/>
 <via name="WARMRST_REAL_PULL" pcbX={27.26} pcbY={-11.25} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .R_PWR3 > .pin1"/>
 <via name="WARMRST_REAL_GATE" pcbX={36.2} pcbY={-17.5} fromLayer="top" toLayer="inner4" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI_RESET > .2"/>
 <via name="WARMRST_REAL_PULL_RETURN" pcbX={27.81} pcbY={-11.25} fromLayer="inner1" toLayer="inner6" holeDiameter={.15} outerDiameter={.3} connectsTo="net.GND"/>
 <trace name="WARMRST_ENDPOINT_CPU_TO_R3" from="WARMRST_REAL_CPU.bottom" to="WARMRST_REAL_PULL.bottom" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[["WARMRST_REAL_CPU.bottom",...points(cpu),"WARMRST_REAL_PULL.bottom"]]}/>
 <trace name="WARMRST_ENDPOINT_PMIC_TO_R3" from=".Power_management > .U_PMIC > .26" to=".Power_management > .R_PWR3 > .pin1" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".Power_management > .U_PMIC > .26",...points(pmic),".Power_management > .R_PWR3 > .pin1"]]}/>
 <trace name="WARMRST_ENDPOINT_GATE_TO_R3" from="WARMRST_REAL_GATE.inner4" to="WARMRST_REAL_PULL.bottom" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[["WARMRST_REAL_GATE.inner4",...points(gate),"WARMRST_REAL_PULL.bottom"]]}/>
</group>}
