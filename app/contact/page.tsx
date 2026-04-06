import type { Metadata } from "next";
import { Mail, Phone, Facebook, Instagram, Youtube } from "lucide-react";
import { PageHeading } from "@/components/PageHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Asociația 5 Sola",
  description:
    "Contactează Asociația 5 Sola — suntem disponibili pentru întrebări despre conferințe, colaborări și resurse teologice. Email, telefon și rețele sociale.",
  keywords: [
    "contact asociatia 5 sola",
    "asociatia 5 sola telefon",
    "asociatia 5 sola email",
    "donatie 5 sola",
    "colaborare teologică",
    "5sola.ro contact",
  ],
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Acasă", item: "https://5sola.ro" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://5sola.ro/contact" },
  ],
};

export default function Contact() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
                    <a href="mailto:asociatia5sola@gmail.com" className="text-2xl font-serif font-bold text-ink hover:text-primary transition-colors duration-300">asociatia5sola@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-8 group">
                  <div className="w-16 h-16 bg-surface-low border border-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 rounded-xs">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="label-caps text-xs text-muted mb-3">Telefon</h4>
                    <a href="tel:+40742215569" className="text-2xl font-serif font-bold text-ink hover:text-primary transition-colors duration-300">+40 742 215 569</a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="label-caps text-primary mb-10 block">Urmărește-ne</span>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.facebook.com/p/5-Sola-100089754032341"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-surface-low border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://www.instagram.com/conferinta5sola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-surface-low border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.youtube.com/@Asociatia5sola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-surface-low border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs"
                >
                  <Youtube size={24} />
                </a>
                <a
                  href="https://wa.me/40742215569"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-surface-low border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href="mailto:asociatia5sola@gmail.com"
                  className="w-14 h-14 bg-surface-low border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 rounded-xs"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </AnimateIn>

          {/* Form — client, uses useState */}
          <ContactForm />
        </div>
      </section>

      {/* Conturi bancare */}
      <section className="bg-surface-low py-12 md:py-20 px-6 mb-12 md:mb-20">
        <div className="max-w-7xl mx-auto">
          <AnimateIn direction="up">
            <div className="mb-10">
              <span className="label-caps text-primary mb-4 block">Susține lucrarea</span>
              <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight">
                Conturi Bancare
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bento-card p-8 md:p-10">
                <p className="label-caps text-muted mb-6">Banca Transilvania · SWIFT: BTRLRO22</p>
                <p className="label-caps text-xs text-muted mb-1">Titular</p>
                <p className="font-serif font-bold text-lg mb-8">ASOCIATIA 5 SOLA</p>
                <div className="space-y-5">
                  {[
                    { currency: "RON", iban: "RO48BTRLRONCRT0CO9567401" },
                    { currency: "EUR", iban: "RO22BTRLEURCRT0CO9567401" },
                    { currency: "USD", iban: "RO34BTRLUSDCRT0CO9567401" },
                  ].map(({ currency, iban }) => (
                    <div key={currency} className="flex items-center justify-between gap-4 py-4 border-t border-outline-variant">
                      <span className="label-caps text-primary w-10 shrink-0">{currency}</span>
                      <span className="font-mono text-sm text-muted tracking-wide break-all">{iban}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bento-card p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <p className="label-caps text-muted mb-4">Donație online</p>
                  <p className="text-lg text-muted leading-relaxed mb-8">
                    Poți dona rapid și sigur prin card bancar via Stripe.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <a
                    href="https://donate.stripe.com/5kAbJ80h2cjM9oY289"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full justify-center py-5"
                  >
                    Donează (RON)
                  </a>
                  <a
                    href="https://donate.stripe.com/3cIdR9aZBgqU9Y03SReAg0a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full justify-center py-5"
                  >
                    Donează (USD)
                  </a>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </div>
    </>
  );
}
