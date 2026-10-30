import { AM3352, pinLabels } from "../components/AM3352"
import { cpuNets } from "../logic/connections"
import { PinSheets } from "../schematic/PinSheets"
import { Support } from "../support"

export function Processor() {
  const connections = Object.fromEntries(Object.entries(pinLabels).flatMap(([pin, [ball]]) => cpuNets[ball] ? [[pin, `net.${cpuNets[ball]}`]] : []))
  return <subcircuit name="Processor" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false}>
    <AM3352 name="U1" pcbX={0} pcbY={0} connections={connections} noSchematicRepresentation />
    <Support sheets={["CPU bypass", "CPU power"]} />
    <PinSheets chip="U1" />
  </subcircuit>
}
