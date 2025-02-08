import assert from 'assert';
import { std } from '../../lib/statistics/std.js';

// Example 1: Standard deviation of a 1D array (sample)
const c = [5, 6, 3];
assert.strictEqual(std(c), 1.52753);

// Example 2: Standard deviation of a 1D array (population)
assert.strictEqual(std(c, 0), 1.24722);

// Example 3: Standard deviation of a 2D matrix (row-wise, population)
const a = [[5, 6, 5], [7, 8, -1]];
assert.deepStrictEqual(std(a, 0), [[0.471405], [4.027682]]);

// Example 4: Standard deviation of a 2D matrix (column-wise, population)
assert.deepStrictEqual(std(a, 0, 1), [[1, 1, 3]]);

// Example 5: Throws error for invalid input
assert.throws(() => std(123), /Input must be an array or matrix/);
assert.throws(() => std('invalid'), /Input must be an array or matrix/);
