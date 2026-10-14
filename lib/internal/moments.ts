/** Shifted Welford accumulator: retain small variations around a large origin. */
export function variance(values: readonly number[], flag: 0 | 1): number {
  if (flag !== 0 && flag !== 1) {
    throw new Error("Normalization flag must be 0 or 1");
  }
  if (values.length <= flag) return NaN;
  const origin = values[0];
  let mean = 0, m2 = 0;
  for (let i = 0; i < values.length; i++) {
    const value = values[i] - origin;
    const delta = value - mean;
    mean += delta / (i + 1);
    m2 += delta * (value - mean);
  }
  return m2 / (values.length - flag);
}

/** Center in translated coordinates without rounding the mean back to the origin. */
export function centered(values: readonly number[]): number[] {
  const origin = values[0];
  let mean = 0;
  for (const value of values) mean += (value - origin) / values.length;
  return values.map((value) => (value - origin) - mean);
}
