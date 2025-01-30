/**
 * @function isfunction
 * @summary Checks if the input is a function.
 * @description Returns `true` if the input is of type `function`.
 *
 * @param {any} x The input to check.
 * @returns {boolean} Returns `true` if `x` is a function.
 *
 * @throws {Error} Throws an error if no argument is provided.
 *
 * @example
 * // Example 1: Inline function
 * assert.strictEqual(isfunction(function(a) { return console.log(a); }), true, 'Inline function should return true');
 *
 * // Example 2: Built-in function
 * assert.strictEqual(isfunction(Math.log), true, 'Built-in function should return true');
 *
 * // Example 3: Not a function (number)
 * assert.strictEqual(isfunction(42), false, 'Number should return false');
 *
 * // Example 4: Not a function (string)
 * assert.strictEqual(isfunction("hello"), false, 'String should return false');
 */
export function isfunction(x) {
  if (arguments.length === 0) {
    throw new Error('not enough input arguments');
  }
  return typeof x === 'function';
}
