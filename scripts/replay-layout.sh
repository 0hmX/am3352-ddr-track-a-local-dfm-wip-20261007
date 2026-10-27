#!/bin/sh
set -eu
board_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
binding="$board_root/validation-source/layout-binding-v5.json"
physical=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["physical_path"])' "$binding")
physical_sha=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["saved_sha256"])' "$binding")
cd "$board_root"
bun scripts/render-source.tsx
python3 scripts/compile-layout.py --physical "$physical" --physical-sha256 "$physical_sha" \
  --binding "$binding" --output validation-source/index-with-layout.circuit.json \
  --models validation-source/index-with-layout.models.json \
  --receipt validation-source/index-with-layout-receipt.json
