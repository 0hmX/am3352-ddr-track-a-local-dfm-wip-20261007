/** Checked fabrication labels and explicitly positioned reference designators. */
const references = [
  ["R_PWR6",22.6,-16.28,"top",0], ["C_VDD_CORE_6",8.5,4.53,"bottom",0],
  ["R_BOOT12",3.5,-9.28,"top",0], ["R_CLOCK_OE_PD",4,-14.72,"top",0],
  ["C_ETH_RAMP_CT",43,-9.53,"top",0], ["R_ETH_MDC_SRC",-2.4,16.32,"top",180],
  ["R_HDMI_1V2_EN",52.5,-15.78,"top",0], ["C_HDMI_1V2_EN",50.5,-17.22,"top",180],
  ["C_HDMI_ESD_SUPPLY",55.5,-30.28,"top",0],
] as const
const labels = [
  ["SYS 5V",31.7,-19.5], ["3V3",24.5,-13], ["1V8",14,-18.8],
  ["MPU",-5.4125,-13.6], ["GND",29.325,-8.4], ["UART 3V3",-.5,22],
  ["G",-3,11.7], ["TX",-1,11.7], ["RX",1,10.7], ["3V3",4.5,18.6], ["COLD RESET",-9,16.5],
] as const
export const savedRefdesStyle = (name: string) => references.some(r => r[0] === name)
  ? { silkscreenTextVisibility: "hidden" as const } : undefined
export function SavedSilkscreen() {
  return <>
    {references.map(([text,x,y,layer,rotation]) => <silkscreentext key={`${text}:${x}:${y}`} text={text} pcbX={x} pcbY={y} layer={layer} pcbRotation={rotation} anchorAlignment="center" fontSize={0.4} />)}
    {labels.map(([text,x,y]) => <silkscreentext key={`${text}:${x}:${y}`} text={text} pcbX={x} pcbY={y} layer="top" pcbRotation={0} anchorAlignment="center" fontSize={1} />)}
  </>
}
