#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")/.."
bun_bin=$(command -v bun)
for tool in systemd-run flock timeout prlimit; do command -v "$tool" >/dev/null; done
[[ -n ${FASTER_CAP_BIN:-} ]] || { echo 'Set FASTER_CAP_BIN to an existing FasterCap executable' >&2; exit 1; }
solver_bin=$(realpath "$FASTER_CAP_BIN")
unit="am3352-simulation-$(date +%s)-$$"
systemd-run --user --wait --collect --unit="$unit" \
  -p MemoryMax=5G -p MemorySwapMax=0 -p CPUQuota=100% -p Nice=15 -p RuntimeMaxSec=300 \
  --working-directory="$PWD" --setenv="FASTER_CAP_BIN=$solver_bin" \
  "$bun_bin" simulation/cli.ts smoke - .simulation/results
