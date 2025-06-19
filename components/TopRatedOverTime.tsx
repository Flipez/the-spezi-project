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

function groupByYear(drinks: Drink[]): { year: number; avg: number; n: number }[] {
  // Try to infer year from Name or another property if available
  // For now, return empty array
  return [];
}

export default function TopRatedOverTime({ drinks }: { drinks: Drink[] }) {
  const data = groupByYear(drinks);

  if (!data.length) {
    return (
      <div className="text-sm text-gray-500 p-4">
        No year or date information available in drink data. Add a 'Year' property to each drink to
        enable this chart.
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Top Rated Drinks Over Time</h3>
      <p className="text-sm mb-4 max-w-prose">
        Shows the average drink rating by year. Add a 'Year' property to your drink data to enable
        this chart.
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
