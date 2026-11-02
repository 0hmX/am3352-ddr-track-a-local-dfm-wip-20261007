// Staged SYS14 endpoint-only Inner5 candidate. No signal midpoint vias.
const routes=[
  {
    "points": [
      [
        6.8,
        -4.4
      ],
      [
        5.825,
        -4.4
      ],
      [
        4.575,
        -3.15
      ],
      [
        3.475,
        -3.15
      ],
      [
        3.25,
        -2.925
      ],
      [
        3.25,
        -2.775
      ],
      [
        2.95,
        -2.475
      ],
      [
        2.65,
        -2.475
      ],
      [
        2.425,
        -2.7
      ],
      [
        2.425,
        -2.825
      ],
      [
        2.05,
        -3.2
      ],
      [
        2.05,
        -5.425
      ],
      [
        4.575,
        -7.95
      ],
      [
        4.575,
        -11.55
      ],
      [
        5.5,
        -12.475
      ]
    ],
    "layer": "inner5",
    "width": 0.1,
    "lengthMm": 16.712794000823276,
    "referenceLayer": "inner6",
    "nonterminalUncoveredMm2": 0.0,
    "referenceMarginMm": 0.025000000000000355,
    "name": "SYS14_CPU_ARRAY_INNER5",
    "net": "SYSBOOT14",
    "fromSelector": "SYS14_CPU_VIP.inner5",
    "toSelector": "SYS14_ARRAY_VIP.inner5",
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "points": [
      [
        -0.49,
        -8.0
      ],
      [
        -0.49,
        -6.29
      ],
      [
        0.225,
        -5.575
      ],
      [
        1.375,
        -5.575
      ],
      [
        4.45,
        -8.65
      ],
      [
        4.45,
        -11.825
      ],
      [
        5.1,
        -12.475
      ],
      [
        5.5,
        -12.475
      ]
    ],
    "layer": "bottom",
    "width": 0.1,
    "lengthMm": 12.714108216936541,
    "referenceLayer": "inner6",
    "nonterminalUncoveredMm2": 0.0,
    "referenceMarginMm": 0.024264596800898573,
    "name": "SYS14_ARRAY_STRAP_BOTTOM",
    "net": "SYSBOOT14",
    "fromSelector": ".Boot_and_clock > .R_BOOT14 > .pin1",
    "toSelector": ".HDMI > .RN_HDMI_3 > .1",
    "fromLayer": "bottom",
    "toLayer": "bottom",
    "physical": [],
    "referenceUncoveredMm2": 0.0
  }
] as const
const vias=[
  {
    "name": "SYS14_CPU_VIP",
    "net": "SYSBOOT14",
    "x": 6.8,
    "y": -4.4,
    "fromLayer": "top",
    "toLayer": "inner5",
    "connectsTo": ".Processor > .U1 > .V4"
  },
  {
    "name": "SYS14_ARRAY_VIP",
    "net": "SYSBOOT14",
    "x": 5.5,
    "y": -12.475,
    "fromLayer": "bottom",
    "toLayer": "inner5",
    "connectsTo": ".HDMI > .RN_HDMI_3 > .1"
  }
] as const
export function CloudSysboot14PadCenteredRoutes(){return <>
 {vias.map(v=><via key={v.name} name={v.name} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer} toLayer={v.toLayer} holeDiameter={.15} outerDiameter={.30} connectsTo={v.connectsTo}/>)}
 {routes.map(r=><trace key={r.name} name={r.name} from={r.fromSelector} to={r.toSelector} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.fromSelector,...r.points.map(([x,y])=>({x,y,layer:r.layer})),r.toSelector]]}/>)}
 </>}
