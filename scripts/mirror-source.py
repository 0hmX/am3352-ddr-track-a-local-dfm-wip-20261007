#!/usr/bin/env python3
"""Mirror only index.tsx's static relative imports and an optional saved PCB.

Adapted from the live sync-tsx-preview.py helper. External packages use the
source project's installed dependencies; saved copper is copied byte-for-byte.
"""
import argparse
import hashlib
import json
import os
import signal
import subprocess
import re
import time
from pathlib import Path

IMPORTS = re.compile(r'(?:from\s*|import\s*)["\'](\.[^"\']+)["\']')


def resolve_module(parent, specifier, source):
    base = parent / specifier
    for path in [base, *[Path(str(base) + s) for s in ('.tsx', '.ts', '.json')], base / 'index.tsx', base / 'index.ts']:
        if path.is_file():
            path = path.resolve()
            path.relative_to(source)
            return path
    raise FileNotFoundError(f'{parent}: {specifier}')


def collect(source):
    pending, files = [source / 'index.tsx'], {}
    while pending:
        path = pending.pop().resolve()
        relative = path.relative_to(source)
        if relative in files:
            continue
        contents = path.read_bytes()
        files[relative] = contents
        if path.suffix in ('.tsx', '.ts'):
            pending.extend(resolve_module(path.parent, s, source) for s in IMPORTS.findall(contents.decode()))
    return files


def update(preview, relative, contents):
    target = preview / relative
    target.resolve().relative_to(preview)
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists() or target.read_bytes() != contents:
        target.write_bytes(contents)
        print('Updated:', relative, flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--preview', type=Path)
    parser.add_argument('--hashes', action='store_true', help='Print native source dependency hashes without creating a preview')
    parser.add_argument('--once', action='store_true')
    parser.add_argument('--replay', action='store_true', help='Compile fresh native TSX plus guarded layout before mirroring edits')
    pcb = parser.add_mutually_exclusive_group()
    pcb.add_argument('--pcb', type=Path)
    pcb.add_argument('--no-pcb', action='store_true')
    args = parser.parse_args()
    source = args.source.resolve()
    if args.hashes:
        print(json.dumps({str(p):hashlib.sha256(data).hexdigest() for p,data in sorted(collect(source).items())},sort_keys=True))
        return
    if args.preview is None:
        parser.error('--preview is required unless --hashes is selected')
    preview = args.preview.resolve()
    if source == preview:
        parser.error('Preview must be separate from the source project')
    preview.mkdir(parents=True, exist_ok=True)
    state = preview / '.source-mirror'
    previous_state = json.loads(state.read_text()) if state.exists() else {}
    previous = set(previous_state.get('files', []) if isinstance(previous_state, dict) else previous_state)
    accepted_hash = previous_state.get('source_sha256') if isinstance(previous_state, dict) else None
    attempted_hash, active = None, None
    def stop(signum, _frame):
        if active is not None:
            try:
                os.killpg(active.pid, signum)
            except ProcessLookupError:
                pass
        raise SystemExit(128 + signum)
    signal.signal(signal.SIGTERM, stop)
    signal.signal(signal.SIGINT, stop)
    pcb_stamp = None
    while True:
        try:
            files = collect(source)
            hashes = {str(p): hashlib.sha256(data).hexdigest() for p,data in sorted(files.items())}
            source_hash = hashlib.sha256(json.dumps(hashes,sort_keys=True).encode()).hexdigest()
            if args.replay and source_hash != accepted_hash:
                if source_hash == attempted_hash:
                    time.sleep(1)
                    continue
                attempted_hash = source_hash
                print('Compiling native TSX and replaying the bound layout...', flush=True)
                active = subprocess.Popen(['sh', str(source/'scripts/replay-layout.sh')], cwd=source, start_new_session=True)
                code = active.wait()
                active = None
                if code:
                    print('Layout replay rejected; preview remains the last successful snapshot.', flush=True)
                    if args.once:
                        raise SystemExit(code)
                    continue
                files = collect(source)
                hashes = {str(p): hashlib.sha256(data).hexdigest() for p,data in sorted(files.items())}
                source_hash = hashlib.sha256(json.dumps(hashes,sort_keys=True).encode()).hexdigest()
                receipt = json.loads((source/'validation-source/index-with-layout-receipt.json').read_text())
                if receipt['native_source_files'] != hashes:
                    raise ValueError('Source changed during replay; waiting for a complete fresh snapshot')
                accepted_hash = source_hash
            config = json.loads((source / 'tscircuit.config.json').read_text())
            saved = args.pcb or next((Path(p) for p in config.get('includeBoardFiles', []) if p.endswith('.json')), None)
            if saved is not None and not args.no_pcb:
                saved = (source / saved).resolve()
                stamp = (saved, saved.stat().st_mtime_ns, saved.stat().st_size)
                if stamp != pcb_stamp or not (preview / saved.name).exists():
                    update(preview, Path(saved.name), saved.read_bytes())
                    pcb_stamp = stamp
            else:
                saved = None
            for relative, contents in files.items():
                update(preview, relative, contents)
            managed = {str(p) for p in files} | ({saved.name} if saved else set())
            for relative in previous - managed:
                target = preview / relative
                target.resolve().relative_to(preview)
                target.unlink(missing_ok=True)
            package = json.loads((source / 'package.json').read_text())
            package = {k: package[k] for k in ('name', 'type', 'dependencies') if k in package} | {'private': True}
            config = {'mainEntrypoint': 'index.tsx',
                      'previewComponentPath': saved.name if saved and config.get('previewComponentPath') != 'index.tsx' else 'index.tsx',
                      'siteDefaultComponentPath': saved.name if saved and config.get('siteDefaultComponentPath') != 'index.tsx' else 'index.tsx',
                      'includeBoardFiles': ['index.tsx'] + ([saved.name] if saved else []), 'build': config.get('build', {})}
            for name, value in [('package.json', package), ('tscircuit.config.json', config)]:
                update(preview, Path(name), (json.dumps(value, indent=2) + '\n').encode())
            modules = source / 'node_modules'
            if modules.is_dir() and not (preview / 'node_modules').exists():
                (preview / 'node_modules').symlink_to(modules, target_is_directory=True)
            state.write_text(json.dumps({'files': sorted(managed), 'source_sha256': accepted_hash or source_hash}))
            previous = managed
            if args.once:
                print(f'Mirrored {len(files)} source files' + (' and one saved PCB' if saved else ''), flush=True)
                return
        except (FileNotFoundError, ValueError) as error:
            if args.once:
                raise
            print('Source sync waiting:', error, flush=True)
        time.sleep(1)


if __name__ == '__main__':
    main()
