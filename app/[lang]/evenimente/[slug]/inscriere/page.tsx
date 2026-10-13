import { notFound, redirect } from "next/navigation";
import eventsData from "@/data/events.json";
import type { Event } from "@/types";
import { locales, localizePath, toLocale } from "@/lib/i18n/config";

const events = eventsData as Event[];

export function generateStaticParams() {
  return locales.flatMap((lang) => events.map((e) => ({ lang, slug: e.slug })));
}

export default async function InscrierePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) notFound();

  if (event.stripeLink) {
    redirect(event.stripeLink);
  }

  redirect(localizePath(toLocale(lang), `/evenimente/${slug}`));
}
