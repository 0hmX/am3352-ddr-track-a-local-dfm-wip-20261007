export function CloudResetPullEndpointRoutes(){return <group name="CloudResetPullEndpointRoutes" pcbRelative>
<via name="RESET_CPU_C18_PAD_VIP" pcbX={-5.2} pcbY={6.8} fromLayer="top" toLayer="inner2" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .C18"/>
<via name="RESET_PULL_PAD_VIP" pcbX={32.425} pcbY={13} fromLayer="top" toLayer="inner2" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .R_HDMI_RESET_GPIO_PU > .pin2"/>
<via name="RESET_CPU_REFERENCE_TIE" pcbX={-5.659619} pcbY={7.259619} fromLayer="inner1" toLayer="inner3" holeDiameter={.15} outerDiameter={.3} connectsTo="net.GND"/>

<trace name="RESET_ENDPOINT_CPU" from="RESET_CPU_C18_PAD_VIP.inner2" to="RESET_PULL_PAD_VIP.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[["RESET_CPU_C18_PAD_VIP.inner2", {"x": -5.2, "y": 6.8, "layer": "inner2"}, {"x": -5.3, "y": 6.9, "layer": "inner2"}, {"x": -5.3, "y": 15.300000000000004, "layer": "inner2"}, {"x": -0.1999999999999993, "y": 20.400000000000006, "layer": "inner2"}, {"x": 18.025000000000002, "y": 20.400000000000006, "layer": "inner2"}, {"x": 25.425000000000004, "y": 13.0, "layer": "inner2"}, {"x": 32.425, "y": 13, "layer": "inner2"}, "RESET_PULL_PAD_VIP.inner2"]]}/>
<trace name="RESET_ENDPOINT_GATE" from="RESET_PULL_PAD_VIP.top" to=".HDMI > .U_HDMI_RESET > .1" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[["RESET_PULL_PAD_VIP.top", {"x": 32.425, "y": 13, "layer": "top"}, {"x": 32.425, "y": -12.775, "layer": "top"}, {"x": 36.2, "y": -16.55, "layer": "top"}, ".HDMI > .U_HDMI_RESET > .1"]]}/>
<via name="RESET_R183_V3_PAD_FEED" pcbX={42.5} pcbY={-19.01} fromLayer="top" toLayer="inner5" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .R_HDMI_REF_R183 > .pin1"/>
</group>}
