import { Processor } from "./Processor"
import { DDR3 } from "./DDR3"
import { PowerManagement } from "./PowerManagement"
import { BootAndClock } from "./BootAndClock"
import { MicroSD } from "./MicroSD"
import { PowerInput } from "./PowerInput"
import { DebugAndReset } from "./DebugAndReset"
import { UartDebug } from "./UartDebug"
import { EthernetAndRgbExpansion } from "./EthernetAndRgbExpansion"
import { DebugStatus } from "./DebugStatus"
import { HDMI } from "./HDMI"

export { hdmiSheets, sheetCounts } from "./HDMI"
export const subcircuitComponents = [Processor, DDR3, PowerManagement, BootAndClock, MicroSD, PowerInput,
  DebugAndReset, UartDebug, EthernetAndRgbExpansion, DebugStatus, HDMI] as const
