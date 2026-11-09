/** Cloud routing candidate. Coordinates are board-space mm, +X right, +Y up.
 * Filled/capped pad-centered vias require fabrication process review.
 * Recompute plane antipads from mounted native geometry; never replay saved fills.
 */
const groundPads = [
  {
    "selector": ".Processor > .U1 > .A1",
    "x": -6.800000000000001,
    "y": -6.800000000000001,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .V1",
    "x": 6.800000000000001,
    "y": -6.800000000000001,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .A5",
    "x": -6.800000000000001,
    "y": -3.6,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .B6",
    "x": -6,
    "y": -2.8000000000000003,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .H6",
    "x": -1.2000000000000002,
    "y": -2.8000000000000003,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .J6",
    "x": -0.4,
    "y": -2.8000000000000003,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .M6",
    "x": 2,
    "y": -2.8000000000000003,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .A7",
    "x": -6.800000000000001,
    "y": -2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .B7",
    "x": -6,
    "y": -2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .C7",
    "x": -5.2,
    "y": -2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .H7",
    "x": -1.2000000000000002,
    "y": -2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .J7",
    "x": -0.4,
    "y": -2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .K7",
    "x": 0.4,
    "y": -2,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .U1 > .M7",
    "x": 2,
    "y": -2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .N7",
    "x": 2.8000000000000003,
    "y": -2,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .U1 > .A8",
    "x": -6.800000000000001,
    "y": -1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .B8",
    "x": -6,
    "y": -1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .C8",
    "x": -5.2,
    "y": -1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .D8",
    "x": -4.4,
    "y": -1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .E8",
    "x": -3.6,
    "y": -1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .F8",
    "x": -2.8000000000000003,
    "y": -1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .U1 > .G8",
    "x": -2,
    "y": -1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .U1 > .H8",
    "x": -1.2000000000000002,
    "y": -1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .U1 > .J8",
    "x": -0.4,
    "y": -1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .U1 > .M8",
    "x": 2,
    "y": -1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .A9",
    "x": -6.800000000000001,
    "y": -0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .B9",
    "x": -6,
    "y": -0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .C9",
    "x": -5.2,
    "y": -0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .G9",
    "x": -2,
    "y": -0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .H9",
    "x": -1.2000000000000002,
    "y": -0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .J9",
    "x": -0.4,
    "y": -0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .K9",
    "x": 0.4,
    "y": -0.4,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .U1 > .M9",
    "x": 2,
    "y": -0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .H10",
    "x": -1.2000000000000002,
    "y": 0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .J10",
    "x": -0.4,
    "y": 0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .K10",
    "x": 0.4,
    "y": 0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .L10",
    "x": 1.2000000000000002,
    "y": 0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .M10",
    "x": 2,
    "y": 0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .N10",
    "x": 2.8000000000000003,
    "y": 0.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .G11",
    "x": -2,
    "y": 1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .J11",
    "x": -0.4,
    "y": 1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .K11",
    "x": 0.4,
    "y": 1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .L11",
    "x": 1.2000000000000002,
    "y": 1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .N11",
    "x": 2.8000000000000003,
    "y": 1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .V11",
    "x": 6.800000000000001,
    "y": 1.2000000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .G12",
    "x": -2,
    "y": 2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .H12",
    "x": -1.2000000000000002,
    "y": 2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .L12",
    "x": 1.2000000000000002,
    "y": 2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .M12",
    "x": 2,
    "y": 2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .L13",
    "x": 1.2000000000000002,
    "y": 2.8000000000000003,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .M14",
    "x": 2,
    "y": 3.6,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .N14",
    "x": 2.8000000000000003,
    "y": 3.6,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .A18",
    "x": -6.800000000000001,
    "y": 6.800000000000001,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .U1 > .V18",
    "x": 6.800000000000001,
    "y": 6.800000000000001,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .C_VDD_CORE_B > .pin2",
    "x": -8.4125,
    "y": 5.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .C_VDD_CORE_0 > .pin2",
    "x": -4.76,
    "y": 6,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDD_CORE_1 > .pin2",
    "x": -2.76,
    "y": 6,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDD_CORE_2 > .pin2",
    "x": 0.49,
    "y": 4,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDD_CORE_3 > .pin2",
    "x": 2.99,
    "y": 6.03,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDD_CORE_4 > .pin2",
    "x": 3.49,
    "y": 7.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDD_CORE_5 > .pin2",
    "x": 5.49,
    "y": 5.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDD_CORE_6 > .pin2",
    "x": 7.99,
    "y": 5.75,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDD_CORE_7 > .pin2",
    "x": -5.51,
    "y": 7.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDD_MPU_B > .pin2",
    "x": -3.5875,
    "y": -9.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Processor > .C_VDD_MPU_0 > .pin2",
    "x": -2.01,
    "y": 2,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDD_MPU_1 > .pin2",
    "x": 0.475,
    "y": 1.8,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDD_MPU_2 > .pin2",
    "x": 2.99,
    "y": 2,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDD_MPU_3 > .pin2",
    "x": 3.49,
    "y": 4,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDD_MPU_4 > .pin2",
    "x": 5.49,
    "y": 4,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDS_B > .pin2",
    "x": 7.5875,
    "y": 1.75,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDS_0 > .pin2",
    "x": -7.26,
    "y": -1,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .C_VDDS_1 > .pin2",
    "x": -4.51,
    "y": 2,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDS_2 > .pin2",
    "x": -1.76,
    "y": 0,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDS_3 > .pin2",
    "x": 7.74,
    "y": 3.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_SRAM_CORE_B > .pin2",
    "x": 2.5875,
    "y": -0.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_SRAM_CORE_0 > .pin2",
    "x": 5.24,
    "y": 2,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_SRAM_MPU_B > .pin2",
    "x": 6.5875,
    "y": -0.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_SRAM_MPU_0 > .pin2",
    "x": 11.24,
    "y": 2.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO1_B > .pin2",
    "x": -12.5,
    "y": 2.25,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .C_IO1_0 > .pin2",
    "x": -5.26,
    "y": 4,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO1_1 > .pin2",
    "x": -7.01,
    "y": -2.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO2_B > .pin2",
    "x": 0.5000000000000002,
    "y": 11.75,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .C_IO2_0 > .pin2",
    "x": 5.24,
    "y": -2.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO2_1 > .pin2",
    "x": 5.99,
    "y": 6.75,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO3_B > .pin2",
    "x": 10.25,
    "y": 10.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO3_0 > .pin2",
    "x": 13.24,
    "y": -2,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .C_IO3_1 > .pin2",
    "x": -12.01,
    "y": -4,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO4_B > .pin2",
    "x": -16,
    "y": -1.25,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .C_IO4_0 > .pin2",
    "x": -9.51,
    "y": -2.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO4_1 > .pin2",
    "x": -2.51,
    "y": 4,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO5_B > .pin2",
    "x": 14.95,
    "y": 0.2499999999999998,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .C_IO5_0 > .pin2",
    "x": 11.24,
    "y": 3.75,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO5_1 > .pin2",
    "x": 12.99,
    "y": -4,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO6_B > .pin2",
    "x": 14.5,
    "y": 6,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO6_0 > .pin2",
    "x": -12.01,
    "y": -11,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Processor > .C_IO6_1 > .pin2",
    "x": -12.01,
    "y": -5.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO6_2 > .pin2",
    "x": -9.51,
    "y": -1,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO6_3 > .pin2",
    "x": -12.01,
    "y": -7,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO6_4 > .pin2",
    "x": 12.99,
    "y": -7,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_IO6_5 > .pin2",
    "x": 12.99,
    "y": -5.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDS_PLL_DDR > .pin2",
    "x": 12.99,
    "y": -11,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDS_PLL_CORE_LCD > .pin2",
    "x": 12.99,
    "y": -12.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDS_PLL_MPU > .pin2",
    "x": -12.01,
    "y": -9.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDS_OSC > .pin2",
    "x": -4.51,
    "y": -3,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDS_RTC > .pin2",
    "x": -12.01,
    "y": -8.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDA1P8V_USB0 > .pin2",
    "x": 4.49,
    "y": 8.2,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDA1P8V_USB1 > .pin2",
    "x": 2.99,
    "y": -2.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDA3P3V_USB0 > .pin2",
    "x": 5.24,
    "y": -3.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_VDDA3P3V_USB1 > .pin2",
    "x": 12.99,
    "y": -9.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_CAP_VDD_SRAM_CORE > .pin2",
    "x": -4.45,
    "y": -0.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_CAP_VDD_SRAM_MPU > .pin2",
    "x": -0.7,
    "y": 6.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Processor > .C_CAP_VBB_MPU > .pin2",
    "x": -11.5,
    "y": -1.2,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .U3 > .B1",
    "x": -3.199892,
    "y": -21.800239,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .D1",
    "x": -3.199892,
    "y": -23.400185,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .U3 > .E1",
    "x": -3.199892,
    "y": -24.200031,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .G1",
    "x": -3.199892,
    "y": -25.800231,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .M1",
    "x": -3.199892,
    "y": -29.800223,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .P1",
    "x": -3.199892,
    "y": -31.400168999999998,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .T1",
    "x": -3.199892,
    "y": -33.000115,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .E2",
    "x": -2.400046,
    "y": -24.200031,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .J2",
    "x": -2.400046,
    "y": -27.400177,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .B3",
    "x": -1.599946,
    "y": -21.800239,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .U3 > .D8",
    "x": 2.400046,
    "y": -23.400185,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .U3 > .E8",
    "x": 2.400046,
    "y": -24.200031,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .U3 > .G8",
    "x": 2.400046,
    "y": -25.800231,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .U3 > .J8",
    "x": 2.400046,
    "y": -27.400177,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .A9",
    "x": 3.199892,
    "y": -21.000139,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .B9",
    "x": 3.199892,
    "y": -21.800239,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .U3 > .F9",
    "x": 3.199892,
    "y": -25.000131,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .G9",
    "x": 3.199892,
    "y": -25.800231,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .M9",
    "x": 3.199892,
    "y": -29.800223,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".DDR3 > .U3 > .P9",
    "x": 3.199892,
    "y": -31.400168999999998,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .U3 > .T9",
    "x": 3.199892,
    "y": -33.000115,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .R_DDR_ZQ > .pin2",
    "x": 5.99,
    "y": -29.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .R_DDR_VTP > .pin2",
    "x": -8.51,
    "y": -3.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .R_VREF_BOT > .pin2",
    "x": -9.76,
    "y": -23.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_VREF_0 > .pin2",
    "x": -7.96,
    "y": -26.6,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_VREF_1 > .pin2",
    "x": 5.29,
    "y": -30.55,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_VREF_2 > .pin2",
    "x": 0.99,
    "y": -2.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_VREF_3 > .pin2",
    "x": -10.01,
    "y": -26.75,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_RAM_0 > .pin2",
    "x": -0.33,
    "y": -32.4,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_RAM_1 > .pin2",
    "x": 0.07,
    "y": -31.6,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_RAM_2 > .pin2",
    "x": -0.33,
    "y": -30.6,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_RAM_3 > .pin2",
    "x": -0.33,
    "y": -29.6,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_RAM_4 > .pin2",
    "x": 5.27,
    "y": -28.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_RAM_5 > .pin2",
    "x": 5.27,
    "y": -27.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_RAM_6 > .pin2",
    "x": 5.27,
    "y": -26.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_RAM_7 > .pin2",
    "x": 5.27,
    "y": -25.7,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_RAM_8 > .pin2",
    "x": 5.27,
    "y": -24.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_RAM_9 > .pin2",
    "x": 5.27,
    "y": -23.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_RAM_10 > .pin2",
    "x": 5.27,
    "y": -22.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_RAM_11 > .pin2",
    "x": 5.27,
    "y": -21.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_RAM_B > .pin2",
    "x": -8.9125,
    "y": -25,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_0 > .pin2",
    "x": -3.83,
    "y": -2,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_1 > .pin2",
    "x": -2.33,
    "y": -2,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_2 > .pin2",
    "x": -0.8300000000000001,
    "y": -2,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_3 > .pin2",
    "x": -9.33,
    "y": -7.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_4 > .pin2",
    "x": 8.67,
    "y": -8.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_5 > .pin2",
    "x": -9.33,
    "y": -9,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_6 > .pin2",
    "x": -9.33,
    "y": -6.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_7 > .pin2",
    "x": -9.33,
    "y": -10.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_8 > .pin2",
    "x": 4.67,
    "y": 1,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_9 > .pin2",
    "x": -5.33,
    "y": 3,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_10 > .pin2",
    "x": -3.33,
    "y": 3,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_11 > .pin2",
    "x": -9.33,
    "y": -5.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_12 > .pin2",
    "x": 0.6699999999999999,
    "y": 3,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_13 > .pin2",
    "x": -9.33,
    "y": -12,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_14 > .pin2",
    "x": 4.67,
    "y": 3,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_15 > .pin2",
    "x": -5.33,
    "y": 5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_16 > .pin2",
    "x": -3.33,
    "y": 5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_17 > .pin2",
    "x": -1.33,
    "y": 5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_18 > .pin2",
    "x": 1.8250000000000002,
    "y": 5.33,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_19 > .pin2",
    "x": 2.67,
    "y": 5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_B0 > .pin2",
    "x": 7.5875,
    "y": -3.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_SOC_DDR_B1 > .pin2",
    "x": 7.5875,
    "y": -7,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".DDR3 > .C_RAM_B1 > .pin2",
    "x": -8.9125,
    "y": -29,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .U_PMIC > .9",
    "x": 18.0625,
    "y": -3,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_PMIC > .20",
    "x": 21.6,
    "y": -4.9375,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_PMIC > .21",
    "x": 22,
    "y": -4.9375,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_PMIC > .22",
    "x": 22.4,
    "y": -4.9375,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_PMIC > .23",
    "x": 22.8,
    "y": -4.9375,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_PMIC > .24",
    "x": 23.2,
    "y": -4.9375,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .U_PMIC > .25",
    "x": 23.9375,
    "y": -4.2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_PMIC > .27",
    "x": 23.9375,
    "y": -3.4,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_PMIC > .30",
    "x": 23.9375,
    "y": -2.2,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .U_PMIC > .31",
    "x": 23.9375,
    "y": -1.8,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .U_PMIC > .32",
    "x": 23.9375,
    "y": -1.4,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .U_PMIC > .33",
    "x": 23.9375,
    "y": -1,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .C_PWR1 > .pin2",
    "x": 12.9,
    "y": -0.04999999999999982,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .C_PWR2 > .pin2",
    "x": 17.2,
    "y": 3.45,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .C_PWR3 > .pin2",
    "x": 28.7,
    "y": 3.3,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .C_PWR4 > .pin2",
    "x": 13.4,
    "y": -4.45,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .C_PWR5 > .pin2",
    "x": 26.35,
    "y": -0.1499999999999999,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .C_PWR6 > .pin2",
    "x": 14.39,
    "y": -2.22,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .C_PWR7_B > .pin2",
    "x": 17,
    "y": 14.05,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .C_PWR7 > .pin2",
    "x": 13.7,
    "y": 14.05,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .C_PWR8_B > .pin2",
    "x": 23.6,
    "y": 14.05,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .C_PWR8 > .pin2",
    "x": 20.3,
    "y": 14.05,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .C_PWR9_B > .pin2",
    "x": 30.2,
    "y": 14.05,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .C_PWR9 > .pin2",
    "x": 26.9,
    "y": 14.05,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .C_PWR10 > .pin2",
    "x": 20.45,
    "y": -10.125,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .C_PWR11 > .pin2",
    "x": 24.01,
    "y": -6.25,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .C_PWR12_B > .pin2",
    "x": 10.35,
    "y": -2.2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .C_PWR12 > .pin2",
    "x": 17.5,
    "y": -6.3,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Power_management > .C_PWR13 > .pin2",
    "x": 27.025,
    "y": -0.20000000000000012,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .R_PWR1 > .pin2",
    "x": 20.4,
    "y": -4.29,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Power_management > .SW_PWR1 > .2",
    "x": 20.4,
    "y": -25.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .SW_PWR1 > .pin2_internal_1",
    "x": 27.6,
    "y": -25.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .R_RTC_LDO > .pin2",
    "x": 19.51,
    "y": -15.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .C_RTC_LDO > .pin2",
    "x": -7.7,
    "y": -6.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Power_management > .R_RTC_WAKE > .pin2",
    "x": 20.51,
    "y": -18.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .R_PMIC_EN > .pin2",
    "x": 27.91,
    "y": -17.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_RTC_RESET_DELAY > .4",
    "x": 8.6,
    "y": 9.525,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_RTC_RESET_DELAY > .5",
    "x": 11.4,
    "y": 9.525,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .U_RTC_RESET_DELAY > .6",
    "x": 11.4,
    "y": 10.175,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .U_RTC_RESET_DELAY > .9",
    "x": 10,
    "y": 10.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_RTC_RESET_DELAY > .9",
    "x": 9.675,
    "y": 9.2125,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_RTC_RESET_DELAY > .9",
    "x": 9.675,
    "y": 11.7875,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_RTC_RESET_DELAY > .9",
    "x": 10.325,
    "y": 9.2125,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_RTC_RESET_DELAY > .9",
    "x": 10.325,
    "y": 11.7875,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .U_RTC_POR_GATE > .3",
    "x": 4.3625,
    "y": 9.55,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .C_RTC_RESET_BYP > .pin2",
    "x": 17.01,
    "y": -15.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .C_RTC_GATE_BYP > .pin2",
    "x": 17.76,
    "y": -17,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_management > .C_PWR10_B > .pin2",
    "x": 22.025,
    "y": -9.6,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_management > .C_PWR10_C > .pin2",
    "x": 24.975,
    "y": -6.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Boot_and_clock > .R_BOOT3 > .pin2",
    "x": 5.5,
    "y": -8.09,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Boot_and_clock > .R_BOOT5 > .pin2",
    "x": 6.51,
    "y": -12,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Boot_and_clock > .R_BOOT6 > .pin2",
    "x": 2.14,
    "y": -4,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Boot_and_clock > .R_BOOT7 > .pin2",
    "x": 9.61,
    "y": -13.05,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Boot_and_clock > .R_BOOT8 > .pin2",
    "x": 10.61,
    "y": -11.95,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Boot_and_clock > .R_BOOT9 > .pin2",
    "x": 11.91,
    "y": -3.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Boot_and_clock > .R_BOOT10 > .pin2",
    "x": 9.5,
    "y": -6.59,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Boot_and_clock > .R_BOOT11 > .pin2",
    "x": 6.51,
    "y": -13.25,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Boot_and_clock > .R_BOOT12 > .pin2",
    "x": 8.5,
    "y": -6.59,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Boot_and_clock > .R_BOOT13 > .pin2",
    "x": 9.11,
    "y": -15,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Boot_and_clock > .R_BOOT15 > .pin2",
    "x": 10.16,
    "y": -1.9,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Boot_and_clock > .Y_SOC > .2",
    "x": 8.049999999999999,
    "y": -10.575,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Boot_and_clock > .C_SOC_CLOCK > .pin2",
    "x": 7.01,
    "y": -14.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Boot_and_clock > .U_CLOCK_GATE > .3",
    "x": 3.8625,
    "y": -17.95,
    "fromLayer": "top",
    "toLayer": "inner3"
  },
  {
    "selector": ".Boot_and_clock > .U_RESET_DELAY > .2",
    "x": -1.1375,
    "y": 18,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Boot_and_clock > .C_CLOCK_GATE > .pin2",
    "x": 8.709999999999999,
    "y": -17,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Boot_and_clock > .C_RESET_DELAY > .pin2",
    "x": -2.99,
    "y": 18,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Boot_and_clock > .R_CLOCK_OE_PD > .pin2",
    "x": 3.49,
    "y": -14.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".microSD > .J_MICROSD > .6",
    "x": -11.674999999999997,
    "y": -10.775000000000002,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".microSD > .J_MICROSD > .10",
    "x": -22.174999999999997,
    "y": -6.674999999999999,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".microSD > .J_MICROSD > .SH",
    "x": -15.974999999999998,
    "y": -6.675000000000001,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".microSD > .J_MICROSD > .pin11_internal_1",
    "x": -26.324999999999996,
    "y": -6.674999999999999,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".microSD > .J_MICROSD > .pin11_internal_2",
    "x": -11.675,
    "y": -17.825000000000003,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".microSD > .J_MICROSD > .pin11_internal_3",
    "x": -26.775,
    "y": -20.174999999999997,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".microSD > .C_SD_HF > .pin2",
    "x": -9.49,
    "y": -3.25,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".microSD > .C_SD_BULK > .pin2",
    "x": -8.925,
    "y": -4.75,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_input > .J_POWER > .A1",
    "x": 29.2,
    "y": 19.145,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_input > .J_POWER > .A12",
    "x": 22.8,
    "y": 19.145,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_input > .U_TYPEC > .3",
    "x": 18.4,
    "y": 21.675,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_input > .U_TYPEC > .10",
    "x": 19.2,
    "y": 23.325,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_input > .U_TYPEC > .11",
    "x": 18.8,
    "y": 23.325,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_input > .U_TYPEC_NOR > .2",
    "x": 14.8625,
    "y": 19.1,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_input > .U_INPUT_EFUSE > .8",
    "x": 14.95,
    "y": 23.25,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_input > .U_INPUT_EFUSE > .9",
    "x": 14,
    "y": 22.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_input > .R_TYPEC_ENABLE_PD > .pin2",
    "x": 11.26,
    "y": 20,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_input > .R_INPUT_LIMIT > .pin2",
    "x": 13.75,
    "y": 24.49,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_input > .C_INPUT_DVDT > .pin2",
    "x": 11.51,
    "y": 23,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_input > .C_RAW_TYPEC > .pin2",
    "x": 16.75,
    "y": 23.01,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_input > .C_RAW_NOR > .pin2",
    "x": 13.31,
    "y": 19.1,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_input > .C_RAW_EFUSE > .pin2",
    "x": 11.51,
    "y": 21.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Power_input > .C_EFUSE_OUT > .pin2",
    "x": 27.325,
    "y": -6,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Power_input > .R_SYS_BLEED > .pin2",
    "x": 12.01,
    "y": -14.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Debug_and_reset > .R_TRST_N > .pin2",
    "x": -17.49,
    "y": 13,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Debug_and_reset > .SW_RESET > .2",
    "x": -12.6,
    "y": 11.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Debug_and_reset > .SW_RESET > .pin2_internal_1",
    "x": -5.4,
    "y": 11.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".UART_debug > .TP_UART_1 > .1",
    "x": -3,
    "y": 14,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_LDO > .2",
    "x": 38.3625,
    "y": 6.25,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_LDO_IN > .pin2",
    "x": 37.51,
    "y": 1.25,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_LDO_OUT > .pin2",
    "x": 42.4,
    "y": 7.66,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_PHY > .9",
    "x": 40.5375,
    "y": 14,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_PHY > .21",
    "x": 37.4625,
    "y": 14,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_PHY > .25",
    "x": 39,
    "y": 14,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .R_ETH_STRAP0 > .pin2",
    "x": 36.51,
    "y": 20,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .R_ETH_STRAP1 > .pin2",
    "x": 38.76,
    "y": 20,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .R_ETH_STRAP2 > .pin2",
    "x": 40.86,
    "y": 20,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .R_ETH_STRAP3 > .pin2",
    "x": 39.26,
    "y": 9.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .R_ETH_STRAP4 > .pin2",
    "x": 42.51,
    "y": 22.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .R_ETH_STRAP5 > .pin2",
    "x": 42.51,
    "y": 16.75,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .R_ETH_BIAS > .pin2",
    "x": 40.26,
    "y": 16.8,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .Y_ETH > .2",
    "x": 39.95,
    "y": 22.25,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_OSC > .pin2",
    "x": 36.51,
    "y": 23,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_RESET > .2",
    "x": 33.8625,
    "y": 5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_RESET > .pin2",
    "x": 38.76,
    "y": 3.75,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_A0 > .pin2",
    "x": 39.24,
    "y": 10.9,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_A1 > .pin2",
    "x": 42.51,
    "y": 11.25,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_A2 > .pin2",
    "x": 42.51,
    "y": 8.6,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_A3 > .pin2",
    "x": 36.2,
    "y": 24.75,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_IO0 > .pin2",
    "x": 34.49,
    "y": 15.6,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_IO1 > .pin2",
    "x": 32.49,
    "y": 16.1,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_IO2 > .pin2",
    "x": 36.51,
    "y": 21.25,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_IO3 > .pin2",
    "x": 50.2,
    "y": 5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_CT_TX_100N > .pin2",
    "x": 41.74,
    "y": 20,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_CT_TX_1U > .pin2",
    "x": 41.74,
    "y": 21.25,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_CT_RX_100N > .pin2",
    "x": 41.74,
    "y": 18,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_CT_RX_1U > .pin2",
    "x": 39.74,
    "y": 18,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ESD > .3",
    "x": 41.815000000000005,
    "y": 14,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ESD > .8",
    "x": 42.585,
    "y": 14,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_CHASSIS > .pin2",
    "x": 56.775,
    "y": 4.3,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .R_ETH_CHASSIS > .pin2",
    "x": 58.4625,
    "y": 0.75,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_RAMP > .2",
    "x": 41.8625,
    "y": -8.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_RAMP_CT > .pin2",
    "x": 43.51,
    "y": -10.75,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO0 > .10",
    "x": 36.1,
    "y": -5.925,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_ISO0 > .pin2",
    "x": 39.24,
    "y": 1.25,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .4",
    "x": 45.1,
    "y": -2.025,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .5",
    "x": 45.1,
    "y": -2.675,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .6",
    "x": 45.1,
    "y": -3.325,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .7",
    "x": 45.1,
    "y": -3.975,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .8",
    "x": 45.1,
    "y": -4.625,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .9",
    "x": 45.1,
    "y": -5.275,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .10",
    "x": 45.1,
    "y": -5.925,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .11",
    "x": 50.9,
    "y": -5.925,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .12",
    "x": 50.9,
    "y": -5.275,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .13",
    "x": 50.9,
    "y": -4.625,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .14",
    "x": 50.9,
    "y": -3.975,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .15",
    "x": 50.9,
    "y": -3.325,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO1 > .16",
    "x": 50.9,
    "y": -2.675,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_ISO1 > .pin2",
    "x": 51.51,
    "y": 1.25,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_ISO_OE > .3",
    "x": 41.8625,
    "y": 1.55,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_ISO_OE > .pin2",
    "x": 53.76,
    "y": -1,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_RMII_RETURN_A > .pin1",
    "x": 21,
    "y": 13.01,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_RMII_RETURN_B > .pin1",
    "x": 16.1,
    "y": 13.01,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_RMII_RETURN_C > .pin1",
    "x": 25.810000000000002,
    "y": 10,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_RMII_RETURN_D > .pin1",
    "x": 32.26,
    "y": 3.765,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Debug_status > .TP_DBG_GND > .GND",
    "x": 29.325,
    "y": -6,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".Debug_status > .U_PG_LED > .GND",
    "x": -5.15,
    "y": 18.9,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Debug_status > .C_PG_LED > .pin2",
    "x": -6.6,
    "y": 19,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".Debug_status > .R_PG_PULLDOWN > .pin2",
    "x": -3.75,
    "y": 16.2,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".HDMI > .U_HDMI > .2",
    "x": 39.75007,
    "y": -31.20008,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .U_HDMI > .3",
    "x": 40.249942,
    "y": -31.20008,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .U_HDMI > .4",
    "x": 40.750068,
    "y": -31.20008,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .U_HDMI > .5",
    "x": 41.24994,
    "y": -31.20008,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .U_HDMI > .6",
    "x": 41.750066,
    "y": -31.20008,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .U_HDMI > .7",
    "x": 42.249938,
    "y": -31.20008,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .U_HDMI > .65",
    "x": 43,
    "y": -26.75,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C144 > .pin2",
    "x": 48.01,
    "y": -35.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C145 > .pin2",
    "x": 53.5,
    "y": -19.49,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C146 > .pin2",
    "x": 51.01,
    "y": -17,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C147 > .pin2",
    "x": 43.51,
    "y": -32.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C148 > .pin2",
    "x": 47.5,
    "y": -17.99,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C149 > .pin2",
    "x": 46.51,
    "y": -21,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C150 > .pin2",
    "x": 37,
    "y": -25.99,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C151 > .pin2",
    "x": 44.51,
    "y": -21,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C176 > .pin1",
    "x": 46.5875,
    "y": -16.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C177 > .pin2",
    "x": 44.5,
    "y": -32.49,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C178 > .pin2",
    "x": 43.9,
    "y": -29.99,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C179 > .pin2",
    "x": 49,
    "y": -28.99,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C180 > .pin2",
    "x": 49.5,
    "y": -30.99,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C181 > .pin2",
    "x": 52.5,
    "y": -32.49,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C182 > .pin2",
    "x": 49,
    "y": -26.99,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C183 > .pin2",
    "x": 49,
    "y": -24.99,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C184 > .pin2",
    "x": 49,
    "y": -22.99,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C185 > .pin2",
    "x": 42.5,
    "y": -19.99,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C186 > .pin2",
    "x": 48.51,
    "y": -15,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C187 > .pin2",
    "x": 39.51,
    "y": -32.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C188 > .pin2",
    "x": 47.5,
    "y": -19.99,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .C_HDMI_REF_C193 > .pin2",
    "x": 46.51,
    "y": -18,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .R_HDMI_REF_R176 > .pin2",
    "x": 44.51,
    "y": -18,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .R_HDMI_REF_R177 > .pin2",
    "x": 48.51,
    "y": -32.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .R_HDMI_REF_R181 > .pin2",
    "x": 41.5,
    "y": -19.99,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .R_HDMI_REF_R188 > .pin1",
    "x": 46.99,
    "y": -36.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .U_HDMI_1V2 > .2",
    "x": 49.2,
    "y": -19.75,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .U_HDMI_RESET > .3",
    "x": 36.2,
    "y": -18.45,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_1V2_IN > .pin2",
    "x": 48,
    "y": -19.810000000000002,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".HDMI > .C_HDMI_1V2_EN > .pin2",
    "x": 49.99,
    "y": -16,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_RESET_DECOUPLE > .pin2",
    "x": 38.01,
    "y": -15,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .U_HDMI_ESD > .6",
    "x": 55.55,
    "y": -29.2,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .C_HDMI_ESD_SUPPLY > .pin2",
    "x": 56.01,
    "y": -31.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_ESD_OUT > .pin2",
    "x": 58.01,
    "y": -31.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .R_HDMI_UTILITY > .pin2",
    "x": 53.8,
    "y": -30.860000000000003,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .J_HDMI > .2",
    "x": 59.69,
    "y": -24.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .J_HDMI > .5",
    "x": 59.69,
    "y": -26,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .J_HDMI > .8",
    "x": 59.69,
    "y": -27.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .J_HDMI > .11",
    "x": 59.69,
    "y": -29,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .J_HDMI > .17",
    "x": 59.69,
    "y": -32,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .U_HDMI_5V_BOOST > .6",
    "x": 59.74,
    "y": -13.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  {
    "selector": ".HDMI > .R_HDMI_5V_BOTTOM > .pin2",
    "x": 58.5,
    "y": -15.01,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  {
    "selector": ".HDMI > .C_HDMI_5V_IN > .pin2",
    "x": 53.775,
    "y": -12.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_5V_OUT1 > .pin2",
    "x": 58.25,
    "y": -7.275,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_5V_OUT2 > .pin2",
    "x": 57.75,
    "y": -18.225,
    "fromLayer": "top",
    "toLayer": "bottom"
  }
] as const

const groundRegions=[
  {
    "outline": [
      {
        "x": -27.7,
        "y": 21.27
      },
      {
        "x": -27.7,
        "y": 26.2
      },
      {
        "x": 69.7,
        "y": 26.2
      },
      {
        "x": 69.7,
        "y": 21.27
      },
      {
        "x": 60.265,
        "y": 21.27
      },
      {
        "x": 60.265,
        "y": 23.145
      },
      {
        "x": 56.515,
        "y": 23.145
      },
      {
        "x": 56.515,
        "y": 21.27
      }
    ]
  },
  {
    "outline": [
      {
        "x": -27.7,
        "y": 18.755
      },
      {
        "x": -27.7,
        "y": 21.27
      },
      {
        "x": 56.515,
        "y": 21.27
      },
      {
        "x": 56.515,
        "y": 19.395
      },
      {
        "x": 60.265,
        "y": 19.395
      },
      {
        "x": 60.265,
        "y": 21.27
      },
      {
        "x": 69.7,
        "y": 21.27
      },
      {
        "x": 69.7,
        "y": 18.755
      },
    ]
  },
  {
    "outline": [
      {
        "x": -27.7,
        "y": 9.84
      },
      {
        "x": -27.7,
        "y": 18.755
      },
      {
        "x": 69.7,
        "y": 18.755
      },
      {
        "x": 69.7,
        "y": 9.84
      },
      {
        "x": 60.265,
        "y": 9.84
      },
      {
        "x": 60.265,
        "y": 11.715
      },
      {
        "x": 56.515,
        "y": 11.715
      },
      {
        "x": 56.515,
        "y": 9.84
      }
    ]
  },
  {
    "outline": [
      {
        "x": -27.7,
        "y": -38.7
      },
      {
        "x": -27.7,
        "y": 9.84
      },
      {
        "x": 56.515,
        "y": 9.84
      },
      {
        "x": 56.515,
        "y": 7.965
      },
      {
        "x": 60.265,
        "y": 7.965
      },
      {
        "x": 60.265,
        "y": 9.84
      },
      {
        "x": 69.7,
        "y": 9.84
      },
      {
        "x": 69.7,
        "y": -38.7
      }
    ]
  }
] as const
export function CloudPowerRoutes() {
 return <>
  {(['inner1','inner3','inner6'] as const).flatMap(layer=>groundRegions.map((r,i)=><copperpour key={`${layer}_${i}`} name={`CLOUD_GND_${layer}_${i}`} layer={layer} connectsTo="net.GND" unbroken clearance={0.2} boardEdgeMargin={0} coveredWithSolderMask outline={r.outline}/>))}
  {groundPads.map((p,i)=><via key={i} name={`CLOUD_GND_PAD_${i}`} pcbX={p.x} pcbY={p.y} fromLayer={p.fromLayer} toLayer={p.toLayer} holeDiameter={0.15} outerDiameter={0.3} connectsTo={p.selector} />)}
  {[[-26,24],[68,24],[-26,-37],[68,-37]].map(([x,y],i)=><via key={i} name={`CLOUD_GND_STITCH_${i}`} pcbX={x} pcbY={y} fromLayer="top" toLayer="bottom" holeDiameter={0.3} outerDiameter={0.6} connectsTo="net.GND" />)}
 </>
}
