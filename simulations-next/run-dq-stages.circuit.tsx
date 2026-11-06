import { resolveDdrChannel } from "./channels"
import DdrIbisBoard from "./ibis.circuit"
import { physicalRecords } from "./run-ddr.circuit"
import { groundReturnProfile, singleLayerRoute } from "./stage-profiles"

// DQ0 alone through the pipeline's straightened-stages reduction, with an ideal
// strobe. DQ0 is routed on one layer with no vias; its return profile comes from
// the board stackup (top over the inner1 GND plane). DQS0/DQSn0 change layer and
// run between two GND planes, which this reduction cannot model yet
// (tscircuit/pcb-spice-pipeline#49, #50).
const layer = singleLayerRoute(resolveDdrChannel(physicalRecords, "DDR_D0"))
const { profile } = groundReturnProfile(physicalRecords, layer)

export const dqStagesChannel = {
  reduction: "straightened-stages" as const,
  sections: 12,
  extraction: {
    minimumFrequency: "1Hz", maximumFrequency: "1GHz", modelFrequency: "100MHz",
    filaments: 9, refinementFilaments: 15, convergenceTolerance: 0.05,
    capacitanceTolerance: 0.02, reciprocityTolerance: 0.025,
    dcResistanceTolerance: 0.002, maxPanelLength: "0.5mm",
  },
  relativePermittivity: profile.relativePermittivity,
  straightenedStageProfiles: { [layer]: profile },
}

export default function RunDqStages() {
  return <DdrIbisBoard circuitJson={physicalRecords} lanes={["DQ"]} pcbSpiceChannel={dqStagesChannel} />
}
