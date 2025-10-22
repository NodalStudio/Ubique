import { runSmokeSuite } from "./smoke.ts";

runSmokeSuite()
  .then(() => {
    console.log("Runtime smoke suite completed successfully (bun).");
  })
  .catch((error) => {
    console.error("Runtime smoke suite failed (bun)", error);
    throw error;
  });
