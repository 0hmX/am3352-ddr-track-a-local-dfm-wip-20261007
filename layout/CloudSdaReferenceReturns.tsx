const grounds=[
  {
    "name": "SDA_RPWR5_RETURN",
    "net": "GND",
    "x": 18.49,
    "y": -14.6,
    "fromLayer": "inner1",
    "toLayer": "inner3",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  },
  {
    "name": "SDA_INT_SHARED_RETURN",
    "net": "GND",
    "x": 43.55,
    "y": -30.55,
    "fromLayer": "inner1",
    "toLayer": "inner3",
    "holeDiameter": 0.15,
    "outerDiameter": 0.3
  }
] as const
export function CloudSdaReferenceReturns(){return <>{grounds.map(g=><via key={g.name} name={g.name} pcbX={g.x} pcbY={g.y} fromLayer={g.fromLayer} toLayer={g.toLayer} holeDiameter={.15} outerDiameter={.3} connectsTo='net.GND'/>)}</>}
