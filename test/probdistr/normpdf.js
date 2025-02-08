import assert from 'assert';
import { normpdf } from '../../lib/probdistr/normpdf.js';

// Example 1: Compute the standard normal PDF at x = 1
assert.strictEqual(normpdf(1), 0.24197072451914337);

// Example 2: Compute normal PDF with custom mean and standard deviation
assert.strictEqual(normpdf(0, 10, 2), 7.433597573671488e-7);

// Example 3: Compute normal PDF at the mean (should be maximum)
assert.strictEqual(normpdf(5, 5, 1), 0.3989422804014327);

// Example 4: Compute normal PDF for a large value (should be small)
assert.strictEqual(normpdf(100, 50, 10), 1.486719514734298e-7);

// Example 5: Compute normal PDF for a negative value
assert.strictEqual(normpdf(-1, 0, 1), 0.24197072451914337);

// Example 6: Compute normal PDF for a dataset with a wider spread
assert.strictEqual(normpdf(25, 20, 5), 0.04839414490382868);

// Example 7: Compute normal PDF for a very small standard deviation (should be high)
assert.strictEqual(normpdf(1, 1, 0.1), 3.989422804014327);

// Example 8: Compute normal PDF for a very large standard deviation (should be low)
assert.strictEqual(normpdf(1, 1, 100), 0.003989422804014327);

// Example 9: Edge case: Standard deviation 0 (should throw an error)
assert.throws(() => normpdf(2, 0, 0), /Standard deviation must be a positive number/);

// Example 10: Edge case: Negative standard deviation (should throw an error)
assert.throws(() => normpdf(2, 0, -1), /Standard deviation must be a positive number/);
