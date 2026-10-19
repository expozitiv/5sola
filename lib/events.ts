import fs from "node:fs";
import path from "node:path";
import type { Event } from "@/types";
import type { Locale } from "@/lib/i18n/config";

// One JSON file per event in data/events/; the file name is the event's slug (URL).
// Files are read at request time (the home page is dynamic), so next.config.ts adds
// the folder to the server trace.
const EVENTS_DIR = path.join(process.cwd(), "data", "events");

// Only these fields are translated. Everything else (schedule, speakers, topics)
// is shown in Romanian on /en too.
const TRANSLATABLE = ["title", "location", "description", "registrationNote"] as const;

export type EventTranslation = Partial<Record<(typeof TRANSLATABLE)[number], string>>;
type StoredEvent = Event & { en?: EventTranslation };

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const REQUIRED_TEXT = ["title", "location", "description"] as const;
const REQUIRED_DATES = ["startDate", "endDate"] as const;

function fail(file: string, message: string): never {
  throw new Error(`data/events/${file}: ${message}`);
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

// A CMS saves empty inputs as "" or null; treat those as "not set" so optional
// fields like stripeLink or registrationDeadline behave as if they were absent.
function dropEmpty(record: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(record).filter(([, v]) => v !== null && v !== undefined && v !== "")
  );
}

function parseEvent(file: string, raw: unknown): StoredEvent {
  const slug = file.replace(/\.json$/, "");
  if (!SLUG.test(slug)) fail(file, "file name must use only lowercase letters, digits and dashes");
  if (!isRecord(raw)) fail(file, "expected a JSON object");
  const e = dropEmpty(raw);

  for (const key of REQUIRED_TEXT) {
    if (typeof e[key] !== "string" || !e[key].trim()) fail(file, `"${key}" is required`);
  }
  for (const key of [...REQUIRED_DATES, "registrationDeadline"]) {
    if (key in e && !(typeof e[key] === "string" && DATE.test(e[key]))) {
      fail(file, `"${key}" must be a YYYY-MM-DD date`);
    }
  }
  for (const key of REQUIRED_DATES) {
    if (!(key in e)) fail(file, `"${key}" is required`);
  }
  if ((e.endDate as string) < (e.startDate as string)) fail(file, `"endDate" is before "startDate"`);

  if ("registrationClosed" in e && typeof e.registrationClosed !== "boolean") {
    fail(file, `"registrationClosed" must be true or false`);
  }

  if (!isRecord(e.qaDetails) || !e.qaDetails.formId) delete e.qaDetails;

  const en = isRecord(e.en)
    ? Object.fromEntries(
        TRANSLATABLE.flatMap((k) => {
          const v = (e.en as Record<string, unknown>)[k];
          return typeof v === "string" && v.trim() ? [[k, v]] : [];
        })
      )
    : undefined;

  const schedule = Array.isArray(e.schedule) ? e.schedule.filter(isRecord) : [];

  return {
    ...e,
    id: slug,
    slug,
    speakers: Array.isArray(e.speakers) ? e.speakers.filter(isRecord) : [],
    topics: Array.isArray(e.topics) ? e.topics.filter((t) => typeof t === "string") : [],
    schedule: schedule.map((day) => ({
      ...day,
      items: Array.isArray(day.items) ? day.items.filter(isRecord) : [],
    })),
    en,
  } as unknown as StoredEvent;
}

function loadEvents(): StoredEvent[] {
  const files = fs.readdirSync(EVENTS_DIR).filter((f) => f.endsWith(".json"));
  const events = files.map((file) => {
    let raw: unknown;
    try {
      raw = JSON.parse(fs.readFileSync(path.join(EVENTS_DIR, file), "utf8"));
    } catch (err) {
      fail(file, `invalid JSON (${(err as Error).message})`);
    }
    return parseEvent(file, raw);
  });

  // Chronological order: the home page features the first upcoming event.
  return events.sort(
    (a, b) => a.startDate.localeCompare(b.startDate) || a.slug.localeCompare(b.slug)
  );
}

function translate({ en, ...event }: StoredEvent, lang: Locale): Event {
  if (lang === "ro" || !en) return event;
  return { ...event, ...en };
}

export function getEvents(lang: Locale): Event[] {
  return loadEvents().map((event) => translate(event, lang));
}
