import type { Metadata } from "next";
import { EvenimenteContent } from "./EvenimenteContent";

export const metadata: Metadata = {
  title: "Evenimente & Conferințe Biblice",
  description:
    "Conferințe biblice organizate de Asociația 5 Sola în România. Explorează evenimentele viitoare și arhiva conferințelor trecute dedicate teologiei reformate.",
  alternates: {
    canonical: "https://5sola.ro/evenimente",
  },
  openGraph: {
    url: "https://5sola.ro/evenimente",
    title: "Evenimente & Conferințe Biblice | 5SOLA.RO",
    description:
      "Conferințe biblice în România cu vorbitori de renume internațional, dedicate studiului Scripturii și teologiei reformate.",
  },
};

export default function Evenimente() {
  return <EvenimenteContent />;
}
