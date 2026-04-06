import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { TeamMemberCard } from "./TeamMemberCard";
import { BiblicalQuote } from "@/components/BiblicalQuote";
import teamData from "@/data/team.json";
import type { TeamMember } from "@/types";

const team = teamData as TeamMember[];

export const metadata: Metadata = {
  title: "Cine Suntem — Misiune & Echipă",
  description:
    "Descoperă echipa și misiunea Asociației 5 Sola — o comunitate dedicată redescoperirii adevărurilor Reformei Protestante în România. Valori, viziune și oameni cu chemare.",
  keywords: [
    "asociatia 5 sola",
    "cine suntem",
    "misiune crestina romania",
    "echipa 5 sola",
    "teologie reformată românia",
    "comunitate reformată",
    "reforma protestantă",
    "sola scriptura romania",
  ],
  alternates: {
    canonical: "https://5sola.ro/cine-suntem",
  },
  openGraph: {
    url: "https://5sola.ro/cine-suntem",
    title: "Cine Suntem | 5SOLA.RO",
    description:
      "Descoperă echipa și misiunea Asociației 5 Sola — comunitate reformată dedicată autorității Scripturii și centralității lui Hristos.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Acasă",
      item: "https://5sola.ro",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Cine Suntem",
      item: "https://5sola.ro/cine-suntem",
    },
  ],
};

export default function CineSuntem() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="pt-20">
        {/* Header */}
        <section className="px-6 mb-12">
          <div className="max-w-7xl mx-auto">
            <PageHeading>
              Cine <span className="text-primary glow-red">Suntem</span>
            </PageHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <p className="text-xl font-serif italic leading-relaxed text-ink">
                Asociația 5 Sola a luat naștere din dorința unor păstori și
                slujitori de a răspunde nevoii reale din bisericile evanghelice
                din România: nevoia de învățătură teologică clară și ancorată în
                Scriptură.
              </p>
              <div className="flex flex-col gap-6 text-muted text-lg leading-relaxed">
                <p>
                  Uniți în jurul principiilor Reformei — cele cinci „sola" — ne
                  dorim să echipăm credincioșii, să susținem bisericile locale
                  și să promovăm o proclamare fidelă a Evangheliei. Prin
                  conferințe, resurse și inițiative teologice, urmărim formarea
                  unei generații ancorate în Cuvântul lui Dumnezeu.
                </p>
                <p>
                  Am început în anul 2022 printr-o tabără teologică cu tema
                  „Cele 5 Sola ale Reformei", urmând ca din 2023 să avem în mod
                  constant o conferință națională, o conferință regională și o
                  conferință în diaspora.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="px-6 mb-12 md:mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bento-card p-8 md:p-12 lg:p-20 flex flex-col justify-between min-h-0 md:min-h-[400px]">
              <div>
                <span className="label-caps text-primary mb-6 block">
                  Misiunea Noastră
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 leading-tight">
                  Echipăm credincioșii și întărim biserica locală prin
                  învățătură biblică fidelă.
                </h2>
              </div>
              <p className="text-muted text-lg">
                Prin conferințe, resurse și inițiative teologice, slujim
                bisericile locale și promovăm o proclamare fidelă a Evangheliei
                în România și în diaspora.
              </p>
            </div>
            <div className="bento-card p-8 md:p-12 lg:p-20 flex flex-col justify-between min-h-0 md:min-h-[400px] bg-surface-low">
              <div>
                <span className="label-caps text-secondary mb-6 block">
                  Viziunea Noastră
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 leading-tight">
                  O generație formată doctrinar, ancorată în Scriptură și
                  dedicată proclamării clare a Evangheliei.
                </h2>
              </div>
              <p className="text-muted text-lg">
                Vedem o biserică revitalizată prin întoarcerea la adevărurile
                esențiale ale credinței creștine, capabilă să răspundă
                provocărilor contemporane cu curaj și înțelepciune.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-surface-low py-12 md:py-20 lg:py-32 px-6 mb-12 md:mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 lg:mb-20 gap-8">
              <div className="max-w-2xl">
                <span className="label-caps text-primary mb-6 block">
                  Valorile Noastre
                </span>
                <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
                  Pilonii <br /> <span className="text-primary">Lucrării</span>
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  title: "Autoritatea Scripturii",
                  desc: "Biblia este Cuvântul lui Dumnezeu — singura autoritate infailibilă pentru credință și viață.",
                },
                {
                  title: "Claritatea Evangheliei",
                  desc: "Evanghelia mântuirii prin har, prin credință, doar în Cristos trebuie proclamată fără compromis.",
                },
                {
                  title: "Centralitatea lui Cristos",
                  desc: "Isus Cristos este centrul Scripturii, al mântuirii și al întregii vieți creștine.",
                },
                {
                  title: "Sfințenia vieții",
                  desc: "Credința autentică produce o viață transformată, separată de lume și dedicată lui Dumnezeu.",
                },
                {
                  title: "Biserica locală",
                  desc: "Biserica locală este instituția rânduită de Dumnezeu pentru creșterea și misiunea credincioșilor.",
                },
              ].map((value, idx) => (
                <div key={idx} className="group">
                  <div className="text-primary font-mono text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{value.desc}</p>
                  <div className="h-px bg-outline-variant mt-8 group-hover:bg-primary/30 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team — client, uses whileHover */}
        <section className="px-6 mb-12 md:mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-16 lg:mb-20">
              <span className="label-caps text-primary mb-6 block">Echipa</span>
              <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
                Oameni cu <br /> <span className="text-primary">Viziune</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 mb-12 md:mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto">
            <BiblicalQuote
              text="Sfințește-i prin adevărul Tău: Cuvântul Tău este adevărul."
              reference="Ioan 17:17"
            />
          </div>
        </section>
      </div>
    </>
  );
}
