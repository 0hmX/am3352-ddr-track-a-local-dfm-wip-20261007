import { HDMIInterface } from "../hdmi/HDMIInterface"
import placement from "../hdmi/data/placement-selected"
import hdmiParts from "../hdmi/data/all-components"
import { passiveLayout } from "../schematic/PassiveLayout"

export const hdmiSheets = ["HDMI source resistors", "HDMI transmitter and protection", "HDMI power"]
const sheetFor = (p: typeof hdmiParts[number]) => p.kind === "resistor_array" ? hdmiSheets[0] : /5V|1V2|FB_HDMI|C_HDMI_REF/.test(p.name) ? hdmiSheets[2] : hdmiSheets[1]
const passivePlacement = passiveLayout(hdmiParts.map(p => ({ ...p, sheet: sheetFor(p) })), hdmiSheets, { "HDMI power": 30 })
Object.assign(passivePlacement, {
  R_HDMI_1V2_EN: { schX: -25, schY: -29.4, schRotation: -90 },
  C_HDMI_1V2_EN: { schX: -25, schY: -31, schRotation: -90 },
  R_HDMI_REF_R176: { schX: -25.7, schY: 20.4, schRotation: -90 },
  R_HDMI_REF_R177: { schX: -24.7, schY: 22.6, schRotation: -90 },
})
export const sheetCounts: Record<string, number> = {}
const hdmiPlacement = Object.fromEntries(hdmiParts.map(p => {
  const sheet = sheetFor(p)
  const i = sheetCounts[sheet] ?? 0; sheetCounts[sheet] = i + 1
  return [p.name, { ...placement[p.name as keyof typeof placement], schSheetName: sheet, schX: ((i % 4) - 1.5) * 14, schY: ((Math.ceil(hdmiParts.filter(part => sheetFor(part) === sheet).length / 4) - 1) / 2 - Math.floor(i / 4)) * 12, ...passivePlacement[p.name] }]
}))
export function HDMI() {
  return <subcircuit name="HDMI" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false}><HDMIInterface placement={hdmiPlacement} /></subcircuit>
}
