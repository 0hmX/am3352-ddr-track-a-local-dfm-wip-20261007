import {cloneElement} from "react"
import {mapNativeElements} from "./mapNativeElements"

// Literal native routes replace the affected mounted JSON-backed paths.
// Preserve nonzero wires; extend only selected pad-centered physical barrels.
const routes = {
  "HDMI_PAIR_HDMI_TXC_N_TX": <trace name="HDMI_PAIR_HDMI_TXC_N_TX" from="STD_HDMI_PAIR_HDMI_TXC_N_TX_BEGIN.inner4" to=".HDMI > .U_HDMI_ESD > .7" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_HDMI_PAIR_HDMI_TXC_N_TX_BEGIN.inner4", {"x":47.45008,"y":-28.50006,"layer":"inner4"}, {"x":47.60008,"y":-28.50006,"layer":"inner4"},
      {"x":49.12501999999999,"y":-30.025,"layer":"inner4"}, {"x":56.275,"y":-30.025000000000002,"layer":"inner4"}, {"x":56.35,"y":-30.025000000000002,"layer":"inner4"},
      {"x":56.475,"y":-30.025000000000002,"layer":"inner4"}, {"x":56.7,"y":-29.8,"layer":"inner4"}, {"x":56.7,"y":-29,"layer":"inner4"},
      {"x":56.6,"y":-28.868999000000002,"layer":"inner4"}, {"x":56.1,"y":-28.868999000000002,"layer":"inner4"}, {"x":55.95,"y":-29.05,"layer":"inner4"},
      {"x":55.95,"y":-29.200000000000003,"layer":"inner4"}, {"x":55.95,"y":-29.200000000000003,"via":true,"fromLayer":"inner4","toLayer":"top"}, ".HDMI > .U_HDMI_ESD > .7",
  ]]} />,
  "HDMI_PAIR_HDMI_TXC_P_TX": <trace name="HDMI_PAIR_HDMI_TXC_P_TX" from="STD_HDMI_PAIR_HDMI_TXC_P_TX_BEGIN.inner4" to="STD_HDMI_PAIR_HDMI_TXC_P_TX_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_HDMI_PAIR_HDMI_TXC_P_TX_BEGIN.inner4", {"x":47.45008,"y":-27.999934,"layer":"inner4"}, {"x":48.240182,"y":-27.999934,"layer":"inner4"},
      {"x":48.31518199999999,"y":-28.074934,"layer":"inner4"}, {"x":48.31518199999999,"y":-28.212602,"layer":"inner4"}, {"x":48.315639,"y":-28.223061,"layer":"inner4"},
      {"x":48.317004999999995,"y":-28.23344,"layer":"inner4"}, {"x":48.31927099999999,"y":-28.24366,"layer":"inner4"}, {"x":48.322419,"y":-28.253644,"layer":"inner4"},
      {"x":48.32642499999999,"y":-28.263316,"layer":"inner4"}, {"x":48.331258999999996,"y":-28.272602,"layer":"inner4"}, {"x":48.336884,"y":-28.281431,"layer":"inner4"},
      {"x":48.343256999999994,"y":-28.289737,"layer":"inner4"}, {"x":48.35032999999999,"y":-28.297455,"layer":"inner4"}, {"x":48.358048,"y":-28.304527,"layer":"inner4"},
      {"x":48.366353,"y":-28.3109,"layer":"inner4"}, {"x":48.375181999999995,"y":-28.316525,"layer":"inner4"}, {"x":48.384468,"y":-28.321359,"layer":"inner4"},
      {"x":48.39413999999999,"y":-28.325365,"layer":"inner4"}, {"x":48.404123999999996,"y":-28.328513,"layer":"inner4"}, {"x":48.414345,"y":-28.330779,"layer":"inner4"},
      {"x":48.424724,"y":-28.332145,"layer":"inner4"}, {"x":48.435182,"y":-28.332602,"layer":"inner4"}, {"x":48.74893866773026,"y":-28.332602,"layer":"inner4"},
      {"x":48.75939766773026,"y":-28.333059,"layer":"inner4"}, {"x":48.76977666773026,"y":-28.334425,"layer":"inner4"}, {"x":48.779997667730264,"y":-28.336691000000002,"layer":"inner4"},
      {"x":48.78998166773026,"y":-28.339839,"layer":"inner4"}, {"x":48.79965366773026,"y":-28.343845,"layer":"inner4"}, {"x":48.80893866773026,"y":-28.348679,"layer":"inner4"},
      {"x":48.81776866773026,"y":-28.354304,"layer":"inner4"}, {"x":48.82607366773026,"y":-28.360677,"layer":"inner4"}, {"x":48.83379166773026,"y":-28.367749,"layer":"inner4"},
      {"x":48.84086466773026,"y":-28.375468,"layer":"inner4"}, {"x":48.84723766773026,"y":-28.383773,"layer":"inner4"}, {"x":48.85286166773026,"y":-28.392602,"layer":"inner4"},
      {"x":48.85769566773026,"y":-28.401888,"layer":"inner4"}, {"x":48.86170166773026,"y":-28.41156,"layer":"inner4"}, {"x":48.86484966773026,"y":-28.421544,"layer":"inner4"},
      {"x":48.86711566773026,"y":-28.431764,"layer":"inner4"}, {"x":48.86848266773026,"y":-28.442143,"layer":"inner4"}, {"x":48.86893866773026,"y":-28.452602,"layer":"inner4"},
      {"x":48.86893866773026,"y":-28.483941,"layer":"inner4"}, {"x":48.86848266773026,"y":-28.494399,"layer":"inner4"}, {"x":48.86711566773026,"y":-28.504778,"layer":"inner4"},
      {"x":48.86484966773026,"y":-28.514999,"layer":"inner4"}, {"x":48.86170166773026,"y":-28.524983,"layer":"inner4"}, {"x":48.85769566773026,"y":-28.534655,"layer":"inner4"},
      {"x":48.85286166773026,"y":-28.543941,"layer":"inner4"}, {"x":48.84723766773026,"y":-28.55277,"layer":"inner4"}, {"x":48.84086466773026,"y":-28.561075,"layer":"inner4"},
      {"x":48.83379166773026,"y":-28.568793,"layer":"inner4"}, {"x":48.82607366773026,"y":-28.575866,"layer":"inner4"}, {"x":48.81776866773026,"y":-28.582239,"layer":"inner4"},
      {"x":48.80893866773026,"y":-28.587864,"layer":"inner4"}, {"x":48.79965366773026,"y":-28.592698,"layer":"inner4"}, {"x":48.78998166773026,"y":-28.596704,"layer":"inner4"},
      {"x":48.779997667730264,"y":-28.599852000000002,"layer":"inner4"}, {"x":48.76977666773026,"y":-28.602118,"layer":"inner4"}, {"x":48.75939766773026,"y":-28.603484,"layer":"inner4"},
      {"x":48.74893866773026,"y":-28.603941,"layer":"inner4"}, {"x":48.435182,"y":-28.603941,"layer":"inner4"}, {"x":48.424724,"y":-28.604397,"layer":"inner4"},
      {"x":48.414345,"y":-28.605764,"layer":"inner4"}, {"x":48.404123999999996,"y":-28.608029000000002,"layer":"inner4"}, {"x":48.39413999999999,"y":-28.611177,"layer":"inner4"},
      {"x":48.384468,"y":-28.615184,"layer":"inner4"}, {"x":48.375181999999995,"y":-28.620018,"layer":"inner4"}, {"x":48.366353,"y":-28.625642,"layer":"inner4"},
      {"x":48.358048,"y":-28.632015,"layer":"inner4"}, {"x":48.35032999999999,"y":-28.639088,"layer":"inner4"}, {"x":48.343256999999994,"y":-28.646806,"layer":"inner4"},
      {"x":48.336884,"y":-28.655111,"layer":"inner4"}, {"x":48.331258999999996,"y":-28.663941,"layer":"inner4"}, {"x":48.32642499999999,"y":-28.673226,"layer":"inner4"},
      {"x":48.322419,"y":-28.682898,"layer":"inner4"}, {"x":48.31927099999999,"y":-28.692882,"layer":"inner4"}, {"x":48.317004999999995,"y":-28.703103,"layer":"inner4"},
      {"x":48.315639,"y":-28.713482,"layer":"inner4"}, {"x":48.31518199999999,"y":-28.723941,"layer":"inner4"}, {"x":48.31518199999999,"y":-28.861609,"layer":"inner4"},
      {"x":49.228573999999995,"y":-29.775,"layer":"inner4"}, {"x":49.25,"y":-29.775,"layer":"inner4"}, {"x":49.265,"y":-29.774568410372893,"layer":"inner4"},
      {"x":49.28,"y":-29.773274306971494,"layer":"inner4"}, {"x":49.294999999999995,"y":-29.771119685209445,"layer":"inner4"}, {"x":49.309999999999995,"y":-29.76810786735734,"layer":"inner4"},
      {"x":49.324999999999996,"y":-29.76424349742,"layer":"inner4"}, {"x":49.339999999999996,"y":-29.75953253397578,"layer":"inner4"}, {"x":49.355,"y":-29.753982240988847,"layer":"inner4"},
      {"x":49.37,"y":-29.747601176608697,"layer":"inner4"}, {"x":49.385,"y":-29.740399179974098,"layer":"inner4"}, {"x":49.4,"y":-29.73238735604184,"layer":"inner4"},
      {"x":49.415,"y":-29.723578058463726,"layer":"inner4"}, {"x":49.43,"y":-29.713984870538113,"layer":"inner4"}, {"x":49.445,"y":-29.703622584265446,"layer":"inner4"},
      {"x":49.459999999999994,"y":-29.692507177540087,"layer":"inner4"}, {"x":49.474999999999994,"y":-29.680655789513548,"layer":"inner4"}, {"x":49.489999999999995,"y":-29.66808669416716,"layer":"inner4"},
      {"x":49.504999999999995,"y":-29.65481927213492,"layer":"inner4"}, {"x":49.519999999999996,"y":-29.640873980819958,"layer":"inner4"}, {"x":49.535,"y":-29.62627232285071,"layer":"inner4"},
      {"x":49.55,"y":-29.611036812925413,"layer":"inner4"}, {"x":49.565,"y":-29.59519094309608,"layer":"inner4"}, {"x":49.58,"y":-29.57875914654546,"layer":"inner4"},
      {"x":49.595,"y":-29.561766759912825,"layer":"inner4"}, {"x":49.61,"y":-29.54423998422674,"layer":"inner4"}, {"x":49.625,"y":-29.52620584450494,"layer":"inner4"},
      {"x":49.64,"y":-29.50769214808374,"layer":"inner4"}, {"x":49.655,"y":-29.48872744174112,"layer":"inner4"}, {"x":49.669999999999995,"y":-29.46934096767967,"layer":"inner4"},
      {"x":49.684999999999995,"y":-29.449562618437234,"layer":"inner4"}, {"x":49.699999999999996,"y":-29.42942289079478,"layer":"inner4"}, {"x":49.714999999999996,"y":-29.408952838752576,"layer":"inner4"},
      {"x":49.73,"y":-29.38818402564717,"layer":"inner4"}, {"x":49.745,"y":-29.367148475483024,"layer":"inner4"}, {"x":49.76,"y":-29.3458786235538,"layer":"inner4"},
      {"x":49.775,"y":-29.3244072664295,"layer":"inner4"}, {"x":49.79,"y":-29.302767511386538,"layer":"inner4"}, {"x":49.805,"y":-29.28099272535871,"layer":"inner4"},
      {"x":49.81999999999999,"y":-29.2591164834878,"layer":"inner4"}, {"x":49.834999999999994,"y":-29.23717251735316,"layer":"inner4"}, {"x":49.849999999999994,"y":-29.215194662960023,"layer":"inner4"},
      {"x":49.864999999999995,"y":-29.19321680856689,"layer":"inner4"}, {"x":49.879999999999995,"y":-29.171272842432245,"layer":"inner4"}, {"x":49.894999999999996,"y":-29.14939660056134,"layer":"inner4"},
      {"x":49.91,"y":-29.12762181453351,"layer":"inner4"}, {"x":49.925,"y":-29.10598205949055,"layer":"inner4"}, {"x":49.94,"y":-29.08451070236625,"layer":"inner4"},
      {"x":49.955,"y":-29.063240850437023,"layer":"inner4"}, {"x":49.97,"y":-29.042205300272876,"layer":"inner4"}, {"x":49.985,"y":-29.021436487167474,"layer":"inner4"},
      {"x":50,"y":-29.00096643512527,"layer":"inner4"}, {"x":50.015,"y":-28.980826707482816,"layer":"inner4"}, {"x":50.03,"y":-28.96104835824038,"layer":"inner4"},
      {"x":50.044999999999995,"y":-28.94166188417893,"layer":"inner4"}, {"x":50.059999999999995,"y":-28.92269717783631,"layer":"inner4"}, {"x":50.074999999999996,"y":-28.904183481415107,"layer":"inner4"},
      {"x":50.089999999999996,"y":-28.886149341693308,"layer":"inner4"}, {"x":50.105,"y":-28.86862256600722,"layer":"inner4"}, {"x":50.12,"y":-28.85163017937459,"layer":"inner4"},
      {"x":50.135,"y":-28.835198382823968,"layer":"inner4"}, {"x":50.15,"y":-28.819352512994637,"layer":"inner4"}, {"x":50.165,"y":-28.80411700306934,"layer":"inner4"},
      {"x":50.18,"y":-28.789515345100092,"layer":"inner4"}, {"x":50.19499999999999,"y":-28.77557005378513,"layer":"inner4"}, {"x":50.209999999999994,"y":-28.76230263175289,"layer":"inner4"},
      {"x":50.224999999999994,"y":-28.7497335364065,"layer":"inner4"}, {"x":50.239999999999995,"y":-28.73788214837996,"layer":"inner4"}, {"x":50.254999999999995,"y":-28.726766741654604,"layer":"inner4"},
      {"x":50.269999999999996,"y":-28.716404455381937,"layer":"inner4"}, {"x":50.285,"y":-28.70681126745632,"layer":"inner4"}, {"x":50.3,"y":-28.69800196987821,"layer":"inner4"},
      {"x":50.315,"y":-28.689990145945952,"layer":"inner4"}, {"x":50.33,"y":-28.68278814931135,"layer":"inner4"}, {"x":50.345,"y":-28.6764070849312,"layer":"inner4"},
      {"x":50.36,"y":-28.670856791944267,"layer":"inner4"}, {"x":50.375,"y":-28.666145828500046,"layer":"inner4"}, {"x":50.39,"y":-28.66228145856271,"layer":"inner4"},
      {"x":50.405,"y":-28.659269640710605,"layer":"inner4"}, {"x":50.419999999999995,"y":-28.657115018948556,"layer":"inner4"}, {"x":50.434999999999995,"y":-28.655820915547157,"layer":"inner4"},
      {"x":50.449999999999996,"y":-28.655389325920048,"layer":"inner4"}, {"x":50.464999999999996,"y":-28.655820915547157,"layer":"inner4"}, {"x":50.48,"y":-28.657115018948556,"layer":"inner4"},
      {"x":50.495,"y":-28.659269640710605,"layer":"inner4"}, {"x":50.51,"y":-28.66228145856271,"layer":"inner4"}, {"x":50.525,"y":-28.666145828500046,"layer":"inner4"},
      {"x":50.54,"y":-28.670856791944267,"layer":"inner4"}, {"x":50.555,"y":-28.6764070849312,"layer":"inner4"}, {"x":50.56999999999999,"y":-28.68278814931135,"layer":"inner4"},
      {"x":50.584999999999994,"y":-28.689990145945952,"layer":"inner4"}, {"x":50.599999999999994,"y":-28.69800196987821,"layer":"inner4"}, {"x":50.614999999999995,"y":-28.70681126745632,"layer":"inner4"},
      {"x":50.629999999999995,"y":-28.716404455381937,"layer":"inner4"}, {"x":50.644999999999996,"y":-28.726766741654604,"layer":"inner4"}, {"x":50.66,"y":-28.73788214837996,"layer":"inner4"},
      {"x":50.675,"y":-28.7497335364065,"layer":"inner4"}, {"x":50.69,"y":-28.76230263175289,"layer":"inner4"}, {"x":50.705,"y":-28.77557005378513,"layer":"inner4"},
      {"x":50.72,"y":-28.789515345100092,"layer":"inner4"}, {"x":50.735,"y":-28.80411700306934,"layer":"inner4"}, {"x":50.75,"y":-28.819352512994637,"layer":"inner4"},
      {"x":50.765,"y":-28.835198382823968,"layer":"inner4"}, {"x":50.78,"y":-28.85163017937459,"layer":"inner4"}, {"x":50.794999999999995,"y":-28.86862256600722,"layer":"inner4"},
      {"x":50.809999999999995,"y":-28.886149341693308,"layer":"inner4"}, {"x":50.824999999999996,"y":-28.904183481415107,"layer":"inner4"}, {"x":50.839999999999996,"y":-28.92269717783631,"layer":"inner4"},
      {"x":50.855,"y":-28.94166188417893,"layer":"inner4"}, {"x":50.87,"y":-28.96104835824038,"layer":"inner4"}, {"x":50.885,"y":-28.980826707482816,"layer":"inner4"},
      {"x":50.9,"y":-29.00096643512527,"layer":"inner4"}, {"x":50.915,"y":-29.021436487167474,"layer":"inner4"}, {"x":50.93,"y":-29.042205300272876,"layer":"inner4"},
      {"x":50.94499999999999,"y":-29.063240850437023,"layer":"inner4"}, {"x":50.959999999999994,"y":-29.08451070236625,"layer":"inner4"}, {"x":50.974999999999994,"y":-29.10598205949055,"layer":"inner4"},
      {"x":50.989999999999995,"y":-29.12762181453351,"layer":"inner4"}, {"x":51.004999999999995,"y":-29.14939660056134,"layer":"inner4"}, {"x":51.019999999999996,"y":-29.171272842432245,"layer":"inner4"},
      {"x":51.035,"y":-29.19321680856689,"layer":"inner4"}, {"x":51.05,"y":-29.215194662960023,"layer":"inner4"}, {"x":51.065,"y":-29.23717251735316,"layer":"inner4"},
      {"x":51.08,"y":-29.2591164834878,"layer":"inner4"}, {"x":51.095,"y":-29.28099272535871,"layer":"inner4"}, {"x":51.11,"y":-29.302767511386538,"layer":"inner4"},
      {"x":51.125,"y":-29.3244072664295,"layer":"inner4"}, {"x":51.14,"y":-29.3458786235538,"layer":"inner4"}, {"x":51.155,"y":-29.367148475483024,"layer":"inner4"},
      {"x":51.169999999999995,"y":-29.38818402564717,"layer":"inner4"}, {"x":51.184999999999995,"y":-29.408952838752576,"layer":"inner4"}, {"x":51.199999999999996,"y":-29.42942289079478,"layer":"inner4"},
      {"x":51.214999999999996,"y":-29.449562618437234,"layer":"inner4"}, {"x":51.23,"y":-29.46934096767967,"layer":"inner4"}, {"x":51.245,"y":-29.48872744174112,"layer":"inner4"},
      {"x":51.26,"y":-29.50769214808374,"layer":"inner4"}, {"x":51.275,"y":-29.52620584450494,"layer":"inner4"}, {"x":51.29,"y":-29.54423998422674,"layer":"inner4"},
      {"x":51.30499999999999,"y":-29.561766759912825,"layer":"inner4"}, {"x":51.31999999999999,"y":-29.57875914654546,"layer":"inner4"}, {"x":51.334999999999994,"y":-29.59519094309608,"layer":"inner4"},
      {"x":51.349999999999994,"y":-29.611036812925413,"layer":"inner4"}, {"x":51.364999999999995,"y":-29.62627232285071,"layer":"inner4"}, {"x":51.379999999999995,"y":-29.640873980819958,"layer":"inner4"},
      {"x":51.394999999999996,"y":-29.65481927213492,"layer":"inner4"}, {"x":51.41,"y":-29.668086694167158,"layer":"inner4"}, {"x":51.425,"y":-29.680655789513548,"layer":"inner4"},
      {"x":51.44,"y":-29.692507177540087,"layer":"inner4"}, {"x":51.455,"y":-29.703622584265446,"layer":"inner4"}, {"x":51.47,"y":-29.713984870538113,"layer":"inner4"},
      {"x":51.485,"y":-29.723578058463726,"layer":"inner4"}, {"x":51.5,"y":-29.73238735604184,"layer":"inner4"}, {"x":51.515,"y":-29.740399179974094,"layer":"inner4"},
      {"x":51.53,"y":-29.747601176608697,"layer":"inner4"}, {"x":51.544999999999995,"y":-29.753982240988847,"layer":"inner4"}, {"x":51.559999999999995,"y":-29.75953253397578,"layer":"inner4"},
      {"x":51.574999999999996,"y":-29.76424349742,"layer":"inner4"}, {"x":51.589999999999996,"y":-29.76810786735734,"layer":"inner4"}, {"x":51.605,"y":-29.771119685209445,"layer":"inner4"},
      {"x":51.62,"y":-29.773274306971494,"layer":"inner4"}, {"x":51.635,"y":-29.774568410372893,"layer":"inner4"}, {"x":51.65,"y":-29.775,"layer":"inner4"},
      {"x":56.275,"y":-29.775000000000002,"layer":"inner4"}, {"x":56.35,"y":-29.700000000000003,"layer":"inner4"}, {"x":56.35,"y":-29.200000000000003,"layer":"inner4"},
      "STD_HDMI_PAIR_HDMI_TXC_P_TX_END.inner4",
  ]]} />,
  "HDMI_PAIR_HDMI_TX0_N_TX": <trace name="HDMI_PAIR_HDMI_TX0_N_TX" from="STD_HDMI_PAIR_HDMI_TX0_N_TX_BEGIN.inner2" to=".HDMI > .U_HDMI_ESD > .9" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_HDMI_PAIR_HDMI_TX0_N_TX_BEGIN.inner2", {"x":47.611627999999996,"y":-26.838388000000002,"layer":"inner2"}, {"x":47.811692,"y":-26.838388000000002,"layer":"inner2"},
      {"x":49.498303,"y":-28.525,"layer":"inner2"}, {"x":54.365,"y":-28.525,"layer":"inner2"}, {"x":54.75,"y":-28.139999999999997,"layer":"inner2"},
      {"x":55.175,"y":-28.139999999999997,"layer":"inner2"}, {"x":55.559999999999995,"y":-28.525,"layer":"inner2"}, {"x":56.475,"y":-28.525000000000002,"layer":"inner2"},
      {"x":56.55,"y":-28.6,"via":true,"fromLayer":"inner2","toLayer":"top"}, {"x":56.55,"y":-28.6,"layer":"top"}, {"x":56.55,"y":-28.6,"layer":"top"},
      ".HDMI > .U_HDMI_ESD > .9",
  ]]} />,
  "HDMI_PAIR_HDMI_TX0_P_TX": <trace name="HDMI_PAIR_HDMI_TX0_P_TX" from="STD_HDMI_PAIR_HDMI_TX0_P_TX_BEGIN.inner2" to="STD_HDMI_PAIR_HDMI_TX0_P_TX_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_HDMI_PAIR_HDMI_TX0_P_TX_BEGIN.inner2", {"x":47.826921,"y":-26.500064000000002,"layer":"inner2"}, {"x":47.988468,"y":-26.661612,"layer":"inner2"},
      {"x":49.601857,"y":-28.275,"layer":"inner2"}, {"x":54.261446609406725,"y":-28.275,"layer":"inner2"}, {"x":54.64644660940672,"y":-27.889999999999997,"layer":"inner2"},
      {"x":55.278553390593274,"y":-27.889999999999997,"layer":"inner2"}, {"x":55.66355339059327,"y":-28.275,"layer":"inner2"}, {"x":56.475,"y":-28.275000000000002,"layer":"inner2"},
      "STD_HDMI_PAIR_HDMI_TX0_P_TX_END.inner2",
  ]]} />,
  "HDMI_PAIR_HDMI_TX1_N_TX": <trace name="HDMI_PAIR_HDMI_TX1_N_TX" from="STD_HDMI_PAIR_HDMI_TX1_N_TX_BEGIN.inner2" to="STD_HDMI_PAIR_HDMI_TX1_N_TX_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_HDMI_PAIR_HDMI_TX1_N_TX_BEGIN.inner2", {"x":47.575016,"y":-25.875002000000002,"layer":"inner2"}, {"x":47.90008,"y":-25.875002000000002,"layer":"inner2"},
      {"x":51.023264,"y":-25.875002000000002,"layer":"inner2"}, {"x":52.873262,"y":-27.725,"layer":"inner2"}, {"x":53.85,"y":-27.725,"layer":"inner2"},
      {"x":54,"y":-27.575000000000003,"layer":"inner2"}, {"x":54,"y":-27.575000000000003,"layer":"inner2"}, {"x":54.2,"y":-27.685000000000002,"layer":"inner2"},
      {"x":54.4,"y":-27.575000000000003,"layer":"inner2"}, {"x":55.6,"y":-27.575000000000003,"layer":"inner2"}, {"x":55.75,"y":-27.725,"layer":"inner2"},
      {"x":56.475,"y":-27.725,"layer":"inner2"}, "STD_HDMI_PAIR_HDMI_TX1_N_TX_END.inner2",
  ]]} />,
  "HDMI_PAIR_HDMI_TX1_P_TX": <trace name="HDMI_PAIR_HDMI_TX1_P_TX" from="STD_HDMI_PAIR_HDMI_TX1_P_TX_BEGIN.inner2" to="STD_HDMI_PAIR_HDMI_TX1_P_TX_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_HDMI_PAIR_HDMI_TX1_P_TX_BEGIN.inner2", {"x":47.575016,"y":-25.625002000000002,"layer":"inner2"}, {"x":47.90008,"y":-25.625002000000002,"layer":"inner2"},
      {"x":51.126818,"y":-25.625002000000002,"layer":"inner2"}, {"x":52.976816,"y":-27.475,"layer":"inner2"}, {"x":53.746446609406725,"y":-27.475,"layer":"inner2"},
      {"x":53.89644660940672,"y":-27.325000000000003,"layer":"inner2"}, {"x":55.70355339059328,"y":-27.325000000000003,"layer":"inner2"}, {"x":55.85355339059328,"y":-27.475,"layer":"inner2"},
      {"x":56.475,"y":-27.475,"layer":"inner2"}, "STD_HDMI_PAIR_HDMI_TX1_P_TX_END.inner2",
  ]]} />,
  "HDMI_PAIR_HDMI_TX2_N_TX": <trace name="HDMI_PAIR_HDMI_TX2_N_TX" from="STD_HDMI_PAIR_HDMI_TX2_N_TX_BEGIN.inner4" to="STD_HDMI_PAIR_HDMI_TX2_N_TX_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_HDMI_PAIR_HDMI_TX2_N_TX_BEGIN.inner4", {"x":47.45008,"y":-24.676782,"layer":"inner4"}, {"x":47.811692,"y":-25.038393,"layer":"inner4"},
      {"x":50.398298,"y":-27.625,"layer":"inner4"}, {"x":52,"y":-27.625,"layer":"inner4"}, {"x":52.015,"y":-27.625489606958784,"layer":"inner4"},
      {"x":52.03,"y":-27.626957672896687,"layer":"inner4"}, {"x":52.045,"y":-27.62940193416244,"layer":"inner4"}, {"x":52.06,"y":-27.63281862188234,"layer":"inner4"},
      {"x":52.075,"y":-27.63720246777157,"layer":"inner4"}, {"x":52.09,"y":-27.642546712257506,"layer":"inner4"}, {"x":52.105000000000004,"y":-27.648843114902522,"layer":"inner4"},
      {"x":52.12,"y":-27.6560819671101,"layer":"inner4"}, {"x":52.135,"y":-27.66425210709483,"layer":"inner4"}, {"x":52.15,"y":-27.67334093709303,"layer":"inner4"},
      {"x":52.165,"y":-27.68333444278762,"layer":"inner4"}, {"x":52.18,"y":-27.69421721491716,"layer":"inner4"}, {"x":52.195,"y":-27.705972473035825,"layer":"inner4"},
      {"x":52.21,"y":-27.718582091387635,"layer":"inner4"}, {"x":52.225,"y":-27.732026626855053,"layer":"inner4"}, {"x":52.24,"y":-27.746285348938873,"layer":"inner4"},
      {"x":52.255,"y":-27.761336271723128,"layer":"inner4"}, {"x":52.269999999999996,"y":-27.7771561877758,"layer":"inner4"}, {"x":52.285,"y":-27.793720703932987,"layer":"inner4"},
      {"x":52.3,"y":-27.811004278911394,"layer":"inner4"}, {"x":52.315,"y":-27.828980262691147,"layer":"inner4"}, {"x":52.33,"y":-27.847620937608173,"layer":"inner4"},
      {"x":52.345,"y":-27.866897561092863,"layer":"inner4"}, {"x":52.36,"y":-27.886780409988994,"layer":"inner4"}, {"x":52.375,"y":-27.90723882638471,"layer":"inner4"},
      {"x":52.39,"y":-27.928241264884782,"layer":"inner4"}, {"x":52.405,"y":-27.94975534125133,"layer":"inner4"}, {"x":52.42,"y":-27.971747882337972,"layer":"inner4"},
      {"x":52.435,"y":-27.9941849772404,"layer":"inner4"}, {"x":52.45,"y":-28.01703202958455,"layer":"inner4"}, {"x":52.465,"y":-28.04025381087169,"layer":"inner4"},
      {"x":52.480000000000004,"y":-28.063814514798228,"layer":"inner4"}, {"x":52.495000000000005,"y":-28.08767781246642,"layer":"inner4"}, {"x":52.51,"y":-28.111806908400915,"layer":"inner4"},
      {"x":52.525,"y":-28.136164597284683,"layer":"inner4"}, {"x":52.54,"y":-28.160713321326956,"layer":"inner4"}, {"x":52.555,"y":-28.18541522817458,"layer":"inner4"},
      {"x":52.57,"y":-28.21023222927763,"layer":"inner4"}, {"x":52.585,"y":-28.235126058619176,"layer":"inner4"}, {"x":52.6,"y":-28.260058331718714,"layer":"inner4"},
      {"x":52.615,"y":-28.28499060481825,"layer":"inner4"}, {"x":52.63,"y":-28.309884434159798,"layer":"inner4"}, {"x":52.644999999999996,"y":-28.334701435262847,"layer":"inner4"},
      {"x":52.66,"y":-28.359403342110472,"layer":"inner4"}, {"x":52.675,"y":-28.38395206615274,"layer":"inner4"}, {"x":52.69,"y":-28.408309755036512,"layer":"inner4"},
      {"x":52.705,"y":-28.432438850971003,"layer":"inner4"}, {"x":52.72,"y":-28.4563021486392,"layer":"inner4"}, {"x":52.735,"y":-28.479862852565734,"layer":"inner4"},
      {"x":52.75,"y":-28.50308463385288,"layer":"inner4"}, {"x":52.765,"y":-28.525931686197026,"layer":"inner4"}, {"x":52.78,"y":-28.548368781099455,"layer":"inner4"},
      {"x":52.795,"y":-28.570361322186095,"layer":"inner4"}, {"x":52.81,"y":-28.591875398552645,"layer":"inner4"}, {"x":52.825,"y":-28.612877837052718,"layer":"inner4"},
      {"x":52.84,"y":-28.633336253448434,"layer":"inner4"}, {"x":52.855000000000004,"y":-28.653219102344565,"layer":"inner4"}, {"x":52.870000000000005,"y":-28.672495725829254,"layer":"inner4"},
      {"x":52.885,"y":-28.69113640074628,"layer":"inner4"}, {"x":52.9,"y":-28.70911238452603,"layer":"inner4"}, {"x":52.915,"y":-28.726395959504437,"layer":"inner4"},
      {"x":52.93,"y":-28.742960475661626,"layer":"inner4"}, {"x":52.945,"y":-28.758780391714296,"layer":"inner4"}, {"x":52.96,"y":-28.773831314498555,"layer":"inner4"},
      {"x":52.975,"y":-28.78809003658237,"layer":"inner4"}, {"x":52.99,"y":-28.801534572049793,"layer":"inner4"}, {"x":53.005,"y":-28.814144190401603,"layer":"inner4"},
      {"x":53.019999999999996,"y":-28.825899448520268,"layer":"inner4"}, {"x":53.035,"y":-28.836782220649805,"layer":"inner4"}, {"x":53.05,"y":-28.846775726344394,"layer":"inner4"},
      {"x":53.065,"y":-28.855864556342596,"layer":"inner4"}, {"x":53.08,"y":-28.864034696327323,"layer":"inner4"}, {"x":53.095,"y":-28.871273548534905,"layer":"inner4"},
      {"x":53.11,"y":-28.877569951179918,"layer":"inner4"}, {"x":53.125,"y":-28.882914195665858,"layer":"inner4"}, {"x":53.14,"y":-28.887298041555084,"layer":"inner4"},
      {"x":53.155,"y":-28.890714729274983,"layer":"inner4"}, {"x":53.17,"y":-28.89315899054074,"layer":"inner4"}, {"x":53.185,"y":-28.894627056478644,"layer":"inner4"},
      {"x":53.2,"y":-28.895116663437424,"layer":"inner4"}, {"x":53.215,"y":-28.894627056478644,"layer":"inner4"}, {"x":53.230000000000004,"y":-28.89315899054074,"layer":"inner4"},
      {"x":53.245000000000005,"y":-28.890714729274983,"layer":"inner4"}, {"x":53.26,"y":-28.887298041555084,"layer":"inner4"}, {"x":53.275,"y":-28.882914195665858,"layer":"inner4"},
      {"x":53.29,"y":-28.877569951179918,"layer":"inner4"}, {"x":53.305,"y":-28.871273548534905,"layer":"inner4"}, {"x":53.32,"y":-28.864034696327323,"layer":"inner4"},
      {"x":53.335,"y":-28.855864556342596,"layer":"inner4"}, {"x":53.35,"y":-28.846775726344394,"layer":"inner4"}, {"x":53.365,"y":-28.836782220649805,"layer":"inner4"},
      {"x":53.38,"y":-28.825899448520268,"layer":"inner4"}, {"x":53.394999999999996,"y":-28.814144190401603,"layer":"inner4"}, {"x":53.41,"y":-28.801534572049793,"layer":"inner4"},
      {"x":53.425,"y":-28.78809003658237,"layer":"inner4"}, {"x":53.44,"y":-28.773831314498555,"layer":"inner4"}, {"x":53.455,"y":-28.758780391714296,"layer":"inner4"},
      {"x":53.47,"y":-28.742960475661626,"layer":"inner4"}, {"x":53.485,"y":-28.726395959504437,"layer":"inner4"}, {"x":53.5,"y":-28.70911238452603,"layer":"inner4"},
      {"x":53.515,"y":-28.69113640074628,"layer":"inner4"}, {"x":53.53,"y":-28.672495725829254,"layer":"inner4"}, {"x":53.545,"y":-28.653219102344565,"layer":"inner4"},
      {"x":53.56,"y":-28.633336253448434,"layer":"inner4"}, {"x":53.575,"y":-28.612877837052718,"layer":"inner4"}, {"x":53.59,"y":-28.591875398552645,"layer":"inner4"},
      {"x":53.605000000000004,"y":-28.570361322186095,"layer":"inner4"}, {"x":53.620000000000005,"y":-28.548368781099455,"layer":"inner4"}, {"x":53.635,"y":-28.525931686197026,"layer":"inner4"},
      {"x":53.65,"y":-28.50308463385288,"layer":"inner4"}, {"x":53.665,"y":-28.479862852565738,"layer":"inner4"}, {"x":53.68,"y":-28.4563021486392,"layer":"inner4"},
      {"x":53.695,"y":-28.432438850971003,"layer":"inner4"}, {"x":53.71,"y":-28.408309755036512,"layer":"inner4"}, {"x":53.725,"y":-28.38395206615274,"layer":"inner4"},
      {"x":53.74,"y":-28.359403342110472,"layer":"inner4"}, {"x":53.755,"y":-28.334701435262847,"layer":"inner4"}, {"x":53.769999999999996,"y":-28.309884434159798,"layer":"inner4"},
      {"x":53.785,"y":-28.28499060481825,"layer":"inner4"}, {"x":53.8,"y":-28.260058331718714,"layer":"inner4"}, {"x":53.815,"y":-28.235126058619176,"layer":"inner4"},
      {"x":53.83,"y":-28.21023222927763,"layer":"inner4"}, {"x":53.845,"y":-28.18541522817458,"layer":"inner4"}, {"x":53.86,"y":-28.160713321326956,"layer":"inner4"},
      {"x":53.875,"y":-28.136164597284683,"layer":"inner4"}, {"x":53.89,"y":-28.111806908400915,"layer":"inner4"}, {"x":53.905,"y":-28.087677812466424,"layer":"inner4"},
      {"x":53.92,"y":-28.063814514798228,"layer":"inner4"}, {"x":53.935,"y":-28.04025381087169,"layer":"inner4"}, {"x":53.95,"y":-28.01703202958455,"layer":"inner4"},
      {"x":53.965,"y":-27.9941849772404,"layer":"inner4"}, {"x":53.980000000000004,"y":-27.971747882337972,"layer":"inner4"}, {"x":53.995000000000005,"y":-27.94975534125133,"layer":"inner4"},
      {"x":54.01,"y":-27.928241264884782,"layer":"inner4"}, {"x":54.025,"y":-27.90723882638471,"layer":"inner4"}, {"x":54.04,"y":-27.886780409988994,"layer":"inner4"},
      {"x":54.055,"y":-27.866897561092863,"layer":"inner4"}, {"x":54.07,"y":-27.847620937608173,"layer":"inner4"}, {"x":54.085,"y":-27.828980262691147,"layer":"inner4"},
      {"x":54.1,"y":-27.811004278911394,"layer":"inner4"}, {"x":54.115,"y":-27.793720703932987,"layer":"inner4"}, {"x":54.13,"y":-27.7771561877758,"layer":"inner4"},
      {"x":54.144999999999996,"y":-27.761336271723128,"layer":"inner4"}, {"x":54.16,"y":-27.746285348938873,"layer":"inner4"}, {"x":54.175,"y":-27.732026626855053,"layer":"inner4"},
      {"x":54.19,"y":-27.718582091387635,"layer":"inner4"}, {"x":54.205,"y":-27.705972473035825,"layer":"inner4"}, {"x":54.22,"y":-27.69421721491716,"layer":"inner4"},
      {"x":54.235,"y":-27.68333444278762,"layer":"inner4"}, {"x":54.25,"y":-27.67334093709303,"layer":"inner4"}, {"x":54.265,"y":-27.664252107094832,"layer":"inner4"},
      {"x":54.28,"y":-27.6560819671101,"layer":"inner4"}, {"x":54.295,"y":-27.648843114902522,"layer":"inner4"}, {"x":54.31,"y":-27.642546712257506,"layer":"inner4"},
      {"x":54.325,"y":-27.63720246777157,"layer":"inner4"}, {"x":54.34,"y":-27.632818621882343,"layer":"inner4"}, {"x":54.355000000000004,"y":-27.62940193416244,"layer":"inner4"},
      {"x":54.370000000000005,"y":-27.626957672896687,"layer":"inner4"}, {"x":54.385000000000005,"y":-27.625489606958784,"layer":"inner4"}, {"x":54.4,"y":-27.625,"layer":"inner4"},
      {"x":55.625,"y":-27.625,"layer":"inner4"}, {"x":55.7,"y":-27.625,"layer":"inner4"}, {"x":55.775,"y":-27.625,"layer":"inner4"},
      {"x":56.35,"y":-27.05,"layer":"inner4"}, "STD_HDMI_PAIR_HDMI_TX2_N_TX_END.inner4",
  ]]} />,
  "HDMI_PAIR_HDMI_TX2_P_TX": <trace name="HDMI_PAIR_HDMI_TX2_P_TX" from="STD_HDMI_PAIR_HDMI_TX2_P_TX_BEGIN.inner4" to="STD_HDMI_PAIR_HDMI_TX2_P_TX_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_HDMI_PAIR_HDMI_TX2_P_TX_BEGIN.inner4", {"x":47.913468,"y":-23.999942,"layer":"inner4"}, {"x":47.988468,"y":-24.074942,"layer":"inner4"},
      {"x":47.988468,"y":-24.861617,"layer":"inner4"}, {"x":50.501852,"y":-27.375,"layer":"inner4"}, {"x":55.625,"y":-27.375,"layer":"inner4"},
      {"x":55.7,"y":-27.3,"layer":"inner4"}, {"x":55.7,"y":-27.05,"layer":"inner4"}, "STD_HDMI_PAIR_HDMI_TX2_P_TX_END.inner4",
  ]]} />,
  "VIDEO_HDMI_RGB_D23_3": <trace name="VIDEO_HDMI_RGB_D23_3" from=".Processor > .U1 > .U10" to="STD_VIDEO_HDMI_RGB_D23_3_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .U10", {"x":6,"y":0.4,"layer":"top"}, {"x":6,"y":0.4,"layer":"top"},
      {"x":6,"y":0.4,"via":true,"fromLayer":"top","toLayer":"inner4"}, {"x":6,"y":0.4,"layer":"inner4"}, {"x":6,"y":8.265,"layer":"inner4"},
      {"x":6.5,"y":8.265,"layer":"inner4"}, {"x":6.5,"y":8.475,"layer":"inner4"}, "STD_VIDEO_HDMI_RGB_D23_3_END.inner4",
  ]]} />,
  "VIDEO_HDMI_ENTEST_9": <trace name="VIDEO_HDMI_ENTEST_9" from="STD_VIDEO_HDMI_ENTEST_9_BEGIN.inner4" to="STD_VIDEO_HDMI_ENTEST_9_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_VIDEO_HDMI_ENTEST_9_BEGIN.inner4", {"x":47.45008,"y":-23.50007,"layer":"inner4"}, {"x":47.9,"y":-23.05015,"layer":"inner4"},
      {"x":47.9,"y":-18,"layer":"inner4"}, {"x":43.49,"y":-18,"layer":"inner4"}, "STD_VIDEO_HDMI_ENTEST_9_END.inner4",
  ]]} />,
  "VIDEO_HDMI_PCADR_10": <trace name="VIDEO_HDMI_PCADR_10" from="STD_VIDEO_HDMI_PCADR_10_BEGIN.inner2" to=".HDMI > .R_HDMI_REF_R181 > .pin1" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_VIDEO_HDMI_PCADR_10_BEGIN.inner2", {"x":47.45008,"y":-22.999944,"layer":"inner2"}, {"x":47.9,"y":-22.550024,"layer":"inner2"},
      {"x":47.9,"y":-20.65,"layer":"inner2"}, {"x":41.86,"y":-20.65,"layer":"inner2"}, {"x":41.5,"y":-21.01,"layer":"inner2"},
      {"x":41.5,"y":-21.009999999999998,"via":true,"fromLayer":"inner2","toLayer":"top"}, {"x":41.5,"y":-21.01,"layer":"top"}, {"x":41.5,"y":-21.01,"layer":"top"},
      ".HDMI > .R_HDMI_REF_R181 > .pin1",
  ]]} />,
  "VIDEO_HDMI_HPD_39": <trace name="VIDEO_HDMI_HPD_39" from="STD_VIDEO_HDMI_HPD_39_BEGIN.inner2" to="STD_VIDEO_HDMI_HPD_39_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_VIDEO_HDMI_HPD_39_BEGIN.inner2", {"x":45.750058,"y":-31.20008,"layer":"inner2"}, {"x":45.750058,"y":-33,"layer":"inner2"},
      {"x":59.69,"y":-33,"layer":"inner2"}, "STD_VIDEO_HDMI_HPD_39_END.inner2",
  ]]} />,
  "RN6_INPUT_HDMI_HSYNC": <trace name="RN6_INPUT_HDMI_HSYNC" from=".Processor > .U1 > .R5" to="STD_RN6_INPUT_HDMI_HSYNC_END.inner2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      ".Processor > .U1 > .R5", {"x":4.4,"y":-3.6,"via":true,"fromLayer":"top","toLayer":"inner2"}, {"x":4.4,"y":-3.6,"layer":"inner2"},
      {"x":4.65,"y":-3.6,"layer":"inner2"}, {"x":4.85,"y":-3.8,"layer":"inner2"}, {"x":4.85,"y":-4.75,"layer":"inner2"},
      {"x":4.75,"y":-4.85,"layer":"inner2"}, {"x":4.75,"y":-5.45,"layer":"inner2"}, {"x":4.95,"y":-5.65,"layer":"inner2"},
      {"x":6.15,"y":-5.65,"layer":"inner2"}, {"x":6.35,"y":-5.85,"layer":"inner2"}, {"x":6.35,"y":-6.175,"layer":"inner2"},
      {"x":9.65,"y":-9.475,"layer":"inner2"}, "STD_RN6_INPUT_HDMI_HSYNC_END.inner2",
  ]]} />,
  "CLOUD_HDMI_LAYERED_HDMI_VSYNC_RX": <trace name="CLOUD_HDMI_LAYERED_HDMI_VSYNC_RX" from="STD_CLOUD_HDMI_LAYERED_HDMI_VSYNC_RX_BEGIN.inner4" to=".HDMI > .RN_HDMI_6 > .5" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_HDMI_LAYERED_HDMI_VSYNC_RX_BEGIN.inner4", {"x":38.54992,"y":-30.500056,"layer":"inner4"}, {"x":14.15,"y":-30.500056,"layer":"inner4"},
      {"x":10.15,"y":-26.500056,"layer":"inner4"}, {"x":10.15,"y":-10.525,"layer":"inner4"}, {"x":10.15,"y":-10.525,"via":true,"fromLayer":"inner4","toLayer":"bottom"},
      ".HDMI > .RN_HDMI_6 > .5",
  ]]} />,
  "CLOUD_HDMI_LAYERED_HDMI_PCLK_RX": <trace name="CLOUD_HDMI_LAYERED_HDMI_PCLK_RX" from="STD_CLOUD_HDMI_LAYERED_HDMI_PCLK_RX_BEGIN.inner4" to=".HDMI > .RN_HDMI_6 > .8" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_HDMI_LAYERED_HDMI_PCLK_RX_BEGIN.inner4", {"x":38.54992,"y":-23.999942,"layer":"inner4"}, {"x":39.25,"y":-24.700022,"layer":"inner4"},
      {"x":39.25,"y":-30.8,"layer":"inner4"}, {"x":38.85,"y":-31.2,"layer":"inner4"}, {"x":10.15,"y":-31.2,"layer":"inner4"},
      {"x":8.9,"y":-29.95,"layer":"inner4"}, {"x":8.9,"y":-10.775,"layer":"inner4"}, {"x":8.65,"y":-10.525,"layer":"inner4"},
      {"x":8.65,"y":-10.525,"via":true,"fromLayer":"inner4","toLayer":"bottom"}, ".HDMI > .RN_HDMI_6 > .8",
  ]]} />,
  "CLOUD_HDMI_LAYERED_HDMI_D4": <trace name="CLOUD_HDMI_LAYERED_HDMI_D4" from="STD_CLOUD_HDMI_LAYERED_HDMI_D4_BEGIN.inner2" to=".HDMI > .RN_HDMI_5 > .8" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_HDMI_LAYERED_HDMI_D4_BEGIN.inner2", {"x":38.54992,"y":-26.999935999999998,"layer":"inner2"}, {"x":37.599936,"y":-26.999935999999998,"layer":"inner2"},
      {"x":35.96,"y":-25.36,"layer":"inner2"}, {"x":20.835,"y":-25.36,"layer":"inner2"}, {"x":11.65,"y":-16.175,"layer":"inner2"},
      {"x":11.65,"y":-16.175,"via":true,"fromLayer":"inner2","toLayer":"bottom"}, ".HDMI > .RN_HDMI_5 > .8",
  ]]} />,
  "CLOUD_RN0_NEAR_HDMI_RGB_D17": <trace name="CLOUD_RN0_NEAR_HDMI_RGB_D17" from="STD_CLOUD_RN0_NEAR_HDMI_RGB_D17_BEGIN.inner2" to=".HDMI > .RN_HDMI_0 > .2" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_RN0_NEAR_HDMI_RGB_D17_BEGIN.inner2", {"x":6.800000000000001,"y":2.8000000000000003,"layer":"inner2"}, {"x":6.800000000000001,"y":3.25,"layer":"inner2"},
      {"x":8.975,"y":3.25,"layer":"inner2"}, {"x":8.975,"y":3.25,"via":true,"fromLayer":"inner2","toLayer":"top"}, ".HDMI > .RN_HDMI_0 > .2",
  ]]} />,
  "CLOUD_RN0_NEAR_HDMI_D2": <trace name="CLOUD_RN0_NEAR_HDMI_D2" from="STD_CLOUD_RN0_NEAR_HDMI_D2_BEGIN.inner4" to="STD_CLOUD_RN0_NEAR_HDMI_D2_END.inner4" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_RN0_NEAR_HDMI_D2_BEGIN.inner4", {"x":38.54992,"y":-27.999934,"layer":"inner4"}, {"x":36.749934,"y":-27.999934,"layer":"inner4"},
      {"x":31.050000000000004,"y":-22.3,"layer":"inner4"}, {"x":23.9,"y":-22.3,"layer":"inner4"}, {"x":23.7,"y":-22.1,"layer":"inner4"},
      {"x":23.7,"y":-20.11,"layer":"inner4"}, {"x":12.89,"y":-9.3,"layer":"inner4"}, {"x":10.7,"y":-9.3,"layer":"inner4"},
      {"x":9.049999999999997,"y":-7.649999999999999,"layer":"inner4"}, {"x":9.049999999999997,"y":3.1500000000000057,"layer":"inner4"}, {"x":6.350000000000001,"y":5.850000000000001,"layer":"inner4"},
      {"x":6.350000000000001,"y":6.150000000000006,"layer":"inner4"}, {"x":6.649999999999999,"y":6.450000000000003,"layer":"inner4"}, {"x":6.949999999999996,"y":6.450000000000003,"layer":"inner4"},
      {"x":10.049999999999997,"y":3.3500000000000014,"layer":"inner4"}, {"x":10.025,"y":3.3250000000000046,"layer":"inner4"}, {"x":10.025,"y":3.25,"layer":"inner4"},
      "STD_CLOUD_RN0_NEAR_HDMI_D2_END.inner4",
  ]]} />,
  "CLOUD_RN0_NEAR_HDMI_D18": <trace name="CLOUD_RN0_NEAR_HDMI_D18" from="STD_CLOUD_RN0_NEAR_HDMI_D18_BEGIN.inner2" to=".HDMI > .RN_HDMI_0 > .8" width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[
      "STD_CLOUD_RN0_NEAR_HDMI_D18_BEGIN.inner2", {"x":42.750064,"y":-22.29992,"layer":"inner2"}, {"x":42.750064,"y":-21.700064,"layer":"inner2"},
      {"x":42.55,"y":-21.5,"layer":"inner2"}, {"x":41.38,"y":-21.5,"layer":"inner2"}, {"x":37.1,"y":-17.22,"layer":"inner2"},
      {"x":37.1,"y":-0.72,"layer":"inner2"}, {"x":33.74,"y":2.64,"layer":"inner2"}, {"x":11.3,"y":2.64,"layer":"inner2"},
      {"x":10.19,"y":3.75,"layer":"inner2"}, {"x":10.025,"y":3.75,"layer":"inner2"}, {"x":10.025,"y":3.75,"via":true,"fromLayer":"inner2","toLayer":"top"},
      ".HDMI > .RN_HDMI_0 > .8",
  ]]} />,
}

