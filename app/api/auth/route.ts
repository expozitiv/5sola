import { NextResponse, type NextRequest } from "next/server";
import { OAUTH_STATE_COOKIE } from "./oauth";

// Step 1 of "Sign In with GitHub" in /admin (Sveltia CMS): the CMS opens this
// route in a popup, and we send the user to GitHub's consent screen.
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) return new NextResponse("GITHUB_CLIENT_ID is not set", { status: 500 });

  const state = crypto.randomUUID().replaceAll("-", "");
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  // public_repo is enough while the repository is public; use "repo" if it becomes private.
  authorize.searchParams.set("scope", "public_repo,user");
  authorize.searchParams.set("state", state);
  authorize.searchParams.set(
    "redirect_uri",
    new URL("/api/auth/callback", request.nextUrl.origin).toString()
  );

  const response = NextResponse.redirect(authorize);
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/api/auth",
    maxAge: 600,
  });
  return response;
}
