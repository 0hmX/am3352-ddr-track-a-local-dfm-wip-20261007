// Local surface returns connect PMIC/control Ground pads to through barrels.
export function PmicSurfaceGround() {
  return <>{(["top", "bottom"] as const).map(layer => <copperpour
    key={layer} name={`STANDARD_PMIC_SURFACE_GND_${layer}`} layer={layer}
    connectsTo="net.GND" unbroken coveredWithSolderMask clearance={0.105}
    outline={[{x:15,y:-25},{x:34,y:-25},{x:34,y:-1},{x:15,y:-1}]}
  />)}</>
}
