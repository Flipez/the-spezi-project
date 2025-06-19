import { sugarStats } from '@/lib/sugarStats';
import { Drink } from '@/pages';
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis domain={[0, 5]} />
          <Tooltip formatter={(v) => (typeof v === 'number' ? v.toFixed(2) : v)} />
          {data.map(({}) => {
            return null; // legend handled once; Bars below
          })}
          <Bar dataKey="avg" name="Average rating" fill="#ff8c00" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
