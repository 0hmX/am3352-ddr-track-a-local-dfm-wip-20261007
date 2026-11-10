// Keep a 0.5 mm board-edge inset; retain the existing local Ground fills.
export function BoardSurfaceGround(){return <>{(['top','bottom']as const).map(layer=>
  <copperpour key={layer} name={'STANDARD_BOARD_SURFACE_GND_'+layer} layer={layer}
    connectsTo="net.GND" unbroken coveredWithSolderMask clearance={.11}
    outline={[{x:-27.5,y:26},{x:69.5,y:26},{x:69.5,y:-38.5},{x:-27.5,y:-38.5}]}/>
)}</>}
