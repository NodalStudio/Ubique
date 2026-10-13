import type { array, matrix } from "../types.d.ts";

import { factorize } from "./factorize.ts";

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
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 * import { eye } from "../../index.ts";
 *
 * const actual = (linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], [5, 6, 3])) as number[];
 * const expected = [5.846153846153846, -2.3846153846153846, -1.5384615384615385];
 * assertEquals(actual.length, expected.length);
 * actual.forEach((v, i) => assertAlmostEquals(v, expected[i], 1e-12));
 *
 * ```
 *
 * @example Solve a linear system with a matrix
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 * import { eye } from "../../index.ts";
 *
 * const actual = (linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], [[4], [-6], [7]])) as number[][];
 * const expected = [[1], [2], [-0.9999999999999999]];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Solve a linear system with an identity matrix
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 * import { eye } from "../../index.ts";
 *
 * const actual = (linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], eye(3, 3))) as number[][];
 * const expected = [[0.846153846153846, 0.3076923076923077, -0.07692307692307707],
 *    [-0.3846153846153846, -0.23076923076923078, 0.30769230769230776],
 *    [-0.5384615384615384, 0.07692307692307691, 0.23076923076923078]];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 */
export default function linsolve(A: matrix, b: array | matrix): array | matrix {
  return factorize(A).solve(b);
}
