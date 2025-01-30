/** @import { array, matrix } from '../types.js' */

import { nrows } from '../matarrs/nrows.js';
import { ncols } from '../matarrs/ncols.js';
import { issquare } from '../matarrs/issquare.js';
import { isnumber } from '../datatype/isnumber.js';
import { isarray } from '../datatype/isarray.js';
import { ismatrix } from '../datatype/ismatrix.js';
import { lu } from './lu.js';
import { issingular } from '../datatype/issingular.js';
import { subset } from '../matarrs/subset.js';
import { colon } from '../matarrs/colon.js';
import { transpose } from '../matarrs/transpose.js';
import { getcol } from '../matarrs/getcol.js';
import { cat } from '../matarrs/cat.js';

/**
 * @function linsolve
 * @summary Solve a linear system of equations Ax = b.
 * @description Solves the linear system of equations Ax = b using LU factorization with row pivoting.
 *
 * @param {matrix} A A square matrix.
 * @param {array|matrix} b A vector or matrix.
 * @returns {array|matrix} The solution to the linear system.
 * @throws {Error} If not enough input arguments are provided.
 * @throws {Error} If matrix dimensions do not agree.
 * @throws {Error} If the matrix is not square.
 * @throws {Error} If the matrix is singular.
 *
 * @example
 * // Example 1: Solve a linear system with a vector
 * linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], transpose([5, 6, 3]));
 * // [5.846154, -2.384615, -1.538462]
 *
 * // Example 2: Solve a linear system with a matrix
 * linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], [[4], [-6], [7]]);
 * // [1, 2, -1]
 *
 * // Example 3: Solve a linear system with an identity matrix
 * linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], eye(3));
 * // [[0.846154, 0.307692, -0.0769231], [-0.384615, -0.230769, 0.307692], [-0.538462, 0.0769231, 0.230769]]
 */
export function linsolve(A, b) {
  if (arguments.length < 2) {
    throw new Error('Not enough input arguments');
  }

  if (!issquare(A)) {
    throw new Error('Matrix must be square');
  }

  if (isarray(b)) {
    // Convert vector `b` into a column matrix
    b = transpose(b);
  }

  if (nrows(A) !== nrows(b)) {
    throw new Error('Matrix dimensions must agree');
  }

  const lud = lu(A);

  if (issingular(lud.LU)) {
    throw new Error('Matrix is singular');
  }

  const LU = lud.LU;
  const P = lud.P;

  // Handle `b` permutation
  const permutedB = ismatrix(b) ? subset(b, P, colon(0, ncols(b) - 1)) : subset(b, P);

  // Solve for each column of `b`
  const result = [];
  for (let i = 0; i < ncols(permutedB); i++) {
    const col = getcol(permutedB, i);
    const solvedCol = solve(LU, col);
    result.push(solvedCol);
  }

  // Return as flat array if input `b` was a vector, otherwise return as a matrix
  return ncols(b) === 1 ? result.flat() : transpose(result);
}

/**
 * Helper function to solve a linear system given LU decomposition.
 * @param {matrix} LU The LU matrix from LU decomposition.
 * @param {array} b The vector to solve for.
 * @returns {array} The solution vector.
 */
function solve(LU, b) {
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

