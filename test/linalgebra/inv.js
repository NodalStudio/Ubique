import assert from 'assert';
import inv from '../../lib/linalgebra/inv.js';

// Example 1: Inverse of a 2x2 matrix
assert.deepStrictEqual(inv([[3, 2], [5, 2]]), [[-0.5, 0.5], [1.25, -0.7499999999999999]]);
// Example 2: Inverse of a 3x3 matrix
assert.deepStrictEqual(inv([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), [
  [0.846153846153846, 0.3076923076923077, -0.07692307692307707],
  [-0.3846153846153846, -0.23076923076923078, 0.30769230769230776],
  [-0.5384615384615384, 0.07692307692307691, 0.23076923076923078]
]);
// Example 3: Inverse of a number
assert.strictEqual(inv(4), 0.25);
// Example 4: Error when input is not square matrix
assert.throws(() => inv([[1, 2]]), Error, 'matrix must be square');
// Example 5: Error when no arguments are provided
assert.throws(() => inv(), Error, 'not enough input arguments');
