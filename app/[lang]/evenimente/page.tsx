import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { EventsTabSection } from "./EventsTabSection";
import { absoluteUrl, localizePath, pageAlternates, toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { getEvents } from "@/lib/i18n/content";
import { breadcrumbJsonLd } from "@/lib/i18n/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).events;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.keywords,
    alternates: pageAlternates(lang, "/evenimente"),
    openGraph: {
      url: absoluteUrl(lang, "/evenimente"),
      title: t.ogTitle,
      description: t.ogDescription,
    },
  };
}

export default async function Evenimente({ params }: Props) {
  const lang = toLocale((await params).lang);
  const dict = getDictionary(lang);
  const t = dict.events;
  const events = getEvents(lang);
  const breadcrumb = breadcrumbJsonLd(lang, [{ name: t.breadcrumb, path: "/evenimente" }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="pt-20">
      {/* Header */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeading>
            {t.headingA} <span className="text-primary glow-red">&</span> {t.headingB}
          </PageHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <p className="text-xl font-serif italic leading-relaxed text-ink">
              {t.lead}
            </p>
            <p className="text-muted leading-relaxed">
              {t.body}
            </p>
          </div>
        </div>
      </section>

      {/* Tabs + events grid — client, uses useState */}
      <EventsTabSection events={events} />

      {/* Newsletter CTA */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto bento-card p-12 md:p-24 text-center bg-surface-low">
          <div className="max-w-2xl mx-auto">
            <span className="label-caps text-primary mb-6 block">{t.newsletterLabel}</span>
            <h3 className="text-4xl md:text-6xl font-serif font-black mb-8 uppercase leading-tight">
              {t.newsletterTitleA} <br /> <span className="text-primary">{t.newsletterTitleB}</span>
            </h3>
            <p className="text-muted mb-12 text-lg leading-relaxed">
              {t.newsletterText}
            </p>
            <div className="flex justify-center">
              <Link href={`${localizePath(lang, "/")}#newsletter`} className="btn-primary px-12 py-5 text-lg">
                {dict.common.subscribeNow}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
