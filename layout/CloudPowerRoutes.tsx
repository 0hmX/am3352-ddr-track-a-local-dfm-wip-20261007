/** Cloud routing candidate. Coordinates are board-space mm, +X right, +Y up.
 * Filled/capped pad-centered vias require fabrication process review.
 * Recompute plane antipads from mounted native geometry; never replay saved fills.
 */
const groundPads = [
  null /* CLOUD_GND_PAD_0: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_1: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_2: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_3: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_4: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_5: native surface link to CLOUD_GND_PAD_12. */,
  null /* CLOUD_GND_PAD_6: native surface link to CLOUD_GND_PAD_14. */,
  null /* CLOUD_GND_PAD_7: native surface link to CLOUD_GND_PAD_70. */,
  null /* CLOUD_GND_PAD_8: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_9: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_10: native surface link to CLOUD_GND_PAD_22. */,
  null /* CLOUD_GND_PAD_11: native surface link to CLOUD_GND_PAD_23. */,
  {
    "selector": ".Processor > .U1 > .K7",
    "x": 0.4,
    "y": -2,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_13: native surface link to CLOUD_GND_PAD_14. */,
  {
    "selector": ".Processor > .U1 > .N7",
    "x": 2.8000000000000003,
    "y": -2,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_15: native surface link to CLOUD_GND_PAD_70. */,
  null /* CLOUD_GND_PAD_16: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_17: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_18: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_19: native surface link to CLOUD_GND_PAD_20. */,
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
  null /* CLOUD_GND_PAD_24: native surface link to CLOUD_GND_PAD_14. */,
  null /* CLOUD_GND_PAD_25: native surface link to CLOUD_GND_PAD_70. */,
  null /* CLOUD_GND_PAD_26: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_27: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_28: native surface link to CLOUD_GND_PAD_21. */,
  null /* CLOUD_GND_PAD_29: native surface link to CLOUD_GND_PAD_22. */,
  null /* CLOUD_GND_PAD_30: native surface link to CLOUD_GND_PAD_31. */,
  {
    "selector": ".Processor > .U1 > .K9",
    "x": 0.4,
    "y": -0.4,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_32: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_33: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_34: native surface link to CLOUD_LOCAL_RETURN_5. */,
  null /* CLOUD_GND_PAD_35: native surface link to CLOUD_GND_PAD_31. */,
  null /* CLOUD_GND_PAD_36: native surface link to CLOUD_GND_PAD_31. */,
  null /* CLOUD_GND_PAD_37: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_38: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_39: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_40: same surface GND reaches a nearby through barrel. */,
  null /* CLOUD_GND_PAD_41: native surface link to CLOUD_LOCAL_RETURN_5. */,
  null /* CLOUD_GND_PAD_42: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_43: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_44: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_45: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_46: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_47: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_48: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_49: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_50: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_51: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_52: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_53: CPU surface GND reaches an existing through barrel. */,
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
  null /* CLOUD_GND_PAD_56: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_57: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_58: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_59: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_60: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_61: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_62: same surface GND reaches a nearby through barrel. */,
  {
    "selector": ".Processor > .C_VDD_MPU_B > .pin2",
    "x": -3.5875,
    "y": -9.5,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  null /* CLOUD_GND_PAD_64: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_65: native surface link to CLOUD_LOCAL_RETURN_5. */,
  null /* CLOUD_GND_PAD_66: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_67: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_68: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_69: native surface link to CLOUD_ETH_RETURN_12. */,
  {
    "selector": ".Processor > .C_VDDS_0 > .pin2",
    "x": -7.26,
    "y": -1,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_71: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_72: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_73: native surface link to CLOUD_ETH_RETURN_12. */,
  null /* CLOUD_GND_PAD_74: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_75: CPU surface GND reaches an existing through barrel. */,
  {
    "selector": ".Processor > .C_SRAM_MPU_B > .pin2",
    "x": 6.5875,
    "y": -0.25,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  null /* CLOUD_GND_PAD_77: extended CPU surface GND reaches a through barrel. */,
  {
    "selector": ".Processor > .C_IO1_B > .pin2",
    "x": -12.5,
    "y": 2.25,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_79: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_80: CPU surface GND reaches an existing through barrel. */,
  {
    "selector": ".Processor > .C_IO2_B > .pin2",
    "x": 0.5000000000000002,
    "y": 11.75,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_82: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_83: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_84: extended CPU surface GND reaches a through barrel. */,
  {
    "selector": ".Processor > .C_IO3_0 > .pin2",
    "x": 13.24,
    "y": -2,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_86: extended CPU surface GND reaches a through barrel. */,
  {
    "selector": ".Processor > .C_IO4_B > .pin2",
    "x": -16,
    "y": -1.25,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_88: native surface link to CLOUD_GND_PAD_249. */,
  null /* CLOUD_GND_PAD_89: CPU surface GND reaches an existing through barrel. */,
  {
    "selector": ".Processor > .C_IO5_B > .pin2",
    "x": 14.95,
    "y": 0.2499999999999998,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_91: extended CPU surface GND reaches a through barrel. */,
  {
    "selector": ".Processor > .C_IO5_1 > .pin2",
    "x": 12.99,
    "y": -4,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  null /* CLOUD_GND_PAD_93: extended CPU surface GND reaches a through barrel. */,
  {
    "selector": ".Processor > .C_IO6_0 > .pin2",
    "x": -12.01,
    "y": -11,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_95: extended CPU surface GND reaches a through barrel. */,
  null /* CLOUD_GND_PAD_96: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_97: extended CPU surface GND reaches a through barrel. */,
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
  null /* CLOUD_GND_PAD_101: extended CPU surface GND reaches a through barrel. */,
  null /* CLOUD_GND_PAD_102: extended CPU surface GND reaches a through barrel. */,
  null /* CLOUD_GND_PAD_103: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_104: extended CPU surface GND reaches a through barrel. */,
  null /* CLOUD_GND_PAD_105: extended CPU surface GND reaches a through barrel. */,
  null /* CLOUD_GND_PAD_106: same surface GND reaches a nearby through barrel. */,
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
  null /* CLOUD_GND_PAD_109: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_110: CPU surface GND reaches an existing through barrel. */,
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
  null /* CLOUD_GND_PAD_114: native surface link to CLOUD_GND_PAD_113. */,
  null /* CLOUD_GND_PAD_115: DDR surface GND reaches an existing through barrel. */,
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
  null /* CLOUD_GND_PAD_120: DDR surface GND reaches an existing through barrel. */,
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
  null /* CLOUD_GND_PAD_126: native surface link to CLOUD_GND_PAD_127. */,
  {
    "selector": ".DDR3 > .U3 > .B9",
    "x": 3.199892,
    "y": -21.800239,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_128: DDR surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_129: DDR surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_130: DDR surface GND reaches an existing through barrel. */,
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
  null /* CLOUD_GND_PAD_133: DDR surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_134: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_135: DDR surface GND reaches an existing through barrel. */,
  {
    "selector": ".DDR3 > .C_VREF_0 > .pin2",
    "x": -7.96,
    "y": -26.6,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  null /* CLOUD_GND_PAD_137: DDR surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_138: native surface link to CLOUD_GND_PAD_12. */,
  {
    "selector": ".DDR3 > .C_VREF_3 > .pin2",
    "x": -10.01,
    "y": -26.75,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_140: DDR surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_141: DDR surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_142: native surface link to CLOUD_GND_PAD_143. */,
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
  null /* CLOUD_GND_PAD_145: native surface link to CLOUD_GND_PAD_144. */,
  null /* CLOUD_GND_PAD_146: native surface link to CLOUD_GND_PAD_147. */,
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
  null /* CLOUD_GND_PAD_150: native surface link to CLOUD_GND_PAD_149. */,
  null /* CLOUD_GND_PAD_151: DDR surface GND reaches an existing through barrel. */,
  {
    "selector": ".DDR3 > .C_RAM_B > .pin2",
    "x": -8.9125,
    "y": -25,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_153: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_154: native surface link to CLOUD_GND_PAD_21. */,
  null /* CLOUD_GND_PAD_155: native surface link to CLOUD_GND_PAD_22. */,
  {
    "selector": ".DDR3 > .C_SOC_DDR_3 > .pin2",
    "x": -9.33,
    "y": -7.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_157: CPU surface GND reaches an existing through barrel. */,
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
  null /* CLOUD_GND_PAD_161: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_162: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_163: CPU surface GND reaches an existing through barrel. */,
  {
    "selector": ".DDR3 > .C_SOC_DDR_11 > .pin2",
    "x": -9.33,
    "y": -5.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_165: native surface link to SYSBOOT4_RETURN_0. */,
  {
    "selector": ".DDR3 > .C_SOC_DDR_13 > .pin2",
    "x": -9.33,
    "y": -12,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_167: CPU surface GND reaches an existing through barrel. */,
  {
    "selector": ".DDR3 > .C_SOC_DDR_15 > .pin2",
    "x": -5.33,
    "y": 5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  null /* CLOUD_GND_PAD_169: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_170: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_171: native surface link to MDIO_I4_RETURN_0. */,
  null /* CLOUD_GND_PAD_172: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_173: same surface GND reaches a nearby through barrel. */,
  null /* CLOUD_GND_PAD_174: CPU surface GND reaches an existing through barrel. */,
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
  null /* CLOUD_GND_PAD_188: extended CPU surface GND reaches a through barrel. */,
  {
    "selector": ".Power_management > .C_PWR2 > .pin2",
    "x": 17.2,
    "y": 3.45,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_190: checked Ethernet surface Ground path. */,
  null /* CLOUD_GND_PAD_191: extended CPU surface GND reaches a through barrel. */,
  null /* CLOUD_GND_PAD_192: checked Ethernet surface Ground path. */,
  null /* CLOUD_GND_PAD_193: extended CPU surface GND reaches a through barrel. */,
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
  null /* CLOUD_GND_PAD_202: extended CPU surface GND reaches a through barrel. */,
  null /* CLOUD_GND_PAD_203: checked PMIC surface Ground path. */,
  {
    "selector": ".Power_management > .C_PWR13 > .pin2",
    "x": 27.025,
    "y": -0.20000000000000012,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_205: checked PMIC surface Ground path. */,
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
  null /* CLOUD_GND_PAD_208: checked PMIC surface Ground path. */,
  null /* CLOUD_GND_PAD_209: native surface link to MPU_GND_RETURN_0. */,
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
  null /* CLOUD_GND_PAD_212: extended CPU surface GND reaches a through barrel. */,
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
  null /* CLOUD_GND_PAD_215: extended CPU surface GND reaches a through barrel. */,
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
  null /* CLOUD_GND_PAD_222: checked PMIC surface Ground path. */,
  {
    "selector": ".Power_management > .C_PWR10_B > .pin2",
    "x": 22.025,
    "y": -9.6,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_224: checked PMIC surface Ground path. */,
  null /* CLOUD_GND_PAD_225: native surface link to SYS4_SHARED_CPU_RETURN. */,
  null /* CLOUD_GND_PAD_226: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_227: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_228: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_229: checked PMIC surface Ground path. */,
  {
    "selector": ".Boot_and_clock > .R_BOOT9 > .pin2",
    "x": 11.91,
    "y": -3.5,
    "fromLayer": "bottom",
    "toLayer": "inner6"
  },
  null /* CLOUD_GND_PAD_231: CPU surface GND reaches an existing through barrel. */,
  null /* CLOUD_GND_PAD_232: extended CPU surface GND reaches a through barrel. */,
  null /* CLOUD_GND_PAD_233: native surface link to SYS8_12_ARRAY_RETURN. */,
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
  null /* CLOUD_GND_PAD_238: DDR surface GND reaches an existing through barrel. */,
  {
    "selector": ".Boot_and_clock > .U_RESET_DELAY > .2",
    "x": -1.1375,
    "y": 18,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  null /* CLOUD_GND_PAD_240: DDR surface GND reaches an existing through barrel. */,
  {
    "selector": ".Boot_and_clock > .C_RESET_DELAY > .pin2",
    "x": -2.99,
    "y": 18,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  null /* CLOUD_GND_PAD_242: extended CPU surface GND reaches a through barrel. */,
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
  null /* CLOUD_GND_PAD_269: CPU surface GND reaches an existing through barrel. */,
  {
    "selector": ".UART_debug > .TP_UART_1 > .1",
    "x": -3,
    "y": 14,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  null /* CLOUD_GND_PAD_271: checked Ethernet surface Ground path. */,
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_LDO_IN > .pin2",
    "x": 37.51,
    "y": 1.25,
    "fromLayer": "top",
    "toLayer": "inner1"
  },
  null /* CLOUD_GND_PAD_273: checked Ethernet surface Ground path. */,
  null /* CLOUD_GND_PAD_274: checked Ethernet surface Ground path. */,
  {
    "selector": ".Ethernet_and_RGB_expansion > .U_ETH_PHY > .21",
    "x": 37.4625,
    "y": 14,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_276: checked Ethernet surface Ground path. */,
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
  null /* CLOUD_GND_PAD_286: checked Ethernet surface Ground path. */,
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
  null /* CLOUD_GND_PAD_289: checked Ethernet surface Ground path. */,
  null /* CLOUD_GND_PAD_290: checked Ethernet surface Ground path. */,
  {
    "selector": ".Ethernet_and_RGB_expansion > .C_ETH_A3 > .pin2",
    "x": 36.2,
    "y": 24.75,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_292: checked Ethernet surface Ground path. */,
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
  null /* CLOUD_GND_PAD_296: checked Ethernet surface Ground path. */,
  null /* CLOUD_GND_PAD_297: checked Ethernet surface Ground path. */,
  null /* CLOUD_GND_PAD_298: checked Ethernet surface Ground path. */,
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
  null /* CLOUD_GND_PAD_301: checked Ethernet surface Ground path. */,
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
  null /* CLOUD_GND_PAD_304: checked HDMI surface Ground path. */,
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
  null /* CLOUD_GND_PAD_313: checked HDMI surface Ground path. */,
  null /* CLOUD_GND_PAD_314: checked HDMI surface Ground path. */,
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
  null /* CLOUD_GND_PAD_321: checked Ethernet surface Ground path. */,
  null /* CLOUD_GND_PAD_322: checked Ethernet surface Ground path. */,
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
  null /* CLOUD_GND_PAD_325: checked Ethernet surface Ground path. */,
  null /* CLOUD_GND_PAD_326: checked Ethernet surface Ground path. */,
  null /* CLOUD_GND_PAD_327: checked Ethernet surface Ground path. */,
  null /* CLOUD_GND_PAD_328: checked PMIC surface Ground path. */,
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
  null /* CLOUD_GND_PAD_343: checked HDMI surface Ground path. */,
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
  null /* CLOUD_GND_PAD_347: checked HDMI surface Ground path. */,
  null /* CLOUD_GND_PAD_348: checked HDMI surface Ground path. */,
  null /* CLOUD_GND_PAD_349: checked HDMI surface Ground path. */,
  null /* CLOUD_GND_PAD_350: checked HDMI surface Ground path. */,
  null /* CLOUD_GND_PAD_351: checked HDMI surface Ground path. */,
  null /* CLOUD_GND_PAD_352: checked HDMI surface Ground path. */,
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
  null /* CLOUD_GND_PAD_356: checked HDMI surface Ground path. */,
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
  null /* CLOUD_GND_PAD_359: checked HDMI surface Ground path. */,
  null /* CLOUD_GND_PAD_360: checked HDMI surface Ground path. */,
  null /* CLOUD_GND_PAD_361: checked HDMI surface Ground path. */,
  {
    "selector": ".HDMI > .R_HDMI_REF_R177 > .pin2",
    "x": 48.51,
    "y": -32.5,
    "fromLayer": "top",
    "toLayer": "bottom"
  },
  null /* CLOUD_GND_PAD_363: checked HDMI surface Ground path. */,
  null /* CLOUD_GND_PAD_364: checked HDMI surface Ground path. */,
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
  null /* CLOUD_GND_PAD_367: checked HDMI surface Ground path. */,
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
  null /* CLOUD_GND_PAD_373: checked HDMI surface Ground path. */,
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
  null /* CLOUD_GND_PAD_379: checked HDMI surface Ground path. */,
  null /* CLOUD_GND_PAD_380: checked HDMI surface Ground path. */,
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
  {groundPads.map((p,i)=>p&&<via key={i} name={`CLOUD_GND_PAD_${i}`} pcbX={p.x} pcbY={p.y} fromLayer={p.fromLayer} toLayer={p.toLayer} holeDiameter={0.15} outerDiameter={0.3} connectsTo={p.selector} />)}
  {[[-26,24],[68,24],[-26,-37],[68,-37]].map(([x,y],i)=><via key={i} name={`CLOUD_GND_STITCH_${i}`} pcbX={x} pcbY={y} fromLayer="top" toLayer="bottom" holeDiameter={0.3} outerDiameter={0.6} connectsTo="net.GND" />)}
 </>
}
