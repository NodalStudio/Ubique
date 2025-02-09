import assert from 'assert';
import rand from '../../lib/matarrs/rand.js';

// Example 1: Single random number
assert.strictEqual(typeof rand(), 'number');

// Example 2: Empty matrix
assert.deepStrictEqual(rand(0), []);

// Example 3: 1x1 matrix
const result1x1 = rand(1);
assert.strictEqual(result1x1.length, 1);
assert.strictEqual(result1x1[0].length, 1);

// Example 4: 2x2 matrix
const result2x2 = rand(2);
assert.strictEqual(result2x2.length, 2);
assert.strictEqual(result2x2[0].length, 2);

// Example 5: 2x1 matrix
const result2x1 = rand([2, 1]);
assert.strictEqual(result2x1.length, 2);
assert.strictEqual(result2x1[0].length, 1);

// Example 6: 1x2 matrix
const result1x2 = rand(1, 2);
assert.strictEqual(result1x2.length, 1);
assert.strictEqual(result1x2[0].length, 2);
