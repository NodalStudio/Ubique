import assert from 'assert';
import fliplr from '../../lib/matarrs/fliplr.js';

// Example 1: Flip a 2D matrix left to right
assert.deepStrictEqual(fliplr([[1, 4], [2, 5], [3, 6]]), [[4, 1], [5, 2], [6, 3]]);

// Example 2: Flip a 1D array (no change)
assert.deepStrictEqual(fliplr([1, 2, 3]), [1, 2, 3]);
