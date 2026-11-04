// Endpoint-only SYSBOOT15 proposal; requires coordinated SYS6 array-layer reassignment.
const vias=[
  {
    "name": "SYS15_TERMINAL_0",
    "net": "SYSBOOT15",
    "selector": ".Processor > .U1 > .T5",
    "x": 5.2,
    "y": -3.6,
    "fromLayer": "top",
    "toLayer": "inner4",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "name": "SYS15_TERMINAL_1",
    "net": "SYSBOOT15",
    "selector": ".HDMI > .RN_HDMI_2 > .1",
    "x": 5.0,
    "y": -10.225,
    "fromLayer": "bottom",
    "toLayer": "inner4",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  }
] as const
const routes=[
  {
    "name": "CLOUD_POWER_SYSBOOT15_CPU_ARRAY",
    "net": "SYSBOOT15",
    "from": "SYS15_TERMINAL_0.inner4",
    "to": "SYS15_TERMINAL_1.inner4",
    "fromLayer": "top",
    "toLayer": "bottom",
    "layer": "inner4",
    "width": 0.1,
    "points": [
      [
        5.2,
        -3.6
      ],
      [
        5.6,
        -4
      ],
      [
        5.6,
        -9.625
      ],
      [
        5,
        -10.225
      ]
    ],
    "lengthMm": 7.039213562373093,
    "coordination": "SYS6 array branch held off this inner4 corridor; centered trunk clears actual nonterminal reference antipads.",
    "sourceFrom": ".Processor > .U1 > .T5",
    "sourceTo": ".HDMI > .RN_HDMI_2 > .1"
  },
  {
    "name": "CLOUD_POWER_SYSBOOT15_12_BOTTOM",
    "net": "SYSBOOT15",
    "from": ".Boot_and_clock > .R_BOOT15 > .pin1",
    "to": ".HDMI > .RN_HDMI_2 > .1",
    "fromLayer": "bottom",
    "toLayer": "bottom",
    "layer": "bottom",
    "width": 0.1,
    "points": [
      [
        9.14,
        -1.9
      ],
      [
        9.615,
        -1.425
      ],
      [
        10.525,
        -1.425
      ],
      [
        11.325,
        -2.225
      ],
      [
        11.325,
        -6.45
      ],
      [
        11.2,
        -6.575
      ],
      [
        11.2,
        -7.3
      ],
      [
        9.5,
        -9.0
      ],
      [
        8.425,
        -9.0
      ],
      [
        6.75,
        -10.675
      ],
      [
        5.3,
        -10.675
      ],
      [
        5.0,
        -10.375
      ],
      [
        5.0,
        -10.225
      ]
    ],
    "lengthMm": 15.712133829043456,
    "screenContext": "Actual combined V13 including approved R1 placement; Bottom branch only",
    "referenceMarginMm": 0.009999736107399388,
    "uncoveredNonterminalMm2": 0.0
  }
] as const
const returns=[
  {
    "name": "SYS15_RETURN_CPU",
    "net": "GND",
    "x": 5.6,
    "y": -3.6,
    "fromLayer": "inner1",
    "toLayer": "inner3",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "distanceMm": 0.39999999999999947
  },
  {
    "name": "SYS15_RETURN_ARRAY",
    "net": "GND",
    "x": 5.38890873,
    "y": -10.61390873,
    "fromLayer": "inner3",
    "toLayer": "inner6",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "distanceMm": 0.5500000004912965
  }
] as const
export function CloudSysboot15EndpointRoutes(){return <>
 {vias.map(v=><via key={v.name} name={v.name} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer} toLayer={v.toLayer} holeDiameter={.15} outerDiameter={.30} connectsTo={v.selector}/>)}
 {routes.map(r=><trace key={r.name} name={r.name} from={r.from} to={r.to} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,...r.points.map(([x,y])=>({x,y,layer:r.layer})),r.to]]}/>)}
 {returns.map(v=><via key={v.name} name={v.name} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer} toLayer={v.toLayer} holeDiameter={.15} outerDiameter={.30} connectsTo="net.GND"/>)}
 </>}
