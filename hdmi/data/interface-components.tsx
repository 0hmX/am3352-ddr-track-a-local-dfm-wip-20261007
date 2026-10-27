const data = [
  {
    "name": "U_HDMI",
    "kind": "chip",
    "value": "IT66122FN/CX",
    "connections": {
      "1": "HDMI_OVDD_3V3",
      "2": "GND",
      "3": "GND",
      "4": "GND",
      "5": "GND",
      "6": "GND",
      "7": "GND",
      "8": "HDMI_IVDD_1V2",
      "9": "HDMI_3V3",
      "10": "HDMI_INT_N",
      "11": "I2C0_SDA",
      "12": "I2C0_SCL",
      "13": "HDMI_3V3",
      "14": "HDMI_HPD",
      "15": "HDMI_DDC_SDA",
      "16": "HDMI_DDC_SCL",
      "17": "HDMI_CEC",
      "18": "HDMI_PVCC_1V2",
      "19": "HDMI_3V3",
      "20": "HDMI_REXT",
      "21": "HDMI_TXC_N",
      "22": "HDMI_TXC_P",
      "23": "HDMI_AVCC_1V2",
      "24": "HDMI_TX0_N",
      "25": "HDMI_TX0_P",
      "26": "HDMI_TX1_N",
      "27": "HDMI_TX1_P",
      "28": "HDMI_DVDD_1V2",
      "29": "HDMI_TX2_N",
      "30": "HDMI_TX2_P",
      "31": "HDMI_ENTEST",
      "32": "HDMI_PCADR",
      "33": "HDMI_RESET_N",
      "34": "HDMI_OVDD_3V3",
      "35": "HDMI_IVDD_1V2",
      "36": "HDMI_D23",
      "37": "HDMI_D22",
      "38": "HDMI_D21",
      "39": "HDMI_D20",
      "40": "HDMI_D19",
      "41": "HDMI_D18",
      "42": "HDMI_D17",
      "43": "HDMI_D16",
      "44": "HDMI_D15",
      "45": "HDMI_D14",
      "46": "HDMI_D13",
      "47": "HDMI_D12",
      "48": "HDMI_D11",
      "49": "HDMI_D10",
      "50": "HDMI_D9",
      "51": "HDMI_PCLK_RX",
      "52": "HDMI_D8",
      "53": "HDMI_D7",
      "54": "HDMI_D6",
      "55": "HDMI_D5",
      "56": "HDMI_IVDD_1V2",
      "57": "HDMI_D4",
      "58": "HDMI_D3",
      "59": "HDMI_D2",
      "60": "HDMI_D1",
      "61": "HDMI_D0",
      "62": "HDMI_DE_RX",
      "63": "HDMI_HSYNC_RX",
      "64": "HDMI_VSYNC_RX",
      "65": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "OVDD_1",
      "2": "I2S3_SPDIF",
      "3": "I2S2",
      "4": "I2S1",
      "5": "I2S0",
      "6": "WS",
      "7": "SCK_MCLK",
      "8": "IVDD12_8",
      "9": "VCC33",
      "10": "INT",
      "11": "PCSDA",
      "12": "PCSCL",
      "13": "OVDD33",
      "14": "HPD",
      "15": "DDCSDA",
      "16": "DDCSCL",
      "17": "CEC",
      "18": "PVCC12",
      "19": "PVCC33",
      "20": "REXT",
      "21": "TXCM",
      "22": "TXCP",
      "23": "AVCC12",
      "24": "TX0M",
      "25": "TX0P",
      "26": "TX1M",
      "27": "TX1P",
      "28": "DVDD12",
      "29": "TX2M",
      "30": "TX2P",
      "31": "ENTEST",
      "32": "PCADR",
      "33": "SYSRSTN",
      "34": "OVDD_34",
      "35": "IVDD12_35",
      "36": "D23",
      "37": "D22",
      "38": "D21",
      "39": "D20",
      "40": "D19",
      "41": "D18",
      "42": "D17",
      "43": "D16",
      "44": "D15",
      "45": "D14",
      "46": "D13",
      "47": "D12",
      "48": "D11",
      "49": "D10",
      "50": "D9",
      "51": "PCLK",
      "52": "D8",
      "53": "D7",
      "54": "D6",
      "55": "D5",
      "56": "IVDD12_56",
      "57": "D4",
      "58": "D3",
      "59": "D2",
      "60": "D1",
      "61": "D0",
      "62": "DE",
      "63": "HSYNC",
      "64": "VSYNC",
      "65": "GND_EP"
    },
    "mpn": "IT66122FN/CX",
    "footprintKey": "IT66122_REVD",
    "source": "https://github.com/beagleboard/beaglebone-black/blob/c7bbdb9676c0cacc8dd9a2f656ee2dab34d98fca/images/RevD-Schematic/IT66122.png",
    "note": "Video-only; six unused audio inputs are held low. Procurement and electrical qualification remain explicit."
  },
  {
    "name": "C_HDMI_REF_C144",
    "kind": "capacitor",
    "value": "2.2uF",
    "connections": {
      "1": "HDMI_PVCC_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX5R6BB225",
    "footprint": "0402",
    "reference_designator": "C144"
  },
  {
    "name": "C_HDMI_REF_C145",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R7BB104",
    "footprint": "0402",
    "reference_designator": "C145"
  },
  {
    "name": "C_HDMI_REF_C146",
    "kind": "capacitor",
    "value": "2.2uF",
    "connections": {
      "1": "HDMI_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX5R6BB225",
    "footprint": "0402",
    "reference_designator": "C146"
  },
  {
    "name": "C_HDMI_REF_C147",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_IVDD_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R7BB104",
    "footprint": "0402",
    "reference_designator": "C147"
  },
  {
    "name": "C_HDMI_REF_C148",
    "kind": "capacitor",
    "value": "2.2uF",
    "connections": {
      "1": "HDMI_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX5R6BB225",
    "footprint": "0402",
    "reference_designator": "C148"
  },
  {
    "name": "C_HDMI_REF_C149",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_IVDD_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R7BB104",
    "footprint": "0402",
    "reference_designator": "C149"
  },
  {
    "name": "C_HDMI_REF_C150",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_IVDD_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R7BB104",
    "footprint": "0402",
    "reference_designator": "C150"
  },
  {
    "name": "C_HDMI_REF_C151",
    "kind": "capacitor",
    "value": "2.2uF",
    "connections": {
      "1": "HDMI_IVDD_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX5R6BB225",
    "footprint": "0402",
    "reference_designator": "C151"
  },
  {
    "name": "C_HDMI_REF_C176",
    "kind": "capacitor",
    "value": "10uF",
    "connections": {
      "1": "GND",
      "2": "V3V3"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CL21A106KOQNNNE",
    "footprint": "0805",
    "reference_designator": "C176"
  },
  {
    "name": "C_HDMI_REF_C177",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_3V3",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R7BB104",
    "footprint": "0402",
    "reference_designator": "C177"
  },
  {
    "name": "C_HDMI_REF_C178",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_3V3",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R7BB104",
    "footprint": "0402",
    "reference_designator": "C178"
  },
  {
    "name": "C_HDMI_REF_C179",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_3V3",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R7BB104",
    "footprint": "0402",
    "reference_designator": "C179"
  },
  {
    "name": "C_HDMI_REF_C180",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_PVCC_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R7BB104",
    "footprint": "0402",
    "reference_designator": "C180"
  },
  {
    "name": "C_HDMI_REF_C181",
    "kind": "capacitor",
    "value": "2.2uF",
    "connections": {
      "1": "HDMI_AVCC_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX5R6BB225",
    "footprint": "0402",
    "reference_designator": "C181"
  },
  {
    "name": "C_HDMI_REF_C182",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_AVCC_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R7BB104",
    "footprint": "0402",
    "reference_designator": "C182"
  },
  {
    "name": "C_HDMI_REF_C183",
    "kind": "capacitor",
    "value": "1nF",
    "connections": {
      "1": "HDMI_AVCC_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R9BB102",
    "footprint": "0402",
    "reference_designator": "C183"
  },
  {
    "name": "C_HDMI_REF_C184",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_DVDD_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R7BB104",
    "footprint": "0402",
    "reference_designator": "C184"
  },
  {
    "name": "C_HDMI_REF_C185",
    "kind": "capacitor",
    "value": "2.2uF",
    "connections": {
      "1": "HDMI_DVDD_1V2",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX5R6BB225",
    "footprint": "0402",
    "reference_designator": "C185"
  },
  {
    "name": "C_HDMI_REF_C186",
    "kind": "capacitor",
    "value": "2.2uF",
    "connections": {
      "1": "V3V3",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX5R6BB225",
    "footprint": "0402",
    "reference_designator": "C186"
  },
  {
    "name": "C_HDMI_REF_C187",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_OVDD_3V3",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R7BB104",
    "footprint": "0402",
    "reference_designator": "C187"
  },
  {
    "name": "C_HDMI_REF_C188",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_OVDD_3V3",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CC0402KRX7R7BB104",
    "footprint": "0402",
    "reference_designator": "C188"
  },
  {
    "name": "C_HDMI_REF_C193",
    "kind": "capacitor",
    "value": "1uF",
    "connections": {
      "1": "HDMI_RESET_N",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CL05A105KP5NNNC",
    "footprint": "0402",
    "reference_designator": "C193"
  },
  {
    "name": "D_HDMI_CEC",
    "kind": "chip",
    "value": "RB751V40,115",
    "connections": {
      "1": "HDMI_CEC",
      "2": "HDMI_CEC_PULLUP"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "K",
      "2": "A"
    },
    "mpn": "RB751V40,115",
    "footprintKey": "SOD323",
    "reference_designator": "D8"
  },
  {
    "name": "FB_HDMI_FB10",
    "kind": "ferrite",
    "value": "150ohm@100MHz",
    "connections": {
      "1": "HDMI_AVCC_1V2",
      "2": "HDMI_1V2"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "LI0805H151R-10",
    "footprint": "0805",
    "reference_designator": "FB10",
    "note": "Ferrite impedance is not an ideal-inductor SPICE model."
  },
  {
    "name": "FB_HDMI_FB11",
    "kind": "ferrite",
    "value": "150ohm@100MHz",
    "connections": {
      "1": "HDMI_PVCC_1V2",
      "2": "HDMI_1V2"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "LI0805H151R-10",
    "footprint": "0805",
    "reference_designator": "FB11",
    "note": "Ferrite impedance is not an ideal-inductor SPICE model."
  },
  {
    "name": "FB_HDMI_FB12",
    "kind": "ferrite",
    "value": "150ohm@100MHz",
    "connections": {
      "1": "HDMI_OVDD_3V3",
      "2": "V3V3"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "LI0805H151R-10",
    "footprint": "0805",
    "reference_designator": "FB12",
    "note": "Ferrite impedance is not an ideal-inductor SPICE model."
  },
  {
    "name": "FB_HDMI_FB13",
    "kind": "ferrite",
    "value": "150ohm@100MHz",
    "connections": {
      "1": "HDMI_IVDD_1V2",
      "2": "HDMI_1V2"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "LI0805H151R-10",
    "footprint": "0805",
    "reference_designator": "FB13",
    "note": "Ferrite impedance is not an ideal-inductor SPICE model."
  },
  {
    "name": "FB_HDMI_FB5",
    "kind": "ferrite",
    "value": "150ohm@100MHz",
    "connections": {
      "1": "HDMI_3V3",
      "2": "V3V3"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "LI0805H151R-10",
    "footprint": "0805",
    "reference_designator": "FB5",
    "note": "Ferrite impedance is not an ideal-inductor SPICE model."
  },
  {
    "name": "FB_HDMI_FB9",
    "kind": "ferrite",
    "value": "150ohm@100MHz",
    "connections": {
      "1": "HDMI_DVDD_1V2",
      "2": "HDMI_1V2"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "LI0805H151R-10",
    "footprint": "0805",
    "reference_designator": "FB9",
    "note": "Ferrite impedance is not an ideal-inductor SPICE model."
  },
  {
    "name": "R_HDMI_REF_R146",
    "kind": "resistor",
    "value": "1.5k",
    "connections": {
      "1": "HDMI_5V",
      "2": "HDMI_DDC_SCL"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "RC0402FR-071K5L",
    "footprint": "0402",
    "reference_designator": "R146"
  },
  {
    "name": "R_HDMI_REF_R147",
    "kind": "resistor",
    "value": "1.5k",
    "connections": {
      "1": "HDMI_5V",
      "2": "HDMI_DDC_SDA"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "RC0402FR-071K5L",
    "footprint": "0402",
    "reference_designator": "R147"
  },
  {
    "name": "R_HDMI_REF_R158",
    "kind": "resistor",
    "value": "10k",
    "connections": {
      "1": "V3V3",
      "2": "HDMI_INT_N"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "RC0402FR-0710KL",
    "footprint": "0402",
    "reference_designator": "R158"
  },
  {
    "name": "R_HDMI_REF_R166",
    "kind": "resistor",
    "value": "27k",
    "connections": {
      "1": "HDMI_CEC_PULLUP",
      "2": "V3V3"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "RC0402FR-0727KL",
    "footprint": "0402",
    "reference_designator": "R166"
  },
  {
    "name": "R_HDMI_REF_R176",
    "kind": "resistor",
    "value": "10k",
    "connections": {
      "1": "HDMI_ENTEST",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "RC0402FR-0710KL",
    "footprint": "0402",
    "reference_designator": "R176"
  },
  {
    "name": "R_HDMI_REF_R177",
    "kind": "resistor",
    "value": "5.6k",
    "connections": {
      "1": "HDMI_REXT",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "CRCW04025K60FKED",
    "footprint": "0402",
    "reference_designator": "R177"
  },
  {
    "name": "R_HDMI_REF_R181",
    "kind": "resistor",
    "value": "10k",
    "connections": {
      "1": "HDMI_PCADR",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "RC0402FR-0710KL",
    "footprint": "0402",
    "reference_designator": "R181"
  },
  {
    "name": "R_HDMI_REF_R183",
    "kind": "resistor",
    "value": "10k",
    "connections": {
      "1": "V3V3",
      "2": "HDMI_RESET_N"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "RC0402FR-0710KL",
    "footprint": "0402",
    "reference_designator": "R183"
  },
  {
    "name": "R_HDMI_REF_R188",
    "kind": "resistor",
    "value": "33k",
    "connections": {
      "1": "GND",
      "2": "HDMI_HPD"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "RC0402FR-0733KL",
    "footprint": "0402",
    "reference_designator": "R188"
  },
  {
    "name": "U_HDMI_1V2",
    "kind": "chip",
    "value": "TLV75512PDBVR",
    "connections": {
      "1": "V3V3",
      "2": "GND",
      "3": "HDMI_1V2_EN",
      "5": "HDMI_1V2"
    },
    "noConnect": [
      "4"
    ],
    "pinLabels": {
      "1": "IN",
      "2": "GND",
      "3": "EN",
      "4": "NC",
      "5": "OUT"
    },
    "mpn": "TLV75512PDBVR",
    "footprintKey": "TI_DBV_5"
  },
  {
    "name": "U_HDMI_RESET",
    "kind": "chip",
    "value": "SN74AHC1G09DBVR",
    "connections": {
      "1": "HDMI_RESET_GPIO_N",
      "2": "WARMRST_N",
      "3": "GND",
      "4": "HDMI_RESET_N",
      "5": "V3V3"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "A",
      "2": "B",
      "3": "GND",
      "4": "Y_OD",
      "5": "VCC"
    },
    "mpn": "SN74AHC1G09DBVR",
    "footprintKey": "TI_DBV_5"
  },
  {
    "name": "R_HDMI_1V2_EN",
    "kind": "resistor",
    "value": "10k",
    "connections": {
      "1": "V3V3",
      "2": "HDMI_1V2_EN"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "RC0402FR-0710KL",
    "footprint": "0402"
  },
  {
    "name": "R_HDMI_RESET_GPIO_PU",
    "kind": "resistor",
    "value": "10k",
    "connections": {
      "1": "V3V3",
      "2": "HDMI_RESET_GPIO_N"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "RC0402FR-0710KL",
    "footprint": "0402"
  },
  {
    "name": "C_HDMI_1V2_IN",
    "kind": "capacitor",
    "value": "1uF",
    "connections": {
      "1": "V3V3",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "C0402C105K4PACTU",
    "footprint": "0402"
  },
  {
    "name": "C_HDMI_1V2_EN",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_1V2_EN",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "GRM155R71C104KA88D",
    "footprint": "0402"
  },
  {
    "name": "C_HDMI_RESET_DECOUPLE",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "V3V3",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "GRM155R71C104KA88D",
    "footprint": "0402"
  },
  {
    "name": "U_HDMI_ESD",
    "kind": "chip",
    "value": "TPD13S523RSVR",
    "connections": {
      "1": "HDMI_CEC",
      "2": "HDMI_HPD",
      "3": "HDMI_5V_SUPPLY",
      "4": "HDMI_5V",
      "5": "HDMI_UTILITY",
      "6": "GND",
      "7": "HDMI_TXC_N",
      "8": "HDMI_TXC_P",
      "9": "HDMI_TX0_N",
      "10": "HDMI_TX0_P",
      "11": "HDMI_TX1_N",
      "12": "HDMI_TX1_P",
      "13": "HDMI_TX2_N",
      "14": "HDMI_TX2_P",
      "15": "HDMI_DDC_SCL",
      "16": "HDMI_DDC_SDA"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "CTRL3",
      "2": "CTRL4",
      "3": "5V_SUPPLY",
      "4": "5V_OUT",
      "5": "CTRL5",
      "6": "GND",
      "7": "D3_N",
      "8": "D3_P",
      "9": "D2_N",
      "10": "D2_P",
      "11": "D1_N",
      "12": "D1_P",
      "13": "D0_N",
      "14": "D0_P",
      "15": "CTRL1",
      "16": "CTRL2"
    },
    "mpn": "TPD13S523RSVR",
    "footprintKey": "TPD13S523_RSV",
    "note": "Eight identical TMDS shunt clamps. Whole-pair D0/D2 assignment follows PCB channel order2,1,0,clock; IT/connector logical channel and N/P polarity stay unchanged. No series translator ports."
  },
  {
    "name": "C_HDMI_ESD_SUPPLY",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_5V_SUPPLY",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "GRM155R71C104KA88D",
    "footprint": "0402"
  },
  {
    "name": "C_HDMI_ESD_OUT",
    "kind": "capacitor",
    "value": "100nF",
    "connections": {
      "1": "HDMI_5V",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "GRM155R71C104KA88D",
    "footprint": "0402"
  },
  {
    "name": "R_HDMI_UTILITY",
    "kind": "resistor",
    "value": "75",
    "connections": {
      "1": "HDMI_UTILITY",
      "2": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "1",
      "2": "2"
    },
    "mpn": "RC0402FR-0775RL",
    "footprint": "0402"
  },
  {
    "name": "J_HDMI",
    "kind": "chip",
    "value": "2086581001",
    "connections": {
      "1": "HDMI_TX2_P",
      "2": "GND",
      "3": "HDMI_TX2_N",
      "4": "HDMI_TX1_P",
      "5": "GND",
      "6": "HDMI_TX1_N",
      "7": "HDMI_TX0_P",
      "8": "GND",
      "9": "HDMI_TX0_N",
      "10": "HDMI_TXC_P",
      "11": "GND",
      "12": "HDMI_TXC_N",
      "13": "HDMI_CEC",
      "14": "HDMI_UTILITY",
      "15": "HDMI_DDC_SCL",
      "16": "HDMI_DDC_SDA",
      "17": "GND",
      "18": "HDMI_5V",
      "19": "HDMI_HPD",
      "20": "GND",
      "21": "GND",
      "22": "GND",
      "23": "GND"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "HDMI_1",
      "2": "HDMI_2",
      "3": "HDMI_3",
      "4": "HDMI_4",
      "5": "HDMI_5",
      "6": "HDMI_6",
      "7": "HDMI_7",
      "8": "HDMI_8",
      "9": "HDMI_9",
      "10": "HDMI_10",
      "11": "HDMI_11",
      "12": "HDMI_12",
      "13": "HDMI_13",
      "14": "HDMI_14",
      "15": "HDMI_15",
      "16": "HDMI_16",
      "17": "HDMI_17",
      "18": "HDMI_18",
      "19": "HDMI_19",
      "20": "SH1",
      "21": "SH2",
      "22": "SH3",
      "23": "SH4"
    },
    "mpn": "2086581001",
    "footprintKey": "HDMI_A_MOLEX_2086581001"
  },
  {
    "name": "RN_HDMI_0",
    "kind": "resistor_array",
    "value": "4x33",
    "connections": {
      "1": "HDMI_RGB_D16",
      "8": "HDMI_D18",
      "2": "HDMI_RGB_D17",
      "7": "HDMI_D2",
      "3": "HDMI_RGB_D18",
      "6": "HDMI_D17",
      "4": "HDMI_RGB_D19",
      "5": "HDMI_D9"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "P1",
      "2": "P2",
      "3": "P3",
      "4": "P4",
      "5": "P5",
      "6": "P6",
      "7": "P7",
      "8": "P8"
    },
    "mpn": "CAT10-330J4LF",
    "footprintKey": "CAT10_4X33",
    "resistor_pairs": [
      [
        1,
        8
      ],
      [
        2,
        7
      ],
      [
        3,
        6
      ],
      [
        4,
        5
      ]
    ],
    "resistance_ohm": 33,
    "tolerance_percent": 5,
    "note": "Four identical isolated 33-ohm channels regrouped by CPU escape geography; logical raw-net-to-HDMI mapping unchanged."
  },
  {
    "name": "RN_HDMI_1",
    "kind": "resistor_array",
    "value": "4x33",
    "connections": {
      "1": "HDMI_RGB_D20",
      "8": "HDMI_D1",
      "2": "HDMI_RGB_D21",
      "7": "HDMI_D16",
      "3": "HDMI_RGB_D22",
      "6": "HDMI_D8",
      "4": "HDMI_RGB_D23",
      "5": "HDMI_D0"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "P1",
      "2": "P2",
      "3": "P3",
      "4": "P4",
      "5": "P5",
      "6": "P6",
      "7": "P7",
      "8": "P8"
    },
    "mpn": "CAT10-330J4LF",
    "footprintKey": "CAT10_4X33",
    "resistor_pairs": [
      [
        1,
        8
      ],
      [
        2,
        7
      ],
      [
        3,
        6
      ],
      [
        4,
        5
      ]
    ],
    "resistance_ohm": 33,
    "tolerance_percent": 5,
    "note": "Four identical isolated 33-ohm channels regrouped by CPU escape geography; logical raw-net-to-HDMI mapping unchanged."
  },
  {
    "name": "RN_HDMI_2",
    "kind": "resistor_array",
    "value": "4x33",
    "connections": {
      "1": "SYSBOOT15",
      "8": "HDMI_D7",
      "2": "SYSBOOT3",
      "7": "HDMI_D22",
      "3": "SYSBOOT7",
      "6": "HDMI_D12",
      "4": "SYSBOOT11",
      "5": "HDMI_D3"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "P1",
      "2": "P2",
      "3": "P3",
      "4": "P4",
      "5": "P5",
      "6": "P6",
      "7": "P7",
      "8": "P8"
    },
    "mpn": "CAT10-330J4LF",
    "footprintKey": "CAT10_4X33",
    "resistor_pairs": [
      [
        1,
        8
      ],
      [
        2,
        7
      ],
      [
        3,
        6
      ],
      [
        4,
        5
      ]
    ],
    "resistance_ohm": 33,
    "tolerance_percent": 5,
    "note": "Four identical isolated 33-ohm channels regrouped by CPU escape geography; logical raw-net-to-HDMI mapping unchanged."
  },
  {
    "name": "RN_HDMI_3",
    "kind": "resistor_array",
    "value": "4x33",
    "connections": {
      "1": "SYSBOOT14",
      "8": "HDMI_D6",
      "2": "SYSBOOT2",
      "7": "HDMI_D21",
      "3": "SYSBOOT6",
      "6": "HDMI_D11",
      "4": "SYSBOOT10",
      "5": "HDMI_D15"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "P1",
      "2": "P2",
      "3": "P3",
      "4": "P4",
      "5": "P5",
      "6": "P6",
      "7": "P7",
      "8": "P8"
    },
    "mpn": "CAT10-330J4LF",
    "footprintKey": "CAT10_4X33",
    "resistor_pairs": [
      [
        1,
        8
      ],
      [
        2,
        7
      ],
      [
        3,
        6
      ],
      [
        4,
        5
      ]
    ],
    "resistance_ohm": 33,
    "tolerance_percent": 5,
    "note": "Four identical isolated 33-ohm channels regrouped by CPU escape geography; logical raw-net-to-HDMI mapping unchanged."
  },
  {
    "name": "RN_HDMI_4",
    "kind": "resistor_array",
    "value": "4x33",
    "connections": {
      "1": "SYSBOOT13",
      "8": "HDMI_D5",
      "2": "SYSBOOT1",
      "7": "HDMI_D20",
      "3": "SYSBOOT5",
      "6": "HDMI_D10",
      "4": "SYSBOOT9",
      "5": "HDMI_D14"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "P1",
      "2": "P2",
      "3": "P3",
      "4": "P4",
      "5": "P5",
      "6": "P6",
      "7": "P7",
      "8": "P8"
    },
    "mpn": "CAT10-330J4LF",
    "footprintKey": "CAT10_4X33",
    "resistor_pairs": [
      [
        1,
        8
      ],
      [
        2,
        7
      ],
      [
        3,
        6
      ],
      [
        4,
        5
      ]
    ],
    "resistance_ohm": 33,
    "tolerance_percent": 5,
    "note": "Four identical isolated 33-ohm channels regrouped by CPU escape geography; logical raw-net-to-HDMI mapping unchanged."
  },
  {
    "name": "RN_HDMI_5",
    "kind": "resistor_array",
    "value": "4x33",
    "connections": {
      "1": "SYSBOOT12",
      "8": "HDMI_D4",
      "2": "SYSBOOT0",
      "7": "HDMI_D19",
      "3": "SYSBOOT4",
      "6": "HDMI_D23",
      "4": "SYSBOOT8",
      "5": "HDMI_D13"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "P1",
      "2": "P2",
      "3": "P3",
      "4": "P4",
      "5": "P5",
      "6": "P6",
      "7": "P7",
      "8": "P8"
    },
    "mpn": "CAT10-330J4LF",
    "footprintKey": "CAT10_4X33",
    "resistor_pairs": [
      [
        1,
        8
      ],
      [
        2,
        7
      ],
      [
        3,
        6
      ],
      [
        4,
        5
      ]
    ],
    "resistance_ohm": 33,
    "tolerance_percent": 5,
    "note": "Four identical isolated 33-ohm channels regrouped by CPU escape geography; logical raw-net-to-HDMI mapping unchanged."
  },
  {
    "name": "RN_HDMI_6",
    "kind": "resistor_array",
    "value": "4x33",
    "connections": {
      "1": "LCD_PCLK",
      "8": "HDMI_PCLK_RX",
      "2": "LCD_DE",
      "7": "HDMI_DE_RX",
      "3": "HDMI_HSYNC",
      "6": "HDMI_HSYNC_RX",
      "4": "HDMI_VSYNC",
      "5": "HDMI_VSYNC_RX"
    },
    "noConnect": [],
    "pinLabels": {
      "1": "P1",
      "2": "P2",
      "3": "P3",
      "4": "P4",
      "5": "P5",
      "6": "P6",
      "7": "P7",
      "8": "P8"
    },
    "mpn": "CAT10-330J4LF",
    "footprintKey": "CAT10_4X33",
    "resistor_pairs": [
      [
        1,
        8
      ],
      [
        2,
        7
      ],
      [
        3,
        6
      ],
      [
        4,
        5
      ]
    ],
    "resistance_ohm": 33,
    "tolerance_percent": 5,
    "note": "Four isolated 33-ohm source-series elements. CAT10 manufacturer land pattern; pins 1-8,2-7,3-6,4-5. Copper-aware placement remains unrouted."
  }
]

export default data
