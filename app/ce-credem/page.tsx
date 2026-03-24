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
# Mărturisirea de Credință

## I. Despre Sfânta Scriptură
Credem că Sfânta Scriptură este singura regulă infailibilă de credință și practică. Ea este Cuvântul inspirat al lui Dumnezeu, inerent în manuscrisele originale și suficient pentru mântuire.

## II. Despre Dumnezeu
Credem într-un singur Dumnezeu viu și adevărat, care există veșnic în trei persoane: Tatăl, Fiul și Duhul Sfânt. Acești trei sunt un singur Dumnezeu, egali în putere și glorie.

## III. Despre Om și Păcat
Credem că omul a fost creat după chipul lui Dumnezeu, dar prin cădere a ajuns într-o stare de depravare totală, fiind incapabil să se salveze singur.

## IV. Despre Mântuire
Credem că mântuirea este exclusiv prin harul lui Dumnezeu, prin credința în Hristos singur. Hristos a murit ca substitut pentru păcătoși, satisfăcând dreptatea lui Dumnezeu.

## V. Despre Biserică
Credem că Biserica este trupul lui Hristos, formată din toți cei care au fost regenerați de Duhul Sfânt prin credința în Evanghelie.
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

export default function CeCredem() {
  return (
    <div className="pt-32">
      {/* Header */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <PageHeading>
            Ce <span className="text-primary glow-red">Credem</span>
          </PageHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-ink">
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
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
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
      <section className="bg-surface-low py-32 px-6 mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 text-center">
            <span className="label-caps text-primary mb-6 block">Document Doctrinar</span>
            <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
              Mărturisirea <br /> <span className="text-primary">Noastră</span>
            </h2>
          </div>
          <AnimateIn
            direction="scale"
            className="bg-bg p-12 md:p-24 border border-outline-variant shadow-2xl relative overflow-hidden"
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
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto bento-card p-12 md:p-24 text-center bg-primary/5 border-primary/20">
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
  );
}
