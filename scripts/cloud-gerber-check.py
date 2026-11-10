#!/usr/bin/env python3
"""Reparse exported Gerber copper in board-space mm (+X right, +Y up).

Copper islands come only from Gerber bytes. Schematic net labels and layer spans
come from native records; bridges require matching exported Excellon holes.
Run with gerbonara and shapely installed on PYTHONPATH. No files are modified.
"""
import argparse
import hashlib
import json
import math
import re
import warnings
from pathlib import Path

from gerbonara import ExcellonFile, GerberFile
from gerbonara.graphic_objects import Flash, Region
from gerbonara.utils import MM, approximate_arc
from shapely import affinity, make_valid
from shapely.geometry import GeometryCollection, LineString, Point, Polygon, box
from shapely.ops import unary_union
from shapely.strtree import STRtree

ERROR_MM = 0.00001
SEED_TOLERANCE_MM = 0.000002
LAYERS = ['top', 'inner1', 'inner2', 'inner3', 'inner4', 'inner5', 'inner6', 'bottom']
FILES = ['F_Cu.gbr'] + [f'In{i}_Cu.gbr' for i in range(1, 7)] + ['B_Cu.gbr']


def round_buffer(shape, radius):
    segments = 8 if radius <= ERROR_MM else max(8, math.ceil(math.pi / (4 * math.acos(1 - ERROR_MM / radius))))
    return shape.buffer(radius, quad_segs=segments)


def primitive_shape(p):
    kind = type(p).__name__
    if kind == 'Circle':
        return round_buffer(Point(p.x, p.y), p.r)
    if kind == 'Line':
        return round_buffer(LineString([(p.x1, p.y1), (p.x2, p.y2)]), p.width / 2)
    if kind == 'Rectangle':
        shape = box(p.x - p.w / 2, p.y - p.h / 2, p.x + p.w / 2, p.y + p.h / 2)
        # Gerbonara's primitive rotation convention is clockwise radians.
        return affinity.rotate(shape, -p.rotation, origin=(p.x, p.y), use_radians=True)
    if kind == 'Arc':
        points = approximate_arc(p.cx, p.cy, p.x1, p.y1, p.x2, p.y2, p.clockwise, max_error=ERROR_MM)
        return round_buffer(LineString(points), p.width / 2)
    if kind == 'ArcPoly':
        # Gerbonara 1.5's approximate_arcs calls its segments property as a
        # function. Walk the parser's actual line/arc edges instead.
        outline = []
        for a, b, arc in p.segments:
            if arc and arc[0] is not None:
                clockwise, center = arc
                outline.extend(approximate_arc(*center, *a, *b, clockwise, max_error=ERROR_MM))
            else:
                outline.append(a)
        return Polygon(outline)
    raise ValueError(f'Unsupported Gerber primitive: {kind}')


def annotate_rotation(data):
    """Carry LR state into parser attributes without changing original bytes.

    LR rotates apertures counterclockwise around each flash center. Injecting an
    attribute also preserves state across TD, which clears object attributes but
    must not reset aperture rotation. LM/LS remain unsupported and fail closed.
    """
    rotation = 0.0
    count = 0

    def replace(match):
        nonlocal rotation, count
        token = match.group(0)
        lr = re.fullmatch(r'%LR([-+0-9.eE]+)\*%', token)
        if lr:
            rotation = float(lr.group(1))
            count += 1
            return f'%TO.CloudRotation,{rotation}*%'
        if token.startswith('%TD'):
            return token + f'\n%TO.CloudRotation,{rotation}*%'
        return token

    return re.sub(r'%[^%]*%', replace, data), count


