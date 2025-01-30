import assert from 'assert';
import { randchar } from '../../lib/datatype/randchar.js';

// Example 1: Generate a random string of 12 characters from a custom set
const result1 = randchar(12, 'ABCD!-|/%&$1234567890');
assert.strictEqual(result1.length, 12);
assert.ok(/^[ABCD!\-|/%&$1234567890]+$/.test(result1));

// Example 2: Generate a random string of 16 characters from a different custom set
const result2 = randchar(16, 'ABCDEFGHILMNOPQRSTUVZ-1234567890');
assert.strictEqual(result2.length, 16);
assert.ok(/^[ABCDEFGHILMNOPQRSTUVZ\-1234567890]+$/.test(result2));

// Example 3: Generate a random string of 8 characters using the default set
const result3 = randchar(8);
assert.strictEqual(result3.length, 8);
assert.ok(/^[A-Za-z0-9]+$/.test(result3));
