import { savedRefdesStyle } from "../../layout/SavedSilkscreen"
import parts from "./power-components"
import { Hdmifootprint } from "../components/Hdmifootprint"

/** Actual converter circuit. The encrypted vendor model is not a native SPICE model. */
export function HdmiPowerRail({ placement }: { placement: Record<string, any> }) {
  return <>{parts.map((p: any) => {
    if (!placement[p.name]) throw new Error(`Missing HDMI power placement: ${p.name}`)
    const props = {
      name: p.name, pcbStyle: savedRefdesStyle(p.name),
      manufacturerPartNumber: p.mpn,
      ...placement[p.name],
      connections: Object.fromEntries(Object.entries(p.connections).map(([pin, net]) =>
        [`pin${pin}`, `net.${net}`])),
    }
    if (p.kind === "resistor") return <resistor key={p.name} {...props}
      resistance={p.value} footprint="0402" />
    const footprint = <Hdmifootprint footprintKey={p.footprintKey} />
    if (p.kind === "capacitor") return <capacitor key={p.name} {...props}
      capacitance={p.value} footprint={footprint} />
    if (p.kind === "inductor") return <inductor key={p.name} {...props}
      inductance={p.value} footprint={footprint} />
    return <chip key={p.name} {...props} footprint={footprint}
      pinLabels={Object.fromEntries(Object.entries(p.pinLabels).map(([pin, label]) =>
        [`pin${pin}`, [pin, label]]))}
      noConnect={p.noConnect.map((pin: string) => `pin${pin}`)} />
  })}</>
}
