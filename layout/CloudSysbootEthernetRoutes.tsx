// Conditional native candidate: SYS3 Top and DDR CKE replacements require joint proof.
export const vias=[
  {
    "net": "SYSBOOT13",
    "selector": ".Processor > .U1 > .V3",
    "x": 6.800000000000001,
    "y": -5.2,
    "fromLayer": "top",
    "toLayer": "inner4",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "name": "SYS13_CPU_VIP"
  },
  {
    "net": "SYSBOOT13",
    "selector": ".Boot_and_clock > .R_BOOT13 > .pin1",
    "x": 8.09,
    "y": -15,
    "fromLayer": "top",
    "toLayer": "inner4",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "name": "SYS13_STRAP_VIP"
  },
  {
    "net": "SYSBOOT13",
    "selector": ".HDMI > .RN_HDMI_4 > .1",
    "x": 10.85,
    "y": -6.05,
    "fromLayer": "bottom",
    "toLayer": "top",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "name": "SYS13_RN4_VIP"
  }
] as const
export const routes=[
  {
    "name": "CLOUD_SYSBOOT_ETH_13_CPU_RN4_TOP",
    "net": "SYSBOOT13",
    "from": ".Processor > .U1 > .V3",
    "to": ".HDMI > .RN_HDMI_4 > .1",
    "fromLayer": "top",
    "toLayer": "bottom",
    "layer": "top",
    "width": 0.1,
    "points": [
      [
        6.8,
        -5.2
      ],
      [
        7.6499999999999995,
        -6.05
      ],
      [
        10.85,
        -6.05
      ]
    ],
    "lengthMm": 4.40208152801713,
    "conditionalOn": [
      "SYSBOOT3 legacy top branch replacement"
    ],
    "fromSelector": "SYS13_CPU_VIP.top",
    "toSelector": "SYS13_RN4_VIP.top"
  },
  {
    "name": "CLOUD_SYSBOOT_ETH_13_CPU_STRAP",
    "net": "SYSBOOT13",
    "from": ".Processor > .U1 > .V3",
    "to": ".Boot_and_clock > .R_BOOT13 > .pin1",
    "fromLayer": "top",
    "toLayer": "top",
    "layer": "inner4",
    "width": 0.1,
    "points": [
      [
        6.8,
        -5.2
      ],
      [
        7.325,
        -5.725
      ],
      [
        7.325,
        -11.525
      ],
      [
        8.09,
        -12.29
      ],
      [
        8.09,
        -15
      ]
    ],
    "lengthMm": 10.334335495461293,
    "conditionalOn": [
      "DDR_CKE coordinated reroute"
    ],
    "fromSelector": "SYS13_CPU_VIP.inner4",
    "toSelector": "SYS13_STRAP_VIP.inner4"
  }
] as const
export const groundReturn={
  "name": "SYSBOOT13_RN4_RETURN",
  "net": "GND",
  "x": 11.25,
  "y": -6.05,
  "fromLayer": "inner1",
  "toLayer": "inner6",
  "holeDiameter": 0.15,
  "outerDiameter": 0.3
} as const
export function CloudSysbootEthernetRoutes(){return <>
{vias.map(v=><via key={v.name} name={v.name} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer} toLayer={v.toLayer} holeDiameter={.15} outerDiameter={.30} connectsTo={v.selector}/>)}
<via name={groundReturn.name} pcbX={groundReturn.x} pcbY={groundReturn.y} fromLayer={groundReturn.fromLayer} toLayer={groundReturn.toLayer} holeDiameter={.15} outerDiameter={.30} connectsTo="net.GND"/>
{routes.map(r=><trace key={r.name} name={r.name} from={r.fromSelector} to={r.toSelector} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.fromSelector,...r.points.map(([x,y])=>({x,y})),r.toSelector]]}/>)}
</>}
