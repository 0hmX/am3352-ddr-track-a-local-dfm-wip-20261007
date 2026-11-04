import data from '../data/cloud-scl-r6-routes.json'
export function CloudSclPullReturn(){const p=data.return;return <via name={p.name} pcbX={p.x} pcbY={p.y} fromLayer={p.fromLayer} toLayer={p.toLayer} holeDiameter={p.holeDiameter} outerDiameter={p.outerDiameter} connectsTo="net.GND"/>}
