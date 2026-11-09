// D21 endpoint route coordinated with reviewed RX escapes.
export const vias = [
  {
    "name": "D21_CPU_VIP",
    "net": "HDMI_RGB_D21",
    "selector": ".Processor > .U1 > .T11",
    "x": 5.2,
    "y": 1.2,
    "fromLayer": "top",
    "toLayer": "inner2",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "name": "D21_RN1_VIP",
    "net": "HDMI_RGB_D21",
    "selector": ".HDMI > .RN_HDMI_1 > .2",
    "x": 7.5,
    "y": 8.475,
    "fromLayer": "bottom",
    "toLayer": "inner2",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },

]
export const routes = [
  {
    "net": "HDMI_RGB_D21",
    "name": "CLOUD_ETH_HDMI_RGB_D21_ENDPOINT_ONLY",
    "layer": "inner2",
    "fromLayer": "top",
    "toLayer": "bottom",
    "width": 0.1,
    "points": [
      [
        5.2,
        1.2
      ],
      [
        5.2,
        1.85
      ],
      [
        4.65,
        2.4
      ],
      [
        3.4,
        2.4
      ],
      [
        2.875,
        2.925
      ],
      [
        1.3,
        2.925
      ],
      [
        0.8,
        3.425
      ],
      [
        0.8,
        4.575
      ],
      [
        1.8249999999999995,
        5.6
      ],
      [
        2.1999999999999993,
        5.6
      ],
      [
        5.074999999999999,
        8.475
      ],
      [
        7.5,
        8.475
      ]
    ],
    "lengthMm": 15.167819253992697,
    "from": ".Processor > .U1 > .T11",
    "to": ".HDMI > .RN_HDMI_1 > .2",
    "oldLengthMm": 9.788782463805516,
    "fromSelector": "D21_CPU_VIP.inner2",
    "toSelector": "D21_RN1_VIP.inner2"
  }
]
export function CloudD21EndpointOnly(){return <>
{vias.map(v=><via key={v.name} name={v.name} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer} toLayer={v.toLayer} holeDiameter={.15} outerDiameter={.30} connectsTo={v.selector}/>)}
{routes.map(r=><trace key={r.name} name={r.name} from={r.fromSelector} to={r.toSelector} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.fromSelector,...r.points.map(([x,y])=>({x,y})),r.toSelector]]}/>)}
</>}
