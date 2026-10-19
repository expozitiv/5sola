export const OAUTH_STATE_COOKIE = "cms-oauth-state";

// Origins allowed to receive the GitHub token: this site itself, plus the
// comma-separated CMS_ALLOWED_ORIGINS (e.g. Vercel preview URLs). A "*" matches
// one DNS label fragment, so "https://5sola-*-ovidiuchis.vercel.app" works.
export function allowedOrigins(selfOrigin: string): RegExp[] {
  const extra = (process.env.CMS_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  return [selfOrigin, ...extra].map(
    (origin) =>
      new RegExp(
        `^${origin.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replaceAll("*", "[a-z0-9-]*")}$`
      )
  );
}
