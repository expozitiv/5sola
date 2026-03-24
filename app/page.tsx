import type { Metadata } from "next";
import { HomeContent } from "./HomeContent";

export const metadata: Metadata = {
  title: {
    absolute: "5SOLA.RO — Conferințe Biblice & Resurse Teologice în Spiritul Reformei",
  },
  description:
    "Asociația 5 Sola organizează conferințe biblice și oferă resurse teologice ancorate în cele 5 Sola ale Reformei Protestante. Alătură-te comunității reformate din România.",
  alternates: {
    canonical: "https://5sola.ro",
  },
  openGraph: {
    url: "https://5sola.ro",
    title: "5SOLA.RO — Conferințe Biblice & Resurse Teologice",
    description:
      "Asociația 5 Sola organizează conferințe biblice și resurse teologice ancorate în Reforma Protestantă.",
  },
};

export default function Home() {
  return <HomeContent />;
}
