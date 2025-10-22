import { runSmokeSuite } from "./smoke.ts";

(async () => {
  try {
    await runSmokeSuite();
    console.log("Runtime smoke suite completed in browser context");
  } catch (error) {
    console.error("Runtime smoke suite failed", error);
    throw error;
  }
})();
