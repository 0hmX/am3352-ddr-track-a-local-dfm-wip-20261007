import routes from '../data/cloud-rn5-input-routes.json'
import {CloudSysboot0EastRoutes} from './CloudSysboot0EastRoutes'

/** Original logical map; every signal transition belongs to an actual component pad.
 * The CPU T1 through-barrel is preserved once; its Inner4 tap emits no second drill.
 */
export function CloudRn5EastInputRoutes(){
 const route=(net:string,layer:string)=>routes.find(r=>r.net===net&&r.layer===layer)!
 const normal=(name:string,r:any,from:string,to:string)=><trace name={name} from={from} to={to} width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[from,...r.points.map(([x,y]:number[])=>({x,y,layer:r.layer})),to]]}/>
 const r4=route('SYSBOOT4','inner4'),tx=6.875,ty=-15.8
 return <>
  <CloudSysboot0EastRoutes/>
  <via name="RN5_INPUT_CPU4_THROUGH" pcbX={5.2} pcbY={-6.8} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.30} connectsTo=".Processor > .U1 > .T1"/>
  <via name="RN5_INPUT_R4_VIP" pcbX={tx} pcbY={ty} fromLayer="bottom" toLayer="inner4" holeDiameter={.15} outerDiameter={.30} connectsTo=".Boot_and_clock > .R_BOOT4 > .pin1"/>
  <trace name="RN5_INPUT_SYS4_CPU_PULL" from="net.SYSBOOT4" to=".RN5_INPUT_R4_VIP > .inner4" width={.1} pcbPaths={[[...r4.points.map(([x,y])=>({x:x-tx,y:y-ty})),'.RN5_INPUT_R4_VIP > .inner4']]}/>
  {normal('RN5_INPUT_SYS4_PULL_ARRAY',route('SYSBOOT4','bottom'),'.Boot_and_clock > .R_BOOT4 > .pin1','.HDMI > .RN_HDMI_5 > .3')}
  <via name="RN5_INPUT_R12_VIP" pcbX={6.925} pcbY={-14.83} fromLayer="bottom" toLayer="inner4" holeDiameter={.15} outerDiameter={.30} connectsTo=".Boot_and_clock > .R_BOOT12 > .pin1"/>
  {normal('RN5_INPUT_SYS12_CPU_PULL',route('SYSBOOT12','inner4'),'.SYS12_CPU_VIP > .inner4','.RN5_INPUT_R12_VIP > .inner4')}
  {normal('RN5_INPUT_SYS12_PULL_ARRAY',route('SYSBOOT12','bottom'),'.Boot_and_clock > .R_BOOT12 > .pin1','.HDMI > .RN_HDMI_5 > .1')}
  <via name="RN5_INPUT_SYS8_ARRAY_VIP" pcbX={13.15} pcbY={-15.125} fromLayer="bottom" toLayer="inner2" holeDiameter={.15} outerDiameter={.30} connectsTo=".HDMI > .RN_HDMI_5 > .4"/>
  {normal('RN5_INPUT_SYS8_CPU_ARRAY',route('SYSBOOT8','inner2'),'.SYS8_CPU_VIP > .inner2','.RN5_INPUT_SYS8_ARRAY_VIP > .inner2')}
  {normal('RN5_INPUT_SYS8_PULL_ARRAY',route('SYSBOOT8','bottom'),'.Boot_and_clock > .R_BOOT8 > .pin1','.HDMI > .RN_HDMI_5 > .4')}
 </>
}
