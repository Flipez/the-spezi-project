import { Drink } from '@/pages';
import React from 'react';

const ATTRS = ['Sweetness', 'Fruityness', 'Fizz', 'Synthetic', 'Rating'] as const;

type Attr = (typeof ATTRS)[number];

type CorrelationMatrix = Record<Attr, Record<Attr, number>>;

function pearson(xs: number[], ys: number[]): number {
  const n = xs.length;
  const mx = xs.reduce((a, b) => a + b, 0) / n;
  const my = ys.reduce((a, b) => a + b, 0) / n;
  const cov = xs.reduce((sum, x, i) => sum + (x - mx) * (ys[i] - my), 0);
  const stdx = Math.sqrt(xs.reduce((sum, x) => sum + (x - mx) ** 2, 0));
  const stdy = Math.sqrt(ys.reduce((sum, y) => sum + (y - my) ** 2, 0));
  return stdx && stdy ? cov / (stdx * stdy) : 0;
}

function calcCorrelationMatrix(drinks: Drink[]): CorrelationMatrix {
  const matrix: CorrelationMatrix = {} as CorrelationMatrix;
  for (const a of ATTRS) {
    matrix[a] = {} as Record<Attr, number>;
    const xs = drinks.map((d) => Number(d[a] ?? 0));
    for (const b of ATTRS) {
      const ys = drinks.map((d) => Number(d[b] ?? 0));
      matrix[a][b] = pearson(xs, ys);
    }
  }
  return matrix;
}

function colorForValue(val: number): string {
  // Blue for negative, white for zero, orange for positive
  const pct = (val + 1) / 2; // map [-1,1] to [0,1]
  const r = Math.round(255 * pct + 255 * (1 - pct)); // white to orange
  const g = Math.round(255 * (1 - pct) + 140 * pct); // white to orange
  const b = Math.round(255 * (1 - pct)); // white to orange
  return `rgb(${r},${g},${b})`;
}

export default function AttributeCorrelationHeatmap({ drinks }: { drinks: Drink[] }) {
  if (!drinks.length) return null;
  const matrix = calcCorrelationMatrix(drinks);
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Attribute Correlations</h3>
      <p className="text-sm mb-4 max-w-prose">
        Shows the Pearson correlation between all numeric drink attributes. Darker orange means
        strong positive correlation, blue means strong negative correlation, and white means no
        correlation.
      </p>
      <div className="overflow-x-auto">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-1"></th>
              {ATTRS.map((attr) => (
                <th key={attr} className="p-1 text-xs font-semibold text-gray-700 text-center">
                  {attr}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ATTRS.map((row) => (
              <tr key={row}>
                <th className="p-1 text-xs font-semibold text-gray-700 text-right">{row}</th>
                {ATTRS.map((col) => {
                  const val = matrix[row][col];
                  return (
                    <td
                      key={col}
                      className="h-10 text-xs text-center border border-gray-200"
                      style={{
                        background: colorForValue(val),
                        color: Math.abs(val) > 0.6 ? '#fff' : '#333',
                        width: `${100 / ATTRS.length}%`,
                      }}
                      title={val.toFixed(2)}
                    >
                      {row === col ? '—' : val.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
