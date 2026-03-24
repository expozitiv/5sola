"use client";
import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6 bg-bg relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <span className="font-serif font-black text-[40vw] leading-none uppercase select-none">
          Sola
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-2xl"
      >
        <span className="label-caps text-primary mb-8 block">Eroare 404</span>
        <h1 className="text-[12rem] md:text-[15rem] font-serif font-black leading-none text-primary mb-8 glow-red uppercase tracking-tighter">
          404
        </h1>
        <h2 className="text-4xl md:text-6xl font-serif font-black mb-8 uppercase leading-tight">
          Pagina nu a fost <br /> <span className="text-primary">Găsită</span>
        </h2>
        <p className="text-muted text-xl mb-12 leading-relaxed font-medium">
          Ne pare rău, dar pagina pe care o cauți nu există sau a fost mutată.
          Te rugăm să te întorci la pagina principală.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/" className="btn-primary px-12 py-5 text-lg">
            Pagina Principală
          </Link>
          <Link href="/evenimente" className="btn-outline px-12 py-5 text-lg">
            Vezi Evenimente
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
