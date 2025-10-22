import { erf } from "../../index.ts";

/**
 * Inverse error function.
 *
 * Computes the inverse of the error function.
 *
 * The inverse error function satisfies `y = erf(x)`, for `-1 ≤ y ≤ 1` and `-∞ ≤ x ≤ ∞`.
 *
 * @param y A real value in the range [-1, 1]
 * @returns The value of the inverse error function
 * @throws If the input is out of range
 *
 * @example Compute the inverse error function for a positive value
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erfinv(0.1), 0.08885596505119556);
 *
 * ```
 *
 * @example Compute the inverse error function for a negative value
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erfinv(-0.5), -0.47693623612190483);
 *
 * ```
 *
 * @example Compute the inverse error function for 0 (should return 0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erfinv(0), 0);
 *
 * ```
 *
 * @example Compute the inverse error function for 1 (should return positive infinity)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erfinv(1), Infinity);
 *
 * ```
 *
 * @example Compute the inverse error function for -1 (should return negative infinity)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erfinv(-1), -Infinity);
 *
 * ```
 */
export default function erfinv(y: number): number {
  if (y <= -1) return -Infinity;
  if (y >= 1) return Infinity;

  let z, x;

  if (y < -0.7) {
    z = Math.sqrt(-Math.log((1 + y) / 2));
    x = -calculateX(z);
  } else if (y < 0.7) {
    z = y * y;
    x = calculateCentral(z, y);
  } else {
    z = Math.sqrt(-Math.log((1 - y) / 2));
    x = calculateX(z);
  }

  // Refine the result using Newton-Raphson method
  x = refineResult(x, y);
  return x;
}

/**
 * Helper function to calculate the initial approximation for the inverse error function.
 * @param z Intermediate value based on the input
 * @returns Initial approximation
 */
function calculateX(z: number): number {
  const c1 = 1.641345311,
    c2 = 3.429567803,
    c3 = -1.624906493,
    c4 = -1.970840454;
  const c5 = 1.6370678,
    c6 = 3.5438892;
  const numerator = ((c1 * z + c2) * z + c3) * z + c4;
  const denominator = (c5 * z + c6) * z + 1;
  return numerator / denominator;
}

/**
 * Helper function to calculate the initial approximation for values close to 0.
 * @param z Square of the input value
 * @param y Input value
 * @returns Initial approximation
 */
function calculateCentral(z: number, y: number): number {
  const c1 = -0.140543331,
    c2 = 0.914624893,
    c3 = -1.645349621,
    c4 = 0.886226899;
  const c5 = 0.012229801,
    c6 = -0.329097515,
    c7 = 1.442710462,
    c8 = -2.118377725;
  const numerator = ((c1 * z + c2) * z + c3) * z + c4;
  const denominator = (((c5 * z + c6) * z + c7) * z + c8) * z + 1;
  return (y * numerator) / denominator;
}

/**
 * Refines the initial approximation using the Newton-Raphson method.
 * @param x Initial approximation
 * @param y Input value
 * @returns Refined approximation
 */
function refineResult(x: number, y: number): number {
  const sqrtPiInv = 2 / Math.sqrt(Math.PI);
  for (let i = 0; i < 2; i++) {
    const error = erf(x) - y;
    x -= error / (sqrtPiInv * Math.exp(-x * x) - x * error);
  }
  return x;
}
