"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Event } from "@/types";
import { getLiveStatus, type LiveStatus } from "@/lib/live";
import { useDictionary } from "@/lib/i18n/client";

// Recomputes once a minute so the "now / next" card follows the schedule
// without a reload.
export function useLiveStatus(event: Event): LiveStatus | null {
  const [status, setStatus] = useState<LiveStatus | null>(() => getLiveStatus(event));
  useEffect(() => {
    const tick = () => setStatus(getLiveStatus(event));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [event]);
  return status;
}

export function LiveBadge({ status }: { status: LiveStatus }) {
  const t = useDictionary().home;
  return (
    <div className="flex items-center gap-3 label-caps mb-6">
      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
      <span className="text-primary">{t.liveNow}</span>
      {status.dayCount > 1 && (
        <>
          <span className="text-muted/50">•</span>
          <span>{t.liveDay(status.dayIndex + 1, status.dayCount)}</span>
        </>
      )}
    </div>
  );
}

function LivePill() {
  return (
    <span className="inline-flex items-center gap-2 bg-primary text-white font-sans font-bold uppercase tracking-[0.3em] text-[10px] px-3 py-1.5 rounded-xs">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-80 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      Live
    </span>
  );
}

export function LiveNowNext({ status, programHref }: { status: LiveStatus; programHref: string }) {
  const t = useDictionary().home;
  const { phase, current, next, progress = 0 } = status;

  return (
    <Link
      href={programHref}
      className="group relative block max-w-lg mb-8 rounded-lg border border-primary/30 bg-surface-high/80 backdrop-blur-sm p-5 overflow-hidden shadow-[0_0_60px_-15px_rgba(177,31,36,0.45)] hover:border-primary/60 transition-colors duration-300"
    >
      {/* Soft red bloom in the corner */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex items-center justify-between gap-4 mb-4">
        <LivePill />
        <span className="font-mono text-sm font-semibold text-muted tabular-nums">{status.clock}</span>
      </div>

      {phase === "during" && current && (
        <div className="relative">
          <div className="label-caps text-primary mb-2">{t.liveCurrent}</div>
          <div className="font-serif text-2xl font-black leading-tight">{current.activity}</div>
          {(current.topic || current.speaker) && (
            <div className="text-muted text-sm mt-1">
              {[current.topic, current.speaker].filter(Boolean).join(" — ")}
            </div>
          )}
          <div className="flex items-center gap-3 mt-3 text-xs font-mono text-muted tabular-nums">
            <span>{current.time}</span>
            <div className="flex-1 h-1 rounded-full bg-outline-variant overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-[width] duration-1000"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
            {next && <span>{next.time}</span>}
          </div>
        </div>
      )}

      {phase === "before" && next && (
        <div className="relative font-serif text-2xl font-black leading-tight">
          {t.liveStartsAt(next.time)}
        </div>
      )}

      {phase === "after" && (
        <div className="relative font-serif text-2xl font-black leading-tight">{t.liveDayEnded}</div>
      )}

      {phase === "during" && next && (
        <div className="relative mt-4 pt-3 border-t border-outline-variant flex items-baseline gap-3 text-sm">
          <span className="label-caps">{t.liveNext}</span>
          <span className="font-mono font-semibold text-muted tabular-nums">{next.time}</span>
          <span className="text-ink font-medium">{next.activity}</span>
        </div>
      )}

      <div className="relative inline-flex items-center gap-2 text-primary label-caps mt-4">
        <span>{t.liveSeeProgram}</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Link>
  );
}
