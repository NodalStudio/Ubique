import type { array, matrix } from "../types.d.ts";
import { isarray, ismatrix } from "../../index.ts";

/**
 * Applies a function to each element of a array or matrix.
 *
 * This function applies the provided function to each element of a array or matrix.
 * The first argument is the input array or matrix, the second is the function to apply, followed by any additional parameters required by the function.
 *
 * @param x The input array, matrix, or single value to which the function will be applied.
 * @param fun The function to apply to each element of `x`.
 * @param  [funArgs] Additional arguments to pass to the function `fun` after the current element.
 * @returns The result of applying the function to each element of the input. Returns a array, matrix, or single value based on input.
 *
 * @throws If the input arguments are not valid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { sign, strfind } from "../../index.ts";
 *
 * // Example 1: Apply Math.log to each element of an array
 * assertEquals(arrayfun([1.4, 2.3, 3], Math.log), [0.33647223662121284, 0.832909122935104, 1.0986122886681096]);
 *
 * // Example 2: Apply a custom sign function to an array
 * assertEquals(arrayfun([1.4, 0, -10], sign), [1, 0, -1]);
 *
 * // Example 3: Apply Math.pow to each element of a matrix
 * assertEquals(arrayfun([[5, 6], [1, 3]], Math.pow, 3), [[125, 216], [1, 27]]);
 *
 * // Example 4: Find substring 'cat' in each element of a nested string array
 * assertEquals(
 *   arrayfun(
 *    [
 *      ["cat", "concat"],
 *      ["cattle", "catch the catfish"]
 *    ],
 *    strfind,
 *    "cat"
 *  ),
 *  [
 *    [[0], [3]],
 *    [[0], [0, 10]]
 *  ]
 * );
 * ```
 */
export default function arrayfun<T, A extends unknown[], U>(
  x: matrix<T>,
  fun: (element: T, ...args: A) => U,
  ...funArgs: A
): matrix<U>;
export default function arrayfun<T, A extends unknown[], U>(
  x: array<T>,
  fun: (element: T, ...args: A) => U,
  ...funArgs: A
): array<U>;
export default function arrayfun<T, A extends unknown[], U>(
  x: T,
  fun: (element: T, ...args: A) => U,
  ...funArgs: A
): U;
export default function arrayfun<T, A extends unknown[], U>(
  x: T | array<T> | matrix<T>,
  fun: (element: T, ...args: A) => U,
  ...funArgs: A
): U | array<U> | matrix<U>;

export default function arrayfun<T, A extends unknown[], U>(
  x: matrix<T> | array<T> | T,
  fun: (element: T, ...args: A) => U,
  ...funArgs: A
): matrix<U> | array<U> | U {
  if (ismatrix(x)) {
    return (x as matrix<T>).map((row) =>
      row.map((element) => fun(element, ...funArgs))
    ) as matrix<U>;
  }

  if (isarray(x)) {
    return (x as array<T>).map((element) => fun(element, ...funArgs)) as array<
      U
    >;
  }

  return fun(x as T, ...funArgs);
}
