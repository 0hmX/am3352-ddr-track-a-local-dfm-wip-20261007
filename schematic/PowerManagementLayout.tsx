// Native schematic projections share the original chip ports and footprint map.
export const powerManagementLayout: Record<string, { schX: number; schY: number; schRotation?: number }> = {
  U_PMIC: { schX: -1, schY: 0 },
  L_PWR1: { schX: 4.3, schY: 5.975 }, L_PWR2: { schX: 4.3, schY: 3.275 },
  L_PWR3: { schX: 4.3, schY: 0.575 }, L_PWR4: { schX: 2.2, schY: -2.35, schRotation: -90 },
  C_PWR1: { schX: 6, schY: 7.6 }, C_PWR2: { schX: 7.5, schY: 8.6 },
  C_PWR3: { schX: 9.13, schY: 7.6 }, C_PWR4: { schX: 10.5, schY: 8.6 },
  C_PWR5: { schX: 12, schY: 7.6 }, C_PWR6: { schX: 13.5, schY: 8.6 },
  C_PWR7_B: { schX: 8, schY: 5.6 }, C_PWR7: { schX: 9.8, schY: 6.6 },
  C_PWR8_B: { schX: 8, schY: 2.6 }, C_PWR8: { schX: 9.5, schY: 3.6 },
  C_PWR9_B: { schX: 8, schY: -0.4 }, C_PWR9: { schX: 9.5, schY: 0.6 },
  C_PWR10: { schX: 8, schY: -3.4 }, C_PWR11: { schX: 9.5, schY: -2.4 },
  C_PWR10_B: { schX: 11, schY: -3.4 }, C_PWR10_C: { schX: 12.5, schY: -2.4 },
  C_PWR12_B: { schX: 8, schY: -5.4 }, C_PWR12: { schX: 9.5, schY: -4.4 },
  C_PWR13: { schX: 10.43, schY: -6.5 }, R_PWR1: { schX: 3, schY: -7.8, schRotation: -90 },
  R_PWR2: { schX: -10, schY: 8 }, R_PWR3: { schX: -8, schY: 6.5 },
  R_PWR4: { schX: -10, schY: 5 }, R_PWR5: { schX: -8, schY: 3.5 },
  R_PWR6: { schX: -10, schY: 2 }, R_PWR7: { schX: -8, schY: 0.5 },
  SW_PWR1: { schX: -11, schY: -1.5 }, R_PMIC_EN: { schX: -6.7, schY: -1.5 },
  U_RTC_RESET_DELAY: { schX: 9.08, schY: -8.5 }, U_RTC_POR_GATE: { schX: 12.94, schY: -7.5 },
  R_RTC_RESET: { schX: 12.47, schY: -9.1 }, R_RTC_LDO: { schX: -5, schY: -8.5 },
  R_RTC_WAKE: { schX: -3.5, schY: -9.5 }, C_RTC_LDO: { schX: 3.5, schY: -4.4 },
  C_RTC_RESET_BYP: { schX: 11.08, schY: -5.4 }, C_RTC_GATE_BYP: { schX: 12.5, schY: -4.4 },
}
const right = [1,48,47,43,42,41,37,38,39,12,13,14,15,4,35,17]
const pinPitch = (part: any, pin: string) => part.name === "U_PMIC" && right.includes(Number(pin)) ? (pin === "13" ? 1.1 : 0.9) : 0.45
const chipSides = (part: any) => {
  const keys = Object.keys(part.pinLabels)
  const rightPins = part.name === "U_PMIC" ? right.map(String) : part.name === "U_RTC_RESET_DELAY" ? ["1","6","7","8","9"] : part.name === "U_RTC_POR_GATE" ? ["4"] : keys.slice(Math.ceil(keys.length / 2))
  return { keys, rightPins, leftPins: part.name === "U_RTC_POR_GATE" ? ["5","1","2","3"] : keys.filter(pin => !rightPins.includes(pin)) }
}
export function PowerManagementChip({ part }: { part: any }) {
  const sides = chipSides(part), keys = sides.keys.map((_, i) => `pin${i + 1}`)
  const rightPins = sides.rightPins.map(pin => keys[sides.keys.indexOf(pin)])
  const leftPins = sides.leftPins.map(pin => keys[sides.keys.indexOf(pin)])
  const labels = Object.fromEntries(Object.entries(part.pinLabels).map(([pin, label], i) =>
    [`pin${i + 1}`, [String(label).replace(/^(GND|NC)\d+$/, "$1"), pin]]))
  return <schematicbox name={`${part.name} schematic`} title={part.name}
    chipRef={`chip[name="${part.name}"]`} schSheetName={part.sheet} {...powerManagementLayout[part.name]}
    width={part.name === "U_PMIC" ? 2.4 : keys.length === 2 ? 1.35 : 1.8} height={0.8 + (Math.max(leftPins.length, rightPins.length) - 1) * 0.45}
    pinLabels={labels} schPinArrangement={{leftSide: leftPins, rightSide: rightPins}}
    schPinStyle={Object.fromEntries(keys.map((pin, i) => [pin, { marginBottom: pinPitch(part, sides.keys[i]) - 0.2 }]))} />
}

import { shortWirePlan } from "./NamedConnections"
export function powerManagementWiring(parts: any[], placement: Record<string, any>) {
  return shortWirePlan(parts.filter(p => p.sheet === "Power management").flatMap(part => {
    const center = powerManagementLayout[part.name]
    const { keys, rightPins, leftPins } = chipSides(part)
    return Object.entries(part.connections).filter(([, net]) => net !== "GND" || !/RTC/.test(part.name)).map(([pin, net]) => {
      const rightSide = rightPins.includes(pin), side = rightSide ? rightPins : leftPins
      const angle = (center.schRotation ?? placement[part.name]?.schRotation ?? 0) * Math.PI / 180
      const radius = part.kind === "capacitor" ? 0.3 : part.kind === "resistor" ? 0.55 : 0.528
      const sign = Number(pin) === 1 ? -1 : 1
      const dx = part.kind === "chip" ? (rightSide ? 1 : -1) * (part.name === "U_PMIC" ? 1.6 : keys.length === 2 ? 1.075 : 1.3) : sign * Math.cos(angle) * radius
      const dy = part.kind === "chip" ? (side.reduce((sum, pin) => sum + pinPitch(part, pin), 0) - 0.2) / 2 - side.slice(0, side.indexOf(pin)).reduce((sum, pin) => sum + pinPitch(part, pin), 0) : sign * Math.sin(angle) * radius
      return { name: part.name, pin: `pin${keys.indexOf(pin) + 1}`, net: String(net), sheet: part.sheet,
        x: center.schX + dx, y: center.schY + dy,
        anchorSide: part.kind === "chip" || Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "left" : "right") as "left" | "right" : (dy > 0 ? "bottom" : "top") as "top" | "bottom" }
    })
  }))
}
