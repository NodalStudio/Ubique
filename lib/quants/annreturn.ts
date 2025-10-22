import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, ismatrix, mean, prod, vectorfun } from "../../index.ts";

/**
 * Computes the annualized return.
 *
 * Calculates the annualized return of an asset or portfolio over a period.
 * It supports both geometric (compounded) and simple (arithmetic) return modes.
 *
 * @param x Asset/portfolio returns
 * @param t Frequency of data points in a year (1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily)
 * @param mode Return mode: 'geometric' (default) or 'simple'
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise)
 * @returns The computed annualized return
 * @throws If the input is invalid or an unknown mode is specified
 *
 * @example Annualized return for a single asset (geometric)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annreturn(x, 12), 0.2338146820656939);
 *
 * ```
 *
 * @example Annualized return with simple (arithmetic) mode
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * assertEquals(annreturn(x, 12, 'simple'), 0.2148);
 *
 * ```
 *
 * @example Annualized return for multiple assets (matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x1 = [0.003, 0.026, 0.015, -0.009, 0.014];
 * const x2 = [0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annreturn([x1, x2], 12), [0.12321338265292425, 0.3553067415252329]);
 * ```
 */
export default function annreturn(
  x: array,
  t?: number,
  mode?: string,
  dim?: 0 | 1,
): number;
export default function annreturn(
  x: matrix,
  t?: number,
  mode?: string,
  dim?: 0 | 1,
): array;
export default function annreturn(
  x: numarraymatrix,
  t = 252,
  mode = "geometric",
  dim: 0 | 1 = 0,
): number | array | matrix {
  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (arr: array) => computeAnnReturn(arr, t, mode));
}

function computeAnnReturn(arr: array, t: number, mode: string): number {
  const n = arr.length;
  if (mode === "geometric") {
    return Math.pow(prod(arr.map((val: number) => val + 1)), t / n) - 1;
  }
  if (mode === "simple") {
    return mean(arr) * t;
  }
  throw new Error("Unknown mode");
}
