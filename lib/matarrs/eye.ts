import type { array, matrix } from "../types.d.ts";

import zeros from "./zeros.ts";
import isarray from "../datatype/isarray.ts";

/**
 * Identity matrix.
 *
 * Creates an identity matrix with the specified dimensions. If a single number is provided, it creates a square identity matrix.
 *
 * @param dimOrRows The number of rows, or an array specifying both dimensions.
 * @param cols The number of columns (optional if the first argument is an array).
 * @returns The identity matrix of the specified dimensions.
 * @throws If no input arguments are provided.
 *
 * @example Create a 0x0 matrix (empty matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(0, 0), []);
 *
 * ```
 *
 * @example Create a 1x1 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(1, 1), [[1]]);
 *
 * ```
 *
 * @example Create a 2x2 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(2, 2), [[1, 0], [0, 1]]);
 *
 * ```
 *
 * @example Create a 2x1 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye([2, 1]), [[1], [0]]);
 *
 * ```
 *
 * @example Create a 2x3 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(2, 3), [[1, 0, 0], [0, 1, 0]]);
 *
 * ```
 */
export default function eye(n: number): matrix;
/**
 * Identity matrix.
 *
 * Creates an identity matrix with the specified dimensions. If a single number is provided, it creates a square identity matrix.
 *
 * @param dimOrRows The number of rows, or an array specifying both dimensions.
 * @param cols The number of columns (optional if the first argument is an array).
 * @returns The identity matrix of the specified dimensions.
 * @throws If no input arguments are provided.
 *
 * @example Create a 0x0 matrix (empty matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(0, 0), []);
 *
 * ```
 *
 * @example Create a 1x1 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(1, 1), [[1]]);
 *
 * ```
 *
 * @example Create a 2x2 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(2, 2), [[1, 0], [0, 1]]);
 *
 * ```
 *
 * @example Create a 2x1 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye([2, 1]), [[1], [0]]);
 *
 * ```
 *
 * @example Create a 2x3 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(2, 3), [[1, 0, 0], [0, 1, 0]]);
 *
 * ```
 */
export default function eye(dims: array): matrix;
/**
 * Identity matrix.
 *
 * Creates an identity matrix with the specified dimensions. If a single number is provided, it creates a square identity matrix.
 *
 * @param dimOrRows The number of rows, or an array specifying both dimensions.
 * @param cols The number of columns (optional if the first argument is an array).
 * @returns The identity matrix of the specified dimensions.
 * @throws If no input arguments are provided.
 *
 * @example Create a 0x0 matrix (empty matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(0, 0), []);
 *
 * ```
 *
 * @example Create a 1x1 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(1, 1), [[1]]);
 *
 * ```
 *
 * @example Create a 2x2 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(2, 2), [[1, 0], [0, 1]]);
 *
 * ```
 *
 * @example Create a 2x1 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye([2, 1]), [[1], [0]]);
 *
 * ```
 *
 * @example Create a 2x3 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(2, 3), [[1, 0, 0], [0, 1, 0]]);
 *
 * ```
 */
export default function eye(nrows: number, ncols: number): matrix;
/**
 * Identity matrix.
 *
 * Creates an identity matrix with the specified dimensions. If a single number is provided, it creates a square identity matrix.
 *
 * @param dimOrRows The number of rows, or an array specifying both dimensions.
 * @param cols The number of columns (optional if the first argument is an array).
 * @returns The identity matrix of the specified dimensions.
 * @throws If no input arguments are provided.
 *
 * @example Create a 0x0 matrix (empty matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(0, 0), []);
 *
 * ```
 *
 * @example Create a 1x1 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(1, 1), [[1]]);
 *
 * ```
 *
 * @example Create a 2x2 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(2, 2), [[1, 0], [0, 1]]);
 *
 * ```
 *
 * @example Create a 2x1 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye([2, 1]), [[1], [0]]);
 *
 * ```
 *
 * @example Create a 2x3 identity matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(eye(2, 3), [[1, 0, 0], [0, 1, 0]]);
 *
 * ```
 */
export default function eye(dimOrRows: unknown, cols?: unknown): matrix {
  let nrows, ncols;

  if (isarray(dimOrRows)) {
    [nrows, ncols] = dimOrRows as array;
  } else {
    nrows = dimOrRows as number;
    ncols = cols !== undefined ? (cols as number) : nrows;
  }

  const matrix = zeros([nrows, ncols]);

  for (let i = 0; i < Math.min(nrows, ncols); i++) {
    matrix[i][i] = 1;
  }

  return matrix;
}
