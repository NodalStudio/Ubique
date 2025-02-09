import assert from 'assert';
import minus from '../../lib/elemop/minus.js';

// Example 1: Subtract two numbers
assert.strictEqual(minus(5, 6), -1);

// Example 2: Subtract two arrays
assert.deepStrictEqual(minus([5, 6, 4], [3, -1, 0]), [2, 7, 4]);

// Example 3: Subtract a number from an array
assert.deepStrictEqual(minus([5, 6, 4], 10), [-5, -4, -6]);

// Example 4: Subtract two matrices
assert.deepStrictEqual(minus([[5, 6, 5], [7, 8, -1]], [[-1, 3, -1], [4, 5, 9]]),
  [[6, 3, 6], [3, 3, -10]]);
