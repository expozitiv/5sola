export const locales = ["ro", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";

export const SITE_URL = "https://5sola.ro";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function toLocale(value: unknown): Locale {
  return isLocale(value) ? value : defaultLocale;
}

// Romanian stays on the unprefixed URLs ("/ce-credem"); every other locale is
// prefixed ("/en/ce-credem"). proxy.ts rewrites unprefixed URLs to /ro internally.
export function localizePath(lang: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLocale) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

// Inverse of localizePath: "/en/evenimente" -> "/evenimente".
export function stripLocale(pathname: string) {
  for (const lang of locales) {
    if (pathname === `/${lang}`) return "/";
    if (pathname.startsWith(`/${lang}/`)) return pathname.slice(lang.length + 1);
  }
  return pathname;
}

export function absoluteUrl(lang: Locale, path: string) {
  const localized = localizePath(lang, path);
  return localized === "/" ? SITE_URL : `${SITE_URL}${localized}`;
}

// canonical + hreflang alternates for a page, for use in Next.js metadata.
export function pageAlternates(lang: Locale, path: string) {
  return {
    canonical: absoluteUrl(lang, path),
    languages: {
      "ro-RO": absoluteUrl("ro", path),
      en: absoluteUrl("en", path),
      "x-default": absoluteUrl("ro", path),
    },
  };
}

export const dateLocales: Record<Locale, string> = {
  ro: "ro-RO",
  en: "en-GB",
};

export const ogLocales: Record<Locale, string> = {
  ro: "ro_RO",
  en: "en_GB",
};
