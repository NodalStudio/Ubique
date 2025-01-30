import assert from 'assert';
import { isundefined } from '../../lib/datatype/isundefined.js';

// Example 1: Input is undefined
assert.strictEqual(isundefined(undefined), true);

// Example 2: Input is defined (null)
assert.strictEqual(isundefined(null), false);

// Example 3: Input is defined (string)
assert.strictEqual(isundefined('test'), false);

// Example 4: No input provided
try {
  isundefined();
} catch (error) {
  assert.strictEqual(error.message, 'not enough input arguments');
}
