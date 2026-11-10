import {cloneElement} from "react"
import {mapNativeElements} from "./mapNativeElements"

// Literal native routes replace the affected mounted JSON-backed paths.
// Preserve nonzero wires; extend only selected pad-centered physical barrels.
const routes = {
  "CLOUD_LOCAL_28_PMIC_PGOOD": <trace name="CLOUD_LOCAL_28_PMIC_PGOOD" from=".Power_management > .U_PMIC > .8" to="STD_CLOUD_LOCAL_28_PMIC_PGOOD_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Power_management > .U_PMIC > .8", {"x":18.0625,"y":-2.6,"via":true,"fromLayer":"top","toLayer":"inner4"}, {"x":18.0625,"y":-2.6},
      {"x":17.32575,"y":-2.5999999999999996}, {"x":16.786731033840347,"y":-2.8232689661596524}, {"x":11,"y":-8.61},
      "STD_CLOUD_LOCAL_28_PMIC_PGOOD_END.inner4",
  ]]} />,
  "CLOUD_LOCAL_40_PWRONRST_N": <trace name="CLOUD_LOCAL_40_PWRONRST_N" from="STD_CLOUD_LOCAL_40_PWRONRST_N_BEGIN.inner4" to="STD_CLOUD_LOCAL_40_PWRONRST_N_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_LOCAL_40_PWRONRST_N_BEGIN.inner4", {"x":33.8625,"y":4.05}, {"x":33.8625,"y":-9.049999999999999},
      {"x":34.262499999999996,"y":-9.45}, {"x":41.8625,"y":-9.45}, "STD_CLOUD_LOCAL_40_PWRONRST_N_END.inner4",
  ]]} />,
  "CLOUD_LOCAL_41_TMS": <trace name="CLOUD_LOCAL_41_TMS" from="STD_CLOUD_LOCAL_41_TMS_BEGIN.inner2" to="STD_CLOUD_LOCAL_41_TMS_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_LOCAL_41_TMS_BEGIN.inner2", {"x":-5.2,"y":1.2000000000000002}, {"x":-15.799989285987598,"y":11.799989285987598},
      {"x":-16.01,"y":12.307}, {"x":-16.01,"y":13}, "STD_CLOUD_LOCAL_41_TMS_END.inner2",
  ]]} />,
  "CLOUD_LOCAL_46_TRST_N": <trace name="CLOUD_LOCAL_46_TRST_N" from="STD_CLOUD_LOCAL_46_TRST_N_BEGIN.inner2" to="STD_CLOUD_LOCAL_46_TRST_N_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_LOCAL_46_TRST_N_BEGIN.inner2", {"x":-6,"y":0.4}, {"x":-18.51,"y":12.910000000000002},
      {"x":-18.51,"y":13}, "STD_CLOUD_LOCAL_46_TRST_N_END.inner2",
  ]]} />,
  "CLOUD_LOCAL_54_I2C0_SCL": <trace name="CLOUD_LOCAL_54_I2C0_SCL" from="STD_CLOUD_LOCAL_54_I2C0_SCL_BEGIN.inner4" to=".Power_management > .U_PMIC > .3" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_LOCAL_54_I2C0_SCL_BEGIN.inner4", {"x":44.75006,"y":-31.20008,"layer":"inner4"}, {"x":44.75006,"y":-28.97506,"layer":"inner4"},
      {"x":37.525,"y":-21.75,"layer":"inner4"}, {"x":28.15,"y":-21.75,"layer":"inner4"}, {"x":18.7,"y":-12.3,"layer":"inner4"},
      {"x":18.7,"y":0.1999999999999993,"layer":"inner4"}, {"x":18.25,"y":0.65,"layer":"inner4"}, {"x":17.974999999999998,"y":0.65,"layer":"inner4"},
      {"x":17.65,"y":0.3249999999999993,"layer":"inner4"}, {"x":17.65,"y":-0.3749999999999979,"layer":"inner4"}, {"x":17.875,"y":-0.6,"layer":"inner4"},
      {"x":18.0625,"y":-0.6,"layer":"inner4"}, ".Power_management > .U_PMIC > .3",
  ]]} />,
  "CLOUD_LOCAL_57_PWRONRST_N": <trace name="CLOUD_LOCAL_57_PWRONRST_N" from="STD_CLOUD_LOCAL_57_PWRONRST_N_BEGIN.inner2" to="STD_CLOUD_LOCAL_57_PWRONRST_N_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_LOCAL_57_PWRONRST_N_BEGIN.inner2", {"x":-1.1375,"y":18.95}, {"x":-1.1375,"y":17.479000000000003},
      {"x":-1.0385,"y":17.380000000000003}, {"x":-0.8074999999999999,"y":17.380000000000003}, {"x":-0.8074999999999999,"y":17.22216346153846},
      {"x":-0.7398557692307676,"y":17.15451923076923}, {"x":-0.4601284965034953,"y":17.15451923076923}, {"x":-0.3147727272727263,"y":17.00916346153846},
      {"x":-0.3147727272727263,"y":16.815355769230766}, {"x":-0.1694169580419573,"y":16.669999999999998}, {"x":5.767325581395349,"y":16.669999999999998},
      {"x":5.767325581395349,"y":16.556634615384613}, {"x":6.146945214669053,"y":16.556634615384613}, {"x":6.236627906976745,"y":16.46695192307692},
      {"x":6.236627906976745,"y":16.347375}, {"x":6.326310599284437,"y":16.257692307692306}, {"x":6.616247540250448,"y":16.257692307692306},
      {"x":6.70593023255814,"y":16.168009615384616}, {"x":6.70593023255814,"y":16.037220930232557}, {"x":6.784401162790698,"y":15.95875},
      {"x":6.889029069767442,"y":15.95875}, {"x":6.9675,"y":15.880279069767441}, {"x":6.9675,"y":15.749490384615385},
      {"x":7.057182692307692,"y":15.659807692307693}, {"x":7.3202010286225425,"y":15.659807692307693}, {"x":7.409883720930234,"y":15.570125},
      {"x":7.409883720930234,"y":15.450548076923077}, {"x":7.499566413237926,"y":15.360865384615385}, {"x":7.789503354203938,"y":15.360865384615385},
      {"x":7.87918604651163,"y":15.271182692307693}, {"x":7.87918604651163,"y":15.15160576923077}, {"x":7.968868738819322,"y":15.061923076923078},
      {"x":8.258805679785329,"y":15.061923076923078}, {"x":8.348488372093021,"y":14.972240384615386}, {"x":8.348488372093021,"y":14.852663461538462},
      {"x":8.438171064400713,"y":14.76298076923077}, {"x":8.728108005366725,"y":14.76298076923077}, {"x":8.817790697674418,"y":14.673298076923079},
      {"x":8.817790697674418,"y":14.553721153846155}, {"x":8.907473389982112,"y":14.464038461538461}, {"x":9.250317307692308,"y":14.464038461538461},
      {"x":9.34,"y":14.37435576923077}, {"x":9.34,"y":14.254778846153846}, {"x":9.429682692307692,"y":14.165096153846154},
      {"x":9.666712656529517,"y":14.165096153846154}, {"x":9.75639534883721,"y":14.075413461538462}, {"x":9.75639534883721,"y":13.955836538461538},
      {"x":9.846078041144901,"y":13.866153846153846}, {"x":10.136014982110911,"y":13.866153846153846}, {"x":10.225697674418605,"y":13.776471153846153},
      {"x":10.225697674418605,"y":13.656894230769229}, {"x":10.315380366726298,"y":13.567211538461537}, {"x":10.82,"y":13.567211538461537},
      {"x":10.82,"y":4.449999999999999}, {"x":11.22,"y":4.049999999999999}, {"x":33.8625,"y":4.049999999999999},
      "STD_CLOUD_LOCAL_57_PWRONRST_N_END.inner2",
  ]]} />,
  "CLOUD_LOCAL_0_NEXT_UART0_RX": <trace name="CLOUD_LOCAL_0_NEXT_UART0_RX" from=".Processor > .U1 > .E15" to="STD_CLOUD_LOCAL_0_NEXT_UART0_RX_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .E15", {"x":-3.6,"y":4.4,"via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":-3.6,"y":4.4},
      {"x":-3.6,"y":13.6}, {"x":-3.2,"y":14}, {"x":1,"y":14},
      "STD_CLOUD_LOCAL_0_NEXT_UART0_RX_END.inner2",
  ]]} />,
  "CLOUD_LOCAL_1_NEXT_MMC0_DAT3": <trace name="CLOUD_LOCAL_1_NEXT_MMC0_DAT3" from=".Processor > .U1 > .F17" to="STD_CLOUD_LOCAL_1_NEXT_MMC0_DAT3_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .F17", {"x":-2.8000000000000003,"y":6,"via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":-2.8000000000000003,"y":6},
      {"x":-3.115,"y":5.685000000000003}, {"x":-3.25,"y":5.359081169079637}, {"x":-3.25,"y":4.050000000000004},
      {"x":-3.9499999999999993,"y":4.050000000000004}, {"x":-4.579999999999998,"y":4.680000000000003}, {"x":-4.849999999999998,"y":5.331837661840738},
      {"x":-4.849999999999998,"y":6.350000000000001}, {"x":-5.129999999999999,"y":6.350000000000001}, {"x":-5.334852813742386,"y":6.4348528137423875},
      {"x":-9.25,"y":10.350000000000001}, {"x":-10.149999999999999,"y":10.350000000000001}, {"x":-10.25,"y":10.450000000000003},
      {"x":-10.349999999999998,"y":10.450000000000003}, {"x":-13.75,"y":13.850000000000001}, {"x":-19.35,"y":13.850000000000001},
      {"x":-19.35,"y":11.800000000000006}, {"x":-19.63284271247462,"y":11.117157287525387}, {"x":-21.790900974233026,"y":8.959099025766978},
      {"x":-21.95,"y":8.575000000000005}, {"x":-21.95,"y":8.050000000000004}, {"x":-22,"y":8},
      {"x":-21.99,"y":8}, "STD_CLOUD_LOCAL_1_NEXT_MMC0_DAT3_END.inner2",
  ]]} />,
  "CLOUD_LOCAL_2_NEXT_MMC0_DAT3": <trace name="CLOUD_LOCAL_2_NEXT_MMC0_DAT3" from=".Processor > .U1 > .F17" to="STD_CLOUD_LOCAL_2_NEXT_MMC0_DAT3_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .F17", {"x":-2.8000000000000003,"y":6,"via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":-2.8000000000000003,"y":6},
      {"x":-2.8000000000000003,"y":4.029}, {"x":-2.7010000000000005,"y":3.9299999999999997}, {"x":-2.4700000000000006,"y":3.9299999999999997},
      {"x":-2.4700000000000006,"y":3.695325602944798}, {"x":-2.3299999999999996,"y":3.695325602944798}, {"x":-2.3299999999999996,"y":3.3975976808834396},
      {"x":-2.4575976808834388,"y":3.2700000000000005}, {"x":-3.354999999999998,"y":3.2700000000000005}, {"x":-3.354999999999998,"y":3.13},
      {"x":-3.9299999999999997,"y":3.13}, {"x":-3.9299999999999997,"y":0.9339551298552213}, {"x":-4.063955129855221,"y":0.8},
      {"x":-4.65,"y":0.8}, {"x":-4.8,"y":0.65}, {"x":-4.8,"y":-0.17823520916158986},
      {"x":-5.05,"y":-0.42823520916158986}, {"x":-11.674999999999999,"y":-0.42823520916158986}, {"x":-11.674999999999999,"y":-6.805999999999999},
      {"x":-11.575999999999999,"y":-6.904999999999999}, {"x":-11.443999999999997,"y":-6.904999999999999}, {"x":-11.344999999999997,"y":-7.004},
      {"x":-11.344999999999997,"y":-15.076}, {"x":-11.443999999999997,"y":-15.175}, {"x":-11.674999999999999,"y":-15.175},
      "STD_CLOUD_LOCAL_2_NEXT_MMC0_DAT3_END.inner2",
  ]]} />,
  "CLOUD_LOCAL_LAYERED_9_NEXT_I2C0_SCL": <trace name="CLOUD_LOCAL_LAYERED_9_NEXT_I2C0_SCL" from=".Processor > .U1 > .C16" to="STD_CLOUD_LOCAL_LAYERED_9_NEXT_I2C0_SCL_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .C16", {"x":-5.2,"y":5.2,"via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":-5.2,"y":5.2,"layer":"inner2"},
      {"x":-5.2,"y":5.699999999999999,"layer":"inner2"}, {"x":-7.95,"y":8.45,"layer":"inner2"}, "STD_CLOUD_LOCAL_LAYERED_9_NEXT_I2C0_SCL_END.inner2",
  ]]} />,
  "CLOUD_LOCAL_GATE_0_NEXT_PMIC_PGOOD": <trace name="CLOUD_LOCAL_GATE_0_NEXT_PMIC_PGOOD" from=".Boot_and_clock > .U_CLOCK_GATE > .2" to="STD_CLOUD_LOCAL_GATE_0_NEXT_PMIC_PGOOD_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Boot_and_clock > .U_CLOCK_GATE > .2", {"x":3.8625,"y":-17,"via":true,"fromLayer":"top","toLayer":"bottom"}, {"x":3.8625,"y":-17},
      {"x":3.8625,"y":-14.399999999999999}, {"x":5.312499999999999,"y":-12.95}, {"x":7.312500000000001,"y":-12.95},
      {"x":7.5125,"y":-12.75}, {"x":7.5125,"y":-12.3}, {"x":7.5125,"y":-12.3,"via":true,"fromLayer":"bottom","toLayer":"inner2"},
      {"x":7.5125,"y":-12.3}, {"x":8.15,"y":-11.6625}, {"x":9.7,"y":-11.6625},
      {"x":11,"y":-10.3625}, {"x":11,"y":-8.61}, "STD_CLOUD_LOCAL_GATE_0_NEXT_PMIC_PGOOD_END.inner2",
  ]]} />,
}

