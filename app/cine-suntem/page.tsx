import type { Metadata } from "next";
import { CineSuntemContent } from "./CineSuntemContent";

export const metadata: Metadata = {
  title: "Cine Suntem — Misiune & Echipă",
  description:
    "Descoperă echipa și misiunea Asociației 5 Sola — o comunitate dedicată redescoperirii adevărurilor Reformei Protestante în România. Valori, viziune și oameni cu chemare.",
  alternates: {
    canonical: "https://5sola.ro/cine-suntem",
  },
  openGraph: {
    url: "https://5sola.ro/cine-suntem",
    title: "Cine Suntem | 5SOLA.RO",
    description:
      "Descoperă echipa și misiunea Asociației 5 Sola — comunitate reformată dedicată autorității Scripturii și centralității lui Hristos.",
  },
};

export default function CineSuntem() {
  return <CineSuntemContent />;
}
