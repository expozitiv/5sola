"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EventCard } from "@/components/EventCard";
import { cn, isEventFuture } from "@/lib/utils";
import type { Event } from "@/types";

export function EventsTabSection({ events }: { events: Event[] }) {
  const [activeTab, setActiveTab] = useState<"future" | "archive">("future");

  const filteredEvents = events
    .filter((e) =>
      activeTab === "future" ? isEventFuture(e.endDate) : !isEventFuture(e.endDate)
    )
    .sort((a, b) => {
      const diff = new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      return activeTab === "future" ? -diff : diff;
    });

  return (
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

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

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
  );
}
