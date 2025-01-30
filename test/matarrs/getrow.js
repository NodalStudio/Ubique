import assert from 'assert';
import { getrow } from '../../lib/matarrs/getrow.js';

// Example 1: Get the first row
assert.deepStrictEqual(getrow([[5, 6, 5], [7, 8, -1]], 0), [5, 6, 5]);

// Example 2: Get the second row
assert.deepStrictEqual(getrow([[5, 6, 5], [7, 8, -1]], 1), [7, 8, -1]);

// Example 3: Invalid row index (out of bounds)
assert.throws(() => { getrow([[5, 6, 5], [7, 8, -1]], 2); }, Error, 'Row index must be an integer between 0 and N - 1 rows');

// Example 4: Invalid input (not a matrix)
assert.throws(() => { getrow([5, 6, 7], 1); }, Error, 'Input must be a matrix (2D array)');