def read_copper(data, name):
    annotated, rotation_count = annotate_rotation(data)
    with warnings.catch_warnings(record=True) as captured:
        warnings.simplefilter('always')
        gerber = GerberFile.from_string(annotated, filename=name)
    if captured:
        raise ValueError(f'Unaccepted parser warnings in {name}: ' + '; '.join(str(w.message) for w in captured))
    copper = GeometryCollection()
    batch = []
    last_polarity = None
    repairs = 0

    def combine():
        nonlocal copper
        if batch:
            shapes = unary_union(batch)
            copper = copper.union(shapes) if last_polarity else copper.difference(shapes)

    for obj in gerber.objects:
        attrs = obj.attrs if isinstance(obj.attrs, dict) else {}
        rotation = float(attrs.get('.CloudRotation', ('0',))[0])
        if rotation and not isinstance(obj, (Flash, Region)):
            # Circular drawing apertures are invariant under LR. Other stroke
            # apertures need a separate implementation and are rejected here.
            if type(obj.aperture).__name__ != 'CircleAperture':
                raise ValueError(f'LR on unsupported drawing aperture in {name}')
        for primitive in obj.to_primitives(unit=MM):
            shape = primitive_shape(primitive)
            if rotation and isinstance(obj, Flash):
                shape = affinity.rotate(shape, rotation, origin=(obj.x, obj.y))
            if not shape.is_valid:
                # Weakly simple Gerber keyhole regions can share edges; record
                # their polygonization rather than silently discarding them.
                repairs += 1
                shape = make_valid(shape)
            polarity = bool(primitive.polarity_dark)
            if last_polarity is not None and polarity != last_polarity:
                combine()
                batch = []
            last_polarity = polarity
            batch.append(shape)
    combine()
    return copper, {'objects': len(gerber.objects), 'rotationCommandsHandled': rotation_count,
                    'polygonizedInvalidRegions': repairs, 'parserWarnings': []}


def polygons(shape):
    if shape.geom_type == 'Polygon':
        yield shape
    elif hasattr(shape, 'geoms'):
        for child in shape.geoms:
            yield from polygons(child)


class UnionFind:
    def __init__(self):
        self.parent = {}

    def root(self, value):
        self.parent.setdefault(value, value)
        if self.parent[value] != value:
            self.parent[value] = self.root(self.parent[value])
        return self.parent[value]

    def join(self, a, b):
        self.parent[self.root(a)] = self.root(b)


def logical_nets(records):
    uf = UnionFind()
    source_nets = [r for r in records if r['type'] == 'source_net']
    for net in source_nets:
        uf.join(net['source_net_id'], ('named_net', net['name']))
    for trace in (r for r in records if r['type'] == 'source_trace'):
        members = [trace['source_trace_id']] + trace.get('connected_source_net_ids', []) + trace.get('connected_source_port_ids', [])
        for member in members[1:]:
            uf.join(members[0], member)
    # Internal component ties carry the named net to every physical terminal,
    # including switch duplicates and connector shield/ground terminals.
    for component in (r for r in records if r['type'] == 'source_component'):
        for group in component.get('internally_connected_source_port_ids', []):
            for member in group[1:]:
                uf.join(group[0], member)
    names = {}
    for net in source_nets:
        names.setdefault(uf.root(net['source_net_id']), set()).add(net['name'])

    def net_for(key):
        return '|'.join(sorted(names.get(uf.root(key), []))) or None

    return net_for


def normalize_excellon_slots(data):
    """Expand the exporter's explicit-decimal G85 slots into equivalent routing.

    Gerbonara does not implement G85. Endpoints and the active tool come only
    from emitted Excellon text; unsupported modal/implicit forms fail closed.
    """
    xy = r'X[+-]?\d+\.\d+Y[+-]?\d+\.\d+'
    data, count = re.subn(rf'(?m)^({xy})\nG85({xy})$',
                          r'G00\1\nM15\nG01\2\nM16\nG05', data)
    if 'G85' in data:
        raise ValueError('Unsupported Excellon G85 slot syntax')
    return data, count


def read_drills(directory):
    drills = []
    warning_messages = []
    for path in sorted(directory.glob('drill-L*-L*.drl')):
        match = re.fullmatch(r'drill-L(\d+)-L(\d+)\.drl', path.name)
        if not match:
            raise ValueError(f'Unknown drill span: {path.name}')
        span = LAYERS[int(match[1]) - 1:int(match[2])]
        with warnings.catch_warnings(record=True) as captured:
            warnings.simplefilter('always')
            data, slots = normalize_excellon_slots(path.read_text())
            file = ExcellonFile.from_string(data, filename=str(path))
        if slots:
            warning_messages.append(f'{path.name}: expanded {slots} explicit G85 slots into equivalent G00/M15/G01/M16/G05 parser input')
        for warning in captured:
            message = str(warning.message)
            # Parser accepts the exported absolute-mode command but notes its
            # placement after the header. No geometry instruction is ignored.
            if 'G90 header statement found after end of header' not in message:
                raise ValueError(f'Unaccepted Excellon parser warning: {message}')
            warning_messages.append(message)
        for obj in file.objects:
            shape = unary_union([primitive_shape(p) for p in obj.to_primitives(unit=MM)])
            drills.append({'shape': shape, 'span': span, 'file': path.name})
    return drills, warning_messages


