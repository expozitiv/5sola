import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import type { ParallelSession } from "@/types";
import { formatDateRange, isEventOngoing } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { locales, localizePath, pageAlternates, toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { getEvents } from "@/lib/i18n/content";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => getEvents(lang).map((e) => ({ lang, slug: e.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = toLocale(rawLang);
  const dict = getDictionary(lang);
  const event = getEvents(lang).find((e) => e.slug === slug);
  if (!event) return { title: dict.common.programNotFound };
  return {
    title: dict.event.programTitle(event.title),
    alternates: pageAlternates(lang, `/evenimente/${slug}/orar`),
  };
}

const isSession = (activity: string) =>
  /sesiu|session|panel|q&a|atelier|workshop/i.test(activity);

export default async function OrarPage({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  const lang = toLocale(rawLang);
  const dict = getDictionary(lang);
  const event = getEvents(lang).find((e) => e.slug === slug);
  const eventPath = localizePath(lang, `/evenimente/${slug}`);

  if (!event) notFound();
  if (!event.schedule.length) redirect(eventPath);

  const isOngoing = isEventOngoing(event.startDate, event.endDate);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      {/* Header */}
      <div className="px-6 mb-10 max-w-2xl mx-auto">
        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href={eventPath}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors duration-200 group bg-surface-low border border-outline-variant hover:border-outline px-4 py-2 rounded-xs w-fit"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>{dict.event.backToEvent}</span>
          </Link>
          {isOngoing && event.qaDetails?.formId && (
            <Link
              href={`${eventPath}/qa`}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors duration-200 bg-surface-low border border-outline-variant hover:border-outline px-4 py-2 rounded-xs w-fit"
            >
              <span>{dict.common.qa}</span>
            </Link>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mb-5 text-sm font-mono">
          <div className="flex items-center gap-2 text-primary">
            <Calendar size={14} />
            <span>{formatDateRange(event.startDate, event.endDate, lang)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <MapPin size={14} />
            <span>{event.location}</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight uppercase mb-2">
          {event.title}
        </h1>
        <p className="label-caps text-primary mt-4">{dict.common.program}</p>
      </div>

      {/* Schedule days */}
      <div className="px-6 max-w-2xl mx-auto space-y-10">
        {event.schedule.map((day, dayIdx) => (
          <div key={dayIdx} className="bento-card bg-surface-low overflow-hidden">
            <div className="px-6 py-4 bg-primary/10 border-b border-outline-variant">
              <p className="label-caps text-primary text-xs">{day.day}</p>
            </div>

            <div className="divide-y divide-outline-variant/60">
              {day.items.map((item, i) => {
                const speakerObj = item.speaker
                  ? event.speakers.find(
                      (s) => s.name.toLowerCase() === item.speaker!.toLowerCase()
                    )
                  : null;
                return (
                  <div key={i} className="flex items-start gap-3 px-4 sm:px-6 py-3 sm:py-4">
                    {/* Time */}
                    <span className="font-mono text-primary text-xs sm:text-sm font-bold shrink-0 w-12 sm:w-24 pt-0.5">
                      {item.time}
                    </span>

                    {/* Activity + topic + speaker (mobile: stacked; desktop: inline) */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <span
                            className={cn(
                              "leading-snug text-sm sm:text-base block",
                              isSession(item.activity)
                                ? "font-bold text-ink"
                                : "text-muted font-medium"
                            )}
                          >
                            {item.activity}
                          </span>
                          {item.topic && (
                            <span className="block text-xs sm:text-sm text-primary font-semibold mt-0.5">
                              {item.topic}
                            </span>
                          )}
                        </div>
                        {/* Medallion — desktop only, to the right */}
                        {speakerObj && (
                          <div className="hidden sm:flex shrink-0 flex-col items-center gap-1">
                            <div
                              className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/40 bg-surface-high"
                              title={speakerObj.name}
                            >
                              <img
                                src={speakerObj.image}
                                alt={speakerObj.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <span className="text-xs text-muted font-medium text-center w-20">
                              {speakerObj.name}
                            </span>
                          </div>
                        )}
                      </div>
                      {/* Speaker — mobile only, inline below topic */}
                      {speakerObj && (
                        <div className="flex sm:hidden items-center gap-2 mt-1.5">
                          <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-primary/40 bg-surface-high shrink-0">
                            <img
                              src={speakerObj.image}
                              alt={speakerObj.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="text-xs text-muted font-medium">{speakerObj.name}</span>
                        </div>
                      )}
                      {/* Parallel sessions (workshops) */}
                      {item.parallel && item.parallel.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {(item.parallel as ParallelSession[]).map((session, j) => {
                            const sessionSpeaker = event.speakers.find(
                              (s) => s.name.toLowerCase() === session.speaker.toLowerCase()
                            );
                            return (
                              <div key={j} className="flex items-start gap-2 pl-2 border-l-2 border-primary/30">
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs font-mono text-primary font-semibold uppercase tracking-wide">
                                    {session.room}
                                  </span>
                                  <span className="block text-xs sm:text-sm text-ink font-semibold leading-snug">
                                    {session.speaker}
                                  </span>
                                  <span className="block text-xs text-muted leading-snug">
                                    {session.topic}
                                  </span>
                                </div>
                                {sessionSpeaker && (
                                  <div className="shrink-0">
                                    <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-primary/40 bg-surface-high">
                                      <img
                                        src={sessionSpeaker.image}
                                        alt={sessionSpeaker.name}
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
