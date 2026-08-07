import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://5sola.ro");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "5SOLA.RO — Conferințe Biblice & Resurse Teologice",
    template: "%s | 5SOLA.RO",
  },
  description:
    "Asociația 5 Sola organizează conferințe biblice și oferă resurse teologice ancorate în cele 5 Sola ale Reformei Protestante. Comunitate reformată din România.",
  keywords: [
    "5 sola",
    "asociatia 5 sola",
    "reformă protestantă",
    "conferință biblică",
    "teologie reformată",
    "România",
    "sola scriptura",
    "sola fide",
    "sola gratia",
    "solus christus",
    "soli deo gloria",
    "conferinte crestine romania",
    "teologie biblica",
    "5sola.ro",
  ],
  applicationName: "5SOLA.RO",
  authors: [{ name: "Asociația 5 Sola", url: SITE_URL }],
  creator: "Asociația 5 Sola",
  publisher: "Asociația 5 Sola",
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
    locale: "ro_RO",
    type: "website",
    url: SITE_URL,
    title: "5SOLA.RO — Conferințe Biblice & Resurse Teologice",
    description:
      "Asociația 5 Sola organizează conferințe biblice și oferă resurse teologice ancorate în cele 5 Sola ale Reformei Protestante.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "5SOLA.RO — Asociația 5 Sola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "5SOLA.RO — Conferințe Biblice & Resurse Teologice",
    description:
      "Conferințe biblice și resurse teologice ancorate în cele 5 Sola ale Reformei Protestante.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Asociația 5 Sola",
  alternateName: "5 Sola",
  url: SITE_URL,
  logo: `${SITE_URL}/images/social_logo.jpg`,
  description:
    "Asociația 5 Sola organizează conferințe biblice și oferă resurse teologice ancorate în cele 5 Sola ale Reformei Protestante în România.",
  email: "asociatia5sola@gmail.com",
  telephone: "+40742215569",
  foundingDate: "2022",
  sameAs: [
    "https://www.youtube.com/@Asociatia5sola",
    "https://www.instagram.com/conferinta5sola",
    "https://www.facebook.com/p/5-Sola-100089754032341",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-bg text-ink">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
