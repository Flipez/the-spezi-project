import { Drink } from '@/pages';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// This component assumes a 'Year' property on Drink. If you add such a property, this will work out of the box.
// Otherwise, please specify how to extract year from your data.

// Extend Drink locally to include optional Year property
interface DrinkWithYear extends Drink {
  Year?: number;
}

function hasYear(drink: Drink): drink is DrinkWithYear {
  return (
    typeof (drink as DrinkWithYear).Year === 'number' && !isNaN((drink as DrinkWithYear).Year!)
  );
}

function groupByYear(drinks: Drink[]): { year: number; avg: number; n: number }[] {
  const byYear: Record<number, { sum: number; n: number }> = {};
  drinks.forEach((d) => {
    if (hasYear(d)) {
      const year = d.Year!;
      if (!byYear[year]) byYear[year] = { sum: 0, n: 0 };
      byYear[year].sum += d.Rating;
      byYear[year].n += 1;
    }
  });
  return Object.entries(byYear)
    .map(([year, { sum, n }]) => ({ year: Number(year), avg: sum / n, n }))
    .sort((a, b) => a.year - b.year);
}

export default function TopRatedOverTime({ drinks }: { drinks: Drink[] }) {
  const data = groupByYear(drinks);

  if (!data.length) {
    return (
      <div className="text-sm text-gray-500 p-4">
        No year or date information available in drink data. Add a &apos;Year&apos; property to each
        drink to enable this chart.
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Top Rated Drinks Over Time</h3>
      <p className="text-sm mb-4 max-w-prose">
        Shows the average drink rating by year. Add a &apos;Year&apos; property to your drink data
        to enable this chart.
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 5]} />
          <Tooltip formatter={(v: number) => v.toFixed(2)} />
          <Line type="monotone" dataKey="avg" stroke="#ff8c00" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
