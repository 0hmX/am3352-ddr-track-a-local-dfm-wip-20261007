/**
 * SYSBOOT2 and SYSBOOT10 completion. Both trunks run on Inner6 (otherwise unused signal layer) so the
 * bottom-side RN_HDMI_3 pad vias only span Bottom..Inner6 and stay clear of the Inner5 HDMI_D12 run under pad 2.
 * The SYS6 pull-up Inner5 jog (data/cloud-sys6-real-terminal-routes.json pullToCpu) was moved off the R3 ball.
 */
const via = (name: string, x: number, y: number, from: string, to: string, connectsTo: string) =>
  <via name={name} pcbX={x} pcbY={y} fromLayer={from as any} toLayer={to as any} holeDiameter={.15} outerDiameter={.30} connectsTo={connectsTo} />
const path = (pts: number[][], layer: string) => pts.map(([x, y]) => ({ x, y, layer }))
const REF = ".Processor > .U1 > .A1"
export function CloudSysboot2And10Routes() {
  const sys2 = [[4.4, -5.2], [4.4, -10.2], [6, -11.8], [6, -12.475]]
  const sys10 = [[6, -5.2], [6, -5.5], [7, -6.5], [7, -12.475]]
  return <group name="Cloud_SYSBOOT2_10" pcbX={0} pcbY={0} pcbRelative>
    {via("SYS2_CPU_VIP", 4.4, -5.2, "top", "inner6", ".Processor > .U1 > .R3")}
    {via("SYS2_RN3_VIP", 6, -12.475, "bottom", "inner6", ".HDMI > .RN_HDMI_3 > .2")}
    {via("SYS10_CPU_VIP", 6, -5.2, "top", "inner6", ".Processor > .U1 > .U3")}
    {via("SYS10_RN3_VIP", 7, -12.475, "bottom", "inner6", ".HDMI > .RN_HDMI_3 > .4")}
    {via("SYS10_PULL_VIP", 8.5, -7.6, "top", "inner6", "net.SYSBOOT10")}
    <trace name="SYS2_CPU_ARRAY_I6" from="SYS2_CPU_VIP.inner6" to="SYS2_RN3_VIP.inner6" width={.1} pcbPathRelativeTo={REF}
      pcbPaths={[["SYS2_CPU_VIP.inner6", ...path(sys2, "inner6"), "SYS2_RN3_VIP.inner6"]] as any} />
    <trace name="SYS10_CPU_ARRAY_I6" from="SYS10_CPU_VIP.inner6" to="SYS10_RN3_VIP.inner6" width={.1} pcbPathRelativeTo={REF}
      pcbPaths={[["SYS10_CPU_VIP.inner6", ...path(sys10, "inner6"), "SYS10_RN3_VIP.inner6"]] as any} />
    <trace name="SYS10_PULL_I6" from="SYS10_PULL_VIP.inner6" to="net.SYSBOOT10" width={.1} pcbPathRelativeTo={REF}
      pcbPaths={[["SYS10_PULL_VIP.inner6", ...path([[8.5, -7.6], [7, -7.6]], "inner6")]] as any} />
    <trace name="SYS10_PULL_TOP" from=".Boot_and_clock > .R_BOOT10 > .pin1" to="SYS10_PULL_VIP.top" width={.1} pcbPathRelativeTo={REF}
      pcbPaths={[[".Boot_and_clock > .R_BOOT10 > .pin1", ...path([[9.5, -7.61], [8.5, -7.6]], "top"), "SYS10_PULL_VIP.top"]] as any} />
  </group>
}
