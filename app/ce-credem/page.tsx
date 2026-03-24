"use client";
import { motion } from "motion/react";
import Link from "next/link";
import beliefsData from "@/data/beliefs.json";
import type { Belief } from "@/types";
import ReactMarkdown from "react-markdown";

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

export default function CeCredem() {
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
            Ce <span className="text-primary glow-red">Credem</span>
          </motion.h1>
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

      {/* The 5 Solas Grid */}
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
              <motion.div
                key={belief.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bento-card p-12 flex flex-col justify-between min-h-[450px] group"
              >
                <div>
                  <div className="text-primary font-mono text-sm mb-8">0{index + 1}</div>
                  <h3 className="text-4xl font-serif font-black mb-6 group-hover:text-primary transition-colors">
                    {belief.title}
                  </h3>
                  <p className="text-xl font-serif italic mb-8 leading-tight text-ink">
                    {belief.description}
                  </p>
                </div>
                <p className="text-muted leading-relaxed">{belief.longDescription}</p>
              </motion.div>
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

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-bg p-12 md:p-24 border border-outline-variant shadow-2xl relative overflow-hidden"
          >
            {/* Decorative watermark */}
            <div className="absolute top-0 right-0 font-serif text-[20rem] font-black text-ink/[0.04] leading-none select-none pointer-events-none -translate-y-20 translate-x-20">
              S
            </div>

            <div className="markdown-body relative z-10">
              <ReactMarkdown>{confessionOfFaith}</ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
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
