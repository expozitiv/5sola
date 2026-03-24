"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ChevronRight, Play, Calendar } from "lucide-react";
import eventsData from "@/data/events.json";
import { EventCard } from "@/components/EventCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { BiblicalQuote } from "@/components/BiblicalQuote";
import type { Event } from "@/types";
import { isEventFuture, formatDateRange } from "@/lib/utils";

const events = eventsData as Event[];
const hasFutureEvents = events.some((e) => isEventFuture(e.endDate));
const featuredEvent = hasFutureEvents
  ? events.find((e) => isEventFuture(e.endDate))!
  : [...events].sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())[0];
const upcomingEvents = events.filter((e) => e.id !== featuredEvent.id).slice(0, 3);

export function HomeContent() {
  return (
    <div className="pt-20">
      {/* Hero Section - Featured Event */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-surface-low">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/sola/1920/1080?blur=4"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 label-caps mb-8">
              <span className="w-12 h-[1px] bg-primary" />
              <span className="text-primary">
                {hasFutureEvents ? "Evenimentul curent" : "Ultimul eveniment"}
              </span>
            </div>
            {!hasFutureEvents && (
              <p className="text-sm text-muted mb-6 italic">
                Nu avem evenimente programate în acest moment. Poți urmări înregistrările evenimentului anterior.
              </p>
            )}
            <h1 className="text-6xl md:text-9xl mb-8 leading-[0.85] font-black glow-red tracking-tight">
              {featuredEvent.title}
            </h1>
            <p className="text-xl text-muted mb-12 max-w-lg leading-relaxed font-medium">
              {featuredEvent.description}
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href={`/evenimente/${featuredEvent.slug}`} className="btn-primary">
                {hasFutureEvents ? (
                  <>
                    <span>Înscrie-te acum</span>
                    <ArrowRight className="ml-2" size={16} />
                  </>
                ) : (
                  <>
                    <span>Urmărește Înregistrările</span>
                    <Play className="ml-2" size={16} fill="currentColor" />
                  </>
                )}
              </Link>
              <Link href="/cine-suntem" className="btn-outline">
                <span>Află mai multe</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="aspect-[4/5] bg-surface-high p-4 relative group rounded-lg">
              <img
                src="https://picsum.photos/seed/event/800/1000"
                alt="Featured Event"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-all duration-700 rounded-sm"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(177,31,36,0.5)]">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
            </div>
            {/* Floating Info Box */}
            <div className="absolute -bottom-10 -left-10 bg-primary p-10 text-white max-w-xs shadow-2xl rounded-xs">
              <div className="flex items-center gap-2 label-caps mb-4 text-white/80">
                <Calendar size={14} />
                <span>{formatDateRange(featuredEvent.startDate, featuredEvent.endDate)}</span>
              </div>
              <h3 className="font-serif text-3xl leading-tight mb-4 font-black">
                {featuredEvent.location}
              </h3>
              <p className="text-sm opacity-90 leading-relaxed">
                O zi dedicată studiului aprofundat al Scripturii și părtășiei creștine.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cine Suntem Preview */}
      <section className="py-40 bg-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="aspect-square bg-surface-high overflow-hidden rounded-lg"
              >
                <img
                  src="https://picsum.photos/seed/1/600/600"
                  alt="Gallery 1"
                  className="w-full h-full object-cover grayscale opacity-40 hover:opacity-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="aspect-square bg-surface-high overflow-hidden mt-16 rounded-lg"
              >
                <img
                  src="https://picsum.photos/seed/2/600/600"
                  alt="Gallery 2"
                  className="w-full h-full object-cover grayscale opacity-40 hover:opacity-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
            {/* Decorative Text */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 font-serif font-black text-[15vw] text-ink/[0.04] pointer-events-none select-none uppercase">
              SOLA
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="label-caps mb-6 text-primary">Misiunea noastră</div>
            <h2 className="text-5xl md:text-7xl mb-10 font-black leading-tight">Cine suntem?</h2>
            <p className="text-xl text-muted mb-8 leading-relaxed font-medium">
              Asociația Sola Scriptura este o comunitate de credincioși dedicați promovării
              teologiei reformate și a valorilor creștine fundamentale în societatea românească.
            </p>
            <p className="text-muted mb-12 leading-relaxed">
              Credem că o întoarcere la Scriptură este singura cale spre o viață creștină autentică
              și o biserică sănătoasă. Organizăm conferințe, publicăm resurse și facilităm dialogul
              teologic între diverse tradiții creștine.
            </p>
            <Link
              href="/cine-suntem"
              className="group inline-flex items-center gap-3 text-primary label-caps text-sm"
            >
              <span>Descoperă misiunea noastră</span>
              <ChevronRight
                className="group-hover:translate-x-2 transition-transform duration-300"
                size={18}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Biblical Quote */}
      <section className="py-20 bg-surface-low">
        <div className="max-w-7xl mx-auto px-6">
          <BiblicalQuote
            text="Căci prin har ați fost mântuiți, prin credință. Și aceasta nu vine de la voi, ci este darul lui Dumnezeu."
            reference="Efeseni 2:8"
          />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-40 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
            <div>
              <div className="label-caps mb-6 text-primary">Calendar</div>
              <h2 className="text-5xl md:text-7xl font-black mb-6">Evenimente viitoare</h2>
              <p className="text-muted max-w-xl text-lg font-medium">
                Alătură-te nouă la următoarele evenimente pentru a explora împreună profunzimile
                teologiei creștine.
              </p>
            </div>
            <Link href="/evenimente" className="btn-outline">
              <span>Vezi toate evenimentele</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-40 bg-surface-low border-y border-outline-variant">
        <div className="max-w-7xl mx-auto px-6">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
