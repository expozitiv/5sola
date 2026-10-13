"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useDictionary } from "@/lib/i18n/client";

interface QADetails {
  formId: string;
  entryField: string;
}

export default function QAForm({ qaDetails }: { qaDetails: QADetails }) {
  const t = useDictionary().qa;
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const MAX = 600;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;

    setLoading(true);
    const actionUrl = `https://docs.google.com/forms/d/e/${qaDetails.formId}/formResponse`;
    try {
      const body = new URLSearchParams({ [qaDetails.entryField]: trimmed });
      await fetch(actionUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch {
      // no-cors fetch throws on response read — submission still goes through
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-14 md:py-16 px-4 md:bento-card md:bg-surface-low">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-primary" size={28} />
        </div>
        <h2 className="text-xl md:text-2xl font-serif font-bold text-ink mb-2">{t.thanks}</h2>
        <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">
          {t.sent}
        </p>
        <button
          onClick={() => { setSubmitted(false); setQuestion(""); }}
          className="mt-6 btn-outline text-sm px-6 py-2"
        >
          {t.another}
        </button>
      </div>
    );
  }

  return (
    /* Mobile: no card chrome, just the form. Desktop: full card. */
    <div className="md:bg-surface-low md:rounded-lg md:p-10 md:border md:border-outline-variant/60">
      {/* Label — tiny on mobile, full header on desktop */}
      <p className="text-xs font-medium text-muted mb-2 md:hidden">{t.yourQuestion}</p>
      <div className="hidden md:flex items-start gap-4 mb-6">
        <div>
          <h2 className="text-lg font-serif font-bold text-ink mb-1">{t.askTitle}</h2>
          <p className="text-sm text-muted leading-relaxed">
            {t.askText}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value.slice(0, MAX))}
            placeholder={t.placeholder}
            rows={9}
            className="w-full bg-surface-highest border-2 border-outline-variant focus:border-primary focus:outline-none rounded-xs px-4 py-4 text-ink placeholder:text-muted/60 resize-none font-sans text-base leading-relaxed transition-colors duration-200"
            required
            autoFocus
          />
          <span
            className={`absolute bottom-3 right-3 text-xs font-mono pointer-events-none transition-colors duration-200 ${
              question.length > MAX * 0.85 ? "text-primary" : "text-muted"
            }`}
          >
            {question.length}/{MAX}
          </span>
        </div>

        <button
          type="submit"
          disabled={!question.trim() || loading}
          className="btn-primary w-full flex items-center justify-center gap-2 py-4 md:py-3 text-base md:text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send size={15} />
          )}
          <span>{loading ? t.sending : t.submit}</span>
        </button>
      </form>
    </div>
  );
}
