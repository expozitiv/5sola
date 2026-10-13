"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { locales, localizePath, stripLocale } from "@/lib/i18n/config";
import { useDictionary, useLocale } from "@/lib/i18n/client";

export function LanguageSwitcher({ className }: { className?: string }) {
  const lang = useLocale();
  const t = useDictionary();
  const basePath = stripLocale(usePathname() || "/");

  return (
    <div
      className={cn(
        "flex items-center rounded-xs border border-outline-variant overflow-hidden h-9",
        className
      )}
      aria-label={t.nav.switchLanguage}
    >
      {locales.map((l) => (
        <Link
          key={l}
          href={localizePath(l, basePath)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          className={cn(
            "label-caps text-[11px] px-2.5 h-full flex items-center transition-colors duration-300",
            l === lang ? "bg-primary text-white" : "text-muted hover:text-ink"
          )}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
