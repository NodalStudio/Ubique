import assert from 'assert';
import moment from '../../lib/stats/moment.js';

// Example 1: Compute the third central moment of an array
assert.strictEqual(moment([0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039], 3), 0.000007);

// Example 2: Compute the first central moment (always zero)
assert.strictEqual(moment([0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039], 1), 0);

// Example 3: Compute the second central moment (variance) for a matrix along rows
assert.deepStrictEqual(moment([[0.003, 0.026], [0.015, -0.009]], 2), [[0.000265], [0.000144]]);

// Example 4: Compute the second central moment (variance) for a matrix along columns
assert.deepStrictEqual(moment([[0.003, 0.026], [0.015, -0.009]], 2, 1), [[0.000114, 0.000605]]);

// Example 5: Compute the fourth moment of a dataset
assert.strictEqual(moment([1, 2, 3, 4, 5], 4), 2);
