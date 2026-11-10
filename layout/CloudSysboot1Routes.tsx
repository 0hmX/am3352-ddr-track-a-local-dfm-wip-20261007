import data from '../data/cloud-sysboot1-routes.json'
/** Endpoint-only SYSBOOT1: CPU Top to real relocated R1, then Inner4 to RN4.2. */
export function CloudSysboot1Routes(){return <group name="CloudSysboot1Routes" pcbRelative>
 <via name="SYS1_R1_VIP" pcbX={11.7} pcbY={-7.04} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Boot_and_clock > .R_BOOT1 > .pin1"/>
 <via name="SYS1_RN4_VIP" pcbX={10.85} pcbY={-5.55} fromLayer="bottom" toLayer="inner4" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .RN_HDMI_4 > .2"/>

 {data.map((r,i)=>{const from=i===0?'.Processor > .U1 > .R2':'SYS1_RN4_VIP.inner4';const to=i===0?'SYS1_R1_VIP.top':'SYS1_R1_VIP.bottom';const points=i===0?r.points:[...r.points].reverse();return <trace key={i} name={'SYSBOOT1_RELOCATED_'+i} from={from} to={to} width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[from,...points.map(([x,y])=>({x,y})),to]]}/>})}
 </group>}
