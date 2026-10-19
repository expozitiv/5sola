export const OAUTH_STATE_COOKIE = "cms-oauth-state";

// Origins allowed to receive the GitHub token: this site itself, plus the
// comma-separated CMS_ALLOWED_ORIGINS. A "*" matches letters and digits only (no
// dashes), so "https://5sola-*-oprojects.vercel.app" can't be matched by a
// deployment of some other Vercel team whose name ends in "-oprojects".
export function allowedOrigins(selfOrigin: string): RegExp[] {
  const extra = (process.env.CMS_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  return [selfOrigin, ...extra].map(
    (origin) =>
      new RegExp(
        `^${origin.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replaceAll("*", "[a-z0-9]+")}$`
      )
  );
}
