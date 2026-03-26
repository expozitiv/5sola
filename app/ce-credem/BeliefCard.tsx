"use client";
import { motion } from "motion/react";
import type { Belief } from "@/types";

export function BeliefCard({ belief, index }: { belief: Belief; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bento-card p-12 flex flex-col justify-between min-h-[450px] group"
    >
      <div>
        <div className="text-primary font-mono text-sm mb-8">0{index + 1}</div>
        <h3 className="text-4xl font-serif font-black mb-1 group-hover:text-primary transition-colors">
          {belief.title}
        </h3>
        <p className="label-caps text-xs text-muted mb-6">{belief.subtitle}</p>
        <p className="text-xl font-serif italic mb-8 leading-tight text-ink">
          {belief.description}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-muted leading-relaxed">{belief.longDescription}</p>
        <div className="flex flex-col gap-1 pt-4 border-t border-outline-variant">
          {belief.verses.map((verse, i) => (
            <p key={i} className="text-xs text-muted/70 italic">{verse}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
