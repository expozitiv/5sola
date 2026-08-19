import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date-only strings ("2026-11-20") parse as UTC midnight, so all formatting
// and comparisons must use UTC — otherwise visitors west of UTC see the previous day.
export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateRange(startDate: string, endDate: string) {
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
    const startDay = start.toLocaleDateString("ro-RO", { day: "numeric", timeZone: "UTC" });
    const endFull = end.toLocaleDateString("ro-RO", fullOpts);
    return `${startDay}–${endFull}`;
  }
  return `${start.toLocaleDateString("ro-RO", fullOpts)} – ${end.toLocaleDateString("ro-RO", fullOpts)}`;
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

export function isRegistrationOpen(registrationDeadline?: string) {
  if (!registrationDeadline) return true;
  return registrationDeadline >= localTodayISO();
}
