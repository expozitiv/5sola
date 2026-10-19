import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { dateLocales, type Locale } from "@/lib/i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date-only strings ("2026-11-20") parse as UTC midnight, so all formatting
// and comparisons must use UTC — otherwise visitors west of UTC see the previous day.
export function formatDate(dateString: string, lang: Locale = "ro") {
  return new Date(dateString).toLocaleDateString(dateLocales[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateRange(startDate: string, endDate: string, lang: Locale = "ro") {
  const locale = dateLocales[lang];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const fullOpts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };
  if (
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth()
  ) {
    const startDay = start.toLocaleDateString(locale, { day: "numeric", timeZone: "UTC" });
    const endFull = end.toLocaleDateString(locale, fullOpts);
    return `${startDay}–${endFull}`;
  }
  return `${start.toLocaleDateString(locale, fullOpts)} – ${end.toLocaleDateString(locale, fullOpts)}`;
}

function localTodayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function isEventFuture(endDate: string) {
  return endDate >= localTodayISO();
}

export function isEventOngoing(startDate: string, endDate: string) {
  const today = localTodayISO();
  return startDate <= today && today <= endDate;
}

// Closed by the explicit switch, or automatically once the deadline has passed.
export function isRegistrationOpen(event: { registrationClosed?: boolean; registrationDeadline?: string }) {
  if (event.registrationClosed) return false;
  if (!event.registrationDeadline) return true;
  return event.registrationDeadline >= localTodayISO();
}
