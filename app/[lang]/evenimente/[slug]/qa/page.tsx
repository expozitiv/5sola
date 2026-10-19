import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { formatDateRange, isEventOngoing } from "@/lib/utils";
import QAForm from "./QAForm";
import { locales, localizePath, pageAlternates, toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { getEvents } from "@/lib/i18n/content";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    getEvents("ro")
      .filter((e) => e.qaDetails?.formId)
      .map((e) => ({ lang, slug: e.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = toLocale(rawLang);
  const dict = getDictionary(lang);
  const event = getEvents(lang).find((e) => e.slug === slug);
  if (!event) return { title: dict.common.pageNotFound };
  return {
    title: dict.event.qaTitle(event.title),
    alternates: pageAlternates(lang, `/evenimente/${slug}/qa`),
  };
}

export default async function QAPage({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  const lang = toLocale(rawLang);
  const dict = getDictionary(lang);
  const event = getEvents(lang).find((e) => e.slug === slug);
  const eventPath = localizePath(lang, `/evenimente/${slug}`);

  if (!event) notFound();
  if (!event.qaDetails?.formId) redirect(eventPath);
  if (!isEventOngoing(event.startDate, event.endDate)) redirect(eventPath);

  return (
    <div className="pt-24 md:pt-28 pb-10 md:pb-20 min-h-screen">
      {/* Header — compact on mobile */}
      <div className="px-4 md:px-6 mb-4 md:mb-10 max-w-2xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-4 md:mb-10">
          <Link
            href={eventPath}
            className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted hover:text-ink transition-colors duration-200 group bg-surface-low border border-outline-variant hover:border-outline px-3 py-1.5 md:px-4 md:py-2 rounded-xs w-fit"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>{dict.common.event}</span>
          </Link>
          {event.schedule.length > 0 && (
            <Link
              href={`${eventPath}/orar`}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-muted hover:text-ink transition-colors duration-200 bg-surface-low border border-outline-variant hover:border-outline px-3 py-1.5 md:px-4 md:py-2 rounded-xs w-fit"
            >
              <span>{dict.common.program}</span>
            </Link>
          )}
        </div>

        <h1 className="text-2xl md:text-5xl font-serif font-black leading-tight uppercase">
          {event.title}
        </h1>
        <p className="label-caps text-primary mt-2 md:mt-4">{dict.common.qa}</p>

        {/* Date/location — hidden on mobile */}
        <div className="hidden md:flex flex-wrap gap-4 mt-5 text-sm font-mono">
          <div className="flex items-center gap-2 text-primary">
            <Calendar size={14} />
            <span>{formatDateRange(event.startDate, event.endDate, lang)}</span>
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
