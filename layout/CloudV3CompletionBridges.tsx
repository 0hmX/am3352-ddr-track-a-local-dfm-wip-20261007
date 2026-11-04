// Two short .30 mm surface joins across actual V3V3 physical groups; no added vias.
const routes=[
  {
    "name": "V3V3_SHARED_PHYSICAL_BRIDGE_1",
    "net": "V3V3",
    "layer": "top",
    "width": 0.3,
    "from": ".Processor > .U1 > .G14",
    "to": ".Processor > .U1 > .F14",
    "points": [
      [
        -2,
        3.6
      ],
      [
        -2.8000000000000003,
        3.6
      ]
    ]
  },
  {
    "name": "V3V3_SHARED_PHYSICAL_BRIDGE_2",
    "net": "V3V3",
    "layer": "top",
    "width": 0.3,
    "from": ".Power_management > .U_PMIC > .15",
    "to": ".Power_management > .C_PWR10 > .pin1",
    "points": [
      [
        19.6,
        -4.9375
      ],
      [
        19.6,
        -6.325000000000003
      ],
      [
        20.45,
        -7.175000000000001
      ]
    ]
  }
] as const
export function CloudV3CompletionBridges(){return <>{routes.map(r=><trace key={r.name} name={r.name} from={r.from} to={r.to} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,...r.points.map(([x,y])=>({x,y})),r.to]]}/>)}</>}
