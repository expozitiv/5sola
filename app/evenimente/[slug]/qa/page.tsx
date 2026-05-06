import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import eventsData from "@/data/events.json";
import type { Event } from "@/types";
import { formatDateRange } from "@/lib/utils";
import QAForm from "./QAForm";

const events = eventsData as Event[];

export function generateStaticParams() {
  return events
    .filter((e) => e.qaDetails?.formId)
    .map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Pagină negăsită" };
  return {
    title: `Întrebări — ${event.title}`,
    alternates: { canonical: `https://5sola.ro/evenimente/${slug}/qa` },
  };
}

export default async function QAPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) notFound();
  if (!event.qaDetails?.formId) redirect(`/evenimente/${slug}`);

  return (
    <div className="pt-24 md:pt-28 pb-10 md:pb-20 min-h-screen">
      {/* Header — compact on mobile */}
      <div className="px-4 md:px-6 mb-4 md:mb-10 max-w-2xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-4 md:mb-10">
          <Link
            href={`/evenimente/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted hover:text-ink transition-colors duration-200 group bg-surface-low border border-outline-variant hover:border-outline px-3 py-1.5 md:px-4 md:py-2 rounded-xs w-fit"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Eveniment</span>
          </Link>
          {event.schedule.length > 0 && (
            <Link
              href={`/evenimente/${slug}/orar`}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted hover:text-ink transition-colors duration-200 bg-surface-low border border-outline-variant hover:border-outline px-3 py-1.5 md:px-4 md:py-2 rounded-xs w-fit"
            >
              <span>Program</span>
            </Link>
          )}
        </div>

        <h1 className="text-2xl md:text-5xl font-serif font-black leading-tight uppercase">
          {event.title}
        </h1>
        <p className="label-caps text-primary mt-2 md:mt-4">Întrebări & Răspunsuri</p>

        {/* Date/location — hidden on mobile */}
        <div className="hidden md:flex flex-wrap gap-4 mt-5 text-sm font-mono">
          <div className="flex items-center gap-2 text-primary">
            <Calendar size={14} />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <MapPin size={14} />
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 md:px-6 max-w-2xl mx-auto">
        <QAForm qaDetails={event.qaDetails!} />
      </div>
    </div>
  );
}
