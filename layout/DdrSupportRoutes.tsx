export function DdrSupportRoutes(){return <>
<trace pcbStyle={{viaHoleDiameter:0.15,viaPadDiameter:0.3}} name="DDR_ZQ_ROUTE" from=".U3 > .L8" to=".R_DDR_ZQ > .pin1" width={0.1} pcbPath={[
  ".U3 > .L8", {x:2.400046,y:-2.000123,via:true,fromLayer:"top",toLayer:"inner2"},
  {x:4.7,y:-2.25}, {x:7.01,y:-2.5,via:true,fromLayer:"inner2",toLayer:"bottom"}, ".R_DDR_ZQ > .pin1"
]} />
<trace pcbStyle={{viaHoleDiameter:0.15,viaPadDiameter:0.3}} name="DDR_VTP_ROUTE" from=".U1 > .J3" to=".R_DDR_VTP > .pin1" width={0.1} pcbPath={[
  ".U1 > .J3", {x:-0.4,y:-5.2,via:true,fromLayer:"top",toLayer:"inner2"},
  {x:-2.43806062,y:-3.16193938}, {x:-7.30570791,y:-3.16193938},
  {x:-7.30570791,y:-3.72951418}, {x:-7.42915703,y:-3.8529633},
  {x:-7.42915703,y:-4.02015703}, {x:-7.479,y:-4.07},
  {x:-7.479,y:-4.07,via:true,fromLayer:"inner2",toLayer:"bottom"},
  {x:-7.479,y:-3.511}, ".R_DDR_VTP > .pin1"
]} />
<trace name="DDR_VREF_DIVIDER" from=".R_VREF_TOP > .pin2" to=".R_VREF_BOT > .pin1" width={0.1}
  pcbPath={[".R_VREF_TOP > .pin2", ".R_VREF_BOT > .pin1"]} />
<trace name="DDR_VREF_CAP_0_3" from=".C_VREF_0 > .pin1" to=".C_VREF_3 > .pin1" width={0.1}
  pcbPath={[".C_VREF_0 > .pin1", {x:0.51,y:-0.95}, {x:-1.54,y:-0.95}, ".C_VREF_3 > .pin1"]} />
<trace name="DDR_VREF_CAP_3_TOP" from=".C_VREF_3 > .pin1" to=".C_VREF_TOP > .pin2" width={0.1}
  pcbPath={[".C_VREF_3 > .pin1", {x:0.2,y:-0.8}, {x:-2.51,y:-1.65}, ".C_VREF_TOP > .pin2"]} />
<trace name="DDR_VREF_DIVIDER_TO_CAP" from=".R_VREF_BOT > .pin1" to=".C_VREF_3 > .pin1" width={0.1}
  pcbPath={[".R_VREF_BOT > .pin1", {x:0.51,y:-0.65}, {x:-0.55,y:-0.65}, {x:-0.55,y:-2.55}, ".C_VREF_3 > .pin1"]} />
<trace pcbStyle={{viaHoleDiameter:0.15,viaPadDiameter:0.3}} name="DDR_VREF_RAM_H1" from=".U3 > .H1" to=".C_VREF_0 > .pin1" width={0.1} pcbPath={[
  ".U3 > .H1", {x:-3.199892,y:0.399923,via:true,fromLayer:"top",toLayer:"inner2"},
  {x:-3.791,y:0.991031}, {x:-3.791,y:1.24},
  {x:-3.791,y:1.24,via:true,fromLayer:"inner2",toLayer:"bottom"},
  {x:-3.85401047,y:1.30301047}, {x:-4.75702094,y:0.4}, ".C_VREF_0 > .pin1"
]} />
<trace pcbStyle={{viaHoleDiameter:0.15,viaPadDiameter:0.3}} name="DDR_VREF_RAM_M8" from=".U3 > .M8" to=".C_VREF_1 > .pin1" width={0.1} pcbPath={[
  ".U3 > .M8", {x:2.400046,y:-2.800223,via:true,fromLayer:"top",toLayer:"inner2"},
  {x:4.232,y:-2.8}, {x:5.552,y:-4.12},
  {x:5.552,y:-4.12,via:true,fromLayer:"inner2",toLayer:"bottom"},
  {x:5.62726035,y:-4.12}, {x:5.74670901,y:-4.00055134},
  {x:6.19726035,y:-3.55}, ".C_VREF_1 > .pin1"
]} />
<trace name="DDR_VREF_CAP_0_1" from=".C_VREF_0 > .pin1" to=".C_VREF_1 > .pin1" width={0.1} pcbPath={[
  ".C_VREF_0 > .pin1", {x:7.85592814,y:0}, {x:12.19723573,y:-4.37723571},
  {x:12.48737113,y:-4.43095501}, {x:12.75044943,y:-4.427444},
  {x:13.01078547,y:-4.42630072}, {x:13.26033585,y:-4.4065123},
  {x:13.25,y:-4.389}, {x:13.321,y:-4.389}, ".C_VREF_1 > .pin1"
]} />
<trace pcbStyle={{viaHoleDiameter:0.15,viaPadDiameter:0.3}} name="DDR_VREF_CPU_TO_CAP" from=".U1 > .J4" to=".C_VREF_2 > .pin1" width={0.1} pcbPath={[
  ".U1 > .J4", {x:-0.4,y:-4.4,via:true,fromLayer:"top",toLayer:"inner2"},
  {x:0.06638152,y:-3.93361848}, {x:1.40365702,y:-3.93537193},
  {x:1.59226487,y:-3.69175345}, {x:1.59,y:-3.33109498},
  {x:0.67342998,y:-2.41452496}, {x:-2.54038934,y:-2.41452496},
  {x:-2.56491593,y:-2.38999837}, {x:-2.72870991,y:-2.38999837},
  {x:-2.73061572,y:-2.38809256}, {x:-2.73061572,y:-2.38809256,via:true,fromLayer:"inner2",toLayer:"bottom"},
  {x:-2.75,y:-2.36870828}, {x:-2.77383862,y:-1.88696043}, {x:-2.63779891,y:-1.60355696},
  {x:-2.61396029,y:-1.615}, {x:1.125,y:-1.615}, ".C_VREF_2 > .pin1"
]} />
<trace name="DDR_VREF_JOIN" from=".R_VREF_TOP > .pin2" to=".C_VREF_2 > .pin1" width={0.1} pcbPath={[
  ".R_VREF_TOP > .pin2", {x:-2.56063454,y:2.05063454}, {x:-2.56063454,y:14.90049951},
  {x:1.81089331,y:14.90049951}, {x:6.8433279,y:19.93293411},
  {x:8.44293411,y:19.93293411}, ".C_VREF_2 > .pin1"
]} />
</>}
