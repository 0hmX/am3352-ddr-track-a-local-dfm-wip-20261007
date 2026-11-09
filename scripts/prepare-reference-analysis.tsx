import {readFileSync,writeFileSync} from 'node:fs'
import {getFullConnectivityMapFromCircuitJson} from 'circuit-json-to-connectivity-map'

// Read-only annotations for cloud-postdrill-reference-delta.py.
// Usage: bun scripts/prepare-reference-analysis.tsx <baseline-dir> <current-dir>
// copper.json is check output only; never a board or route input.
const directories=process.argv.slice(2)
if(!directories.length)throw Error('Provide native export directories')
for(const directory of directories){
  const records=JSON.parse(readFileSync(directory+'/board.circuit.json','utf8')) as any[]
  const connectivity=getFullConnectivityMapFromCircuitJson(records)
  const names=new Map<string,Set<string>>()
  for(const net of records.filter(r=>r.type==='source_net')){
    const key=connectivity.getNetConnectedToId(net.source_net_id)!
    const set=names.get(key)??new Set<string>()
    set.add(net.name)
    names.set(key,set)
  }
  const sources=new Map(records.filter(r=>r.type==='source_trace').map(r=>[r.source_trace_id,r]))
  const copper=records.filter(r=>['pcb_trace','pcb_via','pcb_smtpad','pcb_plated_hole'].includes(r.type)).map(record=>({
    ...record,
    netName:[...(names.get(connectivity.getNetConnectedToId(record.source_net_id??record[record.type+'_id'])!)??[])].sort().join('|'),
    ...(record.type==='pcb_trace'?{traceName:sources.get(record.source_trace_id)?.name??sources.get(record.source_trace_id)?.display_name}:{}),
  }))
  const traceNames=new Set<string>()
  for(const trace of copper.filter(r=>r.type==='pcb_trace')){
    if(!trace.traceName||traceNames.has(trace.traceName))throw Error('Missing or duplicate physical trace name: '+trace.traceName)
    traceNames.add(trace.traceName)
  }
  writeFileSync(directory+'/copper.json',JSON.stringify(copper))
  console.log(directory,'annotated traces',traceNames.size)
}
