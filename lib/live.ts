import type { Event, ScheduleItem } from "@/types";

// Events happen in Romania, so "today" and "now" are always taken in this zone,
// regardless of where the server or the visitor is.
const EVENT_TZ = "Europe/Bucharest";

// Dev-only override to preview date-dependent UI:
//   NEXT_PUBLIC_FAKE_TODAY=2026-11-21 npm run dev        (date only, noon)
//   NEXT_PUBLIC_FAKE_TODAY=2026-11-21T14:40 npm run dev  (date and time)
export function eventNow(): { date: string; minutes: number } {
  const fake = process.env.NEXT_PUBLIC_FAKE_TODAY;
  if (fake && process.env.NODE_ENV !== "production") {
    const [date, time = "12:00"] = fake.split("T");
    return { date, minutes: toMinutes(time) };
  }
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: EVENT_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

const TIME_RE = /^\d{1,2}:\d{2}$/;
// After the last item of the day has run this long, consider the day over.
const LAST_ITEM_DURATION = 90;

export interface LiveStatus {
  dayIndex: number;
  dayCount: number;
  phase: "before" | "during" | "after";
  /** Current time of day in the event's zone, "HH:MM". */
  clock: string;
  current?: ScheduleItem;
  next?: ScheduleItem;
  /** 0..1, how far the current item has progressed towards the next one. */
  progress?: number;
}

function formatClock(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// null when the event is not happening today.
export function getLiveStatus(event: Event): LiveStatus | null {
  const { date, minutes } = eventNow();
  if (date < event.startDate || date > event.endDate) return null;

  const dayMs = 86_400_000;
  const dayIndex = Math.round((Date.parse(date) - Date.parse(event.startDate)) / dayMs);
  const dayCount =
    Math.round((Date.parse(event.endDate) - Date.parse(event.startDate)) / dayMs) + 1;

  const items = (event.schedule[dayIndex]?.items ?? []).filter((i) => TIME_RE.test(i.time));
  let currentIdx = -1;
  items.forEach((item, i) => {
    if (toMinutes(item.time) <= minutes) currentIdx = i;
  });

  const base = { dayIndex, dayCount, clock: formatClock(minutes) };
  if (currentIdx === -1) return { ...base, phase: "before", next: items[0] };

  const current = items[currentIdx];
  const next = items[currentIdx + 1];
  const start = toMinutes(current.time);
  if (!next && minutes - start > LAST_ITEM_DURATION) {
    return { ...base, phase: "after" };
  }
  const end = next ? toMinutes(next.time) : start + LAST_ITEM_DURATION;
  const progress = Math.min(1, Math.max(0, (minutes - start) / Math.max(1, end - start)));
  return { ...base, phase: "during", current, next, progress };
}
