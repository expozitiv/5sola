import type { Metadata } from "next";
import { notFound } from "next/navigation";
import eventsData from "@/data/events.json";
import type { Event } from "@/types";
import { EvenimentDetailContent } from "./EvenimentDetailContent";

const events = eventsData as Event[];

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  return {
    title: event?.title ?? "Eveniment",
    description: event?.description,
  };
}

export default async function EvenimentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return <EvenimentDetailContent event={event} />;
}
