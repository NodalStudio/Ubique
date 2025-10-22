import type { array, matrix } from "../types.d.ts";

/**
 * Replicate and tile an array or matrix.
 *
 * Creates a new matrix by repeating the input value, array, or matrix in a tiled fashion.
 * If only two arguments are provided, `m` is used for both row and column replication.
 *
 * @param x The value, array, or matrix to replicate.
 * @param m Number of times to repeat along the rows.
 * @param n Number of times to repeat along the columns. Defaults to the value of `m` when omitted.
 * @returns The resulting replicated matrix.
 * @throws Error If `m` or `n` are non-positive.
 *
 * @example Replicate a scalar value into a 3x3 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat(10, 3), [
 *   [10, 10, 10],
 *   [10, 10, 10],
 *   [10, 10, 10]
 * ]);
 *
 * ```
 *
 * @example Replicate a scalar into a 3x2 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat(0.5, 3, 2), [
 *   [0.5, 0.5],
 *   [0.5, 0.5],
 *   [0.5, 0.5]
 * ]);
 *
 * ```
 *
 * @example Replicate a row vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([5, 6, 3], 1, 2), [
 *   [5, 6, 3, 5, 6, 3]
 * ]);
 *
 * ```
 *
 * @example Replicate a 2x2 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([[9, 5], [6, 1]], 2), [
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1],
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1]
 * ]);
 *
 * ```
 *
 * @example Replicate a column vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([[2], [3]], 2, 3), [
 *   [2, 2, 2],
 *   [3, 3, 3],
 *   [2, 2, 2],
 *   [3, 3, 3]
 * ]);
 *
 * ```
 *
 * @example Single-element matrix repeated
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([[7]], 2, 2), [
 *   [7, 7],
 *   [7, 7]
 * ]);
 *
 * ```
 *
 * @example Boolean replication
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat(true, 2, 2), [
 *   [true, true],
 *   [true, true]
 * ]);
 *
 * ```
 *
 * @example Replicating a single-element array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([4], 3, 2), [
 *   [4, 4],
 *   [4, 4],
 *   [4, 4]
 * ]);
 *
 * ```
 */
export default function repmat<T>(
  x: matrix<T>,
  m: number,
  n?: number,
): matrix<T>;
/**
 * Replicate and tile an array or matrix.
 *
 * Creates a new matrix by repeating the input value, array, or matrix in a tiled fashion.
 * If only two arguments are provided, `m` is used for both row and column replication.
 *
 * @param x The value, array, or matrix to replicate.
 * @param m Number of times to repeat along the rows.
 * @param n Number of times to repeat along the columns. Defaults to the value of `m` when omitted.
 * @returns The resulting replicated matrix.
 * @throws Error If `m` or `n` are non-positive.
 *
 * @example Replicate a scalar value into a 3x3 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat(10, 3), [
 *   [10, 10, 10],
 *   [10, 10, 10],
 *   [10, 10, 10]
 * ]);
 *
 * ```
 *
 * @example Replicate a scalar into a 3x2 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat(0.5, 3, 2), [
 *   [0.5, 0.5],
 *   [0.5, 0.5],
 *   [0.5, 0.5]
 * ]);
 *
 * ```
 *
 * @example Replicate a row vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([5, 6, 3], 1, 2), [
 *   [5, 6, 3, 5, 6, 3]
 * ]);
 *
 * ```
 *
 * @example Replicate a 2x2 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([[9, 5], [6, 1]], 2), [
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1],
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1]
 * ]);
 *
 * ```
 *
 * @example Replicate a column vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([[2], [3]], 2, 3), [
 *   [2, 2, 2],
 *   [3, 3, 3],
 *   [2, 2, 2],
 *   [3, 3, 3]
 * ]);
 *
 * ```
 *
 * @example Single-element matrix repeated
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([[7]], 2, 2), [
 *   [7, 7],
 *   [7, 7]
 * ]);
 *
 * ```
 *
 * @example Boolean replication
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat(true, 2, 2), [
 *   [true, true],
 *   [true, true]
 * ]);
 *
 * ```
 *
 * @example Replicating a single-element array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([4], 3, 2), [
 *   [4, 4],
 *   [4, 4],
 *   [4, 4]
 * ]);
 *
 * ```
 */
