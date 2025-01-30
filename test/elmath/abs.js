import assert from 'assert';
import { abs } from '../../lib/elmath/abs.js';

// Example 1: Compute the absolute value of a single number
assert.strictEqual(abs(-0.5), 0.5);

// Example 2: Compute the absolute value of an array of numbers
assert.deepStrictEqual(abs([0.1, -0.5]), [0.1, 0.5]);

// Example 3: Compute the absolute value of a matrix
assert.deepStrictEqual(abs([[5, -2], [-3, 4]]), [[5, 2], [3, 4]]);

// Example 4: Compute the absolute value of a positive number
assert.strictEqual(abs(3), 3);

// Example 5: Compute the absolute value of a mixed array
assert.deepStrictEqual(abs([-2, 4, -6, 7]), [2, 4, 6, 7]);

// Example 6: Compute the absolute value of an empty array
assert.deepStrictEqual(abs([]), []);
