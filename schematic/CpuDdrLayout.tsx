/** Schematic-only banks. Rail membership comes from the existing connections. */
export function cpuDdrLayout(parts: any[]) {
  const result: Record<string, { schX: number; schY: number }> = {}
  for (const sheet of ["CPU bypass", "DDR bypass", "CPU power", "DDR reference"]) {
    const local = parts.filter(p => p.sheet === sheet)
    if (sheet.endsWith("bypass")) {
      const banks = Object.values(Object.groupBy(local, p => Object.values(p.connections).find(n => n !== "GND") as string))
      banks.forEach((bank, b) => bank!.forEach((part, i) => {
        const columns = sheet === "DDR bypass" ? 9 : 6
        result[part.name] = { schX: sheet === "DDR bypass" ? (i % columns - 4) * 1.5 + (Math.floor(i / columns) % 2) * 0.8 : (b % 2) * 11 - 10 + i % columns * 1.5 + (Math.floor(i / columns) % 2) * 0.8,
          schY: sheet === "DDR bypass" ? 2.5 - Math.floor(i / columns) * 2 + i % 2 : 5 - Math.floor(b / 2) * 6 - Math.floor(i / columns) * 2 + i % 2 }
      }))
    } else local.forEach((part, i) => { result[part.name] = { schX: sheet === "CPU power" ? (i - 1) * 4 : (i % 4 - 1.5) * 5, schY: sheet === "CPU power" ? 0 : 4 - Math.floor(i / 4) * 4 } })
  }
  Object.assign(result, {
    R_DDR_ZQ: { schX: -7, schY: 3 }, R_DDR_VTP: { schX: -3.5, schY: 3 },
    R_VREF_TOP: { schX: 1, schY: 3 }, R_VREF_BOT: { schX: 1, schY: -1 },
    C_VREF_TOP: { schX: 4, schY: 3 }, C_VREF_0: { schX: 4, schY: -2 },
    C_VREF_1: { schX: 5.5, schY: -1 }, C_VREF_2: { schX: 7, schY: -2 }, C_VREF_3: { schX: 8.5, schY: -1 },
    R_DDR_RESET: { schX: -7, schY: -2 },
  })
  return result
}

export const cpuDdrSheetSizes: Record<string, [number, number]> = {
  "CPU supplies": [270, 210], "CPU DDR interface": [230, 110], "CPU video and I2C": [100, 100],
  "CPU peripheral and boot pins": [270, 210], "CPU Ethernet and USB": [100, 100],
  "DDR memory supplies": [210, 110], "DDR memory address and control": [160, 110], "DDR memory data": [70, 100],
  "CPU bypass": [230, 170], "CPU power": [120, 30], "DDR reference": [220, 140], "DDR bypass": [200, 110],
}
