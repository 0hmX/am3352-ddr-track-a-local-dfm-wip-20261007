// V2: preserve pad centers; shorten the centered RESET5 via to inner4 and join on inner4.
export const vias=[
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_LDO > .5",
    "x": 40.6375,
    "y": 7.2,
    "layer": "top",
    "shape": "rect",
    "width": 1.325,
    "height": 0.6,
    "padId": "pcb_smtpad_951",
    "net": "ETH_3V3_PRE",
    "viaName": "ETHPWR_VIP_0",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_RAMP > .1",
    "x": 41.8625,
    "y": -7.55,
    "layer": "top",
    "shape": "rect",
    "width": 1.325,
    "height": 0.6,
    "padId": "pcb_smtpad_1077",
    "net": "ETH_3V3_PRE",
    "viaName": "ETHPWR_VIP_1",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_RAMP > .6",
    "x": 44.1375,
    "y": -7.55,
    "layer": "top",
    "shape": "rect",
    "width": 1.325,
    "height": 0.6,
    "padId": "pcb_smtpad_1082",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_2",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .20",
    "x": 50.9,
    "y": -0.07500000000000018,
    "layer": "top",
    "shape": "rect",
    "width": 1.5,
    "height": 0.45,
    "padId": "pcb_smtpad_1126",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_3",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_ISO1 > .pin1",
    "x": 50.49,
    "y": 1.25,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1127",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_4",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .R_ETH_YELLOW > .pin1",
    "x": 47.99,
    "y": 3,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1053",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_5",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_IO3 > .pin1",
    "x": 48.3,
    "y": 5,
    "layer": "top",
    "shape": "rect",
    "width": 1,
    "height": 1.45,
    "padId": "pcb_smtpad_1049",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_6",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO_OE > .5",
    "x": 44.1375,
    "y": 3.45,
    "layer": "top",
    "shape": "rect",
    "width": 1.325,
    "height": 0.6,
    "padId": "pcb_smtpad_1133",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_7",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_A2 > .pin1",
    "x": 41.49,
    "y": 8.6,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1039",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_8",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_PHY > .6",
    "x": 40.325,
    "y": 12.675,
    "layer": "top",
    "shape": "rect",
    "width": 0.25,
    "height": 0.25,
    "padId": "pcb_smtpad_961",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_9",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_PHY > .19",
    "x": 37.4625,
    "y": 14.9,
    "layer": "top",
    "shape": "rect",
    "width": 0.675,
    "height": 0.2,
    "padId": "pcb_smtpad_974",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_10",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_IO1 > .pin1",
    "x": 33.51,
    "y": 16.1,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1045",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_11",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_IO2 > .pin1",
    "x": 35.49,
    "y": 21.25,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1047",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_12",
    "toLayer": "inner5"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_RESET > .6",
    "x": 36.1375,
    "y": 5.95,
    "layer": "top",
    "shape": "rect",
    "width": 1.325,
    "height": 0.6,
    "padId": "pcb_smtpad_1030",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_13",
    "toLayer": "inner4"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_RESET > .5",
    "x": 36.1375,
    "y": 5,
    "layer": "top",
    "shape": "rect",
    "width": 1.325,
    "height": 0.6,
    "padId": "pcb_smtpad_1029",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_14",
    "toLayer": "inner4"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_A0 > .pin1",
    "x": 40.26,
    "y": 10.9,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1035",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_15",
    "toLayer": "inner2"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_RESET > .pin1",
    "x": 37.74,
    "y": 3.75,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1033",
    "net": "ETH_3V3",
    "viaName": "ETHPWR_VIP_16",
    "toLayer": "inner5"
  }
] as const
export const routes=[
  {
    "name": "ETHPWR_ETH_3V3_PRE_0",
    "net": "ETH_3V3_PRE",
    "from": ".Ethernet_and_RGB_expansion > .U_ETH_LDO > .5",
    "to": ".Ethernet_and_RGB_expansion > .C_ETH_LDO_OUT > .pin1",
    "width": 0.35,
    "layer": "top",
    "points": [
      [
        40.6375,
        7.2
      ],
      [
        41.197500000000005,
        6.640000000000001
      ],
      [
        42.4,
        6.640000000000001
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .U_ETH_LDO > .5",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_LDO_OUT > .pin1",
    "lengthMm": 1.9944595949289279
  },
  {
    "name": "ETHPWR_ETH_3V3_PRE_1",
    "net": "ETH_3V3_PRE",
    "from": "ETHPWR_VIP_0.inner5",
    "to": "ETHPWR_VIP_1.inner5",
    "width": 0.6,
    "layer": "inner5",
    "points": [
      [
        40.6375,
        7.2
      ],
      [
        40.61125,
        7.200000000000002
      ],
      [
        40.6,
        7.188750000000002
      ],
      [
        40.6,
        -2.1000000000000014
      ],
      [
        40.4,
        -2.299999999999997
      ],
      [
        40.4,
        -6.0
      ],
      [
        41.88674174785275,
        -7.4867417478527525
      ],
      [
        41.88875,
        -7.515
      ],
      [
        41.8625,
        -7.55
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .U_ETH_LDO > .5",
    "padTo": ".Ethernet_and_RGB_expansion > .U_ETH_RAMP > .1",
    "lengthMm": 15.48840248192331
  },
  {
    "name": "ETHPWR_ETH_3V3_2",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .U_ETH_RAMP > .6",
    "to": ".Ethernet_and_RGB_expansion > .U_ETH_RAMP > .5",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        44.1375,
        -7.55
      ],
      [
        44.1375,
        -8.5
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .U_ETH_RAMP > .6",
    "padTo": ".Ethernet_and_RGB_expansion > .U_ETH_RAMP > .5",
    "lengthMm": 0.9500000000000002
  },
  {
    "name": "ETHPWR_ETH_3V3_3",
    "net": "ETH_3V3",
    "from": "ETHPWR_VIP_2.inner5",
    "to": "ETHPWR_VIP_3.inner5",
    "width": 0.5,
    "layer": "inner5",
    "points": [
      [
        44.1375,
        -7.55
      ],
      [
        44.1375,
        -6.837499999999996
      ],
      [
        50.9,
        -0.07500000000000018
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .U_ETH_RAMP > .6",
    "padTo": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .20",
    "lengthMm": 10.276119215548054
  },
  {
    "name": "ETHPWR_ETH_3V3_4",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .20",
    "to": ".Ethernet_and_RGB_expansion > .C_ETH_ISO1 > .pin1",
    "width": 0.5,
    "layer": "top",
    "points": [
      [
        50.9,
        -0.07500000000000018
      ],
      [
        50.49,
        0.3349999999999964
      ],
      [
        50.49,
        1.25
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .20",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_ISO1 > .pin1",
    "lengthMm": 1.4948275605729677
  },
  {
    "name": "ETHPWR_ETH_3V3_5",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .20",
    "to": ".Ethernet_and_RGB_expansion > .C_ETH_ISO_OE > .pin1",
    "width": 0.5,
    "layer": "top",
    "points": [
      [
        50.9,
        -0.07500000000000018
      ],
      [
        51.815000000000005,
        -0.07500000000000018
      ],
      [
        52.74,
        -1
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .20",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_ISO_OE > .pin1",
    "lengthMm": 2.223147545195117
  },
  {
    "name": "ETHPWR_ETH_3V3_6",
    "net": "ETH_3V3",
    "from": "ETHPWR_VIP_4.inner5",
    "to": "ETHPWR_VIP_5.inner5",
    "width": 0.2,
    "layer": "inner5",
    "points": [
      [
        50.49,
        1.25
      ],
      [
        48.74,
        3.0
      ],
      [
        47.99,
        3
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_ISO1 > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .R_ETH_YELLOW > .pin1",
    "lengthMm": 3.2248737341529163
  },
  {
    "name": "ETHPWR_ETH_3V3_7",
    "net": "ETH_3V3",
    "from": "ETHPWR_VIP_4.inner5",
    "to": "ETHPWR_VIP_6.inner5",
    "width": 0.5,
    "layer": "inner5",
    "points": [
      [
        50.49,
        1.25
      ],
      [
        48.3,
        3.440000000000005
      ],
      [
        48.3,
        5
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_ISO1 > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_IO3 > .pin1",
    "lengthMm": 4.65712770159708
  },
  {
    "name": "ETHPWR_ETH_3V3_8",
    "net": "ETH_3V3",
    "from": "ETHPWR_VIP_6.inner5",
    "to": "ETHPWR_VIP_7.inner5",
    "width": 0.5,
    "layer": "inner5",
    "points": [
      [
        48.3,
        5
      ],
      [
        46.75,
        3.45
      ],
      [
        44.1375,
        3.45
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_IO3 > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .U_ETH_ISO_OE > .5",
    "lengthMm": 4.804531021678292
  },
  {
    "name": "ETHPWR_ETH_3V3_9",
    "net": "ETH_3V3",
    "from": "ETHPWR_VIP_7.inner5",
    "to": "ETHPWR_VIP_8.inner5",
    "width": 0.5,
    "layer": "inner5",
    "points": [
      [
        44.1375,
        3.45
      ],
      [
        41.49,
        6.097500000000001
      ],
      [
        41.49,
        8.6
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .U_ETH_ISO_OE > .5",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_A2 > .pin1",
    "lengthMm": 6.246630406382769
  },
  {
    "name": "ETHPWR_ETH_3V3_10",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .C_ETH_A2 > .pin1",
    "to": ".Ethernet_and_RGB_expansion > .C_ETH_A1 > .pin1",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        41.49,
        8.6
      ],
      [
        41.50000000000001,
        8.600000000000001
      ],
      [
        42.1,
        9.200000000000003
      ],
      [
        42.4,
        9.200000000000003
      ],
      [
        42.6,
        9.399999999999999
      ],
      [
        42.6,
        10.300000000000004
      ],
      [
        42.300000000000004,
        10.600000000000001
      ],
      [
        42.1,
        10.600000000000001
      ],
      [
        41.50000000000001,
        11.200000000000003
      ],
      [
        41.49,
        11.25
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_A2 > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_A1 > .pin1",
    "lengthMm": 3.8651532511701876
  },
  {
    "name": "ETHPWR_ETH_3V3_11",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .C_ETH_A1 > .pin1",
    "to": ".Ethernet_and_RGB_expansion > .U_ETH_PHY > .6",
    "width": 0.2,
    "layer": "top",
    "points": [
      [
        41.49,
        11.25
      ],
      [
        40.325,
        12.415
      ],
      [
        40.325,
        12.675
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_A1 > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .U_ETH_PHY > .6",
    "lengthMm": 1.907558800164656
  },
  {
    "name": "ETHPWR_ETH_3V3_12",
    "net": "ETH_3V3",
    "from": "ETHPWR_VIP_9.inner5",
    "to": "ETHPWR_VIP_10.inner5",
    "width": 0.2,
    "layer": "inner5",
    "points": [
      [
        40.325,
        12.675
      ],
      [
        38.1,
        14.9
      ],
      [
        37.4625,
        14.9
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .U_ETH_PHY > .6",
    "padTo": ".Ethernet_and_RGB_expansion > .U_ETH_PHY > .19",
    "lengthMm": 3.7841251762801402
  },
  {
    "name": "ETHPWR_ETH_3V3_13",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .U_ETH_PHY > .19",
    "to": ".Ethernet_and_RGB_expansion > .C_ETH_IO0 > .pin1",
    "width": 0.2,
    "layer": "top",
    "points": [
      [
        37.4625,
        14.9
      ],
      [
        36.209999999999994,
        14.9
      ],
      [
        35.51,
        15.6
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .U_ETH_PHY > .19",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_IO0 > .pin1",
    "lengthMm": 2.2424494936611676
  },
  {
    "name": "ETHPWR_ETH_3V3_14",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .C_ETH_IO0 > .pin1",
    "to": ".Ethernet_and_RGB_expansion > .C_ETH_IO1 > .pin1",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        35.51,
        15.6
      ],
      [
        35.5,
        15.600000000000001
      ],
      [
        34.9,
        16.200000000000003
      ],
      [
        33.6,
        16.200000000000003
      ],
      [
        33.5,
        16.1
      ],
      [
        33.51,
        16.1
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_IO0 > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_IO1 > .pin1",
    "lengthMm": 2.3099494936611635
  },
  {
    "name": "ETHPWR_ETH_3V3_15",
    "net": "ETH_3V3",
    "from": "ETHPWR_VIP_11.inner5",
    "to": "ETHPWR_VIP_12.inner5",
    "width": 0.5,
    "layer": "inner5",
    "points": [
      [
        33.51,
        16.1
      ],
      [
        35.49,
        18.080000000000005
      ],
      [
        35.49,
        21.25
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_IO1 > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_IO2 > .pin1",
    "lengthMm": 5.970142853498729
  },
  {
    "name": "ETHPWR_ETH_3V3_16",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .C_ETH_IO2 > .pin1",
    "to": ".Ethernet_and_RGB_expansion > .C_ETH_OSC > .pin1",
    "width": 0.5,
    "layer": "top",
    "points": [
      [
        35.49,
        21.25
      ],
      [
        35.49,
        23
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_IO2 > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_OSC > .pin1",
    "lengthMm": 1.75
  },
  {
    "name": "ETHPWR_ETH_3V3_17",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .C_ETH_OSC > .pin1",
    "to": ".Ethernet_and_RGB_expansion > .C_ETH_A3 > .pin1",
    "width": 0.5,
    "layer": "top",
    "points": [
      [
        35.49,
        23
      ],
      [
        34.3,
        24.190000000000005
      ],
      [
        34.3,
        24.75
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_OSC > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_A3 > .pin1",
    "lengthMm": 2.242914139223985
  },
  {
    "name": "ETHPWR_ETH_3V3_18",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .C_ETH_OSC > .pin1",
    "to": ".Ethernet_and_RGB_expansion > .Y_ETH > .1",
    "width": 0.5,
    "layer": "top",
    "points": [
      [
        35.49,
        23
      ],
      [
        35.49,
        22.475
      ],
      [
        35.715,
        22.25
      ],
      [
        38.05,
        22.25
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_OSC > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .Y_ETH > .1",
    "lengthMm": 3.1781980515339407
  },
  {
    "name": "ETHPWR_ETH_3V3_19",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .Y_ETH > .1",
    "to": ".Ethernet_and_RGB_expansion > .Y_ETH > .4",
    "width": 0.5,
    "layer": "top",
    "points": [
      [
        38.05,
        22.25
      ],
      [
        38.05,
        23.75
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .Y_ETH > .1",
    "padTo": ".Ethernet_and_RGB_expansion > .Y_ETH > .4",
    "lengthMm": 1.5
  },
  {
    "name": "ETHPWR_ETH_3V3_20",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .C_ETH_IO2 > .pin1",
    "to": ".Ethernet_and_RGB_expansion > .R_ETH_MDIO_PU > .pin2",
    "width": 0.2,
    "layer": "top",
    "points": [
      [
        35.49,
        21.25
      ],
      [
        35.497,
        21.215000000000003
      ],
      [
        35.48918334617361,
        21.18918334617361
      ],
      [
        35.1,
        20.800000000000004
      ],
      [
        33.6,
        20.800000000000004
      ],
      [
        33.300000000000004,
        20.5
      ],
      [
        33.300000000000004,
        18.5
      ],
      [
        33.5,
        18.300000000000004
      ],
      [
        33.51,
        18.3
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_IO2 > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .R_ETH_MDIO_PU > .pin2",
    "lengthMm": 4.830162340092687
  },
  {
    "name": "ETHPWR_ETH_3V3_21",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .Y_ETH > .1",
    "to": ".Ethernet_and_RGB_expansion > .R_ETH_INT_PU > .pin2",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        38.05,
        22.25
      ],
      [
        39.50000000000001,
        20.800000000000004
      ],
      [
        40.00000000000001,
        20.800000000000004
      ],
      [
        40.300000000000004,
        20.5
      ],
      [
        40.300000000000004,
        19.5
      ],
      [
        39.300000000000004,
        19.5
      ],
      [
        37.800000000000004,
        18.0
      ],
      [
        37.76,
        18
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .Y_ETH > .1",
    "padTo": ".Ethernet_and_RGB_expansion > .R_ETH_INT_PU > .pin2",
    "lengthMm": 7.13619407771257
  },
  {
    "name": "ETHPWR_ETH_3V3_22",
    "net": "ETH_3V3",
    "from": "ETHPWR_VIP_8.inner5",
    "to": "ETHPWR_VIP_16.inner5",
    "width": 0.5,
    "layer": "inner5",
    "points": [
      [
        41.49,
        8.6
      ],
      [
        40.89,
        8.6
      ],
      [
        37.765,
        5.475
      ],
      [
        37.74,
        5.450000000000001
      ],
      [
        37.74,
        3.75
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_A2 > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .U_ETH_RESET > .6",
    "lengthMm": 6.75477272147525
  },
  {
    "name": "ETHPWR_ETH_3V3_23",
    "net": "ETH_3V3",
    "from": "ETHPWR_VIP_13.inner4",
    "to": "ETHPWR_VIP_14.inner4",
    "width": 0.5,
    "layer": "inner4",
    "points": [
      [
        36.1375,
        5.95
      ],
      [
        36.1375,
        5
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .U_ETH_RESET > .6",
    "padTo": ".Ethernet_and_RGB_expansion > .U_ETH_RESET > .5",
    "lengthMm": 0.9500000000000002
  },
  {
    "name": "ETHPWR_ETH_3V3_24",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .U_ETH_RESET > .5",
    "to": ".Ethernet_and_RGB_expansion > .C_ETH_RESET > .pin1",
    "width": 0.5,
    "layer": "top",
    "points": [
      [
        36.1375,
        5
      ],
      [
        35.5,
        5.0
      ],
      [
        35.1,
        4.600000000000001
      ],
      [
        35.1,
        3.5
      ],
      [
        35.300000000000004,
        3.3000000000000043
      ],
      [
        37.300000000000004,
        3.3000000000000043
      ],
      [
        37.699999999999996,
        3.700000000000003
      ],
      [
        37.74,
        3.75
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .U_ETH_RESET > .5",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_RESET > .pin1",
    "lengthMm": 5.215744804747419
  },
  {
    "name": "ETHPWR_ETH_3V3_25",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .C_ETH_RESET > .pin1",
    "to": ".Ethernet_and_RGB_expansion > .R_ETH_ISO_OE_PU > .pin2",
    "width": 0.2,
    "layer": "top",
    "points": [
      [
        37.74,
        3.75
      ],
      [
        38.01,
        3.480000000000004
      ],
      [
        38.01,
        2.5
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_RESET > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .R_ETH_ISO_OE_PU > .pin2",
    "lengthMm": 1.361837661840734
  },
  {
    "name": "ETHPWR_ETH_3V3_26",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .U_ETH_RESET > .6",
    "to": ".Ethernet_and_RGB_expansion > .R_ETH_RESET_PU > .pin2",
    "width": 0.2,
    "layer": "top",
    "points": [
      [
        36.1375,
        5.95
      ],
      [
        35.51,
        6.577500000000005
      ],
      [
        35.51,
        8
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .U_ETH_RESET > .6",
    "padTo": ".Ethernet_and_RGB_expansion > .R_ETH_RESET_PU > .pin2",
    "lengthMm": 2.3099190103891187
  },
  {
    "name": "ETHPWR_ETH_3V3_27",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .C_ETH_RESET > .pin1",
    "to": ".Ethernet_and_RGB_expansion > .C_ETH_ISO0 > .pin1",
    "width": 0.5,
    "layer": "top",
    "points": [
      [
        37.74,
        3.75
      ],
      [
        37.711999999999996,
        3.715000000000002
      ],
      [
        37.7135830777072,
        3.6864169222927963
      ],
      [
        39.4,
        2.0
      ],
      [
        39.699999999999996,
        2.0
      ],
      [
        40.300000000000004,
        1.3999999999999986
      ],
      [
        40.300000000000004,
        1.219209372712302
      ],
      [
        40.288000000000004,
        1.215000000000002
      ],
      [
        40.26,
        1.25
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_RESET > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .C_ETH_ISO0 > .pin1",
    "lengthMm": 3.8452599424022393
  },
  {
    "name": "ETHPWR_ETH_3V3_28",
    "net": "ETH_3V3",
    "from": ".Ethernet_and_RGB_expansion > .C_ETH_RESET > .pin1",
    "to": ".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .20",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        37.74,
        3.75
      ],
      [
        37.711999999999996,
        3.715000000000002
      ],
      [
        37.6807906272877,
        3.700000000000003
      ],
      [
        37.300000000000004,
        3.700000000000003
      ],
      [
        36.699999999999996,
        3.1000000000000014
      ],
      [
        36.50000000000001,
        3.1000000000000014
      ],
      [
        35.9,
        2.5
      ],
      [
        35.9,
        0.8000000000000043
      ],
      [
        36.2,
        0.5
      ],
      [
        38.50000000000001,
        0.5
      ],
      [
        39.1,
        -0.10000000000000142
      ],
      [
        41.8925,
        -0.10000000000000142
      ],
      [
        41.9,
        -0.09250000000000105
      ],
      [
        41.9,
        -0.07500000000000018
      ]
    ],
    "padFrom": ".Ethernet_and_RGB_expansion > .C_ETH_RESET > .pin1",
    "padTo": ".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .20",
    "lengthMm": 10.450694519237064
  }
] as const
export const pours=[
  {
    "name": "ETHPOWER_A0_LOCAL_FEED",
    "net": "ETH_3V3",
    "layer": "inner2",
    "outline": [
      {
        "x": 41.615,
        "y": 9.721776695296635
      },
      {
        "x": 41.615,
        "y": 8.6
      },
      {
        "x": 41.6125981600504,
        "y": 8.575613709747984
      },
      {
        "x": 41.605484941563915,
        "y": 8.552164570954364
      },
      {
        "x": 41.59393370153782,
        "y": 8.530553720872549
      },
      {
        "x": 41.57838834764832,
        "y": 8.51161165235168
      },
      {
        "x": 41.55944627912745,
        "y": 8.496066298462182
      },
      {
        "x": 41.537835429045636,
        "y": 8.484515058436088
      },
      {
        "x": 41.51438629025202,
        "y": 8.477401839949597
      },
      {
        "x": 41.49,
        "y": 8.475
      },
      {
        "x": 41.465613709747984,
        "y": 8.477401839949597
      },
      {
        "x": 41.44216457095437,
        "y": 8.484515058436088
      },
      {
        "x": 41.420553720872554,
        "y": 8.496066298462182
      },
      {
        "x": 41.40161165235168,
        "y": 8.51161165235168
      },
      {
        "x": 41.38606629846218,
        "y": 8.530553720872549
      },
      {
        "x": 41.37451505843609,
        "y": 8.552164570954364
      },
      {
        "x": 41.3674018399496,
        "y": 8.575613709747984
      },
      {
        "x": 41.365,
        "y": 8.6
      },
      {
        "x": 41.365,
        "y": 9.618223304703358
      },
      {
        "x": 40.17161165235168,
        "y": 10.811611652351681
      },
      {
        "x": 40.15606629846218,
        "y": 10.83055372087255
      },
      {
        "x": 40.144515058436085,
        "y": 10.852164570954365
      },
      {
        "x": 40.1374018399496,
        "y": 10.875613709747984
      },
      {
        "x": 40.135,
        "y": 10.9
      },
      {
        "x": 40.1374018399496,
        "y": 10.924386290252016
      },
      {
        "x": 40.144515058436085,
        "y": 10.947835429045636
      },
      {
        "x": 40.15606629846218,
        "y": 10.969446279127451
      },
      {
        "x": 40.17161165235168,
        "y": 10.98838834764832
      },
      {
        "x": 40.19055372087255,
        "y": 11.003933701537818
      },
      {
        "x": 40.212164570954364,
        "y": 11.015484941563912
      },
      {
        "x": 40.23561370974798,
        "y": 11.022598160050403
      },
      {
        "x": 40.26,
        "y": 11.025
      },
      {
        "x": 40.284386290252016,
        "y": 11.022598160050403
      },
      {
        "x": 40.30783542904563,
        "y": 11.015484941563912
      },
      {
        "x": 40.329446279127446,
        "y": 11.003933701537818
      },
      {
        "x": 40.34838834764832,
        "y": 10.98838834764832
      }
    ],
    "points": [
      [
        40.26,
        10.9
      ],
      [
        41.49,
        9.669999999999996
      ],
      [
        41.49,
        8.6
      ]
    ],
    "width": 0.25,
    "fromPad": ".Ethernet_and_RGB_expansion > .C_ETH_A0 > .pin1",
    "toPad": ".Ethernet_and_RGB_expansion > .C_ETH_A2 > .pin1",
    "lengthMm": 2.809482681718909
  }
] as const
export function CloudEthernetPowerRoutes(){return <>
 {vias.map(v=><via key={v.viaName} name={v.viaName} pcbX={v.x} pcbY={v.y} fromLayer={v.layer} toLayer={v.toLayer} holeDiameter={0.15} outerDiameter={0.3} connectsTo={v.selector}/>)}
 {routes.map(r=><trace key={r.name} name={r.name} from={r.from} to={r.to} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,...r.points.map(([x,y])=>({x,y})),r.to]]}/>)}
 {pours.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo={`net.${p.net}`} unbroken boardEdgeMargin={0} coveredWithSolderMask clearance={0.1} outline={p.outline}/>)}
</>}
