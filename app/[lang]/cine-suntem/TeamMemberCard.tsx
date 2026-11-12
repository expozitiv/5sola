"use client";
import Image from "next/image";
import { motion } from "motion/react";
import type { TeamMember } from "@/types";

interface Props {
  member: TeamMember;
  /** First cards are above the fold: preload them so the LCP image loads eagerly. */
  priority?: boolean;
}

export function TeamMemberCard({ member, priority = false }: Props) {
  return (
    <motion.div whileHover={{ y: -10 }} className="group">
      <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-low relative">
        <Image
          src={member.image}
          alt={member.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-all duration-700 scale-110 group-hover:scale-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <h3 className="text-xl font-serif font-bold mb-1">{member.name}</h3>
      <p className="label-caps text-xs text-primary mb-3">{member.role}</p>
      <p className="text-muted text-sm leading-relaxed">{member.bio}</p>
    </motion.div>
  );
}
