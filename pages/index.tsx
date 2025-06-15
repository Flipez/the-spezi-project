import { GetStaticProps } from "next";
import Papa from "papaparse";
import fs from "fs";
import path from "path";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import DrinkTable     from "@/components/DrinkTable";
import DrinkDetails   from "@/components/DrinkDetails";

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
  const [filterType, setFilterType] = useState<"All" | "Cola" | "Spezi">("All");
  const [filterZero, setFilterZero] = useState<"All" | "Zero" | "Sugar">("All");
  const [search,     setSearch]     = useState("");
  const [selected,   setSelected]   = useState<Drink | null>(null);

  /* apply filters */
  const filtered = useMemo(() => {
    return drinks.filter((d) => {
      const okType =
        filterType === "All" || d.Type === filterType;
      const okSugar =
        filterZero === "All" ||
        (filterZero === "Zero" ? d.Zero : !d.Zero);
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
              onChange={(e) =>
                setFilterType(e.target.value as any)
              }
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
              onChange={(e) =>
                setFilterZero(e.target.value as any)
              }
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
      />

      {selected && <DrinkDetails drink={selected} />}

      {/* ── About section ────────────────────────────────────────────── */}
      <h1 className="text-3xl font-bold mt-10 mb-6">Drink Ratings</h1>

      <section className="prose prose-neutral max-w-none text-sm md:text-base">
        <p>
          A completely <strong>subjective test</strong> of different Spezi and Cola
          brands I’ve been able to track down.&nbsp;See something missing?—let me
          know!
        </p>

        <p>
          The map shows each drink’s location as printed on the bottle or can.&nbsp;
          In most cases that’s the brewing site; for larger companies it can be the
          distribution HQ instead.
        </p>

        <h3 id="values">Values</h3>
        <ul>
          <li>
            <strong>Sweetness</strong> – how sweet and sticky it tastes.
            <em> ~2.5 / 5 is my personal sweet-spot.</em>
          </li>
          <li>
            <strong>Fruitiness</strong> – fruit impression.
            <em> 3–4 is ideal for a Spezi.</em>
          </li>
          <li>
            <strong>Synthetic</strong> – artificial / bitter notes.
            <em> Lower is better.</em>
          </li>
          <li>
            <strong>Fizz</strong> – carbonation intensity.
            <em> 3–4 feels perfect.</em>
          </li>
          <li>
            <strong>Sugar</strong> – real g / 100 ml, normalised 1 – 5.
          </li>
        </ul>

        <p>
          <strong>Rating</strong> is a straight 1 – 5 “tastes good to me”.
          A drink can score well on attributes yet still feel lacklustre overall
          (or vice-versa).
        </p>
      </section>
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
