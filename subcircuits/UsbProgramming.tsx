import { Support } from "../support"
import { progSheet } from "../data/usb-c-ports"

/** USB-C programming/data port on AM3352 USB0 (device). Routes: layout/UsbCPortRoutes.tsx */
export function UsbProgramming() {
  return <subcircuit name="USB_prog" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false}><Support sheets={[progSheet]} /></subcircuit>
}
