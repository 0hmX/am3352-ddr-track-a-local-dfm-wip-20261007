#!/bin/sh
set -eu
board_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
preview_dir=$(mktemp -d "${TMPDIR:-/tmp}/am3352-build.XXXXXX")
trap 'rm -rf "$preview_dir"' EXIT
python3 "$board_root/scripts/mirror-source.py" --source "$board_root" --preview "$preview_dir" --once --replay
cd "$preview_dir"
"$board_root/node_modules/.bin/tsci" build --site --use-cdn-javascript "$@"
rm -rf "$board_root/dist"
cp -R "$preview_dir/dist" "$board_root/dist"
