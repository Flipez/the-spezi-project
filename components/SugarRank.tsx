import { sugarStats } from "@/lib/sugarStats";
import { Drink } from "@/pages";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function SugarRank({ drinks }: { drinks: Drink[] }) {
  const data = sugarStats(drinks);

  if (data.length === 0) return null;          // nothing to show after filters

  /* colour palette – two hues, one tint each */
  const colours: Record<string, string> = {
    Cola:  "#3b82f6",  // blue
    Spezi: "#f97316",  // orange
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-2">
        Rank: Sugary vs Sugar-free
      </h3>

      <p className="text-sm mb-4 max-w-prose">
        Average overall rating of each variant that’s currently in view.
        Hover bars for exact values.
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis domain={[0, 5]} />
          <Tooltip formatter={(v: number) => v.toFixed(2)} />
          <Legend />
          {data.map(({ label }) => {
            const type = label.startsWith("Cola") ? "Cola" : "Spezi";
            return null;        // legend handled once; Bars below
          })}
          <Bar
            dataKey="avg"
            name="Average rating"
            fill="#6366f1"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
