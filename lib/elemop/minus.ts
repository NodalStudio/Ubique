import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { arrayfun, isarray, ismatrix, isnumber } from "../../index.ts";

/**
 * Subtraction X - Y.
 *
 * Subtracts two numbers, arrays, or matrices element-wise. Handles mixed inputs of scalars, arrays, and matrices.
 *
 * @param x The first operand, can be a number, array, or matrix.
 * @param y The second operand, can be a number, array, or matrix.
 * @returns The result of subtracting `y` from `x`.
 * @throws If the input dimensions do not agree or if no arguments are provided.
 *
 * @example Subtract two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(minus(5, 3), 2);
 *
 * ```
 *
 * @example Subtract two arrays element-wise
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(minus([5, 6, 4], [3, 1, 2]), [2, 5, 2]);
 *
 * ```
 *
 * @example Subtract a number from each element of an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(minus([15, 16, 14], 10), [5, 6, 4]);
 *
 * ```
 *
 * @example Subtract a number from each element of a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(minus([[15, 16], [13, 14]], 10), [[5, 6], [3, 4]]);
 *
 * ```
 *
 * @example Subtract two matrices element-wise
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(minus([[7, 9], [4, 6]], [[2, 3], [1, 2]]), [[5, 6], [3, 4]]);
 * ```
 */
export default function minus(x: number, y: number): number;
export default function minus(x: number, y: array): array;
export default function minus(x: array, y: number): array;
export default function minus(x: array, y: array): array;
export default function minus(x: number, y: matrix): matrix;
export default function minus(x: matrix, y: number): matrix;
export default function minus(x: matrix, y: matrix): matrix;
export default function minus(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x) && isnumber(y)) {
    return x - y;
  }

  return handleMinusOperation(x, y);
}

/**
 * Handle subtraction where at least one operand is not a number.
 */
function handleMinusOperation(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x)) {
    return arrayfun(y, (val: number) => (x as number) - val);
  }

  if (isnumber(y)) {
    return arrayfun(x, (val: number) => val - (y as number));
  }

  if (isarray(x) && isarray(y)) {
    return elementwiseArraySubtraction(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return elementwiseMatrixSubtraction(x as matrix, y as matrix);
  }

  throw new Error("Invalid input types");
}

/**
 * Element-wise subtraction of two arrays.
 */
function elementwiseArraySubtraction(x: array, y: array): array {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }
  return x.map((val: number, i: number) => val - y[i]);
}

/**
 * Element-wise subtraction of two matrices.
 */
function elementwiseMatrixSubtraction(x: matrix, y: matrix): matrix {
  if (x.length !== y.length || x[0].length !== y[0].length) {
    throw new Error("Matrices must have the same dimensions");
  }
  return x.map((row: array, i: number) =>
    row.map((val: number, j: number) => val - y[i][j])
  );
}
