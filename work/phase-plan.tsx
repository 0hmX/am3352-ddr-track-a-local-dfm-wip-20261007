import { savedRoutes } from "../data/saved-route-geometry"
import { cpuNets } from "../logic/connections"
import { parts } from "../support"
import hdmi from "../hdmi/data/all-components"

const nets = [...new Set([
  ...savedRoutes.flatMap(([, names]) => names),
  ...Object.values(cpuNets),
  ...[...parts, ...hdmi].flatMap(part => Object.values(part.connections)),
])].sort()
const power = /^(GND|VDD|VDDS|V\d|SYS_5V|DDR_1V5|DDR_VREF|ETH_3V3|PMIC_|CAP_|USB[01]_VBUS)|(?:VDD|AVCC|AVDD|3V3|1V2|5V|_SW|_FB)/
export function routingPhaseForNet(name: string) {
  if (name === "GND") return 0
  if (power.test(name)) return 4
  if (name.startsWith("DDR_")) return 1
  if (/^(HDMI_|LCD_|SYSBOOT)/.test(name)) return 2
  if (/^(ETH_|MII|RMII|MDIO|MDC|USB)/.test(name)) return 3
  return 5
}

if (import.meta.main) {
  for (let phase = 0; phase <= 5; phase++) {
    const names = nets.filter(name => routingPhaseForNet(name) === phase)
    console.log(`Phase ${phase}: ${names.length} nets\n${names.join(", ")}\n`)
  }
}
