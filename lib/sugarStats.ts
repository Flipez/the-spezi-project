import type { Drink } from "@/pages";

export interface SugarStat {
  label: string;        // e.g. "Cola • Sugared"
  avg: number;          // average overall rating
}

/** Returns 2–4 groups depending on what’s in the data / current filter. */
export function sugarStats(drinks: Drink[]): SugarStat[] {
  const buckets: Record<string, { total: number; n: number }> = {};

  for (const d of drinks) {
    const key = `${d.Type}•${d.Zero ? "Sugar-free" : "Sugared"}`;
    if (!buckets[key]) buckets[key] = { total: 0, n: 0 };
    buckets[key].total += d.Rating;
    buckets[key].n += 1;
  }

  return Object.entries(buckets)
    .map(([label, { total, n }]) => ({ label: label.replace("•", " • "), avg: total / n }))
    .sort((a, b) => b.avg - a.avg);    // highest bars first
}
