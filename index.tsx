import { applySys6R41CandidateV2, CloudSys6RealTerminalRoutes } from "./layout/CloudSys6RealTerminalRoutes"
import { CloudSysboot2And10Routes } from "./layout/CloudSysboot2And10Routes"
import { applyBa2TraceOnlyReferenceRelief } from "./layout/CloudBa2TraceReferenceRelief"
import { applyD1TraceOnlyReferenceRelief } from "./layout/CloudD1TraceReferenceRelief"
import { CloudD1TwoInner1Scopes } from "./layout/CloudD1ReferenceScopes"
import { applyA10TraceOnlyReferenceRelief } from "./layout/CloudA10TraceReferenceRelief"
import {applyCloudRouting244} from './layout/CloudRouting244Overrides'
import {CloudRn4NearRoutes} from './layout/CloudRn4NearRoutes'
import {CloudD21CpuReturn} from './layout/CloudD21D22Inner4'
import {applyPgoodReferenceReturns} from "./layout/CloudPgoodReferenceReturns"
import {applyCloudRouting242} from './layout/CloudRouting242Overrides'
import {CloudRn0NearRoutes} from './layout/CloudRn0NearRoutes'
import {CloudD14TwoReferenceScopes} from './layout/CloudD14ReferenceScopes'
import { CloudA4EightReferenceScopes } from "./layout/CloudA4ReferenceScopes"
import {applyMdioInner4Candidate, CloudMdioReferenceBridges} from './layout/CloudMdioInner4Routes'
import {applyFixedPgood48Top} from './layout/CloudPgoodTopRoute'
import {CloudA11ThreeReferenceScopes} from './layout/CloudA11ReferenceScopes'
import {CloudBa1SixReferenceScopes} from './layout/CloudBa1ReferenceScopes'
import {applyTypecCorners} from './layout/CloudTypecControlCorners'
import {applyCloudRouting240Cleanup} from './layout/CloudRouting240Cleanup'
import {CloudI2cRealPullReturn} from './layout/CloudI2cPullReturn'
import {CloudDqm1D11CpuReferenceScopes} from './layout/CloudDqm1D11CpuReferenceScopes'
import {CloudD12Rn5AwareRoute, CloudD12DdrCap9Bridge} from './layout/CloudD12Inner5Routes'
import {applyCloudRouting239} from './layout/CloudRouting239Overrides'
import {CloudCkeTwoScopeOverlaysV1} from './layout/CloudRn5CkeScopes'
import {CloudOscEnablePullRoutes} from './layout/CloudOscEnablePullRoutes'
import {CloudRn5NewOutputRoutes} from './layout/CloudRn5EastOutputs'
import {CloudRn5EastInputRoutes} from './layout/CloudRn5EastInputs'
import {CloudRn5R4V3Feed} from './layout/CloudRn5R4PowerFeed'
import {CloudHdmiD11D15Routes} from './layout/CloudHdmiD11D15Routes'
import {CloudD12DdrCapBridge} from './layout/CloudDdrCap10To11Bridge'
import {applyCloudRouting235} from './layout/CloudRouting235Overrides'
import {CloudRn4D14D10Routes} from './layout/CloudRn4D14D10Routes'
import {applyCloudControlCleanup} from './layout/CloudControlCleanupOverrides'
import {CloudPmicPullPowerJoin} from './layout/CloudPmicPullPowerJoin'
import {CloudWarmResetPullRoutes} from './layout/CloudWarmResetPullRoutes'
import {applyCloudRouting233} from './layout/CloudRouting233Overrides'
import {CloudRxReviewOnlyReferenceOverlays} from './layout/CloudRxReferenceOverlays'
import {CloudD2ScopedReferenceOverlays} from './layout/CloudD2ReferenceOverlays'
import {CloudRextOriginalRoutes} from './layout/CloudRextOriginalRoutes'
import {CloudMpuCap1Inner5Route} from './layout/CloudMpuCap1Inner5'
import {applyCloudRouting232} from './layout/CloudRouting232Overrides'
import {CloudSysboot5TopRoutes} from './layout/CloudSysboot5Routes'
import {CloudCpu10ApprovedScopes} from './layout/CloudCpu10ReferenceScopes'
import {CloudResetPullEndpointRoutes} from './layout/CloudResetPullRoutes'
import {CloudWarmResetEndpointRoutes} from './layout/CloudWarmResetRoutes'
import {CloudSys5vEndpointStrip} from './layout/CloudSys5vEndpointCleanup'
import {applyCloudRouting230} from './layout/CloudRouting230Overrides'
import {CloudSysboot14PadCenteredRoutes} from './layout/CloudSysboot14Routes'
import {CloudSys14VrefWidthRestore} from './layout/CloudSys14VrefWidthRestore'
import {CloudSys14ApprovedReferenceOverlays} from './layout/CloudSys14ReferenceOverlays'
import {CloudIntPullEndpointRoutes} from './layout/CloudIntPullEndpointRoutes'
import {CloudR4CpuReferenceReturn} from './layout/CloudR4PullCleanup'
import {applyCloudRouting228} from './layout/CloudRouting228Overrides'
import {CloudSysboot8And12Routes} from './layout/CloudSysboot8And12Routes'
import {CloudSys12ReferenceOverlay} from './layout/CloudSys12ReferenceOverlay'
import {CloudU12ReferenceReturn} from './layout/CloudU12ReferenceReturn'
import {CloudSclPullReturn} from './layout/CloudSclPullReturn'
import {applyCloudRouting226} from "./layout/CloudRouting226Overrides"
import {CloudSysboot11Routes} from "./layout/CloudSysboot11Routes"
import {CloudDdcReferencePatch} from "./layout/CloudDdcReferencePatch"
import {CloudSysboot7BottomStrap} from "./layout/CloudSysboot7BottomStrap"
import {CloudControlReferenceReturns} from "./layout/CloudControlReferenceRemedies"
import {CloudSdaReferenceReturns} from "./layout/CloudSdaReferenceReturns"
import { SavedSilkscreen } from "./layout/SavedSilkscreen"
import { supportSheets, parts as supportParts } from "./support"
import { pinSheets } from "./schematic/PinSheets"
import { hdmiSheets, sheetCounts, subcircuitComponents } from "./subcircuits"
import { CloudCpuDdrReturnStitches } from "./layout/CloudCpuDdrReturnStitches"
import { CloudEthernetRoutes } from "./layout/CloudEthernetRoutes"
import { CloudCorePowerRoutes } from "./layout/CloudCorePowerRoutes"
import { CloudInputPowerRoutes } from "./layout/CloudInputPowerRoutes"
import { CloudPmicThermalArray } from "./layout/CloudPmicThermalArray"
import { CloudMainPowerPlanes } from "./layout/CloudMainPowerPlanes"
import { CloudPowerRoutes } from "./layout/CloudPowerRoutes"
import { CloudCpuCapRoutes } from "./layout/CloudCpuCapRoutes"
import { CloudLocalRoutes } from "./layout/CloudLocalRoutes"
import { CloudHdmiControlRoutes } from "./layout/CloudHdmiControlRoutes"
import { CloudHdmiVideoRoutes } from "./layout/CloudHdmiVideoRoutes"
import { CloudEthernetPowerRoutes } from "./layout/CloudEthernetPowerRoutes"
import { CloudDdrSupportRoutes } from "./layout/CloudDdrSupportRoutes"
import { CloudSupplyRoutes } from "./layout/CloudSupplyRoutes"
import { CloudV1V8PowerRoutes } from "./layout/CloudV1V8PowerRoutes"
import { CloudHdmi1V2SupplyRoutes } from "./layout/CloudHdmi1V2SupplyRoutes"
import { CloudMpuPowerRoutes } from "./layout/CloudMpuPowerRoutes"
import { CloudV3RegulatorBridge } from "./layout/CloudV3RegulatorBridge"
import { CloudHdmiPowerRoutes } from "./layout/CloudHdmiPowerRoutes"
import { CloudHdmi3V3SupplyRoutes } from "./layout/CloudHdmi3V3SupplyRoutes"
import { CloudDdrRoutes } from "./layout/CloudDdrRoutes"
import { CloudD4D7CpuReturn } from "./layout/CloudD4D7CpuReturn"
import { CloudDdrClockReturns } from "./layout/CloudDdrClockReturns"
import { CloudV3CompletionBridges } from "./layout/CloudV3CompletionBridges"
import { CloudRn6RestoredInputs } from "./layout/CloudRn6RestoredInputs"
import { CloudDdrReferenceOverlays } from "./layout/CloudDdrReferenceOverlays"
import { CloudHdmiLayeredRoutes } from "./layout/CloudHdmiLayeredRoutes"
import { CloudSysboot9Routes } from "./layout/CloudSysboot9Routes"
import { CloudCkeReferenceOverlays } from "./layout/CloudCkeReferenceOverlays"
import { CloudSysboot3RoutesV2 } from "./layout/CloudSysboot3RoutesV2"
import { CloudSysboot3Return } from "./layout/CloudSysboot3Return"
import { CloudSysbootEthernetRoutes } from "./layout/CloudSysbootEthernetRoutes"
import { CloudD21EndpointOnly } from "./layout/CloudD21EndpointOnly"
import { CloudSysboot15EndpointRoutes } from "./layout/CloudSysboot15EndpointRoutes"
import { CloudDdrCleanupReferenceOverlays } from "./layout/CloudDdrCleanupReferenceOverlays"
import { CloudSysboot1Routes } from "./layout/CloudSysboot1Routes"
import { CloudSys1Ground1766 } from "./layout/CloudSys1Ground1766"
import { CloudHdmiD0D8Routes } from "./layout/CloudHdmiD0D8Routes"
import { applyUsbCPortRework } from "./layout/UsbCPortRework"
import { UsbCPortRoutes } from "./layout/UsbCPortRoutes"
export { ramNet } from "./logic/connections"
const sheets = [...pinSheets, ...supportSheets, "Debug rails and power status", ...hdmiSheets]
const supportCounts = Object.fromEntries(supportSheets.map(sheet => [sheet, supportParts.filter(p => p.sheet === sheet).length]))
/** DDR routing is in progress; candidate copper is screened before mounting. */
export default function Board() {
  return applyUsbCPortRework(applySys6R41CandidateV2(applyBa2TraceOnlyReferenceRelief(applyD1TraceOnlyReferenceRelief(applyA10TraceOnlyReferenceRelief(applyCloudRouting244(applyPgoodReferenceReturns(applyCloudRouting242(applyMdioInner4Candidate(applyFixedPgood48Top(applyTypecCorners(applyCloudRouting240Cleanup(applyCloudRouting239(applyCloudRouting235(applyCloudControlCleanup(applyCloudRouting233(applyCloudRouting232(applyCloudRouting230(applyCloudRouting228(applyCloudRouting226(<board width={98} height={65.5} layers={8} thickness={1.2} pcbRelative routingDisabled isViaInPadAllowed allowBlindAndBuriedVias autorouter={{ allowViaInPad: true }} doubleSidedAssembly
    outline={[{x:-28,y:26.5},{x:70,y:26.5},{x:70,y:-39},{x:-28,y:-39}]}
    minTraceWidth={0.1} minViaHoleDiameter={0.15} minViaPadDiameter={0.3}
    minViaHoleEdgeToViaHoleEdgeClearance={0.1} minPlatedHoleDrillEdgeToDrillEdgeClearance={0.15}
    minTraceToHoleEdgeClearance={0.2} minTraceToPadEdgeClearance={0.1} minPadEdgeToPadEdgeClearance={0.1} minBoardEdgeClearance={0.2}
    schAutoLayoutEnabled={false} placementDrcChecksDisabled title="AM3352 DDR3 + RGB888 HDMI">
    <CloudMainPowerPlanes />
    {sheets.map((name, i) => <schematicsheet key={name} name={name} displayName={name} sheetIndex={i} sheetWidth={700} sheetHeight={Math.max(500, ((supportCounts[name] ? Math.ceil(supportCounts[name] / 4) * 9 : sheetCounts[name] ? Math.ceil(sheetCounts[name] / 4) * 12 : 30) + 20) * 10)} />)}
    {subcircuitComponents.map(Component => <Component key={Component.name} />)}
    <SavedSilkscreen />
    <CloudCpuDdrReturnStitches />
    <CloudCorePowerRoutes />
    <CloudInputPowerRoutes />
    <CloudPmicThermalArray />
    <CloudPowerRoutes />
    <CloudCpuCapRoutes />
    <CloudLocalRoutes />
    <CloudHdmiControlRoutes />
    <CloudHdmiVideoRoutes />
    <CloudEthernetPowerRoutes />
    <CloudDdrSupportRoutes />
    <CloudSupplyRoutes />
    <CloudV1V8PowerRoutes />
    <CloudHdmi1V2SupplyRoutes />
    <CloudMpuPowerRoutes />
    <CloudV3RegulatorBridge />
    <CloudHdmiPowerRoutes />
    <CloudHdmi3V3SupplyRoutes />
    <CloudDdrRoutes />
    <CloudD4D7CpuReturn />
    <CloudDdrClockReturns />
    <CloudV3CompletionBridges />
    <CloudRn6RestoredInputs />
    <CloudDdrReferenceOverlays />
    <CloudHdmiLayeredRoutes />
    <CloudSysboot9Routes />
    <CloudCkeReferenceOverlays />
    <CloudSysboot3RoutesV2 />
    <CloudSysboot3Return />
    <CloudSysbootEthernetRoutes />
    <CloudD21EndpointOnly />
    <CloudSysboot15EndpointRoutes />
    <CloudDdrCleanupReferenceOverlays />
    <CloudEthernetRoutes />
    <CloudSysboot1Routes />
    <CloudSys1Ground1766 />
    <CloudSysboot11Routes />
    <CloudDdcReferencePatch />
    <CloudSysboot7BottomStrap />
    <CloudControlReferenceReturns />
    <CloudSdaReferenceReturns />
    <CloudSysboot8And12Routes />
    <CloudSys12ReferenceOverlay />
    <CloudU12ReferenceReturn />
    <CloudSclPullReturn />
    <CloudSysboot14PadCenteredRoutes />
    <CloudSys14VrefWidthRestore />
    <CloudSys14ApprovedReferenceOverlays />
    <CloudIntPullEndpointRoutes />
    <CloudR4CpuReferenceReturn />
    <CloudSysboot5TopRoutes />
    <CloudCpu10ApprovedScopes />
    <CloudResetPullEndpointRoutes />
    <CloudWarmResetEndpointRoutes />
    <CloudSys5vEndpointStrip />
    <CloudRxReviewOnlyReferenceOverlays />
    <CloudD2ScopedReferenceOverlays />
    <CloudRextOriginalRoutes />
    <CloudMpuCap1Inner5Route />
    <CloudPmicPullPowerJoin />
    <CloudWarmResetPullRoutes />
    <CloudRn4D14D10Routes />
    <CloudCkeTwoScopeOverlaysV1 />
    <CloudOscEnablePullRoutes />
    <CloudRn5NewOutputRoutes />
    <CloudRn5EastInputRoutes />
    <CloudRn5R4V3Feed />
    <CloudD12DdrCapBridge />
    <CloudD12Rn5AwareRoute />
    <CloudD12DdrCap9Bridge />
    <CloudI2cRealPullReturn />
    <CloudDqm1D11CpuReferenceScopes />
    <CloudMdioReferenceBridges />
    <CloudA11ThreeReferenceScopes />
    <CloudBa1SixReferenceScopes />
    <CloudD14TwoReferenceScopes />
    <CloudA4EightReferenceScopes />
    <CloudRn0NearRoutes />
    <CloudD21CpuReturn />
    <CloudRn4NearRoutes />
    <CloudD1TwoInner1Scopes />
    <CloudSys6RealTerminalRoutes />
    <CloudSysboot2And10Routes />
    <CloudHdmiD11D15Routes />
    <CloudHdmiD0D8Routes />
    <UsbCPortRoutes />
  </board>))))))))))))))))))))
}
