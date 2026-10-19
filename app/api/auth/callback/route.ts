import { NextResponse, type NextRequest } from "next/server";
import { OAUTH_STATE_COOKIE, allowedOrigins } from "../oauth";

// Step 2 of "Sign In with GitHub": GitHub redirects back here with a code, we
// exchange it for a token and hand it to the CMS window that opened the popup,
// using the handshake Sveltia/Decap CMS expect:
//   popup → opener: "authorizing:github"
//   opener → popup: "authorizing:github"
//   popup → opener: "authorization:github:success:{json}" (or ":error:")
export const dynamic = "force-dynamic";

async function exchangeCode(code: string): Promise<{ token?: string; error?: string }> {
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });
  const data = (await res.json().catch(() => ({}))) as Record<string, string>;
  if (data.access_token) return { token: data.access_token };
  return { error: data.error_description || data.error || `GitHub returned ${res.status}` };
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expected = request.cookies.get(OAUTH_STATE_COOKIE)?.value;

  const result =
    !code || !state || state !== expected
      ? { error: "Sesiunea de autentificare a expirat. Încearcă din nou." }
      : await exchangeCode(code);

  const message = result.token
    ? `authorization:github:success:${JSON.stringify({ provider: "github", token: result.token })}`
    : `authorization:github:error:${JSON.stringify({ provider: "github", error: result.error })}`;
  const origins = allowedOrigins(request.nextUrl.origin).map((r) => r.source);
  // Escape "<" so nothing in the payload can close the <script> tag.
  const json = (value: unknown) => JSON.stringify(value).replaceAll("<", "\\u003c");

  const html = `<!doctype html>
<html lang="ro"><head><meta charset="utf-8"><title>Autentificare</title></head>
<body><p>Se finalizează autentificarea…</p>
<script>
  const message = ${json(message)};
  const origins = ${json(origins)}.map((source) => new RegExp(source));
  window.addEventListener("message", (event) => {
    if (event.data !== "authorizing:github") return;
    if (!origins.some((re) => re.test(event.origin))) return;
    window.opener.postMessage(message, event.origin);
  });
  window.opener?.postMessage("authorizing:github", "*");
</script>
</body></html>`;

  const response = new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
  response.cookies.delete({ name: OAUTH_STATE_COOKIE, path: "/api/auth" });
  return response;
}
