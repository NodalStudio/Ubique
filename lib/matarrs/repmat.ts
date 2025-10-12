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
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Replicate a scalar value into a 3x3 matrix
 * assertEquals(repmat(10, 3), [
 *   [10, 10, 10],
 *   [10, 10, 10],
 *   [10, 10, 10]
 * ]);
 *
 * // Example 2: Replicate a scalar into a 3x2 matrix
 * assertEquals(repmat(0.5, 3, 2), [
 *   [0.5, 0.5],
 *   [0.5, 0.5],
 *   [0.5, 0.5]
 * ]);
 *
 * // Example 3: Replicate a row vector
 * assertEquals(repmat([5, 6, 3], 1, 2), [
 *   [5, 6, 3, 5, 6, 3]
 * ]);
 *
 * // Example 4: Replicate a 2x2 matrix
 * assertEquals(repmat([[9, 5], [6, 1]], 2), [
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1],
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1]
 * ]);
 *
 * // Example 5: Replicate a column vector
 * assertEquals(repmat([[2], [3]], 2, 3), [
 *   [2, 2, 2],
 *   [3, 3, 3],
 *   [2, 2, 2],
 *   [3, 3, 3]
 * ]);
 *
 * // Example 6: Single-element matrix repeated
 * assertEquals(repmat([[7]], 2, 2), [
 *   [7, 7],
 *   [7, 7]
 * ]);
 *
 * // Example 7: Boolean replication
 * assertEquals(repmat(true, 2, 2), [
 *   [true, true],
 *   [true, true]
 * ]);
 *
 * // Example 8: Replicating a single-element array
 * assertEquals(repmat([4], 3, 2), [
 *   [4, 4],
 *   [4, 4],
 *   [4, 4]
 * ]);

 * ```*/
export default function repmat<T>(
  x: matrix<T>,
  m: number,
  n?: number,
): matrix<T>;
export default function repmat<T>(
  x: array<T>,
  m: number,
  n?: number,
): matrix<T>;
export default function repmat<T>(x: T, m: number, n?: number): matrix<T>;
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
