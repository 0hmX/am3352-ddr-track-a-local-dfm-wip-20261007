import { Hdmifootprint } from "../hdmi/components/Hdmifootprint"
/** The five rail test pads and seven-part status circuit present in the saved board. */
export function DebugStatus() {
  const twoPads = (spacing: number, width: number, height: number) => <footprint>
    <smtpad portHints={["pin1"]} shape="rect" pcbX={-spacing / 2} width={width} height={height} />
    <smtpad portHints={["pin2"]} shape="rect" pcbX={spacing / 2} width={width} height={height} />
  </footprint>
  const sheet = { schSheetName: "Debug rails and power status" }
  const testPadPositions = [[27.51, -19.5], [23.11, -15.5], [13.99, -16], [-5.4125, -11.5], [29.325, -6]]
  return <>
    {["SYS_5V", "V3V3", "V1V8", "VDD_MPU", "GND"].map((net, i) => <chip key={net}
      name={`TP_DBG_${net}`} pcbX={testPadPositions[i][0]} pcbY={testPadPositions[i][1]} pinLabels={{ pin1: net }} connections={{ pin1: `net.${net}` }}
      footprint={<footprint><smtpad portHints={["pin1"]} shape="circle" radius={0.6} /></footprint>}
      {...sheet} schX={i * 5 - 10} schY={8} />)}
    <chip name="U_PG_LED" pcbX={-4.5} pcbY={20} layer="bottom" pcbRotation={270} manufacturerPartNumber="SN74AUP1T14DCKR" footprint={<Hdmifootprint footprintKey="TI_DCK_5" />}
      pinLabels={{ pin1: "NC", pin2: "A", pin3: "GND", pin4: "Y", pin5: "VCC" }} noConnect={["pin1"]}
      connections={{ pin2: "net.PG_LED_SENSE", pin3: "net.GND", pin4: "net.PG_LED_K", pin5: "net.V3V3" }}
      {...sheet} schX={0} schY={0} />
    <chip name="D_PG_LED" pcbX={-6.75} pcbY={22.75} layer="bottom" pcbRotation={0} manufacturerPartNumber="APT1608SGC" footprint={twoPads(1.65, 0.8, 0.8)} pinLabels={{ pin1: "K", pin2: "A" }}
      connections={{ pin1: "net.PG_LED_K", pin2: "net.PG_LED_A" }} {...sheet} schX={9} schY={0} />
    <resistor name="R_PG_LED" pcbX={-9.5} pcbY={22.75} layer="bottom" pcbRotation={180} resistance="1k" manufacturerPartNumber="RC0402FR-071KL" footprint={twoPads(1.1, 0.6, 0.6)}
      connections={{ pin1: "net.V3V3", pin2: "net.PG_LED_A" }} {...sheet} schX={9} schY={4} />
    <resistor name="R_PG_LEAK" pcbX={-7.25} pcbY={21} layer="bottom" pcbRotation={0} resistance="10k" manufacturerPartNumber="RC0402FR-0710KL" footprint={twoPads(1.1, 0.6, 0.6)}
      connections={{ pin1: "net.PG_LED_K", pin2: "net.PG_LED_A" }} {...sheet} schX={9} schY={-4} />
    <capacitor name="C_PG_LED" pcbX={-7} pcbY={19} layer="bottom" pcbRotation={180} capacitance="100nF" manufacturerPartNumber="GRM155R71C104KA88D" footprint={twoPads(0.8, 0.4, 0.5)}
      connections={{ pin1: "net.V3V3", pin2: "net.GND" }} {...sheet} schX={0} schY={-5} />
    <resistor name="R_PG_SENSE" pcbX={-1.1615} pcbY={17.05} layer="bottom" pcbRotation={0} resistance="100k" manufacturerPartNumber="RC0402FR-07100KL" footprint={twoPads(1.1, 0.6, 0.6)}
      connections={{ pin1: "net.PMIC_PGOOD", pin2: "net.PG_LED_SENSE" }} {...sheet} schX={-9} schY={0} />
    <resistor name="R_PG_PULLDOWN" pcbX={-3.75} pcbY={16.75} layer="bottom" pcbRotation={90} resistance="100k" manufacturerPartNumber="RC0402FR-07100KL" footprint={twoPads(1.1, 0.6, 0.6)}
      connections={{ pin1: "net.PG_LED_SENSE", pin2: "net.GND" }} {...sheet} schX={-9} schY={-4} />
  </>
}
