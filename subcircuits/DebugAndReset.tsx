import { Support } from "../support"

export function DebugAndReset() {
  return <subcircuit name="Debug_and_reset" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false}><Support sheets={["Debug and reset"]} /></subcircuit>
}
