"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Send } from "lucide-react";
import { useDictionary } from "@/lib/i18n/client";

export function ContactForm() {
  const t = useDictionary().contact.form;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mwvwaarz", {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bento-card p-10 md:p-16 bg-surface-low"
    >
      {status === "success" ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-primary flex items-center justify-center text-white mx-auto mb-10 rounded-full shadow-[0_0_50px_rgba(177,31,36,0.3)]">
            <Send size={40} />
          </div>
          <h3 className="text-4xl font-serif font-black mb-6 uppercase">{t.sentTitle}</h3>
          <p className="text-muted text-lg mb-12 leading-relaxed">
            {t.sentText}
          </p>
          <button onClick={() => setStatus("idle")} className="btn-outline px-12 py-4">
            {t.sendAnother}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="label-caps text-[10px] text-muted">{t.name}</label>
              <input
                type="text"
                name="name"
                required
                placeholder={t.namePlaceholder}
                className="w-full bg-bg border border-white/5 py-5 px-8 focus:outline-none focus:border-primary transition-all duration-300 text-white placeholder:text-white/10 font-medium"
              />
            </div>
            <div className="space-y-3">
              <label className="label-caps text-[10px] text-muted">{t.email}</label>
              <input
                type="email"
                name="email"
                required
                placeholder={t.emailPlaceholder}
                className="w-full bg-bg border border-white/5 py-5 px-8 focus:outline-none focus:border-primary transition-all duration-300 text-white placeholder:text-white/10 font-medium"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="label-caps text-[10px] text-muted">{t.subject}</label>
            <input
              type="text"
              name="subject"
              required
              placeholder={t.subjectPlaceholder}
              className="w-full bg-bg border border-white/5 py-5 px-8 focus:outline-none focus:border-primary transition-all duration-300 text-white placeholder:text-white/10 font-medium"
            />
          </div>
          <div className="space-y-3">
            <label className="label-caps text-[10px] text-muted">{t.message}</label>
            <textarea
              rows={6}
              name="message"
              required
              placeholder={t.messagePlaceholder}
              className="w-full bg-bg border border-white/5 py-5 px-8 focus:outline-none focus:border-primary transition-all duration-300 text-white placeholder:text-white/10 font-medium resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full flex items-center justify-center gap-4 py-6 text-lg group"
          >
            {status === "loading" ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full" />
            ) : (
              <>
                <span>{t.submit}</span>
                <Send
                  size={22}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </>
            )}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-sm text-center">
              {t.error}
            </p>
          )}
        </form>
      )}
    </motion.div>
  );
}
