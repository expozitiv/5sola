import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

// Romanian is served from unprefixed URLs, English from /en/...
// Unprefixed requests are rewritten to the /ro segment; explicit /ro URLs
// redirect to their unprefixed (canonical) form.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // The CMS lives in public/admin and is served by a rewrite in next.config.ts.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return NextResponse.next();

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const hasLocale = locales.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, metadata routes and any file with an extension.
  matcher: [
    "/((?!_next|api|_vercel|sitemap.xml|robots.txt|manifest.webmanifest|opengraph-image|icon|.*\\..*).*)",
  ],
};
