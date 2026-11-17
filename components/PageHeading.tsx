"use client";
import { motion } from "motion/react";

export function PageHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-6xl font-serif font-black leading-tight tracking-tighter uppercase mb-6"
    >
      {children}
    </motion.h1>
  );
}
