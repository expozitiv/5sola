import { notFound, redirect } from "next/navigation";
import eventsData from "@/data/events.json";
import type { Event } from "@/types";

const events = eventsData as Event[];

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function InscrierePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) notFound();

  if (event.stripeLink) {
    redirect(event.stripeLink);
  }

  redirect(`/evenimente/${slug}`);
}
