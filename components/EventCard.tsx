"use client";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { Event } from "@/types";
import { formatDateRange, isEventFuture } from "@/lib/utils";
import { motion } from "motion/react";
import { localizePath } from "@/lib/i18n/config";
import { useDictionary, useLocale } from "@/lib/i18n/client";

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const isFuture = isEventFuture(event.endDate);
  const lang = useLocale();
  const t = useDictionary().common;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bento-card h-full flex flex-col"
    >
      {/* Poster Image */}
      {event.image && (
        <div className="relative -mx-[1px] -mt-[1px] mb-8 overflow-hidden aspect-[4/3]">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
        </div>
      )}

      {/* Background Glow */}
      {!event.image && (
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-all duration-500" />
      )}

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary label-caps">
          <Calendar size={14} />
          <span>{formatDateRange(event.startDate, event.endDate, lang)}</span>
        </div>
        {isFuture && (
          <span className="px-3 py-1 bg-primary/10 text-primary label-caps border border-primary/20 rounded-xs">
            {t.comingSoon}
          </span>
        )}
      </div>

      <h3 className="font-serif text-3xl font-black mb-6 group-hover:text-primary transition-colors duration-300 leading-tight">
        {event.title}
      </h3>

      <div className="flex items-center gap-2 text-muted text-sm mb-8 font-medium">
        <MapPin size={16} className="text-primary" />
        <span>{event.location}</span>
      </div>

      <p className="text-muted line-clamp-3 mb-10 flex-1 leading-relaxed">{event.description}</p>

      <Link
        href={localizePath(lang, `/evenimente/${event.slug}`)}
        className="inline-flex items-center gap-3 text-primary label-caps group/btn"
      >
        <span>{t.seeDetails}</span>
        <ArrowRight
          size={16}
          className="group-hover/btn:translate-x-1 transition-transform duration-300"
        />
      </Link>
    </motion.div>
  );
}
