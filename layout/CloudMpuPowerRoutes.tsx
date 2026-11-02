// Coordinated full226 MPU repair; reuse existing ground at(10.175,3.25008) for main transition.
export const vias=[
  {
    "viaName": "MPU_SOURCE",
    "x": 21.3,
    "y": 8.835,
    "layer": "top",
    "toLayer": "inner2",
    "net": "VDD_MPU",
    "selector": ".Power_management > .L_PWR2 > .pin2",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU_CPU",
    "x": -2.8,
    "y": 0.4,
    "layer": "top",
    "toLayer": "inner2",
    "net": "VDD_MPU",
    "selector": ".Processor > .U1 > .F10",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU_A2",
    "x": -6.8,
    "y": -6,
    "layer": "top",
    "toLayer": "inner4",
    "net": "VDD_MPU",
    "selector": ".Processor > .U1 > .A2",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU_CAP0",
    "x": -0.99,
    "y": 2,
    "layer": "bottom",
    "toLayer": "inner2",
    "net": "VDD_MPU",
    "selector": ".Processor > .C_VDD_MPU_0 > .pin1",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU_CAP1",
    "x": 1.495,
    "y": 1.8,
    "layer": "bottom",
    "toLayer": "inner5",
    "net": "VDD_MPU",
    "selector": ".Processor > .C_VDD_MPU_1 > .pin1",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU_CAP4",
    "x": 6.51,
    "y": 4,
    "layer": "bottom",
    "toLayer": "inner5",
    "net": "VDD_MPU",
    "selector": ".Processor > .C_VDD_MPU_4 > .pin1",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU_BULK",
    "x": -5.4125,
    "y": -9.5,
    "layer": "top",
    "toLayer": "inner2",
    "net": "VDD_MPU",
    "selector": ".Processor > .C_VDD_MPU_B > .pin1",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU_FB",
    "x": 21.6,
    "y": 0.9375,
    "layer": "top",
    "toLayer": "inner4",
    "net": "VDD_MPU",
    "selector": ".Power_management > .U_PMIC > .41",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU_MAIN_V0",
    "x": 12.5,
    "y": 4.5,
    "layer": "inner2",
    "toLayer": "inner4",
    "net": "VDD_MPU",
    "selector": "net.VDD_MPU",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU_CPU_A2_V0",
    "x": -7.8,
    "y": -6.4,
    "layer": "inner2",
    "toLayer": "inner5",
    "net": "VDD_MPU",
    "selector": "net.VDD_MPU",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU_CPU_A2_V1",
    "x": -6.8,
    "y": -7.0,
    "layer": "inner5",
    "toLayer": "inner4",
    "net": "VDD_MPU",
    "selector": "net.VDD_MPU",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU_A2_BULK_V0",
    "x": -6.0,
    "y": -8.9,
    "layer": "inner4",
    "toLayer": "inner2",
    "net": "VDD_MPU",
    "selector": "net.VDD_MPU",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU_CAP0_CAP1_V0",
    "x": 1.3,
    "y": 1.6,
    "layer": "inner2",
    "toLayer": "inner5",
    "net": "VDD_MPU",
    "selector": "net.VDD_MPU",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU226_MAIN_V0",
    "x": 10.0,
    "y": 2.3,
    "layer": "inner4",
    "toLayer": "inner5",
    "net": "VDD_MPU",
    "selector": "net.VDD_MPU",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU226_MAIN_V1",
    "x": 7.9,
    "y": 0.7,
    "layer": "inner5",
    "toLayer": "inner4",
    "net": "VDD_MPU",
    "selector": "net.VDD_MPU",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU226_MAIN_V2",
    "x": 7.5,
    "y": 0.3,
    "layer": "inner4",
    "toLayer": "inner2",
    "net": "VDD_MPU",
    "selector": "net.VDD_MPU",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU226_FEEDBACK_V0",
    "x": 19.8,
    "y": 3.6,
    "layer": "inner4",
    "toLayer": "inner5",
    "net": "VDD_MPU",
    "selector": "net.VDD_MPU",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU226_FEEDBACK_V1",
    "x": 21.1,
    "y": 8.6,
    "layer": "inner5",
    "toLayer": "inner2",
    "net": "VDD_MPU",
    "selector": "net.VDD_MPU",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "viaName": "MPU226_CAP4_V0",
    "x": 9.9,
    "y": 4.5,
    "layer": "inner4",
    "toLayer": "inner5",
    "net": "VDD_MPU",
    "selector": "net.VDD_MPU",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  }
] as const
export const routes=[
  {
    "name": "CLOUD_VDD_MPU_V2_0",
    "net": "VDD_MPU",
    "from": ".Processor > .U1 > .F11",
    "to": ".Processor > .U1 > .F12",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        -2.8,
        1.2
      ],
      [
        -2.8,
        2
      ]
    ],
    "lengthMm": 0.8
  },
  {
    "name": "CLOUD_VDD_MPU_V2_1",
    "net": "VDD_MPU",
    "from": ".Processor > .U1 > .G13",
    "to": ".Processor > .U1 > .H13",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        -2,
        2.8
      ],
      [
        -1.2,
        2.8
      ]
    ],
    "lengthMm": 0.8
  },
  {
    "name": "CLOUD_VDD_MPU_V2_2",
    "net": "VDD_MPU",
    "from": ".Processor > .U1 > .F10",
    "to": ".Processor > .U1 > .F11",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        -2.8,
        0.4
      ],
      [
        -2.8,
        1.2
      ]
    ],
    "lengthMm": 0.7999999999999999
  },
  {
    "name": "CLOUD_VDD_MPU_V2_3",
    "net": "VDD_MPU",
    "from": ".Processor > .U1 > .H13",
    "to": ".Processor > .U1 > .J13",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        -1.2,
        2.8
      ],
      [
        -0.4,
        2.8
      ]
    ],
    "lengthMm": 0.7999999999999999
  },
  {
    "name": "CLOUD_VDD_MPU_V2_4",
    "net": "VDD_MPU",
    "from": ".Processor > .U1 > .F12",
    "to": ".Processor > .U1 > .F13",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        -2.8,
        2
      ],
      [
        -2.8,
        2.8
      ]
    ],
    "lengthMm": 0.7999999999999998
  },
  {
    "name": "CLOUD_VDD_MPU_V2_5",
    "net": "VDD_MPU",
    "from": ".Processor > .U1 > .F13",
    "to": ".Processor > .U1 > .G13",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        -2.8,
        2.8
      ],
      [
        -2,
        2.8
      ]
    ],
    "lengthMm": 0.7999999999999998
  },
  {
    "name": "CLOUD_VDD_MPU_V2_6",
    "net": "VDD_MPU",
    "from": ".Processor > .C_VDD_MPU_B > .pin1",
    "to": ".Debug_status > .TP_DBG_VDD_MPU > .VDD_MPU",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        -5.4125,
        -9.5
      ],
      [
        -5.4125,
        -11.5
      ]
    ],
    "lengthMm": 2.0
  },
  {
    "name": "CLOUD_VDD_MPU_V2_7",
    "net": "VDD_MPU",
    "from": ".Processor > .C_VDD_MPU_3 > .pin1",
    "to": ".Processor > .C_VDD_MPU_4 > .pin1",
    "width": 0.3,
    "layer": "bottom",
    "points": [
      [
        4.51,
        4
      ],
      [
        5.11,
        4.6
      ],
      [
        5.91,
        4.6
      ],
      [
        6.51,
        4
      ]
    ],
    "lengthMm": 2.4970562748477136
  },
  {
    "name": "CLOUD_VDD_MPU_V2_9",
    "net": "VDD_MPU",
    "from": ".Power_management > .L_PWR2 > .pin2",
    "to": ".Power_management > .C_PWR8 > .pin1",
    "width": 0.6,
    "layer": "top",
    "points": [
      [
        21.3,
        8.835
      ],
      [
        20.3,
        9.835
      ],
      [
        20.3,
        11.05
      ]
    ],
    "lengthMm": 2.629213562373095
  },
  {
    "name": "CLOUD_VDD_MPU_V2_11",
    "net": "VDD_MPU",
    "from": ".Processor > .C_VDD_MPU_1 > .pin1",
    "to": ".Processor > .C_VDD_MPU_2 > .pin1",
    "width": 0.3,
    "layer": "bottom",
    "points": [
      [
        1.495,
        1.8
      ],
      [
        2.15,
        1.8
      ],
      [
        2.55,
        1.4
      ],
      [
        3.4,
        1.4
      ],
      [
        4.0,
        2.0
      ],
      [
        4.01,
        2
      ]
    ],
    "lengthMm": 2.9292135623730946
  },
  {
    "name": "CLOUD_VDD_MPU_V2_12",
    "net": "VDD_MPU",
    "from": ".Power_management > .L_PWR2 > .pin2",
    "to": ".Power_management > .C_PWR8_B > .pin1",
    "width": 0.6,
    "layer": "top",
    "points": [
      [
        21.3,
        8.835
      ],
      [
        23.515,
        11.05
      ],
      [
        23.6,
        11.05
      ]
    ],
    "lengthMm": 3.2174830406564063
  },
  {
    "name": "MPU_MAIN_0",
    "net": "VDD_MPU",
    "from": "MPU_SOURCE.inner2",
    "to": "MPU_MAIN_V0.inner2",
    "layer": "inner2",
    "points": [
      [
        21.3,
        8.835
      ],
      [
        16.835,
        8.835
      ],
      [
        12.5,
        4.5
      ]
    ],
    "width": 0.5,
    "lengthMm": 10.595615792887369
  },
  {
    "name": "MPU_CPU_CAP0_0",
    "net": "VDD_MPU",
    "from": "MPU_CPU.inner2",
    "to": "MPU_CAP0.inner2",
    "layer": "inner2",
    "points": [
      [
        -2.8,
        0.4
      ],
      [
        -1.2,
        2.0
      ],
      [
        -0.99,
        2
      ]
    ],
    "width": 0.3,
    "lengthMm": 2.472741699796952
  },
  {
    "name": "MPU_CPU_A2_0",
    "net": "VDD_MPU",
    "from": "MPU_CPU.inner2",
    "to": "MPU_CPU_A2_V0.inner2",
    "layer": "inner2",
    "points": [
      [
        -2.8,
        0.4
      ],
      [
        -7.8,
        -4.6
      ],
      [
        -7.8,
        -6.4
      ]
    ],
    "width": 0.3,
    "lengthMm": 8.871067811865476
  },
  {
    "name": "MPU_CPU_A2_1",
    "net": "VDD_MPU",
    "from": "MPU_CPU_A2_V0.inner5",
    "to": "MPU_CPU_A2_V1.inner5",
    "layer": "inner5",
    "points": [
      [
        -7.8,
        -6.4
      ],
      [
        -7.2,
        -7.0
      ],
      [
        -6.8,
        -7.0
      ]
    ],
    "width": 0.3,
    "lengthMm": 1.248528137423857
  },
  {
    "name": "MPU_CPU_A2_2",
    "net": "VDD_MPU",
    "from": "MPU_CPU_A2_V1.inner4",
    "to": "MPU_A2.inner4",
    "layer": "inner4",
    "points": [
      [
        -6.8,
        -7.0
      ],
      [
        -6.8,
        -6.0
      ]
    ],
    "width": 0.3,
    "lengthMm": 1.0
  },
  {
    "name": "MPU_A2_BULK_0",
    "net": "VDD_MPU",
    "from": "MPU_A2.inner4",
    "to": "MPU_A2_BULK_V0.inner4",
    "layer": "inner4",
    "points": [
      [
        -6.8,
        -6
      ],
      [
        -6.8,
        -8.1
      ],
      [
        -6.0,
        -8.9
      ]
    ],
    "width": 0.3,
    "lengthMm": 3.231370849898476
  },
  {
    "name": "MPU_A2_BULK_1",
    "net": "VDD_MPU",
    "from": "MPU_A2_BULK_V0.inner2",
    "to": "MPU_BULK.inner2",
    "layer": "inner2",
    "points": [
      [
        -6.0,
        -8.9
      ],
      [
        -5.4,
        -9.5
      ],
      [
        -5.4125,
        -9.5
      ]
    ],
    "width": 0.3,
    "lengthMm": 0.8610281374238559
  },
  {
    "name": "MPU_CAP0_CAP1_0",
    "net": "VDD_MPU",
    "from": "MPU_CAP0.inner2",
    "to": "MPU_CAP0_CAP1_V0.inner2",
    "layer": "inner2",
    "points": [
      [
        -0.99,
        2
      ],
      [
        -0.4,
        2.0
      ],
      [
        0.1,
        1.5
      ],
      [
        1.2,
        1.5
      ],
      [
        1.3,
        1.6
      ]
    ],
    "width": 0.3,
    "lengthMm": 2.538528137423857
  },
  {
    "name": "MPU_CAP0_CAP1_1",
    "net": "VDD_MPU",
    "from": "MPU_CAP0_CAP1_V0.inner5",
    "to": "MPU_CAP1.inner5",
    "layer": "inner5",
    "points": [
      [
        1.3,
        1.6
      ],
      [
        1.495,
        1.795
      ],
      [
        1.495,
        1.8
      ]
    ],
    "width": 0.3,
    "lengthMm": 0.28077164466275356
  },
  {
    "name": "MPU226_MAIN_0",
    "net": "VDD_MPU",
    "from": "MPU_MAIN_V0.inner4",
    "to": "MPU226_MAIN_V0.inner4",
    "layer": "inner4",
    "points": [
      [
        12.5,
        4.5
      ],
      [
        10.3,
        2.3
      ],
      [
        10.0,
        2.3
      ]
    ],
    "width": 0.5,
    "lengthMm": 3.4112698372208095
  },
  {
    "name": "MPU226_MAIN_1",
    "net": "VDD_MPU",
    "from": "MPU226_MAIN_V0.inner5",
    "to": "MPU226_MAIN_V1.inner5",
    "layer": "inner5",
    "points": [
      [
        10.0,
        2.3
      ],
      [
        9.1,
        2.3
      ],
      [
        7.9,
        1.1
      ],
      [
        7.9,
        0.7
      ]
    ],
    "width": 0.5,
    "lengthMm": 2.997056274847714
  },
  {
    "name": "MPU226_MAIN_2",
    "net": "VDD_MPU",
    "from": "MPU226_MAIN_V1.inner4",
    "to": "MPU226_MAIN_V2.inner4",
    "layer": "inner4",
    "points": [
      [
        7.9,
        0.7
      ],
      [
        7.5,
        0.3
      ]
    ],
    "width": 0.5,
    "lengthMm": 0.5656854249492382
  },
  {
    "name": "MPU226_MAIN_3",
    "net": "VDD_MPU",
    "from": "MPU226_MAIN_V2.inner2",
    "to": "MPU_CPU.inner2",
    "layer": "inner2",
    "points": [
      [
        7.5,
        0.3
      ],
      [
        6.8,
        -0.4
      ],
      [
        4.5,
        -0.4
      ],
      [
        3.9,
        -1.0
      ],
      [
        2.5,
        -1.0
      ],
      [
        1.8,
        -0.3
      ],
      [
        1.8,
        -0.1
      ],
      [
        1.5,
        0.2
      ],
      [
        -0.3,
        0.2
      ],
      [
        -0.5,
        0.0
      ],
      [
        -2.3,
        0.0
      ],
      [
        -2.7,
        0.4
      ],
      [
        -2.8,
        0.4
      ]
    ],
    "width": 0.5,
    "lengthMm": 11.701219330881976
  },
  {
    "name": "MPU226_FEEDBACK_0",
    "net": "VDD_MPU",
    "from": "MPU_FB.inner4",
    "to": "MPU226_FEEDBACK_V0.inner4",
    "layer": "inner4",
    "points": [
      [
        21.6,
        0.9375
      ],
      [
        21.6,
        1.4
      ],
      [
        19.8,
        3.2
      ],
      [
        19.8,
        3.6
      ]
    ],
    "width": 0.2,
    "lengthMm": 3.4080844122715717
  },
  {
    "name": "MPU226_FEEDBACK_1",
    "net": "VDD_MPU",
    "from": "MPU226_FEEDBACK_V0.inner5",
    "to": "MPU226_FEEDBACK_V1.inner5",
    "layer": "inner5",
    "points": [
      [
        19.8,
        3.6
      ],
      [
        19.8,
        7.3
      ],
      [
        21.1,
        8.6
      ]
    ],
    "width": 0.2,
    "lengthMm": 5.538477631085024
  },
  {
    "name": "MPU226_FEEDBACK_2",
    "net": "VDD_MPU",
    "from": "MPU226_FEEDBACK_V1.inner2",
    "to": "MPU_SOURCE.inner2",
    "layer": "inner2",
    "points": [
      [
        21.1,
        8.6
      ],
      [
        21.3,
        8.8
      ],
      [
        21.3,
        8.835
      ]
    ],
    "width": 0.2,
    "lengthMm": 0.3178427124746194
  },
  {
    "name": "MPU226_CAP4_0",
    "net": "VDD_MPU",
    "from": "MPU_MAIN_V0.inner4",
    "to": "MPU226_CAP4_V0.inner4",
    "layer": "inner4",
    "points": [
      [
        12.5,
        4.5
      ],
      [
        9.9,
        4.5
      ]
    ],
    "width": 0.3,
    "lengthMm": 2.5999999999999996
  },
  {
    "name": "MPU226_CAP4_1",
    "net": "VDD_MPU",
    "from": "MPU226_CAP4_V0.inner5",
    "to": "MPU_CAP4.inner5",
    "layer": "inner5",
    "points": [
      [
        9.9,
        4.5
      ],
      [
        7.01,
        4.5
      ],
      [
        6.51,
        4
      ]
    ],
    "width": 0.3,
    "lengthMm": 3.597106781186548
  }
] as const
export const returns=[
  {
    "name": "MPU_GND_RETURN_0",
    "x": -7.8,
    "y": -7.1,
    "fromLayer": "inner1",
    "toLayer": "inner6",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "name": "MPU_GND_RETURN_1",
    "x": 1.7,
    "y": 1.3,
    "fromLayer": "inner1",
    "toLayer": "inner6",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "name": "MPU_GND_RETURN_2",
    "x": 12.1,
    "y": 5.0,
    "fromLayer": "inner1",
    "toLayer": "inner6",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "name": "MPU226_GND_RETURN_1",
    "x": 20.2,
    "y": 4.4,
    "fromLayer": "inner1",
    "toLayer": "inner6",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "name": "MPU226_GND_RETURN_2",
    "x": 20.2,
    "y": 8.3,
    "fromLayer": "inner1",
    "toLayer": "inner6",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "name": "MPU226_GND_RETURN_3",
    "x": 9.0,
    "y": 5.0,
    "fromLayer": "inner1",
    "toLayer": "inner6",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  }
] as const
export function CloudMpuPowerRoutes(){return <>
 {returns.map(v=><via key={v.name} name={v.name} pcbX={v.x} pcbY={v.y} fromLayer={v.fromLayer} toLayer={v.toLayer} holeDiameter={v.holeDiameter} outerDiameter={v.outerDiameter} connectsTo=".Processor > .U1 > .A1"/>)}
 {vias.map(v=><via key={v.viaName} name={v.viaName} pcbX={v.x} pcbY={v.y} fromLayer={v.layer} toLayer={v.toLayer} holeDiameter={v.holeDiameter} outerDiameter={v.outerDiameter} connectsTo={v.selector}/>)}
 {routes.map(r=><trace key={r.name} name={r.name} from={r.from} to={r.to} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,...r.points.map(([x,y])=>({x,y})),r.to]]}/>)}
</>}
