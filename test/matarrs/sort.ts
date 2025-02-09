// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import sort from "../../lib/matarrs/sort.js";

// Example 1: Sort an array in ascending order
assert.deepStrictEqual(sort([0, 5, -1, 3, -4, 9, 0], "ascend"), [
  -4,
  -1,
  0,
  0,
  3,
  5,
  9,
]);

// Example 2: Sort an array in descending order
assert.deepStrictEqual(sort([0, 5, -1, 3, -4, 9, 0], "descend"), [
  9,
  5,
  3,
  0,
  0,
  -1,
  -4,
]);

// Example 3: Sort rows in descending order
assert.deepStrictEqual(sort([[-1, 3, -1], [4, 5, 9]], "descend", 1), [
  [4, 5, 9],
  [-1, 3, -1],
]);

// Example 4: Sort columns in ascending order
assert.deepStrictEqual(sort([[-1, 3, -1], [4, 5, 9]], "ascend", 0), [
  [-1, -1, 3],
  [4, 5, 9],
]);

// Example 5: Invalid sorting mode
assert.throws(
  () => sort([1, 2, 3], "wrong"),
  /sorting must be "ascend" or "descend"/,
);

// Example 6: Invalid matrix input
assert.throws(() => sort({}), /Input must be a number, an array or matrix./);
