import type { array } from "../types.d.ts";
import {
  abs,
  isarray,
  ismatrix,
  isnumber,
  max,
  minus,
  power,
  sqrt,
  sum,
} from "../../index.ts";

/**
 * @function pdist
 * @summary Pairwise distance between two sets of observations
 * @description Computes various distance metrics between two arrays including
 * Euclidean, Manhattan, Chebyshev, and Hamming distances.
 *
 * @param x First input array
 * @param y Second input array
 * @param mode Distance method ('euclidean', 'manhattan', 'chebychev', 'hamming'). Default is 'euclidean'
 * @returns Distance value
 * @throws {Error} When arrays have different lengths or invalid method specified
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Euclidean distance
 * assertEquals(pdist([0, 0], [3, 4], 'euclidean'), 5);
 *
 * // Example 2: Manhattan distance
 * assertEquals(pdist([1, 1], [4, 5], 'manhattan'), 7);
 *
 * // Example 3: Chebyshev distance
 * assertEquals(pdist([1, 2], [4, 6], 'chebychev'), 4);
 * ```
 */
export default function pdist(
  x: array,
  y: array,
  mode: "euclidean" | "manhattan" | "chebychev" | "hamming" = "euclidean",
): number {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }

  switch (mode) {
    case "euclidean":
      return sqrt(sum(power(minus(x, y), 2))) as number;

    case "manhattan":
      return sum(abs(minus(x, y))) as number;

    case "chebychev":
      return max(abs(minus(x, y))) as number;

    case "hamming":
      let distance = 0;
      for (let i = 0; i < x.length; i++) {
        if (x[i] !== y[i]) {
          distance++;
        }
      }
      return distance;

    default:
      throw new Error(
        "Invalid method. Must be 'euclidean', 'manhattan', 'chebychev', or 'hamming'",
      );
  }
}
