import assert from 'assert';
import { colon } from '../../lib/matarrs/colon.js';

// Example 1: Generate array from 1 to 10 with step 1
assert.deepStrictEqual(colon(1, 10, 1), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// Example 2: Generate array from 10 to 1 with step 1 (should return empty array)
assert.deepStrictEqual(colon(10, 1, 1), []);

// Example 3: Generate array from -5 to 5 with step 2
assert.deepStrictEqual(colon(-5, 5, 2), [-5, -3, -1, 1, 3, 5]);

// Example 4: Generate array from -7 to 14 with step 2
assert.deepStrictEqual(colon(-7, 14, 2), [-7, -5, -3, -1, 1, 3, 5, 7, 9, 11, 13]);

// Example 5: Handle default step value (should generate array from 1 to 10)
assert.deepStrictEqual(colon(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// Example 6: Handle negative step value
assert.deepStrictEqual(colon(10, 1, -2), [10, 8, 6, 4, 2]);
