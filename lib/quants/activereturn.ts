import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { annreturn, isarray, ismatrix, vectorfun } from "../../index.ts";

/**
 * @function activereturn
 * @summary Computes the active return
 * @description Calculates the active return, which is the difference between the annualized return of an asset/portfolio and the annualized return of a benchmark.
 *
 * @param x Asset/portfolio returns
 * @param y Benchmark returns
 * @param t Frequency of data points in a year (1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily, defaults to 252)
 * @param mode The mode of return calculation: 'geometric' or 'simple' (defaults to 'geometric')
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise, defaults to 0)
 * @returns The computed active return
 * @throws {Error} If inputs are not valid arrays or matrices
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Compute active return for a single portfolio and benchmark
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(activereturn(x, y, 12), 0.0887245684020539);
 *
 * // Example 2: Compute active return with simple mode
 * assertEquals(activereturn([0.05, 0.03, 0.08, -0.02], [0.04, 0.02, 0.06, -0.01], 12, "simple"), 0.09000000000000002);
 *
 * // Example 3: Compute active return for matrix (row-wise)
 * const matrix = [[0.01, 0.02], [0.03, -0.01], [0.05, 0.04]];
 * const benchmark = [0.005, 0.015, 0.025];
 * assertEquals(activereturn(matrix, benchmark, 12), [0.0002900781816017606, -0.07097748818797567, 0.500494477969688]);
 * ```
 */
export default function activereturn(
  x: array,
  y: array,
  t?: number,
  mode?: string,
  dim?: 0 | 1,
): number;
export default function activereturn(
  x: matrix,
  y: array,
  t?: number,
  mode?: string,
  dim?: 0 | 1,
): array | matrix;
export default function activereturn(
  x: numarraymatrix,
  y: array,
  t: number = 252,
  mode: string = "geometric",
  dim: 0 | 1 = 0,
): number | array | matrix {
  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input x must be an array or matrix");
  }
  if (!isarray(y)) {
    throw new Error("Input y must be an array");
  }

  return vectorfun(dim, x, (a: array) => computeActiveReturn(a, y, t, mode));
}

/**
 * Computes active return for a single array
 */
function computeActiveReturn(
  a: array,
  benchmark: array,
  t: number,
  mode: string,
): number {
  return (annreturn(a, t, mode)) -
    (annreturn(benchmark, t, mode));
}
