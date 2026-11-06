/**
 * 3D models for every custom copper footprint on the board.
 *
 * `models/kicad/*.step` are copied unmodified from the KiCad 10 3D library (CC-BY-SA 4.0
 * with exception, see licenses/). KiCad models are authored with their origin at the
 * footprint origin and +Z out of the board, so `modelOriginPosition` is pinned to 0,0,0
 * instead of letting the viewer re-center the mesh (that matters for offset connectors).
 * `models/generated/*.glb` come from scripts/generate-cad-bodies.ts for packages that
 * KiCad does not ship.
 *
 * Copper is never touched here: only the cad_component for each part changes.
 */
import { enclosure } from "tscircuit"
import BGA324 from "./kicad/BGA-324_15.0x15.0mm_Layout18x18_P0.8mm_Ball0.5mm_Pad0.4mm_NSMD.step"
import C0402 from "./kicad/C_0402_1005Metric.step"
import C0603 from "./kicad/C_0603_1608Metric.step"
import C0805 from "./kicad/C_0805_2012Metric.step"
import C1206 from "./kicad/C_1206_3216Metric.step"
import C1210 from "./kicad/C_1210_3225Metric.step"
import R0402 from "./kicad/R_0402_1005Metric.step"
import R1206 from "./kicad/R_1206_3216Metric.step"
import RArray4x0402 from "./kicad/R_Array_Convex_4x0402.step"
import LED0603 from "./kicad/LED_0603_1608Metric.step"
import SOD323 from "./kicad/D_SOD-323.step"
import SOT23_5 from "./kicad/SOT-23-5.step"
import SOT23_6 from "./kicad/SOT-23-6.step"
import SC70_5 from "./kicad/SOT-353_SC-70-5.step"
import SOT583_8 from "./kicad/SOT-583-8.step"
import WSON8_2x2 from "./kicad/WSON-8-1EP_2x2mm_P0.5mm_EP0.9x1.6mm.step"
import DFN8_3x3 from "./kicad/DFN-8-1EP_3x3mm_P0.65mm_EP1.55x2.4mm.step"
import USON10 from "./kicad/USON-10_2.5x1.0mm_P0.5mm.step"
import UQFN12_2x2 from "./kicad/UQFN-12-1EP_2x2mm_P0.4mm_EP1.1x1.1mm.step"
import QFN24_4x4 from "./kicad/QFN-24-1EP_4x4mm_P0.5mm_EP2.7x2.7mm.step"
import WQFN24_3x3 from "./kicad/Texas_RRW0024A_WQFN-24-1EP_3x3mm_P0.4mm_EP1.9x1.9mm.step"
import TQFN48_6x6 from "./kicad/Qorvo_TQFN66-48-1EP_6x6mm_P0.4mm_EP4.2x4.2mm.step"
import QFN64_9x9 from "./kicad/QFN-64-1EP_9x9mm_P0.5mm_EP6x6mm.step"
import TSSOP20 from "./kicad/TSSOP-20_4.4x6.5mm_P0.65mm.step"
import OSC2520 from "./kicad/Oscillator_SMD_SeikoEpson_SG210-4Pin_2.5x2.0mm.step"
import XAL4020 from "./kicad/L_Coilcraft_XAL4020-XXX.step"
import TL3305A from "./kicad/SW_SPST_TL3305A.step"
import USB4105 from "./kicad/USB_C_Receptacle_GCT_USB4105-xx-A_16P_TopMnt_Horizontal.step"
import DM3AT from "./kicad/microSD_HC_Hirose_DM3AT-SF-PEJM5.step"
import HDMI_208658 from "./kicad/HDMI_A_Molex_208658-1001_Horizontal.step"
import RJ45_7499010121A from "./generated/RJ45_Wuerth_7499010121A_Horizontal.glb"
import RSV0016A from "./generated/Texas_RSV0016A_UQFN-16_1.8x2.6mm_P0.4mm.glb"

const origin = { x: 0, y: 0, z: 0 }
const step = (modelUrl: string, rotationOffset = 0) =>
  <cadmodel modelUrl={modelUrl} modelOriginPosition={origin} rotationOffset={rotationOffset} />
const glb = (modelUrl: string) =>
  <cadmodel modelUrl={modelUrl} modelOriginPosition={origin} modelBoardNormalDirection="z+" />

