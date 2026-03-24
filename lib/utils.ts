import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateRange(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const fullOpts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth()
  ) {
    const startDay = start.toLocaleDateString("ro-RO", { day: "numeric" });
    const endFull = end.toLocaleDateString("ro-RO", fullOpts);
    return `${startDay}–${endFull}`;
  }
  return `${start.toLocaleDateString("ro-RO", fullOpts)} – ${end.toLocaleDateString("ro-RO", fullOpts)}`;
}

export function isEventFuture(endDate: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(endDate) >= today;
}
