import assert from 'assert';
import norminv from '../../lib/probdistr/norminv.js';

// Example 1: Compute the inverse CDF for standard normal distribution
assert.strictEqual(norminv(0.05), -1.6448536127562647);

// Example 2: Compute inverse CDF with custom mean and standard deviation
assert.strictEqual(norminv(0.01, 10, 2), 5.347304312449656);

// Example 3: Compute inverse CDF at median (should return mean)
assert.strictEqual(norminv(0.5, 5, 1), 5);

// Example 4: Compute inverse CDF for a high probability (should be positive)
assert.strictEqual(norminv(0.975, 0, 1), 1.9599639471668915);

// Example 5: Compute inverse CDF for a low probability (should be negative)
assert.strictEqual(norminv(0.025, 0, 1), -1.9599639471668922);

// Example 6: Compute inverse CDF for a different mean and standard deviation
assert.strictEqual(norminv(0.99, 100, 15), 134.89521765662758);

// Example 7: Compute inverse CDF at an extremely small probability (should be very negative)
assert.strictEqual(norminv(0.0001, 0, 1), -3.7190165078119177);

// Example 8: Compute inverse CDF at an extremely large probability (should be very positive)
assert.strictEqual(norminv(0.9999, 0, 1), 3.7190165078119457);

// Example 9: Edge case: Probability 0 (should throw an error)
assert.throws(() => norminv(0, 0, 1), /Probability value must be in the range \(0,1\)/);

// Example 10: Edge case: Probability 1 (should throw an error)
assert.throws(() => norminv(1, 0, 1), /Probability value must be in the range \(0,1\)/);

// Example 11: Edge case:
