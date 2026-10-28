// Short surface connections to cleared via-in-pad power feeds.
export function DdrPowerConnections(){return <>
<via name="DDR_POWER_F5" pcbX={-2.8} pcbY={-3.58} fromLayer="top" toLayer="inner2" holeDiameter={0.15} outerDiameter={0.3} connectsTo=".U1 > .F5" />
<trace name="DDR_POWER_F5_INNER" from=".DDR_POWER_F5 > .inner2" to="net.DDR_1V5" width={0.15} pcbPath={[".DDR_POWER_F5 > .inner2",{x:1.6,y:-0.02}]} />
<trace name="DDR_POWER_BRANCH_0" from=".U1 > .E5" to=".U1 > .F5" width={0.15} pcbPath={[".U1 > .E5",{"x":-3.6,"y":-3.6},{"x":-2.8000000000000003,"y":-3.6},".U1 > .F5"]} />
<trace name="DDR_POWER_BRANCH_1" from=".U1 > .G5" to=".U1 > .F5" width={0.15} pcbPath={[".U1 > .G5",{"x":-2,"y":-3.6},{"x":-2.8000000000000003,"y":-3.6},".U1 > .F5"]} />
<trace name="DDR_POWER_BRANCH_4" from=".U3 > .K8" to=".U3 > .G7" width={0.15} pcbPath={[".U3 > .K8",{"x":2.400046,"y":-1.2000230000000016},{"x":1.9809520000000001,"y":-1.2000230000000016},{"x":1.9809520000000001,"y":1.1997689999999999},{"x":1.599946,"y":1.1997689999999999},".U3 > .G7"]} />
<trace name="DDR_POWER_BRANCH_5" from=".U3 > .D9" to=".U3 > .E9" width={0.15} pcbPath={[".U3 > .D9",{"x":3.199892,"y":3.5998149999999995},{"x":3.199892,"y":2.799969000000001},".U3 > .E9"]} />
<trace name="DDR_POWER_BRANCH_6" from=".U3 > .H9" to=".U3 > .G7" width={0.15} pcbPath={[".U3 > .H9",{"x":3.199892,"y":0.39992300000000114},{"x":3.199892,"y":0.8437629999999992},{"x":1.599946,"y":0.8437629999999992},{"x":1.599946,"y":1.1997689999999999},".U3 > .G7"]} />
<via name="DDR_POWER_K2" pcbX={-2.420046} pcbY={-28.200023} fromLayer="top" toLayer="inner2" holeDiameter={0.15} outerDiameter={0.3} connectsTo=".U3 > .K2" />
<trace name="DDR_POWER_K2_INNER" from=".DDR_POWER_K2 > .inner2" to="net.DDR_1V5" width={0.15} pcbPath={[".DDR_POWER_K2 > .inner2", {x:0.03,y:1.549946}]} />
</>}
