import { DDR3 } from "./DDR3"
import { Processor } from "./Processor"
import { ProvisionalDdrRoutes } from "../layout/ProvisionalDdrRoutes"
import { ProvisionalDdrAddressRoutes } from "../layout/ProvisionalDdrAddressRoutes"
import { ProvisionalDdrByte0Routes } from "../layout/ProvisionalDdrByte0Routes"
import { ProvisionalDdrByte1Routes } from "../layout/ProvisionalDdrByte1Routes"

export default function DDR3Preview() {
  return <board width={38} height={53} layers={8} thickness={1.2} pcbRelative
    outline={[{x:-19,y:16},{x:19,y:16},{x:19,y:-37},{x:-19,y:-37}]}
    routingDisabled isViaInPadAllowed allowBlindAndBuriedVias autorouter={{ allowViaInPad: true }} doubleSidedAssembly
    minTraceWidth={0.1} minViaHoleDiameter={0.15} minViaPadDiameter={0.3}
    minViaHoleEdgeToViaHoleEdgeClearance={0.1} minPlatedHoleDrillEdgeToDrillEdgeClearance={0.15}
    minTraceToHoleEdgeClearance={0.2} minTraceToPadEdgeClearance={0.1} minPadEdgeToPadEdgeClearance={0.1} minBoardEdgeClearance={0.2}
    schAutoLayoutEnabled={false} placementDrcChecksDisabled title="Processor and DDR3 preview">
    <Processor />
    <DDR3 />
    <ProvisionalDdrRoutes />
    <ProvisionalDdrAddressRoutes />
    <ProvisionalDdrByte0Routes />
    <ProvisionalDdrByte1Routes />
  </board>
}
