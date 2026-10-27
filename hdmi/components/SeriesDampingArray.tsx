import { Hdmifootprint } from "./Hdmifootprint"

/** Four isolated nominal 33-ohm elements; package lands follow the selected BOM. */
export function SeriesDampingArray({ name, connections, footprintKey = "CAT16_4X33", manufacturerPartNumber = "CAT16-330J4LF", ...placement }: {
  name: string
  connections: Record<string, string>
  footprintKey?: Parameters<typeof Hdmifootprint>[0]["footprintKey"]
  manufacturerPartNumber?: string
  [key: string]: unknown
}) {
  const modelName = `ARRAY33_${name.replace(/[^a-zA-Z0-9_]/g, "_")}`
  return <chip name={name} {...placement} manufacturerPartNumber={manufacturerPartNumber}
    pinLabels={Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`pin${i+1}`, [`${i+1}`, `P${i+1}`]]))}
    connections={Object.fromEntries(Object.entries(connections).map(([pin, net]) => [`pin${pin}`, `net.${net}`]))}
    footprint={<Hdmifootprint footprintKey={footprintKey} />}
    spiceModel={<spicemodel source={`.subckt ${modelName} P1 P2 P3 P4 P5 P6 P7 P8
R1 P1 P8 33
R2 P2 P7 33
R3 P3 P6 33
R4 P4 P5 33
.ends ${modelName}`}
      spicePinMapping={Object.fromEntries(Array.from({ length: 8 }, (_, i) => [`P${i+1}`, `pin${i+1}`]))} />}
  />
}
