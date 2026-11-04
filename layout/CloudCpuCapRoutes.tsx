// Requires local C10 relief and coordinated main-plane/VTP routing. Not yet native accepted.
export const vias=[
  {
    "selector": ".Processor > .U1 > .C10",
    "x": -5.2,
    "y": 0.4,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_164",
    "net": "CAP_VBB_MPU",
    "viaName": "CPUCAP_VIP_0",
    "toLayer": "inner5"
  },
  {
    "selector": ".Processor > .C_CAP_VBB_MPU > .pin1",
    "x": -11.5,
    "y": -0.3,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.62,
    "height": 0.62,
    "padId": "pcb_smtpad_438",
    "net": "CAP_VBB_MPU",
    "viaName": "CPUCAP_VIP_1",
    "toLayer": "inner5"
  },
  {
    "selector": ".Processor > .U1 > .D6",
    "x": -4.4,
    "y": -2.8000000000000003,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_93",
    "net": "CAP_VDD_RTC",
    "viaName": "CPUCAP_VIP_2",
    "toLayer": "inner5"
  },
  {
    "selector": ".Power_management > .C_RTC_LDO > .pin1",
    "x": -6.8,
    "y": -6.25,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.62,
    "height": 0.62,
    "padId": "pcb_smtpad_741",
    "net": "CAP_VDD_RTC",
    "viaName": "CPUCAP_VIP_3",
    "toLayer": "inner5"
  },
  {
    "selector": ".Processor > .U1 > .D9",
    "x": -4.4,
    "y": -0.4,
    "layer": "top",
    "shape": "circle",
    "radius": 0.2,
    "padId": "pcb_smtpad_147",
    "net": "CAP_VDD_SRAM_CORE",
    "viaName": "CPUCAP_VIP_4",
    "toLayer": "inner5"
  },
  {
    "selector": ".Processor > .C_CAP_VDD_SRAM_CORE > .pin1",
    "x": -3.55,
    "y": -0.25,
    "layer": "bottom",
    "shape": "rect",
    "width": 0.62,
    "height": 0.62,
    "padId": "pcb_smtpad_434",
    "net": "CAP_VDD_SRAM_CORE",
    "viaName": "CPUCAP_VIP_5",
    "toLayer": "inner5"
  }
] as const
export const routes=[
  {
    "name": "CPUCAP_CAP_VBB_MPU_0",
    "net": "CAP_VBB_MPU",
    "from": "CPUCAP_VIP_0.inner5",
    "to": "CPUCAP_VIP_1.inner5",
    "width": 0.3,
    "layer": "inner5",
    "points": [
      [
        -5.2,
        0.4
      ],
      [
        -5.9,
        -0.29999999999999993
      ],
      [
        -11.5,
        -0.3
      ]
    ],
    "padFrom": ".Processor > .U1 > .C10",
    "padTo": ".Processor > .C_CAP_VBB_MPU > .pin1",
    "lengthMm": 6.589949493661166
  },
  {
    "name": "CPUCAP_CAP_VDD_RTC_1",
    "net": "CAP_VDD_RTC",
    "from": "CPUCAP_VIP_2.inner5",
    "to": "CPUCAP_VIP_3.inner5",
    "width": 0.2,
    "layer": "inner5",
    "points": [
      [
        -4.4,
        -2.8
      ],
      [
        -6.8,
        -5.2
      ],
      [
        -6.8,
        -6.25
      ]
    ],
    "padFrom": ".Processor > .U1 > .D6",
    "padTo": ".Power_management > .C_RTC_LDO > .pin1"
  },
  {
    "name": "CPUCAP_CAP_VDD_SRAM_CORE_2",
    "net": "CAP_VDD_SRAM_CORE",
    "from": "CPUCAP_VIP_4.inner5",
    "to": "CPUCAP_VIP_5.inner5",
    "width": 0.2,
    "layer": "inner5",
    "points": [
      [
        -4.4,
        -0.4
      ],
      [
        -4.25,
        -0.25
      ],
      [
        -3.55,
        -0.25
      ]
    ],
    "padFrom": ".Processor > .U1 > .D9",
    "padTo": ".Processor > .C_CAP_VDD_SRAM_CORE > .pin1"
  }
] as const
export function CloudCpuCapRoutes(){return <>
 {vias.map(v=><via key={v.viaName} name={v.viaName} pcbX={v.x} pcbY={v.y} fromLayer={v.layer} toLayer={v.toLayer} holeDiameter={0.15} outerDiameter={0.3} connectsTo={v.selector}/>)}
 {routes.map(r=><trace key={r.name} name={r.name} from={r.from} to={r.to} width={r.width} pcbPathRelativeTo=".Processor > .U1 > .A1" pcbPaths={[[r.from,...r.points.map(([x,y])=>({x,y})),r.to]]}/>)}
</>}
