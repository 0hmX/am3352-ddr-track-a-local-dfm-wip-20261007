import { Hdmifootprint } from "../hdmi/components/Hdmifootprint"
/** The five rail test pads and seven-part status circuit present in the saved board. */
export function DebugStatus() {
  const sheet = { schSheetName: "Debug rails and power status" }
  return <>
    {["SYS_5V", "V3V3", "V1V8", "VDD_MPU", "GND"].map((net, i) => <chip key={net}
      name={`TP_DBG_${net}`} pinLabels={{ pin1: net }} connections={{ pin1: `net.${net}` }}
      footprint={<footprint><smtpad portHints={["pin1"]} shape="circle" radius={0.75} /></footprint>}
      {...sheet} schX={i * 5 - 10} schY={8} />)}
    <chip name="U_PG_LED" manufacturerPartNumber="SN74AUP1T14DCKR" footprint={<Hdmifootprint footprintKey="TI_DCK_5" />}
      pinLabels={{ pin1: "NC", pin2: "A", pin3: "GND", pin4: "Y", pin5: "VCC" }} noConnect={["pin1"]}
      connections={{ pin2: "net.PG_LED_SENSE", pin3: "net.GND", pin4: "net.PG_LED_K", pin5: "net.V3V3" }}
      {...sheet} schX={0} schY={0} />
    <chip name="D_PG_LED" manufacturerPartNumber="APT1608SGC" footprint="0603" pinLabels={{ pin1: "K", pin2: "A" }}
      connections={{ pin1: "net.PG_LED_K", pin2: "net.PG_LED_A" }} {...sheet} schX={9} schY={0} />
    <resistor name="R_PG_LED" resistance="1k" manufacturerPartNumber="RC0402FR-071KL" footprint="0402"
      connections={{ pin1: "net.V3V3", pin2: "net.PG_LED_A" }} {...sheet} schX={9} schY={4} />
    <resistor name="R_PG_LEAK" resistance="10k" manufacturerPartNumber="RC0402FR-0710KL" footprint="0402"
      connections={{ pin1: "net.PG_LED_K", pin2: "net.PG_LED_A" }} {...sheet} schX={9} schY={-4} />
    <capacitor name="C_PG_LED" capacitance="100nF" manufacturerPartNumber="GRM155R71C104KA88D" footprint="0402"
      connections={{ pin1: "net.V3V3", pin2: "net.GND" }} {...sheet} schX={0} schY={-5} />
    <resistor name="R_PG_SENSE" resistance="100k" manufacturerPartNumber="RC0402FR-07100KL" footprint="0402"
      connections={{ pin1: "net.PMIC_PGOOD", pin2: "net.PG_LED_SENSE" }} {...sheet} schX={-9} schY={0} />
    <resistor name="R_PG_PULLDOWN" resistance="100k" manufacturerPartNumber="RC0402FR-07100KL" footprint="0402"
      connections={{ pin1: "net.PG_LED_SENSE", pin2: "net.GND" }} {...sheet} schX={-9} schY={-4} />
  </>
}
