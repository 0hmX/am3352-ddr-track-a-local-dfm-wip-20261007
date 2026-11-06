#!/bin/bash
# Runs the given lesson files two at a time; logs to course/out/<name>.log
cd "$(dirname "$0")/.."
run() { n=$(basename "$1" .circuit.tsx); rm -rf "tutorial/course/out/$n"; bunx tsci simulate "$1" --output "tutorial/course/out/$n" > "tutorial/course/out/$n.log" 2>&1; echo "$n: $(grep -E 'written|^[a-z_]+: ' "tutorial/course/out/$n.log" | head -1 | cut -c1-160)"; }
export -f run
printf '%s\n' "$@" | xargs -P 2 -I{} bash -c 'run {}'
