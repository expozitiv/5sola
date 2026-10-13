export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { isEventFuture } from "@/lib/utils";
import { HomeHeroSection } from "./HomeHeroSection";
import { AnimateIn } from "@/components/AnimateIn";
import { EventCard } from "@/components/EventCard";
import { BiblicalQuote } from "@/components/BiblicalQuote";
import { NewsletterForm } from "@/components/NewsletterForm";
import { absoluteUrl, localizePath, pageAlternates, toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { getEvents } from "@/lib/i18n/content";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).home;
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDescription,
    alternates: pageAlternates(lang, "/"),
    openGraph: {
      url: absoluteUrl(lang, "/"),
      title: t.ogTitle,
      description: t.ogDescription,
    },
  };
}

export default async function Home({ params }: Props) {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).home;
  const events = getEvents(lang);

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
        .sort(
          (a, b) =>
            new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
        )
        .slice(0, 3);

  return (
    <div className="pt-20">
      {/* Hero — client, uses animate */}
      <HomeHeroSection
        event={featuredEvent}
        hasFutureEvents={hasFutureEvents}
      />

      {/* Cine Suntem Preview */}
      <section className="py-16 md:py-28 lg:py-32 bg-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-8">
              <AnimateIn className="aspect-square bg-surface-high overflow-hidden rounded-lg">
                <img
                  src="/images/main1.jpg"
                  alt={`${t.galleryAlt} 1`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </AnimateIn>
              <AnimateIn
                className="aspect-square bg-surface-high overflow-hidden mt-16 rounded-lg"
                delay={0.1}
              >
                <img
                  src="/images/main2.jpg"
                  alt={`${t.galleryAlt} 2`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </AnimateIn>
            </div>
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 font-serif font-black text-[15vw] text-ink/[0.04] pointer-events-none select-none uppercase">
              SOLA
            </div>
          </div>

          <AnimateIn direction="right" className="order-1 lg:order-2">
            <div className="label-caps mb-6 text-primary">{t.missionLabel}</div>
            <h2 className="text-5xl md:text-7xl mb-10 font-black leading-tight">
              {t.aboutTitle}
            </h2>
            <p className="text-xl text-muted mb-8 leading-relaxed font-medium">
              {t.aboutLead}
            </p>
            <p className="text-muted mb-12 leading-relaxed">{t.aboutBody}</p>
            <Link
              href={localizePath(lang, "/cine-suntem")}
              className="group inline-flex items-center gap-3 text-primary label-caps text-sm"
            >
              <span>{t.aboutCta}</span>
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
          <BiblicalQuote text={t.quoteText} reference={t.quoteRef} />
        </div>
      </section>

      <section className="py-16 md:py-28 lg:py-32 bg-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-10 md:mb-16 lg:mb-20">
            <div>
              <div className="label-caps mb-6 text-primary">{t.calendarLabel}</div>
              <h2 className="text-5xl md:text-7xl font-black mb-6">
                {hasFutureEvents ? t.upcomingTitle : t.recentTitle}
              </h2>
              <p className="text-muted max-w-xl text-lg font-medium">
                {hasFutureEvents ? t.upcomingText : t.recentText}
              </p>
            </div>
            <Link href={localizePath(lang, "/evenimente")} className="btn-outline">
              <span>{t.allEvents}</span>
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
