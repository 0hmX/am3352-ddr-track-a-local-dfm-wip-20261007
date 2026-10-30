import { Support } from "../support"

export function BootAndClock() {
  return <subcircuit name="Boot_and_clock" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false}><Support sheets={["Boot and clock"]} /></subcircuit>
}
