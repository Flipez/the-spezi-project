import { Drink } from '@/pages';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function CaffeineVsRating({ drinks }: { drinks: Drink[] }) {
  const caffeinated = drinks.filter((d) => d.Caffeine !== null);

  if (caffeinated.length === 0) return null;

  const cola = caffeinated.filter((d) => d.Type === 'Cola');
  const spezi = caffeinated.filter((d) => d.Type === 'Spezi');

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Caffeine vs Overall Rating</h3>
      <p className="text-sm mb-4">Bubble size = sugar (g / 100 ml). Hover dots for details.</p>

      <ResponsiveContainer width="100%" height={340}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="Caffeine"
            name="Caffeine"
            unit=" mg"
            domain={[0, 'dataMax+5']}
          />
          <YAxis type="number" dataKey="Rating" name="Rating" domain={[0, 5]} />
          <ZAxis
            type="number"
            dataKey="Sugar"
            range={[60, 200]} /* pixel radius */
            name="Sugar (g/100ml)"
          />
          <Tooltip
            formatter={(v, n) => (n === 'Rating' && typeof v === 'number' ? v.toFixed(1) : v)}
          />
          <Legend />
          <Scatter name="Cola" data={cola} fill="#3b82f6" />
          <Scatter name="Spezi" data={spezi} fill="#f97316" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
