import {mapNativeElements} from "./mapNativeElements"

// Affected mounted via definitions are literal native TSX, independent of
// historical route-data imports and span/placement mappers.
const vias = {
  "INPUT_VIP_1": <via name="INPUT_VIP_1" pcbX={12.290000000000001} pcbY={19.1} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_input > .C_RAW_NOR > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "INPUT_VIP_2": <via name="INPUT_VIP_2" pcbX={13.05} pcbY={21.75} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_input > .U_INPUT_EFUSE > .4">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "INPUT_VIP_3": <via name="INPUT_VIP_3" pcbX={10.49} pcbY={21.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_input > .C_RAW_EFUSE > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "INPUT_VIP_4": <via name="INPUT_VIP_4" pcbX={16.75} pcbY={21.99} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_input > .C_RAW_TYPEC > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "INPUT_VIP_7": <via name="INPUT_VIP_7" pcbX={28.4} pcbY={19.145} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_input > .J_POWER > .B9">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "INPUT_VIP_9": <via name="INPUT_VIP_9" pcbX={14.95} pcbY={21.75} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_input > .U_INPUT_EFUSE > .5">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "INPUT_VIP_10": <via name="INPUT_VIP_10" pcbX={36.49} pcbY={1.25} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .C_ETH_LDO_IN > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "INPUT_VIP_12": <via name="INPUT_VIP_12" pcbX={15.9} pcbY={-0.05000000000000018} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .C_PWR1 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "INPUT_VIP_13": <via name="INPUT_VIP_13" pcbX={26.35} pcbY={-3.15} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .C_PWR5 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "INPUT_VIP_15": <via name="INPUT_VIP_15" pcbX={25.7} pcbY={3.3} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .C_PWR3 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "CPUCAP_VIP_0": <via name="CPUCAP_VIP_0" pcbX={-5.2} pcbY={0.4} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .C10">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_ZQ_0": <via name="PWR_V2_DDR_ZQ_0" pcbX={2.400046} pcbY={-29.000123} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".DDR3 > .U3 > .L8">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_VREF_0": <via name="PWR_V2_DDR_VREF_0" pcbX={-0.4} pcbY={-4.4} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .J4">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_VREF_1": <via name="PWR_V2_DDR_VREF_1" pcbX={-3.199892} pcbY={-26.600077} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".DDR3 > .U3 > .H1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_VREF_2": <via name="PWR_V2_DDR_VREF_2" pcbX={2.400046} pcbY={-29.800223} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".DDR3 > .U3 > .M8">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_VREF_4": <via name="PWR_V2_DDR_VREF_4" pcbX={-8.74} pcbY={-23.25} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".DDR3 > .R_VREF_BOT > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_VREF_6": <via name="PWR_V2_DDR_VREF_6" pcbX={-6.94} pcbY={-26.6} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".DDR3 > .C_VREF_0 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_VREF_7": <via name="PWR_V2_DDR_VREF_7" pcbX={6.31} pcbY={-30.55} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".DDR3 > .C_VREF_1 > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_RESETn_0": <via name="PWR_V2_DDR_RESETn_0" pcbX={-2} pcbY={-6} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .G2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_RESETn_1": <via name="PWR_V2_DDR_RESETn_1" pcbX={-2.400046} pcbY={-33.000115} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".DDR3 > .U3 > .T2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_DDR_RESETn_2": <via name="PWR_V2_DDR_RESETn_2" pcbX={-10.99} pcbY={-31.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".DDR3 > .R_DDR_RESET > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_CAP_VDD_SRAM_MPU_0": <via name="PWR_V2_CAP_VDD_SRAM_MPU_0" pcbX={-4.4} pcbY={1.2000000000000002} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .D11">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_2": <via name="PWR_V2_V1V8_2" pcbX={-4.4} pcbY={-2} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .D7">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_5": <via name="PWR_V2_V1V8_5" pcbX={-2.8000000000000003} pcbY={-0.4} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .F9">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_6": <via name="PWR_V2_V1V8_6" pcbX={3.6} pcbY={-0.4} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .P9">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_7": <via name="PWR_V2_V1V8_7" pcbX={-4.4} pcbY={0.4} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .D10">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_8": <via name="PWR_V2_V1V8_8" pcbX={4.4} pcbY={0.4} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .R10">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_15": <via name="PWR_V2_V1V8_15" pcbX={4.4} pcbY={5.2} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .R16">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_26": <via name="PWR_V2_V1V8_26" pcbX={14.01} pcbY={-12.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .C_VDDS_PLL_CORE_LCD > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_28": <via name="PWR_V2_V1V8_28" pcbX={-3.49} pcbY={-3} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .C_VDDS_OSC > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_33": <via name="PWR_V2_V1V8_33" pcbX={10.35} pcbY={-5.2} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .C_PWR12_B > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_35": <via name="PWR_V2_V1V8_35" pcbX={15.99} pcbY={-14} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .R_RTC_RESET > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_37": <via name="PWR_V2_V1V8_37" pcbX={8.6} pcbY={10.175} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .U_RTC_RESET_DELAY > .3">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_38": <via name="PWR_V2_V1V8_38" pcbX={6.6375} pcbY={11.45} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .U_RTC_POR_GATE > .5">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_39": <via name="PWR_V2_V1V8_39" pcbX={15.99} pcbY={-15.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .C_RTC_RESET_BYP > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_40": <via name="PWR_V2_V1V8_40" pcbX={16.74} pcbY={-17} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .C_RTC_GATE_BYP > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_44": <via name="PWR_V2_V1V8_44" pcbX={7.6899999999999995} pcbY={-17} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Boot_and_clock > .C_CLOCK_GATE > .pin1">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_45": <via name="PWR_V2_V1V8_45" pcbX={21} pcbY={11.99} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .C_RMII_RETURN_A > .pin2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_46": <via name="PWR_V2_V1V8_46" pcbX={16.1} pcbY={11.99} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .C_RMII_RETURN_B > .pin2">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "PWR_V2_V1V8_49": <via name="PWR_V2_V1V8_49" pcbX={13.99} pcbY={-16} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Debug_status > .TP_DBG_V1V8 > .V1V8">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "V1V8_PMIC_FEED": <via name="V1V8_PMIC_FEED" pcbX={18.0625} pcbY={-1} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .U_PMIC > .4">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "MPU_CPU": <via name="MPU_CPU" pcbX={-2.8} pcbY={0.4} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .F10">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "MPU_FB": <via name="MPU_FB" pcbX={21.6} pcbY={0.9375} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Power_management > .U_PMIC > .41">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "MPU226_CAP4_V0": <via name="MPU226_CAP4_V0" pcbX={9.9} pcbY={4.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo="net.VDD_MPU">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "OSC_ENABLE_GATE_PAD_VIP": <via name="OSC_ENABLE_GATE_PAD_VIP" pcbX={6.1375} pcbY={-17.95} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Boot_and_clock > .U_CLOCK_GATE > .4">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
  "SYS6_RN3_VIP": <via name="SYS6_RN3_VIP" pcbX={6.5} pcbY={-12.475} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .RN_HDMI_3 > .3">
    {(["inner1","inner2","inner3","inner4","inner5","inner6"] as const).map(layer=><port key={layer} name={layer} layer={layer} ref={p=>p?.registerMatch(p.parent as any)}/>)}
  </via>,
}

export function applyCpuPmicThroughVias(node:any):any {
  return mapNativeElements(node,element=>element.type==='via'&&Object.hasOwn(vias,element.props.name)?vias[element.props.name as keyof typeof vias]:element)
}
