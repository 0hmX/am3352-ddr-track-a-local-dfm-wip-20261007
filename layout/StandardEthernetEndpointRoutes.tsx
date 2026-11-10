import {cloneElement} from "react"
import {mapNativeElements} from "./mapNativeElements"

// Literal native routes replace the affected mounted JSON-backed paths.
// Preserve nonzero wires; extend only selected pad-centered physical barrels.
const routes = {
  "CLOUD_ETH_21_PHY_TX_EN": <trace name="CLOUD_ETH_21_PHY_TX_EN" from="STD_CLOUD_ETH_21_PHY_TX_EN_BEGIN.inner2" to="STD_CLOUD_ETH_21_PHY_TX_EN_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_21_PHY_TX_EN_BEGIN.inner2", {"x":38.1,"y":12.4625,"layer":"inner2"}, {"x":37.3625,"y":12.4625,"layer":"inner2"},
      {"x":35.51,"y":10.610000000000001,"layer":"inner2"}, {"x":35.51,"y":10,"layer":"inner2"}, "STD_CLOUD_ETH_21_PHY_TX_EN_END.inner2",
  ]]} />,
  "CLOUD_ETH_22_PHY_LED0": <trace name="CLOUD_ETH_22_PHY_LED0" from="STD_CLOUD_ETH_22_PHY_LED0_BEGIN.inner2" to="STD_CLOUD_ETH_22_PHY_LED0_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_22_PHY_LED0_BEGIN.inner2", {"x":39.5,"y":12.4625,"layer":"inner2"}, {"x":39.5,"y":14.759999999999998,"layer":"inner2"},
      {"x":41.49,"y":16.75,"layer":"inner2"}, "STD_CLOUD_ETH_22_PHY_LED0_END.inner2",
  ]]} />,
  "CLOUD_ETH_24_PHY_CRS_DV": <trace name="CLOUD_ETH_24_PHY_CRS_DV" from="STD_CLOUD_ETH_24_PHY_CRS_DV_BEGIN.inner4" to="STD_CLOUD_ETH_24_PHY_CRS_DV_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_24_PHY_CRS_DV_BEGIN.inner4", {"x":37.4625,"y":14.5,"layer":"inner4"}, {"x":37.5625,"y":14.5,"layer":"inner4"},
      {"x":37.8125,"y":14.75,"layer":"inner4"}, {"x":37.8125,"y":19.927500000000002,"layer":"inner4"}, {"x":37.74,"y":20,"layer":"inner4"},
      "STD_CLOUD_ETH_24_PHY_CRS_DV_END.inner4",
  ]]} />,
  "CLOUD_ETH_30_ETH_MDIO_ISO": <trace name="CLOUD_ETH_30_ETH_MDIO_ISO" from="MDIO_PHY_THROUGH.inner2" to="STD_CLOUD_ETH_30_ETH_MDIO_ISO_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "MDIO_PHY_THROUGH.inner2", {"x":39,"y":15.5375,"layer":"inner2"}, {"x":39,"y":17.6231,"layer":"inner2"},
      {"x":38.323100000000004,"y":18.3,"layer":"inner2"}, {"x":37.066,"y":18.3,"layer":"inner2"}, {"x":37.066,"y":18.326,"layer":"inner2"},
      {"x":32.49,"y":18.326,"layer":"inner2"}, {"x":32.49,"y":18.3,"layer":"inner2"}, "STD_CLOUD_ETH_30_ETH_MDIO_ISO_END.inner2",
  ]]} />,
  "CLOUD_ETH_33_ETH_TX_N": <trace name="CLOUD_ETH_33_ETH_TX_N" from="STD_CLOUD_ETH_33_ETH_TX_N_BEGIN.inner2" to=".Ethernet_and_RGB_expansion > .J_ETH > .3" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_33_ETH_TX_N_BEGIN.inner2", {"x":41.815,"y":14.5,"layer":"inner2"}, {"x":44.215,"y":16.9,"layer":"inner2"},
      {"x":49.75,"y":16.9,"layer":"inner2"}, ".Ethernet_and_RGB_expansion > .J_ETH > .3",
  ]]} />,
  "CLOUD_ETH_38_ETH_TX_P": <trace name="CLOUD_ETH_38_ETH_TX_P" from="STD_CLOUD_ETH_38_ETH_TX_P_BEGIN.inner2" to=".Ethernet_and_RGB_expansion > .J_ETH > .1" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_38_ETH_TX_P_BEGIN.inner2", {"x":41.815,"y":15,"layer":"inner2"}, {"x":44.115,"y":17.3,"layer":"inner2"},
      {"x":48.6175,"y":17.3,"layer":"inner2"}, {"x":49.16,"y":17.8425,"layer":"inner2"}, {"x":49.16,"y":18.85,"layer":"inner2"},
      ".Ethernet_and_RGB_expansion > .J_ETH > .1",
  ]]} />,
  "CLOUD_ETH_39_PHY_LED0": <trace name="CLOUD_ETH_39_PHY_LED0" from="STD_CLOUD_ETH_39_PHY_LED0_BEGIN.inner4" to="STD_CLOUD_ETH_39_PHY_LED0_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_39_PHY_LED0_BEGIN.inner4", {"x":41.49,"y":16.75,"layer":"inner4"}, {"x":41.49,"y":22,"layer":"inner4"},
      {"x":44.465,"y":24.975,"layer":"inner4"}, {"x":44.49,"y":25,"layer":"inner4"}, {"x":44.49,"y":25.5,"layer":"inner4"},
      "STD_CLOUD_ETH_39_PHY_LED0_END.inner4",
  ]]} />,
  "CLOUD_ETH_41_PHY_RX_ER": <trace name="CLOUD_ETH_41_PHY_RX_ER" from="STD_CLOUD_ETH_41_PHY_RX_ER_BEGIN.inner4" to="STD_CLOUD_ETH_41_PHY_RX_ER_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_41_PHY_RX_ER_BEGIN.inner4", {"x":37.4625,"y":13.5,"layer":"inner4"}, {"x":38.793,"y":13.5,"layer":"inner4"},
      {"x":41.164,"y":15.871,"layer":"inner4"}, {"x":41.164,"y":22.3859,"layer":"inner4"}, {"x":41.2781,"y":22.5,"layer":"inner4"},
      {"x":41.49,"y":22.5,"layer":"inner4"}, "STD_CLOUD_ETH_41_PHY_RX_ER_END.inner4",
  ]]} />,
  "CLOUD_ETH_44_ETH_RX_P": <trace name="CLOUD_ETH_44_ETH_RX_P" from="STD_CLOUD_ETH_44_ETH_RX_P_BEGIN.inner2" to=".Ethernet_and_RGB_expansion > .J_ETH > .4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_44_ETH_RX_P_BEGIN.inner2", {"x":41.815,"y":13.5,"layer":"inner2"}, {"x":44.505,"y":16.19,"layer":"inner2"},
      ".Ethernet_and_RGB_expansion > .J_ETH > .4",
  ]]} />,
  "CLOUD_ETH_45_RMII1_TXD1": <trace name="CLOUD_ETH_45_RMII1_TXD1" from=".Processor > .U1 > .K16" to="STD_CLOUD_ETH_45_RMII1_TXD1_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .K16", {"x":0.4,"y":5.2,"layer":"inner2","via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":0.4,"y":5.2,"layer":"inner2"},
      {"x":6.300000000000002,"y":11.100000000000001,"layer":"inner2"}, {"x":8.500000000000002,"y":11.100000000000001,"layer":"inner2"}, {"x":10.49,"y":13.09,"layer":"inner2"},
      {"x":10.49,"y":13.1,"layer":"inner2"}, "STD_CLOUD_ETH_45_RMII1_TXD1_END.inner2",
  ]]} />,
  "CLOUD_ETH_46_RMII1_TX_EN_ISO": <trace name="CLOUD_ETH_46_RMII1_TX_EN_ISO" from="STD_CLOUD_ETH_46_RMII1_TX_EN_ISO_BEGIN.inner2" to="STD_CLOUD_ETH_46_RMII1_TX_EN_ISO_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_46_RMII1_TX_EN_ISO_BEGIN.inner2", {"x":34.49,"y":10,"layer":"inner2"}, {"x":34.49,"y":6.034999999999997,"layer":"inner2"},
      {"x":41.9,"y":-1.375,"layer":"inner2"}, "STD_CLOUD_ETH_46_RMII1_TX_EN_ISO_END.inner2",
  ]]} />,
  "CLOUD_ETH_47_RMII1_TXD1_ISO": <trace name="CLOUD_ETH_47_RMII1_TXD1_ISO" from=".Ethernet_and_RGB_expansion > .R_ETH_TXD1 > .pin1" to="STD_CLOUD_ETH_47_RMII1_TXD1_ISO_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Ethernet_and_RGB_expansion > .R_ETH_TXD1 > .pin1", {"x":36.74,"y":11.2,"layer":"inner4","via":true,"fromLayer":"top","toLayer":"inner4"}, {"x":36.74,"y":11.2,"layer":"inner4"},
      {"x":37.225,"y":10.715,"layer":"inner4"}, {"x":37.225,"y":2.35,"layer":"inner4"}, {"x":41.9,"y":-2.324999999999997,"layer":"inner4"},
      {"x":41.9,"y":-2.675,"layer":"inner4"}, "STD_CLOUD_ETH_47_RMII1_TXD1_ISO_END.inner4",
  ]]} />,
  "CLOUD_ETH_49_RMII1_TXD0_ISO": <trace name="CLOUD_ETH_49_RMII1_TXD0_ISO" from="STD_CLOUD_ETH_49_RMII1_TXD0_ISO_BEGIN.inner2" to=".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .17" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_49_RMII1_TXD0_ISO_BEGIN.inner2", {"x":34.49,"y":12,"layer":"inner2"}, {"x":35.12688235294118,"y":11.363117647058822,"layer":"inner2"},
      {"x":35.12688235294118,"y":9.524,"layer":"inner2"}, {"x":42.226,"y":2.4248823529411805,"layer":"inner2"}, {"x":42.226,"y":-1.9108999999999998,"layer":"inner2"},
      {"x":42.1119,"y":-2.025,"layer":"inner2"}, {"x":41.9,"y":-2.025,"layer":"inner2"}, {"x":41.9,"y":-2.025,"layer":"inner2","via":true,"fromLayer":"inner2","toLayer":"top"},
      ".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .17",
  ]]} />,
  "CLOUD_ETH_53_RMII1_RXD0_ISO": <trace name="CLOUD_ETH_53_RMII1_RXD0_ISO" from=".Ethernet_and_RGB_expansion > .R_ETH_RXD0 > .pin2" to="STD_CLOUD_ETH_53_RMII1_RXD0_ISO_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Ethernet_and_RGB_expansion > .R_ETH_RXD0 > .pin2", {"x":34.49,"y":16.8,"layer":"inner2","via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":34.49,"y":16.8,"layer":"inner2"},
      {"x":34.49,"y":15.61116666666667,"layer":"inner2"}, {"x":37.43766666666667,"y":12.663499999999999,"layer":"inner2"}, {"x":37.744749999999996,"y":12.663499999999999,"layer":"inner2"},
      {"x":37.7885,"y":12.70725,"layer":"inner2"}, {"x":37.7885,"y":12.74475,"layer":"inner2"}, {"x":37.83225,"y":12.7885,"layer":"inner2"},
      {"x":38.241550000000004,"y":12.7885,"layer":"inner2"}, {"x":38.426,"y":12.60405,"layer":"inner2"}, {"x":38.426,"y":12.292731141868511,"layer":"inner2"},
      {"x":38.45723114186851,"y":12.2615,"layer":"inner2"}, {"x":38.515231833910036,"y":12.2615,"layer":"inner2"}, {"x":39.34773183391004,"y":11.428999999999998,"layer":"inner2"},
      {"x":41.349256141868516,"y":11.428999999999998,"layer":"inner2"}, {"x":42.427,"y":10.351256141868513,"layer":"inner2"}, {"x":42.427,"y":-3.140549999999999,"layer":"inner2"},
      {"x":42.24255,"y":-3.3249999999999993,"layer":"inner2"}, {"x":41.9,"y":-3.3249999999999993,"layer":"inner2"}, "STD_CLOUD_ETH_53_RMII1_RXD0_ISO_END.inner2",
  ]]} />,
  "CLOUD_ETH_40_ETH_TX_CT": <trace name="CLOUD_ETH_40_ETH_TX_CT" from="STD_CLOUD_ETH_40_ETH_TX_CT_BEGIN.inner2" to=".Ethernet_and_RGB_expansion > .J_ETH > .2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_40_ETH_TX_CT_BEGIN.inner2", {"x":42.76,"y":21.25,"layer":"inner2"}, {"x":43.57,"y":22.06,"layer":"inner2"},
      {"x":51.6845,"y":22.06,"layer":"inner2"}, {"x":52.85,"y":20.8945,"layer":"inner2"}, ".Ethernet_and_RGB_expansion > .J_ETH > .2",
  ]]} />,
  "CLOUD_ETH_43_RMII1_TXD0": <trace name="CLOUD_ETH_43_RMII1_TXD0" from=".Processor > .U1 > .K17" to="STD_CLOUD_ETH_43_RMII1_TXD0_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .K17", {"x":0.4,"y":6,"layer":"inner2","via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":0.4,"y":6,"layer":"inner2"},
      {"x":7.5,"y":13.1,"layer":"inner2"}, {"x":7.99,"y":13.1,"layer":"inner2"}, "STD_CLOUD_ETH_43_RMII1_TXD0_END.inner2",
  ]]} />,
  "CLOUD_ETH_55_ETH_MDC_ISO": <trace name="CLOUD_ETH_55_ETH_MDC_ISO" from=".Ethernet_and_RGB_expansion > .R_ETH_MDC > .pin1" to="STD_CLOUD_ETH_55_ETH_MDC_ISO_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Ethernet_and_RGB_expansion > .R_ETH_MDC > .pin1", {"x":36.99,"y":16.8,"layer":"inner4","via":true,"fromLayer":"top","toLayer":"inner4"}, {"x":36.99,"y":16.8,"layer":"inner4"},
      {"x":36.99,"y":12.54,"layer":"inner4"}, {"x":38.190000000000005,"y":11.34,"layer":"inner4"}, {"x":50.4765,"y":11.34,"layer":"inner4"},
      {"x":50.9,"y":10.9165,"layer":"inner4"}, {"x":50.9,"y":10.254249999999997,"layer":"inner4"}, {"x":51.024249999999995,"y":10.129999999999999,"layer":"inner4"},
      {"x":51.13075,"y":10.129999999999999,"layer":"inner4"}, {"x":51.254999999999995,"y":10.00575,"layer":"inner4"}, {"x":51.254999999999995,"y":-1.9007500000000015,"layer":"inner4"},
      {"x":51.13075,"y":-2.0250000000000004,"layer":"inner4"}, {"x":50.9,"y":-2.0250000000000004,"layer":"inner4"}, "STD_CLOUD_ETH_55_ETH_MDC_ISO_END.inner4",
  ]]} />,
  "CLOUD_ETH_48_RMII1_REFCLK_ISO": <trace name="CLOUD_ETH_48_RMII1_REFCLK_ISO" from="STD_CLOUD_ETH_48_RMII1_REFCLK_ISO_BEGIN.inner4" to="STD_CLOUD_ETH_48_RMII1_REFCLK_ISO_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_48_RMII1_REFCLK_ISO_BEGIN.inner4", {"x":42.01,"y":9.85,"layer":"inner4"}, {"x":42.375,"y":9.484999999999998,"layer":"inner4"},
      {"x":42.375,"y":-5.449999999999998,"layer":"inner4"}, {"x":41.9,"y":-5.925,"layer":"inner4"}, "STD_CLOUD_ETH_48_RMII1_REFCLK_ISO_END.inner4",
  ]]} />,
  "CLOUD_ETH_LAYERED_RMII1_TXD1_DAMPED": <trace name="CLOUD_ETH_LAYERED_RMII1_TXD1_DAMPED" from="STD_CLOUD_ETH_LAYERED_RMII1_TXD1_DAMPED_BEGIN.inner4" to="STD_CLOUD_ETH_LAYERED_RMII1_TXD1_DAMPED_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_LAYERED_RMII1_TXD1_DAMPED_BEGIN.inner4", {"x":36.1,"y":-2.025,"layer":"inner4"}, {"x":34.325,"y":-0.25,"layer":"inner4"},
      {"x":34.325,"y":4.249999999999998,"layer":"inner4"}, {"x":28.3,"y":10.275,"layer":"inner4"}, {"x":20.675,"y":10.275,"layer":"inner4"},
      {"x":17.85,"y":13.1,"layer":"inner4"}, {"x":11.51,"y":13.1,"layer":"inner4"}, "STD_CLOUD_ETH_LAYERED_RMII1_TXD1_DAMPED_END.inner4",
  ]]} />,
  "CLOUD_ETH_LAYERED_RMII1_RXD0": <trace name="CLOUD_ETH_LAYERED_RMII1_RXD0" from=".Processor > .U1 > .M16" to="STD_CLOUD_ETH_LAYERED_RMII1_RXD0_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .M16", {"x":2,"y":5.2,"layer":"inner2","via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":2,"y":5.2,"layer":"inner2"},
      {"x":2.175,"y":5.2,"layer":"inner2"}, {"x":2.5999999999999996,"y":5.625,"layer":"inner2"}, {"x":3.0000000000000004,"y":5.625,"layer":"inner2"},
      {"x":3.975,"y":4.65,"layer":"inner2"}, {"x":3.975,"y":4.225,"layer":"inner2"}, {"x":5.825,"y":2.375,"layer":"inner2"},
      {"x":7.075,"y":2.375,"layer":"inner2"}, {"x":7.15,"y":2.45,"layer":"inner2"}, {"x":7.45,"y":2.45,"layer":"inner2"},
      {"x":7.7250000000000005,"y":2.175,"layer":"inner2"}, {"x":31.25,"y":2.175,"layer":"inner2"}, {"x":36.1,"y":-2.675,"layer":"inner2"},
      "STD_CLOUD_ETH_LAYERED_RMII1_RXD0_END.inner2",
  ]]} />,
  "CLOUD_ETH_LAYERED_RMII1_RXD1": <trace name="CLOUD_ETH_LAYERED_RMII1_RXD1" from=".Processor > .U1 > .L15" to="STD_CLOUD_ETH_LAYERED_RMII1_RXD1_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .L15", {"x":1.2000000000000002,"y":4.4,"layer":"inner2","via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":1.2000000000000002,"y":4.4,"layer":"inner2"},
      {"x":1.6750000000000007,"y":3.925,"layer":"inner2"}, {"x":3.3,"y":3.925,"layer":"inner2"}, {"x":3.425,"y":4.05,"layer":"inner2"},
      {"x":3.825,"y":4.05,"layer":"inner2"}, {"x":6.1,"y":1.775,"layer":"inner2"}, {"x":21.875,"y":1.775,"layer":"inner2"},
      {"x":21.9,"y":1.8,"layer":"inner2"}, {"x":22.225,"y":1.8000000000000003,"layer":"inner2"}, {"x":23.675,"y":0.35,"layer":"inner2"},
      {"x":24.075,"y":0.35,"layer":"inner2"}, {"x":27.75,"y":-3.325,"layer":"inner2"}, {"x":36.1,"y":-3.325,"layer":"inner2"},
      "STD_CLOUD_ETH_LAYERED_RMII1_RXD1_END.inner2",
  ]]} />,
  "CLOUD_ETH_LAYERED_RMII1_CRS_DV": <trace name="CLOUD_ETH_LAYERED_RMII1_CRS_DV" from=".Processor > .U1 > .H17" to="STD_CLOUD_ETH_LAYERED_RMII1_CRS_DV_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .H17", {"x":-1.2000000000000002,"y":6,"layer":"top"}, {"x":-1.2000000000000002,"y":6,"via":true,"fromLayer":"top","toLayer":"inner4"},
      {"x":-1.2000000000000002,"y":6,"layer":"inner4"}, {"x":0.04999999999999982,"y":4.75,"layer":"inner4"}, {"x":0.04999999999999982,"y":3.45,"layer":"inner4"},
      {"x":3.55,"y":-0.04999999999999982,"layer":"inner4"}, {"x":3.75,"y":-0.04999999999999982,"layer":"inner4"}, {"x":5.425,"y":-1.7249999999999996,"layer":"inner4"},
      {"x":5.425,"y":-1.8249999999999997,"layer":"inner4"}, {"x":5.6,"y":-2,"layer":"inner4"}, {"x":7.699999999999999,"y":-2,"layer":"inner4"},
      {"x":7.699999999999999,"y":-2,"via":true,"fromLayer":"inner4","toLayer":"inner2"}, {"x":7.7,"y":-2,"layer":"inner2"}, {"x":9.375,"y":-3.675,"layer":"inner2"},
      {"x":16.55,"y":-3.675,"layer":"inner2"}, {"x":17.05,"y":-4.175,"layer":"inner2"}, {"x":22.8,"y":-4.175,"layer":"inner2"},
      {"x":23.25,"y":-4.625,"layer":"inner2"}, {"x":35.45,"y":-4.625,"layer":"inner2"}, {"x":36.1,"y":-3.975,"layer":"inner2"},
      "STD_CLOUD_ETH_LAYERED_RMII1_CRS_DV_END.inner2",
  ]]} />,
  "CLOUD_ETH_LAYERED_ETH_MDIO": <trace name="CLOUD_ETH_LAYERED_ETH_MDIO" from="STD_CLOUD_ETH_LAYERED_ETH_MDIO_BEGIN.inner4" to="STD_CLOUD_ETH_LAYERED_ETH_MDIO_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_LAYERED_ETH_MDIO_BEGIN.inner4", {"x":2,"y":6,"layer":"inner4"}, {"x":7.050000000000004,"y":11.050000000000004,"layer":"inner4"},
      {"x":11.300000000000004,"y":11.050000000000004,"layer":"inner4"}, {"x":11.350000000000009,"y":11,"layer":"inner4"}, {"x":11.600000000000001,"y":11,"layer":"inner4"},
      {"x":11.850000000000001,"y":11.25,"layer":"inner4"}, {"x":11.850000000000001,"y":12.100000000000001,"layer":"inner4"}, {"x":11.050000000000004,"y":12.899999999999999,"layer":"inner4"},
      {"x":11.050000000000004,"y":13.300000000000004,"layer":"inner4"}, {"x":11.300000000000004,"y":13.550000000000004,"layer":"inner4"}, {"x":32.2,"y":13.550000000000004,"layer":"inner4"},
      {"x":34.10000000000001,"y":11.649999999999999,"layer":"inner4"}, {"x":37.50000000000001,"y":11.649999999999999,"layer":"inner4"}, {"x":38.650000000000006,"y":10.5,"layer":"inner4"},
      {"x":42.050000000000004,"y":10.5,"layer":"inner4"}, {"x":45.1,"y":7.450000000000003,"layer":"inner4"}, {"x":45.1,"y":-0.725,"layer":"inner4"},
      "STD_CLOUD_ETH_LAYERED_ETH_MDIO_END.inner4",
  ]]} />,
  "CLOUD_ETH_LAYERED_RMII1_REFCLK": <trace name="CLOUD_ETH_LAYERED_RMII1_REFCLK" from="STD_CLOUD_ETH_LAYERED_RMII1_REFCLK_BEGIN.inner4" to="STD_CLOUD_ETH_LAYERED_RMII1_REFCLK_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_ETH_LAYERED_RMII1_REFCLK_BEGIN.inner4", {"x":-1.2000000000000002,"y":6.800000000000001,"layer":"inner4"}, {"x":0.8499999999999996,"y":4.750000000000001,"layer":"inner4"},
      {"x":0.8499999999999996,"y":3.45,"layer":"inner4"}, {"x":3.55,"y":0.75,"layer":"inner4"}, {"x":3.75,"y":0.75,"layer":"inner4"},
      {"x":4.05,"y":0.4500000000000002,"layer":"inner4"}, {"x":4.05,"y":0.07499999999999973,"layer":"inner4"}, {"x":5.75,"y":-1.6250000000000004,"layer":"inner4"},
      {"x":5.75,"y":-1.6499999999999986,"layer":"inner4"}, {"x":5.75,"y":-1.6499999999999986,"via":true,"fromLayer":"inner4","toLayer":"inner2"}, {"x":5.7500000000000036,"y":-1.6499999999999986,"layer":"inner2"},
      {"x":5.825000000000003,"y":-1.6499999999999986,"layer":"inner2"}, {"x":8.15,"y":-3.975,"layer":"inner2"}, {"x":16.525,"y":-3.975,"layer":"inner2"},
      {"x":19.225,"y":-6.675,"layer":"inner2"}, {"x":34.7,"y":-6.675,"layer":"inner2"}, {"x":36.1,"y":-5.275,"layer":"inner2"},
      "STD_CLOUD_ETH_LAYERED_RMII1_REFCLK_END.inner2",
  ]]} />,
}

