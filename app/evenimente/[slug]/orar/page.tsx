import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import eventsData from "@/data/events.json";
import type { Event } from "@/types";
import { formatDateRange } from "@/lib/utils";
import { cn } from "@/lib/utils";

const events = eventsData as Event[];

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) return { title: "Program negăsit" };
  return {
    title: `Program — ${event.title}`,
    alternates: { canonical: `https://5sola.ro/evenimente/${slug}/orar` },
  };
}

const isSession = (activity: string) =>
  /sesiu|panel|q&a|atelier/i.test(activity);

export default async function OrarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) notFound();
  if (!event.schedule.length) redirect(`/evenimente/${slug}`);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      {/* Header */}
      <div className="px-6 mb-10 max-w-2xl mx-auto">
        <Link
          href={`/evenimente/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors duration-200 group mb-10 bg-surface-low border border-outline-variant hover:border-outline px-4 py-2 rounded-xs w-fit"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Înapoi la eveniment</span>
        </Link>

        <div className="flex flex-wrap gap-4 mb-5 text-sm font-mono">
          <div className="flex items-center gap-2 text-primary">
            <Calendar size={14} />
            <span>{formatDateRange(event.startDate, event.endDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted">
            <MapPin size={14} />
            <span>{event.location}</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight uppercase mb-2">
          {event.title}
        </h1>
        <p className="label-caps text-primary mt-4">Program</p>
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
