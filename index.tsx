import { SavedSilkscreen } from "./layout/SavedSilkscreen"
import { supportSheets, parts as supportParts } from "./support"
import { pinSheets } from "./schematic/PinSheets"
import { hdmiSheets, sheetCounts, subcircuitComponents } from "./subcircuits"
import { ProvisionalDdrRoutes } from "./layout/ProvisionalDdrRoutes"
export { ramNet } from "./logic/connections"
const sheets = [...pinSheets, ...supportSheets, "Debug rails and power status", ...hdmiSheets]
const supportCounts = Object.fromEntries(supportSheets.map(sheet => [sheet, supportParts.filter(p => p.sheet === sheet).length]))
/** DDR routing is in progress; candidate copper is screened before mounting. */
export default function Board() {
  return <board width={98} height={65.5} layers={8} thickness={1.2} pcbRelative routingDisabled isViaInPadAllowed allowBlindAndBuriedVias autorouter={{ allowViaInPad: true }} doubleSidedAssembly
    outline={[{x:-28,y:26.5},{x:70,y:26.5},{x:70,y:-39},{x:-28,y:-39}]}
    minTraceWidth={0.1} minViaHoleDiameter={0.15} minViaPadDiameter={0.3}
    minViaHoleEdgeToViaHoleEdgeClearance={0.1} minPlatedHoleDrillEdgeToDrillEdgeClearance={0.15}
    minTraceToHoleEdgeClearance={0.2} minTraceToPadEdgeClearance={0.1} minPadEdgeToPadEdgeClearance={0.1} minBoardEdgeClearance={0.2}
    schAutoLayoutEnabled={false} placementDrcChecksDisabled title="AM3352 DDR3 + RGB888 HDMI">
    {sheets.map((name, i) => <schematicsheet key={name} name={name} displayName={name} sheetIndex={i} sheetWidth={700} sheetHeight={Math.max(500, ((supportCounts[name] ? Math.ceil(supportCounts[name] / 4) * 9 : sheetCounts[name] ? Math.ceil(sheetCounts[name] / 4) * 12 : 30) + 20) * 10)} />)}
    {subcircuitComponents.map(Component => <Component key={Component.name} />)}
    <SavedSilkscreen />
    <ProvisionalDdrRoutes />
  </board>
}
