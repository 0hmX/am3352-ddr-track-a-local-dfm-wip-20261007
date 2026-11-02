// TPS65216 Rev C Fig 8-7 drill/land dimensions, in the unchanged 4.1 mm EP.
const thermalVias = [
  {
    "x": 21.0,
    "y": -2.0,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 22.8,
    "y": -0.2,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 22.8,
    "y": -3.8,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 19.2,
    "y": -3.35,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 19.2,
    "y": -0.65,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 21.0,
    "y": -0.2,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 21.0,
    "y": -3.8,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 22.8,
    "y": -2.0,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 19.2,
    "y": -2.0,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 21.45,
    "y": -2.9,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 21.45,
    "y": -1.1,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 22.35,
    "y": -2.9,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 22.35,
    "y": -1.1,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 19.2,
    "y": -2.45,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 19.2,
    "y": -1.1,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 21.0,
    "y": -2.45,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 21.45,
    "y": -3.35,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 21.45,
    "y": -0.65,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 22.35,
    "y": -3.35,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 22.35,
    "y": -0.65,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 22.8,
    "y": -2.45,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 19.2,
    "y": -1.55,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 21.0,
    "y": -1.55,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 22.35,
    "y": -1.55,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  },
  {
    "x": 21.0,
    "y": -3.35,
    "fromLayer": "top",
    "toLayer": "bottom",
    "holeDiameter": 0.2032,
    "outerDiameter": 0.4064
  }
] as const
export function CloudPmicThermalArray(){return <>{thermalVias.map((v,i)=><via key={i} name={`CLOUD_PMIC_EP_${i}`} pcbX={v.x} pcbY={v.y} fromLayer="top" toLayer="bottom" holeDiameter={v.holeDiameter} outerDiameter={v.outerDiameter} connectsTo="net.GND" />)}</>}
