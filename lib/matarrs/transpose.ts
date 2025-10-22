import type { array, matrix } from "../types.d.ts";

/**
 * Transpose a matrix or array.
 *
 * Transposes the given matrix or array. If the input is a 1D array, it is treated as a row vector and the result is a column vector. If the input is a matrix, the rows and columns are swapped.
 *
 * @param x The input array or matrix to transpose.
 * @returns The transposed matrix.
 *
 * @throws Throws an error if no input is provided.
 *
 * @example Transpose a 2x3 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(transpose([[5, 6, 5], [7, 8, -1]]), [[5, 7], [6, 8], [5, -1]]);
 *
 * ```
 *
 * @example Transpose a 1D array (row vector)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(transpose([5, 6, 3]), [[5], [6], [3]]);
 *
 * ```
 *
 * @example Transpose a single number (scalar)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(transpose(5), 5);
 *
 * ```
 *
 * @example Transpose a square matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(transpose([[1, 2], [3, 4]]), [[1, 3], [2, 4]]);
 *
 * ```
 */
// Scalar pass-through
export default function transpose(x: number): number;

// Array becomes column vector matrix
export default function transpose(x: array): matrix;

// Matrix transpose
export default function transpose(x: matrix): matrix;

// Combined array or matrix overload for union arguments
export default function transpose(x: array | matrix): matrix;

// Implementation signature
export default function transpose(x: number | array | matrix): number | matrix {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (typeof x === "number") {
    return x;
  }

  // If input is a 1D array, treat it as a row vector and transpose to a column vector
  if (Array.isArray(x) && !Array.isArray(x[0])) {
    return (x as array).map((value: number) => [value]);
  }

  // Transpose a 2D matrix by swapping rows and columns
  return (x as matrix)[0].map((_: unknown, colIndex: number) =>
    (x as matrix).map((row: array) => row[colIndex])
  );
}
