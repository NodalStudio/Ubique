import assert from 'assert';
import { subsetlin } from '../../lib/matarrs/subsetlin.js';

// Test dataset
const a = [[5,6,5],[7,8,-1]];
const c = [5,6,3];

// Example 1: Extract a single element
assert.deepStrictEqual(subsetlin(a, 1), [6]);

// Example 2: Subset by rows
assert.deepStrictEqual(subsetlin(a, [0,1,2,3]), [5, 6, 5, 7]);

// Example 3: Subset by columns
assert.deepStrictEqual(subsetlin(a, [0,1,2,3], 1), [5, 7, 6, 8]);

// Example 4: Extract a 2D subset (column-wise)
assert.deepStrictEqual(subsetlin(a, [[0,1,2], [2,3,4]], 1), [[5, 7, 6], [6, 8, 5]]);

// Example 5: Subset a vector
assert.deepStrictEqual(subsetlin(c, [0,1]), [5, 6]);

// Example 6: Extract a 2D subset from a vector
assert.deepStrictEqual(subsetlin(c, [[0,1], [1,2]]), [[5, 6], [6, 3]]);
