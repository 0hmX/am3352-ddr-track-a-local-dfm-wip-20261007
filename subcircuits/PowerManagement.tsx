import { Support } from "../support"

export function PowerManagement() {
  return <subcircuit name="Power_management" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false}><Support sheets={["Power management"]} /></subcircuit>
}
