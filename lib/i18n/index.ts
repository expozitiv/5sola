import ro from "./dictionaries/ro";
import en from "./dictionaries/en";
import type { Locale } from "./config";

export type { Dictionary } from "./dictionaries/ro";

const dictionaries = { ro, en };

export function getDictionary(lang: Locale) {
  return dictionaries[lang];
}
