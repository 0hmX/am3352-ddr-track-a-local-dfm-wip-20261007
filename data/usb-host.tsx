/**
 * USB1 host port: USB-A receptacle, TPS2051B current-limited VBUS switch, ESD.
 * Same part/placement/footprint shapes as data/support-*.tsx so <Support> renders it.
 *
 * AM3352 USB1 balls (ZCZ): DP R17, DM R18, VBUS T18, ID P17 (ID tied to VSS: host only).
 * VBUS is always on (EN tied to IN); USB1_DRVVBUS (F15) is left unused.
 * TPS2051B DBV pinout per TI SLVS514Q Table 5-1: 1 OUT, 2 GND, 3 OC#, 4 EN (active high), 5 IN.
 */
export const usbHostSheet = "USB host"

export const usbHostParts = [
  {
    name: "J_USB_HOST", kind: "chip", mpn: "67643-0910", sheet: usbHostSheet,
    footprintKey: "USB_A_MOLEX_67643",
    pinLabels: { "1": "VBUS", "2": "DM", "3": "DP", "4": "GND", SH: "SHIELD" },
    noConnect: [],
    connections: { "1": "USB1_VBUS", "2": "USB1_DM", "3": "USB1_DP", "4": "GND", SH: "GND" },
  },
  {
    name: "U_USB_PWR", kind: "chip", mpn: "TPS2051BDBVR", sheet: usbHostSheet, package: "SOT-23-5 DBV",
    footprintKey: "SOT23_5",
    pinLabels: { "1": "OUT", "2": "GND", "3": "OC", "4": "EN", "5": "IN" },
    noConnect: ["3"],
    connections: { "1": "USB1_VBUS", "2": "GND", "4": "SYS_5V", "5": "SYS_5V" },
  },
  {
    name: "U_USB_ESD", kind: "chip", mpn: "ESD204DQAR", sheet: usbHostSheet,
    footprintKey: "ESD204_DQA",
    pinLabels: { "1": "IO1", "2": "IO2", "3": "GND", "4": "IO3", "5": "IO4", "6": "NC", "7": "NC", "8": "GND", "9": "NC", "10": "NC" },
    noConnect: ["4", "5", "6", "7", "9", "10"],
    connections: { "1": "USB1_DP", "2": "USB1_DM", "3": "GND", "8": "GND" },
  },
  {
    name: "C_USB_VBUS", kind: "capacitor", value: "22uF", mpn: "GRM32ER71E226KE15L", sheet: usbHostSheet,
    package: "1210", footprintKey: "CAP1210", useImportedFootprint: true,
    pinLabels: { "1": "1", "2": "2" }, noConnect: [], connections: { "1": "USB1_VBUS", "2": "GND" },
  },
  {
    name: "C_USB_VBUS_HF", kind: "capacitor", value: "100nF", mpn: "GRM155R71C104KA88D", sheet: usbHostSheet,
    footprint: "0402", pinLabels: { "1": "1", "2": "2" }, noConnect: [], connections: { "1": "USB1_VBUS", "2": "GND" },
  },
  {
    name: "C_USB_IN", kind: "capacitor", value: "1uF", mpn: "C0402C105K4PACTU", sheet: usbHostSheet,
    footprint: "0402", pinLabels: { "1": "1", "2": "2" }, noConnect: [], connections: { "1": "SYS_5V", "2": "GND" },
  },
]

/** Top-left corner: the only edge region free on every copper layer. */
export const usbHostPlacement: Record<string, { pcbX: number; pcbY: number; pcbRotation: number; layer: "top"; isAllowedToBeOffBoard?: boolean }> = {
  // mouth (local -Y) faces the top edge; body overhangs the edge like the RJ45 does
  J_USB_HOST: { pcbX: -15.6, pcbY: 18, pcbRotation: 180, layer: "top", isAllowedToBeOffBoard: true },
  U_USB_ESD: { pcbX: -9, pcbY: 17.5, pcbRotation: 0, layer: "top" },
  U_USB_PWR: { pcbX: -8, pcbY: 24.2, pcbRotation: 0, layer: "top" },
  C_USB_VBUS: { pcbX: -6, pcbY: 19.8, pcbRotation: 90, layer: "top" },
  C_USB_VBUS_HF: { pcbX: -10.2, pcbY: 20.6, pcbRotation: 90, layer: "top" },
  C_USB_IN: { pcbX: -5, pcbY: 25, pcbRotation: 0, layer: "top" },
}

/** KiCad 10 Connector_USB.pretty/USB_A_Molex_67643_Horizontal, Y flipped to +Y up. */
export const usbHostFootprints = {
  USB_A_MOLEX_67643: {
    source: "Connector_USB.pretty/USB_A_Molex_67643_Horizontal.kicad_mod",
    pads: [
      { pin: "1", type: "thru_hole", shape: "roundrect", x: 0, y: 0, rotation: 0, width: 1.6, height: 1.5, drill: [0.95] },
      { pin: "2", type: "thru_hole", shape: "circle", x: 2.5, y: 0, rotation: 0, width: 1.6, height: 1.6, drill: [0.95] },
      { pin: "3", type: "thru_hole", shape: "circle", x: 4.5, y: 0, rotation: 0, width: 1.6, height: 1.6, drill: [0.95] },
      { pin: "4", type: "thru_hole", shape: "circle", x: 7, y: 0, rotation: 0, width: 1.6, height: 1.6, drill: [0.95] },
      { pin: "SH", type: "thru_hole", shape: "circle", x: -3.07, y: -2.71, rotation: 0, width: 3, height: 3, drill: [2.3] },
      { pin: "SH", type: "thru_hole", shape: "circle", x: 10.07, y: -2.71, rotation: 0, width: 3, height: 3, drill: [2.3] },
    ],
  },
}

/** KiCad F.CrtYd, Y flipped: [minX, minY, maxX, maxY] */
export const usbHostCourtyards = { USB_A_MOLEX_67643: { bounds: [-4.2, -13.49, 11.2, 2.77] } }
