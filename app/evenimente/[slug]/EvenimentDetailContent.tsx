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

export function EvenimentDetailContent({ event }: { event: Event }) {
  const isFuture = isEventFuture(event.endDate);
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-start overflow-hidden px-6 mb-32">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/detail/1920/1080?blur=4"
            alt={event.title}
            className="w-full h-full object-cover opacity-20 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 pt-8">
          <Link
            href="/evenimente"
            className="inline-flex items-center gap-3 label-caps text-xs text-primary mb-12 hover:text-ink transition-colors duration-300 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Înapoi la evenimente</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap items-center gap-6 mb-12">
              <div className="flex items-center gap-3 text-primary font-mono text-sm tracking-widest uppercase">
                <Calendar size={18} />
                <span>{formatDateRange(event.startDate, event.endDate)}</span>
              </div>
              <div className="w-1.5 h-1.5 bg-ink/10 rounded-full" />
              <div className="flex items-center gap-3 text-muted font-mono text-sm tracking-widest uppercase">
                <MapPin size={18} />
                <span>{event.location}</span>
              </div>
            </div>

            <h1 className="text-[10vw] md:text-[8vw] font-serif font-black mb-12 leading-[0.85] tracking-tighter uppercase max-w-5xl glow-red">
              {event.title}
            </h1>

            {isFuture && event.stripeLink && (
              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href={event.stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-12 py-5 text-lg"
                >
                  <span>Înscrie-te acum</span>
                  <ExternalLink className="ml-3" size={20} />
                </a>
                <a href="#program" className="btn-outline px-12 py-5 text-lg">
                  Vezi Programul
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-24">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-32">
            {/* Description */}
            <div>
              <span className="label-caps text-primary mb-8 block">Despre Eveniment</span>
              <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-ink mb-12">
                {event.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {event.topics.map((topic, i) => (
                  <div key={i} className="flex items-start gap-4 p-8 bento-card bg-surface-low">
                    <CheckCircle2 className="text-primary shrink-0 mt-1" size={24} />
                    <span className="text-lg font-medium leading-relaxed">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Speakers */}
            <div>
              <span className="label-caps text-primary mb-12 block">Vorbitori Invitați</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {event.speakers.map((speaker, i) => (
                  <div key={i} className="group">
                    <div className="aspect-square bg-surface-low mb-8 overflow-hidden relative">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <h3 className="text-3xl font-serif font-black mb-2 group-hover:text-primary transition-colors">
                      {speaker.name}
                    </h3>
                    <p className="label-caps text-xs text-primary mb-4">{speaker.role}</p>
                    {speaker.bio && (
                      <p className="text-muted text-sm leading-relaxed">{speaker.bio}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube Playlist */}
            {!isFuture && event.youtubePlaylist && (
              <div className="bento-card p-12 md:p-20 bg-surface-low border-primary/20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                      <Youtube className="text-primary" size={40} />
                      <span className="label-caps text-primary">Arhivă Video</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-black mb-6 uppercase leading-tight">
                      Urmărește <br /> <span className="text-primary">Înregistrările</span>
                    </h2>
                    <p className="text-muted text-lg mb-10 max-w-md">
                      Toate sesiunile acestei conferințe sunt disponibile gratuit pe canalul nostru
                      de YouTube.
                    </p>
                    <a
                      href={`https://youtube.com/playlist?list=${event.youtubePlaylist}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex px-10 py-4"
                    >
                      <span>Vezi pe YouTube</span>
                      <ExternalLink className="ml-3" size={18} />
                    </a>
                  </div>
                  <div className="w-full md:w-1/2 aspect-video bg-bg border border-outline-variant flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <img
                      src={`https://img.youtube.com/vi/${event.youtubePlaylist}/maxresdefault.jpg`}
                      alt="YouTube Playlist"
                      className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="relative z-10 w-20 h-20 bg-primary flex items-center justify-center rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Youtube size={40} className="text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-12">
              {/* Schedule */}
              {event.schedule.length > 0 && (
                <div id="program" className="p-12 bento-card bg-surface-low">
                  <div className="flex items-center gap-4 mb-8">
                    <Clock className="text-primary" size={24} />
                    <span className="label-caps text-primary">Program</span>
                  </div>

                  {/* Day tabs */}
                  {event.schedule.length > 1 && (
                    <div className="flex gap-2 mb-8 border-b border-outline-variant">
                      {event.schedule.map((daySchedule, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveDay(i)}
                          className={cn(
                            "pb-4 label-caps text-xs relative transition-colors duration-200 whitespace-nowrap",
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

                  <p className="label-caps text-xs text-muted mb-6">
                    {event.schedule[activeDay].day}
                  </p>

                  <div className="space-y-8">
                    {event.schedule[activeDay].items.map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-8 pb-8 border-b border-outline-variant last:border-0 last:pb-0 group"
                      >
                        <span className="font-mono text-primary text-sm font-bold">
                          {item.time}
                        </span>
                        <span className="text-ink font-medium leading-tight group-hover:text-primary transition-colors">
                          {item.activity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location Card */}
              <div className="p-12 bento-card bg-primary text-white">
                <div className="flex items-center gap-4 mb-8">
                  <MapPin size={24} />
                  <span className="label-caps text-white/80">Locație</span>
                </div>
                <h3 className="text-3xl font-serif font-black mb-10 leading-tight uppercase">
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
