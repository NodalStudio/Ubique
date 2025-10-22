import type { array, matrix } from "../types.d.ts";

import nrows from "../matarrs/nrows.ts";
import ncols from "../matarrs/ncols.ts";
import issquare from "../matarrs/issquare.ts";
import isarray from "../datatype/isarray.ts";
import lu from "./lu.ts";
import issingular from "../datatype/issingular.ts";
import subset from "../matarrs/subset.ts";
import colon from "../matarrs/colon.ts";
import transpose from "../matarrs/transpose.ts";
import getcol from "../matarrs/getcol.ts";

/**
 * Solve a linear system of equations Ax = b.
 *
 * Solves the linear system of equations Ax = b using LU factorization with row pivoting.
 *
 * @param A A square matrix.
 * @param b A vector or matrix.
 * @returns The solution to the linear system.
 * @throws If not enough input arguments are provided.
 * @throws If matrix dimensions do not agree.
 * @throws If the matrix is not square.
 * @throws If the matrix is singular.
 *
 * @example Solve a linear system with a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { eye } from "../../index.ts";
 *
 * assertEquals(linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], [5, 6, 3]),
 *   [5.846153846153846, -2.3846153846153846, -1.5384615384615385]);
 *
 * ```
 *
 * @example Solve a linear system with a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { eye } from "../../index.ts";
 *
 * assertEquals(linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], [[4], [-6], [7]]),
 *   [[1], [2], [-0.9999999999999999]]);
 *
 * ```
 *
 * @example Solve a linear system with an identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { eye } from "../../index.ts";
 *
 * assertEquals(linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], eye(3, 3)),
 *   [[0.846153846153846, 0.3076923076923077, -0.07692307692307707],
 *    [-0.3846153846153846, -0.23076923076923078, 0.30769230769230776],
 *    [-0.5384615384615384, 0.07692307692307691, 0.23076923076923078]]);
 *
 * ```
 */
export default function linsolve(A: matrix, b: array | matrix): array | matrix {
  if (!issquare(A)) {
    throw new Error("Matrix must be square");
  }

  const wasVector = isarray(b);
  const matrixB: matrix = wasVector
    ? (transpose(b as array) as matrix)
    : (b as matrix);

  if (nrows(A) !== nrows(matrixB)) {
    throw new Error("Matrix dimensions must agree");
  }

  const lud = lu(A);

  if (issingular(lud.LU)) {
    throw new Error("Matrix is singular");
  }

  const LU = lud.LU;
  const P = lud.P;

  // Handle `b` permutation
  const permutedB = subset(matrixB, P, colon(0, ncols(matrixB) - 1)) as matrix;

  // Solve for each column of `b`
  const result: matrix = [];
  for (let i = 0; i < ncols(permutedB); i++) {
    const col = getcol(permutedB, i);
    const solvedCol = solve(LU, col);
    result.push(solvedCol);
  }

  // Return as flat array if input `b` was a vector, otherwise return as a matrix
  return wasVector ? result.flat() : (transpose(result) as matrix);
}

/**
 * Helper function to solve a linear system given LU decomposition.
 * @param LU The LU matrix from LU decomposition.
 * @param b The vector to solve for.
 * @returns The solution vector.
 */
function solve(LU: matrix, b: array): array {
  const n = nrows(LU);
  const x = [...b];

  // Forward substitution: Solve Ly = b
  for (let i = 1; i < n; i++) {
    let sum = x[i];
    for (let j = 0; j < i; j++) {
      sum -= LU[i][j] * x[j];
    }
    x[i] = sum;
  }

  // Back substitution: Solve Ux = y
  x[n - 1] /= LU[n - 1][n - 1];
  for (let i = n - 2; i >= 0; i--) {
    let sum = x[i];
    for (let j = i + 1; j < n; j++) {
      sum -= LU[i][j] * x[j];
    }
    x[i] = sum / LU[i][i];
  }

  return x;
}
