import assert from 'assert';
import end from '../../lib/matarrs/end.js';

// Example 1: Last index of a vector
assert.strictEqual(end([5, 6, 3]), 2);

// Example 2: Last indices of a matrix
assert.deepStrictEqual(end([[4, 5, 0], [-1, 2, -3]]), [1, 2]);

// Example 3: Last row index of a matrix
assert.strictEqual(end([[4, 5, 0], [-1, 2, -3]], 0), 1);

// Example 4: Last column index of a matrix
assert.strictEqual(end([[4, 5, 0], [-1, 2, -3]], 1), 2);

// Example 5: Last index of a number (returns the number itself)
assert.strictEqual(end(5), 5);
