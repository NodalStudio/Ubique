import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { isnumber, isarray, ismatrix } from "../../index.ts";
import { timeswasm } from "../../rs_lib/pkg/rs_lib.js";

/**
 * @function mtimes
 * @summary Matrix multiplication
 * @description Performs matrix multiplication of two matrices or arrays. For arrays, treats them as column vectors.
 *
 * @param x The first operand, can be a number, array (treated as column vector), or matrix
 * @param y The second operand, can be a number, array (treated as column vector), or matrix
 * @returns The result of matrix multiplication of x and y
 * @throws {Error} If matrix dimensions do not agree for multiplication or if no arguments are provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Multiply two numbers
 * assertEquals(mtimes(2, 3), 6);
 *
 * // Example 2: Multiply matrix by scalar
 * assertEquals(mtimes([[1, 2], [3, 4]], 2), [[2, 4], [6, 8]]);
 *
 * // Example 3: Multiply two matrices
 * assertEquals(mtimes([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
 *
 * // Example 4: Multiply matrix by column vector (array)
 * assertEquals(mtimes([[1, 2], [3, 4]], [5, 6]), [17, 39]);
 * ```
 */
export default function mtimes(x: number, y: number): number;
export default function mtimes(x: number, y: array): array;
export default function mtimes(x: array, y: number): array;
export default function mtimes(x: array, y: array): number;
export default function mtimes(x: number, y: matrix): matrix;
export default function mtimes(x: matrix, y: number): matrix;
export default function mtimes(x: matrix, y: array): array;
export default function mtimes(x: array, y: matrix): array;
export default function mtimes(x: matrix, y: matrix): matrix;
export default function mtimes(
  x: numarraymatrix,
  y: numarraymatrix
): numarraymatrix {
  if (isnumber(x) && isnumber(y)) {
    return x * y;
  }

  return handleMatrixMultiplication(x, y);
}

/**
 * Handle matrix multiplication where at least one operand is not a number
 */
function handleMatrixMultiplication(
  x: numarraymatrix,
  y: numarraymatrix
): numarraymatrix {
  if (isnumber(x)) {
    return scalarMultiplication(x as number, y);
  }

  if (isnumber(y)) {
    return scalarMultiplication(y as number, x);
  }

  if (isarray(x) && isarray(y)) {
    return vectorMultiplication(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return matrixMultiplication(x as matrix, y as matrix);
  }

  if (ismatrix(x) && isarray(y)) {
    return matrixVectorMultiplication(x as matrix, y as array);
  }

  if (isarray(x) && ismatrix(y)) {
    return vectorMatrixMultiplication(x as array, y as matrix);
  }

  throw new Error("Invalid input types");
}

/**
 * Multiply a scalar by an array or matrix
 */
function scalarMultiplication(scalar: number, operand: numarraymatrix): numarraymatrix {
  if (isarray(operand)) {
    return (operand as array).map((val: number) => scalar * val);
  }

  if (ismatrix(operand)) {
    return (operand as matrix).map((row: array) =>
      row.map((val: number) => scalar * val)
    );
  }

  throw new Error("Invalid operand type");
}

/**
 * Multiply two vectors (dot product)
 */
function vectorMultiplication(x: array, y: array): number {
  if (x.length !== y.length) {
    throw new Error("Vectors must have the same length");
  }
  return x.reduce((sum: number, val: number, i: number) => sum + val * y[i], 0);
}

/**
 * Multiply two matrices
 */
function matrixMultiplication(x: matrix, y: matrix): matrix {
  if (x[0].length !== y.length) {
    throw new Error("Matrix dimensions must agree");
  }

  const result: matrix = [];
  for (let i = 0; i < x.length; i++) {
    result[i] = [];
    for (let j = 0; j < y[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < y.length; k++) {
        sum += x[i][k] * y[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

/**
 * Multiply a matrix by a vector
 */
function matrixVectorMultiplication(x: matrix, y: array): array {
  if (x[0].length !== y.length) {
    throw new Error("Matrix and vector dimensions must agree");
  }

  return x.map((row: array) =>
    row.reduce((sum: number, val: number, i: number) => sum + val * y[i], 0)
  );
}

/**
 * Multiply a vector by a matrix
 */
function vectorMatrixMultiplication(x: array, y: matrix): array {
  if (x.length !== y.length) {
    throw new Error("Vector and matrix dimensions must agree");
  }

  const result: array = new Array(y[0].length).fill(0);
  for (let j = 0; j < y[0].length; j++) {
    for (let i = 0; i < x.length; i++) {
      result[j] += x[i] * y[i][j];
    }
  }
  return result;
}

/**
 * Fallback implementation of matrix multiplication
 */
function multiplyMatrices(a: number[][], b: number[][]): number[][] {
  // Use WASM implementation if available for large matrices
  if (typeof timeswasm === "function" && a.length > 2 && b[0].length > 2) {
    const rowsA = a.length;
    const colsA = a[0].length;
    const colsB = b[0].length;
    const flatA = new Float64Array(a.flat());
    const flatB = new Float64Array(b.flat());

    const result = timeswasm(flatA, flatB, rowsA, colsA, colsB);

    return Array.from(
      { length: rowsA },
      (_, i) => Array.from({ length: colsB }, (_, j) => result[i * colsB + j])
    );
  }

  // Standard JavaScript implementation
  const result: number[][] = [];
  const m = a.length;
  const n = b[0].length;
  const p = b.length;

  for (let i = 0; i < m; i++) {
    result[i] = [];
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let k = 0; k < p; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }

  return result;
}
