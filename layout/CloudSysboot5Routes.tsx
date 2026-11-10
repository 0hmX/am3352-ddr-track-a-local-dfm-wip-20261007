import route from '../data/cloud-sys5-route.json'
/** Conditional original-map source route: no CPU via, one genuine R5 terminal through-via. */
export function CloudSysboot5TopRoutes(){return <>
 <via name="SYS5_STRAP_VIP" pcbX={8.6} pcbY={-5.2} fromLayer="bottom" toLayer="top" holeDiameter={.15} outerDiameter={.30} connectsTo=".Boot_and_clock > .R_BOOT5 > .pin1"/>
 <trace name="SYS5_CPU_STRAP_TOP" from=".Processor > .U1 > .T2" to=".SYS5_STRAP_VIP > .top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".Processor > .U1 > .T2",...route.points.map(([x,y])=>({x,y})),".SYS5_STRAP_VIP > .top"]]}/>
 <trace name="SYS5_STRAP_ARRAY_BOTTOM" from=".Boot_and_clock > .R_BOOT5 > .pin1" to=".HDMI > .RN_HDMI_4 > .3" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".Boot_and_clock > .R_BOOT5 > .pin1",{x:8.6,y:-5.2},{x:8.75,y:-5.05},{x:10.85,y:-5.05},".HDMI > .RN_HDMI_4 > .3"]]}/>

 </>}
