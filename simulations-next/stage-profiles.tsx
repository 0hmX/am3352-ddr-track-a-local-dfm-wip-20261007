/** Return profiles for the pipeline's `straightened-stages` reduction, derived
 * from the compiled board instead of typed by hand.
 *
 * A profile places one finite return bar under every straightened stage on a
 * signal layer. Its height, thickness and dielectric come from `pcb_stackup`;
 * the reference layer is the nearest copper layer carrying a ground pour.
 * Only the bar width is a modeling choice (DQ0: 1 mm and 2 mm give the same eye).
 *
 * The reduction supports one return bar per profile, so a signal layer with
 * ground on both sides (stripline) is rejected rather than modeled against one
 * plane: tscircuit/pcb-spice-pipeline#50.
 */
export function groundReturnProfile(circuitJson, signalLayer, { widthMm = 2, spacingMm = 0.2 } = {}) {
  const stackup = circuitJson.find(r => r.type === "pcb_stackup")
  if (!stackup) throw new Error('No pcb_stackup; set fabricatorPreset on <board>')
  // Depth below the top surface, top -> bottom as recorded.
  const copper = [], dielectrics = []
  let depth = 0
  for (const layer of stackup.layers.filter(l => l.layer_type !== "soldermask")) {
    const entry = { ...layer, top: depth, center: depth + layer.thickness / 2 }
    ;(layer.layer_type === "copper" ? copper : dielectrics).push(entry)
    depth += layer.thickness
  }
  const signal = copper.find(l => l.layer === signalLayer)
  if (!signal) throw new Error(`${signalLayer} is not a copper layer in pcb_stackup`)
  const groundNets = new Set(circuitJson.filter(r => r.type === "source_net" && r.is_ground).map(r => r.source_net_id))
  const groundLayers = new Set(circuitJson.filter(r => r.type === "pcb_copper_pour" && groundNets.has(r.source_net_id)).map(r => r.layer))
  const planes = copper.filter(l => l.layer !== signalLayer && groundLayers.has(l.layer))
  const above = planes.filter(l => l.center < signal.center).at(-1)
  const below = planes.find(l => l.center > signal.center)
  if (above && below)
    throw new Error(`${signalLayer} is between ground planes ${above.layer} and ${below.layer}; one return bar per profile cannot model it (tscircuit/pcb-spice-pipeline#50)`)
  const plane = above ?? below
  if (!plane) throw new Error(`No ground pour on any layer to return ${signalLayer} current`)
  const between = dielectrics.filter(d => d.center > Math.min(signal.center, plane.center) && d.center < Math.max(signal.center, plane.center))
  const gap = between.reduce((sum, d) => sum + d.thickness, 0)
  if (!between.length || between.some(d => d.relative_permittivity === undefined))
    throw new Error(`Dielectric between ${signalLayer} and ${plane.layer} needs relative_permittivity`)
  const round = v => Number(v.toFixed(6))
  return {
    referenceLayer: plane.layer,
    profile: {
      spacing: `${spacingMm}mm`,
      relativePermittivity: round(between.reduce((sum, d) => sum + d.thickness * d.relative_permittivity, 0) / gap),
      return: {
        width: `${widthMm}mm`,
        thickness: `${plane.thickness}mm`,
        lengthFactor: 1,
        centerY: "0mm",
        // Solver z points up: a plane below the signal has negative centerZ.
        centerZ: `${round(signal.center - plane.center)}mm`,
      },
    },
  }
}

/** The single copper layer of a route with no vias; straightened-stages lanes
 * must share one stage topology (tscircuit/pcb-spice-pipeline#49). */
export function singleLayerRoute(channel) {
  const layers = new Set(channel.trace.route.filter(p => p.route_type === "wire").map(p => p.layer))
  if (channel.trace.route.some(p => p.route_type === "via") || layers.size !== 1)
    throw new Error(`${channel.logicalSignal} changes layer; straightened-stages lanes must share one stage topology (tscircuit/pcb-spice-pipeline#49)`)
  return [...layers][0]
}
