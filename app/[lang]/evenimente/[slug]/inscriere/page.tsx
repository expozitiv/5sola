import { notFound, redirect } from "next/navigation";
import { getEvents } from "@/lib/events";
import { isRegistrationOpen } from "@/lib/utils";
import { locales, localizePath, toLocale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((lang) => getEvents("ro").map((e) => ({ lang, slug: e.slug })));
}

export default async function InscrierePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const event = getEvents("ro").find((e) => e.slug === slug);

  if (!event) notFound();

  if (event.stripeLink && isRegistrationOpen(event)) {
    redirect(event.stripeLink);
  }

  redirect(localizePath(toLocale(lang), `/evenimente/${slug}`));
}
