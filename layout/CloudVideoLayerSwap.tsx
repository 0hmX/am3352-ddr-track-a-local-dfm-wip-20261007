import {Children,cloneElement,isValidElement} from 'react'
const replacements=[
  {
    "name": "VIDEO_HDMI_D18_14",
    "from": ".HDMI > .U_HDMI > .41",
    "to": ".HDMI > .RN_HDMI_0 > .8",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .41",
        {
          "x": 42.750064,
          "y": -22.29992,
          "via": true,
          "fromLayer": "top",
          "toLayer": "inner2"
        },
        {
          "x": 42.750064,
          "y": -22.29992,
          "layer": "inner2"
        },
        {
          "x": 42.750064,
          "y": -22.150064,
          "layer": "inner2"
        },
        {
          "x": 42.1,
          "y": -21.5,
          "layer": "inner2"
        },
        {
          "x": 41.300000000000004,
          "y": -21.5,
          "layer": "inner2"
        },
        {
          "x": 36.800000000000004,
          "y": -17.0,
          "layer": "inner2"
        },
        {
          "x": 36.800000000000004,
          "y": -0.8000000000000043,
          "layer": "inner2"
        },
        {
          "x": 33.6,
          "y": 2.3999999999999986,
          "layer": "inner2"
        },
        {
          "x": 10.800000000000004,
          "y": 2.3999999999999986,
          "layer": "inner2"
        },
        {
          "x": 8.950000000000003,
          "y": 4.25,
          "layer": "inner2"
        },
        {
          "x": 8.775,
          "y": 4.25,
          "layer": "inner2"
        },
        {
          "x": 8.775,
          "y": 4.25,
          "via": true,
          "fromLayer": "inner2",
          "toLayer": "top"
        },
        ".HDMI > .RN_HDMI_0 > .8"
      ]
    ]
  },
  {
    "name": "VIDEO_HDMI_D16_15",
    "from": ".HDMI > .U_HDMI > .43",
    "to": ".HDMI > .RN_HDMI_1 > .7",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .43",
        {
          "x": 41.750066,
          "y": -22.29992,
          "via": true,
          "fromLayer": "top",
          "toLayer": "inner4"
        },
        {
          "x": 41.750066,
          "y": -22.29992,
          "layer": "inner4"
        },
        {
          "x": 41.750066,
          "y": -17.350065999999998,
          "layer": "inner4"
        },
        {
          "x": 20.4,
          "y": 4.0,
          "layer": "inner4"
        },
        {
          "x": 16.200000000000003,
          "y": 4.0,
          "layer": "inner4"
        },
        {
          "x": 9.399999999999999,
          "y": 10.800000000000004,
          "layer": "inner4"
        },
        {
          "x": 8.600000000000001,
          "y": 10.800000000000004,
          "layer": "inner4"
        },
        {
          "x": 7.5,
          "y": 9.700000000000003,
          "layer": "inner4"
        },
        {
          "x": 7.5,
          "y": 9.525,
          "layer": "inner4"
        },
        {
          "x": 7.5,
          "y": 9.525,
          "via": true,
          "fromLayer": "inner4",
          "toLayer": "bottom"
        },
        ".HDMI > .RN_HDMI_1 > .7"
      ]
    ]
  }
] as const
export function applyD16D18LayerSwap(x:any):any {if(!isValidElement(x))return x;const r=replacements.find(r=>r.name===x.props.name);return cloneElement(x,r??{},...Children.toArray(x.props.children).map(applyD16D18LayerSwap))}
