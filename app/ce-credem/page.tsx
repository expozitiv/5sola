import type { Metadata } from "next";
import { CeCredemContent } from "./CeCredemContent";

export const metadata: Metadata = {
  title: "Ce Credem — Cele 5 Sola ale Reformei",
  description:
    "Explorează fundamentele teologice ale Asociației 5 Sola: Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria — cele 5 Sola ale Reformei Protestante.",
  keywords: [
    "sola scriptura",
    "sola fide",
    "sola gratia",
    "solus christus",
    "soli deo gloria",
    "cele 5 sola",
    "reformă protestantă",
    "mărturisire de credință",
    "teologie reformată",
  ],
  alternates: {
    canonical: "https://5sola.ro/ce-credem",
  },
  openGraph: {
    url: "https://5sola.ro/ce-credem",
    title: "Ce Credem — Cele 5 Sola ale Reformei | 5SOLA.RO",
    description:
      "Sola Scriptura, Sola Fide, Sola Gratia, Solus Christus, Soli Deo Gloria — fundamentele teologice ale Asociației 5 Sola.",
  },
};

export default function CeCredem() {
  return <CeCredemContent />;
}
