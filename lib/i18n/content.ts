import beliefsData from "@/data/beliefs.json";
import teamData from "@/data/team.json";
import resourcesData from "@/data/resources.json";
import beliefsEn from "@/data/en/beliefs.json";
import teamEn from "@/data/en/team.json";
import resourcesEn from "@/data/en/resources.json";
import type { Belief, Resource, TeamMember } from "@/types";
import type { Locale } from "./config";

export { getEvents } from "@/lib/events";

type Overlay = Record<string, unknown>;

// Lays translated fields over the Romanian source. Arrays are matched by index,
// so anything missing from the translation stays in Romanian.
function overlay<T>(base: T, patch: unknown): T {
  if (patch === undefined || patch === null) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(patch)) return base;
    return base.map((item, i) => overlay(item, patch[i])) as T;
  }
  if (base && typeof base === "object") {
    if (typeof patch !== "object" || Array.isArray(patch)) return base;
    const result: Record<string, unknown> = { ...(base as Overlay) };
    for (const [key, value] of Object.entries(patch as Overlay)) {
      result[key] = overlay((base as Overlay)[key], value);
    }
    return result as T;
  }
  return typeof patch === typeof base || base === undefined ? (patch as T) : base;
}

function translateById<T extends { id: string }>(
  items: T[],
  lang: Locale,
  translations: Record<string, Overlay>
): T[] {
  if (lang === "ro") return items;
  return items.map((item) => overlay(item, translations[item.id]));
}

const resources = resourcesData as unknown as { magazines: Resource[]; books: Resource[] };

export function getBeliefs(lang: Locale): Belief[] {
  return translateById(beliefsData as Belief[], lang, beliefsEn as Record<string, Overlay>);
}

export function getTeam(lang: Locale): TeamMember[] {
  return translateById(teamData as TeamMember[], lang, teamEn as Record<string, Overlay>);
}

export function getResources(lang: Locale) {
  const en = resourcesEn as Record<string, Overlay>;
  return {
    magazines: translateById(resources.magazines, lang, en),
    books: translateById(resources.books, lang, en),
  };
}
