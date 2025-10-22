import type { array, matrix } from "../types.d.ts";

import isnumber from "../datatype/isnumber.ts";
import ismatrix from "../datatype/ismatrix.ts";
import transpose from "./transpose.ts";
import isarray from "../datatype/isarray.ts";

/**
 * Flatten a matrix into an array.
 *
 * Flattens a matrix into a 1D array. The default concatenation is row-wise (dim = 0). If `dim = 1`, the concatenation is column-wise.
 *
 * @param x The matrix to flatten.
 * @param dimParam The dimension to flatten by. 0 = row-wise, 1 = column-wise. Defaults to 0.
 * @returns The flattened 1D array.
 * @throws If no input is provided or if the input is not a matrix.
 *
 * @example Flatten a 2x2 matrix (row-wise by default)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[5, 6], [7, 8]]), [5, 6, 7, 8]);
 *
 * ```
 *
 * @example Flatten a 3x3 matrix by rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), [1, 1, -1, 1, -2, 3, 2, 3, 1]);
 *
 * ```
 *
 * @example Flatten a 3x3 matrix by columns (dim = 1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]], 1), [1, 1, 2, 1, -2, 3, -1, 3, 1]);
 *
 * ```
 */
export default function flatten(x: number): number;
/**
 * Flatten a matrix into an array.
 *
 * Flattens a matrix into a 1D array. The default concatenation is row-wise (dim = 0). If `dim = 1`, the concatenation is column-wise.
 *
 * @param x The matrix to flatten.
 * @param dimParam The dimension to flatten by. 0 = row-wise, 1 = column-wise. Defaults to 0.
 * @returns The flattened 1D array.
 * @throws If no input is provided or if the input is not a matrix.
 *
 * @example Flatten a 2x2 matrix (row-wise by default)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[5, 6], [7, 8]]), [5, 6, 7, 8]);
 *
 * ```
 *
 * @example Flatten a 3x3 matrix by rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), [1, 1, -1, 1, -2, 3, 2, 3, 1]);
 *
 * ```
 *
 * @example Flatten a 3x3 matrix by columns (dim = 1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]], 1), [1, 1, 2, 1, -2, 3, -1, 3, 1]);
 *
 * ```
 */
export default function flatten(x: array): array;
/**
 * Flatten a matrix into an array.
 *
 * Flattens a matrix into a 1D array. The default concatenation is row-wise (dim = 0). If `dim = 1`, the concatenation is column-wise.
 *
 * @param x The matrix to flatten.
 * @param dimParam The dimension to flatten by. 0 = row-wise, 1 = column-wise. Defaults to 0.
 * @returns The flattened 1D array.
 * @throws If no input is provided or if the input is not a matrix.
 *
 * @example Flatten a 2x2 matrix (row-wise by default)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[5, 6], [7, 8]]), [5, 6, 7, 8]);
 *
 * ```
 *
 * @example Flatten a 3x3 matrix by rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), [1, 1, -1, 1, -2, 3, 2, 3, 1]);
 *
 * ```
 *
 * @example Flatten a 3x3 matrix by columns (dim = 1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]], 1), [1, 1, 2, 1, -2, 3, -1, 3, 1]);
 *
 * ```
 */
export default function flatten(x: matrix, dim: 0 | 1): array;
/**
 * Flatten a matrix into an array.
 *
 * Flattens a matrix into a 1D array. The default concatenation is row-wise (dim = 0). If `dim = 1`, the concatenation is column-wise.
 *
 * @param x The matrix to flatten.
 * @param dimParam The dimension to flatten by. 0 = row-wise, 1 = column-wise. Defaults to 0.
 * @returns The flattened 1D array.
 * @throws If no input is provided or if the input is not a matrix.
 *
 * @example Flatten a 2x2 matrix (row-wise by default)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[5, 6], [7, 8]]), [5, 6, 7, 8]);
 *
 * ```
 *
 * @example Flatten a 3x3 matrix by rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), [1, 1, -1, 1, -2, 3, 2, 3, 1]);
 *
 * ```
 *
 * @example Flatten a 3x3 matrix by columns (dim = 1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]], 1), [1, 1, 2, 1, -2, 3, -1, 3, 1]);
 *
 * ```
 */
export default function flatten(x: array | matrix, dim?: 0 | 1): array;
/**
 * Flatten a matrix into an array.
 *
 * Flattens a matrix into a 1D array. The default concatenation is row-wise (dim = 0). If `dim = 1`, the concatenation is column-wise.
 *
 * @param x The matrix to flatten.
 * @param dimParam The dimension to flatten by. 0 = row-wise, 1 = column-wise. Defaults to 0.
 * @returns The flattened 1D array.
 * @throws If no input is provided or if the input is not a matrix.
 *
 * @example Flatten a 2x2 matrix (row-wise by default)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[5, 6], [7, 8]]), [5, 6, 7, 8]);
 *
 * ```
 *
 * @example Flatten a 3x3 matrix by rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), [1, 1, -1, 1, -2, 3, 2, 3, 1]);
 *
 * ```
 *
 * @example Flatten a 3x3 matrix by columns (dim = 1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]], 1), [1, 1, 2, 1, -2, 3, -1, 3, 1]);
 *
 * ```
 */
export default function flatten(x: unknown, dim: 0 | 1 = 0): unknown {
  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    return x;
  }

  if (ismatrix(x)) {
    const matrixToFlatten = dim === 1
      ? (transpose(x) as matrix)
      : (x as matrix);
    return ([] as number[]).concat(...matrixToFlatten);
  }

  throw new Error("Unknown input arguments");
}
