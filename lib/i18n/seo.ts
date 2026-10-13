import { absoluteUrl, type Locale } from "./config";
import { getDictionary } from "./index";

// BreadcrumbList JSON-LD starting at the localized home page.
export function breadcrumbJsonLd(lang: Locale, items: { name: string; path: string }[]) {
  const all = [{ name: getDictionary(lang).nav.home, path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(lang, item.path),
    })),
  };
}
