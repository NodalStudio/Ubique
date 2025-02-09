import { array, matrix } from '../types';

/**
 * @function squeeze
 * @summary Removes singleton dimensions from arrays or matrices.
 * @description This function simplifies the shape of an array or matrix by removing singleton dimensions (dimensions of size 1).
 * If the input is a number or a string, it returns the input as-is, since they don't have dimensions to squeeze.
 *
 * @param The input to squeeze.
 * @returns The squeezed input with singleton dimensions removed.
 *
 * @throws Throws an error if no input is provided.
 *
 * @example
 * // Example 1: Squeeze deeply nested arrays
 * assert.deepStrictEqual(squeeze([[[[[8]]]]]), [[8]]);
 *
 * // Example 2: Squeeze nested arrays with multiple elements
 * assert.deepStrictEqual(squeeze([[[[3, 4, 5]]]]), [[3, 4, 5]]);
 *
 * // Example 3: Squeeze nested arrays with 2D content
 * assert.deepStrictEqual(squeeze([[[[[['31-12-2014', '31-01-2015'], ['15-02-2015', '01-03-2015']]]]]]), [
 *   ['31-12-2014', '31-01-2015'],
 *   ['15-02-2015', '01-03-2015']
 * ]);
 *
 * // Example 4: Input is a number (no squeezing needed)
 * assert.strictEqual(squeeze(42), 42);
 *
 * // Example 5: Input is a string (no squeezing needed)
 * assert.strictEqual(squeeze("hello"), "hello");
 *
 * // Example 6: Throw an error for no input arguments
 * assert.throws(() => { squeeze(); }, Error, 'Not enough input arguments');
 */
export function squeeze(x: any): string|number|array<string|number>|matrix<string|number>
