import {cloneElement} from 'react'
import {mapNativeElements} from './mapNativeElements'
// Port affected mounted route bodies into literal TSX; preserve existing wires.
const routes={
"CLOUD_LOCAL_25_PMIC_PGOOD": <trace name="CLOUD_LOCAL_25_PMIC_PGOOD" from="STD_NUDGE_CLOUD_LOCAL_25_PMIC_PGOOD_BEGIN.inner4" to=".Debug_status > .R_PG_SENSE > .pin1" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_NUDGE_CLOUD_LOCAL_25_PMIC_PGOOD_BEGIN.inner4", {"x":4.1125,"y":10.2,"layer":"inner4"}, {"x":4.3625,"y":10.45,"layer":"inner4"},
      {"x":4.3625,"y":10.5,"layer":"inner4"}, {"x":4.3625,"y":10.5}, {"x":4.362500000000001,"y":11.676},
      {"x":4.079657287525381,"y":12.358842712474619}, {"x":-0.6114999999999999,"y":17.05}, {"x":-0.6114999999999999,"y":17.05,"via":true,"fromLayer":"inner4","toLayer":"bottom"},
      ".Debug_status > .R_PG_SENSE > .pin1",
]]}/>,
"CLOUD_LOCAL_26_MMC0_DAT1": <trace name="CLOUD_LOCAL_26_MMC0_DAT1" from=".Processor > .U1 > .G15" to="STD_NUDGE_CLOUD_LOCAL_26_MMC0_DAT1_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .G15", {"x":-2,"y":4.4,"via":true,"fromLayer":"top","toLayer":"inner4"}, {"x":-2,"y":4.4},
      {"x":-5.6899999999999995,"y":4.4}, {"x":-6.372842712474619,"y":4.117157287525381}, {"x":-9.49,"y":1},
      {"x":-9.49,"y":1,"layer":"inner4"}, {"x":-9.49,"y":0.625,"layer":"inner4"}, "STD_NUDGE_CLOUD_LOCAL_26_MMC0_DAT1_END.inner4",
]]}/>,
"CLOUD_LOCAL_36_PMIC_INT_N": <trace name="CLOUD_LOCAL_36_PMIC_INT_N" from=".Power_management > .U_PMIC > .45" to="STD_NUDGE_CLOUD_LOCAL_36_PMIC_INT_N_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Power_management > .U_PMIC > .45", {"x":20,"y":0.9375,"layer":"inner2","via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":20,"y":0.9375,"layer":"inner2"},
      {"x":20,"y":1.15,"layer":"inner2"}, {"x":19.775,"y":1.375,"layer":"inner2"}, {"x":13.65,"y":1.375,"layer":"inner2"},
      {"x":13.46,"y":1.185,"layer":"inner2"}, {"x":8.875,"y":1.185,"layer":"inner2"}, {"x":8.875,"y":1.185,"layer":"inner2"},
      {"x":8.775,"y":1.085,"layer":"inner2"}, {"x":8.625,"y":1.085,"layer":"inner2"}, "STD_NUDGE_CLOUD_LOCAL_36_PMIC_INT_N_END.inner2",
]]}/>,
"CLOUD_LOCAL_61_RTC_RESET_N": <trace name="CLOUD_LOCAL_61_RTC_RESET_N" from="RTC_RESET_CPU_THROUGH.inner4" to="STD_NUDGE_CLOUD_LOCAL_61_RTC_RESET_N_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "RTC_RESET_CPU_THROUGH.inner4", {"x":-6,"y":-3.6}, {"x":-4.898492424049175,"y":-2.498492424049177},
      {"x":-4.75,"y":-2.1400000000000006}, {"x":-4.75,"y":-1.6499999999999986}, {"x":-4.329999999999999,"y":-1.6499999999999986},
      {"x":-4.02272077938642,"y":-1.5227207793864197}, {"x":-3.2772792206135772,"y":-0.7772792206135775}, {"x":-3.1499999999999986,"y":-0.4699999999999982},
      {"x":-3.1499999999999986,"y":-0.04999999999999716}, {"x":-2.6348528137423832,"y":-0.04999999999999716}, {"x":-2.4899999999999975,"y":0.0100000000000037},
      {"x":-2.4099999999999975,"y":0.09000000000000483}, {"x":-2.349999999999998,"y":0.23485281374239184}, {"x":-2.349999999999998,"y":0.75},
      {"x":-1.7899999999999974,"y":1.310000000000003}, {"x":-1.5499999999999972,"y":1.889411254969548}, {"x":-1.5499999999999972,"y":7.150000000000006},
      {"x":-1.5,"y":7.200000000000003}, {"x":-1.5,"y":17.400000000000006}, {"x":0.46514718625761453,"y":17.400000000000006},
      {"x":0.6100000000000005,"y":17.340000000000003}, {"x":0.6900000000000002,"y":17.260000000000005}, {"x":0.8348528137423862,"y":17.200000000000003},
      {"x":1.45,"y":17.200000000000003}, {"x":1.9621320343559643,"y":16.98786796564404}, {"x":2.467157287525381,"y":16.48284271247462},
      {"x":3.15,"y":16.200000000000003}, {"x":5.5500000000000025,"y":16.200000000000003}, {"x":6.232842712474621,"y":15.917157287525383},
      {"x":8.512114177668622,"y":13.637885822331379}, {"x":8.845,"y":13.5}, {"x":9.300000000000004,"y":13.5},
      {"x":11.300000000000004,"y":11.5}, {"x":11.400000000000006,"y":11.5}, {"x":11.4,"y":11.475},
      {"x":11.4,"y":11.475,"layer":"inner4"}, {"x":11.325000000000001,"y":11.4,"layer":"inner4"}, {"x":11.3,"y":11.4,"layer":"inner4"},
      "STD_NUDGE_CLOUD_LOCAL_61_RTC_RESET_N_END.inner4",
]]}/>,
"CLOUD_LOCAL_COMPACT_6_NEXT_MMC0_DAT0": <trace name="CLOUD_LOCAL_COMPACT_6_NEXT_MMC0_DAT0" from=".Processor > .U1 > .G16" to="STD_NUDGE_CLOUD_LOCAL_COMPACT_6_NEXT_MMC0_DAT0_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .G16", {"x":-2,"y":5.2,"via":true,"fromLayer":"top","toLayer":"inner4"}, {"x":-2,"y":5.2},
      {"x":-2.231,"y":4.969}, {"x":-2.4700071426749366,"y":4.87}, {"x":-11.105294372515225,"y":4.87},
      {"x":-11.394999999999996,"y":4.75}, {"x":-11.554999999999998,"y":4.59}, {"x":-11.674999999999997,"y":4.3002943725152285},
      {"x":-11.674999999999997,"y":-9.675}, {"x":-11.674999999999997,"y":-9.675,"layer":"inner4"}, {"x":-11.674999999999997,"y":-10.075000000000001,"layer":"inner4"},
      "STD_NUDGE_CLOUD_LOCAL_COMPACT_6_NEXT_MMC0_DAT0_END.inner4",
]]}/>,
"RN6_INPUT_HDMI_VSYNC": <trace name="RN6_INPUT_HDMI_VSYNC" from=".Processor > .U1 > .U5" to="STD_NUDGE_RN6_INPUT_HDMI_VSYNC_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .U5", {"x":6,"y":-3.6,"via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":6,"y":-3.6,"layer":"inner2"},
      {"x":6.4125,"y":-4.0125,"layer":"inner2"}, {"x":6.4125,"y":-4.6508,"layer":"inner2"}, {"x":6.55,"y":-4.7883,"layer":"inner2"},
      {"x":6.9883,"y":-4.7883,"layer":"inner2"}, {"x":9.475,"y":-7.275,"layer":"inner2"}, {"x":9.725,"y":-7.275,"layer":"inner2"},
      {"x":9.85,"y":-7.4,"layer":"inner2"}, {"x":9.85,"y":-9.075,"layer":"inner2"}, {"x":10.15,"y":-9.375,"layer":"inner2"},
      {"x":10.15,"y":-9.475,"layer":"inner2"}, {"x":10.15,"y":-9.475,"layer":"inner2"}, {"x":10.125,"y":-9.5,"layer":"inner2"},
      {"x":10.1,"y":-9.5,"layer":"inner2"}, "STD_NUDGE_RN6_INPUT_HDMI_VSYNC_END.inner2",
]]}/>,
"CLOUD_RN0_NEAR_HDMI_D17": <trace name="CLOUD_RN0_NEAR_HDMI_D17" from=".HDMI > .U_HDMI > .42" to="STD_NUDGE_CLOUD_RN0_NEAR_HDMI_D17_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".HDMI > .U_HDMI > .42", {"x":42.249938,"y":-22.29992,"via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":42.249938,"y":-22.29992,"layer":"inner2"},
      {"x":42.249938,"y":-21.9,"layer":"inner2"}, {"x":42.149938,"y":-21.8,"layer":"inner2"}, {"x":41.3,"y":-21.8,"layer":"inner2"},
      {"x":36.8,"y":-17.3,"layer":"inner2"}, {"x":36.8,"y":-0.8,"layer":"inner2"}, {"x":33.6,"y":2.4,"layer":"inner2"},
      {"x":10.375,"y":2.4,"layer":"inner2"}, {"x":10.025,"y":2.75,"layer":"inner2"}, {"x":10.025,"y":2.75,"layer":"inner2"},
      {"x":10.025,"y":2.825,"layer":"inner2"}, "STD_NUDGE_CLOUD_RN0_NEAR_HDMI_D17_END.inner2",
]]}/>,
}
export function withCpuPeripheralThroughNudges(node:any):any{
 const board=mapNativeElements(node,e=>e.type==='trace'&&Object.hasOwn(routes,e.props.name)?routes[e.props.name as keyof typeof routes]:e)
 return cloneElement(board,{children:<>{board.props.children}
<via name="STD_NUDGE_CLOUD_LOCAL_25_PMIC_PGOOD_BEGIN" pcbX={4.1125} pcbY={10.2} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .U_RTC_POR_GATE > .2"><port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/></via>
<via name="STD_NUDGE_CLOUD_LOCAL_26_MMC0_DAT1_END" pcbX={-9.49} pcbY={0.625} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".microSD > .R_SD_DAT1 > .pin2"><port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/></via>
<via name="STD_NUDGE_CLOUD_LOCAL_36_PMIC_INT_N_END" pcbX={8.625} pcbY={1.085} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .R_PWR4 > .pin1"><port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/></via>
<via name="STD_NUDGE_CLOUD_LOCAL_61_RTC_RESET_N_END" pcbX={11.3} pcbY={11.4} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .U_RTC_RESET_DELAY > .8"><port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/></via>
<via name="STD_NUDGE_CLOUD_LOCAL_COMPACT_6_NEXT_MMC0_DAT0_END" pcbX={-11.674999999999997} pcbY={-10.075000000000001} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".microSD > .J_MICROSD > .7"><port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/></via>
<via name="STD_NUDGE_RN6_INPUT_HDMI_VSYNC_END" pcbX={10.1} pcbY={-9.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .RN_HDMI_6 > .4"><port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/></via>
<via name="STD_NUDGE_CLOUD_RN0_NEAR_HDMI_D17_END" pcbX={10.025} pcbY={2.825} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .RN_HDMI_0 > .6"><port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/></via>
<trace name="STD_NUDGE_CLOUD_LOCAL_25_PMIC_PGOOD_BEGIN_PAD" from=".Power_management > .U_RTC_POR_GATE > .2" to="STD_NUDGE_CLOUD_LOCAL_25_PMIC_PGOOD_BEGIN.top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".Power_management > .U_RTC_POR_GATE > .2", {"x":4.3625,"y":10.5,"layer":"top"}, {"x":4.1125,"y":10.25,"layer":"top"}, {"x":4.1125,"y":10.2,"layer":"top"}, "STD_NUDGE_CLOUD_LOCAL_25_PMIC_PGOOD_BEGIN.top"]]}/>
<trace name="STD_NUDGE_CLOUD_LOCAL_26_MMC0_DAT1_END_PAD" from=".microSD > .R_SD_DAT1 > .pin2" to="STD_NUDGE_CLOUD_LOCAL_26_MMC0_DAT1_END.top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".microSD > .R_SD_DAT1 > .pin2", {"x":-9.49,"y":1,"layer":"top"}, {"x":-9.49,"y":0.625,"layer":"top"}, "STD_NUDGE_CLOUD_LOCAL_26_MMC0_DAT1_END.top"]]}/>
<trace name="STD_NUDGE_CLOUD_LOCAL_36_PMIC_INT_N_END_PAD" from=".Power_management > .R_PWR4 > .pin1" to="STD_NUDGE_CLOUD_LOCAL_36_PMIC_INT_N_END.top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".Power_management > .R_PWR4 > .pin1", {"x":8.875,"y":1.185,"layer":"top"}, {"x":8.775,"y":1.085,"layer":"top"}, {"x":8.625,"y":1.085,"layer":"top"}, "STD_NUDGE_CLOUD_LOCAL_36_PMIC_INT_N_END.top"]]}/>
<trace name="STD_NUDGE_CLOUD_LOCAL_61_RTC_RESET_N_END_PAD" from=".Power_management > .U_RTC_RESET_DELAY > .8" to="STD_NUDGE_CLOUD_LOCAL_61_RTC_RESET_N_END.top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".Power_management > .U_RTC_RESET_DELAY > .8", {"x":11.4,"y":11.475,"layer":"top"}, {"x":11.325000000000001,"y":11.4,"layer":"top"}, {"x":11.3,"y":11.4,"layer":"top"}, "STD_NUDGE_CLOUD_LOCAL_61_RTC_RESET_N_END.top"]]}/>
<trace name="STD_NUDGE_CLOUD_LOCAL_COMPACT_6_NEXT_MMC0_DAT0_END_PAD" from=".microSD > .J_MICROSD > .7" to="STD_NUDGE_CLOUD_LOCAL_COMPACT_6_NEXT_MMC0_DAT0_END.top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".microSD > .J_MICROSD > .7", {"x":-11.674999999999997,"y":-9.675,"layer":"top"}, {"x":-11.674999999999997,"y":-10.075000000000001,"layer":"top"}, "STD_NUDGE_CLOUD_LOCAL_COMPACT_6_NEXT_MMC0_DAT0_END.top"]]}/>
<trace name="STD_NUDGE_RN6_INPUT_HDMI_VSYNC_END_PAD" from=".HDMI > .RN_HDMI_6 > .4" to="STD_NUDGE_RN6_INPUT_HDMI_VSYNC_END.bottom" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".HDMI > .RN_HDMI_6 > .4", {"x":10.15,"y":-9.475,"layer":"bottom"}, {"x":10.125,"y":-9.5,"layer":"bottom"}, {"x":10.1,"y":-9.5,"layer":"bottom"}, "STD_NUDGE_RN6_INPUT_HDMI_VSYNC_END.bottom"]]}/>
<trace name="STD_NUDGE_CLOUD_RN0_NEAR_HDMI_D17_END_PAD" from=".HDMI > .RN_HDMI_0 > .6" to="STD_NUDGE_CLOUD_RN0_NEAR_HDMI_D17_END.top" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[".HDMI > .RN_HDMI_0 > .6", {"x":10.025,"y":2.75,"layer":"top"}, {"x":10.025,"y":2.825,"layer":"top"}, "STD_NUDGE_CLOUD_RN0_NEAR_HDMI_D17_END.top"]]}/>
</>})
}
