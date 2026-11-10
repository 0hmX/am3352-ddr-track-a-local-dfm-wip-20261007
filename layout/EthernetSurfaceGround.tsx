// The 0.11mm offset preserves measured clearance around the plated connectors.
export function EthernetSurfaceGround() {
  return <>{(["top", "bottom"] as const).map(layer => <copperpour
    key={layer} name={`STANDARD_ETHERNET_SURFACE_GND_${layer}`} layer={layer}
    connectsTo="net.GND" unbroken coveredWithSolderMask clearance={0.11}
    outline={[{x:15,y:-1},{x:61,y:-1},{x:61,y:23},{x:15,y:23}]}
  />)}</>
}
