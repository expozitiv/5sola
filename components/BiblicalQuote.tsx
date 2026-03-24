"use client";
import { Quote } from "lucide-react";
import { motion } from "motion/react";

interface BiblicalQuoteProps {
  text: string;
  reference: string;
  className?: string;
}

export function BiblicalQuote({ text, reference, className = "" }: BiblicalQuoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`relative p-16 bg-surface-low text-center max-w-5xl mx-auto rounded-lg ${className}`}
    >
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-primary flex items-center justify-center text-white rounded-xs shadow-[0_0_30px_rgba(177,31,36,0.3)]">
        <Quote size={28} />
      </div>
      <blockquote className="font-serif text-3xl md:text-5xl font-black italic mb-10 leading-tight text-ink glow-red">
        &ldquo;{text}&rdquo;
      </blockquote>
      <cite className="label-caps text-primary not-italic">— {reference}</cite>
    </motion.div>
  );
}
