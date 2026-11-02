// Staged compact HDMI 3.3 V rail; all emitted widths and clearances require native proof.
const vias=[
  {
    "net": "HDMI_3V3",
    "selector": ".HDMI > .C_HDMI_REF_C177 > .pin1",
    "x": 44.5,
    "y": -33.51,
    "layer": "top",
    "shape": "rect",
    "width": 0.64,
    "height": 0.54,
    "padId": "pcb_smtpad_1259",
    "fromLayer": "top",
    "toLayer": "inner5",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "viaName": "HDMI3V3_FEED_3"
  },
  {
    "net": "HDMI_3V3",
    "selector": ".HDMI > .C_HDMI_REF_C178 > .pin1",
    "x": 43.9,
    "y": -31.01,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.64,
    "height": 0.54,
    "padId": "pcb_smtpad_1261",
    "fromLayer": "bottom",
    "toLayer": "inner5",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3,
    "viaName": "HDMI3V3_FEED_4"
  }
] as const
const routes=[
  {
    "name": "HDMI3V3_BRANCH_0",
    "net": "HDMI_3V3",
    "from": ".HDMI > .FB_HDMI_FB5 > .1",
    "to": ".HDMI > .C_HDMI_REF_C177 > .pin1",
    "width": 0.4,
    "layer": "top",
    "points": [
      [
        42.0875,
        -36
      ],
      [
        42.300000000000004,
        -36.2
      ],
      [
        43.199999999999996,
        -37.1
      ],
      [
        44.6,
        -37.1
      ],
      [
        44.800000000000004,
        -36.9
      ],
      [
        44.800000000000004,
        -33.8
      ],
      [
        44.51,
        -33.51
      ],
      [
        44.5,
        -33.51
      ]
    ],
    "length": 6.767572289946833
  },
  {
    "name": "HDMI3V3_BRANCH_1",
    "net": "HDMI_3V3",
    "from": "HDMI3V3_FEED_3.inner5",
    "to": "HDMI3V3_FEED_4.inner5",
    "width": 0.4,
    "layer": "inner5",
    "points": [
      [
        44.5,
        -33.51
      ],
      [
        44.5,
        -31.610000000000003
      ],
      [
        43.9,
        -31.01
      ]
    ],
    "length": 2.748528137423854
  },
  {
    "name": "HDMI3V3_BRANCH_2",
    "net": "HDMI_3V3",
    "from": ".HDMI > .C_HDMI_REF_C177 > .pin1",
    "to": ".HDMI > .U_HDMI > .9",
    "width": 0.2,
    "layer": "top",
    "points": [
      [
        44.5,
        -33.51
      ],
      [
        44.699999999999996,
        -33.3
      ],
      [
        45.1,
        -32.9
      ],
      [
        45.1,
        -30.75
      ],
      [
        44.95,
        -30.6
      ],
      [
        43.53333333333333,
        -30.6
      ],
      [
        43.4,
        -30.733333333333334
      ],
      [
        43.4,
        -31.0
      ],
      [
        43.249936,
        -31.20008
      ]
    ],
    "length": 5.33981500097542
  },
  {
    "name": "HDMI3V3_BRANCH_3",
    "net": "HDMI_3V3",
    "from": ".HDMI > .C_HDMI_REF_C177 > .pin1",
    "to": ".HDMI > .U_HDMI > .13",
    "width": 0.2,
    "layer": "top",
    "points": [
      [
        44.5,
        -33.51
      ],
      [
        45.249932,
        -32.760068
      ],
      [
        45.249932,
        -31.20008
      ]
    ],
    "length": 2.6205520052575784
  },
  {
    "name": "HDMI3V3_BRANCH_4",
    "net": "HDMI_3V3",
    "from": ".HDMI > .C_HDMI_REF_C179 > .pin1",
    "to": ".HDMI > .U_HDMI > .19",
    "width": 0.2,
    "layer": "top",
    "points": [
      [
        49,
        -30.01
      ],
      [
        48.490058,
        -29.500058
      ],
      [
        47.45008,
        -29.500058
      ]
    ],
    "length": 1.761144892423662
  },
  {
    "name": "HDMI3V3_BRANCH_5",
    "net": "HDMI_3V3",
    "from": ".HDMI > .C_HDMI_REF_C177 > .pin1",
    "to": ".HDMI > .C_HDMI_REF_C179 > .pin1",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        44.5,
        -33.51
      ],
      [
        44.699999999999996,
        -33.3
      ],
      [
        45.300000000000004,
        -32.7
      ],
      [
        45.300000000000004,
        -30.700000000000003
      ],
      [
        46.50000000000001,
        -29.5
      ],
      [
        48.50000000000001,
        -29.5
      ],
      [
        48.99,
        -30.01
      ],
      [
        49,
        -30.01
      ]
    ],
    "length": 7.552832600675047
  }
] as const
export function CloudHdmi3V3SupplyRoutes(){return <>
 {vias.map(v=><via key={v.viaName} name={v.viaName} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer} toLayer={v.toLayer} holeDiameter={.15} outerDiameter={.30} connectsTo={v.selector}/>)}
 {routes.map(r=><trace key={r.name} name={r.name} from={r.from} to={r.to} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,...r.points.map(([x,y])=>({x,y,layer:r.layer})),r.to]]}/>)}
 </>}
