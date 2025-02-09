import assert from 'assert';
import exp from '../../lib/elmath/exp.js';

// Example 1: Exponential of a single number
assert.strictEqual(exp(6), 403.4287934927351);

// Example 2: Exponential of an array of numbers
assert.deepStrictEqual(exp([5, 6, 3]), [148.4131591025766, 403.4287934927351, 20.085536923187668]);

// Example 3: Exponential of a matrix of numbers
assert.deepStrictEqual(exp([[5, 6, 5], [7, 8, -1]]), [
  [148.4131591025766, 403.4287934927351, 148.4131591025766],
  [1096.6331584284585, 2980.9579870417283, 0.36787944117144233]
]);
