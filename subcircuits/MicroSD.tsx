import { Support } from "../support"

export function MicroSD() {
  return <subcircuit name="microSD" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false}><Support sheets={["microSD"]} /></subcircuit>
}
