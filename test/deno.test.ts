import { assertEquals } from "jsr:@std/assert@1";

import { runSmokeSuite } from "./smoke.ts";

Deno.test("rubique runtime smoke (deno)", async () => {
  const result = await runSmokeSuite();
  assertEquals(result, true);
});
