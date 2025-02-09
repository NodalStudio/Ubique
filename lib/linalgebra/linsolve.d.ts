import { array, matrix } from '../types';

/**
 * @function linsolve
 * @summary Solves a linear system of equations Ax = b.
 * @description Solves the linear system of equations Ax = b using LU factorization with row pivoting.
 *
 * @param A A square matrix.
 * @param b A vector or matrix.
 * @returns The solution to the linear system.
 * @throws If not enough input arguments are provided.
 * @throws If matrix dimensions do not agree.
 * @throws If the matrix is not square.
 * @throws If the matrix is singular.
 *
 * @example
 * // Example 1: Solve linear system with a vector
 * assert.deepStrictEqual(linsolve([[1,1,-1],[1,-2,3],[2,3,1]], transpose([5,6,3])), [5.846154, -2.384615, -1.538462]);
 *
 * // Example 2: Solve linear system with a matrix
 * assert.deepStrictEqual(linsolve([[1,1,-1],[1,-2,3],[2,3,1]], [[4],[-6],[7]]), [1, 2, -1]);
 *
 * // Example 3: Solve linear system with identity matrix
 * assert.deepStrictEqual(linsolve([[1,1,-1],[1,-2,3],[2,3,1]], eye(3)), [
 *   [0.846154, 0.307692, -0.0769231],
 *   [-0.384615, -0.230769, 0.307692],
 *   [-0.538462, 0.0769231, 0.230769]
 * ]);
 */
export function linsolve(A: matrix, b: array | matrix): array | matrix;
