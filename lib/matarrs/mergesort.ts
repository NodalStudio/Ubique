import colon from "./colon.ts";
import isarray from "../datatype/isarray.ts";
import type { array } from "../types.d.ts";

/**
 * Sort array in ascending or descending order.
 *
 * Mergesort is a divide-and-conquer algorithm that recursively splits an array into halves,
 * sorts each half, and then merges them back together in the desired order.
 * It returns the sorted values along with their original indexes.
 *
 * @param x Array of elements to sort.
 * @param mode Sorting direction: `"ascend"` (default) or `"descend"`.
 * @returns A 2D array: the first row contains sorted values, the second row contains the original indexes.
 * @throws If no arguments are provided or the mode is invalid.
 *
 * @example Sort an array in ascending order with indexes
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(mergesort([9, -3, 2, -12, 0, 1]), [
 *   [-12, -3, 0, 1, 2, 9],
 *   [3, 1, 4, 5, 2, 0],
 * ]);
 *
 * ```
 *
 * @example Sort an array in descending order with indexes
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(mergesort([9, -3, 2, -12, 0, 1], 'descend'), [
 *   [9, 2, 1, 0, -3, -12],
 *   [0, 2, 5, 4, 1, 3],
 * ]);
 *
 * ```
 *
 * @example Sort an array of length 1
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(mergesort([5]), [[5], [0]]);
 *
 * ```
 *
 * @example Invalid mode
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => mergesort([1, 2, 3], 'invalid'), "sorting must be \"ascend\" or \"descend\"");
 *
 * ```
 *
 * @example Empty array
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(mergesort([]), [[], []]);
 *
 * ```
 *
 * @example Array with repeated values
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(mergesort([3, 1, 3, 2, 3]), [
 *   [1, 2, 3, 3, 3],
 *   [1, 3, 0, 2, 4],
 * ]);
 *
 * ```
 */
export default function mergesort(
  x: array | [array, array],
  mode: string = "ascend",
): [array, array] {
  const sortingPair: [array, array] = isarray(x)
    ? [x as array, colon(0, (x as array).length - 1)]
    : x;

  const len = sortingPair[0].length;
  if (len < 2) {
    return sortingPair;
  }

  const cx = Math.floor(len / 2);
  const sx = sortingPair[0].slice(0, cx);
  const sxi = sortingPair[1].slice(0, cx);
  const dx = sortingPair[0].slice(cx);
  const dxi = sortingPair[1].slice(cx);
  const left: [array, array] = [sx, sxi];
  const right: [array, array] = [dx, dxi];

  const merge = (
    sxarr: [array, array],
    dxarr: [array, array],
    currentMode: string,
  ): [array, array] => {
    const sorted: array = [];
    const idx: array = [];

    const take = (pair: [array, array], context: string): void => {
      const value = pair[0].shift();
      const index = pair[1].shift();
      if (value === undefined || index === undefined) {
        throw new Error(`Unexpected empty ${context} during merge`);
      }
      sorted.push(value);
      idx.push(index);
    };

    const compare = (a: number, b: number): boolean => {
      if (currentMode === "ascend") {
        return a <= b;
      }
      if (currentMode === "descend") {
        return a >= b;
      }
      throw new Error('sorting must be "ascend" or "descend"');
    };

    while (sxarr[0].length && dxarr[0].length) {
      if (compare(sxarr[0][0], dxarr[0][0])) {
        take(sxarr, "left pair");
      } else {
        take(dxarr, "right pair");
      }
    }

    while (sxarr[0].length) {
      take(sxarr, "left remainder");
    }

    while (dxarr[0].length) {
      take(dxarr, "right remainder");
    }

    return [sorted, idx];
  };

  return merge(mergesort(left, mode), mergesort(right, mode), mode);
}
