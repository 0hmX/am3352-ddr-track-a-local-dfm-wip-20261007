// ESD4 centered VIP; paired TX0 relief is a required companion.
const routes=[
  {
    "name": "HDMIPWR_HDMI_5V_FB_0",
    "net": "HDMI_5V_FB",
    "from": "HDMIPWR_VIP_0.bottom",
    "to": ".HDMI > .R_HDMI_5V_TOP > .pin2",
    "width": 0.15,
    "layer": "bottom",
    "points": [
      [
        59.74,
        -14
      ],
      [
        59.51,
        -14
      ],
      [
        59.5,
        -13.99
      ]
    ],
    "padFrom": ".HDMI > .U_HDMI_5V_BOOST > .5",
    "padTo": ".HDMI > .R_HDMI_5V_TOP > .pin2",
    "lengthMm": 0.24414213562373338
  },
  {
    "name": "HDMIPWR_HDMI_5V_FB_1",
    "net": "HDMI_5V_FB",
    "from": ".HDMI > .R_HDMI_5V_TOP > .pin2",
    "to": ".HDMI > .R_HDMI_5V_BOTTOM > .pin1",
    "width": 0.15,
    "layer": "bottom",
    "points": [
      [
        59.5,
        -13.99
      ],
      [
        58.5,
        -13.99
      ]
    ],
    "padFrom": ".HDMI > .R_HDMI_5V_TOP > .pin2",
    "padTo": ".HDMI > .R_HDMI_5V_BOTTOM > .pin1",
    "lengthMm": 1.0
  },
  {
    "name": "HDMIPWR_HDMI_5V_SW_2",
    "net": "HDMI_5V_SW",
    "from": ".HDMI > .U_HDMI_5V_BOOST > .7",
    "to": ".HDMI > .L_HDMI_5V > .pin2",
    "width": 0.2,
    "layer": "top",
    "points": [
      [
        59.74,
        -13
      ],
      [
        60.5,
        -13
      ],
      [
        60.75,
        -12.75
      ],
      [
        61.815,
        -12.75
      ]
    ],
    "padFrom": ".HDMI > .U_HDMI_5V_BOOST > .7",
    "padTo": ".HDMI > .L_HDMI_5V > .pin2",
    "lengthMm": 2.1785533905932697
  },
  {
    "name": "HDMIPWR_HDMI_1V2_EN_3",
    "net": "HDMI_1V2_EN",
    "from": ".HDMI > .R_HDMI_1V2_EN > .pin2",
    "to": ".HDMI > .C_HDMI_1V2_EN > .pin1",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        53.01,
        -17
      ],
      [
        52.01,
        -16
      ],
      [
        51.01,
        -16
      ]
    ],
    "padFrom": ".HDMI > .R_HDMI_1V2_EN > .pin2",
    "padTo": ".HDMI > .C_HDMI_1V2_EN > .pin1",
    "lengthMm": 2.414213562373095
  },
  {
    "name": "HDMIPWR_HDMI_1V2_EN_4",
    "net": "HDMI_1V2_EN",
    "from": ".HDMI > .C_HDMI_1V2_EN > .pin1",
    "to": ".HDMI > .U_HDMI_1V2 > .3",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        51.01,
        -16
      ],
      [
        51.00000000000001,
        -16.0
      ],
      [
        50.50000000000001,
        -16.5
      ],
      [
        50.50000000000001,
        -19.7
      ],
      [
        49.50000000000001,
        -20.7
      ],
      [
        49.2,
        -20.7
      ]
    ],
    "padFrom": ".HDMI > .C_HDMI_1V2_EN > .pin1",
    "padTo": ".HDMI > .U_HDMI_1V2 > .3",
    "lengthMm": 5.631320343559637
  },
  {
    "name": "HDMIPWR_HDMI_5V_SUPPLY_5",
    "net": "HDMI_5V_SUPPLY",
    "from": ".HDMI > .U_HDMI_5V_BOOST > .8",
    "to": ".HDMI > .C_HDMI_5V_OUT1 > .pin1",
    "width": 0.2,
    "layer": "top",
    "points": [
      [
        59.74,
        -12.5
      ],
      [
        58.25,
        -11.009999999999998
      ],
      [
        58.25,
        -10.225
      ]
    ],
    "padFrom": ".HDMI > .U_HDMI_5V_BOOST > .8",
    "padTo": ".HDMI > .C_HDMI_5V_OUT1 > .pin1",
    "lengthMm": 2.892178207935913
  },
  {
    "name": "HDMIPWR_HDMI_5V_SUPPLY_6",
    "net": "HDMI_5V_SUPPLY",
    "from": ".HDMI > .C_HDMI_5V_OUT1 > .pin1",
    "to": ".HDMI > .C_HDMI_5V_OUT2 > .pin1",
    "width": 0.6,
    "layer": "top",
    "points": [
      [
        58.25,
        -10.225
      ],
      [
        58.215,
        -10.2075
      ],
      [
        58.20000000000001,
        -10.216770509831244
      ],
      [
        58.20000000000001,
        -11.2
      ],
      [
        59.00000000000001,
        -12.0
      ],
      [
        59.00000000000001,
        -14.5
      ],
      [
        58.20000000000001,
        -15.3
      ],
      [
        57.71677050983126,
        -15.3
      ],
      [
        57.715,
        -15.2925
      ],
      [
        57.75,
        -15.275
      ]
    ],
    "padFrom": ".HDMI > .C_HDMI_5V_OUT1 > .pin1",
    "padTo": ".HDMI > .C_HDMI_5V_OUT2 > .pin1",
    "lengthMm": 6.332802764141308
  },
  {
    "name": "HDMIPWR_HDMI_5V_SUPPLY_7",
    "net": "HDMI_5V_SUPPLY",
    "from": "HDMIPWR_VIP_1.inner5",
    "to": "HDMIPWR_VIP_2.inner5",
    "width": 0.2,
    "layer": "inner5",
    "points": [
      [
        57.75,
        -15.275
      ],
      [
        58.015,
        -15.01
      ],
      [
        59.5,
        -15.01
      ]
    ],
    "padFrom": ".HDMI > .C_HDMI_5V_OUT2 > .pin1",
    "padTo": ".HDMI > .R_HDMI_5V_TOP > .pin1",
    "lengthMm": 1.8597665940288703
  },
  {
    "name": "HDMIPWR_HDMI_5V_SUPPLY_9",
    "net": "HDMI_5V_SUPPLY",
    "from": "HDMIPWR_VIP_1.inner5",
    "to": "HDMIPWR_VIP_4.inner5",
    "width": 0.4,
    "layer": "inner5",
    "points": [
      [
        57.75,
        -15.275
      ],
      [
        54.99,
        -18.035
      ],
      [
        54.99,
        -27.5
      ],
      [
        54.4,
        -28.09
      ],
      [
        54.4,
        -29.11
      ],
      [
        54.99,
        -29.7
      ],
      [
        54.99,
        -31.5
      ]
    ],
    "padFrom": ".HDMI > .C_HDMI_5V_OUT2 > .pin1",
    "padTo": ".HDMI > .C_HDMI_ESD_SUPPLY > .pin1",
    "lengthMm": 17.85700143575
  },
  {
    "name": "HDMIPWR_HDMI_5V_SUPPLY_10",
    "net": "HDMI_5V_SUPPLY",
    "from": ".HDMI > .C_HDMI_ESD_SUPPLY > .pin1",
    "to": ".HDMI > .U_HDMI_ESD > .3",
    "width": 0.15,
    "layer": "top",
    "points": [
      [
        54.99,
        -31.5
      ],
      [
        55.00000000000001,
        -31.5
      ],
      [
        55.00000000000001,
        -31.1
      ],
      [
        54.20000000000001,
        -30.3
      ],
      [
        53.36000000000001,
        -30.3
      ],
      [
        53.300000000000004,
        -30.240000000000002
      ],
      [
        53.300000000000004,
        -30.1
      ],
      [
        52.70000000000001,
        -29.5
      ],
      [
        52.70000000000001,
        -29.1
      ],
      [
        53.6,
        -28.200000000000003
      ],
      [
        54.95,
        -28.2
      ]
    ],
    "padFrom": ".HDMI > .C_HDMI_ESD_SUPPLY > .pin1",
    "padTo": ".HDMI > .U_HDMI_ESD > .3",
    "lengthMm": 6.4775440072005015
  },
  {
    "name": "HDMIPWR_HDMI_5V_11",
    "net": "HDMI_5V",
    "from": "HDMIPWR_VIP_3.inner5",
    "to": "HDMIPWR_VIP_5.inner5",
    "width": 0.2,
    "layer": "inner5",
    "points": [
      [
        54.95,
        -28.6
      ],
      [
        56.99,
        -30.64
      ],
      [
        56.99,
        -31.5
      ]
    ],
    "padFrom": ".HDMI > .U_HDMI_ESD > .4",
    "padTo": ".HDMI > .C_HDMI_ESD_OUT > .pin1",
    "lengthMm": 3.744995667241112
  },
  {
    "name": "HDMIPWR_HDMI_5V_12",
    "net": "HDMI_5V",
    "from": ".HDMI > .C_HDMI_ESD_OUT > .pin1",
    "to": ".HDMI > .J_HDMI > .18",
    "width": 0.2,
    "layer": "top",
    "points": [
      [
        56.99,
        -31.5
      ],
      [
        57.99,
        -32.5
      ],
      [
        59.69,
        -32.5
      ]
    ],
    "padFrom": ".HDMI > .C_HDMI_ESD_OUT > .pin1",
    "padTo": ".HDMI > .J_HDMI > .18",
    "lengthMm": 4.764213562373096
  },
  {
    "name": "HDMIPWR_HDMI_5V_13",
    "net": "HDMI_5V",
    "from": "HDMIPWR_VIP_5.inner5",
    "to": "HDMIPWR_VIP_6.inner5",
    "width": 0.15,
    "layer": "inner5",
    "points": [
      [
        56.99,
        -31.5
      ],
      [
        51.980000000000004,
        -36.51
      ],
      [
        46,
        -36.51
      ]
    ],
    "padFrom": ".HDMI > .C_HDMI_ESD_OUT > .pin1",
    "padTo": ".HDMI > .R_HDMI_REF_R146 > .pin1",
    "lengthMm": 13.065209947489208
  },
  {
    "name": "HDMIPWR_HDMI_5V_14",
    "net": "HDMI_5V",
    "from": "HDMIPWR_VIP_6.inner5",
    "to": "HDMIPWR_VIP_7.inner5",
    "width": 0.15,
    "layer": "inner5",
    "points": [
      [
        46,
        -36.51
      ],
      [
        46.00000000000001,
        -36.5
      ],
      [
        42.9,
        -33.4
      ],
      [
        42.9,
        -32.3
      ],
      [
        42.699999999999996,
        -32.1
      ],
      [
        40.9,
        -32.1
      ],
      [
        40.50000000000001,
        -32.5
      ],
      [
        40.49,
        -32.5
      ]
    ],
    "padFrom": ".HDMI > .R_HDMI_REF_R146 > .pin1",
    "padTo": ".HDMI > .R_HDMI_REF_R147 > .pin1",
    "lengthMm": 8.152590180780454
  }
] as const
const vias=[
  {
    "selector": ".HDMI > .U_HDMI_5V_BOOST > .5",
    "x": 59.74,
    "y": -14,
    "layer": "top",
    "shape": "rect",
    "width": 0.67,
    "height": 0.3,
    "padId": "pcb_smtpad_1438",
    "net": "HDMI_5V_FB",
    "viaName": "HDMIPWR_VIP_0",
    "toLayer": "bottom"
  },
  {
    "selector": ".HDMI > .C_HDMI_5V_OUT2 > .pin1",
    "x": 57.75,
    "y": -15.275,
    "layer": "top",
    "shape": "rect",
    "width": 2.7,
    "height": 1.15,
    "padId": "pcb_smtpad_1452",
    "net": "HDMI_5V_SUPPLY",
    "viaName": "HDMIPWR_VIP_1",
    "toLayer": "inner5"
  },
  {
    "selector": ".HDMI > .R_HDMI_5V_TOP > .pin1",
    "x": 59.5,
    "y": -15.01,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.64,
    "height": 0.54,
    "padId": "pcb_smtpad_1444",
    "net": "HDMI_5V_SUPPLY",
    "viaName": "HDMIPWR_VIP_2",
    "toLayer": "inner5"
  },
  {
    "selector": ".HDMI > .U_HDMI_ESD > .4",
    "x": 54.95,
    "y": -28.6,
    "layer": "top",
    "net": "HDMI_5V",
    "viaName": "HDMIPWR_VIP_3",
    "toLayer": "inner5",
    "shape": "rect",
    "width": 0.6,
    "height": 0.2
  },
  {
    "selector": ".HDMI > .C_HDMI_ESD_SUPPLY > .pin1",
    "x": 54.99,
    "y": -31.5,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1353",
    "net": "HDMI_5V_SUPPLY",
    "viaName": "HDMIPWR_VIP_4",
    "toLayer": "inner5"
  },
  {
    "selector": ".HDMI > .C_HDMI_ESD_OUT > .pin1",
    "x": 56.99,
    "y": -31.5,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1355",
    "net": "HDMI_5V",
    "viaName": "HDMIPWR_VIP_5",
    "toLayer": "inner5"
  },
  {
    "selector": ".HDMI > .R_HDMI_REF_R146 > .pin1",
    "x": 46,
    "y": -36.51,
    "layer": "top",
    "shape": "rect",
    "width": 0.64,
    "height": 0.54,
    "padId": "pcb_smtpad_1299",
    "net": "HDMI_5V",
    "viaName": "HDMIPWR_VIP_6",
    "toLayer": "inner5"
  },
  {
    "selector": ".HDMI > .R_HDMI_REF_R147 > .pin1",
    "x": 40.49,
    "y": -32.5,
    "layer": "top",
    "shape": "rect",
    "width": 0.54,
    "height": 0.64,
    "padId": "pcb_smtpad_1301",
    "net": "HDMI_5V",
    "viaName": "HDMIPWR_VIP_7",
    "toLayer": "inner5"
  }
] as const
const widening=[
  {
    "name": "HDMIPWR_WIDE_0",
    "net": "HDMI_5V_SW",
    "layer": "top",
    "outline": [
      {
        "x": 60.62573593128807,
        "y": -12.45
      },
      {
        "x": 61.815,
        "y": -12.45
      },
      {
        "x": 61.87352709660484,
        "y": -12.455764415879031
      },
      {
        "x": 61.92980502970953,
        "y": -12.472836140246613
      },
      {
        "x": 61.98167106990588,
        "y": -12.500559116309237
      },
      {
        "x": 62.027132034355965,
        "y": -12.537867965644036
      },
      {
        "x": 62.064440883690764,
        "y": -12.583328930094119
      },
      {
        "x": 62.092163859753384,
        "y": -12.635194970290472
      },
      {
        "x": 62.10923558412097,
        "y": -12.691472903395162
      },
      {
        "x": 62.114999999999995,
        "y": -12.75
      },
      {
        "x": 62.10923558412097,
        "y": -12.808527096604838
      },
      {
        "x": 62.092163859753384,
        "y": -12.864805029709528
      },
      {
        "x": 62.064440883690764,
        "y": -12.916671069905881
      },
      {
        "x": 62.027132034355965,
        "y": -12.962132034355964
      },
      {
        "x": 61.98167106990588,
        "y": -12.999440883690763
      },
      {
        "x": 61.92980502970953,
        "y": -13.027163859753387
      },
      {
        "x": 61.87352709660484,
        "y": -13.044235584120969
      },
      {
        "x": 61.815,
        "y": -13.05
      },
      {
        "x": 60.87426406871193,
        "y": -13.05
      },
      {
        "x": 60.71213203435597,
        "y": -13.212132034355964
      },
      {
        "x": 60.66667106990588,
        "y": -13.249440883690763
      },
      {
        "x": 60.61480502970953,
        "y": -13.277163859753387
      },
      {
        "x": 60.55852709660484,
        "y": -13.294235584120969
      },
      {
        "x": 60.5,
        "y": -13.3
      },
      {
        "x": 60.44147290339516,
        "y": -13.294235584120969
      },
      {
        "x": 60.38519497029047,
        "y": -13.277163859753387
      },
      {
        "x": 60.33332893009412,
        "y": -13.249440883690763
      },
      {
        "x": 60.28786796564403,
        "y": -13.212132034355964
      },
      {
        "x": 60.25055911630923,
        "y": -13.166671069905881
      },
      {
        "x": 60.22283614024661,
        "y": -13.114805029709528
      },
      {
        "x": 60.20576441587903,
        "y": -13.05852709660484
      },
      {
        "x": 60.2,
        "y": -13.0
      },
      {
        "x": 60.20576441587903,
        "y": -12.941472903395162
      },
      {
        "x": 60.22283614024661,
        "y": -12.885194970290472
      },
      {
        "x": 60.25055911630923,
        "y": -12.833328930094119
      },
      {
        "x": 60.28786796564403,
        "y": -12.787867965644036
      }
    ]
  },
  {
    "name": "HDMIPWR_WIDE_1",
    "net": "HDMI_5V_SUPPLY",
    "layer": "top",
    "outline": [
      {
        "x": 57.95,
        "y": -11.134264068711934
      },
      {
        "x": 57.95,
        "y": -10.225
      },
      {
        "x": 57.95576441587903,
        "y": -10.16647290339516
      },
      {
        "x": 57.97283614024661,
        "y": -10.110194970290472
      },
      {
        "x": 58.00055911630923,
        "y": -10.058328930094119
      },
      {
        "x": 58.03786796564403,
        "y": -10.012867965644036
      },
      {
        "x": 58.08332893009412,
        "y": -9.975559116309237
      },
      {
        "x": 58.13519497029047,
        "y": -9.947836140246613
      },
      {
        "x": 58.19147290339516,
        "y": -9.93076441587903
      },
      {
        "x": 58.25,
        "y": -9.924999999999999
      },
      {
        "x": 58.30852709660484,
        "y": -9.93076441587903
      },
      {
        "x": 58.36480502970953,
        "y": -9.947836140246613
      },
      {
        "x": 58.41667106990588,
        "y": -9.975559116309237
      },
      {
        "x": 58.46213203435597,
        "y": -10.012867965644036
      },
      {
        "x": 58.49944088369077,
        "y": -10.058328930094119
      },
      {
        "x": 58.52716385975339,
        "y": -10.110194970290472
      },
      {
        "x": 58.54423558412097,
        "y": -10.166472903395162
      },
      {
        "x": 58.55,
        "y": -10.225
      },
      {
        "x": 58.55,
        "y": -10.885735931288066
      },
      {
        "x": 59.612132034355966,
        "y": -11.947867965644036
      },
      {
        "x": 59.649440883690765,
        "y": -11.993328930094119
      },
      {
        "x": 59.677163859753385,
        "y": -12.045194970290474
      },
      {
        "x": 59.69423558412097,
        "y": -12.101472903395162
      },
      {
        "x": 59.699999999999996,
        "y": -12.16
      },
      {
        "x": 59.69423558412097,
        "y": -12.21852709660484
      },
      {
        "x": 59.677163859753385,
        "y": -12.274805029709528
      },
      {
        "x": 59.649440883690765,
        "y": -12.326671069905881
      },
      {
        "x": 59.612132034355966,
        "y": -12.372132034355964
      },
      {
        "x": 59.56667106990588,
        "y": -12.409440883690763
      },
      {
        "x": 59.51480502970953,
        "y": -12.437163859753387
      },
      {
        "x": 59.45852709660484,
        "y": -12.454235584120969
      },
      {
        "x": 59.4,
        "y": -12.46
      },
      {
        "x": 59.34147290339516,
        "y": -12.454235584120969
      },
      {
        "x": 59.28519497029047,
        "y": -12.437163859753387
      },
      {
        "x": 59.23332893009412,
        "y": -12.409440883690763
      },
      {
        "x": 59.18786796564403,
        "y": -12.372132034355964
      }
    ]
  }
] as const
export function CloudHdmiPowerRoutes(){return <>
{vias.map(v=><via key={v.viaName} name={v.viaName} pcbX={v.x} pcbY={v.y} fromLayer={v.layer} toLayer={v.toLayer} holeDiameter={0.15} outerDiameter={0.3} connectsTo={v.selector}/>)}
{routes.map(r=><trace key={r.name} name={r.name} from={r.from} to={r.to} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,...r.points.map(([x,y])=>({x,y})),r.to]]}/>)}
{widening.map(p=><copperpour key={p.name} name={p.name} layer={p.layer} connectsTo={`net.${p.net}`} unbroken coveredWithSolderMask boardEdgeMargin={0} clearance={0.1} outline={p.outline}/>)}
</>}
