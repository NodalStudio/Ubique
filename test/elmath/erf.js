import assert from 'assert';
import erf from '../../lib/elmath/erf.js';

// Example 1: Compute the error function for a single value
assert.strictEqual(erf(0.5), 0.5204999077232426);

// Example 2: Compute the error function for a negative value
assert.strictEqual(erf(-1), -0.8427007877600068);

// Example 3: Compute the error function for zero
assert.strictEqual(erf(0), 0);

// Example 4: Compute the error function for a large positive value
assert.strictEqual(erf(2), 0.995322265010666);

// Example 5: Compute the error function for a large negative value
assert.strictEqual(erf(-2), -0.9953222650106659);
