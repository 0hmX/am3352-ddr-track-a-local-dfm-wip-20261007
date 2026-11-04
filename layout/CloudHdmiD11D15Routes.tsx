/** HDMI_D15 (U_HDMI.44 -> RN_HDMI_3.5) and HDMI_D11 (U_HDMI.48 -> RN_HDMI_3.6).
 * D15: short top escape, top->inner5 via, inner5 run, inner5->bottom blind via, bottom run into RN_HDMI_3.5.
 * D11: pad-centered top->inner5 via, inner5 run, inner5->inner4 via, inner4 run, pad-centered bottom->inner4 via on RN_HDMI_3.6.
 * Neither touches the RN_HDMI_3 pin 1-4 side. */
const REL = ".Processor > .U1 > .A1"
const V = { holeDiameter: 0.15, outerDiameter: 0.3 }
const p = (layer: string, pts: [number, number][]) => pts.map(([x, y]) => ({ x, y, layer }))

export function CloudHdmiD11D15Routes() {
  return <group name="Cloud_HDMI_D11_D15_routes" pcbX={0} pcbY={0} pcbRelative>
    <via name="D15_TOP_VIA" pcbX={40.325} pcbY={-21.3} fromLayer="top" toLayer="inner5" {...V} />
    <via name="D15_MID_VIA" pcbX={12.75} pcbY={-14.025} fromLayer="inner5" toLayer="bottom" {...V} />
    <via name="D11_U_VIP" pcbX={39.25} pcbY={-22.3} fromLayer="top" toLayer="inner5" {...V} connectsTo=".HDMI > .U_HDMI > .48" />
    <via name="D11_MID_VIA" pcbX={8.15} pcbY={-20.575} fromLayer="inner5" toLayer="inner4" {...V} />
    <via name="D11_RN_VIP" pcbX={6.5} pcbY={-13.525} fromLayer="bottom" toLayer="inner4" {...V} connectsTo=".HDMI > .RN_HDMI_3 > .6" />
    <trace name="CLOUD_HDMI_D15_TOP" from=".HDMI > .U_HDMI > .44" to="D15_TOP_VIA.top" width={0.1} pcbPathRelativeTo={REL}
      pcbPaths={[[".HDMI > .U_HDMI > .44", ...p("top", [[41.25, -22.05], [40.5, -21.3]]), "D15_TOP_VIA.top"]]} />
    <trace name="CLOUD_HDMI_D15_INNER5" from="D15_TOP_VIA.inner5" to="D15_MID_VIA.inner5" width={0.1} pcbPathRelativeTo={REL}
      pcbPaths={[["D15_TOP_VIA.inner5", ...p("inner5", [[20.025, -21.3]]), "D15_MID_VIA.inner5"]]} />
    <trace name="CLOUD_HDMI_D15_BOTTOM" from="D15_MID_VIA.bottom" to=".HDMI > .RN_HDMI_3 > .5" width={0.1} pcbPathRelativeTo={REL}
      pcbPaths={[["D15_MID_VIA.bottom", ...p("bottom", [[12.25, -13.525]]), ".HDMI > .RN_HDMI_3 > .5"]]} />
    <trace name="CLOUD_HDMI_D11_INNER5" from="D11_U_VIP.inner5" to="D11_MID_VIA.inner5" width={0.1} pcbPathRelativeTo={REL}
      pcbPaths={[["D11_U_VIP.inner5", ...p("inner5", [[9.875, -22.3]]), "D11_MID_VIA.inner5"]]} />
    <trace name="CLOUD_HDMI_D11_INNER4" from="D11_MID_VIA.inner4" to="D11_RN_VIP.inner4" width={0.1} pcbPathRelativeTo={REL}
      pcbPaths={[["D11_MID_VIA.inner4", ...p("inner4", [[7.275, -19.7], [7.275, -14.3]]), "D11_RN_VIP.inner4"]]} />
  </group>
}