export default function repmat<T>(
  x: array<T>,
  m: number,
  n?: number,
): matrix<T>;
/**
 * Replicate and tile an array or matrix.
 *
 * Creates a new matrix by repeating the input value, array, or matrix in a tiled fashion.
 * If only two arguments are provided, `m` is used for both row and column replication.
 *
 * @param x The value, array, or matrix to replicate.
 * @param m Number of times to repeat along the rows.
 * @param n Number of times to repeat along the columns. Defaults to the value of `m` when omitted.
 * @returns The resulting replicated matrix.
 * @throws Error If `m` or `n` are non-positive.
 *
 * @example Replicate a scalar value into a 3x3 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat(10, 3), [
 *   [10, 10, 10],
 *   [10, 10, 10],
 *   [10, 10, 10]
 * ]);
 *
 * ```
 *
 * @example Replicate a scalar into a 3x2 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat(0.5, 3, 2), [
 *   [0.5, 0.5],
 *   [0.5, 0.5],
 *   [0.5, 0.5]
 * ]);
 *
 * ```
 *
 * @example Replicate a row vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([5, 6, 3], 1, 2), [
 *   [5, 6, 3, 5, 6, 3]
 * ]);
 *
 * ```
 *
 * @example Replicate a 2x2 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([[9, 5], [6, 1]], 2), [
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1],
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1]
 * ]);
 *
 * ```
 *
 * @example Replicate a column vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([[2], [3]], 2, 3), [
 *   [2, 2, 2],
 *   [3, 3, 3],
 *   [2, 2, 2],
 *   [3, 3, 3]
 * ]);
 *
 * ```
 *
 * @example Single-element matrix repeated
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([[7]], 2, 2), [
 *   [7, 7],
 *   [7, 7]
 * ]);
 *
 * ```
 *
 * @example Boolean replication
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat(true, 2, 2), [
 *   [true, true],
 *   [true, true]
 * ]);
 *
 * ```
 *
 * @example Replicating a single-element array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([4], 3, 2), [
 *   [4, 4],
 *   [4, 4],
 *   [4, 4]
 * ]);
 *
 * ```
 */
export default function repmat<T>(x: T, m: number, n?: number): matrix<T>;
/**
 * Replicate and tile an array or matrix.
 *
 * Creates a new matrix by repeating the input value, array, or matrix in a tiled fashion.
 * If only two arguments are provided, `m` is used for both row and column replication.
 *
 * @param x The value, array, or matrix to replicate.
 * @param m Number of times to repeat along the rows.
 * @param n Number of times to repeat along the columns. Defaults to the value of `m` when omitted.
 * @returns The resulting replicated matrix.
 * @throws Error If `m` or `n` are non-positive.
 *
 * @example Replicate a scalar value into a 3x3 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat(10, 3), [
 *   [10, 10, 10],
 *   [10, 10, 10],
 *   [10, 10, 10]
 * ]);
 *
 * ```
 *
 * @example Replicate a scalar into a 3x2 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat(0.5, 3, 2), [
 *   [0.5, 0.5],
 *   [0.5, 0.5],
 *   [0.5, 0.5]
 * ]);
 *
 * ```
 *
 * @example Replicate a row vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([5, 6, 3], 1, 2), [
 *   [5, 6, 3, 5, 6, 3]
 * ]);
 *
 * ```
 *
 * @example Replicate a 2x2 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([[9, 5], [6, 1]], 2), [
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1],
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1]
 * ]);
 *
 * ```
 *
 * @example Replicate a column vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([[2], [3]], 2, 3), [
 *   [2, 2, 2],
 *   [3, 3, 3],
 *   [2, 2, 2],
 *   [3, 3, 3]
 * ]);
 *
 * ```
 *
 * @example Single-element matrix repeated
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([[7]], 2, 2), [
 *   [7, 7],
 *   [7, 7]
 * ]);
 *
 * ```
 *
 * @example Boolean replication
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat(true, 2, 2), [
 *   [true, true],
 *   [true, true]
 * ]);
 *
 * ```
 *
 * @example Replicating a single-element array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(repmat([4], 3, 2), [
 *   [4, 4],
 *   [4, 4],
 *   [4, 4]
 * ]);
 *
 * ```
 */
export default function repmat<T>(
  x: T | array<T> | matrix<T>,
  m: number,
  n: number = m,
): matrix<T> {
  if (!Number.isInteger(m) || !Number.isInteger(n) || m <= 0 || n <= 0) {
    throw new Error("Replication counts must be positive integers.");
  }

  const matrixValue = toMatrix(x);
  const rows = matrixValue.length;
  const cols = matrixValue[0]?.length ?? 0;

  if (rows === 0 || cols === 0) {
    return Array.from({ length: rows * m }, () => Array<T>(cols * n)) as matrix<
      T
    >;
  }

  return Array.from(
    { length: rows * m },
    (_, i) =>
      Array.from(
        { length: cols * n },
        (_, j) => matrixValue[i % rows][j % cols],
      ),
  ) as matrix<T>;
}

function toMatrix<T>(x: matrix<T>): matrix<T>;
function toMatrix<T>(x: array<T>): matrix<T>;
function toMatrix<T>(x: T): matrix<T>;
function toMatrix<T>(x: T | array<T> | matrix<T>): matrix<T> {
  if (!Array.isArray(x)) {
    return [[x]] as matrix<T>;
  }

  if (x.length === 0) {
    return [[]] as matrix<T>;
  }

  if (Array.isArray(x[0])) {
    return x as matrix<T>;
  }

  return [x as array<T>] as matrix<T>;
}
