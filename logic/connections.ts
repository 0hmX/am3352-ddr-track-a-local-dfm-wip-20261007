import originalCpu from "../data/cpu-connections.json"
import display from "../hdmi/firmware/cpu-bindings.json"
import permutation from "../validation-next/final-ddr/permutation.json"

// The AM3352 ball names are stable physical identities. Unmentioned bindings remain intact.
export const cpuNets: Record<string, string> = { ...originalCpu, ...display.bindings }
for (const ball of display.unbound_balls ?? []) delete cpuNets[ball]
const ramData = Object.fromEntries(Object.entries(permutation.cpu_to_ram).map(([net, ram]) => [ram, net]))
export function ramNet(signal: string): string | undefined {
  if (signal.startsWith("VSS")) return "GND"
  if (signal.startsWith("VDD")) return "DDR_1V5"
  if (signal.startsWith("VREF")) return "DDR_VREF"
  if (/^DQ[LU][0-7]$/.test(signal)) return ramData[signal]
  if (/^(A\d+|BA\d+)$/.test(signal)) return `DDR_${signal}`
  return ({ ODT: "DDR_ODT", CKE: "DDR_CKE", CK: "DDR_CK", N_CK: "DDR_CKn", N_CS: "DDR_CSn0",
    N_RESET: "DDR_RESETn", N_RAS: "DDR_RASn", N_CAS: "DDR_CASn", N_WE: "DDR_WEn",
    DML: "DDR_DQM0", DMU: "DDR_DQM1", DQSL: "DDR_DQS0", N_DQSl: "DDR_DQSn0",
    DQSU: "DDR_DQS1", N_DQSU: "DDR_DQSn1", ZQ: "DDR_ZQ" } as Record<string, string>)[signal]
}
