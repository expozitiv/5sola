"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
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
          <h3 className="text-4xl font-serif font-black mb-6 uppercase">Mesaj Trimis!</h3>
          <p className="text-muted text-lg mb-12 leading-relaxed">
            Îți mulțumim pentru mesaj. Echipa noastră te va contacta în cel mai scurt timp posibil.
          </p>
          <button onClick={() => setStatus("idle")} className="btn-outline px-12 py-4">
            Trimite alt mesaj
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="label-caps text-[10px] text-muted">Nume Complet</label>
              <input
                type="text"
                required
                placeholder="Ex: Ioan Popescu"
                className="w-full bg-bg border border-white/5 py-5 px-8 focus:outline-none focus:border-primary transition-all duration-300 text-white placeholder:text-white/10 font-medium"
              />
            </div>
            <div className="space-y-3">
              <label className="label-caps text-[10px] text-muted">Adresă Email</label>
              <input
                type="email"
                required
                placeholder="Ex: ioan@exemplu.ro"
                className="w-full bg-bg border border-white/5 py-5 px-8 focus:outline-none focus:border-primary transition-all duration-300 text-white placeholder:text-white/10 font-medium"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="label-caps text-[10px] text-muted">Subiect</label>
            <input
              type="text"
              required
              placeholder="Cum te putem ajuta?"
              className="w-full bg-bg border border-white/5 py-5 px-8 focus:outline-none focus:border-primary transition-all duration-300 text-white placeholder:text-white/10 font-medium"
            />
          </div>
          <div className="space-y-3">
            <label className="label-caps text-[10px] text-muted">Mesaj</label>
            <textarea
              rows={6}
              required
              placeholder="Scrie mesajul tău aici..."
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
                <span>Trimite Mesajul</span>
                <Send
                  size={22}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </>
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
}
