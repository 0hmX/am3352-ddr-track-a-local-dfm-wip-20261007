import type { IbisModelDefinition } from "@tscircuit/props"

export type IbisCorner = "typical" | "minimum" | "maximum"
export type TiWriteDrive = "slow9mA" | "fast9mA" | "fast8mA" | "fast12mA"
export type DdrDirection = "write" | "read"

// TI sprm552c, industrial, 1.5 V, 5% supply. Selector membership is
// checked again by the converter. These settings must match the DDR PHY.
export const tiWriteModels = {
  slow9mA: ["Model_343", "Model_655", "Model_847"],
  fast9mA: ["Model_339", "Model_651", "Model_843"],
  fast8mA: ["Model_348", "Model_660", "Model_852"],
  fast12mA: ["Model_351", "Model_663", "Model_855"],
} as const

export const modelCornerSupplyV = { typical: 1.5, minimum: 1.425, maximum: 1.575 }
export const bytePins = [
  { cpu: ["M3", "P1", "P2"], ram: ["E3", "F3", "G3"] },
  { cpu: ["J1", "L1", "L2"], ram: ["D7", "C7", "B7"] },
] as const
const ramDataPins = [
  ["E3", "F7", "F2", "F8", "H3", "H8", "G2", "H7"],
  ["D7", "C3", "C8", "C2", "A7", "A2", "B8", "A3"],
]
const cpuDataPins = [
  ["M3", "M4", "N1", "N2", "N3", "N4", "P3", "P4"],
  ["J1", "K1", "K2", "K3", "K4", "L3", "L4", "M1"],
]

const references = (pins: string[], power: string, ground: string) =>
  Object.fromEntries(pins.map((pin) => [pin, {
    pullup: power, pulldown: ground, powerClamp: power, groundClamp: ground,
  }]))

/**
 * Bind one physical DQ and its unchanged DQS pair. If the board permutes DQ
 * balls within a byte, pass ramDataPin derived from that board's actual net.
 * A frozen E3/D7 assumption would simulate the wrong routed copper.
 */
export function createDdrIbisModels({
  byte, direction, corner, ramDataPin, cpuDataPin = bytePins[byte].cpu[0],
  drive = "slow9mA", ramOdt = "ODT_60", ramReadDrive = "DATA_40",
  tiReadTermination = "full9mA",
}: {
  byte: 0 | 1
  direction: DdrDirection
  corner: IbisCorner
  ramDataPin: string
  cpuDataPin?: string
  drive?: TiWriteDrive
  ramOdt?: "ODT_20" | "ODT_30" | "ODT_40" | "ODT_60" | "ODT_120" | "ODT_off"
  ramReadDrive?: "DATA_34" | "DATA_40"
  tiReadTermination?: "full9mA" | "off"
}): { cpu: IbisModelDefinition; ram: IbisModelDefinition } {
  if (!ramDataPins[byte].includes(ramDataPin))
    throw new Error(`RAM ball ${ramDataPin} is not a DQ ball in byte ${byte}`)
  if (!cpuDataPins[byte].includes(cpuDataPin))
    throw new Error(`CPU ball ${cpuDataPin} is not a DQ ball in byte ${byte}`)
  const cpuPins = [cpuDataPin, ...bytePins[byte].cpu.slice(1)]
  const ramPins = [ramDataPin, ...bytePins[byte].ram.slice(1)]
  const cpuModels = direction === "write" ? tiWriteModels[drive]
    : tiReadTermination === "full9mA"
      ? ["Model_498", "Model_1002", "Model_1002"]
      : ["Model_490", "Model_994", "Model_994"]
  const ramModel = direction === "write" ? ramOdt : ramReadDrive
  const definition = (
    projectPath: string, component: string, pins: string[], models: readonly string[],
    power: string, ground: string,
  ): IbisModelDefinition => ({
    ibisModelAsset: {
      project_relative_path: projectPath, url: `./${projectPath}`, mimetype: "text/plain",
    },
    ibisComponentName: component,
    ibisPinNameToPortLabel: Object.fromEntries([...pins, power, ground].map(p => [p, p])),
    ibisPinNameToModelName: Object.fromEntries(pins.map((p, i) => [p, models[i]])),
    ibisPinNameToReferencePortLabels: references(pins, power, ground),
    modelValueCorner: corner,
    // The converter refuses TI's coupled package and nonzero supply-pin
    // package R/L/C. Do not claim these are included or replace them silently.
    includePackageParasitics: false,
  })
  return {
    cpu: definition("model-review/sprm552c-candidate-models.ibs", "am335x_zcz",
      cpuPins, cpuModels, "E5", "A1"),
    ram: definition("model-review/W631GG6MB-12.ibs", "W631GG6MB-12",
      ramPins, ramPins.map(() => ramModel), "A1", "B1"),
  }
}

// Winbond W631GG6MB-12 (DDR3-1600): Tables 18, 19, 54, 55, 57.
// These screening limits conservatively cover the maximum listed AC150
// setup/hold derating (75/50 ps), but do not establish that a measured slew
// pair belongs to a supported Table 55 cell. Keep the pipeline result
// illustrative until actual slew, tangent-line rules and tVAC are checked.
export function winbondWriteScreen(corner: IbisCorner) {
  const vrefV = modelCornerSupplyV[corner] / 2
  return {
    vrefV,
    thresholds: {
      vilAcV: vrefV - 0.15, vilDcV: vrefV - 0.1,
      vihDcV: vrefV + 0.1, vihAcV: vrefV + 0.15,
    },
    setupSeconds: 85e-12,
    holdSeconds: 95e-12,
    minimumStrobeDifferentialV: 0.3,
  }
}

export const modelingOmissions = [
  "Vendor package parasitics excluded: coupled TI package and nonzero reference/supply package impedance unsupported by this converter.",
  "Static IBIS ODT/drive selections assume matching actual PHY, MR1/MR2 and ODT control during a burst.",
  "Minimum/maximum IBIS tables are vendor correlated corners; all corner combinations and VREF noise are not covered.",
  "Write DQS is launched half a UI after DQ; read DQS is edge aligned and needs an explicit receiver sampling shift.",
  "TI publishes rule-based DDR3 PCB timing limits; its public datasheet does not provide a complete read receiver AC setup/hold mask.",
]
