export type Point3 = [number, number, number]
export type Segment = { start: Point3; end: Point3; widthMm: number }
export type RoutedNet = { name: string; segments: Segment[] }
const dot = (first: Point3, second: Point3) => first.reduce((total, coordinate, i) => total + coordinate * second[i], 0)
const subtract = (first: Point3, second: Point3): Point3 => [first[0] - second[0], first[1] - second[1], first[2] - second[2]]
const clamp = (fraction: number) => Math.max(0, Math.min(1, fraction))

/** Exact closest approach of finite 3D line segments, including interior crossings. */
export function segmentDistance(first: Segment, second: Segment) {
  const firstDirection = subtract(first.end, first.start)
  const secondDirection = subtract(second.end, second.start)
  const offset = subtract(first.start, second.start)
  const firstLengthSquared = dot(firstDirection, firstDirection)
  const secondLengthSquared = dot(secondDirection, secondDirection)
  const projection = dot(secondDirection, offset)
  let firstFraction = 0
  let secondFraction = 0
  if (firstLengthSquared <= 1e-24 && secondLengthSquared <= 1e-24) return Math.hypot(...offset)
  if (firstLengthSquared <= 1e-24) secondFraction = clamp(projection / secondLengthSquared)
  else {
    const firstProjection = dot(firstDirection, offset)
    if (secondLengthSquared <= 1e-24) firstFraction = clamp(-firstProjection / firstLengthSquared)
    else {
      const coupling = dot(firstDirection, secondDirection)
      const denominator = firstLengthSquared * secondLengthSquared - coupling * coupling
      if (denominator > 1e-24) firstFraction = clamp((coupling * projection - firstProjection * secondLengthSquared) / denominator)
      secondFraction = (coupling * firstFraction + projection) / secondLengthSquared
      if (secondFraction < 0) { secondFraction = 0; firstFraction = clamp(-firstProjection / firstLengthSquared) }
      else if (secondFraction > 1) { secondFraction = 1; firstFraction = clamp((coupling - firstProjection) / firstLengthSquared) }
    }
  }
  return Math.hypot(...offset.map((coordinate, i) => coordinate + firstFraction * firstDirection[i] - secondFraction * secondDirection[i]))
}

/** Whole nets are retained; no spatial tiling, clipping, or transitive copper deletion. */
export function selectNeighbors(options: { nets: RoutedNet[]; seeds: string[]; radiusMm: number }) {
  if (!(options.radiusMm > 0)) throw Error("Positive neighbor radius required")
  const seeds = options.seeds.map(name => {
    const net = options.nets.find(net => net.name === name)
    if (!net) throw Error(`Missing seed route ${name}`)
    return net
  })
  return options.nets.filter(net => options.seeds.includes(net.name) || net.segments.some(segment => seeds.some(seed => seed.segments.some(seedSegment => {
    // Conservative bounding-box rejection accelerates densely sampled curved routes.
    const margin = options.radiusMm + (segment.widthMm + seedSegment.widthMm) / 2
    if (segment.start.some((_, axis) => Math.max(segment.start[axis], segment.end[axis]) + margin < Math.min(seedSegment.start[axis], seedSegment.end[axis]) || Math.max(seedSegment.start[axis], seedSegment.end[axis]) + margin < Math.min(segment.start[axis], segment.end[axis]))) return false
    return segmentDistance(segment, seedSegment) <= margin
  }))))
}
