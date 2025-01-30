import assert from 'assert';
import { find } from '../../lib/matarrs/find.js';

// Example 1: Find indices of true elements in a 1D array
assert.deepStrictEqual(find([0.3, -0.4, 0.5, 0.9].map(a => a > 0)), [0, 2, 3]);

// Example 2: Find indices of true elements in a 2D matrix
assert.deepStrictEqual(find([[true, true], [false, true]]), [0, 1, 3]);

// Example 3: Empty input
assert.deepStrictEqual(find([]), []);

// Example 4: No true elements
assert.deepStrictEqual(find([false, false, false]), []);

// Example 5: All true elements
assert.deepStrictEqual(find([true, true, true]), [0, 1, 2]);
