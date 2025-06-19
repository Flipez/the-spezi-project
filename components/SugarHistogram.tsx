import { Drink } from '@/pages';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

export default function SugarHistogram({ drinks }: { drinks: Drink[] }) {
  /* bin sugar into 1-g buckets */
  const bins: Record<number, number> = {};
  drinks.forEach(({ Sugar }) => {
    const bucket = Math.floor(Sugar);
    bins[bucket] = (bins[bucket] || 0) + 1;
  });

  const data = Object.keys(bins)
    .map((k) => ({ bucket: Number(k), count: bins[Number(k)] }))
    .sort((a, b) => a.bucket - b.bucket);

  if (data.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-2">Sugar distribution (g / 100&nbsp;ml)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 10, right: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bucket" label={{ value: 'g sugar', position: 'insideBottom', dy: 10 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <ReferenceLine
            x={9}
            stroke="#ef4444"
            strokeDasharray="3 3"
            label={{
              value: '≈ 9 g common soda',
              position: 'top',
              fontSize: 10,
              fill: '#ef4444',
            }}
          />
          <Bar dataKey="count" fill="#ff8c00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
