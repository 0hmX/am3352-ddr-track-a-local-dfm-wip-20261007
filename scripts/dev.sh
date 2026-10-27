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
python3 "$board_root/scripts/mirror-source.py" --source "$board_root" --preview "$preview_dir" --once
python3 "$board_root/scripts/mirror-source.py" --source "$board_root" --preview "$preview_dir" &
sync_pid=$!
printf 'TSX PCB: http://localhost:%s/#file=index.tsx&tab=pcb\n' "${PORT:-3020}"
cd "$preview_dir"
while :; do
  "$board_root/node_modules/.bin/tsci" dev . --port "${PORT:-3020}" &
  server_pid=$!
  if wait "$server_pid"; then
    break
  fi
  server_pid=
  printf 'Dev server exited while updating; restarting with the latest TSX files.\n' >&2
  sleep 2
done
