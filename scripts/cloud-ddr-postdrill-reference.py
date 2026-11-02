"""Read-only actual Gerber/Excellon DDR reference audit. No native or export edits."""
import json,hashlib,inspect,importlib.util,math,sys,warnings
from pathlib import Path
from shapely.geometry import Point,LineString
from shapely.ops import unary_union
from gerbonara import ExcellonFile
from gerbonara.utils import MM
D=Path(sys.argv[1]);OUT=Path(sys.argv[2]);OUT.parent.mkdir(parents=True,exist_ok=True)
s=importlib.util.spec_from_file_location('gerber','scripts/cloud-gerber-check.py');gc=importlib.util.module_from_spec(s);s.loader.exec_module(gc);source=inspect.getsource(gc.check).replace('def check(directory):','def check_with_context(directory):');needle="    return {\n        'status':";assert source.count(needle)==1;source=source.replace(needle,"    return {\n        '_audit_context': (layer_islands,uf,root_names,records),\n        'status':");exec(source,gc.__dict__)
result=gc.check_with_context(D);islands,uf,names,A=result.pop('_audit_context');assert result['status']=='pass_no_detected_shorts';net_for=gc.logical_nets(A)
def copper(net,layer):return unary_union([g for i,g in enumerate(islands[layer])if net in names.get(uf.root((layer,i)),set())])
drills,dw=gc.read_drills(D/'gerber');p=D/'gerber/drill_npth.drl'
if p.exists():
 with warnings.catch_warnings(record=True)as captured:
  warnings.simplefilter('always');f=ExcellonFile.open(p)
 for w in captured:
  if 'G90 header statement found after end of header'not in str(w.message):raise ValueError(str(w.message))
 for obj in f.objects:drills.append(dict(shape=unary_union([gc.primitive_shape(z)for z in obj.to_primitives(unit=MM)]),span=gc.LAYERS,file=p.name))
actualFiles={p.name for p in(D/'gerber').glob('*.drl')};assert actualFiles=={d['file']for d in drills},actualFiles-{d['file']for d in drills}
traceids={r['pcb_trace_id']:r.get('source_trace_id')for r in A if r['type']=='pcb_trace'}
def vnet(v):return net_for(v.get('source_net_id')or v.get('source_trace_id')or traceids.get(v.get('pcb_trace_id'))or v.get('pcb_port_id'))
for d in drills:
 c=d['shape'].centroid
 vs=[v for v in A if v['type']in['pcb_via','pcb_plated_hole','pcb_hole']and math.dist((v['x'],v['y']),(c.x,c.y))<.001 and (v['type']=='pcb_hole'or set(v.get('layers',[]))==set(d['span']))]
 d['identity']=[dict(id=v.get(v['type']+'_id'),net=vnet(v),type=v['type'],nativeCenter=[v['x'],v['y']],holeDiameterMm=v.get('hole_diameter'))for v in vs]
 d['center']=[c.x,c.y]
ss={v['source_trace_id']:v for v in A if v['type']=='source_trace'};want={r['name']for r in json.load(open('work/cloud-ddr/reference-next-v26/trace-only-v1/routes.json'))['routes']};ts={ss[t['source_trace_id']].get('name'):t for t in A if t['type']=='pcb_trace'and ss[t['source_trace_id']].get('name')in want};assert len(ts)==46
refs={'top':['inner1'],'inner2':['inner1','inner3'],'inner4':['inner3'],'bottom':['inner6']};ground={l:copper('GND',l)for l in ['inner1','inner3','inner6']};cuts={l:unary_union([d['shape']for d in drills if l in d['span']])for l in ground};post={l:g.difference(cuts[l])for l,g in ground.items()};entries=[]
for n,t in sorted(ts.items()):
 segs=[(p,q)for p,q in zip(t['route'],t['route'][1:])if p['route_type']==q['route_type']=='wire'and p['layer']==q['layer']and math.dist((p['x'],p['y']),(q['x'],q['y']))>1e-9];layers={p['layer']for p,q in segs};assert len(layers)==1;layer=next(iter(layers));line=unary_union([LineString([(p['x'],p['y']),(q['x'],q['y'])])for p,q in segs]);vs=[v for v in A if v['type']=='pcb_via'and(v.get('source_trace_id')==t['source_trace_id']or v.get('pcb_trace_id')==t['pcb_trace_id'])]
 for ref in refs[layer]:
  own=unary_union([Point(v['x'],v['y']).buffer(.36,quad_segs=128)for v in vs if ref in v['layers']]);b=copper(n,layer).difference(own);ob=b.difference(ground[ref]);nb=b.difference(post[ref]);extra=nb.difference(ob);contributors=[]
  for d in drills:
   if ref not in d['span']:continue
   area=extra.intersection(d['shape']).area
   if area>1e-10:contributors.append(dict(excellonFile=d['file'],excellonCenter=d['center'],span=d['span'],holeBounds=list(d['shape'].bounds),nativeIdentity=d['identity'],addedMissingMm2=area,centerlineOverHoleMm=line.difference(own).intersection(d['shape']).length))
  entries.append(dict(net=n,signalLayer=layer,referenceLayer=ref,preDrillUncoveredAreaMm2=ob.area,postDrillUncoveredAreaMm2=nb.area,addedDrillOnlyUncoveredAreaMm2=extra.area,preDrillMarginMm=b.distance(ground[ref].boundary),postDrillMarginMm=b.distance(post[ref].boundary),postDrillCenterlineGapMm=line.difference(own).difference(post[ref]).length,actualOwnTerminalMasks=[dict(center=[v['x'],v['y']],span=v['layers'],radiusMm=.36)for v in vs if ref in v['layers']],addedDrillContributors=contributors))
report=dict(status='Read-only geometric reference audit; actual Excellon holes subtracted by exported physical span, including NPTH. No route, mask, plane or source changed.',nativePath=str(D/'board.circuit.json'),nativeSha256=hashlib.sha256((D/'board.circuit.json').read_bytes()).hexdigest(),timingRouteCount=46,preDrillFindingCount=sum(e['preDrillUncoveredAreaMm2']>1e-9 for e in entries),postDrillFindingCount=sum(e['postDrillUncoveredAreaMm2']>1e-9 for e in entries),additionalDrillFindingCount=sum(e['addedDrillOnlyUncoveredAreaMm2']>1e-9 for e in entries),additionalDrillUniqueRoutes=sorted({e['net']for e in entries if e['addedDrillOnlyUncoveredAreaMm2']>1e-9}),entries=entries,allExcellonFilesCovered=sorted(actualFiles),exportFileHashes={p.name:hashlib.sha256(p.read_bytes()).hexdigest()for p in sorted((D/'gerber').iterdir())if p.suffix in ['.gbr','.drl']},referenceGroundSource='All emitted copper islands physically labeled GND by verified exported barrel spans, including GND via lands/pads; subtract actual Excellon hole shapes on each crossed reference layer.',limitations=['This projection audit does not establish SI, impedance, return-current distribution or fabrication qualification.','Ground labels come from the pre-drill physical island graph; this audit does not independently rebuild post-drill connectivity.','Excellon diameter is measured from actual exported hole geometry; finished plating and actual stack remain unspecified.','Only actual own signal barrels crossing the evaluated reference layer are masked; no GND or foreign hole is masked.'])
OUT.write_text(json.dumps(report,indent=2));print(json.dumps({k:v for k,v in report.items()if k not in ['entries','exportFileHashes']},indent=2));print(json.dumps([e for e in entries if e['addedDrillOnlyUncoveredAreaMm2']>1e-9],indent=2))
