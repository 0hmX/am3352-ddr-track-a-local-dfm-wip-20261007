import routes from '../data/cloud-rn5-osc-routes.json'
/** Conditional real pull-down junction; oscillator/gate remain fixed, only centered pad signal vias. */
export function CloudOscEnablePullRoutes(){return <group name="CloudOscEnablePullRoutes" pcbRelative>
 <via name="OSC_ENABLE_GATE_PAD_VIP" pcbX={6.1375} pcbY={-17.95} fromLayer="top" toLayer="inner4" holeDiameter={.15} outerDiameter={.30} connectsTo=".Boot_and_clock > .U_CLOCK_GATE > .4"/>
 <via name="OSC_ENABLE_PULL_PAD_VIP" pcbX={4.865} pcbY={-11.9} fromLayer="top" toLayer="inner4" holeDiameter={.15} outerDiameter={.30} connectsTo=".Boot_and_clock > .R_CLOCK_OE_PD > .pin1"/>
 <trace name={routes[0].name} from="OSC_ENABLE_GATE_PAD_VIP.inner4" to="OSC_ENABLE_PULL_PAD_VIP.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[["OSC_ENABLE_GATE_PAD_VIP.inner4",...routes[0].points.map(([x,y])=>({x,y})),"OSC_ENABLE_PULL_PAD_VIP.inner4"]]}/>
 <trace name={routes[1].name} from=".Boot_and_clock > .Y_SOC > .1" to=".Boot_and_clock > .R_CLOCK_OE_PD > .pin1" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".Boot_and_clock > .Y_SOC > .1",...routes[1].points.map(([x,y])=>({x,y})),".Boot_and_clock > .R_CLOCK_OE_PD > .pin1"]]}/>
</group>}
