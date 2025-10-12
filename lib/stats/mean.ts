import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, isnumber, numel, rdivide, size, sum } from "../../index.ts";
import { meanwasm } from "../../rs_lib/pkg/rs_lib.js";

/**
 * Average value of array or matrix.
 *
 * Computes the average (arithmetic mean) of values in an array or matrix.
 * For arrays, returns a single mean value. For matrices, computes mean along specified dimension.
 *
 * @param x Input array, matrix, or number
 * @param dim Dimension along which to calculate (0: rows, 1: columns). Default is 0
 * @returns Mean values
 * @throws When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Simple array mean
 * assertEquals(mean([1, 2, 3]), 2);
 *
 * // Example 2: Array with decimals
 * assertEquals(mean([1.5, 2.5, 3.5]), 2.5);
 *
 * // Example 3: Matrix mean along rows
 * assertEquals(mean([[1, 2], [3, 4]]), [1.5, 3.5]);
 * ```
 */
export default function mean(x: number): number;
export default function mean(x: array, dim?: 0 | 1): number;
export default function mean(x: matrix, dim?: 0 | 1): array;
export default function mean(x: array | matrix, dim?: 0 | 1): number | array;
export default function mean(
  x: numarraymatrix,
  dim: 0 | 1 = 0,
): numarraymatrix {
  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    const arr = x as array;
    // Use WASM for all arrays (benchmarks show it's consistently faster)
    if (typeof meanwasm === "function") {
      return meanwasm(new Float64Array(arr));
    }
    return sum(arr, dim) / numel(arr);
  }

  return rdivide(sum(x as matrix, dim) as array, size(x as matrix)[1 - dim]);
}
