"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import eventsData from "@/data/events.json";
import type { Event } from "@/types";
import { EventCard } from "@/components/EventCard";
import { cn, isEventFuture } from "@/lib/utils";

const events = eventsData as Event[];

export default function Evenimente() {
  const [activeTab, setActiveTab] = useState<"future" | "archive">("future");

  const filteredEvents = events.filter((e) =>
    activeTab === "future" ? isEventFuture(e.endDate) : !isEventFuture(e.endDate)
  );

  return (
    <div className="pt-32">
      {/* Header */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[12vw] md:text-[10vw] font-serif font-black leading-[0.85] tracking-tighter uppercase mb-12"
          >
            Evenimente <span className="text-primary glow-red">&</span> Conferințe
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-ink">
              Explorați conferințele noastre trecute și viitoare, dedicate studiului riguros al
              Scripturii și formării teologice.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              Fiecare eveniment este conceput ca un spațiu de învățare, dialog și închinare,
              aducând împreună vorbitori dedicați și o comunitate pasionată de adevăr.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-start gap-12 mb-20 border-b border-outline-variant">
            <button
              onClick={() => setActiveTab("future")}
              className={cn(
                "pb-6 label-caps text-sm relative transition-colors duration-300",
                activeTab === "future" ? "text-primary" : "text-muted hover:text-ink"
              )}
            >
              Evenimente Viitoare
              {activeTab === "future" && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("archive")}
              className={cn(
                "pb-6 label-caps text-sm relative transition-colors duration-300",
                activeTab === "archive" ? "text-primary" : "text-muted hover:text-ink"
              )}
            >
              Arhivă Evenimente
              {activeTab === "archive" && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bento-card bg-surface-low"
            >
              <p className="text-xl text-muted font-serif italic">
                Momentan nu există evenimente în această categorie.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto bento-card p-12 md:p-24 text-center bg-surface-low">
          <div className="max-w-2xl mx-auto">
            <span className="label-caps text-primary mb-6 block">Rămâi Conectat</span>
            <h3 className="text-4xl md:text-6xl font-serif font-black mb-8 uppercase leading-tight">
              Nu rata niciun <br /> <span className="text-primary">Eveniment</span>
            </h3>
            <p className="text-muted mb-12 text-lg leading-relaxed">
              Abonează-te la newsletter pentru a fi primul care află despre noile conferințe,
              perioadele de înscriere și resursele publicate.
            </p>
            <div className="flex justify-center">
              <Link href="/#newsletter" className="btn-primary px-12 py-5 text-lg">
                Abonează-te acum
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
