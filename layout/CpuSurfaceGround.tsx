// A 0.105 mm source offset reserves polygon-approximation margin for the
// board's 0.1 mm copper rule. Fixed through barrels connect these fills.
export function CpuSurfaceGround() {
  return <>{(["top", "bottom"] as const).map(layer => <copperpour
    key={layer} name={`STANDARD_CPU_SURFACE_GND_${layer}`} layer={layer}
    connectsTo="net.GND" unbroken coveredWithSolderMask clearance={0.105}
    outline={[{x:-10,y:-12},{x:10,y:-12},{x:10,y:12},{x:-10,y:12}]}
  />)}</>
}
