import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import eventsData from "@/data/events.json";
import type { Event } from "@/types";
import { isEventFuture, isRegistrationOpen } from "@/lib/utils";
import { HomeHeroSection } from "./HomeHeroSection";
import { AnimateIn } from "@/components/AnimateIn";
import { EventCard } from "@/components/EventCard";
import { BiblicalQuote } from "@/components/BiblicalQuote";
import { NewsletterForm } from "@/components/NewsletterForm";

const events = eventsData as Event[];
const hasFutureEvents = events.some((e) => isEventFuture(e.endDate));
const featuredEvent = hasFutureEvents
  ? events.find((e) => isEventFuture(e.endDate))!
  : [...events].sort(
      (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
    )[0];
const upcomingEvents = hasFutureEvents
  ? events
      .filter((e) => isEventFuture(e.endDate) && e.id !== featuredEvent.id)
      .slice(0, 3)
  : [...events]
      .filter((e) => e.id !== featuredEvent.id)
      .sort(
        (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
      )
      .slice(0, 3);

export const metadata: Metadata = {
  title: {
    absolute:
      "5SOLA.RO — Conferințe Biblice & Resurse Teologice în Spiritul Reformei",
  },
  description:
    "Asociația 5 Sola organizează conferințe biblice și oferă resurse teologice ancorate în cele 5 Sola ale Reformei Protestante. Alătură-te comunității reformate din România.",
  alternates: {
    canonical: "https://5sola.ro",
  },
  openGraph: {
    url: "https://5sola.ro",
    title: "5SOLA.RO — Conferințe Biblice & Resurse Teologice",
    description:
      "Asociația 5 Sola organizează conferințe biblice și resurse teologice ancorate în Reforma Protestantă.",
  },
};

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero — client, uses animate */}
      <HomeHeroSection
        event={featuredEvent}
        hasFutureEvents={hasFutureEvents}
        registrationOpen={isRegistrationOpen(featuredEvent.registrationDeadline)}
      />

      {/* Cine Suntem Preview */}
      <section className="py-16 md:py-28 lg:py-32 bg-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-8">
              <AnimateIn className="aspect-square bg-surface-high overflow-hidden rounded-lg">
                <img
                  src="/images/main1.jpg"
                  alt="Gallery 1"
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </AnimateIn>
              <AnimateIn
                className="aspect-square bg-surface-high overflow-hidden mt-16 rounded-lg"
                delay={0.1}
              >
                <img
                  src="/images/main2.jpg"
                  alt="Gallery 2"
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </AnimateIn>
            </div>
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 font-serif font-black text-[15vw] text-ink/[0.04] pointer-events-none select-none uppercase">
              SOLA
            </div>
          </div>

          <AnimateIn direction="right" className="order-1 lg:order-2">
            <div className="label-caps mb-6 text-primary">Misiunea noastră</div>
            <h2 className="text-5xl md:text-7xl mb-10 font-black leading-tight">
              Cine suntem?
            </h2>
            <p className="text-xl text-muted mb-8 leading-relaxed font-medium">
              5 Sola e o inițiativă creată pentru a sprijini Biserica lui
              Cristos. Ne propunem să organizăm conferințe biblice și să oferim
              resurse teologice care să ajute credincioșii să înțeleagă mai bine
              Sfânta Scriptură și să crească în credință.
            </p>
            <p className="text-muted mb-12 leading-relaxed">
              Motto-ul nostru, „În sprijinul Bisericii", reflectă angajamentul
              nostru de a fi alături de bisericile locale și de credincioși,
              oferindu-le resurse și învățături bazate pe principiile Reformei.
              Prin conferințele noastre aducem vorbitori cu experiență și
              cunoștințe biblice solide, care să îmbogățească viața spirituală a
              comunităților. Ne bucurăm să fim instrumente în mâna lui Dumnezeu
              pentru edificarea Trupului lui Cristos.
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
          </AnimateIn>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-surface-low">
        <div className="max-w-7xl mx-auto px-6">
          <BiblicalQuote
            text="Căci prin har ați fost mântuiți, prin credință. Și aceasta nu vine de la voi, ci este darul lui Dumnezeu."
            reference="Efeseni 2:8"
          />
        </div>
      </section>

      <section className="py-16 md:py-28 lg:py-32 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-10 md:mb-16 lg:mb-20">
            <div>
              <div className="label-caps mb-6 text-primary">Calendar</div>
              <h2 className="text-5xl md:text-7xl font-black mb-6">
                {hasFutureEvents ? "Evenimente viitoare" : "Evenimente recente"}
              </h2>
              <p className="text-muted max-w-xl text-lg font-medium">
                {hasFutureEvents
                  ? "Alătură-te nouă la următoarele evenimente pentru a explora împreună profunzimile teologiei creștine."
                  : "Explorează conferințele noastre anterioare și resursele teologice disponibile."}
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
    </div>
  );
}
