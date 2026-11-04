// Native world-frame supply routes with pad-centered filled/capped-via assumptions.
export const vias = [
  {
    "net": "CAP_VDD_SRAM_MPU",
    "selector": ".Processor > .U1 > .D11",
    "x": -4.4,
    "y": 1.2000000000000002,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_183",
    "toLayer": "inner5",
    "viaName": "PWR_V2_CAP_VDD_SRAM_MPU_0"
  },
  {
    "net": "CAP_VDD_SRAM_MPU",
    "selector": ".Processor > .C_CAP_VDD_SRAM_MPU > .pin1",
    "x": 0.2,
    "y": 6.25,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.62,
    "height": 0.62,
    "padId": "pcb_smtpad_436",
    "toLayer": "inner5",
    "viaName": "PWR_V2_CAP_VDD_SRAM_MPU_1"
  },
  {
    "net": "HDMI_PVCC_1V2",
    "selector": ".HDMI > .U_HDMI > .18",
    "x": 47.45008,
    "y": -29.99993,
    "layer": "top",
    "shape": "rect",
    "width": 0.700024,
    "height": 0.249936,
    "padId": "pcb_smtpad_1193",
    "toLayer": "inner5",
    "viaName": "PWR_V2_HDMI_PVCC_1V2_0"
  },
  {
    "net": "HDMI_PVCC_1V2",
    "selector": ".HDMI > .C_HDMI_REF_C180 > .pin1",
    "x": 49.5,
    "y": -32.01,
    "layer": "top",
    "shape": "rect",
    "width": 0.64,
    "height": 0.54,
    "padId": "pcb_smtpad_1265",
    "toLayer": "inner5",
    "viaName": "PWR_V2_HDMI_PVCC_1V2_2"
  },
  {
    "net": "HDMI_AVCC_1V2",
    "selector": ".HDMI > .U_HDMI > .23",
    "x": 47.45008,
    "y": -27.500062,
    "layer": "top",
    "shape": "rect",
    "width": 0.700024,
    "height": 0.249936,
    "padId": "pcb_smtpad_1198",
    "toLayer": "inner5",
    "viaName": "PWR_V2_HDMI_AVCC_1V2_0"
  },
  {
    "net": "HDMI_AVCC_1V2",
    "selector": ".HDMI > .C_HDMI_REF_C181 > .pin1",
    "x": 52.5,
    "y": -33.51,
    "layer": "top",
    "shape": "rect",
    "width": 0.64,
    "height": 0.54,
    "padId": "pcb_smtpad_1267",
    "toLayer": "inner5",
    "viaName": "PWR_V2_HDMI_AVCC_1V2_1"
  },
  {
    "net": "HDMI_DVDD_1V2",
    "selector": ".HDMI > .C_HDMI_REF_C184 > .pin1",
    "x": 49,
    "y": -24.01,
    "layer": "top",
    "shape": "rect",
    "width": 0.64,
    "height": 0.54,
    "padId": "pcb_smtpad_1273",
    "toLayer": "inner5",
    "viaName": "PWR_V2_HDMI_DVDD_1V2_1"
  },
  {
    "net": "HDMI_DVDD_1V2",
    "selector": ".HDMI > .FB_HDMI_FB9 > .1",
    "x": 44.0875,
    "y": -19.5,
    "layer": "top",
    "shape": "rect",
    "width": 1.025,
    "height": 1.4,
    "padId": "pcb_smtpad_1297",
    "toLayer": "inner5",
    "viaName": "PWR_V2_HDMI_DVDD_1V2_3"
  },
  {
    "net": "HDMI_OVDD_3V3",
    "selector": ".HDMI > .FB_HDMI_FB12 > .1",
    "x": 36.5,
    "y": -31.9125,
    "layer": "top",
    "shape": "rect",
    "width": 1.4,
    "height": 1.025,
    "padId": "pcb_smtpad_1291",
    "toLayer": "inner5",
    "viaName": "PWR_V3_ADD_0"
  },
  {
    "net": "HDMI_OVDD_3V3",
    "selector": ".HDMI > .C_HDMI_REF_C188 > .pin1",
    "x": 47.5,
    "y": -21.01,
    "layer": "top",
    "shape": "rect",
    "width": 0.64,
    "height": 0.54,
    "padId": "pcb_smtpad_1281",
    "toLayer": "inner5",
    "viaName": "PWR_V3_ADD_1"
  },
  {
    "net": "HDMI_IVDD_1V2",
    "selector": ".HDMI > .C_HDMI_REF_C147 > .pin1",
    "x": 42.49,
    "y": -32.5,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1247",
    "toLayer": "inner5",
    "viaName": "PWR_V3_ADD_2"
  },
  {
    "net": "HDMI_IVDD_1V2",
    "selector": ".HDMI > .C_HDMI_REF_C150 > .pin1",
    "x": 37,
    "y": -27.01,
    "layer": "top",
    "shape": "rect",
    "width": 0.64,
    "height": 0.54,
    "padId": "pcb_smtpad_1253",
    "toLayer": "inner5",
    "viaName": "PWR_V3_ADD_3"
  },
  {
    "net": "HDMI_IVDD_1V2",
    "selector": ".HDMI > .C_HDMI_REF_C149 > .pin1",
    "x": 45.49,
    "y": -21,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1251",
    "toLayer": "inner5",
    "viaName": "PWR_V3_ADD_4"
  }
] as const
export const routes = [
  {
    "name": "CLOUD_CAP_VDD_SRAM_MPU_V2_0",
    "net": "CAP_VDD_SRAM_MPU",
    "from": "PWR_V2_CAP_VDD_SRAM_MPU_0.inner5",
    "to": "PWR_V2_CAP_VDD_SRAM_MPU_1.inner5",
    "width": 0.2,
    "layer": "inner5",
    "points": [
      [
        -4.4,
        1.2000000000000002
      ],
      [
        -4.0,
        1.6000000000000014
      ],
      [
        -3.3999999999999986,
        1.6000000000000014
      ],
      [
        -2.25,
        2.75
      ],
      [
        -2.25,
        3.25
      ],
      [
        -2.3999999999999986,
        3.5
      ],
      [
        -2.3999999999999986,
        3.8999999999999986
      ],
      [
        -0.05000000000000071,
        6.25
      ],
      [
        0.2,
        6.25
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_OVDD_3V3_V2_0",
    "net": "HDMI_OVDD_3V3",
    "from": ".HDMI > .U_HDMI > .1",
    "to": ".HDMI > .C_HDMI_REF_C187 > .pin1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        39.249944,
        -31.20008
      ],
      [
        38.49,
        -32.5
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_OVDD_3V3_V2_1",
    "net": "HDMI_OVDD_3V3",
    "from": ".HDMI > .C_HDMI_REF_C187 > .pin1",
    "to": ".HDMI > .FB_HDMI_FB12 > .1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        38.49,
        -32.5
      ],
      [
        36.5,
        -31.9125
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_OVDD_3V3_V2_2",
    "net": "HDMI_OVDD_3V3",
    "from": ".HDMI > .U_HDMI > .1",
    "to": ".HDMI > .U_HDMI > .34",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        39.249944,
        -31.20008
      ],
      [
        39.249944,
        -25.150056
      ],
      [
        41.5,
        -22.9
      ],
      [
        46,
        -22.9
      ],
      [
        46.24993,
        -22.65007
      ],
      [
        46.24993,
        -22.29992
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_IVDD_1V2_V2_0",
    "net": "HDMI_IVDD_1V2",
    "from": ".HDMI > .U_HDMI > .35",
    "to": ".HDMI > .C_HDMI_REF_C149 > .pin1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        45.750058,
        -22.29992
      ],
      [
        45.49,
        -21
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_IVDD_1V2_V2_1",
    "net": "HDMI_IVDD_1V2",
    "from": ".HDMI > .U_HDMI > .8",
    "to": ".HDMI > .C_HDMI_REF_C147 > .pin1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        42.750064,
        -31.20008
      ],
      [
        42.49,
        -32.5
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_IVDD_1V2_V2_2",
    "net": "HDMI_IVDD_1V2",
    "from": ".HDMI > .U_HDMI > .56",
    "to": ".HDMI > .C_HDMI_REF_C150 > .pin1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        38.54992,
        -26.500064
      ],
      [
        37,
        -27.01
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_IVDD_1V2_V2_3",
    "net": "HDMI_IVDD_1V2",
    "from": ".HDMI > .C_HDMI_REF_C149 > .pin1",
    "to": ".HDMI > .C_HDMI_REF_C151 > .pin1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        45.49,
        -21
      ],
      [
        44.9,
        -21.5
      ],
      [
        44.00000000000001,
        -21.5
      ],
      [
        43.49,
        -21
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_IVDD_1V2_V2_4",
    "net": "HDMI_IVDD_1V2",
    "from": ".HDMI > .C_HDMI_REF_C147 > .pin1",
    "to": ".HDMI > .FB_HDMI_FB13 > .1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        42.49,
        -32.5
      ],
      [
        41.0875,
        -34
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_PVCC_1V2_V2_0",
    "net": "HDMI_PVCC_1V2",
    "from": ".HDMI > .C_HDMI_REF_C180 > .pin1",
    "to": ".HDMI > .FB_HDMI_FB11 > .1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        49.5,
        -32.01
      ],
      [
        51,
        -33.9125
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_PVCC_1V2_V2_1",
    "net": "HDMI_PVCC_1V2",
    "from": ".HDMI > .C_HDMI_REF_C144 > .pin1",
    "to": ".HDMI > .C_HDMI_REF_C180 > .pin1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        46.99,
        -35.5
      ],
      [
        47.199999999999996,
        -35.300000000000004
      ],
      [
        47.699999999999996,
        -34.800000000000004
      ],
      [
        47.699999999999996,
        -33.25
      ],
      [
        47.849999999999994,
        -33.1
      ],
      [
        48.9,
        -33.1
      ],
      [
        49.50000000000001,
        -32.5
      ],
      [
        49.5,
        -32.01
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_PVCC_1V2_V2_2",
    "net": "HDMI_PVCC_1V2",
    "from": "PWR_V2_HDMI_PVCC_1V2_0.inner5",
    "to": "PWR_V2_HDMI_PVCC_1V2_2.inner5",
    "width": 0.2,
    "layer": "inner5",
    "points": [
      [
        47.45008,
        -29.99993
      ],
      [
        49.5,
        -32.01
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_AVCC_1V2_V2_0",
    "net": "HDMI_AVCC_1V2",
    "from": ".HDMI > .U_HDMI > .23",
    "to": ".HDMI > .C_HDMI_REF_C182 > .pin1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        47.45008,
        -27.500062
      ],
      [
        49,
        -28.01
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_AVCC_1V2_V2_1",
    "net": "HDMI_AVCC_1V2",
    "from": ".HDMI > .C_HDMI_REF_C182 > .pin1",
    "to": ".HDMI > .C_HDMI_REF_C183 > .pin1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        49,
        -28.01
      ],
      [
        48.50000000000001,
        -27.4
      ],
      [
        48.50000000000001,
        -26.5
      ],
      [
        49,
        -26.01
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_AVCC_1V2_V2_2",
    "net": "HDMI_AVCC_1V2",
    "from": ".HDMI > .C_HDMI_REF_C181 > .pin1",
    "to": ".HDMI > .FB_HDMI_FB10 > .1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        52.5,
        -33.51
      ],
      [
        52.300000000000004,
        -33.7
      ],
      [
        51.9,
        -34.1
      ],
      [
        51.9,
        -34.6
      ],
      [
        51.00000000000001,
        -35.5
      ],
      [
        49.00000000000001,
        -35.5
      ],
      [
        48.50000000000001,
        -36.0
      ],
      [
        46.650000000000006,
        -36.0
      ],
      [
        46.50000000000001,
        -35.85
      ],
      [
        46.50000000000001,
        -34.1
      ],
      [
        46.5875,
        -34
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_AVCC_1V2_V2_3",
    "net": "HDMI_AVCC_1V2",
    "from": "PWR_V2_HDMI_AVCC_1V2_0.inner5",
    "to": "PWR_V2_HDMI_AVCC_1V2_1.inner5",
    "width": 0.2,
    "layer": "inner5",
    "points": [
      [
        47.45008,
        -27.500062
      ],
      [
        52.5,
        -32.549982
      ],
      [
        52.5,
        -33.51
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_DVDD_1V2_V2_0",
    "net": "HDMI_DVDD_1V2",
    "from": ".HDMI > .U_HDMI > .28",
    "to": ".HDMI > .C_HDMI_REF_C184 > .pin1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        47.45008,
        -24.99994
      ],
      [
        48.01006,
        -24.99994
      ],
      [
        49,
        -24.01
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_DVDD_1V2_V2_1",
    "net": "HDMI_DVDD_1V2",
    "from": ".HDMI > .C_HDMI_REF_C185 > .pin1",
    "to": ".HDMI > .FB_HDMI_FB9 > .1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        42.5,
        -21.01
      ],
      [
        44.0875,
        -19.5
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_DVDD_1V2_V2_2",
    "net": "HDMI_DVDD_1V2",
    "from": "PWR_V2_HDMI_DVDD_1V2_1.inner5",
    "to": "PWR_V2_HDMI_DVDD_1V2_3.inner5",
    "width": 0.2,
    "layer": "inner5",
    "points": [
      [
        49,
        -24.01
      ],
      [
        47.9,
        -22.91
      ],
      [
        47.9,
        -20.7
      ],
      [
        47.1,
        -19.9
      ],
      [
        44.4875,
        -19.9
      ],
      [
        44.0875,
        -19.5
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_OVDD_3V3_V3_0",
    "net": "HDMI_OVDD_3V3",
    "from": "PWR_V3_ADD_0.inner5",
    "to": "PWR_V3_ADD_1.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        36.5,
        -31.9125
      ],
      [
        47.5,
        -21.01
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_IVDD_1V2_V3_1",
    "net": "HDMI_IVDD_1V2",
    "from": "PWR_V3_ADD_2.inner5",
    "to": "PWR_V3_ADD_3.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        42.49,
        -32.5
      ],
      [
        41.99,
        -33
      ],
      [
        36.4,
        -33
      ],
      [
        36,
        -32.6
      ],
      [
        36,
        -28.01
      ],
      [
        37,
        -27.01
      ]
    ]
  },
  {
    "name": "CLOUD_HDMI_IVDD_1V2_V3_2",
    "net": "HDMI_IVDD_1V2",
    "from": "PWR_V3_ADD_3.inner5",
    "to": "PWR_V3_ADD_4.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        37,
        -27.01
      ],
      [
        43.010000000000005,
        -21.0
      ],
      [
        45.49,
        -21
      ]
    ]
  }
] as const
export function CloudSupplyRoutes(){return <>
 {vias.map(v=><via key={v.viaName} name={v.viaName} pcbX={v.x} pcbY={v.y} fromLayer={v.layer} toLayer={v.toLayer} holeDiameter={0.15} outerDiameter={0.3} connectsTo={v.selector}/>)}
 {routes.map(r=><trace key={r.name} name={r.name} from={r.from} to={r.to} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,...r.points.map(([x,y])=>({x,y})),r.to]]}/>)}
</>}
