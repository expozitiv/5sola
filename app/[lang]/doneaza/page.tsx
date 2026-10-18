import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard, Landmark, ExternalLink, MessageCircle } from "lucide-react";
import { PageHeading } from "@/components/PageHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { BiblicalQuote } from "@/components/BiblicalQuote";
import { CopyButton } from "@/components/CopyButton";
import { bankDetails, stripeDonationLinks } from "@/lib/donations";
import { absoluteUrl, localizePath, pageAlternates, toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { breadcrumbJsonLd } from "@/lib/i18n/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).donate;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.keywords,
    alternates: pageAlternates(lang, "/doneaza"),
    openGraph: {
      url: absoluteUrl(lang, "/doneaza"),
      title: t.ogTitle,
      description: t.ogDescription,
    },
  };
}

export default async function Doneaza({ params }: Props) {
  const lang = toLocale((await params).lang);
  const dict = getDictionary(lang);
  const t = dict.donate;
  const breadcrumb = breadcrumbJsonLd(lang, [{ name: t.breadcrumb, path: "/doneaza" }]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="pt-20">
        {/* Header */}
        <section className="px-6 mb-12 md:mb-16">
          <div className="max-w-7xl mx-auto">
            <PageHeading>
              {t.headingA} <span className="text-primary glow-red">{t.headingB}</span>
            </PageHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <p className="text-xl font-serif italic leading-relaxed text-ink">{t.lead}</p>
              <p className="text-muted text-lg leading-relaxed">{t.body}</p>
            </div>
          </div>
        </section>

        {/* Donation options */}
        <section className="px-6 mb-12 md:mb-20 lg:mb-32">
          <AnimateIn
            direction="up"
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* Online (Stripe) */}
            <div className="lg:col-span-2 bento-card p-8 md:p-10 bg-primary/5 border-primary/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="text-primary" size={22} />
                  <span className="label-caps text-primary">{t.onlineLabel}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-black mb-4 leading-tight">
                  {t.onlineTitle}
                </h2>
                <p className="text-muted text-lg leading-relaxed mb-10">{t.onlineText}</p>
              </div>
              <div className="flex flex-col gap-4">
                {stripeDonationLinks.map(({ currency, url }, i) => (
                  <a
                    key={currency}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${i === 0 ? "btn-primary" : "btn-outline"} w-full justify-center py-5`}
                  >
                    <span>{t.donateIn(currency)}</span>
                    <ExternalLink className="ml-2" size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Bank transfer */}
            <div className="lg:col-span-3 bento-card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <Landmark className="text-primary" size={22} />
                <span className="label-caps text-primary">{t.bankLabel}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-black mb-4 leading-tight">
                {t.bankTitle}
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-8">{t.bankText}</p>

              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div>
                  <dt className="label-caps text-xs text-muted mb-1">{t.holder}</dt>
                  <dd className="font-serif font-bold text-lg">{bankDetails.holder}</dd>
                </div>
                <div>
                  <dt className="label-caps text-xs text-muted mb-1">{t.bank}</dt>
                  <dd className="font-serif font-bold text-lg">{bankDetails.bank}</dd>
                </div>
                <div>
                  <dt className="label-caps text-xs text-muted mb-1">{t.swift}</dt>
                  <dd className="font-mono font-bold text-lg flex items-center gap-3">
                    {bankDetails.swift}
                    <CopyButton value={bankDetails.swift} />
                  </dd>
                </div>
              </dl>

              <div>
                {bankDetails.accounts.map(({ currency, iban }) => (
                  <div
                    key={currency}
                    className="flex items-center gap-4 py-4 border-t border-outline-variant"
                  >
                    <span className="label-caps text-primary w-10 shrink-0">{currency}</span>
                    <span className="font-mono text-sm sm:text-base text-ink tracking-wide break-all flex-1 select-all">
                      {iban}
                    </span>
                    <CopyButton value={iban} />
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </section>

        <section className="px-6 mb-12 md:mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto">
            <BiblicalQuote text={t.quoteText} reference={t.quoteRef} />
          </div>
        </section>

        {/* Questions */}
        <section className="px-6 mb-12 md:mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto bento-card p-8 md:p-16 text-center bg-surface-low">
            <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 uppercase leading-tight">
              {t.questionsTitle}
            </h2>
            <p className="text-lg text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.questionsText}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href={localizePath(lang, "/contact")} className="btn-primary px-12 py-5">
                {dict.common.contactUs}
              </Link>
              <a
                href="https://wa.me/40742215569"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-12 py-5 inline-flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
