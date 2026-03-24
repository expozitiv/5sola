"use client";
import { motion } from "motion/react";

export function PageHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-[12vw] md:text-[10vw] font-serif font-black leading-[0.85] tracking-tighter uppercase mb-12"
    >
      {children}
    </motion.h1>
  );
}
