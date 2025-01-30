import assert from 'assert';
import { isstring } from '../../lib/datatype/isstring.js';

// Example 1: Input is a string
assert.strictEqual(isstring('test'), true);

// Example 2: Input is a number
assert.strictEqual(isstring(123), false);

// Example 3: Input is an object
assert.strictEqual(isstring({ key: 'value' }), false);

// Example 4: No input provided
try {
  isstring();
} catch (error) {
  assert.strictEqual(error.message, 'not enough input arguments');
}
