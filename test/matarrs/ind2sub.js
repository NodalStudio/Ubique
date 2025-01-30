import assert from 'assert';
import { ind2sub } from '../../lib/matarrs/ind2sub.js';

// Example 1: Convert linear index 5 to subscripts in a 2x3 matrix
assert.deepStrictEqual(ind2sub([2, 3], 5), [1, 2]);

// Example 2: Convert multiple linear indices to subscripts
assert.deepStrictEqual(ind2sub([2, 3], [0, 1, 2]), [[0, 0], [1, 0], [0, 1]]);

// Example 3: Convert linear index to subscripts in a vector
assert.deepStrictEqual(ind2sub([3, 1], 2), [2, 0]);

// Example 4: Invalid input (no arguments)
assert.throws(() => { ind2sub(); }, Error, 'not enough input arguments');

// Example 5: Invalid size argument (non-array)
assert.throws(() => { ind2sub(5, 1); }, Error, 'size must be an array representing the dimensions');
