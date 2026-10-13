import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { AnimateIn } from "@/components/AnimateIn";
import type { Resource } from "@/types";
import { absoluteUrl, localizePath, pageAlternates, toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { getResources } from "@/lib/i18n/content";
import { breadcrumbJsonLd } from "@/lib/i18n/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).resources;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.keywords,
    alternates: pageAlternates(lang, "/resurse"),
    openGraph: {
      url: absoluteUrl(lang, "/resurse"),
      title: t.ogTitle,
      description: t.ogDescription,
    },
  };
}

function ResourceCard({ resource, orderLabel }: { resource: Resource; orderLabel: string }) {
  const isBook = resource.type === "book";

  return (
    <div className="group flex flex-col">
      <div
        className={`relative overflow-hidden bg-surface-low mb-6 ${
          isBook ? "aspect-[2/3]" : "aspect-[3/4]"
        }`}
      >
        <Image
          src={resource.coverImage}
          alt={resource.title}
          fill
          className="object-cover transition-all duration-700 scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {!isBook && resource.volume && (
          <div className="absolute top-4 left-4 bg-primary text-white font-mono text-xs px-3 py-1">
            Vol. {resource.volume}
          </div>
        )}
      </div>
      {isBook && resource.author && (
        <p className="label-caps text-xs text-primary mb-1">
          {resource.author}
        </p>
      )}
      <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
        {resource.title}
      </h3>
      <p className="text-muted text-sm leading-relaxed flex-1">
        {resource.description}
      </p>
      {resource.shopUrl && (
        <Link
          href={resource.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline mt-6 py-3 text-sm text-center"
        >
          {orderLabel}
        </Link>
      )}
    </div>
  );
}

export default async function Resurse({ params }: Props) {
  const lang = toLocale((await params).lang);
  const dict = getDictionary(lang);
  const t = dict.resources;
  const { magazines, books } = getResources(lang);
  const breadcrumb = breadcrumbJsonLd(lang, [{ name: t.breadcrumb, path: "/resurse" }]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <div className="pt-20">
        {/* Header */}
        <section className="px-6 mb-12">
          <div className="max-w-7xl mx-auto">
            <PageHeading>
              <span className="text-primary glow-red">{t.heading}</span>
            </PageHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <p className="text-xl font-serif italic leading-relaxed text-ink">
                {t.lead}
              </p>
              <p className="text-muted text-lg leading-relaxed">
                {t.bodyBefore} <span className="italic">Ad Fontes</span>{" "}
                {t.bodyMiddle}{" "}
                <Link
                  href="https://corpusreformatorum.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic text-primary underline underline-offset-2 hover:text-primary/70 transition-colors"
                >
                  Corpus Reformatorum
                </Link>
                {t.bodyAfter}
                {t.languageNote && (
                  <span className="block mt-4 text-sm italic">{t.languageNote}</span>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Revista Ad Fontes */}
        <section className="px-6 mb-32">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <span className="label-caps text-primary mb-6 block">
                {t.periodical}
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
                {t.magazineTitleA} <br /> <span className="text-primary">Ad Fontes</span>
              </h2>
            </div>
            <AnimateIn direction="up">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {magazines.map((magazine) => (
                  <ResourceCard key={magazine.id} resource={magazine} orderLabel={t.order} />
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Cărți traduse */}
        <section className="bg-surface-low py-32 px-6 mb-32">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <span className="label-caps text-primary mb-6 block">
                {t.publisher}{" "}
                <Link
                  href="https://corpusreformatorum.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  Corpus Reformatorum
                </Link>
              </span>
              <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
                {t.booksTitle} <br />
              </h2>
            </div>
            <AnimateIn direction="up">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {books.map((book) => (
                  <ResourceCard key={book.id} resource={book} orderLabel={t.order} />
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 mb-32">
          <div className="max-w-7xl mx-auto bento-card p-12 md:p-24 text-center bg-primary/5 border-primary/20">
            <h2 className="text-4xl md:text-6xl font-serif font-black mb-8 uppercase leading-tight">
              {t.ctaTitleA} <br />{" "}
              <span className="text-primary">{t.ctaTitleB}</span>
            </h2>
            <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
              {t.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href={localizePath(lang, "/evenimente")}
                className="btn-primary px-12 py-5 text-lg"
              >
                {dict.common.seeEvents}
              </Link>
              <Link href={localizePath(lang, "/contact")} className="btn-outline px-12 py-5 text-lg">
                {dict.common.contactUs}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
