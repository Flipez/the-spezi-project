import { Drink } from "@/pages";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AttributeRadarCompare({ drinks }: { drinks: Drink[] }) {
  const keys = ["Sweetness", "Fruityness", "Fizz", "Synthetic"] as const;

  const groups = { Cola: [] as Drink[], Spezi: [] as Drink[] };
  drinks.forEach((d) => groups[d.Type as "Cola" | "Spezi"]?.push(d));

  if (!groups.Cola.length || !groups.Spezi.length) return null;

  const avg = (arr: number[]) =>
    arr.reduce((s, v) => s + v, 0) / arr.length;

  const data = keys.map((k) => ({
    attr: k,
    Cola:  avg(groups.Cola.map((d) => d[k] as number)),
    Spezi: avg(groups.Spezi.map((d) => d[k] as number)),
  }));

  return (
    <>
      <h3 className="text-lg font-semibold mb-2">Cola vs Spezi profile</h3>

      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={data} outerRadius="80%">
          <PolarGrid />
          <PolarAngleAxis dataKey="attr" />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar
            name="Cola"
            dataKey="Cola"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.3}
          />
          <Radar
            name="Spezi"
            dataKey="Spezi"
            stroke="#f97316"
            fill="#f97316"
            fillOpacity={0.3}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
}