/** Keyed by the footprint keys in data/support-footprints.tsx and hdmi/data/footprints.tsx. */
const byFootprintKey: Record<string, () => JSX.Element> = {
  // passives
  CAP0402_KEMET_B: () => step(C0402),
  C0603: () => step(C0603),
  C0805: () => step(C0805),
  C1206: () => step(C1206), C_1206: () => step(C1206),
  CAP1210: () => step(C1210), CAP1210_KEMET_B: () => step(C1210), C_1210: () => step(C1210),
  R1206: () => step(R1206),
  // pads run along Y, KiCad array runs along X
  CAT10_4X33: () => step(RArray4x0402, 90),
  XAL4020: () => step(XAL4020),
  // EXLA1V0402 is a 4x4mm molded power inductor like XAL4020; its lands run along Y
  EATON_EXLA1V0402: () => step(XAL4020, 90),
  SOD323: () => step(SOD323),
  // logic / regulators
  SOT23_5: () => step(SOT23_5), TI_DBV_5: () => step(SOT23_5),
  SOT23_6: () => step(SOT23_6),
  SC70_5: () => step(SC70_5), TI_DCK_5: () => step(SC70_5),
  TPS61033_DRL: () => step(SOT583_8),
  EFUSE: () => step(WSON8_2x2),
  TPS3851_DRB8: () => step(DFN8_3x3),
  ESD204_DQA: () => step(USON10),
  TUSB320: () => step(UQFN12_2x2),
  PHY_RMQ: () => step(WQFN24_3x3),
  // CYPD3177 (Cypress 002-16934, EP 2.75 nom): closest KiCad body is the EP2.7 4x4 QFN-24
  CYPD3177_QFN24: () => step(QFN24_4x4),
  PMIC: () => step(TQFN48_6x6),
  IT66122_REVD: () => step(QFN64_9x9),
  TSSOP20: () => step(TSSOP20),
  OSC2520: () => step(OSC2520),
  TPD13S523_RSV: () => glb(RSV0016A),
  // electromechanical
  TACT_TL3305A: () => step(TL3305A),
  USBC: () => step(USB4105),
  MICROSD: () => step(DM3AT),
  HDMI_A_MOLEX_2086581001: () => step(HDMI_208658),
  RJ45_7499010121A: () => glb(RJ45_7499010121A),
}

/** `undefined` keeps tscircuit's default (footprinter strings already get models). */
export function cadModelForFootprint(footprintKey?: string) {
  return footprintKey ? byFootprintKey[footprintKey]?.() : undefined
}

export const cadModels = {
  /** AM3352 ZCZ: ball A1 sits at -X/-Y on this footprint, KiCad puts it at -X/+Y. */
  am3352: () => step(BGA324, 90),
  led0603: () => step(LED0603),
  r0402: () => step(R0402),
  c0402: () => step(C0402),
}

/**
 * Enclosure openings for parts that face the outside world. `insertionDirection` is in
 * the unrotated footprint frame (core rotates it with the part); the aperture is sized
 * from the connector shell plus `margin`. Used by <enclosure.fdm.box> in assembly.tsx.
 */
const enclosureOpenings: Record<string, { insertionDirection: "from_bottom" | "from_right" | "from_above"; aperture: () => JSX.Element }> = {
  // GCT USB4105 shell 8.94 x 3.26mm; J_POWER is rotated 180deg so local -Y faces the top edge
  USBC: { insertionDirection: "from_bottom", aperture: () => <enclosure.cutoutaperture shape="pill" width={8.94} height={3.26} margin={0.5} /> },
  // Molex 208658-1001 HDMI-A shell 15.0 x 5.7mm
  HDMI_A_MOLEX_2086581001: { insertionDirection: "from_right", aperture: () => <enclosure.cutoutaperture shape="rect" width={15} height={5.7} margin={0.5} /> },
  // Wurth 7499010121A: full jack face incl. LEDs, 16.2 x 13.65mm
  RJ45_7499010121A: { insertionDirection: "from_right", aperture: () => <enclosure.cutoutaperture shape="rect" width={16.2} height={13.65} margin={0.4} /> },
  // Hirose DM3AT card slot; J_MICROSD is rotated 270deg so local -Y faces the left edge
  MICROSD: { insertionDirection: "from_bottom", aperture: () => <enclosure.cutoutaperture shape="rect" width={12} height={2.2} margin={0.4} /> },
  // TL3305A plunger is actuated through the lid
  TACT_TL3305A: { insertionDirection: "from_above", aperture: () => <enclosure.cutoutaperture shape="circle" radius={1.6} margin={0.3} /> },
}

/** Extra <footprint> props and children that give a part its enclosure opening. */
export function enclosureOpeningFor(footprintKey?: string) {
  const o = footprintKey ? enclosureOpenings[footprintKey] : undefined
  return o ? { insertionDirection: o.insertionDirection, aperture: o.aperture() } : { insertionDirection: undefined, aperture: null }
}
