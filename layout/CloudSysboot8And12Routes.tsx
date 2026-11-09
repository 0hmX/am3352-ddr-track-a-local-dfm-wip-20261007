// Bank-edge relief original-map SYS8/SYS12 candidate against accepted d12e8ab.
// No SYS14 route or SYS14 reference scope. R8 moves only through MoveR8Only.tsx.
const routes=[
  {
    "name": "CLOUD_SYSBOOT_REV3_SYSBOOT8",
    "net": "SYSBOOT8",
    "points": [
      [
        6,
        -6.8
      ],
      [
        5.55,
        -7.25
      ],
      [
        5.55,
        -12.1
      ],
      [
        6.05,
        -12.6
      ],
      [
        6.05,
        -14.025
      ],
      [
        6.75,
        -14.725
      ]
    ],
    "layer": "inner2",
    "width": 0.1,
    "lengthMm": 8.608452377915608,
    "fromLayer": "top",
    "toLayer": "bottom",
    "reference": "inner1",
    "referenceMarginMm": 0.05,
    "nonterminalUncoveredMm2": 0.0,
    "physicalFindings": [],
    "fromSelector": "SYS8_CPU_VIP.inner2",
    "toSelector": "SYS8_ARRAY_VIP.inner2",
    "scope": "Planning: accepted226 plus future D11/D12/D15 and SYS6 ordinary openings; native proof pending."
  },
  {
    "name": "CLOUD_SYSBOOT_REV3_SYSBOOT12",
    "net": "SYSBOOT12",
    "points": [
      [
        6.8,
        -6.0
      ],
      [
        6.925,
        -6.125
      ],
      [
        6.925,
        -11.475
      ],
      [
        6.35,
        -12.05
      ],
      [
        5.325,
        -12.05
      ],
      [
        5.075,
        -12.3
      ],
      [
        5.075,
        -14.55
      ],
      [
        5.25,
        -14.725
      ]
    ],
    "layer": "inner4",
    "width": 0.1,
    "lengthMm": 10.215990257669732,
    "fromLayer": "top",
    "toLayer": "bottom",
    "reference": "inner3",
    "referenceMarginMm": 0.024264068711928113,
    "nonterminalUncoveredMm2": 0.0,
    "physicalFindings": [],
    "fromSelector": "SYS12_CPU_VIP.inner4",
    "toSelector": "SYS12_ARRAY_VIP.inner4"
  },
  {
    "name": "CLOUD_SYSBOOT_REV3_SYSBOOT12_STRAP",
    "net": "SYSBOOT12",
    "from": ".Processor > .U1 > .V2",
    "to": ".Boot_and_clock > .R_BOOT12 > .pin1",
    "fromLayer": "top",
    "toLayer": "top",
    "points": [
      [
        6.800000000000001,
        -6
      ],
      [
        8.41,
        -7.609999999999999
      ],
      [
        8.5,
        -7.609999999999999
      ]
    ],
    "layer": "top",
    "cost": 2.366883835420682,
    "vias": 0,
    "width": 0.1,
    "lengthMm": 2.366883835420682,
    "fromSelector": ".Processor > .U1 > .V2",
    "toSelector": ".Boot_and_clock > .R_BOOT12 > .pin1"
  },
  {
    "name": "CLOUD_SYSBOOT_REV3_SYSBOOT8_STRAP",
    "net": "SYSBOOT8",
    "layer": "bottom",
    "width": 0.1,
    "points": [
      [
        6.75,
        -14.725
      ],
      [
        7.835,
        -14.725
      ],
      [
        7.9,
        -14.79
      ]
    ],
    "fromLayer": "bottom",
    "toLayer": "bottom",
    "fromSelector": ".HDMI > .RN_HDMI_5 > .4",
    "toSelector": ".Boot_and_clock > .R_BOOT8 > .pin1",
    "lengthMm": 1.176923881554251
  }
] as const
const vias=[
  {
    "name": "SYS8_CPU_VIP",
    "net": "SYSBOOT8",
    "selector": ".Processor > .U1 > .U1",
    "x": 6,
    "y": -6.8,
    "fromLayer": "top",
    "toLayer": "inner2",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "name": "SYS8_ARRAY_VIP",
    "net": "SYSBOOT8",
    "selector": ".HDMI > .RN_HDMI_5 > .4",
    "x": 6.75,
    "y": -14.725,
    "fromLayer": "bottom",
    "toLayer": "inner2",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "name": "SYS12_CPU_VIP",
    "net": "SYSBOOT12",
    "selector": ".Processor > .U1 > .V2",
    "x": 6.8,
    "y": -6,
    "fromLayer": "top",
    "toLayer": "inner4",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "name": "SYS12_ARRAY_VIP",
    "net": "SYSBOOT12",
    "selector": ".HDMI > .RN_HDMI_5 > .1",
    "x": 5.25,
    "y": -14.725,
    "fromLayer": "bottom",
    "toLayer": "inner4",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  }
] as const
const returns=[
  {
    "name": "SYS8_12_ARRAY_RETURN",
    "net": "GND",
    "x": 6.016667,
    "y": -15.075,
    "fromLayer": "inner1",
    "toLayer": "inner6",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },

] as const
export function CloudSysboot8And12Routes(){return <>
 {vias.map(v=><via key={v.name} name={v.name} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer} toLayer={v.toLayer} holeDiameter={.15} outerDiameter={.30} connectsTo={v.selector}/>)}
 {routes.map(r=><trace key={r.name} name={r.name} from={r.fromSelector} to={r.toSelector} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.fromSelector,...r.points.map(([x,y])=>({x,y,layer:r.layer})),r.toSelector]]}/>)}
 {returns.map(v=><via key={v.name} name={v.name} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer} toLayer={v.toLayer} holeDiameter={.15} outerDiameter={.30} connectsTo="net.GND"/>)}
 </>}
