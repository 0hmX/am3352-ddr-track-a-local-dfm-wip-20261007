/** Schematic-only rail orientation and capacitor banks; never returns PCB props. */
export function passiveLayout(parts: any[], sheets: string[], bankY: Record<string, number> = {}) {
  const result: Record<string, { schX?: number; schY?: number; schRotation?: number }> = {}
  const power = /^(CAP_|VDD|V[0-9]V[0-9]$|SYS_5V$|DDR_(1V5|VREF|VTP)$|ETH_3V3|HDMI_.*(1V2|3V3|5V)|PD_VCC[DD]$|PD_VDDD$|USB0_VBUS$|USBC_VBUS_RAW$)/
  for (const sheet of sheets) {
    const local = parts.filter(p => p.sheet === sheet)
    const banks: Record<string, any[]> = {}
    for (const part of local) {
      const nets = Object.values(part.connections) as string[]
      if (Object.keys(part.pinLabels ?? {}).length !== 2 || nets.length !== 2) continue
      const rail = nets.findIndex(net => power.test(net))
      const ground = nets.indexOf('GND')
      if ((part.kind !== 'inductor' || ground >= 0) && (rail >= 0 || ground >= 0)) {
        result[part.name] = { schRotation: rail >= 0 ? (rail === 0 ? -90 : 90) : (ground === 0 ? 90 : -90) }
      }
      if (part.kind === 'capacitor' && ground >= 0) (banks[nets[1 - ground]] ??= []).push(part)
    }
    Object.values(banks).forEach((bank, row) => bank.forEach((part, column) => {
      result[part.name] = { ...result[part.name], schX: (column - (bank.length - 1) / 2) * 1.5, schY: (bankY[sheet] ?? -10) - row * 5 + column % 2 }
    }))
  }
  return result
}
