import DdrIbisBoard from "./ibis.circuit"
import { physicalRecords } from "./run-ddr.circuit"

// DQ0 alone through the pipeline's straightened-stages reduction. DQ0 is routed
// entirely on `top`; its return is the inner1 GND plane directly below
// (stackup: top 1.1076-1.1426 mm, inner1 0.9930-1.0082 mm => centres 0.1245 mm apart).
// The plane is modeled as a finite return bar under the trace.
export const dqStagesChannel = (returnWidth = "2mm") => ({
  reduction: "straightened-stages" as const,
  sections: 12,
  extraction: {
    minimumFrequency: "1Hz", maximumFrequency: "1GHz", modelFrequency: "100MHz",
    filaments: 9, refinementFilaments: 15, convergenceTolerance: 0.05,
    capacitanceTolerance: 0.02, reciprocityTolerance: 0.025,
    dcResistanceTolerance: 0.002, maxPanelLength: "0.5mm",
  },
  relativePermittivity: 4.1,
  straightenedStageProfiles: {
    top: { spacing: "0.2mm", relativePermittivity: 4.1,
      return: { width: returnWidth, thickness: "0.0152mm", lengthFactor: 1, centerY: "0mm", centerZ: "-0.1245mm" } },
  },
})

export default function RunDqStages() {
  return <DdrIbisBoard circuitJson={physicalRecords} lanes={["DQ"]} pcbSpiceChannel={dqStagesChannel()} />
}
