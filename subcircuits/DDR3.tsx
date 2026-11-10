import { W631GG6MB_12, pinLabels } from "../imports/W631GG6MB_12"
import { ramNet } from "../logic/connections"
import { PinSheets, pinSheetWiring } from "../schematic/PinSheets"
import { Support } from "../support"

export function DDR3() {
  const connections = Object.fromEntries(Object.entries(pinLabels).flatMap(([pin, [, signal]]) => ramNet(signal) ? [[pin, `net.${ramNet(signal)}`]] : []))
  return <subcircuit name="DDR3" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false} schMaxTraceDistance={3.5}>
    <W631GG6MB_12 name="U3" pcbX={0} pcbY={-27} connections={connections} schematicWirePlan={pinSheetWiring("U3", connections)} noSchematicRepresentation />
    <Support sheets={["DDR bypass", "DDR reference"]} />
    <PinSheets chip="U3" />
  </subcircuit>
}
