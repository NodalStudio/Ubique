import type { array, matrix } from "../types.d.ts";

import { isarray, ismatrix } from "../../index.ts";

/**
 * Product of array elements.
 *
 * Computes the product of elements in an array or matrix. Optionally, computes the product along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension to operate along, 1 for columns, 0 for rows (default is 1)
 * @returns The product of the array elements, or an array of products if a matrix is provided
 * @throws If no input arguments are provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Product of a vector
 * assertEquals(prod([5, 6, 3]), 90);
 *
 * // Example 2: Product of matrix elements along rows
 * assertEquals(prod([[5, 6, 5], [7, 8, -1]], 0), [150, -56]);
 *
 * // Example 3: Product of matrix elements along columns
 * assertEquals(prod([[5, 6, 5], [7, 8, -1]], 1), [35, 48, -5]);
 * ```
 */
export default function prod(x: array): number;
export default function prod(x: array, dim: 0): number;
export default function prod(x: array, dim: 1): number;
export default function prod(x: matrix, dim: 0): array;
export default function prod(x: matrix, dim: 1): array;
export default function prod(
  x: array | matrix,
  dim: 0 | 1 = 1,
): number | array {
  const multiply = (arr: array): number =>
    arr.reduce((acc: number, val: number) => acc * val, 1);

  if (isarray(x)) {
    return multiply(x as array);
  }

  if (ismatrix(x)) {
    const result: array = [];
    if (dim === 0) {
      // multiply along rows
      for (let i = 0; i < (x as matrix).length; i++) {
        result.push(multiply((x as matrix)[i]));
      }
    } else {
      // multiply along columns
      const numCols = (x as matrix)[0].length;
      for (let j = 0; j < numCols; j++) {
        const column: array = [];
        for (let i = 0; i < (x as matrix).length; i++) {
          column.push((x as matrix)[i][j]);
        }
        result.push(multiply(column));
      }
    }
    return result;
  }

  throw new Error("Input must be an array or matrix");
}
