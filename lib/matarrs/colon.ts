import type { array } from "../types.d.ts";

/**
 * Generates an array of numbers from start to end with a specified step.
 *
 * Creates an array of numbers starting from `start`, ending at `end`, and incrementing by `step`. If `step` is not provided, it defaults to 1.
 *
 * @param start The starting value of the array.
 * @param end The ending value of the array.
 * @param step The step value between elements. Defaults to 1.
 * @returns An array of numbers from `start` to `end` with a step of `step`.
 * @throws If fewer than two arguments are provided.
 *
 * @example Generate array from 1 to 10 with step 1
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(colon(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
 *
 * ```
 *
 * @example Generate array from 10 to 1 with step 1 (should return empty array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(colon(10, 1, 1), []);
 *
 * ```
 *
 * @example Generate array from -5 to 5 with step 2
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(colon(-5, 5, 2), [-5, -3, -1, 1, 3, 5]);
 *
 * ```
 *
 * @example Generate array from -7 to 14 with step 2
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(colon(-7, 14, 2), [-7, -5, -3, -1, 1, 3, 5, 7, 9, 11, 13]);
 *
 * ```
 */
export default function colon(start: number, end: number, step = 1): array {
  if (step === 0 || (step > 0 && start > end) || (step < 0 && start < end)) {
    return [];
  }

  const result = [];
  for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
    result.push(i);
  }

  return result;
}
