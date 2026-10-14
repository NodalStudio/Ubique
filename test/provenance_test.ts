import { assertThrows } from "jsr:@std/assert";
import { checkProvenancePayload } from "../scripts/check_jsr_provenance.ts";
function fixture(workflow: string, padding: number) {
  const json = JSON.stringify({
    padding: "x".repeat(padding),
    workflow,
    sub: "repo:NodalStudio/Ubique:ref:refs/tags/v1.0.4",
    iss: "https://token.actions.githubusercontent.com",
    aud: "sigstore",
  });
  const payload = btoa(String.fromCharCode(...new TextEncoder().encode(json)))
    .replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
  return `header.${payload}.signature`;
}
Deno.test("reproduces the Unicode workflow Base64URL failure before upload", () => {
  assertThrows(
    () => checkProvenancePayload(fixture("🚀 Publish to JSR + npm", 1)),
    Error,
    "Base64URL",
  );
});
Deno.test("ASCII publication metadata decodes at all three Base64 alignments", () => {
  for (let padding = 0; padding < 3; padding++) {
    checkProvenancePayload(fixture("Publish to JSR and npm", padding));
  }
});
Deno.test("malformed tokens fail without exposing their contents", () => {
  assertThrows(
    () => checkProvenancePayload("private-fixture"),
    Error,
    "Malformed OIDC token",
  );
});
