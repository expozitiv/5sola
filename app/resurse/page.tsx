import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { AnimateIn } from "@/components/AnimateIn";
import resourcesData from "@/data/resources.json";
import type { Resource } from "@/types";

const { magazines, books } = resourcesData as unknown as {
  magazines: Resource[];
  books: Resource[];
};

export const metadata: Metadata = {
  title: "Resurse — Cărți și Reviste Teologice",
  description:
    "Descoperă resursele teologice publicate de Asociația 5 Sola: revista Ad Fontes și cărți traduse în colaborare cu Corpus Reformatorum.",
  alternates: {
    canonical: "https://5sola.ro/resurse",
  },
  openGraph: {
    url: "https://5sola.ro/resurse",
    title: "Resurse | 5SOLA.RO",
    description:
      "Revista Ad Fontes și cărți traduse — resurse teologice pentru echiparea credincioșilor și întărirea bisericii locale.",
  },
};

function ResourceCard({ resource }: { resource: Resource }) {
  const isBook = resource.type === "book";

  return (
    <div className="group flex flex-col">
      <div
        className={`relative overflow-hidden bg-surface-low mb-6 ${
          isBook ? "aspect-[2/3]" : "aspect-[3/4]"
        }`}
      >
        <Image
          src={resource.coverImage}
          alt={resource.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {!isBook && resource.volume && (
          <div className="absolute top-4 left-4 bg-primary text-white font-mono text-xs px-3 py-1">
            Vol. {resource.volume}
          </div>
        )}
      </div>
      {isBook && resource.author && (
        <p className="label-caps text-xs text-primary mb-1">{resource.author}</p>
      )}
      <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
        {resource.title}
      </h3>
      <p className="text-muted text-sm leading-relaxed flex-1">{resource.description}</p>
      {resource.shopUrl && (
        <Link
          href={resource.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline mt-6 py-3 text-sm text-center"
        >
          Comandă
        </Link>
      )}
    </div>
  );
}

export default function Resurse() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <PageHeading>
            <span className="text-primary glow-red">Resurse</span>
          </PageHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <p className="text-xl font-serif italic leading-relaxed text-ink">
              Publicații și cărți teologice pentru echiparea credincioșilor și întărirea
              bisericilor locale.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              Prin revista{" "}
              <span className="italic">Ad Fontes</span> și prin cărțile traduse în colaborare cu{" "}
              <span className="italic">Corpus Reformatorum</span>, dorim să aducem în mâinile
              credincioșilor din România o teologie clară, ancorată în Scriptură.
            </p>
          </div>
        </div>
      </section>

      {/* Revista Ad Fontes */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="label-caps text-primary mb-6 block">Publicație periodică</span>
            <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
              Revista <br /> <span className="text-primary">Ad Fontes</span>
            </h2>
          </div>
          <AnimateIn direction="up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {magazines.map((magazine) => (
                <ResourceCard key={magazine.id} resource={magazine} />
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Cărți traduse */}
      <section className="bg-surface-low py-32 px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="label-caps text-primary mb-6 block">
              În colaborare cu Corpus Reformatorum
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-black leading-none uppercase">
              Cărți <br /> <span className="text-primary">Traduse</span>
            </h2>
          </div>
          <AnimateIn direction="up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {books.map((book) => (
                <ResourceCard key={book.id} resource={book} />
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto bento-card p-12 md:p-24 text-center bg-primary/5 border-primary/20">
          <h2 className="text-4xl md:text-6xl font-serif font-black mb-8 uppercase leading-tight">
            Vrei să afli mai mult <br />{" "}
            <span className="text-primary">despre lucrarea noastră?</span>
          </h2>
          <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
            Participă la conferințele noastre sau contactează-ne pentru mai multe detalii despre
            resursele disponibile.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/evenimente" className="btn-primary px-12 py-5 text-lg">
              Vezi Evenimente
            </Link>
            <Link href="/contact" className="btn-outline px-12 py-5 text-lg">
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
