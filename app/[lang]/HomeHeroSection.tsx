"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Play, Calendar, MessageCircle } from "lucide-react";
import type { Event } from "@/types";
import { formatDateRange, isEventOngoing, isRegistrationOpen } from "@/lib/utils";
import { localizePath } from "@/lib/i18n/config";
import { useDictionary, useLocale } from "@/lib/i18n/client";
import { LiveBadge, LiveNowNext, useLiveStatus } from "@/components/LiveEventStatus";

interface Props {
  event: Event;
  hasFutureEvents: boolean;
}

export function HomeHeroSection({ event, hasFutureEvents }: Props) {
  const lang = useLocale();
  const dict = useDictionary();
  const t = dict.home;
  const c = dict.common;
  const eventPath = localizePath(lang, `/evenimente/${event.slug}`);
  const registrationOpen = isRegistrationOpen(event);
  const isOngoing = isEventOngoing(event.startDate, event.endDate);
  const live = useLiveStatus(event);
  const showLive = hasFutureEvents && isOngoing && live !== null;
  const dayCount =
    Math.round(
      (new Date(event.endDate).getTime() - new Date(event.startDate).getTime()) / 86_400_000
    ) + 1;

  return (
    <section className="relative flex items-center overflow-hidden bg-surface-low py-10 md:py-12 lg:py-14">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.webp"
          alt={t.heroBgAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {showLive ? (
            <LiveBadge status={live} />
          ) : (
            <div className="flex items-center gap-3 label-caps mb-6">
              <span className="w-12 h-[1px] bg-primary" />
              <span className="text-primary">
                {hasFutureEvents ? t.currentEvent : t.lastEvent}
              </span>
            </div>
          )}
          {!hasFutureEvents && (
            <p className="text-sm text-muted mb-6 italic">
              {t.noEventsNote}
            </p>
          )}
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 leading-[0.9] font-black glow-red tracking-tight">
            {event.title}
          </h1>
          <p className="text-lg md:text-xl text-muted mb-8 max-w-lg leading-relaxed font-medium">
            {event.description}
          </p>
          {showLive && event.schedule.length > 0 && (
            <LiveNowNext status={live} programHref={`${eventPath}/orar`} />
          )}
          <div className="flex flex-wrap gap-4">
            {hasFutureEvents ? (
              <>
                {isOngoing && event.qaDetails?.formId && (
                  <Link href={`${eventPath}/qa`} className="btn-primary inline-flex items-center">
                    <MessageCircle className="mr-2" size={16} />
                    <span>{c.qa}</span>
                  </Link>
                )}
                {!isOngoing && registrationOpen && event.stripeLink ? (
                  <>
                    <a
                      href={event.stripeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                    >
                      <span>{event.stripeLinkFamily ? c.registerIndividual : c.registerNow}</span>
                      <ArrowRight className="ml-2" size={16} />
                    </a>
                    {event.stripeLinkFamily && (
                      <a
                        href={event.stripeLinkFamily}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <span>{c.registerFamily}</span>
                        <ArrowRight className="ml-2" size={16} />
                      </a>
                    )}
                  </>
                ) : isOngoing && event.qaDetails?.formId ? null : (
                  <a
                    href="https://wa.me/40742215569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>{c.contactUs}</span>
                    <ArrowRight className="ml-2" size={16} />
                  </a>
                )}
              </>
            ) : event.youtubePlaylist ? (
              <Link href={eventPath} className="btn-primary">
                <span>{t.watchRecordings}</span>
                <Play className="ml-2" size={16} fill="currentColor" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-muted italic">
                <Play size={14} className="opacity-40" />
                {c.recordingsSoon}
              </span>
            )}
            <Link href={eventPath} className="btn-outline">
              <span>{c.learnMore}</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:block relative max-w-[26rem] xl:max-w-[28rem] ml-auto w-full"
        >
          <div className="aspect-[4/5] bg-surface-high p-3 relative group rounded-lg">
            {event.image && (
              <div className="relative w-full h-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 0px"
                  className="object-cover transition-all duration-700 rounded-sm"
                />
              </div>
            )}
          </div>
          <div className="absolute -bottom-8 -left-8 bg-primary p-7 text-white max-w-xs shadow-2xl rounded-xs">
            <div className="flex items-center gap-2 label-caps mb-4 text-white/80">
              <Calendar size={14} />
              <span>{formatDateRange(event.startDate, event.endDate, lang)}</span>
            </div>
            <h3 className="font-serif text-2xl leading-tight mb-3 font-black">
              {event.location}
            </h3>
            <p className="text-sm opacity-90 leading-relaxed">
              {t.daysLabel(dayCount)}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
