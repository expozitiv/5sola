import type { MetadataRoute } from "next";
import eventsData from "@/data/events.json";
import { absoluteUrl, locales } from "@/lib/i18n/config";

type Entry = MetadataRoute.Sitemap[number];

function localizedEntries(path: string, entry: Omit<Entry, "url" | "alternates">): Entry[] {
  const languages = {
    "ro-RO": absoluteUrl("ro", path),
    en: absoluteUrl("en", path),
  };
  return locales.map((lang) => ({
    ...entry,
    url: absoluteUrl(lang, path),
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: [string, Entry["changeFrequency"], number][] = [
    ["/", "weekly", 1],
    ["/cine-suntem", "monthly", 0.8],
    ["/ce-credem", "monthly", 0.8],
    ["/evenimente", "weekly", 0.9],
    ["/resurse", "monthly", 0.7],
    ["/contact", "yearly", 0.6],
  ];

  return [
    ...staticRoutes.flatMap(([path, changeFrequency, priority]) =>
      localizedEntries(path, { lastModified: new Date(), changeFrequency, priority })
    ),
    ...eventsData.flatMap((event) =>
      localizedEntries(`/evenimente/${event.slug}`, {
        lastModified: new Date(event.endDate),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    ),
  ];
}
