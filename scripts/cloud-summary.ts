import { readFileSync, writeFileSync } from "node:fs"
import { getFullConnectivityMapFromCircuitJson } from "circuit-json-to-connectivity-map"
const directory = process.argv[2]
if (!directory) throw Error("Provide a cloud export directory")
const records = JSON.parse(readFileSync(`${directory}/board.circuit.json`, "utf8"))
const report = JSON.parse(readFileSync(`${directory}/validation/report.json`, "utf8"))
const map = getFullConnectivityMapFromCircuitJson(records)
const nets = records.filter((r: any) => r.type === "source_net")
const distinct = new Map()
nets.forEach((net: any, index: number) => {
  const key = map.getNetConnectedToId(net.source_net_id)
  const result = report.current.connectivity.nets[index]
  if (result.name !== net.name) throw Error("Net report order changed")
  const old = distinct.get(key)
  if (old && (old.connected !== result.connected || old.physicalGroups !== result.physicalGroups)) throw Error("Aliases have conflicting physical results")
  if (!old) distinct.set(key, result)
})
const unique = [...distinct.values()]
const summary = {
  uniqueNamedNets: unique.length,
  connectedNets: unique.filter(n => n.connected).length,
  remainingNets: unique.filter(n => !n.connected).length,
  singletonNets: unique.filter(n => n.pinCount === 1).length,
  shortedNets: unique.filter(n => n.shorted).length,
  nativeErrors: Object.fromEntries(Object.entries(report.current.native).map(([k,v]: any) => [k,v.length])),
  supplementalFindings: Object.fromEntries(Object.entries(report.current.supplemental).map(([k,v]: any) => [k,v.length])),
  nets: unique,
}
writeFileSync(`${directory}/connectivity-summary.json`, JSON.stringify(summary,null,2))
console.log(JSON.stringify({...summary,nets:undefined},null,2))
