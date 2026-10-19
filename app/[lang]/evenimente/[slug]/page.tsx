import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isEventFuture, isRegistrationOpen } from "@/lib/utils";
import { EvenimentDetailContent } from "./EvenimentDetailContent";
import { absoluteUrl, locales, pageAlternates, toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { getEvents } from "@/lib/i18n/content";
import { breadcrumbJsonLd } from "@/lib/i18n/seo";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getEvents(lang).map((event) => ({ lang, slug: event.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = toLocale(rawLang);
  const t = getDictionary(lang).event;
  const event = getEvents(lang).find((e) => e.slug === slug);

  if (!event) {
    return { title: getDictionary(lang).common.eventNotFound };
  }

  const speakerNames = event.speakers.map((s) => s.name).join(", ");
  const path = `/evenimente/${slug}`;
  const url = absoluteUrl(lang, path);

  const ogImage = event.image
    ? [{ url: event.image, width: 1200, height: 630, alt: event.title }]
    : undefined;

  const description = speakerNames
    ? `${event.description} — ${event.location}. ${t.speakersPrefix}: ${speakerNames}.`
    : `${event.description} — ${event.location}.`;

  return {
    title: event.title,
    description,
    keywords: [
      event.title,
      t.metaKeyword,
      "5 Sola",
      event.location,
      t.metaKeywordTheology,
      t.metaCountry,
      ...event.speakers.map((s) => s.name),
    ],
    alternates: pageAlternates(lang, path),
    openGraph: {
      url,
      type: "website",
      title: `${event.title} | 5SOLA.RO`,
      description,
      ...(ogImage && { images: ogImage }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | 5SOLA.RO`,
      description: `${event.description} — ${event.location}.`,
      ...(event.image && { images: [event.image] }),
    },
  };
}

export default async function EvenimentDetailPage({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  const lang = toLocale(rawLang);
  const dict = getDictionary(lang);
  const event = getEvents(lang).find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const path = `/evenimente/${slug}`;
  const url = absoluteUrl(lang, path);
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    description: event.description,
    inLanguage: "ro",
    url,
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "RO",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "Asociația 5 Sola",
      url: "https://5sola.ro",
    },
    performer: event.speakers.map((s) => ({
      "@type": "Person",
      name: s.name,
      description: s.role,
    })),
  };

  const breadcrumb = breadcrumbJsonLd(lang, [
    { name: dict.events.breadcrumb, path: "/evenimente" },
    { name: event.title, path },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <EvenimentDetailContent
        event={event}
        isFuture={isEventFuture(event.endDate)}
        registrationOpen={isRegistrationOpen(event)}
      />
    </>
  );
}
