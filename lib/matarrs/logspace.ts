import type { array } from "../types.d.ts";
import linspace from "./linspace.ts";

/**
 * Create logarithmically spaced arrays.
 *
 * Generates an array of logarithmically spaced points between 10^a and 10^b (inclusive).
 * If the number of points `n` is not provided, it defaults to 10.
 *
 * @param a The lower bound (exponent)
 * @param b The upper bound (exponent)
 * @param n The number of points to generate
 * @returns An array of logarithmically spaced points
 * @throws If fewer than two arguments are provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Logarithmically spaced points from 10^0 to 10^1 with 5 points
 * assertEquals(
 *   logspace(0, 1, 5),
 *   [1, 1.7782794100389228, 3.1622776601683795, 5.623413251903491, 10]
 * );
 *
 * // Example 2: Default 10 points from 10^0 to 10^2
 * assertEquals(
 *   logspace(0, 2),
 *   [
 *     1, 1.6681005372000588, 2.7825594022071245, 4.641588833612778,
 *     7.742636826811269, 12.91549665014884, 21.544346900318832, 35.93813663804626,
 *     59.94842503189409, 100,
 *   ]
 * );
 *
 * // Example 3: Single point (start and end are the same)
 * assertEquals(logspace(1, 1, 1), [10]);
 *
 * // Example 4: Logarithmically spaced points from 10^-1 to 10^1
 * assertEquals(logspace(-1, 1, 3), [0.1, 1, 10]);
 *
 * // Example 5: Logarithmically spaced points from 10^3 to 10^4 with 4 points
 * assertEquals(
 *   logspace(3, 4, 4),
 *   [1000, 2154.4346900318847, 4641.588833612777, 10000]
 * );
 * ```
 */
export default function logspace(a: number, b: number, n = 10): array {
  const linearPoints = linspace(a, b, n);
  return linearPoints.map((val: number) => Math.pow(10, val));
}
