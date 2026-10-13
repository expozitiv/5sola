"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { localizePath } from "@/lib/i18n/config";
import { useDictionary, useLocale } from "@/lib/i18n/client";

export default function NotFound() {
  const lang = useLocale();
  const dict = useDictionary();
  const t = dict.notFound;
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
        <span className="label-caps text-primary mb-8 block">{t.label}</span>
        <h1 className="text-[12rem] md:text-[15rem] font-serif font-black leading-none text-primary mb-8 glow-red uppercase tracking-tighter">
          404
        </h1>
        <h2 className="text-4xl md:text-6xl font-serif font-black mb-8 uppercase leading-tight">
          {t.titleA} <br /> <span className="text-primary">{t.titleB}</span>
        </h2>
        <p className="text-muted text-xl mb-12 leading-relaxed font-medium">
          {t.text}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href={localizePath(lang, "/")} className="btn-primary px-12 py-5 text-lg">
            {t.home}
          </Link>
          <Link href={localizePath(lang, "/evenimente")} className="btn-outline px-12 py-5 text-lg">
            {dict.common.seeEvents}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
