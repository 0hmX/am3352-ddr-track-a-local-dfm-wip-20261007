/** Real R188 pulldown pad is the HPD branch point; no intermediate signal via. */
export function CloudHpdEndpointRoutes(){return <group name="CloudHpdEndpointRoutes" pcbRelative>
 <via name="HPD_R188_PAD_VIP" pcbX={54.95} pcbY={-33} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .R_HDMI_REF_R188 > .pin2"/>
 <trace name="HDMI_HPD_ESD_TO_R188" from=".HDMI > .U_HDMI_ESD > .2" to="HPD_R188_PAD_VIP.top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".HDMI > .U_HDMI_ESD > .2",{x:54.95,y:-27.8},{x:53.35,y:-27.8},{x:52.45,y:-28.7},{x:52.45,y:-30.5},{x:54.95,y:-33},"HPD_R188_PAD_VIP.top"]]}/>
 </group>}
