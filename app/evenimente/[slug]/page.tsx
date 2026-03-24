import type { Metadata } from "next";
import { notFound } from "next/navigation";
import eventsData from "@/data/events.json";
import type { Event } from "@/types";
import { EvenimentDetailContent } from "./EvenimentDetailContent";

const events = eventsData as Event[];

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return { title: "Eveniment negăsit" };
  }

  const speakerNames = event.speakers.map((s) => s.name).join(", ");
  const url = `https://5sola.ro/evenimente/${slug}`;

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    description: event.description,
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

  return {
    title: event.title,
    description: `${event.description} — ${event.location}. Vorbitori: ${speakerNames}.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      type: "website",
      title: `${event.title} | 5SOLA.RO`,
      description: `${event.description} — ${event.location}. Vorbitori: ${speakerNames}.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | 5SOLA.RO`,
      description: `${event.description} — ${event.location}.`,
    },
    other: {
      "application/ld+json": JSON.stringify(eventJsonLd),
    },
  };
}

export default async function EvenimentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  const url = `https://5sola.ro/evenimente/${slug}`;
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    description: event.description,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <EvenimentDetailContent event={event} />
    </>
  );
}
