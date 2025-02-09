import assert from 'assert';
import log from '../../lib/elmath/log.js';

// Example 1: Natural logarithm of a single number
assert.strictEqual(log(6), 1.791759469228055);

// Example 2: Natural logarithm of an array of numbers
assert.deepStrictEqual(log([5, 6, 3]), [1.6094379124341003, 1.791759469228055, 1.0986122886681096]);

// Example 3: Natural logarithm of a matrix of numbers
assert.deepStrictEqual(log([[5, 6, 5], [7, 8, 2]]), [
  [1.6094379124341003, 1.791759469228055, 1.6094379124341003],
  [1.9459101490553132, 2.0794415416798357, 0.6931471805599453]
]);
