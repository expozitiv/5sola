import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { locales, ogLocales, pageAlternates, toLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";
import "../globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://5sola.ro");

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.siteTitle,
      template: "%s | 5SOLA.RO",
    },
    description: t.siteDescription,
    keywords: t.keywords,
    applicationName: "5SOLA.RO",
    authors: [{ name: t.organizationName, url: SITE_URL }],
    creator: t.organizationName,
    publisher: t.organizationName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      siteName: "5SOLA.RO",
      locale: ogLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
      type: "website",
      url: SITE_URL,
      title: t.siteTitle,
      description: t.ogDescription,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: t.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.siteTitle,
      description: t.twitterDescription,
      images: ["/opengraph-image.png"],
    },
    alternates: pageAlternates(lang, "/"),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = toLocale((await params).lang);
  const t = getDictionary(lang).meta;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Asociația 5 Sola",
    alternateName: lang === "ro" ? "5 Sola" : ["5 Sola", t.organizationName],
    url: SITE_URL,
    logo: `${SITE_URL}/images/social_logo.jpg`,
    description: t.organizationDescription,
    email: "asociatia5sola@gmail.com",
    telephone: "+40742215569",
    foundingDate: "2022",
    sameAs: [
      "https://www.youtube.com/@Asociatia5sola",
      "https://www.instagram.com/conferinta5sola",
      "https://www.facebook.com/p/5-Sola-100089754032341",
    ],
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-bg text-ink">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer lang={lang} />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