export function applyHdmiEndpointRoutes(node:any):any {
 const board=mapNativeElements(node,element=>element.type==='trace'&&Object.hasOwn(routes,element.props.name)?routes[element.props.name as keyof typeof routes]:element)
 return cloneElement(board,{children:<>{board.props.children}
    <via name="STD_HDMI_PAIR_HDMI_TXC_N_TX_BEGIN" pcbX={47.45008} pcbY={-28.50006} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .21">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TXC_P_TX_BEGIN" pcbX={47.45008} pcbY={-27.999934} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .22">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TXC_P_TX_END" pcbX={56.35} pcbY={-29.200000000000003} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI_ESD > .8">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TX0_N_TX_BEGIN" pcbX={47.45008} pcbY={-26.999936} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .24">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TX0_P_TX_BEGIN" pcbX={47.45008} pcbY={-26.500064000000002} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .25">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TX0_P_TX_END" pcbX={56.55} pcbY={-28.2} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI_ESD > .10">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TX1_N_TX_BEGIN" pcbX={47.45008} pcbY={-25.999938} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .26">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TX1_N_TX_END" pcbX={56.55} pcbY={-27.8} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI_ESD > .11">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TX1_P_TX_BEGIN" pcbX={47.45008} pcbY={-25.500066} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .27">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TX1_P_TX_END" pcbX={56.55} pcbY={-27.400000000000002} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI_ESD > .12">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TX2_N_TX_BEGIN" pcbX={47.45008} pcbY={-24.500068} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .29">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TX2_N_TX_END" pcbX={56.35} pcbY={-26.8} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI_ESD > .13">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TX2_P_TX_BEGIN" pcbX={47.45008} pcbY={-23.999942} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .30">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_HDMI_PAIR_HDMI_TX2_P_TX_END" pcbX={55.95} pcbY={-26.8} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI_ESD > .14">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_VIDEO_HDMI_RGB_D23_3_END" pcbX={6.5} pcbY={8.475} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .RN_HDMI_1 > .4">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_VIDEO_HDMI_ENTEST_9_BEGIN" pcbX={47.45008} pcbY={-23.50007} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .31">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_VIDEO_HDMI_ENTEST_9_END" pcbX={43.49} pcbY={-18} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .R_HDMI_REF_R176 > .pin1">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_VIDEO_HDMI_PCADR_10_BEGIN" pcbX={47.45008} pcbY={-22.999944} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .32">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_VIDEO_HDMI_HPD_39_BEGIN" pcbX={45.750058} pcbY={-31.20008} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .14">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_VIDEO_HDMI_HPD_39_END" pcbX={59.69} pcbY={-33} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .J_HDMI > .19">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_RN6_INPUT_HDMI_HSYNC_END" pcbX={9.65} pcbY={-9.475} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .RN_HDMI_6 > .3">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_HDMI_LAYERED_HDMI_VSYNC_RX_BEGIN" pcbX={38.54992} pcbY={-30.500056} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .64">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_HDMI_LAYERED_HDMI_PCLK_RX_BEGIN" pcbX={38.54992} pcbY={-23.999942} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .51">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_HDMI_LAYERED_HDMI_D4_BEGIN" pcbX={38.54992} pcbY={-26.999935999999998} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .57">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_RN0_NEAR_HDMI_RGB_D17_BEGIN" pcbX={6.800000000000001} pcbY={2.8000000000000003} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .V13">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_RN0_NEAR_HDMI_D2_BEGIN" pcbX={38.54992} pcbY={-27.999934} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .59">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_RN0_NEAR_HDMI_D2_END" pcbX={10.025} pcbY={3.25} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .RN_HDMI_0 > .7">
      <port name="inner4" layer="inner4" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
    <via name="STD_CLOUD_RN0_NEAR_HDMI_D18_BEGIN" pcbX={42.750064} pcbY={-22.29992} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.3} connectsTo=".HDMI > .U_HDMI > .41">
      <port name="inner2" layer="inner2" ref={p=>p?.registerMatch(p.parent as any)}/>
    </via>
 </>})
}
