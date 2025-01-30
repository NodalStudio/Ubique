import assert from 'assert';
import { sqrt } from '../../lib/elmath/sqrt.js';

// Example 1: Square root of a single number
assert.strictEqual(sqrt(6), 2.449489742783178);

// Example 2: Square root of an array of numbers
assert.deepStrictEqual(sqrt([5, 6, 3]), [2.23606797749979, 2.449489742783178, 1.7320508075688772]);

// Example 3: Square root of a matrix of numbers
assert.deepStrictEqual(sqrt([[5, 6, 5], [7, 8, 2]]), [[2.23606797749979, 2.449489742783178, 2.23606797749979],
  [2.6457513110645907, 2.8284271247461903, 1.4142135623730951]]);
