import assert from 'assert';
import { tomat } from '../../lib/matarrs/tomat.js';

// Example 1: Convert a number to a matrix
assert.deepStrictEqual(tomat(5), [[5]]);

// Example 2: Convert a boolean to a matrix
assert.deepStrictEqual(tomat(true), [[true]]);

// Example 3: Convert a row vector to a matrix
assert.deepStrictEqual(tomat([5, 6, 3]), [[5, 6, 3]]);

// Example 4: Convert an already formatted matrix
assert.deepStrictEqual(tomat([[1, 2], [3, 4]]), [[1, 2], [3, 4]]);

// Example 5: Invalid input (null)
assert.throws(() => tomat(null), /Invalid input argument./);
