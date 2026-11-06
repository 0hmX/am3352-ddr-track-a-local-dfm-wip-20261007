// Shared parts for the pcb_spice lessons: a two-I/O "buffer" chip and its IBIS binding.
const IBIS_PATH = "tutorial/course/models/lvcmos33-teaching.ibs"

export type Drive = "LVCMOS33_4MA" | "LVCMOS33_12MA" | "LVCMOS33_24MA"

export const teachingIbis = (drive: Drive = "LVCMOS33_12MA", corner: "typical" | "minimum" | "maximum" = "typical") => {
  const io = ["IO1", "IO2"]
  return {
    ibisModelAsset: { project_relative_path: IBIS_PATH, url: `./${IBIS_PATH}`, mimetype: "text/plain" },
    ibisComponentName: "TEACH_LVCMOS33",
    ibisPinNameToPortLabel: Object.fromEntries([...io, "VDD", "GND"].map((p) => [p, p])),
    ibisPinNameToModelName: Object.fromEntries(io.map((p) => [p, drive])),
    ibisPinNameToReferencePortLabels: Object.fromEntries(io.map((p) => [p,
      { pullup: "VDD", pulldown: "GND", powerClamp: "VDD", groundClamp: "GND" }])),
    modelValueCorner: corner,
    includePackageParasitics: false,
  }
}

const pad = (hint: string, x: number, y: number, size = 0.8) => (
  <smtpad portHints={[hint]} pcbX={x} pcbY={y} width={size} height={size} shape="rect" />
)

/** A small chip: IO1, IO2 on the inside edge `pitch` mm apart, VDD behind them, GND as a plated hole so it reaches every GND plane. */
export const Buffer = ({ name, x, side, pitch = 2 }: { name: string; x: number; side: 1 | -1; pitch?: number }) => (
  <chip
    name={name}
    pcbX={x}
    connections={{ VDD: "net.VDD", GND: "net.GND" }}
    pinLabels={{ pin1: "IO1", pin2: "IO2", pin3: "VDD", pin4: "GND" }}
    footprint={
      <footprint>
        {pad("pin1", 0, pitch / 2, Math.min(0.8, pitch * 0.5))}
        {pad("pin2", 0, -pitch / 2, Math.min(0.8, pitch * 0.5))}
        {pad("pin3", -1.5 * side, 1)}
        <platedhole portHints={["pin4"]} pcbX={-1.5 * side} pcbY={-1} shape="circle" holeDiameter={0.4} outerDiameter={0.8} />
      </footprint>
    }
  />
)

export const extraction = {
  minimumFrequency: "1Hz", maximumFrequency: "1GHz", modelFrequency: "100MHz",
  filaments: 9, refinementFilaments: 15, convergenceTolerance: 0.05,
  capacitanceTolerance: 0.02, reciprocityTolerance: 0.025,
  dcResistanceTolerance: 0.002, maxPanelLength: "2mm",
}