def check(directory):
    directory = Path(directory)
    records = json.loads((directory / 'board.circuit.json').read_text())
    net_for = logical_nets(records)
    uf = UnionFind()
    layer_islands, trees, layer_info = {}, {}, {}
    for layer, filename in zip(LAYERS, FILES):
        path = directory / 'gerber' / filename
        data = path.read_text()
        metal, info = read_copper(data, filename)
        islands = list(polygons(metal))
        layer_islands[layer] = islands
        trees[layer] = STRtree(islands)
        layer_info[layer] = {**info, 'islands': len(islands), 'areaMm2': metal.area,
                             'sha256': hashlib.sha256(data.encode()).hexdigest()}

    def hits(layer, x, y):
        point = Point(x, y)
        candidates = trees[layer].query(point.buffer(SEED_TOLERANCE_MM))
        return [(layer, int(i)) for i in candidates if layer_islands[layer][i].distance(point) <= SEED_TOLERANCE_MM]

    drills, drill_warnings = read_drills(directory / 'gerber')
    barrel_count = 0
    missing_drills, missing_barrel_copper = [], []
    for barrel in (r for r in records if r['type'] in ('pcb_via', 'pcb_plated_hole')):
        span = barrel['layers']
        point = Point(barrel['x'], barrel['y'])
        matching = [d for d in drills if set(d['span']) == set(span) and d['shape'].distance(point) <= 0.0001]
        if not matching:
            missing_drills.append({'type': barrel['type'], 'x': barrel['x'], 'y': barrel['y'], 'span': span})
            continue
        islands = [island for layer in span for island in hits(layer, barrel['x'], barrel['y'])]
        if not islands:
            missing_barrel_copper.append({'x': barrel['x'], 'y': barrel['y'], 'span': span})
        for island in islands[1:]:
            uf.join(islands[0], island)
        barrel_count += 1

    components = {r['source_component_id']: r['name'] for r in records if r['type'] == 'source_component'}
    source_ports = {r['source_port_id']: r for r in records if r['type'] == 'source_port'}
    root_names, net_pins, missing_pins = {}, {}, []
    for port in (r for r in records if r['type'] == 'pcb_port'):
        sp = source_ports.get(port.get('source_port_id'), {})
        component = components.get(sp.get('source_component_id'))
        net = net_for(port.get('source_port_id'))
        if component is None or net is None:
            continue
        label = f"{component}.{sp['name']}"
        islands = [island for layer in port['layers'] for island in hits(layer, port['x'], port['y'])]
        roots = {uf.root(island) for island in islands}
        if not roots:
            missing_pins.append({'pin': label, 'net': net, 'x': port['x'], 'y': port['y'], 'layers': port['layers']})
        net_pins.setdefault(net, []).append({'pin': label, 'roots': roots})
        for root in roots:
            root_names.setdefault(root, set()).add(net)
    shorts = [{'layer': root[0], 'island': root[1], 'nets': sorted(names)} for root, names in root_names.items() if len(names) > 1]
    short_roots = {root for root, names in root_names.items() if len(names) > 1}
    nets = []
    for net, pins in sorted(net_pins.items()):
        groups = set().union(*(p['roots'] for p in pins))
        nets.append({'name': net, 'pinCount': len(pins), 'groups': len(groups),
                     'connected': len(groups) == 1 and all(p['roots'] for p in pins) and not groups.intersection(short_roots)})
    return {
        'status': 'pass_no_detected_shorts' if not (shorts or missing_drills or missing_barrel_copper or missing_pins) else 'findings',
        'method': 'Independent Gerbonara Gerber/Excellon reparse, ordered dark/clear Boolean copper islands, native schematic pin-center labels, exported-drill-verified barrel bridges',
        'tolerancesMm': {'arcApproximation': ERROR_MM, 'seedContact': SEED_TOLERANCE_MM, 'drillPositionMatch': 0.0001},
        'layers': layer_info, 'barrelsMatchedToExportedDrills': barrel_count,
        'excellonFormatWarnings': drill_warnings, 'missingExportedDrills': missing_drills,
        'missingBarrelCopper': missing_barrel_copper, 'missingPinCopper': missing_pins,
        'physicalShorts': shorts, 'namedNets': len(nets), 'connectedNets': sum(n['connected'] for n in nets), 'nets': nets,
        'limits': ['No clearance, impedance, SI/PI, current capacity or fabrication qualification.',
                   'Net labeling uses intended native schematic membership and physical pin centers; unlabelled disconnected copper islands cannot be assigned a net.',
                   'Copper images are checked before subtracting drill holes. Barrel bridges are restricted to actual layer spans and require an exported drill covering the native center.',
                   'Drill matching verifies center coverage and span, not full hole/slot dimensional equality.',
                   'Curves are polygonized with stated tolerance; report is not a proof at smaller clearances.']}


