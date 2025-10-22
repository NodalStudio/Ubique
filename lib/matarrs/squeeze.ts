import isnumber from "../datatype/isnumber.ts";
import isstring from "../datatype/isstring.ts";
import size from "./size.ts";

/**
 * Removes singleton dimensions from arrays or matrices.
 *
 * This function simplifies the shape of an array or matrix by removing singleton dimensions (dimensions of size 1).
 * If the input is a number or a string, it returns the input as-is, since they don't have dimensions to squeeze.
 *
 * @param x The input to squeeze
 * @returns The squeezed input with singleton dimensions removed
 *
 * @example Squeeze deeply nested arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(squeeze([[[[[8]]]]]), [[8]]);
 *
 * ```
 *
 * @example Squeeze nested arrays with multiple elements
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(squeeze([[[[3, 4, 5]]]]), [[3, 4, 5]]);
 *
 * ```
 *
 * @example Squeeze nested arrays with 2D content
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(squeeze([[[[[['31-12-2014', '31-01-2015'], ['15-02-2015', '01-03-2015']]]]]]), [
 *   ['31-12-2014', '31-01-2015'],
 *   ['15-02-2015', '01-03-2015']
 * ]);
 *
 * ```
 *
 * @example Input is a number (no squeezing needed)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(squeeze(42), 42);
 *
 * ```
 *
 * @example Input is a string (no squeezing needed)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(squeeze("hello"), "hello");
 * ```
 */
type NestedArray<T> = T | NestedArray<T>[];

export default function squeeze<T>(x: NestedArray<T>): NestedArray<T> {
  if (isnumber(x) || isstring(x)) {
    return x as NestedArray<T>;
  }
  return squeezeRec(x) as NestedArray<T>;
}

function squeezeRec(node: unknown): unknown {
  if (!Array.isArray(node)) {
    return node;
  }
  const _size = size(node);
  if (_size.length <= 2) {
    return node;
  }
  return squeezeRec(node[0]);
}
