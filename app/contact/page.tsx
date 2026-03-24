import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează Asociația 5 Sola — suntem disponibili pentru întrebări despre conferințe, colaborări și resurse teologice. Email, telefon și rețele sociale.",
  alternates: {
    canonical: "https://5sola.ro/contact",
  },
  openGraph: {
    url: "https://5sola.ro/contact",
    title: "Contact | 5SOLA.RO",
    description:
      "Contactează Asociația 5 Sola pentru întrebări despre conferințe biblice, colaborări sau resurse teologice.",
  },
};

export default function Contact() {
  return <ContactContent />;
}
