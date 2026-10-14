/** Compatibility preflight, NOT JWT signature verification. Deno 2.9.7's
 * provenance decoder uses STANDARD_NO_PAD instead of URL_SAFE_NO_PAD:
 * https://github.com/denoland/deno/blob/v2.9.7/cli/tools/publish/provenance.rs#L572
 * Reject that failure before a package upload. Never log tokens or claims.
 */
export function checkProvenancePayload(token: string): void {
  const parts = token.split(".");
  if (parts.length !== 3 || !parts.every(Boolean)) {
    throw new Error("Malformed OIDC token");
  }
  const payload = parts[1];
  if (/[-_]/.test(payload)) {
    throw new Error(
      "JSR provenance preflight: this OIDC payload triggers Deno’s Base64URL decoding bug. Keep release workflow metadata ASCII, or use a Deno release with the URL_SAFE_NO_PAD fix. No package has been uploaded by this check.",
    );
  }
  try {
    const bytes = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0));
    const claims = JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(bytes),
    );
    if (
      typeof claims.sub !== "string" || !claims.sub ||
      claims.iss !== "https://token.actions.githubusercontent.com" ||
      claims.aud !== "sigstore"
    ) throw new Error();
  } catch {
    throw new Error(
      "JSR provenance preflight: unexpected OIDC payload; token contents suppressed.",
    );
  }
}
if (import.meta.main) {
  const endpoint = Deno.env.get("ACTIONS_ID_TOKEN_REQUEST_URL");
  const requestToken = Deno.env.get("ACTIONS_ID_TOKEN_REQUEST_TOKEN");
  if (!endpoint || !requestToken) {
    throw new Error(
      "Run this preflight inside GitHub Actions with id-token: write.",
    );
  }
  const url = new URL(endpoint);
  url.searchParams.set("audience", "sigstore");
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${requestToken}` },
  });
  if (!response.ok) {
    throw new Error(
      `OIDC request failed (${response.status}); response body suppressed.`,
    );
  }
  const data = await response.json();
  if (typeof data.value !== "string") {
    throw new Error("OIDC response has no token; response body suppressed.");
  }
  checkProvenancePayload(data.value);
  console.log(
    "JSR provenance preflight passed with the real GitHub OIDC token. No token or claims were logged.",
  );
}
