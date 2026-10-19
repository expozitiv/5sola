import { NextResponse, type NextRequest } from "next/server";
import { CMS_REPO, OAUTH_STATE_COOKIE, allowedOrigins } from "../oauth";

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

const githubHeaders = (auth: string) => ({
  Authorization: auth,
  Accept: "application/vnd.github+json",
  "User-Agent": "5sola-admin",
});

// Only accounts that can push to the content repository may use /admin; anyone
// else gets no token, so they can't even read the CMS. Who can edit is managed
// in the repository's collaborators and the organization's base permissions.
async function canEdit(token: string): Promise<boolean> {
  const res = await fetch(`https://api.github.com/repos/${CMS_REPO}`, {
    headers: githubHeaders(`Bearer ${token}`),
    cache: "no-store",
  });
  if (!res.ok) return false;
  const repo = (await res.json()) as { permissions?: { push?: boolean } };
  return repo.permissions?.push === true;
}

// Best effort: invalidate a token we are not going to hand out.
async function revoke(token: string) {
  const basic = Buffer.from(
    `${process.env.GITHUB_CLIENT_ID}:${process.env.GITHUB_CLIENT_SECRET}`
  ).toString("base64");
  await fetch(`https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/token`, {
    method: "DELETE",
    headers: githubHeaders(`Basic ${basic}`),
    body: JSON.stringify({ access_token: token }),
  }).catch(() => {});
}

async function authorize(code: string): Promise<{ token?: string; error?: string }> {
  const result = await exchangeCode(code);
  if (!result.token) return result;
  if (await canEdit(result.token)) return result;
  await revoke(result.token);
  return { error: "Contul tău GitHub nu are acces la administrarea acestui site." };
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expected = request.cookies.get(OAUTH_STATE_COOKIE)?.value;

  const result =
    !code || !state || state !== expected
      ? { error: "Sesiunea de autentificare a expirat. Încearcă din nou." }
      : await authorize(code);

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
