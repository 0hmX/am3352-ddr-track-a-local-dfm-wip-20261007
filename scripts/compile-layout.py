#!/usr/bin/env python3
"""Compile native TSX render output with an exact, compatible saved physical state.

Native source/schematic records are authoritative. Saved PCB/CAD records are
preserved verbatim. This is a display/export compiler, not a JSON logical board
import and not a router. A bound native layout fingerprint rejects later source
placement/footprint changes until the physical state is explicitly rebound.
"""
import argparse
import collections
import hashlib
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('native_parity', ROOT/'validation-source/check-native-parity.py')
parity = importlib.util.module_from_spec(spec)
spec.loader.exec_module(parity)
mirror_spec = importlib.util.spec_from_file_location('source_mirror', ROOT/'scripts/mirror-source.py')
mirror = importlib.util.module_from_spec(mirror_spec)
mirror_spec.loader.exec_module(mirror)


def encoded(value):
    return (json.dumps(value, sort_keys=True, separators=(',', ':'))+'\n').encode()


def sha(value):
    return hashlib.sha256(value).hexdigest()


def identity(record):
    return record[record['type']+'_id']


def physical(record):
    return record['type'].startswith(('pcb_', 'cad_'))


def rewrite(value, mapping, keys):
    if isinstance(value, dict):
        return {k: rewrite(v, mapping, keys) for k, v in value.items()}
    if isinstance(value, list):
        return [rewrite(v, mapping, keys) for v in value]
    if isinstance(value, str):
        return mapping.get(value, keys.get(value, value))
    return value


def fingerprint(records):
    """Ignore generated IDs; retain native physical geometry, layer and ownership."""
    components = {identity(r):r['name'] for r in records if r['type']=='source_component'}
    ports = {identity(r):(components[r['source_component_id']],r['name'],r.get('pin_number'))
             for r in records if r['type']=='source_port'}
    semantic = components | ports
    semantic.update({identity(r):r['name'] for r in records if r['type']=='source_net'})
    semantic.update({identity(r):components[r['source_component_id']]
                     for r in records if r['type']=='pcb_component'})
    semantic.update({identity(r):ports[r['source_port_id']]
                     for r in records if r['type']=='pcb_port'})
    def clean(value):
        if isinstance(value, dict):
            return {k: semantic[v] if isinstance(v,str) and v in semantic else clean(v)
                    for k,v in value.items() if not k.endswith(('_id','_ids')) or isinstance(v,str) and v in semantic}
        if isinstance(value, list):
            return [clean(v) for v in value]
        return value
    rows = [clean(r) for r in records if physical(r)]
    return sha(encoded(sorted(rows,key=lambda r:encoded(r))))



def missing_references(records):
    known = {identity(r) for r in records}
    known.update(r['subcircuit_id'] for r in records if r['type']=='source_group' and r.get('subcircuit_id'))
    missing = set()
    def walk(value, field, owner):
        if isinstance(value,dict):
            for key,child in value.items():
                walk(child,key,owner)
        elif isinstance(value,list):
            for child in value:
                walk(child,field,owner)
        elif isinstance(value,str) and (field.endswith(('_id','_ids')) or field=='spice_pin_to_source_port_map') and value not in known:
            missing.add((owner,field,value))
    for record in records:
        walk(record,'',identity(record))
        if record['type']=='simulation_spice_subcircuit':
            for port in record['spice_pin_to_source_port_map'].values():
                if port not in known:
                    missing.add((identity(record),'spice_pin_to_source_port_map',port))
    return missing


