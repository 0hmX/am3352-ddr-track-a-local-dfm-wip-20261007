// `tsci simulate simulate.circuit.tsx` (or `bun run simulate`) runs the DDR
// byte-0 write simulation on the real board and writes the eye diagram report
// to .tscircuit/simulation-simulate-<time>/results.html.
// What is modeled and what is not: simulations-next/README.md.
export { default } from "./simulations-next/run-dq-stages.circuit"
