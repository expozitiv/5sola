"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { localizePath, stripLocale } from "@/lib/i18n/config";
import { useDictionary, useLocale } from "@/lib/i18n/client";

export function Navbar() {
  // Statically generated Romanian pages render with the internal /ro prefix,
  // so compare paths with the locale stripped to keep hydration consistent.
  const pathname = stripLocale(usePathname() || "/");
  const lang = useLocale();
  const t = useDictionary().nav;
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: t.home, path: "/" },
    { name: t.about, path: "/cine-suntem" },
    { name: t.beliefs, path: "/ce-credem" },
    { name: t.events, path: "/evenimente" },
    { name: t.resources, path: "/resurse" },
    { name: t.contact, path: "/contact" },
  ];
  const donatePath = localizePath(lang, "/doneaza");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href={localizePath(lang, "/")} className="flex items-center gap-3 group">
          <img
            src="/images/social_logo.jpg"
            alt="5 Sola"
            className="w-10 h-10 rounded-xs object-cover"
          />
          <span className="font-serif text-2xl font-black tracking-tighter group-hover:text-primary transition-colors duration-300">
            5SOLA.RO
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-8 2xl:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={localizePath(lang, link.path)}
              className={cn(
                "label-caps whitespace-nowrap transition-colors duration-300 relative py-2",
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
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Link href={donatePath} className="btn-primary">
            {t.donate}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="xl:hidden flex items-center gap-3">
          <Link href={donatePath} className="btn-primary hidden sm:inline-flex px-5 py-2.5">
            {t.donate}
          </Link>
          <LanguageSwitcher />
          <button
            className="text-ink"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t.toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:hidden bg-bg border-b border-white/5 p-6 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={localizePath(lang, link.path)}
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
            href={donatePath}
            onClick={() => setIsOpen(false)}
            className="btn-primary py-3 text-center"
          >
            {t.donate}
          </Link>
        </motion.div>
      )}
    </nav>
  );
}
