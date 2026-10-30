import { DebugStatus as DebugStatusComponents } from "../components/DebugStatus"

export function DebugStatus() {
  return <subcircuit name="Debug_status" exposeNets pcbRelative routingDisabled schAutoLayoutEnabled={false}><DebugStatusComponents /></subcircuit>
}
