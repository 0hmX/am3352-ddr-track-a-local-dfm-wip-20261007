import library from "../data/footprints"

/** Literal selected copper lands; coordinates are mm with +Y upward. */
export function Hdmifootprint({ footprintKey }: { footprintKey: keyof typeof library }) {
  const footprint: any = library[footprintKey]
  if (!footprint) throw new Error(`Unknown verified HDMI footprint: ${footprintKey}`)
  const c = footprint.courtyard
  return <footprint>
    {c && <courtyardrect pcbX={c.centerX ?? 0} pcbY={c.centerY ?? 0} width={c.width} height={c.height} />}
    {footprint.pads.map((p: any, i: number) => {
      const portHints = [`pin${p.portIndex}`]
      if (p.type === "thru_hole") {
        if (p.drill?.[0] === "oval") return <platedhole key={i} portHints={portHints}
          pcbX={p.x} pcbY={p.y} shape="pill" holeWidth={p.drill[1]} holeHeight={p.drill[2]}
          outerWidth={p.width} outerHeight={p.height} />
        return <platedhole key={i} portHints={portHints} pcbX={p.x} pcbY={p.y}
          shape="circle" holeDiameter={p.drill[0]} outerDiameter={Math.min(p.width, p.height)} />
      }
      return <smtpad key={i} portHints={portHints} pcbX={p.x} pcbY={p.y} shape="rect"
        width={p.width} height={p.height} cornerRadius={p.cornerRadius ?? 0} solderMaskMargin={0.05}
        noSolderPaste={footprintKey === "IT66122_REVD" && p.pin === "65"} />
    })}
    {/* Declared assembly design: nine 1.3mm windows cover 60.8% of the 5mm EP. */}
    {footprintKey === "IT66122_REVD" && [-1.6, 0, 1.6].flatMap((x) =>
      [-1.6, 0, 1.6].map((y) => <solderpaste key={`${x}:${y}`} shape="rect"
        pcbX={x} pcbY={y} width={1.3} height={1.3} />))}
  </footprint>
}
