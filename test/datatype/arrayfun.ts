import { assertEquals } from "jsr:@std/assert";
import sign from "../elmath/sign.ts";
// Example 1: Apply Math.log to each element of an array
assertEquals(arrayfun([1.4, 2.3, 3], Math.log), [
  0.33647223662121284,
  0.832909122935104,
  1.0986122886681096,
]);

// Example 2: Apply Math.pow to each element of a matrix
assertEquals(arrayfun([[5, 6], [1, 3]], Math.pow, 3), [[125, 216], [1, 27]]);

// Example 3: Apply a custom sign function to an array
assertEquals(arrayfun([1.4, 0, -10], sign), [1, 0, -1]);
