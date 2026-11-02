/** Conditional original-map RN5 east topology. Requires the coordinated OSC24_OE replacement and whole R0/RN5 moves. */
const trunk=[[4.4,-6.8],[4.3,-6.9],[4.3,-12.95],[5.3,-13.95],[9.15,-13.95],[10.2,-15],[12.025,-15],[12.15,-15.125]]
const strap=[[11.85,-15.5],[11.85,-15.425],[12.15,-15.125]]
export function CloudSysboot0EastRoutes(){return <>
 <via name="SYS0_EAST_ARRAY_VIP" pcbX={12.15} pcbY={-15.125} fromLayer="bottom" toLayer="top" holeDiameter={.15} outerDiameter={.30} connectsTo=".HDMI > .RN_HDMI_5 > .2"/>
 <trace name="SYS0_CPU_ARRAY_TOP" from=".Processor > .U1 > .R1" to=".SYS0_EAST_ARRAY_VIP > .top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".Processor > .U1 > .R1",...trunk.map(([x,y])=>({x,y})),".SYS0_EAST_ARRAY_VIP > .top"]]}/>
 <trace name="SYS0_ARRAY_STRAP_TOP" from=".Boot_and_clock > .R_BOOT0 > .pin1" to=".SYS0_EAST_ARRAY_VIP > .top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".Boot_and_clock > .R_BOOT0 > .pin1",...strap.map(([x,y])=>({x,y})),".SYS0_EAST_ARRAY_VIP > .top"]]}/>
 </>}
