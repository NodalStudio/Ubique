/** Welford accumulator shared by variance and standard deviation. */
export function variance(values: readonly number[], flag: 0 | 1): number {
  if (flag !== 0 && flag !== 1) {
    throw new Error("Normalization flag must be 0 or 1");
  }
  if (values.length <= flag) return NaN;
  let mean = 0, m2 = 0;
  for (let i = 0; i < values.length; i++) {
    const delta = values[i] - mean;
    mean += delta / (i + 1);
    m2 += delta * (values[i] - mean);
  }
  return m2 / (values.length - flag);
}
