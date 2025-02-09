import assert from 'assert';
import nrows from '../../lib/matarrs/nrows.js';

// Example 1: Row vector (1D array)
assert.strictEqual(nrows([5, 6, 7]), 1);

// Example 2: Matrix with multiple rows (2D array)
assert.strictEqual(nrows([[3, 2, 7], [4, 5, 6]]), 2);
