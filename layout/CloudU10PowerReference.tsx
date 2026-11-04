import {Children,cloneElement,isValidElement} from 'react'
const replacements=[
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
          "x": 44.7,
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
          "x": 43.549936,
          "y": -30.6,
          "layer": "top"
        },
        {
          "x": 43.249936,
          "y": -30.9,
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
export function applyU10PowerReferenceRelief(x:any):any{if(Array.isArray(x))return x.map(applyU10PowerReferenceRelief);if(!isValidElement(x))return x;if(typeof x.type==='function')return applyU10PowerReferenceRelief(x.type(x.props));const p=replacements.find(r=>r.name===x.props.name);return cloneElement(x,p??{},...Children.toArray(x.props.children).map(applyU10PowerReferenceRelief))}
