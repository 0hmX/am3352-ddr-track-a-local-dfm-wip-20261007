import React,{Children,cloneElement,isValidElement} from 'react'
// Staged original-map RN5 whole-footprint relocation. Native all-eight-leg proof required.
const routes=[
  {
    "name": "CLOUD_VIDEO_ENDPOINT_HDMI_D13",
    "from": ".HDMI > .U_HDMI > .46",
    "to": ".HDMI > .RN_HDMI_5 > .5",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .46",
        {
          "x": 40.249942,
          "y": -22.29992,
          "via": true,
          "fromLayer": "top",
          "toLayer": "bottom"
        },
        {
          "x": 40.249942,
          "y": -22.29992,
          "layer": "bottom"
        },
        {
          "x": 19.27492,
          "y": -22.29992,
          "layer": "bottom"
        },
        {
          "x": 13.15,
          "y": -16.175,
          "layer": "bottom"
        },
        ".HDMI > .RN_HDMI_5 > .5"
      ]
    ]
  },
  {
    "name": "CLOUD_VIDEO_ENDPOINT_HDMI_D23",
    "from": ".HDMI > .U_HDMI > .36",
    "to": ".HDMI > .RN_HDMI_5 > .6",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .36",
        {
          "x": 45.249932,
          "y": -22.29992,
          "via": true,
          "fromLayer": "top",
          "toLayer": "inner2"
        },
        {
          "x": 45.249932,
          "y": -22.29992,
          "layer": "inner2"
        },
        {
          "x": 45.249932,
          "y": -22.450067999999998,
          "layer": "inner2"
        },
        {
          "x": 44.65,
          "y": -23.05,
          "layer": "inner2"
        },
        {
          "x": 39.25,
          "y": -23.05,
          "layer": "inner2"
        },
        {
          "x": 34.300000000000004,
          "y": -18.1,
          "layer": "inner2"
        },
        {
          "x": 14.575000000000001,
          "y": -18.1,
          "layer": "inner2"
        },
        {
          "x": 12.65,
          "y": -16.175,
          "layer": "inner2"
        },
        {
          "x": 12.65,
          "y": -16.175,
          "via": true,
          "fromLayer": "inner2",
          "toLayer": "bottom"
        },
        ".HDMI > .RN_HDMI_5 > .6"
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_LAYERED_HDMI_D19",
    "from": ".HDMI > .U_HDMI > .40",
    "to": ".HDMI > .RN_HDMI_5 > .7",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .40",
        {
          "x": 43.249936,
          "y": -22.29992,
          "via": true,
          "fromLayer": "top",
          "toLayer": "bottom"
        },
        {
          "x": 43.249936,
          "y": -22.29992,
          "layer": "bottom"
        },
        {
          "x": 42.799856,
          "y": -22.75,
          "layer": "bottom"
        },
        {
          "x": 18.5,
          "y": -22.75,
          "layer": "bottom"
        },
        {
          "x": 12.15,
          "y": -16.4,
          "layer": "bottom"
        },
        {
          "x": 12.15,
          "y": -16.175,
          "layer": "bottom"
        },
        ".HDMI > .RN_HDMI_5 > .7"
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_LAYERED_HDMI_D4",
    "from": ".HDMI > .U_HDMI > .57",
    "to": ".HDMI > .RN_HDMI_5 > .8",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .57",
        {
          "x": 38.54992,
          "y": -26.999935999999998,
          "via": true,
          "fromLayer": "top",
          "toLayer": "inner2"
        },
        {
          "x": 38.54992,
          "y": -26.999935999999998,
          "layer": "inner2"
        },
        {
          "x": 37.599936,
          "y": -26.999935999999998,
          "layer": "inner2"
        },
        {
          "x": 35.96,
          "y": -25.36,
          "layer": "inner2"
        },
        {
          "x": 20.835,
          "y": -25.36,
          "layer": "inner2"
        },
        {
          "x": 11.65,
          "y": -16.175,
          "layer": "inner2"
        },
        {
          "x": 11.65,
          "y": -16.175,
          "via": true,
          "fromLayer": "inner2",
          "toLayer": "bottom"
        },
        ".HDMI > .RN_HDMI_5 > .8"
      ]
    ]
  }
] as const
const grounds=[
  {
    "net": "GND",
    "x": 12.4,
    "y": -15.65,
    "fromLayer": "inner1",
    "toLayer": "inner6",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "name": "RN5_EAST_RETURN_0"
  },
  {
    "net": "GND",
    "x": 40.249942,
    "y": -21.74992,
    "fromLayer": "inner1",
    "toLayer": "inner6",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "name": "RN5_EAST_RETURN_1"
  },
  {
    "net": "GND",
    "x": 45.249932,
    "y": -21.74992,
    "fromLayer": "inner1",
    "toLayer": "inner3",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "name": "RN5_EAST_RETURN_2"
  }
] as const
export function applyRn5OutputReplacements(x:any):any{if(Array.isArray(x))return x.map(applyRn5OutputReplacements);if(!isValidElement(x))return x;if(typeof x.type==='function')return applyRn5OutputReplacements(x.type(x.props));const p=routes.find(r=>r.name===x.props.name&&['CLOUD_HDMI_LAYERED_HDMI_D19','CLOUD_HDMI_LAYERED_HDMI_D4'].includes(r.name));return cloneElement(x,p??{},...Children.toArray(x.props.children).map(applyRn5OutputReplacements))}
export function CloudRn5NewOutputRoutes(){return <><group name="Rn5EastNewOutputs" pcbRelative pcbStyle={{viaHoleDiameter:.15,viaPadDiameter:.3}}>{routes.filter(r=>r.name.startsWith('CLOUD_VIDEO_ENDPOINT_')).map(r=><trace key={r.name} {...r}/>)}</group>{grounds.map(g=><via key={g.name} name={g.name} pcbX={g.x} pcbY={g.y} fromLayer={g.fromLayer} toLayer={g.toLayer} holeDiameter={.15} outerDiameter={.3} connectsTo=".Processor > .U1 > .A1"/>)}</>}
