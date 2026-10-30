#!/usr/bin/env python3
"""Mirror the board's static TSX imports into a small live preview project."""
import argparse
import json
import re
import time
from pathlib import Path

IMPORTS = re.compile(r'(?:from\s*|import\s*)["\'](\.[^"\']+)["\']')


def collect(source):
    pending, files = [source / 'index.tsx', *source.glob('subcircuits/*.tsx')], {}
    while pending:
        path = pending.pop().resolve()
        relative = path.relative_to(source)
        if relative in files:
            continue
        contents = path.read_bytes()
        files[relative] = contents
        for specifier in IMPORTS.findall(contents.decode()):
            base = path.parent / specifier
            options = [base, Path(str(base) + '.tsx'), base / 'index.tsx']
            dependency = next((p for p in options if p.is_file()), None)
            if dependency is None:
                raise FileNotFoundError(f'{path}: {specifier}')
            pending.append(dependency)
    return files


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--preview', type=Path, required=True)
    parser.add_argument('--once', action='store_true')
    parser.add_argument('--show-subcircuits', action='store_true')
    args = parser.parse_args()
    source, preview = args.source.resolve(), args.preview.resolve()
    if source == preview:
        parser.error('Preview must be separate from the source project')
    preview.mkdir(parents=True, exist_ok=True)
    previous = set()
    while True:
        try:
            files = collect(source)
            managed = set(files)
            for relative in previous - managed:
                (preview / relative).unlink(missing_ok=True)
            for relative, contents in files.items():
                target = preview / relative
                target.parent.mkdir(parents=True, exist_ok=True)
                if not target.exists() or target.read_bytes() != contents:
                    target.write_bytes(contents)
                    print('Updated:', relative, flush=True)
            for name in ('package.json', 'tscircuit.config.json'):
                target = preview / name
                contents = (source / name).read_bytes()
                if name == 'tscircuit.config.json' and args.show_subcircuits:
                    config = json.loads(contents)
                    config['includeBoardFiles'] = ['index.tsx', 'subcircuits/*.tsx']
                    contents = (json.dumps(config, indent=2) + '\n').encode()
                if not target.exists() or target.read_bytes() != contents:
                    target.write_bytes(contents)
            modules = preview / 'node_modules'
            if not modules.exists():
                modules.symlink_to(source / 'node_modules', target_is_directory=True)
            previous = managed
            if args.once:
                print(f'Mirrored {len(files)} TSX source files', flush=True)
                return
        except (FileNotFoundError, ValueError) as error:
            if args.once:
                raise
            print('Source sync waiting:', error, flush=True)
        time.sleep(1)


if __name__ == '__main__':
    main()
