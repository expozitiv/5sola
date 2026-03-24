"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Youtube } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
  };

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
            Să Păstrăm <span className="text-primary glow-red">Legătura</span>
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-white">
              Ai întrebări despre evenimentele noastre sau vrei să te implici în proiectele
              asociației? Suntem aici să te ascultăm.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              Fie că ești în căutarea unor resurse teologice, vrei să propui o colaborare sau pur și
              simplu dorești să afli mai multe despre noi, nu ezita să ne contactezi prin formularul
              de mai jos.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            <div>
              <span className="label-caps text-primary mb-12 block">Informații de Contact</span>
              <div className="space-y-12">
                <div className="flex items-start gap-8 group">
                  <div className="w-16 h-16 bg-surface-low border border-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 rounded-xs">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="label-caps text-xs text-muted mb-3">Email</h4>
                    <p className="text-2xl font-serif font-bold text-white">contact@5sola.ro</p>
                  </div>
                </div>

                <div className="flex items-start gap-8 group">
                  <div className="w-16 h-16 bg-surface-low border border-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 rounded-xs">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="label-caps text-xs text-muted mb-3">Telefon</h4>
                    <p className="text-2xl font-serif font-bold text-white">+40 700 000 000</p>
                  </div>
                </div>

                <div className="flex items-start gap-8 group">
                  <div className="w-16 h-16 bg-surface-low border border-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 rounded-xs">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="label-caps text-xs text-muted mb-3">Locație</h4>
                    <p className="text-2xl font-serif font-bold text-white">București, România</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="label-caps text-primary mb-10 block">Urmărește-ne</span>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="w-14 h-14 bg-surface-low border border-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs group"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-surface-low border border-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs group"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-surface-low border border-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs group"
                >
                  <Youtube size={24} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
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
                  Îți mulțumim pentru mesaj. Echipa noastră te va contacta în cel mai scurt timp
                  posibil.
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
                  ></textarea>
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
        </div>
      </section>
    </div>
  );
}
