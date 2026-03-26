"use client";
import { motion } from "motion/react";

export function PageHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-7xl font-serif font-black leading-tight tracking-tighter uppercase mb-8"
    >
      {children}
    </motion.h1>
  );
}
