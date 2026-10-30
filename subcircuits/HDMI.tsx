import { HDMIInterface } from "../hdmi/HDMIInterface"
import placement from "../hdmi/data/placement-selected"
import hdmiParts from "../hdmi/data/all-components"

export const hdmiSheets = ["HDMI source resistors", "HDMI transmitter and protection", "HDMI power"]
export const sheetCounts: Record<string, number> = {}
const hdmiPlacement = Object.fromEntries(hdmiParts.map(p => {
  const sheet = p.kind === "resistor_array" ? hdmiSheets[0] : /5V|1V2|FB_HDMI|C_HDMI_REF/.test(p.name) ? hdmiSheets[2] : hdmiSheets[1]
  const i = sheetCounts[sheet] ?? 0; sheetCounts[sheet] = i + 1
  return [p.name, { ...placement[p.name as keyof typeof placement], schSheetName: sheet, schX: ((i % 4) - 1.5) * 14, schY: ((Math.ceil(hdmiParts.filter(part => (part.kind === "resistor_array" ? hdmiSheets[0] : /5V|1V2|FB_HDMI|C_HDMI_REF/.test(part.name) ? hdmiSheets[2] : hdmiSheets[1]) === sheet).length / 4) - 1) / 2 - Math.floor(i / 4)) * 12 }]
}))
export function HDMI() {
  return <subcircuit name="HDMI" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false}><HDMIInterface placement={hdmiPlacement} /></subcircuit>
}
