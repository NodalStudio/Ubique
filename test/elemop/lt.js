import assert from 'assert';
import lt from '../../lib/elemop/lt.js';

// Example 1: Comparison between two numbers
assert.strictEqual(lt(5, 5), false);

// Example 2: Comparison between a number and an array
assert.deepStrictEqual(lt(5, [5, 6, 3]), [false, true, false]);

// Example 3: Comparison between a number and a matrix
assert.deepStrictEqual(lt(5, [[5, 6], [3, 5]]), [[false, true], [false, false]]);

// Example 4: Comparison between an array and a number
assert.deepStrictEqual(lt([5, 6, 3], 5), [false, false, true]);

// Example 5: Comparison between a matrix and a number
assert.deepStrictEqual(lt([[5, 6], [3, 5]], 5), [[false, false], [true, false]]);

// Example 6: Comparison between two arrays
assert.deepStrictEqual(lt([5, 6, 3], [2, 6, 0]), [false, false, false]);

// Example 7: Comparison between two matrices
assert.deepStrictEqual(lt([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [true, true]]);
