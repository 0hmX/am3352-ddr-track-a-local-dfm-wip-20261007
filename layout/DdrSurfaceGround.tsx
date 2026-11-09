// The source offset includes the checked polygon margin for the 0.1 mm rule.
export function DdrSurfaceGround() {
  return <>{(["top", "bottom"] as const).map(layer => <copperpour
    key={layer} name={`STANDARD_DDR_SURFACE_GND_${layer}`} layer={layer}
    connectsTo="net.GND" unbroken coveredWithSolderMask clearance={0.105}
    outline={[{x:-10,y:-35},{x:10,y:-35},{x:10,y:-12},{x:-10,y:-12}]}
  />)}</>
}
