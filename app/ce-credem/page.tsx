import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import beliefsData from "@/data/beliefs.json";
import type { Belief } from "@/types";
import { PageHeading } from "@/components/PageHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { BeliefCard } from "./BeliefCard";

const beliefs = beliefsData as Belief[];

const confessionOfFaith = `
# Declarație Doctrinară

Credem că Biblia este Cuvântul inspirat, infailibil și suficient al lui Dumnezeu, autoritatea supremă în toate aspectele credinței și vieții. Credem într-un singur Dumnezeu, existent în trei Persoane: Tatăl, Fiul și Duhul Sfânt. Credem că omul este căzut în păcat și incapabil să se mântuiască prin propriile puteri.

Credem că mântuirea este prin har, prin credință, doar în Isus Cristos, pe baza lucrării Sale desăvârșite. Credem în nașterea din nou, în sfințirea progresivă a credinciosului și în rolul esențial al bisericii locale ca trup al lui Cristos. Așteptăm revenirea lui Cristos și restaurarea finală a tuturor lucrurilor.
`;

export const metadata: Metadata = {
  title: "Ce Credem — Cele 5 Sola ale Reformei",
  description:
    "Explorează fundamentele teologice ale Asociației 5 Sola: Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria — cele 5 Sola ale Reformei Protestante.",
  keywords: [
    "sola scriptura",
    "sola fide",
    "sola gratia",
    "solus christus",
    "soli deo gloria",
    "cele 5 sola",
    "reformă protestantă",
    "mărturisire de credință",
    "teologie reformată",
  ],
  alternates: {
    canonical: "https://5sola.ro/ce-credem",
  },
  openGraph: {
    url: "https://5sola.ro/ce-credem",
    title: "Ce Credem — Cele 5 Sola ale Reformei | 5SOLA.RO",
    description:
      "Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria — fundamentele teologice ale Asociației 5 Sola.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Acasă", item: "https://5sola.ro" },
    { "@type": "ListItem", position: 2, name: "Ce Credem", item: "https://5sola.ro/ce-credem" },
  ],
};

export default function CeCredem() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="pt-20">
      {/* Header */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeading>
            Ce <span className="text-primary glow-red">Credem</span>
          </PageHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <p className="text-xl font-serif italic leading-relaxed text-ink">
              Fundamentele teologice care ne definesc identitatea și misiunea, ancorate în tradiția
              Reformei Protestante.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              Credința noastră nu este una nouă, ci este o reafirmare a adevărurilor biblice care au
              transformat lumea acum 500 de ani și care continuă să fie relevante pentru omul
              contemporan.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Solas Grid — client, each card uses whileInView */}
      <section className="px-6 mb-12 md:mb-20 lg:mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-16 lg:mb-20">
            <span className="label-caps text-primary mb-6 block">Pilonii Reformei</span>
            <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
              Cele 5 <br /> <span className="text-primary">Sola</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map((belief, index) => (
              <BeliefCard key={belief.id} belief={belief} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Confession of Faith */}
      <section className="bg-surface-low py-12 md:py-20 lg:py-32 px-6 mb-12 md:mb-20 lg:mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 md:mb-16 lg:mb-20 text-center">
            <span className="label-caps text-primary mb-6 block">Document Doctrinar</span>
            <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
              Mărturisirea <br /> <span className="text-primary">Noastră</span>
            </h2>
          </div>
          <AnimateIn
            direction="scale"
            className="bg-bg p-8 md:p-16 lg:p-24 border border-outline-variant shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 font-serif text-[20rem] font-black text-ink/[0.04] leading-none select-none pointer-events-none -translate-y-20 translate-x-20">
              S
            </div>
            <div className="markdown-body relative z-10">
              <ReactMarkdown>{confessionOfFaith}</ReactMarkdown>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 mb-12 md:mb-20 lg:mb-32">
        <div className="max-w-7xl mx-auto bento-card p-8 md:p-16 lg:p-24 text-center bg-primary/5 border-primary/20">
          <h2 className="text-4xl md:text-6xl font-serif font-black mb-8 uppercase leading-tight">
            Vrei să aprofundezi <br /> <span className="text-primary">Aceste Adevăruri?</span>
          </h2>
          <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
            Dacă ai întrebări despre mărturisirea noastră de credință sau vrei să porți un dialog
            pe teme teologice, suntem aici pentru tine.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/contact" className="btn-primary px-12 py-5 text-lg">
              Contactează-ne
            </Link>
            <Link href="/evenimente" className="btn-outline px-12 py-5 text-lg">
              Vezi Evenimente
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
