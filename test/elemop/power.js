import assert from 'assert';
import { power } from '../../lib/elemop/power.js';

// Example 1: Power of two numbers
assert.strictEqual(power(5, 4), 625);

// Example 2: Power of an array by a scalar
assert.deepStrictEqual(power([5, 6, 3], 5), [3125, 7776, 243]);

// Example 3: Scalar raised to the power of an array
assert.deepStrictEqual(power(5, [5, 6, 3]), [3125, 15625, 125]);

// Example 4: Element-wise power of two arrays
assert.deepStrictEqual(power([5, 6, 3], [0.5, -3, 2.3]), [2.23606797749979, 0.004629629629629629, 12.513502532843182]);

// Example 5: Power of two matrices
const a = [[5, 6, 5], [7, 8, -1]];
const b = [[-1, 3, -1], [4, 5, 9]];
assert.deepStrictEqual(power(a, b), [[0.2, 216, 0.2], [2401, 32768, -1]]);

// Example 6: Scalar raised to the power of a matrix
assert.deepStrictEqual(power(5, a), [[3125, 15625, 3125], [78125, 390625, 0.2]]);
