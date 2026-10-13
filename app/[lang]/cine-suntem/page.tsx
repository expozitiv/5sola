import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { TeamMemberCard } from "./TeamMemberCard";
import { BiblicalQuote } from "@/components/BiblicalQuote";
import { absoluteUrl, pageAlternates, toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import { getTeam } from "@/lib/i18n/content";
import { breadcrumbJsonLd } from "@/lib/i18n/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).about;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    keywords: t.keywords,
    alternates: pageAlternates(lang, "/cine-suntem"),
    openGraph: {
      url: absoluteUrl(lang, "/cine-suntem"),
      title: t.ogTitle,
      description: t.ogDescription,
    },
  };
}

export default async function CineSuntem({ params }: Props) {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).about;
  const team = getTeam(lang);
  const breadcrumb = breadcrumbJsonLd(lang, [{ name: t.breadcrumb, path: "/cine-suntem" }]);

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
              {t.headingA} <span className="text-primary glow-red">{t.headingB}</span>
            </PageHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <p className="text-xl font-serif italic leading-relaxed text-ink">
                {t.lead}
              </p>
              <div className="flex flex-col gap-6 text-muted text-lg leading-relaxed">
                <p>{t.body1}</p>
                <p>{t.body2}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="px-6 mb-12 md:mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bento-card p-8 md:p-12 lg:p-20 flex flex-col justify-between min-h-0 md:min-h-[400px]">
              <div>
                <span className="label-caps text-primary mb-6 block">
                  {t.missionLabel}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 leading-tight">
                  {t.missionTitle}
                </h2>
              </div>
              <p className="text-muted text-lg">
                {t.missionText}
              </p>
            </div>
            <div className="bento-card p-8 md:p-12 lg:p-20 flex flex-col justify-between min-h-0 md:min-h-[400px] bg-surface-low">
              <div>
                <span className="label-caps text-secondary mb-6 block">
                  {t.visionLabel}
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 leading-tight">
                  {t.visionTitle}
                </h2>
              </div>
              <p className="text-muted text-lg">
                {t.visionText}
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-surface-low py-12 md:py-20 lg:py-32 px-6 mb-12 md:mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 lg:mb-20 gap-8">
              <div className="max-w-2xl">
                <span className="label-caps text-primary mb-6 block">
                  {t.valuesLabel}
                </span>
                <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
                  {t.valuesTitleA} <br /> <span className="text-primary">{t.valuesTitleB}</span>
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {t.values.map((value, idx) => (
                <div key={idx} className="group">
                  <div className="text-primary font-mono text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{value.desc}</p>
                  <div className="h-px bg-outline-variant mt-8 group-hover:bg-primary/30 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team — client, uses whileHover */}
        <section className="px-6 mb-12 md:mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 md:mb-16 lg:mb-20">
              <span className="label-caps text-primary mb-6 block">{t.teamLabel}</span>
              <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
                {t.teamTitleA} <br /> <span className="text-primary">{t.teamTitleB}</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 mb-12 md:mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto">
            <BiblicalQuote
              text={t.quoteText}
              reference={t.quoteRef}
            />
          </div>
        </section>
      </div>
    </>
  );
}
