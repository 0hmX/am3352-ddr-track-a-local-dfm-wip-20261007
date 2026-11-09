"""Read-only width-conservative surface memberships for ground pad-via removal."""
import json,pickle,sys,math,hashlib
from pathlib import Path
from shapely.geometry import Point
from shapely.ops import unary_union
from shapely.strtree import STRtree
reportPath=Path(sys.argv[1]);out=Path(sys.argv[2]);directory=Path(sys.argv[3]);g=json.loads(reportPath.read_text());c=pickle.load(open(reportPath.with_suffix('.cache.pkl'),'rb'));drills=c['drills'];native=(directory/'board.circuit.json').read_bytes();board=next(v for v in json.loads(native)if v['type']=='pcb_board');neck=board['min_trace_width']
expected=hashlib.sha256((hashlib.sha256(native).hexdigest()+hashlib.sha256(Path('scripts/cloud-gerber-check.py').read_bytes()).hexdigest()+''.join(hashlib.sha256(p.read_bytes()).hexdigest()for p in sorted((directory/'gerber').iterdir()))).encode()).hexdigest()
if c['key']!=expected:raise ValueError('Post-drill cache must match native build, checker and exported files')
if g['nativeSha256']!=hashlib.sha256((Path(sys.argv[3])/'board.circuit.json').read_bytes()).hexdigest():raise ValueError('Native hash mismatch')
parts={};trees={}
for layer in ['top','bottom']:
 metal=c['premetal'][layer].buffer(-neck/2,quad_segs=16).difference(unary_union([d['shape']for d in drills if layer in d['span']]))
 def polygons(v):
  if v.geom_type=='Polygon':return[v]
  return[p for a in getattr(v,'geoms',[])for p in polygons(a)]
 parts[layer]=polygons(metal);trees[layer]=STRtree(parts[layer])
for b in g['barrels']:
 p=Point(*b['center']);shape=unary_union([d['shape']for d in drills if set(d['span'])==set(b['span'])and d['shape'].distance(p)<=.0001]);hs=[]
 for l in ['top','bottom']:
  if l not in b['span']:continue
  hs.extend([[l,int(i)]for i in trees[l].query(shape.boundary.buffer(.000002))if parts[l][i].distance(shape.boundary)<=.000002])
 b['surfaceNeckIslands']=hs
g['surfaceNeckModel']={'minimumWidthMm':neck,'checkerSha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),'method':'Erode actual GND Gerber copper by half the board minimum trace width before subtracting actual drills. A same-surface path must survive this erosion; no dilation rejoins separated pieces. Erosion before drilling preserves annular contact at these pads. Conservative geometric screen, no SI/PI qualification.'}
out.write_text(json.dumps(g,indent=2)+'\n');print('Width-conservative surface membership for',len(g['barrels']),'ground barrels')
