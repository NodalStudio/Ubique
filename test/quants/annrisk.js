import assert from 'assert';
import { annrisk } from '../../lib/quants/annrisk.js';

// Example 1: Annualized risk for a single asset
const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
assert.strictEqual(annrisk(x, 12), 0.08047276972160623);

// Example 3: Throws error for invalid input
assert.throws(() => annrisk(123), /Input must be an array or matrix/);
assert.throws(() => annrisk('invalid'), /Input must be an array or matrix/);