export function applyControlEndpointRoutes(node:any):any {
 const board=mapNativeElements(node,element=>element.type==='trace'&&Object.hasOwn(routes,element.props.name)?routes[element.props.name as keyof typeof routes]:element)
 return cloneElement(board,{children:<>{board.props.children}
    <via name="STD_CLOUD_LOCAL_28_PMIC_PGOOD_END" pcbX={11} pcbY={-8.61} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Boot_and_clock > .R_PGOOD_RAW > .pin1">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_40_PWRONRST_N_BEGIN" pcbX={33.8625} pcbY={4.05} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_RESET > .3">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_40_PWRONRST_N_END" pcbX={41.8625} pcbY={-9.45} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_RAMP > .3">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_41_TMS_BEGIN" pcbX={-5.2} pcbY={1.2000000000000002} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .C11">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_41_TMS_END" pcbX={-16.01} pcbY={13} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Debug_and_reset > .R_TMS > .pin1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_46_TRST_N_BEGIN" pcbX={-6} pcbY={0.4} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .B10">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_46_TRST_N_END" pcbX={-18.51} pcbY={13} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Debug_and_reset > .R_TRST_N > .pin1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_54_I2C0_SCL_BEGIN" pcbX={44.75006} pcbY={-31.20008} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .12">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_57_PWRONRST_N_BEGIN" pcbX={-1.1375} pcbY={18.95} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Boot_and_clock > .U_RESET_DELAY > .1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_57_PWRONRST_N_END" pcbX={33.8625} pcbY={4.049999999999999} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_RESET > .3">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_0_NEXT_UART0_RX_END" pcbX={1} pcbY={14} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".UART_debug > .TP_UART_3 > .1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_1_NEXT_MMC0_DAT3_END" pcbX={-21.99} pcbY={8} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".microSD > .R_SD_DAT3 > .pin2">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_2_NEXT_MMC0_DAT3_END" pcbX={-11.674999999999999} pcbY={-15.175} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".microSD > .J_MICROSD > .2">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_LAYERED_9_NEXT_I2C0_SCL_END" pcbX={-7.95} pcbY={8.45} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .R_PWR6 > .pin1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_LOCAL_GATE_0_NEXT_PMIC_PGOOD_END" pcbX={11} pcbY={-8.61} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Boot_and_clock > .R_PGOOD_RAW > .pin1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
 </>})
}
