/** Candidate chassis bonds; require combined board connectivity and geometry checks. */

export function ChassisRoutes(){return <>
<trace name="CHASSIS_ROUTE_0" from=".C_ETH_CHASSIS > .pin1" to=".J_ETH > .pin13_internal_1" width={0.15} pcbPath={[".C_ETH_CHASSIS > .pin1", ...[{"x":-1.475,"y":1.74}], ".J_ETH > .pin13_internal_1"]} />
<trace name="CHASSIS_ROUTE_1" from=".C_ETH_CHASSIS > .pin1" to=".R_ETH_CHASSIS > .pin1" width={0.15} pcbPath={[".C_ETH_CHASSIS > .pin1", ...[{"x":0.390994,"y":-0.929154}], ".R_ETH_CHASSIS > .pin1"]} />
<trace name="CHASSIS_ROUTE_2" from=".J_ETH > .8" to=".J_ETH > .pin13_internal_1" width={0.15} pcbPath={[".J_ETH > .8", ...[{"x":3.748165,"y":-9.260216}], ".J_ETH > .pin13_internal_1"]} />
<trace name="CHASSIS_ROUTE_3" from=".J_ETH > .8" to=".J_ETH > .SH" width={0.15} pcbPath={[".J_ETH > .8", ...[{"x":5.84,"y":-5.59}], ".J_ETH > .SH"]} />
</>}
