import {Children,cloneElement,isValidElement} from 'react'
// One immutable replacement combines east U12 shortening with west D15 array access.
const replacements=[
  {
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
          "x": 6.5,
          "y": -19.1,
          "layer": "inner2"
        },
        {
          "x": 6.5,
          "y": -17.5,
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
  },
  {
    "name": "CLOUD_HDMI_LAYERED_HDMI_D6",
    "from": ".HDMI > .U_HDMI > .54",
    "to": ".HDMI > .RN_HDMI_3 > .8",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .54",
        {
          "x": 38.54992,
          "y": -25.500066,
          "via": true,
          "fromLayer": "top",
          "toLayer": "inner2"
        },
        {
          "x": 38.54992,
          "y": -25.500066,
          "layer": "inner2"
        },
        {
          "x": 39.500066,
          "y": -25.500066,
          "layer": "inner2"
        },
        {
          "x": 41.50000000000001,
          "y": -27.50000000000001,
          "layer": "inner2"
        },
        {
          "x": 41.50000000000001,
          "y": -31.8,
          "layer": "inner2"
        },
        {
          "x": 41.250000000000014,
          "y": -32.05,
          "layer": "inner2"
        },
        {
          "x": 37,
          "y": -32.05,
          "layer": "inner2"
        },
        {
          "x": 36.7,
          "y": -32.35,
          "layer": "inner2"
        },
        {
          "x": 19.45,
          "y": -32.35,
          "layer": "inner2"
        },
        {
          "x": 4.8,
          "y": -17.7,
          "layer": "inner2"
        },
        {
          "x": 4.8,
          "y": -14.225,
          "layer": "inner2"
        },
        {
          "x": 5.5,
          "y": -13.525,
          "layer": "inner2"
        },
        {
          "x": 5.5,
          "y": -13.525,
          "via": true,
          "fromLayer": "inner2",
          "toLayer": "bottom"
        },
        ".HDMI > .RN_HDMI_3 > .8"
      ]
    ]
  },
  {
    "name": "HDMI3V3_BRANCH_2",
    "from": ".HDMI > .C_HDMI_REF_C177 > .pin1",
    "to": ".HDMI > .U_HDMI > .9",
    "width": 0.2,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .C_HDMI_REF_C177 > .pin1",
        {
          "x": 44.5,
          "y": -33.51,
          "layer": "top"
        },
        {
          "x": 44.699999999999996,
          "y": -33.3,
          "layer": "top"
        },
        {
          "x": 45.25,
          "y": -32.75,
          "layer": "top"
        },
        {
          "x": 45.25,
          "y": -30.9,
          "layer": "top"
        },
        {
          "x": 44.95,
          "y": -30.6,
          "layer": "top"
        },
        {
          "x": 43.53333333333333,
          "y": -30.6,
          "layer": "top"
        },
        {
          "x": 43.4,
          "y": -30.733333333333334,
          "layer": "top"
        },
        {
          "x": 43.4,
          "y": -31,
          "layer": "top"
        },
        {
          "x": 43.249936,
          "y": -31.20008,
          "layer": "top"
        },
        ".HDMI > .U_HDMI > .9"
      ]
    ]
  }
] as const
export {CloudU12ReferenceReturn} from './CloudU12ReferenceReturn'
export function applyCoordinatedVideoAccess(x:any):any{if(Array.isArray(x))return x.map(applyCoordinatedVideoAccess);if(!isValidElement(x))return x;if(typeof x.type==='function')return applyCoordinatedVideoAccess(x.type(x.props));const p=replacements.find(r=>r.name===x.props.name);return cloneElement(x,p??{},...Children.toArray(x.props.children).map(applyCoordinatedVideoAccess))}
