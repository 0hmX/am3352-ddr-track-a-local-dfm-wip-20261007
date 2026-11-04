import data from '../data/cloud-sysboot11-routes.json'
/** Whole R11 relocation and real component-pad branch junctions; no intermediate signal vias. */
export function CloudSysboot11Routes(){return <group name="CloudSysboot11Routes" pcbRelative>
 <via name="SYS11_CPU_VIP" pcbX={6} pcbY={-4.4} fromLayer="top" toLayer="inner4" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .U4"/>
 <via name="SYS11_ARRAY_VIP" pcbX={6.5} pcbY={-10.225} fromLayer="bottom" toLayer="inner2" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .RN_HDMI_2 > .4"/>
 <via name="SYS11_STRAP_VIP" pcbX={7.4125} pcbY={-11.8125} fromLayer="top" toLayer="inner2" holeDiameter={.15} outerDiameter={.3} connectsTo=".Boot_and_clock > .R_BOOT11 > .pin1"/>
 <via name="SYS11_ARRAY_RETURN" pcbX={6.1} pcbY={-10.2} fromLayer="inner1" toLayer="inner6" holeDiameter={.15} outerDiameter={.3} connectsTo="net.GND"/>
 {data.routes.map((r,i)=>{const from=i===0?'SYS11_CPU_VIP.inner4':'SYS11_STRAP_VIP.inner2';const to=i===0?'SYS11_ARRAY_VIP.bottom':'SYS11_ARRAY_VIP.inner2';const points=i===0?r.points:[...r.points].reverse();return <trace key={i} name={r.name} from={from} to={to} width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[from,...points.map(([x,y])=>({x,y})),to]]}/>})}
 </group>}
