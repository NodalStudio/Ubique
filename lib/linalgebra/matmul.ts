import { timeswasm } from "../../rs_lib/pkg/rs_lib.js";
import { matrixShape, packRows, unpackRows } from "../internal/matrix.ts";

/** Select a backend explicitly for reproducible measurements or automatically. */
export type MatrixBackend = "auto" | "js" | "wasm";

/**
 * Multiply nonempty numeric matrices. The JS backend avoids packing for small
 * products; the WASM backend borrows packed inputs. Inputs are not modified.
 * `backend` is an override, not a promise of a universal performance crossover.
 */
export function matmul(
  a: number[][],
  b: number[][],
  backend: MatrixBackend = "auto",
): number[][] {
  const [m, k] = matrixShape(a);
  const [bk, n] = matrixShape(b);
  if (k !== bk) throw new Error("Matrix dimensions must agree");
  if (!["auto", "js", "wasm"].includes(backend)) {
    throw new Error("Unknown matrix backend");
  }
  // Local measurements favor JS below ~64^3 operations and for thin products.
  // This conservative heuristic is not a universal crossover; callers can
  // override it. See benchmarks/README.md and retained samples.
  const useWasm = backend === "wasm" ||
    (backend === "auto" && m * k * n >= 262144 && Math.min(m, k, n) >= 16);
  if (useWasm) {
    return unpackRows(timeswasm(packRows(a), packRows(b), m, k, n), m, n);
  }
  const out = Array.from({ length: m }, () => new Array<number>(n).fill(0));
  for (let i = 0; i < m; i++) {
    const row = out[i];
    for (let p = 0; p < k; p++) {
      const av = a[i][p], br = b[p];
      for (let j = 0; j < n; j++) row[j] += av * br[j];
    }
  }
  return out;
}
