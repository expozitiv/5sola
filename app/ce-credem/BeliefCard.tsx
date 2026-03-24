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
        <h3 className="text-4xl font-serif font-black mb-6 group-hover:text-primary transition-colors">
          {belief.title}
        </h3>
        <p className="text-xl font-serif italic mb-8 leading-tight text-ink">
          {belief.description}
        </p>
      </div>
      <p className="text-muted leading-relaxed">{belief.longDescription}</p>
    </motion.div>
  );
}
