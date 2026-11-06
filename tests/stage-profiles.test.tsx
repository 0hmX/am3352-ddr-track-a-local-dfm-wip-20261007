import { expect, test } from "bun:test"
import { groundReturnProfile, singleLayerRoute } from "../simulations-next/stage-profiles"

// The board's JLC 8-layer stackup with GND pours on inner1, inner3 and inner6.
const copper = (layer, thickness = 0.0152) => ({ layer_type: "copper", layer, thickness })
const dielectric = (thickness, relative_permittivity) => ({ layer_type: "dielectric", thickness, relative_permittivity })
const records = [
  { type: "pcb_stackup", layers: [
    copper("top", 0.035), dielectric(0.0994, 4.1), copper("inner1"), dielectric(0.2, 4.36), copper("inner2"),
    dielectric(0.1088, 4.16), copper("inner3"), dielectric(0.2, 4.36), copper("inner4"), dielectric(0.1088, 4.16),
    copper("inner5"), dielectric(0.2, 4.36), copper("inner6"), dielectric(0.0994, 4.1), copper("bottom", 0.035),
  ] },
  { type: "source_net", source_net_id: "gnd", is_ground: true },
  { type: "source_net", source_net_id: "vcc", is_ground: false },
  ...["inner1", "inner3", "inner6"].map(layer => ({ type: "pcb_copper_pour", layer, source_net_id: "gnd" })),
  { type: "pcb_copper_pour", layer: "inner2", source_net_id: "vcc" },
]

test("top-layer return is the inner1 GND plane from the stackup", () => {
  expect(groundReturnProfile(records, "top")).toEqual({
    referenceLayer: "inner1",
    profile: { spacing: "0.2mm", relativePermittivity: 4.1, return: {
      width: "2mm", thickness: "0.0152mm", lengthFactor: 1, centerY: "0mm", centerZ: "-0.1245mm" } },
  })
  expect(groundReturnProfile(records, "bottom").referenceLayer).toBe("inner6")
  expect(groundReturnProfile(records, "bottom").profile.return.centerZ).toBe("0.1245mm")
})

test("a layer between two GND planes is rejected, not modeled against one", () => {
  expect(() => groundReturnProfile(records, "inner2")).toThrow(/inner1 and inner3.*#50/)
})

test("lanes that change layer are rejected", () => {
  const route = (...points) => ({ logicalSignal: "DQS", trace: { route: points } })
  expect(singleLayerRoute(route({ route_type: "wire", layer: "top" }, { route_type: "wire", layer: "top" }))).toBe("top")
  expect(() => singleLayerRoute(route({ route_type: "wire", layer: "top" }, { route_type: "via" }, { route_type: "wire", layer: "inner2" }))).toThrow(/#49/)
})
