import { Support } from "../support"

export function UartDebug() {
  return <subcircuit name="UART_debug" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false}><Support sheets={["UART debug"]} /></subcircuit>
}
