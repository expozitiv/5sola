"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Youtube,
  ExternalLink,
  Clock,
  CheckCircle2,
} from "lucide-react";
import type { Event } from "@/types";
import { formatDateRange, isEventFuture } from "@/lib/utils";
import { cn } from "@/lib/utils";

function getYoutubePlaylistUrl(value: string): string {
  if (value.startsWith("http")) return value;
  return `https://www.youtube.com/playlist?list=${value}`;
}

export function EvenimentDetailContent({ event }: { event: Event }) {
  const isFuture = isEventFuture(event.endDate);
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-10 pb-12">
        <div className="absolute inset-0 z-0">
          {event.image ? (
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover object-top opacity-20"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <Link
            href="/evenimente"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors duration-200 group mb-8 bg-surface-low border border-outline-variant hover:border-outline px-4 py-2 rounded-xs w-fit"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Înapoi la evenimente</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-widest uppercase">
                <Calendar size={16} />
                <span>{formatDateRange(event.startDate, event.endDate)}</span>
              </div>
              <div className="w-1 h-1 bg-ink/20 rounded-full" />
              <div className="flex items-center gap-2 text-muted font-mono text-sm tracking-widest uppercase">
                <MapPin size={16} />
                <span>{event.location}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-black mb-8 leading-tight tracking-tighter uppercase max-w-4xl glow-red">
              {event.title}
            </h1>

            {isFuture && event.stripeLink && (
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={event.stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-10 py-4"
                >
                  <span>Înscrie-te acum</span>
                  <ExternalLink className="ml-3" size={18} />
                </a>
                <a href="#program" className="btn-outline px-10 py-4">
                  Vezi Programul
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="px-6 mb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Description */}
            <div>
              <span className="label-caps text-primary mb-4 block">Despre Eveniment</span>
              <p className="text-xl md:text-2xl font-serif italic leading-relaxed text-ink mb-8">
                {event.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.topics.map((topic, i) => (
                  <div key={i} className="flex items-start gap-3 p-5 bento-card bg-surface-low">
                    <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                    <span className="font-medium leading-relaxed">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Speakers */}
            {event.speakers.length > 0 && (
              <div>
                <span className="label-caps text-primary mb-8 block">Vorbitori Invitați</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {event.speakers.map((speaker, i) => (
                    <div key={i} className="group">
                      <div className="aspect-square bg-surface-low mb-4 overflow-hidden relative">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <h3 className="text-xl font-serif font-black mb-1 group-hover:text-primary transition-colors">
                        {speaker.name}
                      </h3>
                      <p className="label-caps text-xs text-primary">{speaker.role}</p>
                      {speaker.bio && (
                        <p className="text-muted text-sm leading-relaxed mt-2">{speaker.bio}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* YouTube Playlist */}
            {!isFuture && event.youtubePlaylist && (
              <div className="bento-card p-8 bg-surface-low border-primary/20">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Youtube className="text-primary" size={28} />
                      <span className="label-caps text-primary">Arhivă Video</span>
                    </div>
                    <h2 className="text-2xl font-serif font-black mb-3 uppercase leading-tight">
                      Urmărește <span className="text-primary">înregistrările</span>
                    </h2>
                    <p className="text-muted mb-6">
                      Toate sesiunile sunt disponibile gratuit pe YouTube.
                    </p>
                    <a
                      href={getYoutubePlaylistUrl(event.youtubePlaylist!)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex px-8 py-3"
                    >
                      <span>Vezi pe YouTube</span>
                      <ExternalLink className="ml-2" size={16} />
                    </a>
                  </div>
                  <a
                    href={getYoutubePlaylistUrl(event.youtubePlaylist!)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-40 h-28 bg-bg border border-outline-variant flex items-center justify-center shrink-0 group"
                  >
                    <div className="w-14 h-14 bg-primary flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Youtube size={28} className="text-white fill-white" />
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Schedule */}
              {isFuture && event.schedule.length > 0 && (
                <div id="program" className="p-8 bento-card bg-surface-low">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="text-primary" size={20} />
                    <span className="label-caps text-primary">Program</span>
                  </div>

                  {event.schedule.length > 1 && (
                    <div className="flex gap-2 mb-6 border-b border-outline-variant">
                      {event.schedule.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveDay(i)}
                          className={cn(
                            "pb-3 label-caps text-xs relative transition-colors duration-200 whitespace-nowrap",
                            activeDay === i ? "text-primary" : "text-muted hover:text-ink"
                          )}
                        >
                          Ziua {i + 1}
                          {activeDay === i && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="label-caps text-xs text-muted mb-4">
                    {event.schedule[activeDay].day}
                  </p>

                  <div className="space-y-5">
                    {event.schedule[activeDay].items.map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-6 pb-5 border-b border-outline-variant last:border-0 last:pb-0"
                      >
                        <span className="font-mono text-primary text-sm font-bold shrink-0">
                          {item.time}
                        </span>
                        <span className="text-ink font-medium leading-tight">
                          {item.activity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/evenimente/${event.slug}/orar`}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 label-caps text-xs text-primary border border-primary/30 hover:border-primary hover:bg-primary/5 transition-colors duration-200 py-3 px-4 rounded-xs"
                  >
                    <span>Vezi programul complet</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>
              )}

              {/* Location Card */}
              <div className="p-8 bento-card bg-primary text-white">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin size={20} />
                  <span className="label-caps text-white/80">Locație</span>
                </div>
                <h3 className="text-2xl font-serif font-black mb-6 leading-tight uppercase">
                  {event.location}
                </h3>
                <a
                  href={
                    event.locationUrl ??
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 label-caps text-xs border-b border-white/30 pb-2 hover:border-white transition-all duration-300"
                >
                  <span>Vezi pe hartă</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
