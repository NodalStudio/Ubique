/// <reference lib="webworker" />
import { fitPoints, matrixExperiment } from "./article_core.ts";
import { tutorialExperiment } from "./tutorial_kernels.ts";
self.onmessage = (event: MessageEvent) => {
  const { id, kind, input } = event.data;
  try {
    const result = kind === "tutorial"
      ? tutorialExperiment(input.m, input.k, input.n, input.tile)
      : kind === "regression"
      ? fitPoints(input.points, input.offset)
      : kind === "matrix"
      ? matrixExperiment(input)
      : (() => {
        throw new Error("Unknown experiment");
      })();
    self.postMessage({ id, result });
  } catch (error) {
    self.postMessage({
      id,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
