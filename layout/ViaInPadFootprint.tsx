import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react"
import type { LayerRefInput } from "circuit-json"

export type ViaInPadProps = { viaInPad?: boolean; viaInPadToLayer?: LayerRefInput }

/** Keep pad geometry authoritative; a contained native via inherits its pad's net. */
export function withViaInPad(
  footprint: ReactElement<{ children?: ReactNode }>,
  enabled: boolean,
  connections: Record<string, unknown> | undefined,
  pinLabels: Record<string, readonly string[]>,
  toLayer: LayerRefInput = "bottom",
) {
  if (!enabled) return footprint
  const connected = new Set(Object.entries(connections ?? {}).filter(([, target]) =>
    typeof target === "string" ? target.length > 0 : Array.isArray(target) && target.length > 0,
  ).flatMap(([selector]) => {
    const pin = Object.keys(pinLabels).find(pin => pin === selector || pinLabels[pin].includes(selector))
    return pin ? [pin, ...pinLabels[pin]] : [selector]
  }))
  return cloneElement(footprint, {}, ...Children.toArray(footprint.props.children).flatMap(child => {
    if (!isValidElement<any>(child) || child.type !== "smtpad") return [child]
    const pin = child.props.portHints?.find((hint: string) => connected.has(hint))
    return !pin ? [child] : [child, <via key={`via_${pin}`} name={`padVia_${pin}`}
      pcbX={child.props.pcbX} pcbY={child.props.pcbY}
      holeDiameter={0.15} outerDiameter={0.3} fromLayer="top" toLayer={toLayer} />]
  }))
}
