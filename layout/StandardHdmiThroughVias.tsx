import {mapNativeElements} from "./mapNativeElements"

// Affected mounted via definitions are literal native TSX, independent of
// historical route-data imports and span/placement mappers.
const vias = {
  "DDC_U15_VIP": <via name="DDC_U15_VIP" pcbX={46.24993} pcbY={-31.20008} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .15">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "DDC_U16_VIP": <via name="DDC_U16_VIP" pcbX={46.750056} pcbY={-31.20008} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .16">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "DDC_R147_VIP": <via name="DDC_R147_VIP" pcbX={41.51} pcbY={-32.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .R_HDMI_REF_R147 > .pin2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "DDC_R146_VIP": <via name="DDC_R146_VIP" pcbX={46} pcbY={-35.49} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .R_HDMI_REF_R146 > .pin2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "DDC_J16_VIP": <via name="DDC_J16_VIP" pcbX={59.69} pcbY={-31.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .J_HDMI > .16">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "DDC_J15_VIP": <via name="DDC_J15_VIP" pcbX={59.69} pcbY={-31} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .J_HDMI > .15">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CEC_U17_VIP": <via name="CEC_U17_VIP" pcbX={47.45008} pcbY={-30.500056} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .17">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CEC_J13_VIP": <via name="CEC_J13_VIP" pcbX={59.69} pcbY={-30} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .J_HDMI > .13">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CEC_DIODE_VIP": <via name="CEC_DIODE_VIP" pcbX={49.45} pcbY={-36} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .D_HDMI_CEC > .1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_HDMI_PVCC_1V2_0": <via name="PWR_V2_HDMI_PVCC_1V2_0" pcbX={47.45008} pcbY={-29.99993} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .18">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_HDMI_PVCC_1V2_2": <via name="PWR_V2_HDMI_PVCC_1V2_2" pcbX={49.5} pcbY={-32.01} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .C_HDMI_REF_C180 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_HDMI_AVCC_1V2_0": <via name="PWR_V2_HDMI_AVCC_1V2_0" pcbX={47.45008} pcbY={-27.500062} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .23">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_HDMI_AVCC_1V2_1": <via name="PWR_V2_HDMI_AVCC_1V2_1" pcbX={52.5} pcbY={-33.51} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .C_HDMI_REF_C181 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_HDMI_DVDD_1V2_1": <via name="PWR_V2_HDMI_DVDD_1V2_1" pcbX={49} pcbY={-24.01} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .C_HDMI_REF_C184 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_HDMI_DVDD_1V2_3": <via name="PWR_V2_HDMI_DVDD_1V2_3" pcbX={44.0875} pcbY={-19.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .FB_HDMI_FB9 > .1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V3_ADD_0": <via name="PWR_V3_ADD_0" pcbX={36.5} pcbY={-31.9125} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .FB_HDMI_FB12 > .1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V3_ADD_1": <via name="PWR_V3_ADD_1" pcbX={47.5} pcbY={-21.01} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .C_HDMI_REF_C188 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V3_ADD_2": <via name="PWR_V3_ADD_2" pcbX={42.49} pcbY={-32.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .C_HDMI_REF_C147 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V3_ADD_3": <via name="PWR_V3_ADD_3" pcbX={37} pcbY={-27.01} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .C_HDMI_REF_C150 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V3_ADD_4": <via name="PWR_V3_ADD_4" pcbX={45.49} pcbY={-21} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .C_HDMI_REF_C149 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_HDMI_1V2_0": <via name="PWR_V2_HDMI_1V2_0" pcbX={53.5} pcbY={-20.51} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .C_HDMI_REF_C145 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_HDMI_1V2_1": <via name="PWR_V2_HDMI_1V2_1" pcbX={49.99} pcbY={-17} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .C_HDMI_REF_C146 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_HDMI_1V2_3": <via name="PWR_V2_HDMI_1V2_3" pcbX={48.4125} pcbY={-34} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .FB_HDMI_FB10 > .2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_HDMI_1V2_4": <via name="PWR_V2_HDMI_1V2_4" pcbX={51} pcbY={-32.0875} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .FB_HDMI_FB11 > .2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_HDMI_1V2_5": <via name="PWR_V2_HDMI_1V2_5" pcbX={42.9125} pcbY={-34} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .FB_HDMI_FB13 > .2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_HDMI_1V2_6": <via name="PWR_V2_HDMI_1V2_6" pcbX={45.9125} pcbY={-19.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .FB_HDMI_FB9 > .2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "HDMIPWR_VIP_1": <via name="HDMIPWR_VIP_1" pcbX={57.75} pcbY={-15.275} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .C_HDMI_5V_OUT2 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "HDMIPWR_VIP_2": <via name="HDMIPWR_VIP_2" pcbX={59.5} pcbY={-15.01} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .R_HDMI_5V_TOP > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "HDMIPWR_VIP_3": <via name="HDMIPWR_VIP_3" pcbX={54.95} pcbY={-28.6} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI_ESD > .4">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "HDMIPWR_VIP_5": <via name="HDMIPWR_VIP_5" pcbX={56.99} pcbY={-31.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .C_HDMI_ESD_OUT > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "HDMIPWR_VIP_6": <via name="HDMIPWR_VIP_6" pcbX={46} pcbY={-36.51} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .R_HDMI_REF_R146 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "HDMIPWR_VIP_7": <via name="HDMIPWR_VIP_7" pcbX={40.49} pcbY={-32.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .R_HDMI_REF_R147 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "HDMI3V3_FEED_3": <via name="HDMI3V3_FEED_3" pcbX={44.5} pcbY={-33.51} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .C_HDMI_REF_C177 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "INT_R158_PAD_VIP": <via name="INT_R158_PAD_VIP" pcbX={25.26} pcbY={-21.75} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .R_HDMI_REF_R158 > .pin2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "RESET_R183_V3_PAD_FEED": <via name="RESET_R183_V3_PAD_FEED" pcbX={42.5} pcbY={-19.01} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .R_HDMI_REF_R183 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "REXT_U20_PAD_VIP": <via name="REXT_U20_PAD_VIP" pcbX={47.45008} pcbY={-28.999932} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .20">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "REXT_R177_PAD_VIP": <via name="REXT_R177_PAD_VIP" pcbX={47.49} pcbY={-32.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .R_HDMI_REF_R177 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "RN4_NEAR_ARRAY_7": <via name="RN4_NEAR_ARRAY_7" pcbX={19.525000000000002} pcbY={-16.749999999999996} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .RN_HDMI_4 > .7">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "D15_MID_VIA": <via name="D15_MID_VIA" pcbX={12.75} pcbY={-14.025} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3}>
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_HDMI_D0_V0": <via name="CLOUD_HDMI_D0_V0" pcbX={38.54992} pcbY={-28.999932} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .61">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_HDMI_D8_V0": <via name="CLOUD_HDMI_D8_V0" pcbX={38.54992} pcbY={-24.500068} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .52">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CLOUD_HDMI_D8_V1": <via name="CLOUD_HDMI_D8_V1" pcbX={39.8} pcbY={-23.55} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3}>
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
}

export function applyHdmiThroughVias(node:any):any {
  return mapNativeElements(node,element=>element.type==='via'&&Object.hasOwn(vias,element.props.name)?vias[element.props.name as keyof typeof vias]:element)
}
