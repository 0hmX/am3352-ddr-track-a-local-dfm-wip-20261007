import { SavedSilkscreen } from "./layout/SavedSilkscreen"
import { AM3352, pinLabels as cpuLabels } from "./components/AM3352"
import { W631GG6MB_12, pinLabels as ramLabels } from "./imports/W631GG6MB_12"
import { cpuNets, ramNet } from "./logic/connections"
import { Support, supportSheets, parts as supportParts } from "./support"
import { DebugStatus } from "./components/DebugStatus"
import { HDMIInterface } from "./hdmi/HDMIInterface"
import placement from "./hdmi/data/placement-selected"
import hdmiParts from "./hdmi/data/all-components"
import { PinSheets, pinSheets } from "./schematic/PinSheets"
import { SavedNativePours } from "./data/saved-native-pours"
import { SavedRoutes } from "./layout/SavedRoutes"
import { SavedNativeVias } from "./data/saved-native-vias"
import { TimingConstraints } from "./design/timing-constraints"
export { ramNet } from "./logic/connections"
const hdmiSheets = ["HDMI source resistors", "HDMI transmitter and protection", "HDMI power"]
const sheets = [...pinSheets, ...supportSheets, "Debug rails and power status", ...hdmiSheets]
const supportCounts = Object.fromEntries(supportSheets.map(sheet => [sheet, supportParts.filter(p => p.sheet === sheet).length]))
const sheetCounts: Record<string, number> = {}
const hdmiPlacement = Object.fromEntries(hdmiParts.map(p => {
  const sheet = p.kind === "resistor_array" ? hdmiSheets[0] : /5V|1V2|FB_HDMI|C_HDMI_REF/.test(p.name) ? hdmiSheets[2] : hdmiSheets[1]
  const i = sheetCounts[sheet] ?? 0; sheetCounts[sheet] = i + 1
  return [p.name, { ...placement[p.name as keyof typeof placement], schSheetName: sheet, schX: ((i % 4) - 1.5) * 14, schY: ((Math.ceil(hdmiParts.filter(part => (part.kind === "resistor_array" ? hdmiSheets[0] : /5V|1V2|FB_HDMI|C_HDMI_REF/.test(part.name) ? hdmiSheets[2] : hdmiSheets[1]) === sheet).length / 4) - 1) / 2 - Math.floor(i / 4)) * 12 }]
}))
/** Native logical design. The separately saved routed PCB remains the physical authority. */
export default function Board() {
  const cpuConnections = Object.fromEntries(Object.entries(cpuLabels).flatMap(([pin, [ball]]) => cpuNets[ball] ? [[pin, `net.${cpuNets[ball]}`]] : []))
  const ramConnections = Object.fromEntries(Object.entries(ramLabels).flatMap(([pin, [, signal]]) => ramNet(signal) ? [[pin, `net.${ramNet(signal)}`]] : []))
  return <board width={98} height={65.5} layers={8} thickness={1.2} routingDisabled autorouter={{ allowViaInPad: true }} doubleSidedAssembly
    outline={[{x:-28,y:26.5},{x:70,y:26.5},{x:70,y:-39},{x:-28,y:-39}]}
    minTraceWidth={0.1} minViaHoleDiameter={0.15} minViaPadDiameter={0.3}
    minViaHoleEdgeToViaHoleEdgeClearance={0.1} minPlatedHoleDrillEdgeToDrillEdgeClearance={0.15}
    minTraceToHoleEdgeClearance={0.2} minTraceToPadEdgeClearance={0.1} minPadEdgeToPadEdgeClearance={0.1} minBoardEdgeClearance={0.2}
    schAutoLayoutEnabled={false} placementDrcChecksDisabled title="AM3352 DDR3 + RGB888 HDMI">
    {sheets.map((name, i) => <schematicsheet key={name} name={name} displayName={name} sheetIndex={i} sheetWidth={700} sheetHeight={Math.max(500, ((supportCounts[name] ? Math.ceil(supportCounts[name] / 4) * 9 : sheetCounts[name] ? Math.ceil(sheetCounts[name] / 4) * 12 : 30) + 20) * 10)} />)}
    <AM3352 name="U1" pcbX={0} pcbY={0} connections={cpuConnections} noSchematicRepresentation />
    <W631GG6MB_12 name="U3" pcbX={0} pcbY={-27} connections={ramConnections} noSchematicRepresentation />
    <PinSheets />
    <TimingConstraints />
    <Support />
    <DebugStatus />
    <HDMIInterface placement={hdmiPlacement} />
    <SavedNativeVias />
    <SavedRoutes />
    <SavedSilkscreen />
    <SavedNativePours />
  </board>
}
