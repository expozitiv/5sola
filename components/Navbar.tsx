"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { name: "Acasă", path: "/" },
  { name: "Cine suntem", path: "/cine-suntem" },
  { name: "Ce credem", path: "/ce-credem" },
  { name: "Evenimente", path: "/evenimente" },
  { name: "Resurse", path: "/resurse" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/images/social_logo.jpg"
            alt="5 Sola"
            className="w-10 h-10 rounded-xs object-cover"
          />
          <span className="font-serif text-2xl font-black tracking-tighter group-hover:text-primary transition-colors duration-300">
            SOLA.RO
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "label-caps transition-colors duration-300 relative py-2",
                pathname === link.path ? "text-primary" : "text-muted hover:text-ink"
              )}
            >
              {link.name}
              {pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/contact" className="btn-primary">
            Contact
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-ink"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-bg border-b border-white/5 p-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "font-display text-lg uppercase tracking-widest",
                pathname === link.path ? "text-primary" : "text-muted"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="btn-primary py-3 text-center"
          >
            Contact
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
