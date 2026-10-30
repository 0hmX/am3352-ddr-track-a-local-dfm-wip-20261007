import { Support } from "../support"

export function PowerInput() {
  return <subcircuit name="Power_input" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false}><Support sheets={["Power input"]} /></subcircuit>
}
