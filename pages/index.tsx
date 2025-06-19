import { GetStaticProps } from 'next';
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';
import { useMemo, useState } from 'react';

import DrinkTable from '@/components/DrinkTable';
import DrinkDetails from '@/components/DrinkDetails';
import { CsvDrink } from '@/types/csv-drink';

/* Map lives on its own /map page, so no render here.
   If you still want a mini-map on the home page uncomment below.
*/
// const DrinkMap = dynamic(() => import("@/components/DrinkMap"), { ssr: false });

export interface Drink {
  Type: string;
  Zero: boolean;
  Name: string;
  Manufacturer: string;
  lat: number | null;
  long: number | null;
  Sweetness: number;
  Fruityness: number;
  Synthetic: number;
  Fizz: number;
  Sugar: number;
  SugarScale: number;
  Caffeine: number | null;
  CaffeineScale: number | null;
  Rating: number;
}

interface Props {
  drinks: Drink[];
}

export default function Home({ drinks }: Props) {
  const [filterType, setFilterType] = useState<'All' | 'Cola' | 'Spezi'>('All');
  const [filterZero, setFilterZero] = useState<'All' | 'Zero' | 'Sugar'>('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Drink | null>(null);

  /* apply filters */
  const filtered = useMemo(() => {
    return drinks.filter((d) => {
      const okType = filterType === 'All' || d.Type === filterType;
      const okSugar = filterZero === 'All' || (filterZero === 'Zero' ? d.Zero : !d.Zero);
      return okType && okSugar;
    });
  }, [drinks, filterType, filterZero]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
      {/* ── Search + Filters bar ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        {/* search always first */}
        <input
          className="border rounded px-2 py-1 flex-1 text-sm"
          placeholder="Search drink or manufacturer…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* dropdowns wrap on small screens */}
        <div className="flex gap-3 flex-wrap text-sm">
          <label className="flex items-center gap-2">
            Type:
            <select
              className="border rounded p-1"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'All' | 'Cola' | 'Spezi')}
            >
              <option value="All">All</option>
              <option value="Cola">Cola</option>
              <option value="Spezi">Spezi</option>
            </select>
          </label>

          <label className="flex items-center gap-2">
            Sugar:
            <select
              className="border rounded p-1"
              value={filterZero}
              onChange={(e) => setFilterZero(e.target.value as 'All' | 'Zero' | 'Sugar')}
            >
              <option value="All">All</option>
              <option value="Zero">Sugar-free</option>
              <option value="Sugar">Sugared</option>
            </select>
          </label>
        </div>
      </div>

      {/* ── Table + Details ──────────────────────────────────────────── */}
      <DrinkTable
        drinks={filtered}
        onSelect={setSelected}
        search={search}
        selected={selected}
        setSelected={setSelected}
      />

      {/* ── About section ────────────────────────────────────────────── */}
      <div className="border border-gray-200 rounded-xl bg-white/70 p-6 mt-10 shadow-sm max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">About These Ratings</h2>
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div>
            <p className="mb-4 text-gray-700">
              A completely <span className="font-semibold">subjective test</span> of different Spezi
              and Cola brands I’ve been able to track down. See something missing? Let me know!
            </p>
            <p className="mb-4 text-gray-700">
              The map shows each drink’s location as printed on the bottle or can. In most cases
              that’s the brewing site; for larger companies it can be the distribution HQ instead.
            </p>
            <p className="mb-4 text-gray-700">
              <span className="font-semibold">Rating</span> is a straight 1 – 5 “tastes good to me”.
              A drink can score well on attributes yet still feel lacklustre overall (or
              vice-versa).
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Values</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>
                <span className="font-semibold text-gray-900">Sweetness</span> – how sweet and
                sticky it tastes.{' '}
                <span className="text-gray-500">~2.5/5 is my personal sweet-spot.</span>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Fruitiness</span> – fruit impression.{' '}
                <span className="text-gray-500">3–4 is ideal for a Spezi.</span>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Synthetic</span> – artificial / bitter
                notes. <span className="text-gray-500">Lower is better.</span>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Fizz</span> – carbonation intensity.{' '}
                <span className="text-gray-500">3–4 feels perfect.</span>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Sugar</span> – real g / 100 ml,
                normalised 1–5.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const csv = fs.readFileSync(path.join(process.cwd(), 'public', 'drinks.csv'), 'utf8');
  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  }).data as CsvDrink[];

  const drinks = parsed.map((d) => ({
    ...d,
    Zero: d.Zero === 'true',
    lat: d.lat ? parseFloat(d.lat) : null,
    long: d.long ? parseFloat(d.long) : null,
    Sweetness: Number(d.Sweetness),
    Fruityness: Number(d.Fruityness),
    Synthetic: Number(d.Synthetic),
    Fizz: Number(d.Fizz),
    Sugar: Number(d.Sugar),
    SugarScale: Number(d.SugarScale),
    Caffeine: d.Caffeine ? Number(d.Caffeine) : null,
    CaffeineScale: d.CaffeineScale ? Number(d.CaffeineScale) : null,
    Rating: Number(d.Rating),
  }));

  return { props: { drinks } };
};
