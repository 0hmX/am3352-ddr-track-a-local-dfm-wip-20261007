// Candidate local regulator copper. Confirm combined board clearances.
export function PowerTrunks(){return <>
<trace name="POWER_TRUNK_0" from=".L_PWR1 > .pin2" to=".C_PWR7 > .pin1" width={1.5} pcbPath={[".L_PWR1 > .pin2",{"x":1.185,"y":0},{"x":3.5,"y":0},{"x":3.5,"y":1},".C_PWR7 > .pin1"]} />
<trace name="POWER_TRUNK_1" from=".L_PWR2 > .pin2" to=".C_PWR8 > .pin1" width={1.5} pcbPath={[".L_PWR2 > .pin2",{"x":1.185,"y":0},{"x":3.4,"y":0},{"x":3.4,"y":1},".C_PWR8 > .pin1"]} />
<trace name="POWER_TRUNK_EXTRA_0" from=".C_PWR7 > .pin1" to=".C_PWR7_B > .pin1" width={1.5} pcbPath={[".C_PWR7 > .pin1",{"x":-1.5,"y":0},{"x":-1.5,"y":-3.3},".C_PWR7_B > .pin1"]} />
<trace name="POWER_TRUNK_EXTRA_1" from=".C_PWR8 > .pin1" to=".C_PWR8_B > .pin1" width={1.5} pcbPath={[".C_PWR8 > .pin1",{"x":-1.5,"y":0},{"x":-1.5,"y":-3.3},".C_PWR8_B > .pin1"]} />
</>}
