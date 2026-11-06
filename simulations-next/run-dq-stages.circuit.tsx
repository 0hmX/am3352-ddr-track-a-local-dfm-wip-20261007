import DdrIbisBoard from "./ibis.circuit"
import { physicalRecords } from "./run-ddr.circuit"

// DQ0 alone through the pipeline's straightened-stages reduction, with an ideal
// strobe. The pipeline derives DQ0's return from pcb_stackup and the GND pours
// (top over the inner1 plane). One run: without simulated DQS lanes the quiet
// and switching-strobe cases are identical. DQS0/DQSn0 change layer, which
// this reduction cannot share with DQ0 yet (tscircuit/pcb-spice-pipeline#49).
export const dqStagesChannel = {
  reduction: "straightened-stages" as const,
  sections: 12,
  extraction: {
    minimumFrequency: "1Hz", maximumFrequency: "1GHz", modelFrequency: "100MHz",
    filaments: 9, refinementFilaments: 15, convergenceTolerance: 0.05,
    capacitanceTolerance: 0.02, reciprocityTolerance: 0.025,
    dcResistanceTolerance: 0.002, maxPanelLength: "0.5mm",
  },
}

export default function RunDqStages() {
  return <DdrIbisBoard circuitJson={physicalRecords} lanes={["DQ"]} activities={["QUIET"]} pcbSpiceChannel={dqStagesChannel} />
}
