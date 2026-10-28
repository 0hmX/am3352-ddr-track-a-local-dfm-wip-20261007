import { ChassisRoutes } from "./ChassisRoutes"

/** Partial Ethernet and chassis connections; other branches still require routing. */
export function EthernetRoutes(){
  const runs = [
    ["ETH_RX_N", ".U_ETH_PHY > .7", ".U_ETH_ESD > .5"],
    ["ETH_RX_P", ".U_ETH_PHY > .8", ".U_ETH_ESD > .4"],
    ["ETH_TX_N", ".U_ETH_PHY > .10", ".U_ETH_ESD > .2"],
    ["ETH_TX_P", ".U_ETH_PHY > .11", ".U_ETH_ESD > .1"],
  ] as const
  return <>{runs.map(([name, from, to]) => <trace key={name} name={`${name}_PHY_ESD`} from={from} to={to} width={0.1} pcbPath={[from,to]} />)}<trace name="ETH_RAMP_CT_LOCAL" from=".U_ETH_RAMP > .4" to=".C_ETH_RAMP_CT > .pin1" width={0.1} pcbPath={[".U_ETH_RAMP > .4", ...[{"x":0.7900000000000063,"y":-0.9499999999999993}], ".C_ETH_RAMP_CT > .pin1"]} />
<trace name="PHY_OSC25_LOCAL" from=".Y_ETH > .3" to=".R_ETH_XI > .pin1" width={0.1} pcbPath={[".Y_ETH > .3", ...[], ".R_ETH_XI > .pin1"]} />
<trace name="PHY_TXD1_LOCAL" from=".U_ETH_PHY > .24" to=".R_ETH_TXD1 > .pin2" width={0.1} pcbPath={[".U_ETH_PHY > .24", ...[{"x":-2.715,"y":1.3250000000000028}], ".R_ETH_TXD1 > .pin2"]} />
<trace name="PHY_TXD0_LOCAL" from=".R_ETH_TXD0 > .pin2" to=".U_ETH_PHY > .23" width={0.1} pcbPath={[".R_ETH_TXD0 > .pin2", ...[{"x":1.3629999999999995,"y":0}], ".U_ETH_PHY > .23"]} />
<trace name="PHY_MDC_LOCAL" from=".R_ETH_MDC > .pin2" to=".U_ETH_PHY > .16" width={0.1} pcbPath={[".R_ETH_MDC > .pin2", ...[{"x":1,"y":-0.490000000000002}], ".U_ETH_PHY > .16"]} />
<trace name="PHY_RBIAS_LOCAL" from=".R_ETH_BIAS > .pin1" to=".U_ETH_PHY > .14" width={0.1} pcbPath={[".R_ETH_BIAS > .pin1", ...[{"x":-0.25,"y":-0.259999999999998}], ".U_ETH_PHY > .14"]} />
<trace name="PHY_XI_LOCAL" from=".R_ETH_XI > .pin2" to=".U_ETH_PHY > .13" width={0.1} pcbPath={[".R_ETH_XI > .pin2", ...[{"x":1.2605077706794248,"y":-0.7505077706794268},{"x":1.2605077706794248,"y":-7.433486231803766},{"x":0.6615037149252174,"y":-8.032490287557977},{"x":-1.9337230001617485,"y":-8.032490287557977},{"x":-1.9337230001617485,"y":-8.046223000161747}], ".U_ETH_PHY > .13"]} />
<ChassisRoutes />
</>}
