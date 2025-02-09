import assert from 'assert';
import unique from '../../lib/elemop/unique.js';

// Example 1: Unique values from an array
assert.deepStrictEqual(unique([9, -3, 2, -12, 0, 1, 0, 1, 2, 3, 4, 5]), [-12, -3, 0, 1, 2, 3, 4, 5, 9]);

// Example 2: Unique values and their indices
assert.deepStrictEqual(unique([9, -3, 2, -12, 0, 1, 0, 1, 2, 3, 4, 5], 1), [[-12, -3, 0, 1, 2, 3, 4, 5, 9], [3, 1, 4, 5, 2, 9, 10, 11, 0]]);

// Example 3: Unique values from a matrix
assert.deepStrictEqual(unique([[5, 4], [5, 3], [6, 3]]), [3, 4, 5, 6]);

// Example 4: Unique values and indices from a matrix
assert.deepStrictEqual(unique([[5, 4], [5, 3], [6, 3]], 1), [[3, 4, 5, 6], [3, 1, 0, 4]]);
