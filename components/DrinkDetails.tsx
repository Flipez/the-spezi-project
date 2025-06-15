import { Drink } from "@/pages";
import dynamic from "next/dynamic";

/* load recharts only in browser */
const RadarChartBundle = dynamic(
  () =>
    import("./_RadarChartBundle").then((m) => m.RadarChartBundle),
  { ssr: false }
);

export default function DrinkDetails({ drink }: { drink: Drink }) {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-semibold mb-4">{drink.Name}</h2>

      <div className="grid gap-8 md:grid-cols-2">
        <RadarChartBundle drink={drink} />

        <div className="space-y-1 text-sm">
          <p><strong>Manufacturer:</strong> {drink.Manufacturer}</p>
          <p><strong>Type:</strong> {drink.Type}</p>
          <p><strong>Sugar-free:</strong> {drink.Zero ? "Yes" : "No"}</p>
          {drink.Caffeine !== null && (
            <p><strong>Caffeine (mg/100 ml):</strong> {drink.Caffeine}</p>
          )}
          <p><strong>Sugar (g/100 ml):</strong> {drink.Sugar}</p>
        </div>
      </div>
    </div>
  );
}
