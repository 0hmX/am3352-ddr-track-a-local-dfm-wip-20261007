"""Rebuild actual GND connectivity after subtracting all Excellon holes.
Ground copper assignment comes from the verified pre-drill net graph; actual
post-drill islands and actual exported hole boundaries define connectivity.
"""
import json,sys,inspect,importlib.util,hashlib,math,warnings,pickle
from pathlib import Path
from shapely.geometry import Point
from shapely.ops import unary_union
from shapely.strtree import STRtree
from gerbonara import ExcellonFile
from gerbonara.utils import MM
D=Path(sys.argv[1]);OUT=Path(sys.argv[2]);s=importlib.util.spec_from_file_location('gc','scripts/cloud-gerber-check.py');gc=importlib.util.module_from_spec(s);s.loader.exec_module(gc);src=inspect.getsource(gc.check).replace('def check(directory):','def context(directory):').replace("    return {\n        'status':","    return {\n        '_context': (layer_islands,uf,root_names,records),\n        'status':");exec(src,gc.__dict__);key=hashlib.sha256((hashlib.sha256((D/'board.circuit.json').read_bytes()).hexdigest()+hashlib.sha256(Path('scripts/cloud-gerber-check.py').read_bytes()).hexdigest()+''.join(hashlib.sha256(p.read_bytes()).hexdigest()for p in sorted((D/'gerber').iterdir()))).encode()).hexdigest();cache=OUT.with_suffix('.cache.pkl')
if cache.exists()and pickle.load(open(cache,'rb'))['key']==key:
 cached=pickle.load(open(cache,'rb'));result,A,premetal,drills=cached['result'],cached['A'],cached['premetal'],cached['drills']
else:
 result=gc.context(D);pre,pu,names,A=result.pop('_context');assert result['status']=='pass_no_detected_shorts';premetal={l:unary_union([g for i,g in enumerate(pre[l])if 'GND'in names.get(pu.root((l,i)),set())])for l in gc.LAYERS};drills,warning=gc.read_drills(D/'gerber');f=D/'gerber/drill_npth.drl'
 if f.exists():
  with warnings.catch_warnings(record=True)as captured:
   warnings.simplefilter('always');ff=ExcellonFile.open(f)
  for w in captured:
   if 'G90 header statement found after end of header'not in str(w.message):raise ValueError(str(w.message))
  for o in ff.objects:drills.append(dict(shape=unary_union([gc.primitive_shape(p)for p in o.to_primitives(unit=MM)]),span=gc.LAYERS,file=f.name))
 pickle.dump(dict(key=key,result=result,A=A,premetal=premetal,drills=drills),open(cache,'wb'))
net_for=gc.logical_nets(A)
metal={l:premetal[l].difference(unary_union([d['shape']for d in drills if l in d['span']]))for l in gc.LAYERS};parts={l:list(gc.polygons(g))for l,g in metal.items()};trees={l:STRtree(g)for l,g in parts.items()};uf=gc.UnionFind();traceid={t['pcb_trace_id']:t.get('source_trace_id')for t in A if t['type']=='pcb_trace'}
def net(v):return net_for(v.get('source_net_id')or v.get('source_trace_id')or traceid.get(v.get('pcb_trace_id'))or v.get('source_port_id'))
def hits(l,g):return [(l,int(i))for i in trees[l].query(g.buffer(gc.SEED_TOLERANCE_MM))if parts[l][i].distance(g)<=gc.SEED_TOLERANCE_MM]
barrels=[];failures=[]
for v in A:
 if v['type']not in['pcb_via','pcb_plated_hole']:continue
 p=Point(v['x'],v['y'])
 if not any(premetal[l].distance(p)<=gc.SEED_TOLERANCE_MM for l in v['layers']):continue
 match=[d for d in drills if set(d['span'])==set(v['layers'])and d['shape'].distance(p)<=.0001]
 if not match:failures.append(dict(kind='ground barrel drill match',id=v.get(v['type']+'_id'),count=len(match)));continue
 drillShape=unary_union([d['shape']for d in match]);h={l:hits(l,drillShape.boundary)for l in v['layers']};flat=[i for hs in h.values()for i in hs]
 if not flat:failures.append(dict(kind='no actual GND annulus touching hole boundary',center=[v['x'],v['y']],span=v['layers']));continue
 for i in flat[1:]:uf.join(flat[0],i)
 barrels.append(dict(id=v.get(v['type']+'_id'),center=[v['x'],v['y']],span=v['layers'],exportedObjects=len(match),annularContactLayers=[l for l,hs in h.items()if hs],islands=flat))
ports=[]
for v in A:
 if v['type']!='pcb_port'or net_for(v.get('source_port_id'))!='GND':continue
 p=Point(v['x'],v['y']);hs=[]
 for l in v['layers']:
  dd=[d for d in drills if l in d['span']and d['shape'].distance(p)<.0001]
  if dd:
   for d in dd:hs+=hits(l,d['shape'].boundary)
  else:hs+=hits(l,p)
 roots={uf.root(i)for i in hs}
 if not roots:failures.append(dict(kind='GND terminal has no post-drill copper',port=v['pcb_port_id'],center=[v['x'],v['y']]))
 ports.append(dict(id=v['pcb_port_id'],sourcePort=v.get('source_port_id'),roots=sorted(roots)))
# Count named physical terminals as the standard checker does (component source ports), excluding via-only internal ports.
sps={v['source_port_id']:v for v in A if v['type']=='source_port'};components={v['source_component_id']for v in A if v['type']=='source_component'};componentPorts=[p for p in ports if sps.get(p['sourcePort'],{}).get('source_component_id')in components];roots=set(r for p in componentPorts for r in map(tuple,p['roots']));assert len(componentPorts)==next(v['pinCount']for v in result['nets']if v['name']=='GND')
report=dict(status='pass'if len(roots)==1 and not failures else'findings',nativeSha256=hashlib.sha256((D/'board.circuit.json').read_bytes()).hexdigest(),method='Actual GND Gerber islands minus actual Excellon holes; rebuild island union through exported GND barrel wall boundaries on their real spans. Component terminals inside holes seed actual annular copper, never the empty drill center.',preDrillGround=next(v for v in result['nets']if v['name']=='GND'),postDrillGroundTerminalCount=len(componentPorts),postDrillGroundTerminalGroups=len(roots),groundBarrelsMatched=len(barrels),failures=failures,barrels=barrels,checkerSha256=hashlib.sha256(Path('scripts/cloud-gerber-check.py').read_bytes()).hexdigest(),terminalGroups=[dict(root=list(r),ports=[dict(id=p['id'],sourcePort=p['sourcePort'],component=next((c['name']for c in A if c['type']=='source_component'and c['source_component_id']==sps.get(p['sourcePort'],{}).get('source_component_id')),None),pin=sps.get(p['sourcePort'],{}).get('name'))for p in componentPorts if r in map(tuple,p['roots'])])for r in sorted(roots)],limits=['Ground-only connectivity check; no SI, impedance, return-current distribution or fabrication qualification.','Metal assignment uses the no-short pre-drill net graph, but connectivity is recomputed entirely after subtracting actual drill shapes.'])
OUT.write_text(json.dumps(report,indent=2));print(json.dumps({k:v for k,v in report.items()if k!='barrels'},indent=2));assert report['status']=='pass'