def self_test():
    header = '%FSLAX46Y46*%\n%MOMM*%\n%ADD10C,0.4*%\nD10*\n'
    isolated = header + 'X0Y0D03*\nX1000000Y0D03*\nM02*\n'
    bridged = header + 'X0Y0D03*\nX1000000Y0D03*\nX0Y0D02*\nX1000000Y0D01*\nM02*\n'
    a, _ = read_copper(isolated, 'fixture-isolated')
    b, _ = read_copper(bridged, 'fixture-bridged')
    assert len(list(polygons(a))) == 2
    assert len(list(polygons(b))) == 1
    rotation = '%FSLAX46Y46*%\n%MOMM*%\n%ADD10R,2X0.5*%\nD10*\n%LR90*%\nX0Y0D03*\n%TD*%\nX3000000Y0D03*\nM02*\n'
    c, info = read_copper(rotation, 'fixture-rotation')
    assert info['rotationCommandsHandled'] == 1
    for island in polygons(c):
        left, bottom, right, top = island.bounds
        assert abs(right - left - 0.5) < 1e-8 and abs(top - bottom - 2) < 1e-8
    cut = header + 'X0Y0D02*\nX1000000Y0D01*\n%LPC*%\n%ADD11R,0.1X1*%\nD11*\nX500000Y0D03*\nM02*\n'
    d, _ = read_copper(cut, 'fixture-clear')
    assert len(list(polygons(d))) == 2
    arc_region = header + 'G75*\nG36*\nX1000000Y0D02*\nG03X-1000000Y0I-1000000J0D01*\nG01X1000000Y0D01*\nG37*\nM02*\n'
    e, _ = read_copper(arc_region, 'fixture-arc-region')
    assert abs(e.area - math.pi / 2) < 0.0001
    arc_stroke = header + 'G75*\nX1000000Y0D02*\nG03X-1000000Y0I-1000000J0D01*\nM02*\n'
    f, _ = read_copper(arc_stroke, 'fixture-arc-stroke')
    assert abs(f.area - (math.pi * 0.4 + math.pi * 0.2 ** 2)) < 0.0001
    slot, count = normalize_excellon_slots('M48\nMETRIC\nT1C0.6\n%\nT1\nX0.000Y0.000\nG85X0.000Y1.100\nM30\n')
    slots = ExcellonFile.from_string(slot)
    slot_shape = unary_union([primitive_shape(p) for obj in slots.objects for p in obj.to_primitives(unit=MM)])
    assert count == 1 and len(slots.objects) == 1
    assert abs(slot_shape.area - (0.6 * 1.1 + math.pi * 0.3 ** 2)) < 0.0001
    return {'explicitG85SlotGeometry': True, 'arcRegionAndStrokeArea': True, 'isolatedNetsRemainSeparate': True, 'deliberateBridgeDetected': True,
            'apertureRotation90AndTdState': True, 'clearPolarityBreaksConnection': True}


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('directory', nargs='?')
    parser.add_argument('--self-test', action='store_true')
    args = parser.parse_args()
    fixtures = self_test()
    if args.directory:
        result = check(args.directory)
        result['selfTests'] = fixtures
        path = Path(args.directory) / 'gerber-check.json'
        path.write_text(json.dumps(result, indent=2) + '\n')
        print(json.dumps({k: result[k] for k in ('status', 'namedNets', 'connectedNets', 'barrelsMatchedToExportedDrills', 'physicalShorts', 'missingExportedDrills', 'missingBarrelCopper', 'missingPinCopper')}, indent=2))
        raise SystemExit(0 if result['status'] == 'pass_no_detected_shorts' else 1)
    print(json.dumps(fixtures, indent=2))
