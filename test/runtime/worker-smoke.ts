import { runSmokeSuite } from "./smoke.ts";

export default {
  async fetch(): Promise<Response> {
    await runSmokeSuite();
    return new Response("ok");
  },
};
