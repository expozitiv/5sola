import fs from "node:fs";
import path from "node:path";
import { NextResponse, type NextRequest } from "next/server";

// Serves public/admin/config.yml with two values adjusted per deployment, so
// /admin works the same on production, Vercel previews and localhost:
// - base_url: the GitHub login runs on this deployment's own /api/auth;
// - branch: on a Vercel preview, entries are saved to that preview's branch
//   instead of main, so testing never changes the live site.
export const dynamic = "force-dynamic";

const CONFIG_PATH = path.join(process.cwd(), "public", "admin", "config.yml");

export function GET(request: NextRequest) {
  let config = fs.readFileSync(CONFIG_PATH, "utf8");

  config = config.replace(/^(\s*base_url:).*$/m, `$1 ${request.nextUrl.origin}`);

  const branch = process.env.VERCEL_GIT_COMMIT_REF;
  if (process.env.VERCEL_ENV === "preview" && branch) {
    config = config.replace(/^(\s*branch:).*$/m, `$1 ${branch}`);
  }

  return new NextResponse(config, {
    headers: { "Content-Type": "text/yaml; charset=utf-8", "Cache-Control": "no-store" },
  });
}
