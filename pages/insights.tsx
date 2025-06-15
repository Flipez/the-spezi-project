import { GetStaticProps } from "next";
import Papa from "papaparse";
import fs from "fs";
import path from "path";
import type { Drink } from ".";

import dynamic from "next/dynamic";

/* client-only charts */
const RatingDrivers         = dynamic(() => import("@/components/RatingDrivers"),         { ssr: false });
const SugarRank             = dynamic(() => import("@/components/SugarRank"),             { ssr: false });
const SweetSyntheticScatter = dynamic(() => import("@/components/SweetSyntheticScatter"), { ssr: false });
const AttributeRadarCompare = dynamic(() => import("@/components/AttributeRadarCompare"), { ssr: false });
const SugarHistogram        = dynamic(() => import("@/components/SugarHistogram"),        { ssr: false });
const CaffeineVsRating      = dynamic(() => import("@/components/CaffeineVsRating"),      { ssr: false });

export default function Insights({ drinks }: { drinks: Drink[] }) {
  /* helper to wrap each chart in a consistent card */
  const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white rounded shadow p-4">{children}</div>
  );

  return (
    <div
      suppressHydrationWarning
      className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto"
    >
      <h1 className="text-2xl font-semibold mb-6">Insights</h1>

      <div className="grid gap-8 md:grid-cols-2 auto-rows-max">
        <Card><RatingDrivers         drinks={drinks} /></Card>
        <Card><SugarRank             drinks={drinks} /></Card>
        <Card><SweetSyntheticScatter drinks={drinks} /></Card>
        <Card><AttributeRadarCompare drinks={drinks} /></Card>
        <Card><SugarHistogram        drinks={drinks} /></Card>
        <Card><CaffeineVsRating      drinks={drinks} /></Card>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const csv = fs.readFileSync(
    path.join(process.cwd(), "public", "drinks.csv"),
    "utf8"
  );
  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  }).data as any[];

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
