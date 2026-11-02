"""Whole-board emitted reference comparison, including real drilled holes and full wire-to-via segments."""
import json,math,sys,hashlib,importlib.util,warnings,pickle
from pathlib import Path
from shapely.geometry import Point,LineString,box
from shapely.affinity import rotate
from shapely.ops import unary_union
from gerbonara import ExcellonFile
from gerbonara.utils import MM
sp=importlib.util.spec_from_file_location('gc','scripts/cloud-gerber-check.py');gc=importlib.util.module_from_spec(sp);sp.loader.exec_module(gc)
refs={'top':['inner1'],'inner2':['inner1','inner3'],'inner4':['inner3'],'inner5':['inner6'],'bottom':['inner6']}
def read(folder):
 rows=json.load(open(folder/'copper.json'));vias=[r for r in rows if r['type']=='pcb_via'];pads=[r for r in rows if r['type']in ['pcb_smtpad','pcb_plated_hole']];dr=gc.read_drills(folder/'gerber')[0];np=folder/'gerber/drill_npth.drl'
 if np.exists():
  with warnings.catch_warnings(record=True)as ww:warnings.simplefilter('always');f=ExcellonFile.open(np)
  for obj in f.objects:dr.append(dict(shape=unary_union([gc.primitive_shape(v)for v in obj.to_primitives(unit=MM)]),span=gc.LAYERS))
 grounds={};hashes={}
 for ref in ['inner1','inner3','inner6']:
  f=folder/'gerber'/('In'+ref[-1]+'_Cu.gbr');c=gc.read_copper(f.read_text(),ref)[0];gs=[q for q in gc.polygons(c)if q.covers(Point(-26,24))];assert len(gs)==1
  grounds[ref]=gs[0].difference(unary_union([q['shape']for q in dr if ref in q['span']]));hashes[str(f)]=hashlib.sha256(f.read_bytes()).hexdigest()
 traces={}
 for t in rows:
  if t['type']!='pcb_trace'or t.get('netName')=='GND':continue
  route=t['route'];groups={}
  for a,b in zip(route,route[1:]):
   la=a.get('layer')if a['route_type']=='wire'else a.get('to_layer');lb=b.get('layer')if b['route_type']=='wire'else b.get('from_layer')
   if la==lb and math.dist((a['x'],a['y']),(b['x'],b['y']))>1e-9:
    width=a.get('width',b.get('width',.1));groups.setdefault(la,[]).append(LineString([(a['x'],a['y']),(b['x'],b['y'])]).buffer(width/2,quad_segs=64))
  ends=[(route[i]['x'],route[i]['y'])for i in [0,-1]]
  ownpads=[p for p in pads if p.get('netName')==t.get('netName')and any(math.dist((p['x'],p['y']),xy)<1e-5 for xy in ends)]
  ownvias=[v for v in vias if v.get('netName')==t.get('netName')and any(math.dist((v['x'],v['y']),(p['x'],p['y']))<1e-5 for p in ownpads)]
  entries={}
  for layer,parts in groups.items():
   body=unary_union(parts)
   for ref in refs.get(layer,[]):
    masks=[Point(v['x'],v['y']).buffer(.36,quad_segs=128)for v in ownvias if ref in v['layers']]
    # Only direct surface-terminal SMT body, never an unspanned inner-layer aperture.
    if layer in ['top','bottom']:
     for p in ownpads:
      if p['type']=='pcb_smtpad'and layer in p.get('layers',[]):
       masks.append(rotate(box(p['x']-p['width']/2,p['y']-p['height']/2,p['x']+p['width']/2,p['y']+p['height']/2),p.get('ccw_rotation',0),origin=(p['x'],p['y'])))
    test=body.difference(unary_union(masks));miss=test.difference(grounds[ref]);entries[(layer,ref)]=dict(body=test,missing=miss,margin=test.distance(grounds[ref].boundary))
  name=t['traceName'];assert name not in traces;traces[name]=dict(net=t.get('netName'),entries=entries)
 return traces,hashes
before,after,out=map(Path,sys.argv[1:4]);A,ah=read(before);B,bh=read(after);cuts=[];newrows=[]
for name,t in B.items():
 old=A.get(name)
 if old:assert old['net']==t['net']
 for key,e in t['entries'].items():
  prev=old['entries'].get(key)if old else None;delta=e['missing'].difference(prev['missing'].buffer(.000002))if prev else e['missing']
  row=dict(trace=name,net=t['net'],signalLayer=key[0],referenceLayer=key[1],uncoveredMm2=e['missing'].area,newUncoveredMm2=delta.area,marginMm=e['margin'])
  if not old:newrows.append(row)
  if delta.area>1e-9:cuts.append(dict(row,newBounds=list(delta.bounds)))
r=dict(beforeNativeSha256=hashlib.sha256((before/'board.circuit.json').read_bytes()).hexdigest(),afterNativeSha256=hashlib.sha256((after/'board.circuit.json').read_bytes()).hexdigest(),newReferenceCuts=cuts,newTraceRows=newrows,gerberHashes={**ah,**bh},scope='Full wire/wire and wire/via planar widths against actual connected emitted GND minus span-qualified Excellon and NPTH holes. Only real own component terminal .36mm aperture masks; direct surface SMT footprint masked on its own routing surface only. No midpoint or foreign-hole masks. Spatial comparison allows2um exported-coordinate tolerance for previously uncovered polygons, not a clearance waiver. No SI/fabrication qualification.')
out.write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({k:v for k,v in r.items()if k!='gerberHashes'},indent=2))
