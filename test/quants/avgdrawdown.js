import assert from 'assert';
import avgdrawdown from '../../lib/quants/avgdrawdown.js';

// Example 1: Average drawdown for a single asset
const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
assert.strictEqual(avgdrawdown(x), 0.007299999999999999);

// Example 2: 1-largest drawdown
assert.strictEqual(avgdrawdown(x, 1), 0.014);

// Example 3: Throws error for invalid input
assert.throws(() => avgdrawdown(123), /Input must be an array or matrix/);
assert.throws(() => avgdrawdown('invalid'), /Input must be an array or matrix/);
