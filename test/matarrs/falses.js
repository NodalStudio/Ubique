import assert from 'assert';
import { falses } from '../../lib/matarrs/falses.js';

// Example 1: Create an empty array (0x0 matrix)
assert.deepStrictEqual(falses(0), []);

// Example 2: Create a 1x1 matrix of `false`
assert.deepStrictEqual(falses(1), [[false]]);

// Example 3: Create a 2x2 matrix of `false`
assert.deepStrictEqual(falses(2), [[false, false], [false, false]]);

// Example 4: Create a 2x1 matrix of `false`
assert.deepStrictEqual(falses([2, 1]), [[false], [false]]);

// Example 5: Create a 2x3 matrix of `false`
assert.deepStrictEqual(falses(2, 3), [[false, false, false], [false, false, false]]);
