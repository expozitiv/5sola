"use client";
import { useParams } from "next/navigation";
import { toLocale } from "./config";
import { getDictionary } from "./index";

export function useLocale() {
  const params = useParams<{ lang?: string }>();
  return toLocale(params?.lang);
}

export function useDictionary() {
  return getDictionary(useLocale());
}
