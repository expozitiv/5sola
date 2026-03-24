import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "5SOLA.RO — Asociația Sola Scriptura",
    template: "%s | 5SOLA.RO",
  },
  description:
    "Asociația Sola Scriptura promovează valorile Reformei Protestante în contextul românesc, punând accent pe autoritatea Scripturii și centralitatea lui Hristos.",
  openGraph: {
    siteName: "5SOLA.RO",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-bg text-ink">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
