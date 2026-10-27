#!/usr/bin/env python3
"""Compare native TSX output with saved routed source identity; never join copper."""
import argparse
import collections
import hashlib
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
def read(path): return json.loads(path.read_text())
def signature(records):
    components={r['source_component_id']:r for r in records if r['type']=='source_component'}
    ports={r['source_port_id']:r for r in records if r['type']=='source_port'}
    nets={r['source_net_id']:r['name'] for r in records if r['type']=='source_net'}
    bindings=collections.defaultdict(set)
    for r in records:
        if r['type']=='source_trace':
            for p in r.get('connected_source_port_ids',[]):
                bindings[p].update(nets[n] for n in r.get('connected_source_net_ids',[]))
    rows={}
    for pid,p in ports.items():
        c=components[p['source_component_id']]
        key=(c['name'], str(p.get('pin_number',p['name'])))
        assert key not in rows, ('Duplicate native physical-pin ordinal',key)
        rows[key]={'port_name':p['name'],'nets':sorted(bindings[pid]),'source_port_id':pid}
    return components,ports,rows

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source',type=Path,default=ROOT/'validation-source/native-source.circuit.json')
    parser.add_argument('--physical',type=Path,default=ROOT/json.loads((ROOT/'validation-source/layout-binding-v5.json').read_text())['physical_path'])
    parser.add_argument('--output',type=Path,default=ROOT/'validation-source/source-parity.json')
    args=parser.parse_args();native=read(args.source);physical=read(args.physical)
    nc,np,nr=signature(native);pc,pp,pr=signature(physical)
    names=lambda cs:{r['name'] for r in cs.values()}
    missing=sorted(names(pc)-names(nc));extra=sorted(names(nc)-names(pc));pin_mismatches=[]
    for key in sorted(nr.keys()|pr.keys()):
        actual,expected=nr.get(key),pr.get(key)
        if actual is None or expected is None or actual['nets']!=expected['nets'] or actual['port_name']!=expected['port_name']:
            pin_mismatches.append({'component':key[0],'pin_ordinal':key[1],'native':actual,'routed':expected})
    component_ids={c['source_component_id']:next(t['source_component_id'] for t in pc.values() if t['name']==c['name']) for c in nc.values() if c['name'] in names(pc)}
    port_ids={row['source_port_id']:pr[key]['source_port_id'] for key,row in nr.items() if key in pr}
    physical_nets={r['name']:r['source_net_id'] for r in physical if r['type']=='source_net'}
    net_ids={r['source_net_id']:physical_nets[r['name']] for r in native if r['type']=='source_net' and r['name'] in physical_nets}
    native_by_name={c['name']:c for c in nc.values()};physical_by_name={c['name']:c for c in pc.values()}
    value_mismatches=[{'component':name,'field':field,'native':c.get(field),'routed':physical_by_name[name].get(field)} for name,c in native_by_name.items() if name in physical_by_name for field in ['manufacturer_part_number','resistance','capacitance','inductance'] if c.get(field)!=physical_by_name[name].get(field)]
    internal_native={tuple(sorted(port_ids[p] for p in r['source_port_ids'])) for r in native if r['type']=='source_component_internal_connection'}
    internal_physical={tuple(sorted(r['source_port_ids'])) for r in physical if r['type']=='source_component_internal_connection'}
    schematic=collections.Counter(r['source_port_id'] for r in native if r['type']=='schematic_port')
    intrinsic_aliases=set()
    for item in native:
        if item['type']=='source_component_internal_connection':
            members=item['source_port_ids']
            if any(schematic[p]==1 for p in members):
                intrinsic_aliases.update(p for p in members if schematic[p]==0 and '_internal_' in np[p]['name'])
    omitted=[{'component':nc[p['source_component_id']]['name'],'pin':p['name'],'source_port_id':pid} for pid,p in np.items() if schematic[pid]!=1 and pid not in intrinsic_aliases]
    errors=[{'type':r['type'],'message':r.get('message','')} for r in native if r['type'].endswith('_error')]
    models=[r for r in native if r['type']=='simulation_spice_subcircuit']
    passed=not(missing or extra or pin_mismatches or omitted or errors or value_mismatches) and internal_native==internal_physical and len(nc)==347 and len(models)==7
    report={'status':'PASS_NATIVE_TSX_SOURCE_AND_SCHEMATIC_PARITY' if passed else 'FAIL','source':str(args.source),'source_sha256':hashlib.sha256(args.source.read_bytes()).hexdigest(),'routed_reference':str(args.physical),'routed_reference_sha256':hashlib.sha256(args.physical.read_bytes()).hexdigest(),'source_component_count':len(nc),'routed_component_count':len(pc),'source_port_count':len(np),'routed_port_count':len(pp),'schematic_component_count':sum(r['type']=='schematic_component' for r in native),'schematic_sheet_count':sum(r['type']=='schematic_sheet' for r in native),'schematic_port_count':sum(schematic.values()),'CPU_pins_with_exactly_one_schematic_port':sum(schematic[p['source_port_id']]==1 for p in np.values() if nc[p['source_component_id']]['name']=='U1'),'RAM_pins_with_exactly_one_schematic_port':sum(schematic[p['source_port_id']]==1 for p in np.values() if nc[p['source_component_id']]['name']=='U3'),'outside_sheet_warnings':sum(r['type']=='schematic_element_outside_sheet_warning' for r in native),'physical_duplicate_legs_represented_by_intrinsic_logical_pin':len(intrinsic_aliases),'native_array_model_count':len(models),'native_to_routed_source_component_ids':component_ids,'native_to_routed_source_port_ids':port_ids,'native_to_routed_source_net_ids':net_ids,'missing_components':missing,'extra_components':extra,'pin_net_or_name_mismatches':pin_mismatches,'pins_without_exactly_one_schematic_representation':omitted,'native_errors':errors,'component_value_or_mpn_mismatches':value_mismatches,'component_internal_metal_connection_groups_match':internal_native==internal_physical,'internal_metal_group_count':len(internal_native),'scope':'Native TSX logic and actual physical-pin names/ordinals/named-net bindings match the routed source. This neither recreates nor modifies saved routed copper.'}
    args.output.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps({k:report[k] for k in ['status','source_component_count','source_port_count','schematic_port_count','schematic_sheet_count']}));print('Pin mismatches',len(pin_mismatches),'schematic coverage failures',len(omitted),'native errors',len(errors))
    if not passed: raise SystemExit(1)
if __name__=='__main__': main()
