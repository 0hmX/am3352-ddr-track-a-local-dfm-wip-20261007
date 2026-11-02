import data from '../data/cloud-i2c-sda-real-pull.json'
export function CloudI2cRealPullReturn(){const p=data.newGroundReturn;return <via name={p.name} pcbX={p.x} pcbY={p.y} fromLayer={p.fromLayer} toLayer={p.toLayer} holeDiameter={p.holeDiameter} outerDiameter={p.outerDiameter} connectsTo="net.GND"/>}
