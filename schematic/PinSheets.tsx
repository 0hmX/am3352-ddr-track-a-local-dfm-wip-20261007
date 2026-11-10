import { pinLabels as cpu } from "../components/AM3352"
import { pinLabels as ram } from "../imports/W631GG6MB_12"
import display from "../hdmi/firmware/cpu-hdmi-pin-contract"
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
export function PinSheets({ chip }: { chip?: string } = {}) { return <>{pinGroups.filter(group => !chip || group.chip === chip).map(group => {
  const keys = group.entries.map(([pin]) => pin)
  const labels = group.entries.map(([, [ball, signal]]) => signal.replace(new RegExp(`_${ball}$`), ""))
  const columnWidth = (column: string[]) => Math.max(0, ...column.map(label => label.length * 0.105))
  return <schematicbox key={group.name} name={group.name} title={group.name} chipRef={`chip[name="${group.chip}"]`}
    schSheetName={group.sheet} schX={pinGroups.filter(g => g.sheet === group.sheet).length === 1 ? 0 : (group.index % 2 - 0.5) * (group.sheet === "DDR memory address and control" ? 8 : 11)} schY={(Math.ceil(pinGroups.filter(g => g.sheet === group.sheet).length / 2) - 1) * 4.5 - Math.floor(group.index / 2) * 9}
    width={0.35 + columnWidth(labels.slice(0, 16)) + columnWidth(labels.slice(16))}
    height={0.8 + (Math.min(16, keys.length) - 1) * 0.45}
    pinLabels={Object.fromEntries(group.entries.map(([pin, [ball]], i) => [pin, [labels[i], ball]]))}
    schPinArrangement={{ leftSide: keys.slice(0, 16), rightSide: keys.slice(16) }}
    schPinStyle={Object.fromEntries(keys.map(pin => [pin, { marginBottom: 0.25 }]))} />
})}</> }

import { shortWirePlan } from "./NamedConnections"
export function pinSheetWiring(chip: string, connections: Record<string, string>) {
  return shortWirePlan(pinGroups.filter(g => g.chip === chip).flatMap(group => {
    const labels = group.entries.map(([, [ball, signal]]) => signal.replace(new RegExp(`_${ball}$`), ""))
    const width = 0.35 + Math.max(0, ...labels.slice(0, 16).map(label => label.length * 0.105)) + Math.max(0, ...labels.slice(16).map(label => label.length * 0.105))
    const x = pinGroups.filter(g => g.sheet === group.sheet).length === 1 ? 0 : (group.index % 2 - 0.5) * (group.sheet === "DDR memory address and control" ? 8 : 11)
    const y = (Math.ceil(pinGroups.filter(g => g.sheet === group.sheet).length / 2) - 1) * 4.5 - Math.floor(group.index / 2) * 9
    return group.entries.flatMap(([pin], i) => !connections[pin] ? [] : [{ name: chip, pin, net: connections[pin].replace(/^net\./, ""), sheet: group.sheet,
      x: x + (i < 16 ? -1 : 1) * (width / 2 + 0.4), y: y + ((Math.min(i < 16 ? 16 : group.entries.length - 16, group.entries.length) - 1) / 2 - i % 16) * 0.45 + 0.125,
      anchorSide: i < 16 ? "right" as const : "left" as const }])
  }))
}
