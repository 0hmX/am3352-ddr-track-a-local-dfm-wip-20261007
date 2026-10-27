#!/bin/sh
set -eu
board_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
preview_dir=$(mktemp -d "${TMPDIR:-/tmp}/am3352-tsx.XXXXXX")
sync_pid=
server_pid=
cleanup() {
  [ -z "$server_pid" ] || kill "$server_pid" 2>/dev/null || :
  [ -z "$sync_pid" ] || kill "$sync_pid" 2>/dev/null || :
  rm -rf "$preview_dir"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
python3 "$board_root/scripts/mirror-source.py" --source "$board_root" --preview "$preview_dir" --once --replay
python3 "$board_root/scripts/mirror-source.py" --source "$board_root" --preview "$preview_dir" --replay &
sync_pid=$!
printf 'Native TSX/Schematic: http://localhost:%s/#file=index.tsx&tab=schematic\nCompiled TSX + saved layout: http://localhost:%s/#file=index-with-layout.circuit.json&tab=pcb\n' "${PORT:-3020}" "${PORT:-3020}"
cd "$preview_dir"
"$board_root/node_modules/.bin/tsci" dev . --port "${PORT:-3020}" &
server_pid=$!
wait "$server_pid"
