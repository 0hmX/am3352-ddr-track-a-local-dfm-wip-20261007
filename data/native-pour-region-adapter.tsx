import type { CopperPour } from '@tscircuit/core'

type XY = readonly [number, number]
/** Frozen, already-cleared copper geometry. This adapter renders polygons, not solver input regions. */
export function bindFrozenCopperRegion(instance: CopperPour | null, path: string) {
  if (!instance) return
  if (!path.endsWith('Z') || !path.split('Z').filter(Boolean).every(ring => ring.startsWith('M'))) throw new Error('Unsupported frozen copper path')
  const rings = path.split('Z').filter(Boolean).map(ring => ring.slice(1).split('L').map(point => { const pair = point.split(','); if (pair.length !== 2 || pair.some(value => !value.trim())) throw new Error('Invalid frozen copper coordinate'); return pair.map(Number) as [number,number] }))
  if (!rings.length || rings.some(ring => ring.length < 3 || ring.some(p => p.length !== 2 || !p.every(Number.isFinite)))) throw new Error('Invalid frozen copper boundary')
  const primitive = instance as any
  if (primitive.config?.componentName !== 'CopperPour' || typeof primitive.doInitialPcbCopperPourRender !== 'function' || typeof primitive.getSubcircuit !== 'function') throw new Error('Frozen copper adapter: incompatible CopperPour API')
  // Frozen boundaries have already undergone island selection. Core 0.0.2217's
  // cleanup cannot handle some saved tangent segments; render after cleanup,
  // before PcbDesignRuleChecks. This preserves rather than regenerates copper.
  primitive.doInitialPcbCopperPourRender = function () {}
  primitive.doInitialPcbSimulationRender = function () {
    if (this.root?.pcbDisabled) return
    const db = this.root?.db
    const subcircuit = this.getSubcircuit()
    const props = this._parsedProps
    const net = subcircuit.selectOne(props.connectsTo, {type:'net'})
    if (!net?.source_net_id || typeof db?.pcb_copper_pour?.insert !== 'function') throw new Error(`Frozen copper adapter cannot bind ${props.connectsTo}`)
    const ring = (points: readonly XY[]) => ({vertices: points.map(([x,y])=>({x,y}))})
    db.pcb_copper_pour.insert({shape:'brep', layer:props.layer, source_net_id:net.source_net_id,
      subcircuit_id:subcircuit.subcircuit_id, covered_with_solder_mask:props.coveredWithSolderMask,
      brep_shape:{outer_ring:ring(rings[0]), inner_rings:rings.slice(1).map(ring)}})
  }
  primitive.doInitialPcbViaStitchRender = function () {
    if (this._getBoard()?._parsedProps.enableViaStitching) throw new Error('Frozen copper regions do not support automatic via stitching')
  }
}
