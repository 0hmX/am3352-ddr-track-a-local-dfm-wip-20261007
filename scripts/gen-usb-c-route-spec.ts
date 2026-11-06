// Writes scripts/usb-c-ports.route.json (the connection list routed by route-usb-c-ports.ts).
const PI = ".Power_input", PG = ".USB_prog", CPU = ".Processor > .U1"
type E = [string, string, string] // [subcircuit selector, component, port]
const sel = ([s, c, p]: E) => `${s} > .${c} > .${p}`
const routes: any[] = []
const L4 = ["top", "inner2", "inner4", "bottom"]
const link = (name: string, net: string, a: E, b: E, width = 0.12, extra: any = {}) =>
  routes.push({ name: "USBCP_" + name, net, width, from: [a[1], a[2]], fromSel: sel(a), to: [b[1], b[2]], toSel: sel(b), layers: L4, viaCost: 60, ...extra })
const drop = (name: string, net: string, a: E, width = 0.2) =>
  routes.push({ name: "USBCP_" + name, net, width, from: [a[1], a[2]], fromSel: sel(a), layers: ["top"], minViaDist: 0.45 })
const pd = (c: string, p: string): E => [PI, c, p]
const pg = (c: string, p: string): E => [PG, c, p]

// ---- PD sink (J_POWER + CYPD3177) ----
link("CC1", "USBC_CC1", pd("J_POWER", "A5"), pd("U_PD", "15"))
link("CC2", "USBC_CC2", pd("J_POWER", "B5"), pd("U_PD", "14"))
link("PD_VBUS_CAP", "USBC_VBUS_RAW", pd("U_PD", "18"), pd("C_PD_VBUS", "pin2"), 0.2)
link("PD_VBUS_FEED", "USBC_VBUS_RAW", pd("C_PD_VBUS", "pin2"), pd("C_RAW_EFUSE", "pin1"), 0.2)
link("NOR_VCC", "USBC_VBUS_RAW", pd("U_TYPEC_NOR", "5"), pd("C_RAW_NOR", "pin1"), 0.2)
link("CONTRACT_N", "PD_CONTRACT_N", pd("U_PD", "3"), pd("U_TYPEC_NOR", "3"))
link("VDC_OUT", "SYS_5V", pd("U_PD", "11"), pd("U_INPUT_EFUSE", "5"), 0.15)
link("ISNK_A", "PD_ISNK_COARSE", pd("U_PD", "5"), pd("R_PD_ISNK_UP", "pin2"))
link("ISNK_B", "PD_ISNK_COARSE", pd("R_PD_ISNK_UP", "pin2"), pd("R_PD_ISNK_DN", "pin2"))
link("VDDD_A", "PD_VDDD", pd("U_PD", "23"), pd("C_PD_VDDD", "pin2"), 0.2)
link("VDDD_B", "PD_VDDD", pd("C_PD_VDDD", "pin2"), pd("C_PD_VDDD_HF1", "pin2"), 0.2)
link("VDDD_C", "PD_VDDD", pd("C_PD_VDDD_HF1", "pin2"), pd("C_PD_VDDD_HF2", "pin2"), 0.2)
link("VDDD_D", "PD_VDDD", pd("C_PD_VDDD_HF2", "pin2"), pd("R_PD_ISNK_UP", "pin1"), 0.15)
link("VDDD_E", "PD_VDDD", pd("U_PD", "12"), pd("U_PD", "13"), 0.12)
link("VDDD_F", "PD_VDDD", pd("U_PD", "12"), pd("R_PD_ISNK_UP", "pin1"), 0.12)
link("VCCD", "PD_VCCD", pd("U_PD", "24"), pd("C_PD_VCCD", "pin2"), 0.2)
for (const p of ["1", "2", "6", "19", "22"]) link("PD_GND_" + p, "GND", pd("U_PD", p), pd("U_PD", "25"), 0.15, { layers: ["top"] })
drop("PD_EP_GND", "GND", pd("U_PD", "25"), 0.3)
for (const c of ["C_PD_VBUS", "C_PD_VDDD", "C_PD_VDDD_HF1", "C_PD_VDDD_HF2", "C_PD_VCCD", "R_PD_ISNK_DN"]) drop(c + "_GND", "GND", pd(c, "pin1"))
drop("NOR_IN1_GND", "GND", pd("U_TYPEC_NOR", "1")); drop("NOR_IN2_GND", "GND", pd("U_TYPEC_NOR", "6"))

// ---- USB0 programming port ----
link("USB0_DP_CPU", "USB0_DP", [".Processor", "U1", "N17"], pg("U_PROG_ESD", "1"), 0.12, { viaCost: 150 })
link("USB0_DM_CPU", "USB0_DM", [".Processor", "U1", "N18"], pg("U_PROG_ESD", "2"), 0.12, { viaCost: 150 })
link("USB0_DP_CONN", "USB0_DP", pg("U_PROG_ESD", "1"), pg("J_USB_PROG", "A6"), 0.12, { viaCost: 150 })
link("USB0_DM_CONN", "USB0_DM", pg("U_PROG_ESD", "2"), pg("J_USB_PROG", "A7"), 0.12, { viaCost: 150 })
link("USB0_DP_FLIP", "USB0_DP", pg("J_USB_PROG", "A6"), pg("J_USB_PROG", "B6"), 0.12)
link("USB0_DM_FLIP", "USB0_DM", pg("J_USB_PROG", "A7"), pg("J_USB_PROG", "B7"), 0.12)
link("USB0_VBUS_JOIN", "USB0_VBUS", pg("J_USB_PROG", "A4"), pg("J_USB_PROG", "A9"), 0.2)
// P15 sits three rows inside the BGA: escape at the board minimum (0.1mm trace, 0.1mm to pads)
link("USB0_VBUS_CPU", "USB0_VBUS", [".Processor", "U1", "P15"], pg("J_USB_PROG", "A4"), 0.1, { clearance: 0.1 })
link("PROG_CC1", "USB_PROG_CC1", pg("J_USB_PROG", "A5"), pg("R_PROG_CC1", "pin1"))
link("PROG_CC2", "USB_PROG_CC2", pg("J_USB_PROG", "B5"), pg("R_PROG_CC2", "pin1"))
for (const [c, p] of [["J_USB_PROG", "A1"], ["J_USB_PROG", "A12"], ["R_PROG_CC1", "pin2"], ["R_PROG_CC2", "pin2"], ["U_PROG_ESD", "3"], ["U_PROG_ESD", "8"]]) drop(`${c}_${p}_GND`, "GND", pg(c, p), 0.25)

const spec = { bbox: [-28, 30, 3, 26.5], res: 0.05, clearance: 0.12, viaClearance: 0.13, viaCost: 60, layers: L4,
  previousOutput: "layout/UsbCPortRoutes.tsx", routes }
await Bun.write("scripts/usb-c-ports.route.json", JSON.stringify(spec, null, 1))
console.log(routes.length, "routes")
