# Bounded simulation diagnostics

This directory provides a portable native-solver runner, verified resume, whole-route neighborhood planning, and a lossless copper inventory. It includes a reproducible analytical smoke test. **It does not provide accepted board RLC extraction or an eye result.** The board command intentionally rejects execution until a qualified conductor/material exporter exists.

No root project dependency installation is needed for these tools. Use Bun 1.3 or later:

```sh
bash simulation/setup.sh
bun test simulation/
```

The native runner requires Linux, cgroup v2, a working systemd user manager, `flock`, `timeout`, `prlimit`, at least 8 GiB available RAM, and an existing FasterCap executable. Obtain/build FasterCap from its [official source](https://github.com/ediloren/FasterCap); this PR does not ship binaries, automate that build or change the solver. The tested baseline source commit, executable digest and headless build adaptations are in `validation.json`. Set the path to your executable:

```sh
export FASTER_CAP_BIN=/path/to/FasterCap
bash simulation/setup.sh --native
bash simulation/run-bounded.sh
```

The launcher creates a transient user service capped at 5 GiB, zero swap, one CPU, low priority and five minutes. Each solver has a 120-second timeout and a 5 GiB address-space cap. It stops its own process group if available memory falls below 3 GiB. No services, access controls or unrelated jobs are changed. Logs and outputs are under ignored `.simulation/results/`; `journalctl --user -u UNIT` exposes launcher errors. The printed unit name identifies the run. A disconnected terminal does not kill the transient job.

Run the same command again to verify and reuse completed outputs. Calls through one runner are queued; a workspace lock also prevents simultaneous native execution by separate wrappers sharing the output directory. Cache identity includes the binary, wrapper sources/runtime, input files and arguments. Resume verifies request and output hashes. Failed, partial and timed-out attempts remain separate and cannot be reused. Numerical acceptance is checked again after cache reuse.

The smoke solves two nested spherical conductors in vacuum using fixed meshes of 640 and 2,560 panels. It compares the Maxwell capacitance matrix with the independent spherical analytical solution, checks passivity/reciprocity, and requires both the fine analytic error and final mesh change to be at most 1%. This is a two-mesh smoke, **not proof of full convergence**. It neither measures PCB timing nor validates the general adaptive stopping rule. Read `smoke.json` and individual `native-runs/*/attempt-*/terminal.json`; a service exit alone is insufficient.

## Inventory and plan a rendered board

Supply physical Circuit JSON rendered from native board source. The commands retain every native trace, via, pour, SMT pad and plated hole; they preserve object hashes, outer boundaries and cutouts. The plating value is an explicit modeling scenario, not a fabrication fact:

```sh
export SIM_PLATING_MM=0.025
bun simulation/cli.ts inventory physical.circuit.json .simulation/context
bun simulation/cli.ts plan physical.circuit.json .simulation/plan 0.5 pcb_trace_0 pcb_trace_1
bun simulation/cli.ts board physical.circuit.json .simulation/blocked-board
# Expected nonzero exit: no qualified board exporter exists in this workflow.
```

Use native trace IDs from the supplied file. The planner keeps complete selected routes and all non-trace copper context, records excluded traces, and includes vertical via transitions in proximity calculations. It does not tile meshes, weld copper by net names, or sum independent matrices. Repeat with an expanded radius before assessing neighborhood sensitivity; a plan never grants extraction acceptance.

Logical electrical membership is distinct from physical contact. The inventory can prove some via-to-pour contacts under the declared plating scenario using full-barrel clearance, but it does not qualify all pad/land/barrel contacts, conductor islands or layered dielectric interfaces. The board guard cannot be bypassed by editing status metadata.

The independently rendered historical source at `99b75cf9844894b4ad65ee9cb4669b6bcf575d88` was used for the optional integration check:

```sh
SIM_CIRCUIT_JSON=physical.circuit.json bun test simulation/coverage.test.ts
```

That historical file has 2,057 copper objects and 314 pour cutouts. It is older than current routing work; its validation says nothing about newer geometry. Regenerate and reinventory after source changes. The source layer sum is 1.1776 mm versus nominal 1.2 mm; the inventory records both without rescaling. Fabrication stack/materials, finished plating, padstack details, firmware rate/drive/ODT, package/PDN/VREF and receiver/noise assumptions still need confirmation for eventual board/eye work.

For runner process-control tests:

```sh
systemd-run --user --wait --collect --working-directory="$PWD" \
  -p MemoryMax=5G -p MemorySwapMax=0 -p CPUQuota=100% -p Nice=15 -p RuntimeMaxSec=60 \
  --setenv=RUN_RESOURCE_TESTS=1 "$(command -v bun)" test simulation/
```

These tests use temporary shell fixtures to verify sequential execution, tamper rejection, timeout receipts and native-assertion termination. They do not claim numerical solver accuracy. A process-group regression found during preparation was fixed with `flock --no-fork`; the checked-in assertion test prevents its recurrence. Sanitized test and smoke measurements are in `validation.json`; raw execution logs stay local.
