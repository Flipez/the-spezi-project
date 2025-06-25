import { Drink } from '@/pages';
import dynamic from 'next/dynamic';

/* load recharts only in browser */
const RadarChartBundle = dynamic(
  () => import('./_RadarChartBundle').then((m) => m.RadarChartBundle),
  { ssr: false }
);

export default function DrinkDetails({ drink }: { drink: Drink }) {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-semibold mb-4">{drink.Name}</h2>

      <div className="flex flex-col md:flex-row md:items-stretch">
        <div className="w-full md:w-[360px] flex justify-center px-2">
          <RadarChartBundle drink={drink} />
        </div>
        <div className="space-y-1 text-sm flex-1 min-w-0 break-words overflow-x-auto md:pl-8">
          <p>
            <strong>Manufacturer:</strong> {drink.Manufacturer}
          </p>
          <p>
            <strong>Type:</strong> {drink.Type}
          </p>
          <p>
            <strong>Sugar-free:</strong> {drink.Zero ? 'Yes' : 'No'}
          </p>
          {drink.Caffeine !== null && (
            <p>
              <strong>Caffeine (mg/100 ml):</strong> {drink.Caffeine}
            </p>
          )}
          <p>
            <strong>Sugar (g/100 ml):</strong> {drink.Sugar}
          </p>
        </div>
      </div>
    </div>
  );
}
