import assert from 'assert';
import trues from '../../lib/matarrs/trues.js';

// Example 1: Create an empty array
assert.deepStrictEqual(trues(0), []);

// Example 2: Create a 1x1 matrix of `true`
assert.deepStrictEqual(trues(1), [[true]]);

// Example 3: Create a 2x2 matrix of `true`
assert.deepStrictEqual(trues(2), [[true, true], [true, true]]);

// Example 4: Create a 2x1 matrix of `true`
assert.deepStrictEqual(trues([2,1]), [[true], [true]]);

// Example 5: Create a 2x3 matrix of `true`
assert.deepStrictEqual(trues(2,3), [[true, true, true], [true, true, true]]);

// Example 6: Invalid input (no arguments)
assert.throws(() => trues(), /Invalid dimensions/);
