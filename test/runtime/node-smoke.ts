import { runSmokeSuite } from "./smoke.ts";

runSmokeSuite()
  .then(() => {
    console.log("Runtime smoke suite completed successfully (node).");
  })
  .catch((error) => {
    console.error("Runtime smoke suite failed (node)", error);
    throw error;
  });
