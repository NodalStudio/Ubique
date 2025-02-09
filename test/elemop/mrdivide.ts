import assert from 'assert';
import mrdivide from '../../lib/elemop/mrdivide.js';

// Example 1: Divide two numbers
assert.strictEqual(mrdivide(5, 6), 0.8333333333333334);

// Example 2: Divide an array by a scalar
assert.deepStrictEqual(mrdivide([5, 6, 3], 6), [0.8333333333333334, 1, 0.5]);

// Example 3: Divide a matrix by a scalar
assert.deepStrictEqual(mrdivide([[9, 5], [6, 1]], 5), [[1.8, 1], [1.2, 0.2]]);

// Example 4: Matrix division where the second argument is a square matrix
assert.deepStrictEqual(mrdivide([[9, 5], [6, 1]], [[3, 2], [5, 2]]), [[1.75, 0.7500000000000004], [-1.75, 2.25]]);

// Example 5: Matrix division with two matrices
assert.deepStrictEqual(mrdivide([[5, 6, 5], [7, 8, -1]], [[1, 1, -1], [1, -2, 3], [2, 3, 1]]),
  [[-0.7692307692307696, 0.5384615384615385, 2.615384615384615], [3.384615384615384, 0.230769230769231, 1.6923076923076918]]);
