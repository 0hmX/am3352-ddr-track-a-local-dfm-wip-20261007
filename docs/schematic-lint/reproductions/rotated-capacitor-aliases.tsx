/** Native reproduction: stock vertical symbols lose pos/neg source-port hints.
 * Build this TSX, then compare C_H and C_V source_port.port_hints. Both still
 * connect numbered pin1 to V3V3 and pin2 to GND; no Circuit JSON is authored.
 */
export default function RotatedCapacitorAliases() {
  return <board width={12} height={8} routingDisabled>
    {[0, -90].map((schRotation, i) => <capacitor key={i} name={i ? "C_V" : "C_H"}
      capacitance="10uF" pcbX={i * 4 - 2} schX={i * 4 - 2} schRotation={schRotation}
      connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      footprint={<footprint>
        <smtpad portHints={["pin1"]} shape="rect" width={1} height={1} pcbX={-1} />
        <smtpad portHints={["pin2"]} shape="rect" width={1} height={1} pcbX={1} />
      </footprint>} />)}
  </board>
}
