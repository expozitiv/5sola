"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useDictionary } from "@/lib/i18n/client";

export function CopyButton({ value }: { value: string }) {
  const t = useDictionary().donate;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — the IBAN stays selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 label-caps text-[10px] text-muted hover:text-primary transition-colors duration-300 shrink-0"
      aria-label={`${t.copy} ${value}`}
    >
      {copied ? <Check size={14} className="text-primary" /> : <Copy size={14} />}
      <span>{copied ? t.copied : t.copy}</span>
    </button>
  );
}
