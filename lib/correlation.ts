import type { Drink } from '@/pages';

/** Returns an array of { key, r } sorted descending by |r|.
    Numeric columns are hard-coded for clarity. */
export function correlations(drinks: Drink[]) {
  const keys: (keyof Drink)[] = [
    'Sweetness',
    'Fruityness',
    'Fizz',
    'Synthetic',
    'Sugar',
    'Caffeine',
  ];

  const mean = (arr: number[]) => arr.reduce((s, v) => s + v, 0) / arr.length;
  const ratingMean = mean(drinks.map((d) => d.Rating));

  const cov = (a: number[], b: number[], ma: number, mb: number) =>
    a.reduce((s, v, i) => s + (v - ma) * (b[i] - mb), 0);

  return keys
    .map((key) => {
      const vals = drinks.map((d) => Number(d[key] ?? 0));
      const m = mean(vals);
      const r =
        cov(
          vals,
          drinks.map((d) => d.Rating),
          m,
          ratingMean
        ) /
        Math.sqrt(
          cov(vals, vals, m, m) *
            cov(
              drinks.map((d) => d.Rating),
              drinks.map((d) => d.Rating),
              ratingMean,
              ratingMean
            )
        );
      return { key: key as string, r };
    })
    .filter(({ r }) => !Number.isNaN(r))
    .sort((a, b) => Math.abs(b.r) - Math.abs(a.r));
}
