import {Children,cloneElement,isValidElement} from 'react'
const replacements=[
  {
    "name": "CLOUD_LOCAL_56_I2C0_SDA",
    "from": ".HDMI > .U_HDMI > .11",
    "to": ".Power_management > .R_PWR5 > .pin1",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .11",
        {
          "x": 44.249934,
          "y": -31.20008,
          "via": true,
          "fromLayer": "top",
          "toLayer": "inner4"
        },
        {
          "x": 44.249934,
          "y": -31.20008,
          "layer": "inner4"
        },
        {
          "x": 44.249934,
          "y": -29.049934000000007,
          "layer": "inner4"
        },
        {
          "x": 38.699999999999996,
          "y": -23.5,
          "layer": "inner4"
        },
        {
          "x": 38.4,
          "y": -23.5,
          "layer": "inner4"
        },
        {
          "x": 37.2,
          "y": -22.3,
          "layer": "inner4"
        },
        {
          "x": 26.6,
          "y": -22.3,
          "layer": "inner4"
        },
        {
          "x": 18.49,
          "y": -14.189999999999998,
          "layer": "inner4"
        },
        {
          "x": 18.49,
          "y": -14,
          "layer": "inner4"
        }
      ]
    ]
  },
  {
    "name": "VIDEO_HDMI_DDC_SDA_22",
    "from": "DDC_U15_VIP.inner4",
    "to": "DDC_R147_VIP.inner4",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        "DDC_U15_VIP.inner4",
        {
          "x": 46.24993,
          "y": -31.20008,
          "layer": "inner4"
        },
        {
          "x": 45.8,
          "y": -31.65,
          "layer": "inner4"
        },
        {
          "x": 41.71,
          "y": -31.65,
          "layer": "inner4"
        },
        {
          "x": 41.51,
          "y": -31.85,
          "layer": "inner4"
        },
        {
          "x": 41.51,
          "y": -32.5,
          "layer": "inner4"
        },
        "DDC_R147_VIP.inner4"
      ]
    ]
  }
] as const
export function applySdaCorridorRelief(x:any):any{if(!isValidElement(x))return x;if(typeof x.type==='function')return applySdaCorridorRelief(x.type(x.props));const p=replacements.find(r=>r.name===x.props.name);return cloneElement(x,p??{},...Children.toArray(x.props.children).map(applySdaCorridorRelief))}
