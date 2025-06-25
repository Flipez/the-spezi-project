import { sugarStats } from '@/lib/sugarStats';
import { Drink } from '@/pages';
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function SugarRank({ drinks }: { drinks: Drink[] }) {
  const data = sugarStats(drinks);

  if (data.length === 0) return null; // nothing to show after filters

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Average Rating: Sugary vs Sugar-Free</h3>

      <p className="text-sm mb-4 max-w-prose">
        Compares the average rating for regular and sugar-free drinks. Hover bars for details.
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={[0, 5]}
            tick={{ fontSize: 12 }}
            tickFormatter={(v) => (typeof v === 'number' ? v.toFixed(1) : v)}
          />
          <YAxis type="category" dataKey="label" width={60} tick={{ fontSize: 13 }} />
          <Tooltip formatter={(v) => (typeof v === 'number' ? v.toFixed(2) : v)} />
          <Bar dataKey="avg" name="Average rating" fill="#ff8c00" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
