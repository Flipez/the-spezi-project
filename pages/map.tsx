import { GetStaticProps } from "next";
import Papa from "papaparse";
import fs from "fs";
import path from "path";
import dynamic from "next/dynamic";
/* client-only wrapper */
const DrinkMap = dynamic(() => import("@/components/DrinkMap"), { ssr: false });
import type { Drink } from ".";            // reuse the type from index

export default function MapPage({ drinks }: { drinks: Drink[] }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Map</h1>
      <DrinkMap drinks={drinks} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const csv = fs.readFileSync(path.join(process.cwd(), "public", "drinks.csv"), "utf8");
  const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true }).data as any[];

  // same mapper used in index.tsx
  const drinks = parsed.map((d) => ({
    ...d,
    Zero: d.Zero === "true",
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
