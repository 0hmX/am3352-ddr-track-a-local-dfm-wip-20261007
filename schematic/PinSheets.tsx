import { pinLabels as cpu } from "../components/AM3352"
import { pinLabels as ram } from "../imports/W631GG6MB_12"
import display from "../hdmi/firmware/cpu-hdmi-pin-contract.json"
const displayBalls = new Set([...display.rgb_mapping, ...display.control].map(p => p.cpu_ball))
const cpuSheet = (ball: string, signal: string) => displayBalls.has(ball) ? "CPU video and I2C" :
  signal.startsWith("DDR_") ? "CPU DDR interface" : /^(VSS|VDD|VDDS|CAP_)/.test(signal) ? "CPU supplies" :
  /^(MII|RMII|MDIO|MDC|USB)/.test(signal) ? "CPU Ethernet and USB" : "CPU peripheral and boot pins"
const ramSheet = (_ball: string, signal: string) => /^(DQ|DML|DMU)/.test(signal) ? "DDR memory data" :
  /^(VSS|VDD|VREF)/.test(signal) ? "DDR memory supplies" : "DDR memory address and control"
const split = (labels: Record<string, readonly string[]>, classify: typeof cpuSheet, chip: string) => {
  const groups: Record<string, [string, readonly string[]][]> = {}
  for (const [pin, [ball, signal]] of Object.entries(labels)) (groups[classify(ball, signal)] ??= []).push([pin, [ball, signal]])
  return Object.entries(groups).flatMap(([sheet, entries]) => Array.from({ length: Math.ceil(entries.length / 32) }, (_, i) => ({
    chip, sheet, name: `${chip} ${sheet} ${i + 1}`, entries: entries.slice(i * 32, i * 32 + 32), index: i,
  })))
}
export const pinGroups = [...split(cpu, cpuSheet, "U1"), ...split(ram, ramSheet, "U3")]
export const pinSheets = [...new Set(pinGroups.map(p => p.sheet))]
/** Native projections share the physical chip's existing source ports. Every ball appears once. */
export function PinSheets() { return <>{pinGroups.map(group => {
  const keys = group.entries.map(([pin]) => pin)
  return <schematicbox key={group.name} name={group.name} title={group.name} chipRef={`chip[name="${group.chip}"]`}
    schSheetName={group.sheet} schX={(group.index % 2) * 25 - 12.5} schY={-Math.floor(group.index / 2) * 18}
    width={14} height={12} pinLabels={Object.fromEntries(group.entries.map(([pin, [ball, signal]]) => [pin, [signal.endsWith(`_${ball}`) ? signal : `${signal}_${ball}`, ball]]))}
    schPinArrangement={{ leftSide: keys.slice(0, 16), rightSide: keys.slice(16) }}
    schPinStyle={Object.fromEntries(keys.map(pin => [pin, { marginBottom: 0.4 }]))} />
})}</> }
