/** Schematic-only banks. Rail membership comes from the existing connections. */
export function cpuDdrLayout(parts: any[]) {
  const result: Record<string, { schX: number; schY: number }> = {}
  for (const sheet of ["CPU bypass", "DDR bypass", "CPU power", "DDR reference"]) {
    const local = parts.filter(p => p.sheet === sheet)
    if (sheet.endsWith("bypass")) {
      const banks = Object.values(Object.groupBy(local, p => Object.values(p.connections).find(n => n !== "GND") as string))
      banks.forEach((bank, b) => bank!.forEach((part, i) => {
        const columns = sheet === "DDR bypass" ? 9 : 6
        result[part.name] = { schX: sheet === "DDR bypass" ? (i % columns - 4) * 2.6 : (b % 2) * 13 - 12 + i % columns * 2,
          schY: sheet === "DDR bypass" ? 5.5 - Math.floor(i / columns) * 3.5 : 7.5 - Math.floor(b / 2) * 9 - Math.floor(i / columns) * 2.4 }
      }))
    } else local.forEach((part, i) => { result[part.name] = { schX: sheet === "CPU power" ? (i - 1) * 4 : (i % 4 - 1.5) * 5, schY: sheet === "CPU power" ? 0 : 4 - Math.floor(i / 4) * 4 } })
  }
  Object.assign(result, {
    R_DDR_ZQ: { schX: -7, schY: 3 }, R_DDR_VTP: { schX: -3.5, schY: 3 },
    R_VREF_TOP: { schX: 1, schY: 3 }, R_VREF_BOT: { schX: 1, schY: -1 },
    C_VREF_TOP: { schX: 4, schY: 3 }, C_VREF_0: { schX: 4, schY: -1 },
    C_VREF_1: { schX: 7, schY: -1 }, C_VREF_2: { schX: 4, schY: -4 }, C_VREF_3: { schX: 7, schY: -4 },
    R_DDR_RESET: { schX: -7, schY: -2 },
  })
  return result
}

import { shortWirePlan } from "./NamedConnections"
export function cpuDdrWiring(parts: any[], placement: Record<string, any>) {
  return shortWirePlan(parts.filter(p => ["CPU bypass", "CPU power", "DDR reference", "DDR bypass"].includes(p.sheet)).flatMap(part => {
    const p = placement[part.name], angle = (p.schRotation ?? 0) * Math.PI / 180
    const radius = part.kind === "capacitor" ? 0.3 : 0.55
    return Object.entries(part.connections).map(([pin, net]) => {
      const sign = pin === "1" ? -1 : 1, dx = sign * Math.cos(angle) * radius, dy = sign * Math.sin(angle) * radius
      return { name: part.name, pin: `pin${pin}`, net: String(net), sheet: part.sheet, x: p.schX + dx, y: p.schY + dy,
        anchorSide: Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "left" : "right") as "left" | "right" : (dy > 0 ? "bottom" : "top") as "top" | "bottom" }
    })
  }))
}
export const cpuDdrSheetSizes: Record<string, [number, number]> = {
  "CPU supplies": [270, 210], "CPU DDR interface": [230, 110], "CPU video and I2C": [100, 100],
  "CPU peripheral and boot pins": [270, 210], "CPU Ethernet and USB": [100, 100],
  "DDR memory supplies": [210, 110], "DDR memory address and control": [160, 110], "DDR memory data": [70, 100],
  "CPU bypass": [280, 200], "CPU power": [120, 30], "DDR reference": [220, 140], "DDR bypass": [280, 170],
}
