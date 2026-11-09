import {Circuit} from '@tscircuit/core'

// Native TSX: the sampled bend creates a 2.8 µm pour boundary edge.
export async function renderMicronPourRepro() {
const c=new Circuit({platform:{partsEngineDisabled:true,netlistDrcChecksDisabled:true}});c.schematicDisabled=true;c.add(<board width={12}height={60}layers={8}pcbRelative routingDisabled minTraceToPadEdgeClearance={.1}minPadEdgeToPadEdgeClearance={.1}>
<net name="GND"/><net name="SIGNAL"/><net name="OTHER"/>
{[["A",-1.999999999999801,-24.40196629488619,.05,"SIGNAL"],["B",-2.400046,-25.000131,.175006,"SIGNAL"],["P",-1.599946,-25.000131,.175006,"OTHER"],["ANCHOR",0,0,.05,"OTHER"],["GROUND",-3,-26,.2,"GND"]].map(([name,x,y,r,net])=><chip key={name as string} name={name as string}pcbX={x as number}pcbY={y as number}pinLabels={{pin1:"PIN"}}connections={{pin1:'net.'+net}}footprint={<footprint><smtpad portHints={['1']}shape="circle"radius={r as number}pcbX={0}pcbY={0}/></footprint>}/>)}
<trace name="CURVE" from=".A > .pin1"to=".B > .pin1"width={.1}pcbPathRelativeTo=".ANCHOR > .pin1"pcbPaths={[[".A > .pin1",{"x":-1.999999999999801,"y":-24.40196629488619},
 {"x":-2.0004321484565915,"y":-24.42379106503745},
 {"x":-2.001728593826962,"y":-24.445257885465775},
 {"x":-2.0038893361109142,"y":-24.46636675617118},
 {"x":-2.0069143753084466,"y":-24.48711767715364},
 {"x":-2.0108037114195594,"y":-24.507510648413177},
 {"x":-2.015557344444254,"y":-24.527545669949784},
 {"x":-2.0211752743825278,"y":-24.547222741763456},
 {"x":-2.0276575012343825,"y":-24.5665418638542},
 {"x":-2.0350040249998185,"y":-24.585503036222015},
 {"x":-2.043214845678835,"y":-24.604106258866896},
 {"x":-2.052289963271432,"y":-24.62235153178885},
 {"x":-2.06222937777761,"y":-24.640238854987874},
 {"x":-2.0730330891973683,"y":-24.657768228463965},
 {"x":-2.0847010975307074,"y":-24.674939652217123},
 {"x":-2.0972334027776274,"y":-24.691753126247352},
 {"x":-2.1106300049381277,"y":-24.708208650554653},
 {"x":-2.124890904012209,"y":-24.72430622513902},
 {"x":-2.1400160999998707,"y":-24.74004585000046},
 {"x":-2.400046,"y":-25.000131},".B > .pin1"]]}/>
<copperpour layer="top"connectsTo="net.GND"unbroken clearance={.105}outline={[{x:-4,y:-27},{x:0,y:-27},{x:0,y:-22},{x:-4,y:-22}]}/></board>);await c.renderUntilSettled();return c.getCircuitJson()
}
