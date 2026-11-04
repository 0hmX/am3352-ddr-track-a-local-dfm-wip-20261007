import {Children,cloneElement,isValidElement} from 'react'
// Trace-only gate-access relief. Preserves all V28 D3 eastern and upper-bank changes.
const route={
  "name": "CLOUD_HDMI_LAYERED_HDMI_D3",
  "from": ".HDMI > .U_HDMI > .58",
  "to": ".HDMI > .RN_HDMI_2 > .5",
  "width": 0.1,
  "pcbPathRelativeTo": ".Processor > .U1 > .A1",
  "pcbPaths": [
    [
      ".HDMI > .U_HDMI > .58",
      {
        "x": 38.54992,
        "y": -27.500062,
        "via": true,
        "fromLayer": "top",
        "toLayer": "inner2"
      },
      {
        "x": 38.54992,
        "y": -27.500062,
        "layer": "inner2"
      },
      {
        "x": 40.200062,
        "y": -27.500062,
        "layer": "inner2"
      },
      {
        "x": 41.200062,
        "y": -28.500062,
        "layer": "inner2"
      },
      {
        "x": 41.200062,
        "y": -30.65,
        "layer": "inner2"
      },
      {
        "x": 40.200062,
        "y": -31.65,
        "layer": "inner2"
      },
      {
        "x": 37.05,
        "y": -31.65,
        "layer": "inner2"
      },
      {
        "x": 36.85,
        "y": -31.45,
        "layer": "inner2"
      },
      {
        "x": 18.85,
        "y": -31.45,
        "layer": "inner2"
      },
      {
        "x": 6.575,
        "y": -19.175,
        "layer": "inner2"
      },
      {
        "x": 6.575,
        "y": -17.425,
        "layer": "inner2"
      },
      {
        "x": 7.2,
        "y": -16.8,
        "layer": "inner2"
      },
      {
        "x": 7.2,
        "y": -14.4,
        "layer": "inner2"
      },
      {
        "x": 7.425,
        "y": -14.175,
        "layer": "inner2"
      },
      {
        "x": 7.425,
        "y": -13.325,
        "layer": "inner2"
      },
      {
        "x": 7,
        "y": -12.9,
        "layer": "inner2"
      },
      {
        "x": 7,
        "y": -11.775,
        "layer": "inner2"
      },
      {
        "x": 6.5,
        "y": -11.275,
        "layer": "inner2"
      },
      {
        "x": 6.5,
        "y": -11.275,
        "via": true,
        "fromLayer": "inner2",
        "toLayer": "bottom"
      },
      ".HDMI > .RN_HDMI_2 > .5"
    ]
  ]
} as const
export function applyD3OscGateRelief(x:any):any{if(Array.isArray(x))return x.map(applyD3OscGateRelief);if(!isValidElement(x))return x;if(typeof x.type==='function')return applyD3OscGateRelief(x.type(x.props));return cloneElement(x,x.props.name===route.name?route:{},...Children.toArray(x.props.children).map(applyD3OscGateRelief))}
