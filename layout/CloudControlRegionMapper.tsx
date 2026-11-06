import{Children,cloneElement,isValidElement}from'react'
import{CloudHpdEndpointRoutes}from'./CloudHpdEndpointRoutes'
const replacements=[
  {
    "name": "VIDEO_HDMI_DDC_SCL_26",
    "from": "DDC_J15_VIP.inner2",
    "to": "DDC_U16_VIP.inner4",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        "DDC_J15_VIP.inner2",
        {
          "x": 59.69,
          "y": -31
        },
        {
          "x": 46.950136,
          "y": -31.0
        },
        {
          "x": 46.750056,
          "y": -31.20008
        },
        "DDC_U16_VIP.inner4"
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
          "y": -31.20008
        },
        {
          "x": 41.51,
          "y": -31.20008
        },
        {
          "x": 41.51,
          "y": -32.5
        },
        "DDC_R147_VIP.inner4"
      ]
    ]
  },
  {
    "name": "VIDEO_HDMI_DDC_SCL_25",
    "from": "DDC_U16_VIP.inner4",
    "to": "DDC_R146_VIP.inner4",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        "DDC_U16_VIP.inner4",
        {
          "x": 46.750056,
          "y": -31.20008
        },
        {
          "x": 46.750056,
          "y": -35.49
        },
        {
          "x": 46,
          "y": -35.49
        },
        "DDC_R146_VIP.inner4"
      ]
    ]
  },
  {
    "name": "VIDEO_HDMI_DDC_SCL_40",
    "from": ".HDMI > .U_HDMI > .16",
    "to": ".HDMI > .U_HDMI_ESD > .15",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI > .16",
        {
          "x": 46.750056,
          "y": -31.20008
        },
        {
          "x": 47.46688042105263,
          "y": -31.20008
        },
        {
          "x": 48.224460421052626,
          "y": -30.442500000000003
        },
        {
          "x": 49.480000000000004,
          "y": -30.442500000000003
        },
        {
          "x": 53.58250000000001,
          "y": -26.34
        },
        {
          "x": 55.55,
          "y": -26.34
        },
        {
          "x": 55.55,
          "y": -26.8
        },
        ".HDMI > .U_HDMI_ESD > .15"
      ]
    ]
  },
  {
    "name": "VIDEO_HDMI_DDC_SDA_24",
    "from": "DDC_J16_VIP.inner2",
    "to": "DDC_U15_VIP.inner4",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        "DDC_J16_VIP.inner2",
        {
          "x": 59.69,
          "y": -31.5
        },
        {
          "x": 58.65,
          "y": -31.5
        },
        {
          "x": 57.75,
          "y": -32.4
        },
        {
          "x": 52.75357142857143,
          "y": -32.4
        },
        {
          "x": 51.94107142857143,
          "y": -31.5875
        },
        {
          "x": 47.794318181818184,
          "y": -31.5875
        },
        {
          "x": 47.76818181818182,
          "y": -31.613636363636363
        },
        {
          "x": 46.58360636363636,
          "y": -31.613636363636363
        },
        {
          "x": 46.24993,
          "y": -31.279959999999996
        },
        {
          "x": 46.24993,
          "y": -31.20008
        },
        "DDC_U15_VIP.inner4"
      ]
    ]
  },
  {
    "name": "DDC_SDA_ESD_ENDPOINT",
    "from": "DDC_ESD16_VIP.inner2",
    "to": "DDC_J16_VIP.inner2",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        "DDC_ESD16_VIP.inner2",
        {
          "x": 55.15,
          "y": -26.8
        },
        {
          "x": 55.56309523809524,
          "y": -26.386904761904763
        },
        {
          "x": 56.5619,
          "y": -26.386904761904763
        },
        {
          "x": 60.025,
          "y": -29.85
        },
        {
          "x": 60.025,
          "y": -31.165000000000006
        },
        {
          "x": 59.69,
          "y": -31.5
        },
        "DDC_J16_VIP.inner2"
      ]
    ]
  },
  {
    "name": "VIDEO_HDMI_CEC_28",
    "from": "CEC_U17_VIP.inner2",
    "to": "CEC_J13_VIP.inner2",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        "CEC_U17_VIP.inner2",
        {
          "x": 47.45008,
          "y": -30.500056
        },
        {
          "x": 59.38,
          "y": -30.500056
        },
        {
          "x": 59.38,
          "y": -30
        },
        {
          "x": 59.69,
          "y": -30
        },
        "CEC_J13_VIP.inner2"
      ]
    ]
  },
  {
    "name": "HDMI_CEC_ESD_TO_DIODE",
    "from": ".HDMI > .U_HDMI_ESD > .1",
    "to": ".HDMI > .D_HDMI_CEC > .1",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        ".HDMI > .U_HDMI_ESD > .1",
        {
          "x": 55.0,
          "y": -27.4
        },
        {
          "x": 53.45,
          "y": -27.4
        },
        {
          "x": 52.225,
          "y": -28.625
        },
        {
          "x": 52.225,
          "y": -31.4
        },
        {
          "x": 52.975,
          "y": -32.15
        },
        {
          "x": 52.975,
          "y": -35.324999999999996
        },
        {
          "x": 51.85,
          "y": -36.45
        },
        {
          "x": 49.9,
          "y": -36.45
        },
        {
          "x": 49.45,
          "y": -36
        },
        ".HDMI > .D_HDMI_CEC > .1"
      ]
    ]
  },
  {
    "name": "HDMI_CEC_DIODE_TO_U17",
    "from": "CEC_DIODE_VIP.inner2",
    "to": "CEC_U17_VIP.inner2",
    "width": 0.1,
    "pcbPathRelativeTo": ".Processor > .U1 > .A1",
    "pcbPaths": [
      [
        "CEC_DIODE_VIP.inner2",
        {
          "x": 49.45,
          "y": -36.0
        },
        {
          "x": 48.449404761904766,
          "y": -36.0
        },
        {
          "x": 45.4,
          "y": -32.95059523809523
        },
        {
          "x": 45.4,
          "y": -31.05
        },
        {
          "x": 45.949944,
          "y": -30.500056
        },
        {
          "x": 47.45008,
          "y": -30.500056
        },
        "CEC_U17_VIP.inner2"
      ]
    ]
  }
] as const
const vias=[
  {
    "name": "DDC_U15_VIP",
    "pcbX": 46.24993,
    "pcbY": -31.20008,
    "fromLayer": "top",
    "toLayer": "inner4",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "connectsTo": ".HDMI > .U_HDMI > .15"
  },
  {
    "name": "DDC_U16_VIP",
    "pcbX": 46.750056,
    "pcbY": -31.20008,
    "fromLayer": "top",
    "toLayer": "inner4",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "connectsTo": ".HDMI > .U_HDMI > .16"
  },
  {
    "name": "DDC_R147_VIP",
    "pcbX": 41.51,
    "pcbY": -32.5,
    "fromLayer": "top",
    "toLayer": "inner4",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "connectsTo": ".HDMI > .R_HDMI_REF_R147 > .pin2"
  },
  {
    "name": "DDC_R146_VIP",
    "pcbX": 46,
    "pcbY": -35.49,
    "fromLayer": "top",
    "toLayer": "inner4",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "connectsTo": ".HDMI > .R_HDMI_REF_R146 > .pin2"
  },
  {
    "name": "DDC_J16_VIP",
    "pcbX": 59.69,
    "pcbY": -31.5,
    "fromLayer": "top",
    "toLayer": "inner2",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "connectsTo": ".HDMI > .J_HDMI > .16"
  },
  {
    "name": "DDC_J15_VIP",
    "pcbX": 59.69,
    "pcbY": -31,
    "fromLayer": "top",
    "toLayer": "inner2",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "connectsTo": ".HDMI > .J_HDMI > .15"
  },
  {
    "name": "DDC_ESD16_VIP",
    "pcbX": 55.15,
    "pcbY": -26.8,
    "fromLayer": "top",
    "toLayer": "inner2",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "connectsTo": ".HDMI > .U_HDMI_ESD > .16"
  },
  {
    "name": "CEC_U17_VIP",
    "pcbX": 47.45008,
    "pcbY": -30.500056,
    "fromLayer": "top",
    "toLayer": "inner2",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "connectsTo": ".HDMI > .U_HDMI > .17"
  },
  {
    "name": "CEC_J13_VIP",
    "pcbX": 59.69,
    "pcbY": -30,
    "fromLayer": "top",
    "toLayer": "inner2",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "connectsTo": ".HDMI > .J_HDMI > .13"
  },
  {
    "name": "CEC_DIODE_VIP",
    "pcbX": 49.45,
    "pcbY": -36,
    "fromLayer": "top",
    "toLayer": "inner2",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "connectsTo": ".HDMI > .D_HDMI_CEC > .1"
  }
] as const
const legacyNames=new Set(['VIDEO_HDMI_DDC_SDA_22','VIDEO_HDMI_DDC_SDA_24','VIDEO_HDMI_DDC_SCL_25','VIDEO_HDMI_DDC_SCL_26','VIDEO_HDMI_DDC_SCL_40','VIDEO_HDMI_CEC_28'])
function visit(x:any):any{if(!isValidElement(x))return x;const r=replacements.find(q=>q.name===x.props.name);return cloneElement(x,r??{},...Children.toArray(x.props.children).map(visit))}
/** Apply to current selected49 tree exactly once. All unrelated elements remain supplied by caller. */
export function applyControlRegionEndpointV2(x:any){return <group name="CloudControlRegionEndpointV2" pcbRelative>{visit(x)}{vias.map(v=><via key={v.name}{...v}/>)}{replacements.filter(r=>!legacyNames.has(r.name)).map(v=><trace key={v.name}{...v}/>)}<CloudHpdEndpointRoutes/></group>}
