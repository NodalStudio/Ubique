import type { array, matrix, numarraymatrix } from "../types.d.ts";

/**
 * @function unique
 * @summary Unique values in an array or matrix
 * @description Returns the unique values from an array or matrix. Optionally, returns the unique values along with their original indices.
 *
 * @param x The input array or matrix of values
 * @param flag If `1`, returns both unique values and their indices; if `0`, returns only unique values (default is 0)
 * @returns The unique values, or a matrix containing the unique values and their indices
 * @throws If no input is provided or the flag is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Unique values from an array
 * assertEquals(unique([9, -3, 2, -12, 0, 1, 0, 1, 2, 3, 4, 5]), [-12, -3, 0, 1, 2, 3, 4, 5, 9]);
 *
 * // Example 2: Unique values and their indices
 * assertEquals(unique([9, -3, 2, -12, 0, 1, 0, 1, 2, 3, 4, 5], 1), [[-12, -3, 0, 1, 2, 3, 4, 5, 9], [3, 1, 4, 5, 2, 9, 10, 11, 0]]);
 *
 * // Example 3: Unique values from a matrix
 * assertEquals(unique([[5, 4], [5, 3], [6, 3]]), [3, 4, 5, 6]);
 *
 * // Example 4: Unique values and indices from a matrix
 * assertEquals(unique([[5, 4], [5, 3], [6, 3]], 1), [[3, 4, 5, 6], [3, 1, 0, 4]]);
 * ```
 */
export default function unique(x: array): array;
export default function unique(x: array, flag: 0): array;
export default function unique(x: array, flag: 1): matrix;
export default function unique(x: matrix): array;
export default function unique(x: matrix, flag: 0): array;
export default function unique(x: matrix, flag: 1): matrix;
export default function unique(
  x: numarraymatrix,
  flag: 0 | 1 = 0,
): array | matrix {
  const flatX = Array.isArray(x)
    ? Array.isArray(x[0]) ? (x as matrix).flat() : (x as array)
    : [x];
  const sorted = flatX
    .map((value: number, index: number) => [value, index])
    .sort(([a], [b]) => a - b);

  const uvalue: array = [];
  const uindex: array = [];

  sorted.forEach(([value, index], i: number) => {
    if (i === 0 || value !== sorted[i - 1][0]) {
      uvalue.push(value);
      uindex.push(index);
    }
  });

  if (flag === 1) {
    return [uvalue, uindex];
  } else if (flag === 0) {
    return uvalue;
  } else {
    throw new Error("Flag can be only 0 (default) or 1");
  }
}
