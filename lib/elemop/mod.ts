import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { arrayfun, isarray, ismatrix, isnumber } from "../../index.ts";

/**
 * Modulus after division.
 *
 * Computes the modulus after division. This operation is element-wise for matrices and arrays.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The modulus after division
 * @throws If fewer than two arguments are provided
 *
 * @example Modulus of a vector with a scalar divisor
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], 2.2), [1.9999999999999991, -0.39999999999999947]);
 *
 * ```
 *
 * @example Modulus of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], [5, 6]), [3, -1]);
 *
 * ```
 *
 * @example Modulus of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assertEquals(mod(a, b), [[0, 0, 0], [3, 3, -1]]);
 * ```
 */
export default function mod(x: number, y: number): number;
/**
 * Modulus after division.
 *
 * Computes the modulus after division. This operation is element-wise for matrices and arrays.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The modulus after division
 * @throws If fewer than two arguments are provided
 *
 * @example Modulus of a vector with a scalar divisor
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], 2.2), [1.9999999999999991, -0.39999999999999947]);
 *
 * ```
 *
 * @example Modulus of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], [5, 6]), [3, -1]);
 *
 * ```
 *
 * @example Modulus of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assertEquals(mod(a, b), [[0, 0, 0], [3, 3, -1]]);
 * ```
 */
export default function mod(x: number, y: array): array;
/**
 * Modulus after division.
 *
 * Computes the modulus after division. This operation is element-wise for matrices and arrays.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The modulus after division
 * @throws If fewer than two arguments are provided
 *
 * @example Modulus of a vector with a scalar divisor
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], 2.2), [1.9999999999999991, -0.39999999999999947]);
 *
 * ```
 *
 * @example Modulus of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], [5, 6]), [3, -1]);
 *
 * ```
 *
 * @example Modulus of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assertEquals(mod(a, b), [[0, 0, 0], [3, 3, -1]]);
 * ```
 */
export default function mod(x: array, y: number): array;
/**
 * Modulus after division.
 *
 * Computes the modulus after division. This operation is element-wise for matrices and arrays.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The modulus after division
 * @throws If fewer than two arguments are provided
 *
 * @example Modulus of a vector with a scalar divisor
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], 2.2), [1.9999999999999991, -0.39999999999999947]);
 *
 * ```
 *
 * @example Modulus of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], [5, 6]), [3, -1]);
 *
 * ```
 *
 * @example Modulus of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assertEquals(mod(a, b), [[0, 0, 0], [3, 3, -1]]);
 * ```
 */
export default function mod(x: array, y: array): array;
/**
 * Modulus after division.
 *
 * Computes the modulus after division. This operation is element-wise for matrices and arrays.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The modulus after division
 * @throws If fewer than two arguments are provided
 *
 * @example Modulus of a vector with a scalar divisor
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], 2.2), [1.9999999999999991, -0.39999999999999947]);
 *
 * ```
 *
 * @example Modulus of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], [5, 6]), [3, -1]);
 *
 * ```
 *
 * @example Modulus of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assertEquals(mod(a, b), [[0, 0, 0], [3, 3, -1]]);
 * ```
 */
export default function mod(x: number, y: matrix): matrix;
/**
 * Modulus after division.
 *
 * Computes the modulus after division. This operation is element-wise for matrices and arrays.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The modulus after division
 * @throws If fewer than two arguments are provided
 *
 * @example Modulus of a vector with a scalar divisor
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], 2.2), [1.9999999999999991, -0.39999999999999947]);
 *
 * ```
 *
 * @example Modulus of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], [5, 6]), [3, -1]);
 *
 * ```
 *
 * @example Modulus of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assertEquals(mod(a, b), [[0, 0, 0], [3, 3, -1]]);
 * ```
 */
export default function mod(x: matrix, y: number): matrix;
/**
 * Modulus after division.
 *
 * Computes the modulus after division. This operation is element-wise for matrices and arrays.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The modulus after division
 * @throws If fewer than two arguments are provided
 *
 * @example Modulus of a vector with a scalar divisor
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], 2.2), [1.9999999999999991, -0.39999999999999947]);
 *
 * ```
 *
 * @example Modulus of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], [5, 6]), [3, -1]);
 *
 * ```
 *
 * @example Modulus of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assertEquals(mod(a, b), [[0, 0, 0], [3, 3, -1]]);
 * ```
 */
export default function mod(x: matrix, y: matrix): matrix;
/**
 * Modulus after division.
 *
 * Computes the modulus after division. This operation is element-wise for matrices and arrays.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The modulus after division
 * @throws If fewer than two arguments are provided
 *
 * @example Modulus of a vector with a scalar divisor
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], 2.2), [1.9999999999999991, -0.39999999999999947]);
 *
 * ```
 *
 * @example Modulus of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mod([13, -7], [5, 6]), [3, -1]);
 *
 * ```
 *
 * @example Modulus of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assertEquals(mod(a, b), [[0, 0, 0], [3, 3, -1]]);
 * ```
 */
export default function mod(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x)) {
    return isnumber(y) ? x % y : arrayfun(y, (val: number) => x % val);
  }

  if (isnumber(y)) {
    return arrayfun(x, (val: number) => val % y);
  }

  if (isarray(x) && isarray(y)) {
    return (x as array).map((val: number, i: number) => val % (y as array)[i]);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return (x as matrix).map((row: array, i: number) =>
      row.map((val: number, j: number) => val % (y as matrix)[i][j])
    );
  }

  throw new Error("Incompatible types for mod operation");
}
