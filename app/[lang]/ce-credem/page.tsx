import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { PageHeading } from "@/components/PageHeading";
import { AnimateIn } from "@/components/AnimateIn";
import { BeliefCard } from "./BeliefCard";
import { absoluteUrl, localizePath, pageAlternates, toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { getBeliefs } from "@/lib/i18n/content";
import { breadcrumbJsonLd } from "@/lib/i18n/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).beliefs;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.keywords,
    alternates: pageAlternates(lang, "/ce-credem"),
    openGraph: {
      url: absoluteUrl(lang, "/ce-credem"),
      title: t.ogTitle,
      description: t.ogDescription,
    },
  };
}

export default async function CeCredem({ params }: Props) {
  const lang = toLocale((await params).lang);
  const dict = getDictionary(lang);
  const t = dict.beliefs;
  const beliefs = getBeliefs(lang);
  const breadcrumb = breadcrumbJsonLd(lang, [{ name: t.breadcrumb, path: "/ce-credem" }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="pt-20">
      {/* Header */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeading>
            {t.headingA} <span className="text-primary glow-red">{t.headingB}</span>
          </PageHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <p className="text-xl font-serif italic leading-relaxed text-ink">
              {t.lead}
            </p>
            <p className="text-muted text-lg leading-relaxed">
              {t.body}
            </p>
          </div>
        </div>
      </section>

      {/* 5 Solas Grid — client, each card uses whileInView */}
      <section className="px-6 mb-12 md:mb-20 lg:mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-16 lg:mb-20">
            <span className="label-caps text-primary mb-6 block">{t.pillarsLabel}</span>
            <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
              {t.solasTitleA} <br /> <span className="text-primary">{t.solasTitleB}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beliefs.map((belief, index) => (
              <BeliefCard key={belief.id} belief={belief} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Confession of Faith */}
      <section className="bg-surface-low py-12 md:py-20 lg:py-32 px-6 mb-12 md:mb-20 lg:mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 md:mb-16 lg:mb-20 text-center">
            <span className="label-caps text-primary mb-6 block">{t.confessionLabel}</span>
            <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
              {t.confessionTitleA} <br /> <span className="text-primary">{t.confessionTitleB}</span>
            </h2>
          </div>
          <AnimateIn
            direction="scale"
            className="bg-bg p-8 md:p-16 lg:p-24 border border-outline-variant shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 font-serif text-[20rem] font-black text-ink/[0.04] leading-none select-none pointer-events-none -translate-y-20 translate-x-20">
              S
            </div>
            <div className="markdown-body relative z-10">
              <ReactMarkdown>{t.confession}</ReactMarkdown>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 mb-12 md:mb-20 lg:mb-32">
        <div className="max-w-7xl mx-auto bento-card p-8 md:p-16 lg:p-24 text-center bg-primary/5 border-primary/20">
          <h2 className="text-4xl md:text-6xl font-serif font-black mb-8 uppercase leading-tight">
            {t.ctaTitleA} <br /> <span className="text-primary">{t.ctaTitleB}</span>
          </h2>
          <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
            {t.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href={localizePath(lang, "/contact")} className="btn-primary px-12 py-5 text-lg">
              {dict.common.contactUs}
            </Link>
            <Link href={localizePath(lang, "/evenimente")} className="btn-outline px-12 py-5 text-lg">
              {dict.common.seeEvents}
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
