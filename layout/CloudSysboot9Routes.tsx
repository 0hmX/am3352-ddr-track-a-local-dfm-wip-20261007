// Endpoint-only SYSBOOT9 candidate: whole resistor on Bottom; BGA via centered.
export const routes=[
  {
    "layer": "bottom",
    "points": [
      [
        6.0,
        -6.0
      ],
      [
        5.65,
        -6.35
      ],
      [
        5.075,
        -6.35
      ],
      [
        4.075,
        -5.35
      ],
      [
        4.075,
        -3.4499999999999997
      ],
      [
        4.8,
        -2.725
      ],
      [
        4.8,
        -1.875
      ],
      [
        4.9,
        -1.775
      ],
      [
        7.699999999999999,
        -1.775
      ],
      [
        8.375,
        -2.45
      ],
      [
        10.375,
        -2.45
      ],
      [
        10.89,
        -2.9650000000000007
      ],
      [
        10.89,
        -3.5
      ]
    ],
    "name": "CLOUD_SYSBOOT_ETH_9_CPU_STRAP",
    "net": "SYSBOOT9",
    "width": 0.1,
    "lengthMm": 13.418828637385463,
    "fromSelector": "SYS9_CPU_VIP.bottom",
    "toSelector": ".Boot_and_clock > .R_BOOT9 > .pin1"
  },
  {
    "layer": "bottom",
    "points": [
      [
        10.89,
        -3.5
      ],
      [
        10.85,
        -3.540000000000001
      ],
      [
        10.85,
        -4.55
      ]
    ],
    "name": "CLOUD_SYSBOOT_ETH_9_STRAP_RN4",
    "net": "SYSBOOT9",
    "width": 0.1,
    "lengthMm": 1.066568542494924,
    "fromSelector": ".Boot_and_clock > .R_BOOT9 > .pin1",
    "toSelector": ".HDMI > .RN_HDMI_4 > .4"
  }
] as const
export function CloudSysboot9Routes(){return <>
<via name="SYS9_CPU_VIP" pcbX={6} pcbY={-6} fromLayer="top" toLayer="bottom" holeDiameter={.15} outerDiameter={.30} connectsTo=".Processor > .U1 > .U2"/>
{routes.map(r=><trace key={r.name} name={r.name} from={r.fromSelector} to={r.toSelector} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.fromSelector,...r.points.map(([x,y])=>({x,y})),r.toSelector]]}/>)}
</>}
