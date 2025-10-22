import type { array, matrix } from "../types.d.ts";

/**
 * Creates an array filled with `true` values.
 *
 * Generates an array or matrix of all `true` values based on the input dimensions.
 *              Accepts one or two numeric arguments, or an array specifying the dimensions.
 *
 * @param args Variable input arguments (max 2).
 * @returns A matrix filled with `true` values.
 * @throws If no arguments are provided.
 *
 * @example Create an empty array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(0), []);
 *
 * ```
 *
 * @example Create a 1x1 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(1), [[true]]);
 *
 * ```
 *
 * @example Create a 2x2 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(2), [[true, true], [true, true]]);
 *
 * ```
 *
 * @example Create a 2x1 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues([2,1]), [[true], [true]]);
 *
 * ```
 *
 * @example Create a 2x3 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(2,3), [[true, true, true], [true, true, true]]);
 *
 * ```
 */
export default function trues(n: number): matrix<boolean>;
/**
 * Creates an array filled with `true` values.
 *
 * Generates an array or matrix of all `true` values based on the input dimensions.
 *              Accepts one or two numeric arguments, or an array specifying the dimensions.
 *
 * @param args Variable input arguments (max 2).
 * @returns A matrix filled with `true` values.
 * @throws If no arguments are provided.
 *
 * @example Create an empty array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(0), []);
 *
 * ```
 *
 * @example Create a 1x1 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(1), [[true]]);
 *
 * ```
 *
 * @example Create a 2x2 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(2), [[true, true], [true, true]]);
 *
 * ```
 *
 * @example Create a 2x1 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues([2,1]), [[true], [true]]);
 *
 * ```
 *
 * @example Create a 2x3 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(2,3), [[true, true, true], [true, true, true]]);
 *
 * ```
 */
export default function trues(dims: array): matrix<boolean>;
/**
 * Creates an array filled with `true` values.
 *
 * Generates an array or matrix of all `true` values based on the input dimensions.
 *              Accepts one or two numeric arguments, or an array specifying the dimensions.
 *
 * @param args Variable input arguments (max 2).
 * @returns A matrix filled with `true` values.
 * @throws If no arguments are provided.
 *
 * @example Create an empty array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(0), []);
 *
 * ```
 *
 * @example Create a 1x1 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(1), [[true]]);
 *
 * ```
 *
 * @example Create a 2x2 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(2), [[true, true], [true, true]]);
 *
 * ```
 *
 * @example Create a 2x1 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues([2,1]), [[true], [true]]);
 *
 * ```
 *
 * @example Create a 2x3 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(2,3), [[true, true, true], [true, true, true]]);
 *
 * ```
 */
export default function trues(nrows: number, ncols: number): matrix<boolean>;
/**
 * Creates an array filled with `true` values.
 *
 * Generates an array or matrix of all `true` values based on the input dimensions.
 *              Accepts one or two numeric arguments, or an array specifying the dimensions.
 *
 * @param args Variable input arguments (max 2).
 * @returns A matrix filled with `true` values.
 * @throws If no arguments are provided.
 *
 * @example Create an empty array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(0), []);
 *
 * ```
 *
 * @example Create a 1x1 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(1), [[true]]);
 *
 * ```
 *
 * @example Create a 2x2 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(2), [[true, true], [true, true]]);
 *
 * ```
 *
 * @example Create a 2x1 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues([2,1]), [[true], [true]]);
 *
 * ```
 *
 * @example Create a 2x3 matrix of `true`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(trues(2,3), [[true, true, true], [true, true, true]]);
 *
 * ```
 */
export default function trues(
  nrowsOrDims: unknown,
  ncols?: unknown,
): matrix<boolean> {
  let rows: number;
  let cols: number;

  if (arguments.length === 1) {
    if (Array.isArray(nrowsOrDims)) {
      [rows, cols] = nrowsOrDims as number[];
    } else {
      rows = nrowsOrDims as number;
      cols = rows;
    }
  } else {
    rows = nrowsOrDims as number;
    cols = ncols as number;
  }

  if (typeof rows !== "number" || typeof cols !== "number") {
    throw new Error("Invalid dimensions");
  }

  return Array.from(
    { length: rows },
    () => Array.from({ length: cols }, () => true),
  );
}
