"use client";
import { motion } from "motion/react";

type Direction = "up" | "left" | "right" | "scale";

interface Props {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
}

export function AnimateIn({ children, className, direction = "up", delay = 0 }: Props) {
  const initial =
    direction === "left" ? { opacity: 0, x: -50 } :
    direction === "right" ? { opacity: 0, x: 50 } :
    direction === "scale" ? { opacity: 0, scale: 0.98 } :
    { opacity: 0, y: 40 };

  const animate =
    direction === "scale"
      ? { opacity: 1, scale: 1 }
      : { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
