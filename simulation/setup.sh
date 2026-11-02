#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
command -v bun >/dev/null || { echo 'Install Bun >= 1.3 using its official instructions.' >&2; exit 1; }
bun test simulation/
if [[ ${1:-} == --native ]]; then
  [[ $(uname -s) == Linux ]] || { echo 'Native bounded runs require Linux cgroup v2.' >&2; exit 1; }
  for tool in systemd-run flock timeout prlimit; do command -v "$tool" >/dev/null; done
  [[ -n ${FASTER_CAP_BIN:-} && -x $FASTER_CAP_BIN ]] || { echo 'Set FASTER_CAP_BIN to an existing executable built from official FasterCap sources.' >&2; exit 1; }
  sha256sum "$FASTER_CAP_BIN"
fi
printf 'Diagnostic setup checks passed. No board solve started.\n'
