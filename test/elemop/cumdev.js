import assert from 'assert';
import { cumdev } from '../../lib/elemop/cumdev.js';

// Example 1: Cumulative mean deviation of a 1D array
assert.deepStrictEqual(cumdev([-4, 8, 2]), [-6, 0, 0]);

// Example 2: Cumulative mean deviation of a matrix along rows (dim=0)
assert.deepStrictEqual(cumdev([[-6, 12, 6], [-4, 8, 2]], 0), [[-10, -2, 0], [-6, 0, 0]]);

// Example 3: Cumulative mean deviation of a matrix along columns (dim=1)
assert.deepStrictEqual(cumdev([[-1, 3, -1], [4, 5, 9]]), [[-2.5, -1, -5], [0, 0, 0]]);
