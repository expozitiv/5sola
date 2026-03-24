"use client";
import { motion } from "motion/react";
import teamData from "@/data/team.json";
import type { TeamMember } from "@/types";
import { BiblicalQuote } from "@/components/BiblicalQuote";

const team = teamData as TeamMember[];

export default function CineSuntem() {
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
            Cine <span className="text-primary glow-red">Suntem</span>
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-ink">
              Suntem o comunitate dedicată redescoperirii și trăirii adevărurilor fundamentale ale
              credinței creștine, așa cum au fost ele reafirmate în timpul Reformei.
            </p>
            <div className="flex flex-col gap-6 text-muted text-lg leading-relaxed">
              <p>
                Asociația Sola Scriptura s-a născut din dorința de a oferi un spațiu de dialog și
                formare pentru cei care caută o ancoră solidă în Cuvântul lui Dumnezeu. Într-o lume
                a relativismului, noi credem în autoritatea absolută a Scripturii.
              </p>
              <p>
                Prin evenimentele, resursele și comunitatea noastră, urmărim să echipăm creștinii
                pentru o viață de integritate, închinare și slujire, spre slava lui Dumnezeu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Bento Style */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bento-card p-12 md:p-20 flex flex-col justify-between min-h-[400px]">
            <div>
              <span className="label-caps text-primary mb-6 block">Misiunea Noastră</span>
              <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 leading-tight">
                Să proclamăm centralitatea lui Hristos în toate aspectele vieții.
              </h2>
            </div>
            <p className="text-muted text-lg">
              Ne propunem să fim o voce clară în peisajul spiritual românesc, promovând o teologie
              biblică robustă care transformă mintea și inima.
            </p>
          </div>
          <div className="bento-card p-12 md:p-20 flex flex-col justify-between min-h-[400px] bg-surface-low">
            <div>
              <span className="label-caps text-secondary mb-6 block">Viziunea Noastră</span>
              <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 leading-tight">
                O generație ancorată în Scriptură și pasionată de slava lui Dumnezeu.
              </h2>
            </div>
            <p className="text-muted text-lg">
              Vedem o biserică revitalizată prin întoarcerea la izvoarele credinței, capabilă să
              răspundă provocărilor contemporane cu înțelepciune și curaj.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-low py-32 px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="label-caps text-primary mb-6 block">Valorile Noastre</span>
              <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
                Pilonii <br /> <span className="text-primary">Credinței</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Integritate", desc: "Trăim în conformitate cu adevărul pe care îl proclamăm, în orice context." },
              { title: "Excelență", desc: "Căutăm să oferim ce avem mai bun în tot ceea ce facem, pentru slava Lui." },
              { title: "Comunitate", desc: "Credem în puterea relațiilor autentice și a sprijinului reciproc în credință." },
              { title: "Educație", desc: "Investim în formarea continuă a minții prin studiul riguros al Scripturii." },
              { title: "Slujire", desc: "Suntem chemați să fim mâinile și picioarele lui Hristos în lume." },
              { title: "Închinare", desc: "Întreaga noastră viață este un act de recunoștință înaintea Creatorului." },
            ].map((value, idx) => (
              <div key={idx} className="group">
                <div className="text-primary font-mono text-sm mb-4">0{idx + 1}</div>
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

      {/* Team */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="label-caps text-primary mb-6 block">Echipa</span>
            <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
              Oameni cu <br /> <span className="text-primary">Viziune</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <motion.div key={member.id} whileHover={{ y: -10 }} className="group">
                <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-low relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-1">{member.name}</h3>
                <p className="label-caps text-xs text-primary">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Biblical Quote */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <BiblicalQuote
            text="Sfințește-i prin adevărul Tău: Cuvântul Tău este adevărul."
            reference="Ioan 17:17"
          />
        </div>
      </section>
    </div>
  );
}
