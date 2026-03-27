"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate API call to Brevo
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="label-caps mb-6 text-primary">Newsletter</div>
      <h3 className="font-serif text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-8 leading-tight">
        Rămâi conectat
      </h3>
      <p className="text-muted mb-8 md:mb-10 text-lg md:text-xl leading-relaxed font-medium">
        Abonează-te la newsletter-ul nostru pentru a primi noutăți despre evenimente, conferințe și
        resurse teologice.
      </p>

      <form onSubmit={handleSubmit} className="relative group max-w-xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="relative">
            <Mail
              className="absolute left-6 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors duration-300"
              size={20}
            />
            <input
              type="email"
              placeholder="Adresa ta de email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-low border border-outline-variant py-5 pl-16 pr-6 focus:outline-none focus:border-primary transition-all duration-300 text-ink placeholder:text-muted/40 rounded-xs"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {status === "loading" ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
            ) : status === "success" ? (
              <>
                <CheckCircle2 size={20} />
                <span>Te-ai abonat</span>
              </>
            ) : (
              <>
                <span>Abonează-te acum</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>

        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-primary flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={16} />
            <span>Te-ai abonat cu succes! Verifică-ți email-ul.</span>
          </motion.p>
        )}

        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-red-500 flex items-center justify-center gap-2"
          >
            <AlertCircle size={16} />
            <span>A apărut o eroare. Te rugăm să încerci mai târziu.</span>
          </motion.p>
        )}
      </form>
    </div>
  );
}
