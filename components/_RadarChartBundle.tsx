import { Drink } from '@/pages';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

/* isolated bundle so only this chunk pulls Recharts */
export function RadarChartBundle({ drink }: { drink: Drink }) {
  const data = [
    { subject: 'Sweetness', value: drink.Sweetness },
    { subject: 'Fruityness', value: drink.Fruityness },
    { subject: 'Fizz', value: drink.Fizz },
    { subject: 'Synthetic', value: drink.Synthetic },
    { subject: 'Overall', value: drink.Rating },
  ];

  return (
    <RadarChart
      outerRadius={120}
      width={420}
      height={300}
      data={data}
      className="bg-white rounded-sm shadow-sm p-4"
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 5]} />
      <Radar dataKey="value" stroke="#ff8c00" fill="#ff8c00" fillOpacity={0.4} />
      <Tooltip />
    </RadarChart>
  );
}
