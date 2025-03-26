import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { isarray, ismatrix, isnumber } from "../../index.ts";

/**
 * @function gt
 * @summary Greater than comparison X > Y
 * @description Compares two inputs element-wise, returning true where elements in X are greater than corresponding elements in Y.
 *
 * @param x First operand for comparison
 * @param y Second operand for comparison
 * @returns The result of the comparison
 * @throws {Error} If the input dimensions do not agree or if no arguments are provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Comparison between two numbers
 * assertEquals(gt(5, 5), false);
 *
 * // Example 2: Comparison between a number and an array
 * assertEquals(gt(5, [5, 6, 3]), [false, false, true]);
 *
 * // Example 3: Comparison between a number and a matrix
 * assertEquals(gt(5, [[5, 6], [3, 5]]), [[false, false], [true, false]]);
 *
 * // Example 4: Comparison between an array and a number
 * assertEquals(gt([5, 6, 3], 5), [false, true, false]);
 *
 * // Example 5: Comparison between a matrix and a number
 * assertEquals(gt([[5, 6], [3, 5]], 5), [[false, true], [false, false]]);
 *
 * // Example 6: Comparison between two arrays
 * assertEquals(gt([5, 6, 3], [4, 6, 3]), [true, false, false]);
 *
 * // Example 7: Comparison between two matrices
 * assertEquals(gt([[5, 6], [3, 5]], [[4, 6], [3, 4]]), [[true, false], [false, true]]);
 * ```
 */
export default function gt(x: number, y: number): boolean;
export default function gt(x: number, y: array): boolean[];
export default function gt(x: array, y: number): boolean[];
export default function gt(x: array, y: array): boolean[];
export default function gt(x: number, y: matrix): boolean[][];
export default function gt(x: matrix, y: number): boolean[][];
export default function gt(x: matrix, y: matrix): boolean[][];
export default function gt(
  x: numarraymatrix,
  y: numarraymatrix,
): boolean | boolean[] | boolean[][] {
  if (isnumber(x) && isnumber(y)) {
    return x > y;
  }

  if (isarray(x) && isarray(y)) {
    return elementwiseArrayComparison(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return elementwiseMatrixComparison(x as matrix, y as matrix);
  }

  if (isnumber(x)) {
    if (isarray(y)) {
      return (y as array).map((val: number) => x > val);
    }
    if (ismatrix(y)) {
      return (y as matrix).map((row: array) =>
        row.map((val: number) => x > val)
      );
    }
  }
  if (isnumber(y)) {
    if (isarray(x)) {
      return (x as array).map((val: number) => val > y);
    }
    if (ismatrix(x)) {
      return (x as matrix).map((row: array) =>
        row.map((val: number) => val > y)
      );
    }
  }
  throw new Error("Invalid input types");
}

/**
 * Element-wise comparison of two arrays
 */
function elementwiseArrayComparison(x: array, y: array): boolean[] {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }
  return x.map((val: number, i: number) => val > y[i]);
}

/**
 * Element-wise comparison of two matrices
 */
function elementwiseMatrixComparison(x: matrix, y: matrix): boolean[][] {
  if (x.length !== y.length || x[0].length !== y[0].length) {
    throw new Error("Matrices must have the same dimensions");
  }
  return x.map((row: array, i: number) =>
    row.map((val: number, j: number) => val > y[i][j])
  );
}