def compile_records(native, saved):
    nc,np,nr = parity.signature(native)
    sc,sp,sr = parity.signature(saved)
    nbyname = {c['name']:c for c in nc.values()}
    sbyname = {c['name']:c for c in sc.values()}
    assert nbyname.keys()==sbyname.keys(), 'Native/source component names differ from saved routing'
    assert nr.keys()==sr.keys(), 'Native physical pin identities differ from saved routing'
    assert all(nr[k]['nets']==sr[k]['nets'] and nr[k]['port_name']==sr[k]['port_name'] for k in nr), 'Native pin/net binding changed; saved routing is incompatible'
    fields = ['manufacturer_part_number','resistance','capacitance','inductance']
    assert all(nbyname[n].get(k)==sbyname[n].get(k) for n in nbyname for k in fields), 'Native value/MPN changed; rebind the physical state explicitly'
    assert not any(r['type'].endswith('_error') for r in native), 'Native render contains errors'
    mapping = {identity(c):identity(sbyname[c['name']]) for c in nc.values()}
    mapping.update({nr[k]['source_port_id']:sr[k]['source_port_id'] for k in nr})
    snets = {r['name']:r for r in saved if r['type']=='source_net'}
    nnets = [r for r in native if r['type']=='source_net']
    assert {r['name'] for r in nnets}==snets.keys(), 'Native named-net set changed'
    keys = {}
    for net in nnets:
        target = snets[net['name']]
        mapping[identity(net)] = identity(target)
        if net.get('subcircuit_connectivity_map_key'):
            keys[net['subcircuit_connectivity_map_key']] = target['subcircuit_connectivity_map_key']
    def trace_key(r, remap=False):
        convert = (lambda value:mapping[value]) if remap else (lambda value:value)
        return (tuple(sorted(convert(p) for p in r.get('connected_source_port_ids',[]))),
                tuple(sorted(convert(n) for n in r.get('connected_source_net_ids',[]))))
    saved_traces = collections.defaultdict(list)
    for trace in saved:
        if trace['type']=='source_trace':
            saved_traces[trace_key(trace)].append(trace)
    chosen = set()
    for trace in native:
        if trace['type']=='source_trace':
            matches = saved_traces[trace_key(trace,True)]
            assert matches, ('Native connection has no saved binding',trace)
            target = sorted(matches,key=identity)[0]
            mapping[identity(trace)] = identity(target)
            chosen.add(identity(target))
    # Physical debug branches and duplicate anchors name existing connections.
    # Keep only aliases whose endpoints are already on the declared native net.
    reverse_ports = {v:k for k,v in mapping.items() if k in np}
    native_net_by_port = {row['source_port_id']:set(row['nets']) for row in nr.values()}
    aliases = []
    for trace in saved:
        if trace['type']!='source_trace' or identity(trace) in chosen:
            continue
        names = {r['name'] for r in snets.values() if identity(r) in trace.get('connected_source_net_ids',[])}
        assert len(names)==1 and trace.get('connected_source_port_ids'), 'Legacy trace alias has no unique named net'
        assert all(names <= native_net_by_port[reverse_ports[p]] for p in trace['connected_source_port_ids']), 'Legacy physical branch adds a connection absent from native TSX'
        alias = dict(trace)
        alias['display_name'] = ' to '.join(f'.{sc[sp[p]["source_component_id"]]["name"]} > .{sp[p]["name"]}' for p in trace['connected_source_port_ids']) + ' on net.' + next(iter(names))
        alias['subcircuit_connectivity_map_key'] = snets[next(iter(names))]['subcircuit_connectivity_map_key']
        aliases.append(alias)
    internal_native={tuple(sorted(mapping[p] for p in r['source_port_ids'])) for r in native if r['type']=='source_component_internal_connection'}
    internal_saved={tuple(sorted(r['source_port_ids'])) for r in saved if r['type']=='source_component_internal_connection'}
    assert internal_native==internal_saved, 'Native internal metal connections differ from saved state'
    for kind in ['source_group','source_board','source_component_internal_connection','source_bus']:
        targets = [r for r in saved if r['type']==kind]
        for record in [r for r in native if r['type']==kind]:
            if kind=='source_component_internal_connection':
                matches = [r for r in targets if set(r['source_port_ids'])=={mapping[p] for p in record['source_port_ids']}]
            elif kind=='source_bus':
                matches = [r for r in targets if r.get('name')==record.get('name')]
            else:
                matches = targets
            if len(matches)==1:
                mapping[identity(record)] = identity(matches[0])
                if record.get('subcircuit_id') and matches[0].get('subcircuit_id'):
                    mapping[record['subcircuit_id']] = matches[0]['subcircuit_id']
            else:
                assert kind=='source_bus' and not matches, ('Source identity is ambiguous',kind,record)
                mapping[identity(record)] = f'{kind}_native_{identity(record)}'
    source = [rewrite(r,mapping,keys) for r in native if not physical(r) and not r['type'].startswith('simulation_')]
    models = [rewrite(r,mapping,keys) for r in native if r['type'].startswith('simulation_')]
    frozen = [r for r in saved if physical(r)]
    combined = source + aliases + frozen
    ids = [identity(r) for r in combined]
    assert len(ids)==len(set(ids)), ('Rebound record IDs collide', [k for k,v in collections.Counter(ids).items() if v>1])
    assert [r for r in combined if physical(r)]==frozen, 'Saved physical records changed'
    for r in combined+models:
        if r['type']=='schematic_port':
            assert r['source_port_id'] in sp, 'Schematic pin lost its saved physical identity'
    inherited = missing_references(native) | missing_references(saved)
    introduced = missing_references(combined+models) - inherited
    assert not introduced, ('New dangling references',sorted(introduced))
    native_virtual = missing_references(native)
    native_components = {r['source_component_id']:r for r in native if r['type']=='pcb_component'}
    saved_components = {r['source_component_id']:r for r in saved if r['type']=='pcb_component'}
    position_differences = [nc[key]['name'] for key,record in native_components.items() if any(record.get(field)!=saved_components[mapping[key]].get(field) for field in ['center','rotation','layer'])]
    return combined,models,{'introduced_dangling_references':sorted(introduced),
        'native_inherited_virtual_reference_count':len(native_virtual),
        'native_virtual_reference_scope':'Unchanged native schematic router virtual edge IDs; no synthetic source connections were fabricated.',
        'native_authoring_placements_overridden_by_frozen_layout':position_differences,
        'native_component_count':len(nc),'native_pin_count':len(np),
        'native_schematic_ports':sum(r['type']=='schematic_port' for r in native),
        'frozen_physical_record_count':len(frozen),'frozen_physical_records_exact':True,
        'legacy_alias_ids':[identity(r) for r in aliases],
        'legacy_alias_scope':'Existing named-net connections only; no logical connection added.',
        'model_count':len(models),'native_to_saved_ids':mapping}


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--native',type=Path,default=ROOT/'validation-source/native-source.circuit.json')
    parser.add_argument('--native-manifest',type=Path,default=ROOT/'validation-source/native-render-manifest.json')
    parser.add_argument('--physical',type=Path,required=True)
    parser.add_argument('--physical-sha256',required=True)
    parser.add_argument('--binding',type=Path,required=True)
    parser.add_argument('--bind',action='store_true',help='Explicitly bind this approved native layout to the selected physical state')
    parser.add_argument('--output',type=Path,required=True)
    parser.add_argument('--models',type=Path,required=True)
    parser.add_argument('--receipt',type=Path,required=True)
    args=parser.parse_args()
    assert len({p.resolve() for p in [args.output,args.models,args.receipt,args.native,args.physical,args.binding]})==6, 'Inputs and outputs must be separate'
    raw_native,raw_saved=args.native.read_bytes(),args.physical.read_bytes()
    assert sha(raw_saved)==args.physical_sha256, 'Saved physical hash precondition failed'
    provenance=json.loads(args.native_manifest.read_text())
    assert provenance['native_sha256']==sha(raw_native), 'Native render differs from its provenance manifest'
    source_hashes={str(p):sha(data) for p,data in sorted(mirror.collect(ROOT).items())}
    assert provenance['source_files']==source_hashes, 'TSX source changed after rendering; render fresh native source before replay'
    assert provenance['renderer_sha256']==sha((ROOT/'scripts/render-source.tsx').read_bytes()), 'Renderer changed after native output; rerender'
    native,saved=json.loads(raw_native),json.loads(raw_saved)
    combined,models,report=compile_records(native,saved)
    native_layout=fingerprint(native)
    if args.bind:
        assert not args.binding.exists(), 'Refuse to overwrite an existing layout binding'
        binding={'format':'native_tsx_frozen_layout_binding_v1','saved_sha256':sha(raw_saved),
                 'native_physical_fingerprint':native_layout,'native_render_at_binding_sha256':sha(raw_native),'physical_path':str(args.physical.resolve().relative_to(ROOT))}
    else:
        binding=json.loads(args.binding.read_text())
        assert binding['saved_sha256']==sha(raw_saved), 'Saved physical state differs from layout binding'
        assert binding['native_physical_fingerprint']==native_layout, 'Native placement/footprint changed; reroute or explicitly rebind the approved physical state'
    report.update(status='COMPILED_NATIVE_LOGIC_AND_EXACT_FROZEN_LAYOUT',native=str(args.native),
        native_sha256=sha(raw_native),native_source_files=source_hashes,saved_physical=str(args.physical),saved_physical_sha256=sha(raw_saved),
        output_sha256=sha(encoded(combined)),models_sha256=sha(encoded(models)),binding=binding,
        scope='Native TSX is the logical/schematic authority; the saved PCB/CAD layer is copied verbatim. No routing, clearance or SI pass is claimed.')
    for path,value in [(args.output,combined),(args.models,models),(args.receipt,report)]+([(args.binding,binding)] if args.bind else []):
        path.parent.mkdir(parents=True,exist_ok=True)
        path.write_bytes(encoded(value))
    print(json.dumps({k:report[k] for k in ['status','native_component_count','native_pin_count','frozen_physical_record_count','output_sha256']}))


if __name__=='__main__':
    main()
