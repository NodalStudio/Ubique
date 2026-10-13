import { assert, assertEquals } from "jsr:@std/assert@1.0.14";
import {
  calibrateIterations,
  formatDuration,
  timingUsable,
} from "../scripts/benchmark_helpers.ts";
Deno.test("coarse timers batch the fast path even when the other path is slow", () => {
  let t = 0;
  const count = calibrateIterations(
    [() => {
      t += .001;
      return 1;
    }, () => {
      t += .05;
      return 1;
    }],
    100000,
    () => Math.floor(t),
  );
  assert(count >= 10000);
  assert(count <= 100000);
});
Deno.test("an isolated slow probe cannot collapse calibration to one operation", () => {
  let t = 0, calls = 0;
  const count = calibrateIterations(
    [() => {
      t += calls++ === 0 ? 500 : .01;
      return 1;
    }],
    100000,
    () => Math.floor(t),
  );
  assert(count >= 1000);
});
Deno.test("zero/nonfinite/quantized samples never qualify for speed ratios", () => {
  for (const samples of [[0, 0, 0], [NaN], [Infinity], [.0001], [1, 0, 1]]) {
    assert(!timingUsable(samples, 1));
  }
  assert(timingUsable([.01, .02, .015], 1000));
  assertEquals(formatDuration(0), "below timer resolution");
  assertEquals(formatDuration(.0002), "200 ns");
  assertEquals(formatDuration(.02), "20.0 µs");
});
