import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { isarray, ismatrix, isnumber } from "../../index.ts";

/**
 * Checks for equality between two values or arrays.
 *
 * Compares two inputs, which can be numbers, arrays, or matrices, and returns true where the elements are equal.
 *
 * @param x Left-hand side value(s) for comparison.
 * @param y Right-hand side value(s) for comparison.
 * @returns The result of the equality comparison.
 * @throws If fewer than two arguments are provided.
 *
 * @example Equality comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, 5), true);
 *
 * ```
 *
 * @example Equality comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [5, 6, 3]), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [[5, 6], [3, 5]]), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], 5), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [3, 5]], 5), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], [2, 6, 0]), [false, true, false]);
 *
 * ```
 *
 * @example Equality comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [false, false]]);
 * ```
 */
export default function eq(x: number, y: number): boolean;
/**
 * Checks for equality between two values or arrays.
 *
 * Compares two inputs, which can be numbers, arrays, or matrices, and returns true where the elements are equal.
 *
 * @param x Left-hand side value(s) for comparison.
 * @param y Right-hand side value(s) for comparison.
 * @returns The result of the equality comparison.
 * @throws If fewer than two arguments are provided.
 *
 * @example Equality comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, 5), true);
 *
 * ```
 *
 * @example Equality comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [5, 6, 3]), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [[5, 6], [3, 5]]), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], 5), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [3, 5]], 5), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], [2, 6, 0]), [false, true, false]);
 *
 * ```
 *
 * @example Equality comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [false, false]]);
 * ```
 */
export default function eq(x: number, y: array): array<boolean>;
/**
 * Checks for equality between two values or arrays.
 *
 * Compares two inputs, which can be numbers, arrays, or matrices, and returns true where the elements are equal.
 *
 * @param x Left-hand side value(s) for comparison.
 * @param y Right-hand side value(s) for comparison.
 * @returns The result of the equality comparison.
 * @throws If fewer than two arguments are provided.
 *
 * @example Equality comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, 5), true);
 *
 * ```
 *
 * @example Equality comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [5, 6, 3]), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [[5, 6], [3, 5]]), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], 5), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [3, 5]], 5), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], [2, 6, 0]), [false, true, false]);
 *
 * ```
 *
 * @example Equality comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [false, false]]);
 * ```
 */
export default function eq(x: array, y: number): array<boolean>;
/**
 * Checks for equality between two values or arrays.
 *
 * Compares two inputs, which can be numbers, arrays, or matrices, and returns true where the elements are equal.
 *
 * @param x Left-hand side value(s) for comparison.
 * @param y Right-hand side value(s) for comparison.
 * @returns The result of the equality comparison.
 * @throws If fewer than two arguments are provided.
 *
 * @example Equality comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, 5), true);
 *
 * ```
 *
 * @example Equality comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [5, 6, 3]), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [[5, 6], [3, 5]]), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], 5), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [3, 5]], 5), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], [2, 6, 0]), [false, true, false]);
 *
 * ```
 *
 * @example Equality comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [false, false]]);
 * ```
 */
export default function eq(x: array, y: array): array<boolean>;
/**
 * Checks for equality between two values or arrays.
 *
 * Compares two inputs, which can be numbers, arrays, or matrices, and returns true where the elements are equal.
 *
 * @param x Left-hand side value(s) for comparison.
 * @param y Right-hand side value(s) for comparison.
 * @returns The result of the equality comparison.
 * @throws If fewer than two arguments are provided.
 *
 * @example Equality comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, 5), true);
 *
 * ```
 *
 * @example Equality comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [5, 6, 3]), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [[5, 6], [3, 5]]), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], 5), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [3, 5]], 5), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], [2, 6, 0]), [false, true, false]);
 *
 * ```
 *
 * @example Equality comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [false, false]]);
 * ```
 */
