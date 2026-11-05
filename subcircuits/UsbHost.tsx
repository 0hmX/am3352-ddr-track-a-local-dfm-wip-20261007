import { Support } from "../support"
import { usbHostSheet } from "../data/usb-host"

/** USB1 host port (USB-A, switched VBUS, ESD). Routes: layout/UsbHostRoutes.tsx */
export function UsbHost() {
  return <subcircuit name="USB_host" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false}><Support sheets={[usbHostSheet]} /></subcircuit>
}
