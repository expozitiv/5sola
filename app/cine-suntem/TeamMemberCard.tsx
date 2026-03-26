"use client";
import { motion } from "motion/react";
import type { TeamMember } from "@/types";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.div whileHover={{ y: -10 }} className="group">
      <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-low relative">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
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