export default function eq(x: number, y: matrix): matrix<boolean>;
/**
 * Checks for equality between two values or arrays.
 *
 * Compares two inputs, which can be numbers, arrays, or matrices, and returns true where the elements are equal.
 *
 * @param x Left-hand side value(s) for comparison.
 * @param y Right-hand side value(s) for comparison.
 * @returns The result of the equality comparison.
 * @throws If fewer than two arguments are provided.
 *
 * @example Equality comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, 5), true);
 *
 * ```
 *
 * @example Equality comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [5, 6, 3]), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [[5, 6], [3, 5]]), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], 5), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [3, 5]], 5), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], [2, 6, 0]), [false, true, false]);
 *
 * ```
 *
 * @example Equality comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [false, false]]);
 * ```
 */
export default function eq(x: matrix, y: number): matrix<boolean>;
/**
 * Checks for equality between two values or arrays.
 *
 * Compares two inputs, which can be numbers, arrays, or matrices, and returns true where the elements are equal.
 *
 * @param x Left-hand side value(s) for comparison.
 * @param y Right-hand side value(s) for comparison.
 * @returns The result of the equality comparison.
 * @throws If fewer than two arguments are provided.
 *
 * @example Equality comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, 5), true);
 *
 * ```
 *
 * @example Equality comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [5, 6, 3]), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [[5, 6], [3, 5]]), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], 5), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [3, 5]], 5), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], [2, 6, 0]), [false, true, false]);
 *
 * ```
 *
 * @example Equality comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [false, false]]);
 * ```
 */
export default function eq(x: matrix, y: matrix): matrix<boolean>;
/**
 * Checks for equality between two values or arrays.
 *
 * Compares two inputs, which can be numbers, arrays, or matrices, and returns true where the elements are equal.
 *
 * @param x Left-hand side value(s) for comparison.
 * @param y Right-hand side value(s) for comparison.
 * @returns The result of the equality comparison.
 * @throws If fewer than two arguments are provided.
 *
 * @example Equality comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, 5), true);
 *
 * ```
 *
 * @example Equality comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [5, 6, 3]), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq(5, [[5, 6], [3, 5]]), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], 5), [true, false, false]);
 *
 * ```
 *
 * @example Equality comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [3, 5]], 5), [[true, false], [false, true]]);
 *
 * ```
 *
 * @example Equality comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([5, 6, 3], [2, 6, 0]), [false, true, false]);
 *
 * ```
 *
 * @example Equality comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eq([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [false, false]]);
 * ```
 */
export default function eq(
  x: numarraymatrix,
  y: numarraymatrix,
): boolean | array<boolean> | matrix<boolean> {
  return handleEqualityComparison(x, y);
}

/**
 * Handle equality comparison for different input types.
 */
function handleEqualityComparison(
  x: numarraymatrix,
  y: numarraymatrix,
): boolean | array<boolean> | matrix<boolean> {
  const _eq = (el: number) => el === 0;

  if (isnumber(x) && isnumber(y)) {
    return x === y;
  }

  if (isarray(x) && isarray(y)) {
    return elementwiseArrayComparison(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return elementwiseMatrixComparison(x as matrix, y as matrix);
  }

  if (isnumber(x)) {
    if (isarray(y)) {
      return y.map((val) => x === val);
    }
    if (ismatrix(y)) {
      return y.map((row) => row.map((val) => x === val));
    }
  }

  if (isnumber(y)) {
    if (isarray(x)) {
      return x.map((val) => val === y);
    }
    if (ismatrix(x)) {
      return x.map((row) => row.map((val) => val === y));
    }
  }

  if (isarray(x) && ismatrix(y)) {
    return y.map((row) => row.map((val, j) => x[j] === val));
  }

  if (ismatrix(x) && isarray(y)) {
    return x.map((row) => row.map((val, j) => val === y[j]));
  }

  throw new Error("Unsupported input types");
}

/**
 * Element-wise comparison of two arrays.
 */
function elementwiseArrayComparison(x: array, y: array): array<boolean> {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }
  return x.map((val: number, i: number) => val === y[i]);
}

/**
 * Element-wise comparison of two matrices.
 */
function elementwiseMatrixComparison(x: matrix, y: matrix): matrix<boolean> {
  if (x.length !== y.length || x[0].length !== y[0].length) {
    throw new Error("Matrices must have the same dimensions");
  }
  return x.map((row: array, i: number) =>
    row.map((val: number, j: number) => val === y[i][j])
  );
}
