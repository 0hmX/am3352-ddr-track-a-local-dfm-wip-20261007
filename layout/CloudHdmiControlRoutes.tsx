// Native local routes: actual centered pad escapes and checked layer transitions.
export const cloudLocalRoutes = [
  {
    "name": "CLOUD_LOCAL_HDMI_CONTROL_6_NEXT_HDMI_CEC_PULLUP",
    "net": "HDMI_CEC_PULLUP",
    "from": ".HDMI > .D_HDMI_CEC > .2",
    "to": ".HDMI > .R_HDMI_REF_R166 > .pin1",
    "fromLayer": "top",
    "toLayer": "top",
    "toJunction": false,
    "points": [
      {
        "x": 51.55,
        "y": -36
      },
      {
        "x": 51.55,
        "y": -21.059999999999995
      },
      {
        "x": 45.49,
        "y": -15
      }
    ],
    "layer": "bottom",
    "cost": 29.510134187980952,
    "vias": 2
  },
  {
    "name": "CLOUD_LOCAL_HDMI_HPDFIRST_8_NEXT_HDMI_DDC_SDA",
    "net": "HDMI_DDC_SDA",
    "from": ".HDMI > .U_HDMI_ESD > .16",
    "to": ".HDMI > .J_HDMI > .16",
    "fromLayer": "top",
    "toLayer": "top",
    "toJunction": false,
    "points": [
      {
        "x": 55.15,
        "y": -26.8
      },
      {
        "x": 55.05000000000001,
        "y": -26.899999999999988
      },
      {
        "x": 55.05000000000001,
        "y": -26.949999999999996
      },
      {
        "x": 54.95000000000001,
        "y": -27.049999999999997
      },
      {
        "x": 52.80000000000001,
        "y": -27.049999999999997
      },
      {
        "x": 51.75,
        "y": -28.10000000000001
      },
      {
        "x": 51.75,
        "y": -30.449999999999996
      },
      {
        "x": 54.650000000000006,
        "y": -33.35
      },
      {
        "x": 55.35000000000001,
        "y": -33.35
      },
      {
        "x": 56.55000000000001,
        "y": -32.15
      },
      {
        "x": 56.55000000000001,
        "y": -31.1
      },
      {
        "x": 56.65000000000001,
        "y": -31
      },
      {
        "x": 57.85,
        "y": -31
      },
      {
        "x": 58.35,
        "y": -31.5
      },
      {
        "x": 59.69,
        "y": -31.5
      }
    ],
    "layer": "top",
    "cost": 19.041727983645313,
    "vias": 0
  }
]
export const localReturnStitches=[
  {
    "x": 52.0581337428812,
    "y": -35.7895241121992,
    "fromLayer": "inner1",
    "toLayer": "inner6",
    "signalTransition": {
      "x": 51.55,
      "y": -36,
      "fromGroundLayer": "inner1",
      "toGroundLayer": "inner6",
      "trace": "CLOUD_LOCAL_HDMI_CONTROL_6_NEXT_HDMI_CEC_PULLUP"
    },
    "distance": 0.55
  },
  {
    "x": 46.04,
    "y": -15,
    "fromLayer": "inner6",
    "toLayer": "inner1",
    "signalTransition": {
      "x": 45.49,
      "y": -15,
      "fromGroundLayer": "inner6",
      "toGroundLayer": "inner1",
      "trace": "CLOUD_LOCAL_HDMI_CONTROL_6_NEXT_HDMI_CEC_PULLUP"
    },
    "distance": 0.55
  }
]
export function CloudHdmiControlRoutes(){return <group name="CloudHdmiControlRoutes" pcbX={0} pcbY={0} pcbRelative pcbStyle={{viaHoleDiameter:.15,viaPadDiameter:.3}}>{cloudLocalRoutes.map((r:any)=>{
const sections=r.sections??[{layer:r.layer,points:r.points}],first=sections[0].points[0],last=sections.at(-1).points.at(-1),path:any[]=[r.from];
if(r.fromLayer!==sections[0].layer)path.push({...first,via:true,fromLayer:r.fromLayer,toLayer:sections[0].layer});
for(let i=0;i<sections.length;i++){const s=sections[i];if(i)path.push({...s.points[0],via:true,fromLayer:sections[i-1].layer,toLayer:s.layer});path.push(...s.points.map((p:any)=>({x:p.x,y:p.y})));}
if(r.toLayer!==sections.at(-1).layer)path.push({...last,via:true,fromLayer:sections.at(-1).layer,toLayer:r.toLayer});if(!r.toJunction)path.push(r.to);
return <trace name={r.name} from={r.from} to={r.to} width={.1} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[path]}/>})}{localReturnStitches.map((v:any,i:number)=><via name={`CLOUD_HDMI_CONTROL_RETURN_${i}`} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer} toLayer={v.toLayer} holeDiameter={.15} outerDiameter={.3} connectsTo="net.GND"/>)}</group>}
