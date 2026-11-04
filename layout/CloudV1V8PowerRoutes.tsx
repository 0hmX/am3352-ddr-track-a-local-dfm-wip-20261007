// Staged supply candidate; native emitted width and physical connectivity require joint verification.
const vias=[
  {
    "net": "V1V8",
    "selector": ".Processor > .U1 > .N6",
    "x": 2.8000000000000003,
    "y": -2.8000000000000003,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_102",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_1"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .U1 > .D7",
    "x": -4.4,
    "y": -2,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_111",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_2"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .U1 > .E7",
    "x": -3.6,
    "y": -2,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_112",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_3"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .U1 > .F9",
    "x": -2.8000000000000003,
    "y": -0.4,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_149",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_5"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .U1 > .P9",
    "x": 3.6,
    "y": -0.4,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_157",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_6"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .U1 > .D10",
    "x": -4.4,
    "y": 0.4,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_165",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_7"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .U1 > .R10",
    "x": 4.4,
    "y": 0.4,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_176",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_8"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .U1 > .R11",
    "x": 4.4,
    "y": 1.2000000000000002,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_194",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_9"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .U1 > .E14",
    "x": -3.6,
    "y": 3.6,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_238",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_11"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .U1 > .P14",
    "x": 3.6,
    "y": 3.6,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_247",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_12"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .U1 > .N16",
    "x": 2.8000000000000003,
    "y": 5.2,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_282",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_14"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .U1 > .R16",
    "x": 4.4,
    "y": 5.2,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_284",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_15"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .C_VDDS_0 > .pin1",
    "x": -6.24,
    "y": -1,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_356",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_17"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .C_VDDS_2 > .pin1",
    "x": -0.74,
    "y": 0,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_360",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_19"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .C_SRAM_CORE_B > .pin1",
    "x": 4.4125,
    "y": -0.5,
    "layer": "bottom",
    "shape": "rect",
    "width": 1.025,
    "height": 1.4,
    "padId": "pcb_smtpad_364",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_21"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .C_SRAM_MPU_B > .pin1",
    "x": 8.4125,
    "y": -0.25,
    "layer": "bottom",
    "shape": "rect",
    "width": 1.025,
    "height": 1.4,
    "padId": "pcb_smtpad_368",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_23"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .C_VDDS_PLL_DDR > .pin1",
    "x": 14.01,
    "y": -11,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_416",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_25"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .C_VDDS_PLL_CORE_LCD > .pin1",
    "x": 14.01,
    "y": -12.5,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_418",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_26"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .C_VDDS_OSC > .pin1",
    "x": -3.49,
    "y": -3,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_422",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_28"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .C_VDDS_RTC > .pin1",
    "x": -10.99,
    "y": -8.25,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_424",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_29"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .C_VDDA1P8V_USB0 > .pin1",
    "x": 5.51,
    "y": 8.2,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_426",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_30"
  },
  {
    "net": "V1V8",
    "selector": ".Processor > .C_VDDA1P8V_USB1 > .pin1",
    "x": 4.01,
    "y": -2.25,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_428",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_31"
  },
  {
    "net": "V1V8",
    "selector": ".Power_management > .C_PWR12_B > .pin1",
    "x": 10.35,
    "y": -5.2,
    "layer": "top",
    "shape": "rect",
    "width": 2.7,
    "height": 1.15,
    "padId": "pcb_smtpad_713",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_33"
  },
  {
    "net": "V1V8",
    "selector": ".Power_management > .C_PWR12 > .pin1",
    "x": 17.5,
    "y": -3.3,
    "layer": "bottom",
    "shape": "rect",
    "width": 2.7,
    "height": 1.15,
    "padId": "pcb_smtpad_715",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_34"
  },
  {
    "net": "V1V8",
    "selector": ".Power_management > .R_RTC_RESET > .pin1",
    "x": 15.99,
    "y": -14,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_737",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_35"
  },
  {
    "net": "V1V8",
    "selector": ".Power_management > .U_RTC_RESET_DELAY > .3",
    "x": 8.6,
    "y": 10.175,
    "layer": "top",
    "shape": "rect",
    "width": 0.6,
    "height": 0.31,
    "padId": "pcb_smtpad_749",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_37"
  },
  {
    "net": "V1V8",
    "selector": ".Power_management > .U_RTC_POR_GATE > .5",
    "x": 6.6375,
    "y": 11.45,
    "layer": "top",
    "shape": "rect",
    "width": 1.325,
    "height": 0.6,
    "padId": "pcb_smtpad_764",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_38"
  },
  {
    "net": "V1V8",
    "selector": ".Power_management > .C_RTC_RESET_BYP > .pin1",
    "x": 15.99,
    "y": -15.5,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_765",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_39"
  },
  {
    "net": "V1V8",
    "selector": ".Power_management > .C_RTC_GATE_BYP > .pin1",
    "x": 16.74,
    "y": -17,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_767",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_40"
  },
  {
    "net": "V1V8",
    "selector": ".Boot_and_clock > .C_CLOCK_GATE > .pin1",
    "x": 7.6899999999999995,
    "y": -17,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_822",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_44"
  },
  {
    "net": "V1V8",
    "selector": ".Ethernet_and_RGB_expansion > .C_RMII_RETURN_A > .pin2",
    "x": 21,
    "y": 11.99,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.64,
    "height": 0.54,
    "padId": "pcb_smtpad_1147",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_45"
  },
  {
    "net": "V1V8",
    "selector": ".Ethernet_and_RGB_expansion > .C_RMII_RETURN_B > .pin2",
    "x": 16.1,
    "y": 11.99,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.64,
    "height": 0.54,
    "padId": "pcb_smtpad_1149",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_46"
  },
  {
    "net": "V1V8",
    "selector": ".Ethernet_and_RGB_expansion > .C_RMII_RETURN_C > .pin2",
    "x": 24.79,
    "y": 10,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1151",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_47"
  },
  {
    "net": "V1V8",
    "selector": ".Ethernet_and_RGB_expansion > .C_RMII_RETURN_D > .pin2",
    "x": 31.24,
    "y": 3.765,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1153",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_48"
  },
  {
    "net": "V1V8",
    "selector": ".Debug_status > .TP_DBG_V1V8 > .V1V8",
    "x": 13.99,
    "y": -16,
    "layer": "top",
    "shape": "circle",
    "radius": 0.6,
    "padId": "pcb_smtpad_1156",
    "toLayer": "inner5",
    "viaName": "PWR_V2_V1V8_49"
  },
  {
    "net": "V1V8",
    "selector": ".Power_management > .U_PMIC > .4",
    "x": 18.0625,
    "y": -1,
    "layer": "top",
    "shape": "rect",
    "width": 0.825,
    "height": 0.2,
    "padId": "pcb_smtpad_631",
    "toLayer": "inner5",
    "viaName": "V1V8_PMIC_FEED"
  },
  {
    "net": "V1V8",
    "selector": ".Boot_and_clock > .Y_SOC > .4",
    "x": 6.1499999999999995,
    "y": -9.075,
    "layer": "top",
    "shape": "rect",
    "width": 1.1,
    "height": 1,
    "padId": "pcb_smtpad_808",
    "toLayer": "inner5",
    "viaName": "V1V8_Y_SOC_FEED",
    "pendingSignalAccess": true
  },
  {
    "selector": ".Processor > .C_VDDS_B > .pin1",
    "x": 9.4125,
    "y": 1.75,
    "layer": "bottom",
    "shape": "rect",
    "width": 1.025,
    "height": 1.4,
    "padId": "pcb_smtpad_354",
    "net": "V1V8",
    "toLayer": "inner5",
    "viaName": "V1V8_ADDITIONAL_38"
  },
  {
    "selector": ".Processor > .C_VDDS_3 > .pin1",
    "x": 8.76,
    "y": 3.5,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_362",
    "net": "V1V8",
    "toLayer": "inner5",
    "viaName": "V1V8_ADDITIONAL_39"
  },
  {
    "selector": ".Processor > .C_SRAM_CORE_0 > .pin1",
    "x": 6.26,
    "y": 2,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_366",
    "net": "V1V8",
    "toLayer": "inner5",
    "viaName": "V1V8_ADDITIONAL_40"
  }
] as const
const routes=[
  {
    "name": "CLOUD_V1V8_V2_0",
    "net": "V1V8",
    "from": ".Processor > .U1 > .E9",
    "to": ".Processor > .U1 > .F9",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        -3.6,
        -0.4
      ],
      [
        -2.8000000000000003,
        -0.4
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_1",
    "net": "V1V8",
    "from": ".Processor > .U1 > .R10",
    "to": ".Processor > .U1 > .R11",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        4.4,
        0.4
      ],
      [
        4.4,
        1.2000000000000002
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_2",
    "net": "V1V8",
    "from": ".Processor > .U1 > .D7",
    "to": ".Processor > .U1 > .E7",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        -4.4,
        -2
      ],
      [
        -3.6,
        -2
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_3",
    "net": "V1V8",
    "from": ".Processor > .U1 > .E9",
    "to": ".Processor > .U1 > .D10",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        -3.6,
        -0.4
      ],
      [
        -4.4,
        0.4
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_4",
    "net": "V1V8",
    "from": ".Processor > .C_VDDS_PLL_MPU > .pin1",
    "to": ".Processor > .C_VDDS_RTC > .pin1",
    "width": 0.3,
    "layer": "bottom",
    "points": [
      [
        -10.99,
        -9.5
      ],
      [
        -10.99,
        -8.25
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_5",
    "net": "V1V8",
    "from": ".Power_management > .U_RTC_RESET_DELAY > .1",
    "to": ".Power_management > .U_RTC_RESET_DELAY > .3",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        8.6,
        11.475
      ],
      [
        8.0,
        11.100000000000001
      ],
      [
        8.0,
        10.5
      ],
      [
        8.6,
        10.175
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_6",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_35.inner5",
    "to": "PWR_V2_V1V8_39.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        15.99,
        -14
      ],
      [
        15.99,
        -15.5
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_7",
    "net": "V1V8",
    "from": ".Boot_and_clock > .C_SOC_CLOCK > .pin1",
    "to": ".Boot_and_clock > .U_CLOCK_GATE > .5",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        5.99,
        -14.5
      ],
      [
        6.1375,
        -16.05
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_8",
    "net": "V1V8",
    "from": ".Processor > .C_SRAM_CORE_B > .pin1",
    "to": ".Processor > .C_VDDA1P8V_USB1 > .pin1",
    "width": 0.3,
    "layer": "bottom",
    "points": [
      [
        4.4125,
        -0.5
      ],
      [
        4.01,
        -2.25
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_9",
    "net": "V1V8",
    "from": ".Boot_and_clock > .U_CLOCK_GATE > .5",
    "to": ".Boot_and_clock > .C_CLOCK_GATE > .pin1",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        6.1375,
        -16.05
      ],
      [
        7.6899999999999995,
        -17
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_10",
    "net": "V1V8",
    "from": ".Processor > .C_VDDS_B > .pin1",
    "to": ".Processor > .C_VDDS_3 > .pin1",
    "width": 0.3,
    "layer": "bottom",
    "points": [
      [
        9.4125,
        1.75
      ],
      [
        8.76,
        3.5
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_11",
    "net": "V1V8",
    "from": ".Power_management > .C_RTC_RESET_BYP > .pin1",
    "to": ".Debug_status > .TP_DBG_V1V8 > .V1V8",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        15.99,
        -15.5
      ],
      [
        13.99,
        -16
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_12",
    "net": "V1V8",
    "from": "V1V8_ADDITIONAL_38.inner5",
    "to": "PWR_V2_V1V8_23.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        9.4125,
        1.75
      ],
      [
        9.399999999999999,
        1.5
      ],
      [
        9.399999999999999,
        0.3500000000000014
      ],
      [
        9.600000000000001,
        0.14999999999999858
      ],
      [
        9.600000000000001,
        -0.3500000000000014
      ],
      [
        9.399999999999999,
        -0.5499999999999972
      ],
      [
        8.700000000000003,
        -0.5499999999999972
      ],
      [
        8.399999999999999,
        -0.25
      ],
      [
        8.4125,
        -0.25
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_13",
    "net": "V1V8",
    "from": "V1V8_ADDITIONAL_39.inner5",
    "to": "V1V8_ADDITIONAL_40.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        8.76,
        3.5
      ],
      [
        6.76,
        3.5
      ],
      [
        6.26,
        3.0
      ],
      [
        6.26,
        2
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_14",
    "net": "V1V8",
    "from": ".Processor > .C_VDDS_B > .pin1",
    "to": ".Processor > .C_SRAM_MPU_0 > .pin1",
    "width": 0.3,
    "layer": "bottom",
    "points": [
      [
        9.4125,
        1.75
      ],
      [
        11.700000000000003,
        1.8999999999999986
      ],
      [
        12.26,
        2.5
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_15",
    "net": "V1V8",
    "from": ".Processor > .C_SRAM_CORE_B > .pin1",
    "to": ".Processor > .C_SRAM_CORE_0 > .pin1",
    "width": 0.3,
    "layer": "bottom",
    "points": [
      [
        4.4125,
        -0.5
      ],
      [
        5.899999999999999,
        0.7000000000000028
      ],
      [
        6.26,
        2
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_19",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_6.inner5",
    "to": "PWR_V2_V1V8_21.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        3.6,
        -0.4
      ],
      [
        4.4125,
        -0.5
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_20",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_8.inner5",
    "to": "PWR_V2_V1V8_21.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        4.4,
        0.4
      ],
      [
        4.4125,
        -0.5
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_22",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_25.inner5",
    "to": "PWR_V2_V1V8_26.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        14.01,
        -11
      ],
      [
        14.01,
        -12.5
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_24",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_39.inner5",
    "to": "PWR_V2_V1V8_40.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        15.99,
        -15.5
      ],
      [
        16.74,
        -17
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_27",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_2.inner5",
    "to": "PWR_V2_V1V8_17.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        -4.4,
        -2
      ],
      [
        -6.24,
        -1
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_28",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_5.inner5",
    "to": "PWR_V2_V1V8_19.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        -2.8000000000000003,
        -0.4
      ],
      [
        -0.74,
        0
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_29",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_37.inner5",
    "to": "PWR_V2_V1V8_38.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        8.6,
        10.175
      ],
      [
        6.6375,
        11.45
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_30",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_26.inner5",
    "to": "PWR_V2_V1V8_35.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        14.01,
        -12.5
      ],
      [
        15.99,
        -14
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_31",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_9.inner5",
    "to": "PWR_V2_V1V8_12.inner5",
    "width": 0.2,
    "layer": "inner5",
    "points": [
      [
        4.4,
        1.2000000000000002
      ],
      [
        4.399999999999999,
        1.8000000000000043
      ],
      [
        3.8000000000000007,
        2.3999999999999986
      ],
      [
        3.3999999999999986,
        2.3999999999999986
      ],
      [
        3.1999999999999993,
        2.6000000000000014
      ],
      [
        3.1999999999999993,
        3.200000000000003
      ],
      [
        3.6,
        3.6
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_34",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_30.inner5",
    "to": "PWR_V2_V1V8_38.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        5.51,
        8.2
      ],
      [
        6.6375,
        11.45
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_36",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_45.inner5",
    "to": "PWR_V2_V1V8_46.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        21,
        11.99
      ],
      [
        16.1,
        11.99
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_41",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_33.inner5",
    "to": "PWR_V2_V1V8_34.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        10.35,
        -5.2
      ],
      [
        10.35,
        -3.8
      ],
      [
        10.85,
        -3.3
      ],
      [
        17.5,
        -3.3
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_42",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_37.inner5",
    "to": "PWR_V2_V1V8_46.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        8.6,
        10.175
      ],
      [
        10.415,
        11.99
      ],
      [
        16.1,
        11.99
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_V2_45",
    "net": "V1V8",
    "from": ".Processor > .U1 > .K13",
    "to": ".Processor > .U1 > .H15",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        0.4,
        2.8000000000000003
      ],
      [
        -0.3000000000000007,
        3.200000000000003
      ],
      [
        -0.6999999999999993,
        3.200000000000003
      ],
      [
        -0.8999999999999986,
        4.100000000000001
      ],
      [
        -1.2000000000000002,
        4.4
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_PMIC_FEED",
    "net": "V1V8",
    "from": "V1V8_PMIC_FEED.inner5",
    "to": "PWR_V2_V1V8_34.inner5",
    "width": 0.2,
    "layer": "inner5",
    "points": [
      [
        18.0625,
        -1
      ],
      [
        17.725,
        -1.0
      ],
      [
        17.5,
        -1.225
      ],
      [
        17.5,
        -3.3
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_REBUILD_33",
    "net": "V1V8",
    "from": ".Processor > .U1 > .E7",
    "to": ".Processor > .U1 > .E9",
    "layer": "top",
    "width": 0.15,
    "points": [
      [
        -3.6,
        -2
      ],
      [
        -3.6499999999999986,
        -1.75
      ],
      [
        -4.0,
        -1.3999999999999986
      ],
      [
        -4.0,
        -0.7999999999999972
      ],
      [
        -3.6,
        -0.4
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_REBUILD_34",
    "net": "V1V8",
    "from": ".Processor > .U1 > .P14",
    "to": ".Processor > .U1 > .N16",
    "layer": "top",
    "width": 0.15,
    "points": [
      [
        3.6,
        3.6
      ],
      [
        3.5500000000000007,
        3.8500000000000014
      ],
      [
        3.1999999999999993,
        4.200000000000003
      ],
      [
        3.1999999999999993,
        4.800000000000004
      ],
      [
        2.8000000000000003,
        5.2
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_REBUILD_35",
    "net": "V1V8",
    "from": ".Processor > .U1 > .N6",
    "to": ".Processor > .U1 > .P9",
    "layer": "top",
    "width": 0.15,
    "points": [
      [
        2.8000000000000003,
        -2.8000000000000003
      ],
      [
        2.8500000000000014,
        -2.549999999999997
      ],
      [
        3.1999999999999993,
        -2.200000000000003
      ],
      [
        3.1999999999999993,
        -0.7999999999999972
      ],
      [
        3.6,
        -0.4
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_REBUILD_36",
    "net": "V1V8",
    "from": ".Processor > .U1 > .K13",
    "to": ".Processor > .U1 > .P14",
    "layer": "top",
    "width": 0.15,
    "points": [
      [
        0.4,
        2.8000000000000003
      ],
      [
        0.6499999999999986,
        2.8500000000000014
      ],
      [
        1.0,
        3.200000000000003
      ],
      [
        3.1999999999999993,
        3.200000000000003
      ],
      [
        3.6,
        3.6
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_REBUILD_37",
    "net": "V1V8",
    "from": ".Processor > .C_VDDS_1 > .pin1",
    "to": ".Processor > .C_VDDS_2 > .pin1",
    "layer": "bottom",
    "width": 0.3,
    "points": [
      [
        -3.49,
        2
      ],
      [
        -3.0500000000000007,
        2.0
      ],
      [
        -2.1000000000000014,
        1.0500000000000043
      ],
      [
        -0.5,
        1.0500000000000043
      ],
      [
        -0.3000000000000007,
        0.8500000000000014
      ],
      [
        -0.3000000000000007,
        0.3500000000000014
      ],
      [
        -0.6499999999999986,
        0.0
      ],
      [
        -0.74,
        0
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_REBUILD_38",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_45.inner5",
    "to": "PWR_V2_V1V8_47.inner5",
    "layer": "inner5",
    "width": 0.3,
    "points": [
      [
        21,
        11.99
      ],
      [
        22.990000000000002,
        10.0
      ],
      [
        24.79,
        10
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_REBUILD_39",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_6.inner5",
    "to": "PWR_V2_V1V8_19.inner5",
    "layer": "inner5",
    "width": 0.3,
    "points": [
      [
        3.6,
        -0.4
      ],
      [
        3.3500000000000014,
        -0.5499999999999972
      ],
      [
        2.25,
        -1.6499999999999986
      ],
      [
        0.8999999999999986,
        -1.6499999999999986
      ],
      [
        -0.75,
        0.0
      ],
      [
        -0.74,
        0
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_REBUILD_40",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_1.inner5",
    "to": "V1V8_Y_SOC_FEED.inner5",
    "layer": "inner5",
    "width": 0.3,
    "points": [
      [
        2.8000000000000003,
        -2.8000000000000003
      ],
      [
        2.6499999999999986,
        -3.049999999999997
      ],
      [
        2.3500000000000014,
        -3.3500000000000014
      ],
      [
        2.3500000000000014,
        -5.25
      ],
      [
        6.149999999999999,
        -9.05
      ],
      [
        6.1499999999999995,
        -9.075
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_REBUILD_41",
    "net": "V1V8",
    "from": "V1V8_Y_SOC_FEED.inner5",
    "to": "PWR_V2_V1V8_44.inner5",
    "layer": "inner5",
    "width": 0.3,
    "points": [
      [
        6.15,
        -9.075
      ],
      [
        7.425,
        -10.35
      ],
      [
        7.425,
        -11.575
      ],
      [
        7.95,
        -12.1
      ],
      [
        7.95,
        -14.9
      ],
      [
        7.69,
        -15.16
      ],
      [
        7.69,
        -17
      ]
    ],
    "lengthMm": 8.778279938488577
  },
  {
    "name": "CLOUD_V1V8_REBUILD_42",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_26.inner5",
    "to": "PWR_V2_V1V8_33.inner5",
    "layer": "inner5",
    "width": 0.3,
    "points": [
      [
        14.01,
        -12.5
      ],
      [
        13.649999999999999,
        -12.5
      ],
      [
        11.200000000000003,
        -14.95
      ],
      [
        10.75,
        -14.95
      ],
      [
        10.549999999999997,
        -14.75
      ],
      [
        10.549999999999997,
        -10.75
      ],
      [
        10.600000000000001,
        -10.5
      ],
      [
        10.600000000000001,
        -7.800000000000001
      ],
      [
        10.350000000000001,
        -7.550000000000001
      ],
      [
        10.35,
        -5.2
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_REBUILD_43",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_17.inner5",
    "to": "PWR_V2_V1V8_29.inner5",
    "layer": "inner5",
    "width": 0.3,
    "points": [
      [
        -6.24,
        -1
      ],
      [
        -6.449999999999999,
        -1.2000000000000028
      ],
      [
        -7.850000000000001,
        -2.6000000000000014
      ],
      [
        -8.100000000000001,
        -2.75
      ],
      [
        -10.100000000000001,
        -4.75
      ],
      [
        -10.100000000000001,
        -7.350000000000001
      ],
      [
        -11.0,
        -8.25
      ],
      [
        -10.99,
        -8.25
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_REBUILD_44",
    "net": "V1V8",
    "from": "PWR_V2_V1V8_23.inner5",
    "to": "PWR_V2_V1V8_30.inner5",
    "layer": "inner5",
    "width": 0.3,
    "points": [
      [
        8.4125,
        -0.25
      ],
      [
        8.049999999999997,
        -0.25
      ],
      [
        5.799999999999997,
        2.0
      ],
      [
        5.799999999999997,
        7.899999999999999
      ],
      [
        5.5,
        8.200000000000003
      ],
      [
        5.51,
        8.2
      ]
    ]
  },
  {
    "name": "CLOUD_V1V8_RETURN_D",
    "net": "V1V8",
    "from": ".Ethernet_and_RGB_expansion > .C_RMII_RETURN_D > .pin2",
    "to": ".Ethernet_and_RGB_expansion > .C_RMII_RETURN_C > .pin2",
    "layer": "bottom",
    "width": 0.3,
    "points": [
      [
        31.24,
        3.765
      ],
      [
        31.025,
        3.7650000000000006
      ],
      [
        24.79,
        10
      ]
    ],
    "length": 9.032621561396248
  },
  {
    "name": "V1V8_LOCAL_SOURCE",
    "net": "V1V8",
    "layer": "inner5",
    "width": 0.2,
    "points": [
      [
        18.0625,
        -1
      ],
      [
        17.8625,
        -1.2
      ],
      [
        15.4625,
        -3.6
      ],
      [
        10.55,
        -3.6
      ],
      [
        10.35,
        -3.8
      ],
      [
        10.35,
        -5.2
      ]
    ],
    "from": "V1V8_PMIC_FEED.inner5",
    "to": "PWR_V2_V1V8_33.inner5",
    "lengthMm": 10.272297974644667
  },
  {
    "name": "V1V8_PHYSICAL_BRIDGE_2",
    "net": "V1V8",
    "from": ".Debug_status > .TP_DBG_V1V8 > .V1V8",
    "to": ".Boot_and_clock > .C_CLOCK_GATE > .pin1",
    "layer": "top",
    "width": 0.3,
    "points": [
      [
        13.99,
        -16
      ],
      [
        13.050000000000004,
        -16.0
      ],
      [
        12.450000000000003,
        -16.6
      ],
      [
        9.350000000000001,
        -16.6
      ],
      [
        9.149999999999999,
        -16.4
      ],
      [
        8.299999999999997,
        -16.4
      ],
      [
        7.700000000000003,
        -17.0
      ],
      [
        7.6899999999999995,
        -17
      ]
    ]
  },
  {
    "name": "V1V8_E6_CENTERED_FEED_CONSOLIDATION",
    "net": "V1V8",
    "width": 0.3,
    "layer": "top",
    "points": [
      [
        -3.6,
        -2.8
      ],
      [
        -3.6,
        -2
      ]
    ],
    "from": ".Processor > .U1 > .E6",
    "to": ".Processor > .U1 > .E7"
  },
  {
    "name": "V1V8_OSC_LOCAL_FEED",
    "net": "V1V8",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        -3.49,
        -3
      ],
      [
        -3.6,
        -2.89
      ],
      [
        -3.6,
        -2
      ]
    ],
    "from": "PWR_V2_V1V8_28.inner5",
    "to": "PWR_V2_V1V8_3.inner5"
  }
] as const
const strips=[
  {
    "name": "V1V8_INNER4_LINK_0_BODY",
    "net": "V1V8",
    "layer": "inner4",
    "outline": [
      {
        "x": 2.8000000000000003,
        "y": 5.05
      },
      {
        "x": 2.785297428950566,
        "y": 5.050722290999171
      },
      {
        "x": 2.770736451697581,
        "y": 5.052882207939516
      },
      {
        "x": 2.756457298411831,
        "y": 5.056458949640169
      },
      {
        "x": 2.742597485145237,
        "y": 5.061418070123307
      },
      {
        "x": 2.7292904894761008,
        "y": 5.067711810347747
      },
      {
        "x": 2.71666446504706,
        "y": 5.075279558154619
      },
      {
        "x": 2.704841007375453,
        "y": 5.08404843199559
      },
      {
        "x": 2.693933982822018,
        "y": 5.093933982822018
      },
      {
        "x": 2.6840484319955897,
        "y": 5.1048410073754535
      },
      {
        "x": 2.6752795581546183,
        "y": 5.11666446504706
      },
      {
        "x": 2.667711810347747,
        "y": 5.129290489476101
      },
      {
        "x": 2.6614180701233074,
        "y": 5.142597485145236
      },
      {
        "x": 2.656458949640169,
        "y": 5.156457298411831
      },
      {
        "x": 2.652882207939516,
        "y": 5.170736451697581
      },
      {
        "x": 2.6507222909991706,
        "y": 5.185297428950566
      },
      {
        "x": 2.6500000000000004,
        "y": 5.2
      },
      {
        "x": 2.6507222909991706,
        "y": 5.214702571049434
      },
      {
        "x": 2.652882207939516,
        "y": 5.22926354830242
      },
      {
        "x": 2.656458949640169,
        "y": 5.2435427015881695
      },
      {
        "x": 2.6614180701233074,
        "y": 5.257402514854764
      },
      {
        "x": 2.667711810347747,
        "y": 5.2707095105239
      },
      {
        "x": 2.6752795581546183,
        "y": 5.283335534952941
      },
      {
        "x": 2.6840484319955897,
        "y": 5.295158992624547
      },
      {
        "x": 2.6939339828220183,
        "y": 5.306066017177982
      },
      {
        "x": 2.7048410073754536,
        "y": 5.315951568004411
      },
      {
        "x": 2.71666446504706,
        "y": 5.324720441845382
      },
      {
        "x": 2.7292904894761008,
        "y": 5.332288189652253
      },
      {
        "x": 2.742597485145237,
        "y": 5.338581929876693
      },
      {
        "x": 2.756457298411831,
        "y": 5.343541050359832
      },
      {
        "x": 2.770736451697581,
        "y": 5.347117792060485
      },
      {
        "x": 2.785297428950566,
        "y": 5.349277709000829
      },
      {
        "x": 2.8000000000000003,
        "y": 5.3500000000000005
      },
      {
        "x": 4.4,
        "y": 5.3500000000000005
      },
      {
        "x": 4.4147025710494345,
        "y": 5.349277709000829
      },
      {
        "x": 4.429263548302419,
        "y": 5.347117792060485
      },
      {
        "x": 4.44354270158817,
        "y": 5.343541050359832
      },
      {
        "x": 4.457402514854764,
        "y": 5.338581929876693
      },
      {
        "x": 4.4707095105239,
        "y": 5.332288189652253
      },
      {
        "x": 4.483335534952941,
        "y": 5.324720441845382
      },
      {
        "x": 4.495158992624547,
        "y": 5.315951568004411
      },
      {
        "x": 4.506066017177982,
        "y": 5.306066017177982
      },
      {
        "x": 4.515951568004411,
        "y": 5.295158992624547
      },
      {
        "x": 4.524720441845382,
        "y": 5.283335534952941
      },
      {
        "x": 4.532288189652253,
        "y": 5.2707095105239
      },
      {
        "x": 4.538581929876694,
        "y": 5.257402514854764
      },
      {
        "x": 4.543541050359831,
        "y": 5.2435427015881695
      },
      {
        "x": 4.547117792060485,
        "y": 5.229263548302419
      },
      {
        "x": 4.54927770900083,
        "y": 5.214702571049434
      },
      {
        "x": 4.550000000000001,
        "y": 5.2
      },
      {
        "x": 4.54927770900083,
        "y": 5.185297428950566
      },
      {
        "x": 4.547117792060485,
        "y": 5.170736451697581
      },
      {
        "x": 4.543541050359831,
        "y": 5.156457298411831
      },
      {
        "x": 4.538581929876694,
        "y": 5.142597485145236
      },
      {
        "x": 4.532288189652253,
        "y": 5.129290489476101
      },
      {
        "x": 4.524720441845382,
        "y": 5.11666446504706
      },
      {
        "x": 4.515951568004411,
        "y": 5.1048410073754535
      },
      {
        "x": 4.506066017177982,
        "y": 5.093933982822018
      },
      {
        "x": 4.495158992624547,
        "y": 5.08404843199559
      },
      {
        "x": 4.483335534952941,
        "y": 5.075279558154619
      },
      {
        "x": 4.4707095105239,
        "y": 5.067711810347747
      },
      {
        "x": 4.457402514854764,
        "y": 5.061418070123307
      },
      {
        "x": 4.44354270158817,
        "y": 5.056458949640168
      },
      {
        "x": 4.429263548302419,
        "y": 5.052882207939516
      },
      {
        "x": 4.4147025710494345,
        "y": 5.050722290999171
      },
      {
        "x": 4.4,
        "y": 5.05
      }
    ]
  },
  {
    "name": "V1V8_E14_LINK_BODY",
    "net": "V1V8",
    "layer": "inner4",
    "outline": [
      {
        "x": -3.5578798512195062,
        "y": 3.3006987925431845
      },
      {
        "x": -3.9,
        "y": 2.958578643762691
      },
      {
        "x": -3.9,
        "y": 0.7585786437626952
      },
      {
        "x": -4.329289321881345,
        "y": 0.32928932188134563
      },
      {
        "x": -4.336560671583635,
        "y": 0.3226989546637266
      },
      {
        "x": -4.34444297669804,
        "y": 0.3168530387697458
      },
      {
        "x": -4.3528603263174,
        "y": 0.31180787356516476
      },
      {
        "x": -4.3617316567634905,
        "y": 0.30761204674887155
      },
      {
        "x": -4.370971532274553,
        "y": 0.30430596642677926
      },
      {
        "x": -4.380490967798387,
        "y": 0.30192147195967706
      },
      {
        "x": -4.390198285967044,
        "y": 0.3004815273327804
      },
      {
        "x": -4.3999999999999995,
        "y": 0.30000000000000004
      },
      {
        "x": -4.409801714032956,
        "y": 0.3004815273327803
      },
      {
        "x": -4.419509032201613,
        "y": 0.3019214719596769
      },
      {
        "x": -4.429028467725446,
        "y": 0.304305966426779
      },
      {
        "x": -4.438268343236508,
        "y": 0.30761204674887116
      },
      {
        "x": -4.447139673682599,
        "y": 0.31180787356516426
      },
      {
        "x": -4.45555702330196,
        "y": 0.31685303876974524
      },
      {
        "x": -4.4634393284163645,
        "y": 0.322698954663726
      },
      {
        "x": -4.470710678118655,
        "y": 0.3292893218813449
      },
      {
        "x": -4.477301045336274,
        "y": 0.3365606715836351
      },
      {
        "x": -4.483146961230255,
        "y": 0.34444297669803936
      },
      {
        "x": -4.488192126434836,
        "y": 0.35286032631739983
      },
      {
        "x": -4.492387953251129,
        "y": 0.36173165676349056
      },
      {
        "x": -4.495694033573221,
        "y": 0.3709715322745533
      },
      {
        "x": -4.498078528040323,
        "y": 0.3804909677983867
      },
      {
        "x": -4.49951847266722,
        "y": 0.3901982859670434
      },
      {
        "x": -4.5,
        "y": 0.3999999999999995
      },
      {
        "x": -4.49951847266722,
        "y": 0.4098017140329556
      },
      {
        "x": -4.498078528040324,
        "y": 0.4195090322016124
      },
      {
        "x": -4.495694033573221,
        "y": 0.4290284677254458
      },
      {
        "x": -4.4923879532511295,
        "y": 0.43826834323650854
      },
      {
        "x": -4.488192126434836,
        "y": 0.4471396736825993
      },
      {
        "x": -4.483146961230255,
        "y": 0.4555570233019598
      },
      {
        "x": -4.477301045336274,
        "y": 0.46343932841636415
      },
      {
        "x": -4.470710678118656,
        "y": 0.4707106781186544
      },
      {
        "x": -4.1,
        "y": 0.8414213562373142
      },
      {
        "x": -4.1,
        "y": 3.0414213562373096
      },
      {
        "x": -3.742120148780491,
        "y": 3.3993012074568183
      },
      {
        "x": -3.698058067569092,
        "y": 3.619611613513818
      },
      {
        "x": -3.695663616897878,
        "y": 3.629128549603715
      },
      {
        "x": -3.6923478733008843,
        "y": 3.6383649618376435
      },
      {
        "x": -3.6881427692015207,
        "y": 3.6472318985166536
      },
      {
        "x": -3.6830888020510075,
        "y": 3.655643966193366
      },
      {
        "x": -3.6772346443157837,
        "y": 3.663520152057551
      },
      {
        "x": -3.670636674735048,
        "y": 3.670784604133774
      },
      {
        "x": -3.663358435362679,
        "y": 3.6773673617773883
      },
      {
        "x": -3.6554700196225234,
        "y": 3.6832050294337844
      },
      {
        "x": -3.647047397270406,
        "y": 3.688241387172237
      },
      {
        "x": -3.638171682763851,
        "y": 3.692427932114572
      },
      {
        "x": -3.6289283540855157,
        "y": 3.6957243455443964
      },
      {
        "x": -3.61940642954349,
        "y": 3.6980988811983786
      },
      {
        "x": -3.609697610476327,
        "y": 3.6995286710001167
      },
      {
        "x": -3.599895398119024,
        "y": 3.6999999452922174
      },
      {
        "x": -3.5900941931350157,
        "y": 3.6995081654456237
      },
      {
        "x": -3.5803883864861823,
        "y": 3.698058067569092
      },
      {
        "x": -3.570871450396285,
        "y": 3.695663616897878
      },
      {
        "x": -3.5616350381623567,
        "y": 3.6923478733008843
      },
      {
        "x": -3.5527681014833465,
        "y": 3.6881427692015207
      },
      {
        "x": -3.544356033806634,
        "y": 3.6830888020510075
      },
      {
        "x": -3.536479847942449,
        "y": 3.6772346443157837
      },
      {
        "x": -3.5292153958662262,
        "y": 3.670636674735048
      },
      {
        "x": -3.522632638222612,
        "y": 3.663358435362679
      },
      {
        "x": -3.516794970566216,
        "y": 3.6554700196225234
      },
      {
        "x": -3.511758612827763,
        "y": 3.647047397270406
      },
      {
        "x": -3.507572067885428,
        "y": 3.638171682763851
      },
      {
        "x": -3.5042756544556037,
        "y": 3.6289283540855157
      },
      {
        "x": -3.5019011188016216,
        "y": 3.61940642954349
      },
      {
        "x": -3.5004713289998834,
        "y": 3.609697610476327
      },
      {
        "x": -3.5000000547077827,
        "y": 3.599895398119024
      },
      {
        "x": -3.5004918345543765,
        "y": 3.5900941931350157
      },
      {
        "x": -3.501941932430908,
        "y": 3.5803883864861823
      }
    ]
  }
] as const
export function CloudV1V8PowerRoutes(){return <>
 {vias.map(v=><via key={v.viaName} name={v.viaName} pcbX={v.x} pcbY={v.y} fromLayer={v.layer} toLayer={v.toLayer} holeDiameter={.15} outerDiameter={.30} connectsTo={v.selector}/>)}
 {routes.map(r=><trace key={r.name} name={r.name} from={r.from} to={r.to} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,...r.points.map(([x,y])=>({x,y})),r.to]]}/>)}
 {strips.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo={`net.${p.net}`} clearance={.2} boardEdgeMargin={0} unbroken coveredWithSolderMask outline={p.outline}/>)}
 </>}
