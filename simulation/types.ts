export type SolverRequest = { solver: "fastercap" | "fasthenry" | "ngspice"; files: Record<string, string>; args: string[]; outputFiles: string[] }
export type SolverResult = { stdout: string; stderr: string; exitCode: number; files: Record<string, string> }
export type RunSolver = (request: SolverRequest) => Promise<SolverResult>
