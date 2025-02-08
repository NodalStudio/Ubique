import assert from 'assert';
import { adjsharpe } from '../../lib/quants/adjsharpe.js';

// Example 1: Adjusted Sharpe Ratio for a single asset
const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
assert.strictEqual(adjsharpe(x, 0.02 / 12), 0.7481337144481773);

// Example 2: Throws error for invalid input
assert.throws(() => adjsharpe(123), /Input must be an array or matrix/);
assert.throws(() => adjsharpe('invalid'), /Input must be an array or matrix/);