export function applyEthernetEndpointRoutes(node:any):any {
 const board=mapNativeElements(node,element=>element.type==='trace'&&Object.hasOwn(routes,element.props.name)?routes[element.props.name as keyof typeof routes]:element)
 return cloneElement(board,{children:<>{board.props.children}
    <via name="STD_CLOUD_ETH_21_PHY_TX_EN_BEGIN" pcbX={38.1} pcbY={12.4625} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_PHY > .1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_21_PHY_TX_EN_END" pcbX={35.51} pcbY={10} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_TX_EN > .pin2">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_22_PHY_LED0_BEGIN" pcbX={39.5} pcbY={12.4625} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_PHY > .4">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_22_PHY_LED0_END" pcbX={41.49} pcbY={16.75} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_STRAP5 > .pin1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_24_PHY_CRS_DV_BEGIN" pcbX={37.4625} pcbY={14.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_PHY > .20">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_24_PHY_CRS_DV_END" pcbX={37.74} pcbY={20} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_STRAP1 > .pin1">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_30_ETH_MDIO_ISO_END" pcbX={32.49} pcbY={18.3} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_MDIO_PU > .pin1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_33_ETH_TX_N_BEGIN" pcbX={41.815} pcbY={14.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ESD > .2">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_38_ETH_TX_P_BEGIN" pcbX={41.815} pcbY={15} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ESD > .1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_39_PHY_LED0_BEGIN" pcbX={41.49} pcbY={16.75} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_STRAP5 > .pin1">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_39_PHY_LED0_END" pcbX={44.49} pcbY={25.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_GREEN > .pin1">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_41_PHY_RX_ER_BEGIN" pcbX={37.4625} pcbY={13.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_PHY > .22">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_41_PHY_RX_ER_END" pcbX={41.49} pcbY={22.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_STRAP4 > .pin1">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_44_ETH_RX_P_BEGIN" pcbX={41.815} pcbY={13.5} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ESD > .4">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_45_RMII1_TXD1_END" pcbX={10.49} pcbY={13.1} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_TXD1_SRC > .pin1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_46_RMII1_TX_EN_ISO_BEGIN" pcbX={34.49} pcbY={10} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_TX_EN > .pin1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_46_RMII1_TX_EN_ISO_END" pcbX={41.9} pcbY={-1.375} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .18">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_47_RMII1_TXD1_ISO_END" pcbX={41.9} pcbY={-2.675} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .16">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_49_RMII1_TXD0_ISO_BEGIN" pcbX={34.49} pcbY={12} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_TXD0 > .pin1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_53_RMII1_RXD0_ISO_END" pcbX={41.9} pcbY={-3.3249999999999993} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .15">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_40_ETH_TX_CT_BEGIN" pcbX={42.76} pcbY={21.25} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .C_ETH_CT_TX_1U > .pin1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_43_RMII1_TXD0_END" pcbX={7.99} pcbY={13.1} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_TXD0_SRC > .pin1">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_55_ETH_MDC_ISO_END" pcbX={50.9} pcbY={-2.0250000000000004} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .17">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_48_RMII1_REFCLK_ISO_BEGIN" pcbX={42.01} pcbY={9.85} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_REF > .pin2">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_48_RMII1_REFCLK_ISO_END" pcbX={41.9} pcbY={-5.925} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .11">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_LAYERED_RMII1_TXD1_DAMPED_BEGIN" pcbX={36.1} pcbY={-2.025} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .4">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_LAYERED_RMII1_TXD1_DAMPED_END" pcbX={11.51} pcbY={13.1} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .R_ETH_TXD1_SRC > .pin2">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_LAYERED_RMII1_RXD0_END" pcbX={36.1} pcbY={-2.675} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .5">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_LAYERED_RMII1_RXD1_END" pcbX={36.1} pcbY={-3.325} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .6">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_LAYERED_RMII1_CRS_DV_END" pcbX={36.1} pcbY={-3.975} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .7">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_LAYERED_ETH_MDIO_BEGIN" pcbX={2} pcbY={6} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .M17">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_LAYERED_ETH_MDIO_END" pcbX={45.1} pcbY={-0.725} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .2">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_LAYERED_RMII1_REFCLK_BEGIN" pcbX={-1.2000000000000002} pcbY={6.800000000000001} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .H18">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_ETH_LAYERED_RMII1_REFCLK_END" pcbX={36.1} pcbY={-5.275} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .9">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
 </>})
}
