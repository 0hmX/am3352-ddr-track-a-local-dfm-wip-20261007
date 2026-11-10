import route from '../data/cloud-rext-route.json'
/** Original actual5.6k R177 unchanged; two real pad-centered signal vias, no midpoint. */
export function CloudRextOriginalRoutes(){return <group name="CloudRextOriginalRoutes" pcbRelative>
 <via name="REXT_U20_PAD_VIP" pcbX={47.45008} pcbY={-28.999932} fromLayer="top" toLayer="inner4" holeDiameter={.15} outerDiameter={.30} connectsTo=".HDMI > .U_HDMI > .20"/>
 <via name="REXT_R177_PAD_VIP" pcbX={47.49} pcbY={-32.5} fromLayer="top" toLayer="inner4" holeDiameter={.15} outerDiameter={.30} connectsTo=".HDMI > .R_HDMI_REF_R177 > .pin1"/>

 <trace name={route.name} from="REXT_U20_PAD_VIP.inner4" to="REXT_R177_PAD_VIP.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[["REXT_U20_PAD_VIP.inner4",...route.points.map(([x,y])=>({x,y})),"REXT_R177_PAD_VIP.inner4"]]}/>
</group>}
