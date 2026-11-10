// Checked surface return paths replace pad-centered partial-span Ground vias.
export function HdmiSurfaceGround() {
  return <>{(["top", "bottom"] as const).map(layer => <copperpour
    key={layer} name={`STANDARD_HDMI_SURFACE_GND_${layer}`} layer={layer}
    connectsTo="net.GND" unbroken coveredWithSolderMask clearance={0.105}
    outline={[{x:34,y:-38},{x:61,y:-38},{x:61,y:-1},{x:34,y:-1}]}
  />)}</>
}
