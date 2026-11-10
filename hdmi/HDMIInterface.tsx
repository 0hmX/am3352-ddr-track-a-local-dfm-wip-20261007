import { savedRefdesStyle } from "../layout/SavedSilkscreen"
import parts from "./data/interface-components"
import selectedPlacement from "./data/placement-selected"
import { Hdmifootprint } from "./components/Hdmifootprint"
import { SeriesDampingArray } from "./components/SeriesDampingArray"
import { HdmiPowerRail } from "./power/PowerRail"
import { cadModelForFootprint } from "../models"

/** Selected V8 source bank and ESD pair order; full-board routing is in progress. */
export function HDMIInterface({ placement = selectedPlacement, components = parts }: {
  placement?: Record<string, any>
  components?: typeof parts
} = {}) {
  return <>
    {components.map((p: any) => {
      if (!placement[p.name]) throw new Error(`Missing HDMI placement: ${p.name}`)
      if (p.kind === "resistor_array") return <SeriesDampingArray key={p.name}
        name={p.name} connections={p.connections} footprintKey={p.footprintKey}
        manufacturerPartNumber={p.mpn} {...placement[p.name]} />
      const props = {
        name: p.name, manufacturerPartNumber: p.mpn, ...placement[p.name], pcbStyle: savedRefdesStyle(p.name),
        cadModel: cadModelForFootprint(p.footprintKey),
        connections: Object.fromEntries(Object.entries(p.connections).map(([pin, net]) => [`pin${pin}`, `net.${net}`])),
      }
      const footprint = p.footprintKey ? <Hdmifootprint footprintKey={p.footprintKey} /> : p.footprint
      if (p.kind === "resistor") return <resistor key={p.name} {...props} resistance={p.value} footprint={footprint} />
      if (p.kind === "capacitor") return <capacitor key={p.name} {...props} capacitance={p.value} footprint={footprint} />
      return <chip key={p.name} {...props} footprint={footprint}
        schWidth={({ U_HDMI: 1.74, U_HDMI_ESD: 1.68, J_HDMI: 1.58 } as Record<string, number>)[p.name]}
        pinLabels={Object.fromEntries(Object.entries(p.pinLabels).map(([pin, label]) => [`pin${pin}`, [pin, label]]))}
        noConnect={p.noConnect.map((pin: string) => `pin${pin}`)} />
    })}
    <HdmiPowerRail placement={placement} />
  </>
}

export default HDMIInterface
