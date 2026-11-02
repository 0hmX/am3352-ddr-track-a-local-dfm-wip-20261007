import {Children,cloneElement,isValidElement} from 'react'
import {CloudHdmiVideoRoutes as Base} from './CloudHdmiVideoCheckpoint221'
// R183 joins the existing Top RESET trunk at its real copper bend; no via or phantom pad.
const replacement={
  "name": "VIDEO_HDMI_RESET_N_41",
  "from": ".HDMI > .R_HDMI_REF_R183 > .pin2",
  "to": ".HDMI > .U_HDMI > .33",
  "width": 0.1,
  "pcbPathRelativeTo": ".Processor > .U1 > .A1",
  "pcbPaths": [
    [
      ".HDMI > .R_HDMI_REF_R183 > .pin2",
      {
        "x": 42.5,
        "y": -17.99,
        "layer": "top"
      },
      {
        "x": 42.97,
        "y": -17.52,
        "layer": "top"
      },
      {
        "x": 44.15,
        "y": -17.52,
        "layer": "top"
      }
    ]
  ]
} as const
function visit(x:any):any {if(!isValidElement(x))return x;return cloneElement(x,x.props.name===replacement.name?replacement:{},...Children.toArray(x.props.children).map(visit))}
export function CloudHdmiVideoRoutes(){return visit(Base())}
