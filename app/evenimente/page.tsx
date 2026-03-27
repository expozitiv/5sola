import type { Metadata } from "next";
import Link from "next/link";
import eventsData from "@/data/events.json";
import type { Event } from "@/types";
import { PageHeading } from "@/components/PageHeading";
import { EventsTabSection } from "./EventsTabSection";

const events = eventsData as Event[];

export const metadata: Metadata = {
  title: "Evenimente & Conferințe Biblice",
  description:
    "Conferințe biblice organizate de Asociația 5 Sola în România. Explorează evenimentele viitoare și arhiva conferințelor trecute dedicate teologiei reformate.",
  keywords: [
    "conferințe biblice românia",
    "conferință teologică",
    "conferință reformată",
    "5 sola conferință",
    "asociatia 5 sola evenimente",
    "conferinte crestine",
    "teologie reformată conferință",
    "studiu biblic conferință",
  ],
  alternates: {
    canonical: "https://5sola.ro/evenimente",
  },
  openGraph: {
    url: "https://5sola.ro/evenimente",
    title: "Evenimente & Conferințe Biblice | 5SOLA.RO",
    description:
      "Conferințe biblice în România cu vorbitori de renume internațional, dedicate studiului Scripturii și teologiei reformate.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Acasă", item: "https://5sola.ro" },
    { "@type": "ListItem", position: 2, name: "Evenimente", item: "https://5sola.ro/evenimente" },
  ],
};

export default function Evenimente() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="pt-20">
      {/* Header */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeading>
            Evenimente <span className="text-primary glow-red">&</span> Conferințe
          </PageHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <p className="text-xl font-serif italic leading-relaxed text-ink">
              Explorați conferințele noastre trecute și viitoare, dedicate studiului riguros al
              Scripturii și formării teologice.
            </p>
            <p className="text-muted leading-relaxed">
              Fiecare eveniment este conceput ca un spațiu de învățare, dialog și închinare,
              aducând împreună vorbitori dedicați și o comunitate pasionată de adevăr.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs + events grid — client, uses useState */}
      <EventsTabSection events={events} />

      {/* Newsletter CTA */}
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
    </>
  );
}
