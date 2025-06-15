import { Drink } from "@/pages";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

export default function SweetSyntheticScatter({ drinks }: { drinks: Drink[] }) {
  const colas   = drinks.filter((d) => d.Type === "Cola");
  const spezis  = drinks.filter((d) => d.Type === "Spezi");

  if (drinks.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-2">
        Sweetness vs “Synthetic” — trade-off vs flavour score
      </h3>
      <p className="text-sm mb-4 max-w-prose">
        Each dot is a drink. X = Sweetness, Y = Synthetic/artificial after-taste.
        Bubble size = Overall Rating (1-5). Hover for details.
      </p>

      <ResponsiveContainer width="100%" height={360}>
        <ScatterChart
          margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="Sweetness"
            name="Sweetness"
            domain={[0, 5]}
            tickCount={6}
          />
          <YAxis
            type="number"
            dataKey="Synthetic"
            name="Synthetic"
            domain={[0, 5]}
            tickCount={6}
          />
          <ZAxis
            type="number"
            dataKey="Rating"
            range={[80, 200]}          /* bubble pixel range */
            domain={[1, 5]}
          />
          <Tooltip
            formatter={(value, name) =>
              name === "Rating" && typeof value === "number"
              ? value.toFixed(1)
              : value
            }
          />
          <Legend />
          <Scatter
            name="Cola"
            data={colas}
            fill="#3b82f6"              /* blue */
          />
          <Scatter
            name="Spezi"
            data={spezis}
            fill="#f97316"              /* orange */
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
