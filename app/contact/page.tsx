import type { Metadata } from "next";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { PageHeading } from "@/components/PageHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează Asociația 5 Sola — suntem disponibili pentru întrebări despre conferințe, colaborări și resurse teologice. Email, telefon și rețele sociale.",
  alternates: {
    canonical: "https://5sola.ro/contact",
  },
  openGraph: {
    url: "https://5sola.ro/contact",
    title: "Contact | 5SOLA.RO",
    description:
      "Contactează Asociația 5 Sola pentru întrebări despre conferințe biblice, colaborări sau resurse teologice.",
  },
};

export default function Contact() {
  return (
    <div className="pt-32">
      {/* Header */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <PageHeading>
            Să Păstrăm <span className="text-primary glow-red">Legătura</span>
          </PageHeading>
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
          {/* Contact Info — server-rendered, animated in via AnimateIn */}
          <AnimateIn direction="left" className="space-y-16">
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
          </AnimateIn>

          {/* Form — client, uses useState */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
