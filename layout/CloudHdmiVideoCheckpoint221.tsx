import {Children,cloneElement,isValidElement} from 'react'
import {CloudHdmiVideoRoutes as Base} from './CloudHdmiVideoCheckpoint191'
const replacements=[
  {
    "name": "HDMI_PAIR_HDMI_TX0_N_TX",
    "from": ".HDMI > .U_HDMI > .24",
    "to": ".HDMI > .U_HDMI_ESD > .9",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .24",
        {
          "x": 47.45008,
          "y": -26.999936,
          "layer": "top"
        },
        {
          "x": 47.45008,
          "y": -26.999936,
          "layer": "top"
        },
        {
          "x": 47.45008,
          "y": -26.999936,
          "via": true,
          "fromLayer": "top",
          "toLayer": "inner2"
        },
        {
          "x": 47.611627999999996,
          "y": -26.838388000000002,
          "layer": "inner2"
        },
        {
          "x": 47.811692,
          "y": -26.838388000000002,
          "layer": "inner2"
        },
        {
          "x": 49.498303,
          "y": -28.525,
          "layer": "inner2"
        },
        {
          "x": 54.365,
          "y": -28.525,
          "layer": "inner2"
        },
        {
          "x": 54.75,
          "y": -28.139999999999997,
          "layer": "inner2"
        },
        {
          "x": 55.175,
          "y": -28.139999999999997,
          "layer": "inner2"
        },
        {
          "x": 55.559999999999995,
          "y": -28.525,
          "layer": "inner2"
        },
        {
          "x": 56.475,
          "y": -28.525000000000002,
          "layer": "inner2"
        },
        {
          "x": 56.55,
          "y": -28.6,
          "via": true,
          "fromLayer": "inner2",
          "toLayer": "top"
        },
        {
          "x": 56.55,
          "y": -28.6,
          "layer": "top"
        },
        {
          "x": 56.55,
          "y": -28.6,
          "layer": "top"
        },
        ".HDMI > .U_HDMI_ESD > .9"
      ]
    ]
  },
  {
    "name": "HDMI_PAIR_HDMI_TX0_P_TX",
    "from": ".HDMI > .U_HDMI > .25",
    "to": ".HDMI > .U_HDMI_ESD > .10",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .25",
        {
          "x": 47.45008,
          "y": -26.500064000000002,
          "layer": "top"
        },
        {
          "x": 47.45008,
          "y": -26.500064000000002,
          "layer": "top"
        },
        {
          "x": 47.45008,
          "y": -26.500064000000002,
          "via": true,
          "fromLayer": "top",
          "toLayer": "inner2"
        },
        {
          "x": 47.826921,
          "y": -26.500064000000002,
          "layer": "inner2"
        },
        {
          "x": 47.988468,
          "y": -26.661612,
          "layer": "inner2"
        },
        {
          "x": 49.601857,
          "y": -28.275,
          "layer": "inner2"
        },
        {
          "x": 54.261446609406725,
          "y": -28.275,
          "layer": "inner2"
        },
        {
          "x": 54.64644660940672,
          "y": -27.889999999999997,
          "layer": "inner2"
        },
        {
          "x": 55.278553390593274,
          "y": -27.889999999999997,
          "layer": "inner2"
        },
        {
          "x": 55.66355339059327,
          "y": -28.275,
          "layer": "inner2"
        },
        {
          "x": 56.475,
          "y": -28.275000000000002,
          "layer": "inner2"
        },
        {
          "x": 56.55,
          "y": -28.2,
          "via": true,
          "fromLayer": "inner2",
          "toLayer": "top"
        },
        {
          "x": 56.55,
          "y": -28.2,
          "layer": "top"
        },
        {
          "x": 56.55,
          "y": -28.2,
          "layer": "top"
        },
        ".HDMI > .U_HDMI_ESD > .10"
      ]
    ]
  },
  {
    "name": "HDMI_PAIR_HDMI_TX1_N_TX",
    "from": ".HDMI > .U_HDMI > .26",
    "to": ".HDMI > .U_HDMI_ESD > .11",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .26",
        {
          "x": 47.45008,
          "y": -25.999938,
          "layer": "top"
        },
        {
          "x": 47.45008,
          "y": -25.999938,
          "layer": "top"
        },
        {
          "x": 47.45008,
          "y": -25.999938,
          "via": true,
          "fromLayer": "top",
          "toLayer": "inner2"
        },
        {
          "x": 47.575016,
          "y": -25.875002000000002,
          "layer": "inner2"
        },
        {
          "x": 47.90008,
          "y": -25.875002000000002,
          "layer": "inner2"
        },
        {
          "x": 51.023264,
          "y": -25.875002000000002,
          "layer": "inner2"
        },
        {
          "x": 52.873262,
          "y": -27.725,
          "layer": "inner2"
        },
        {
          "x": 53.85,
          "y": -27.725,
          "layer": "inner2"
        },
        {
          "x": 54.0,
          "y": -27.575000000000003,
          "layer": "inner2"
        },
        {
          "x": 54,
          "y": -27.575000000000003,
          "layer": "inner2"
        },
        {
          "x": 54.2,
          "y": -27.685000000000002,
          "layer": "inner2"
        },
        {
          "x": 54.4,
          "y": -27.575000000000003,
          "layer": "inner2"
        },
        {
          "x": 55.6,
          "y": -27.575000000000003,
          "layer": "inner2"
        },
        {
          "x": 55.75,
          "y": -27.725,
          "layer": "inner2"
        },
        {
          "x": 56.475,
          "y": -27.725,
          "layer": "inner2"
        },
        {
          "x": 56.55,
          "y": -27.8,
          "via": true,
          "fromLayer": "inner2",
          "toLayer": "top"
        },
        {
          "x": 56.55,
          "y": -27.8,
          "layer": "top"
        },
        {
          "x": 56.55,
          "y": -27.8,
          "layer": "top"
        },
        ".HDMI > .U_HDMI_ESD > .11"
      ]
    ]
  },
  {
    "name": "HDMI_PAIR_HDMI_TX1_P_TX",
    "from": ".HDMI > .U_HDMI > .27",
    "to": ".HDMI > .U_HDMI_ESD > .12",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .27",
        {
          "x": 47.45008,
          "y": -25.500066,
          "layer": "top"
        },
        {
          "x": 47.45008,
          "y": -25.500066,
          "layer": "top"
        },
        {
          "x": 47.45008,
          "y": -25.500066,
          "via": true,
          "fromLayer": "top",
          "toLayer": "inner2"
        },
        {
          "x": 47.575016,
          "y": -25.625002000000002,
          "layer": "inner2"
        },
        {
          "x": 47.90008,
          "y": -25.625002000000002,
          "layer": "inner2"
        },
        {
          "x": 51.126818,
          "y": -25.625002000000002,
          "layer": "inner2"
        },
        {
          "x": 52.976816,
          "y": -27.475,
          "layer": "inner2"
        },
        {
          "x": 53.746446609406725,
          "y": -27.475,
          "layer": "inner2"
        },
        {
          "x": 53.89644660940672,
          "y": -27.325000000000003,
          "layer": "inner2"
        },
        {
          "x": 55.70355339059328,
          "y": -27.325000000000003,
          "layer": "inner2"
        },
        {
          "x": 55.85355339059328,
          "y": -27.475,
          "layer": "inner2"
        },
        {
          "x": 56.475,
          "y": -27.475,
          "layer": "inner2"
        },
        {
          "x": 56.55,
          "y": -27.400000000000002,
          "via": true,
          "fromLayer": "inner2",
          "toLayer": "top"
        },
        {
          "x": 56.55,
          "y": -27.4,
          "layer": "top"
        },
        {
          "x": 56.55,
          "y": -27.4,
          "layer": "top"
        },
        ".HDMI > .U_HDMI_ESD > .12"
      ]
    ]
  },
  {
    "name": "VIDEO_HDMI_D1_17",
    "from": ".HDMI > .U_HDMI > .60",
    "to": ".HDMI > .RN_HDMI_1 > .8",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .60",
        {
          "x": 38.54992,
          "y": -28.50006,
          "via": true,
          "fromLayer": "top",
          "toLayer": "bottom"
        },
        {
          "x": 38.54992,
          "y": -28.50006,
          "layer": "bottom"
        },
        {
          "x": 38.699999999999996,
          "y": -28.349980000000006,
          "layer": "bottom"
        },
        {
          "x": 38.699999999999996,
          "y": -28.3,
          "layer": "bottom"
        },
        {
          "x": 44.300000000000004,
          "y": -22.700000000000003,
          "layer": "bottom"
        },
        {
          "x": 45.00000000000001,
          "y": -22.700000000000003,
          "layer": "bottom"
        },
        {
          "x": 45.1,
          "y": -22.5,
          "layer": "bottom"
        },
        {
          "x": 45.1,
          "y": -11.399999999999999,
          "layer": "bottom"
        },
        {
          "x": 36.50000000000001,
          "y": -2.799999999999997,
          "layer": "bottom"
        },
        {
          "x": 36.50000000000001,
          "y": -0.5,
          "layer": "bottom"
        },
        {
          "x": 32.800000000000004,
          "y": 3.200000000000003,
          "layer": "bottom"
        },
        {
          "x": 27.300000000000004,
          "y": 3.200000000000003,
          "layer": "bottom"
        },
        {
          "x": 16.800000000000004,
          "y": 13.700000000000003,
          "layer": "bottom"
        },
        {
          "x": 6.299999999999997,
          "y": 13.700000000000003,
          "layer": "bottom"
        },
        {
          "x": 4.0,
          "y": 11.399999999999999,
          "layer": "bottom"
        },
        {
          "x": 4.0,
          "y": 10.600000000000001,
          "layer": "bottom"
        },
        {
          "x": 4.199999999999999,
          "y": 10.5,
          "layer": "bottom"
        },
        {
          "x": 7.299999999999997,
          "y": 10.5,
          "layer": "bottom"
        },
        {
          "x": 8.0,
          "y": 9.800000000000004,
          "layer": "bottom"
        },
        {
          "x": 8,
          "y": 9.525,
          "layer": "bottom"
        },
        ".HDMI > .RN_HDMI_1 > .8"
      ]
    ]
  }
] as const
function visit(x:any):any {if(!isValidElement(x))return x;if(x.type==='trace'&&x.props.name==='VIDEO_SYSBOOT3_34')return null;if(x.type==='trace'&&x.props.pcbPaths&&JSON.stringify([x.props.from,x.props.to,x.props.connectsTo]).includes('RN_HDMI_6'))return null;const p=replacements.find(p=>p.name===x.props.name);return cloneElement(x,p??{},...Children.toArray(x.props.children).map(visit))}
export function CloudHdmiVideoRoutes(){return visit(Base())}
