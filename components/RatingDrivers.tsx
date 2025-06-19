import { correlations } from '@/lib/correlation';
import { Drink } from '@/pages';
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function RatingDrivers({ drinks }: { drinks: Drink[] }) {
  const data = correlations(drinks).map(({ key, r }) => ({
    name: key,
    r: Math.round(r * 100) / 100,
    abs: Math.abs(r),
  }));

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Which attributes drive the rating?</h3>

      <p className="text-sm mb-4">Bars show absolute Pearson r (higher = stronger relationship).</p>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            domain={[0, 1]}
            tickFormatter={(v) => (typeof v === 'number' ? v.toFixed(1) : v)}
          />
          <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => (typeof v === 'number' ? v.toFixed(2) : v)} />
          <Bar dataKey="abs" fill="#ff8c00" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
