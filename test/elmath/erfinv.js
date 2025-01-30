import assert from 'assert';
import { erfinv } from '../../lib/elmath/erfinv.js';

// Example 1: Compute the inverse error function for a positive value
assert.strictEqual(erfinv(0.1), 0.08885596505119556);

// Example 2: Compute the inverse error function for a negative value
assert.strictEqual(erfinv(-0.5), -0.47693623612190483);

// Example 3: Compute the inverse error function for 0 (should return 0)
assert.strictEqual(erfinv(0), 0);

// Example 4: Compute the inverse error function for 1 (should return positive infinity)
assert.strictEqual(erfinv(1), Infinity);

// Example 5: Compute the inverse error function for -1 (should return negative infinity)
assert.strictEqual(erfinv(-1), -Infinity);
