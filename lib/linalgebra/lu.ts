import type { array, matrix } from "../types.d.ts";
import { clone, ncols, nrows, zeros } from "../../index.ts";

/**
 * @function lu
 * @summary LU decomposition with partial pivoting.
 * @description Performs LU decomposition of the input matrix `x` using the Doolittle algorithm with partial pivoting.
 * Returns the combined LU matrix, lower triangular matrix `L`, upper triangular matrix `U`, pivot vector `P`, and pivot sign `S`.
 *
 * @param x The input matrix.
 * @returns Object containing LU decomposition results
 * @throws If no input arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: LU decomposition of a 2x2 square matrix
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
 * // Example 2: LU decomposition of a 3x3 square matrix
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
 * // Example 3: LU decomposition of a 2x3 rectangular matrix
 * assertEquals(lu([[5, 6, 5], [7, 8, -1]]), {
 *   LU: [
 *     [7, 8, -1],
 *     [0.7142857142857143, 0.2857142857142856, 5.714285714285714]
 *   ],
 *   L: [
 *     [1, 0, 0],
 *     [0.7142857142857143, 1, 0]
 *   ],
 *   U: [
 *     [7, 8, -1],
 *     [0, 0.2857142857142856, 5.714285714285714]
 *   ],
 *   P: [1, 0],
 *   S: -1
 * });
 *
 * // Example 4: LU decomposition of a singular 3x3 matrix
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
 * // Example 5: LU decomposition of a 3x2 rectangular matrix
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
 *     [0, 0.7999999999999998],
 *     [0, 0]
 *   ],
 *   P: [2, 0, 1],
 *   S: 1
 * });
 *
 * // Example 6: Error when input is not provided
 * // lu() throws: "Not enough input arguments"

 * ```*/
export default function lu(x: matrix): {
  LU: matrix;
  L: matrix;
  U: matrix;
  P: array;
  S: number;
} {
  const m = nrows(x); // Number of rows
  const n = ncols(x); // Number of columns
  const A = clone(x); // Clone the input matrix to avoid mutating it
  const piv = Array.from({ length: m }, (_, i) => i); // Initialize pivot vector (zero-based)
  let pivsign = 1; // Sign of the permutation

  for (let j = 0; j < Math.min(m, n); j++) {
    // Find the pivot element in the current column
    let maxIndex = j;
    for (let i = j + 1; i < m; i++) {
      if (Math.abs(A[i][j]) > Math.abs(A[maxIndex][j])) {
        maxIndex = i;
      }
    }

    // Swap rows in A and update the pivot vector if needed
    if (maxIndex !== j) {
      swapRows(A, maxIndex, j, n); // Swap rows in A
      [piv[maxIndex], piv[j]] = [piv[j], piv[maxIndex]]; // Update the pivot vector
      pivsign = -pivsign; // Flip the sign of the permutation
    }

    // Perform elimination below the pivot
    if (A[j][j] !== 0) {
      for (let i = j + 1; i < m; i++) {
        A[i][j] /= A[j][j];
        for (let k = j + 1; k < n; k++) {
          A[i][k] -= A[i][j] * A[j][k];
        }
      }
    }
  }

  return {
    LU: A, // Combined LU matrix
    L: extractLowerTriangular(A),
    U: extractUpperTriangular(A),
    P: piv, // Pivot vector (zero-based)
    S: pivsign, // Pivot sign
  };
}

/**
 * Swaps two rows in a matrix.
 * @param A The matrix.
 * @param row1 The index of the first row.
 * @param row2 The index of the second row.
 * @param n The number of columns.
 */
function swapRows(A: matrix, row1: number, row2: number, n: number): void {
  for (let k = 0; k < n; k++) {
    const temp = A[row1][k];
    A[row1][k] = A[row2][k];
    A[row2][k] = temp;
  }
}

/**
 * Extracts the lower triangular matrix from the LU matrix.
 * @param LU The LU matrix.
 * @returns The lower triangular matrix.
 */
function extractLowerTriangular(LU: matrix): matrix {
  const m = nrows(LU);
  const n = ncols(LU);
  const L = zeros(m, n);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j <= i && j < n; j++) {
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
  const U = zeros(m, n);
  for (let i = 0; i < m; i++) {
    for (let j = i; j < n; j++) {
      U[i][j] = LU[i][j];
    }
  }
  return U;
}
