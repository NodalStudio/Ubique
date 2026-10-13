import { factorLU, finiteMatrix } from "../internal/lu.ts";
import type { array, matrix } from "../types.d.ts";
import { ncols, nrows, zeros } from "../../index.ts";

/**
 * LU decomposition with partial pivoting.
 *
 * Performs LU decomposition of the input matrix `x` using the Doolittle algorithm with partial pivoting.
 * Returns the combined LU matrix, lower triangular matrix `L`, upper triangular matrix `U`, pivot vector `P`, and pivot sign `S`.
 *
 * @param x The input matrix.
 * @returns Object containing LU decomposition results
 * @throws If no input arguments are provided.
 *
 * @example LU decomposition of a 2x2 square matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lu([[3, 2], [5, 2]]), {
 *   LU: [
 *     [5, 2],
 *     [0.6, 0.8]
 *   ],
 *   L: [
 *     [1, 0],
 *     [0.6, 1]
 *   ],
 *   U: [
 *     [5, 2],
 *     [0, 0.8]
 *   ],
 *   P: [1, 0],
 *   S: -1
 * });
 *
 * ```
 *
 * @example LU decomposition of a 3x3 square matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lu([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), {
 *   LU: [
 *     [2, 3, 1],
 *     [0.5, -3.5, 2.5],
 *     [0.5, 0.14285714285714285, -1.8571428571428572]
 *   ],
 *   L: [
 *     [1, 0, 0],
 *     [0.5, 1, 0],
 *     [0.5, 0.14285714285714285, 1]
 *   ],
 *   U: [
 *     [2, 3, 1],
 *     [0, -3.5, 2.5],
 *     [0, 0, -1.8571428571428572]
 *   ],
 *   P: [2, 1, 0],
 *   S: -1
 * });
 *
 * ```
 *
 * @example LU decomposition of a 2x3 rectangular matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lu([[5, 6, 5], [7, 8, -1]]), {
 *   LU: [
 *     [7, 8, -1],
 *     [0.7142857142857143, 0.2857142857142856, 5.714285714285714]
 *   ],
 *   L: [
 *     [1, 0],
 *     [0.7142857142857143, 1]
 *   ],
 *   U: [
 *     [7, 8, -1],
 *     [0, 0.2857142857142856, 5.714285714285714]
 *   ],
 *   P: [1, 0],
 *   S: -1
 * });
 *
 * ```
 *
 * @example LU decomposition of a singular 3x3 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lu([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), {
 *   LU: [
 *     [7, 8, 9],
 *     [0.14285714285714285, 0.8571428571428572, 1.7142857142857144],
 *     [0.5714285714285714, 0.5000000000000002, 1.1102230246251565e-16]
 *   ],
 *   L: [
 *     [1, 0, 0],
 *     [0.14285714285714285, 1, 0],
 *     [0.5714285714285714, 0.5000000000000002, 1]
 *   ],
 *   U: [
 *     [7, 8, 9],
 *     [0, 0.8571428571428572, 1.7142857142857144],
 *     [0, 0, 1.1102230246251565e-16]
 *   ],
 *   P: [2, 0, 1],
 *   S: 1
 * });
 *
 * ```
 *
 * @example LU decomposition of a 3x2 rectangular matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lu([[1, 2], [3, 4], [5, 6]]), {
 *   LU: [
 *     [5, 6],
 *     [0.2, 0.7999999999999998],
 *     [0.6, 0.5000000000000006]
 *   ],
 *   L: [
 *     [1, 0],
 *     [0.2, 1],
 *     [0.6, 0.5000000000000006]
 *   ],
 *   U: [
 *     [5, 6],
 *     [0, 0.7999999999999998]
 *   ],
 *   P: [2, 0, 1],
 *   S: 1
 * });
 *
 * ```
 *
 * @example Error when input is not provided
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // lu() throws: "Not enough input arguments"
 *
 * ```
 */
export default function lu(x: matrix): {
  LU: matrix;
  L: matrix;
  U: matrix;
  P: array;
  S: number;
} {
  finiteMatrix(x);
  const { data: A, permutation: piv, sign: pivsign } = factorLU(x);
  return {
    LU: A,
    L: extractLowerTriangular(A),
    U: extractUpperTriangular(A),
    P: piv,
    S: pivsign,
  };
}

/**
 * Extracts the lower triangular matrix from the LU matrix.
 * @param LU The LU matrix.
 * @returns The lower triangular matrix.
 */
function extractLowerTriangular(LU: matrix): matrix {
  const m = nrows(LU);
  const n = ncols(LU);
  const L = zeros(m, Math.min(m, n));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j <= i && j < Math.min(m, n); j++) {
      L[i][j] = i === j ? 1 : LU[i][j];
    }
  }
  return L;
}

/**
 * Extracts the upper triangular matrix from the LU matrix.
 * @param LU The LU matrix.
 * @returns The upper triangular matrix.
 */
function extractUpperTriangular(LU: matrix): matrix {
  const m = nrows(LU);
  const n = ncols(LU);
  const U = zeros(Math.min(m, n), n);
  for (let i = 0; i < Math.min(m, n); i++) {
    for (let j = i; j < n; j++) {
      U[i][j] = LU[i][j];
    }
  }
  return U;
}
