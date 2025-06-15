import { Drink } from "@/pages";
import { useState, useMemo } from "react";
import classNames from "classnames";

type SortKey = keyof Pick<
  Drink,
  "Rating" | "Sweetness" | "Fruityness" | "Fizz" | "Synthetic"
>;

const cols: { key: SortKey | "Name" | "Type" | "Zero"; label: string }[] = [
  { key: "Name",        label: "Name" },
  { key: "Type",        label: "Type" },
  { key: "Zero",        label: "Sugar-free" },
  { key: "Rating",      label: "Rating" },
  { key: "Sweetness",   label: "Sweetness" },
  { key: "Fruityness",  label: "Fruityness" },
  { key: "Fizz",        label: "Fizz" },
  { key: "Synthetic",   label: "Synthetic" },
];

interface Props {
  drinks: Drink[];
  onSelect: (d: Drink) => void;
  search: string;       // ← NEW
  size?: number;
}

export default function DrinkTable({ drinks, onSelect, search, size = 10 }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("Rating");
  const [desc,    setDesc]    = useState(true);
  const [page,    setPage]    = useState(0);

  /* search filter */
  const searched = useMemo(() => {
    if (!search.trim()) return drinks;
    const q = search.toLowerCase();
    return drinks.filter(
      (d) =>
        d.Name.toLowerCase().includes(q) ||
        d.Manufacturer.toLowerCase().includes(q)
    );
  }, [drinks, search]);

  /* sort */
  const sorted = useMemo(() => {
    const dir = desc ? -1 : 1;
    return [...searched].sort(
      (a, b) => dir * ((a[sortKey] as number) - (b[sortKey] as number))
    );
  }, [searched, sortKey, desc]);

  if (page > 0 && page * size >= sorted.length) setPage(0);
  const pageCount = Math.max(1, Math.ceil(sorted.length / size));
  const slice     = sorted.slice(page * size, (page + 1) * size);

  const requestSort = (k: SortKey) =>
    k === sortKey ? setDesc(!desc) : (setSortKey(k), setDesc(true));

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded-lg">
          <thead>
            <tr className="bg-gray-100/60 backdrop-blur-sm">
              {cols.map((c) => (
                <th
                  key={c.label}
                  className={classNames(
                    "p-2 text-left border cursor-pointer select-none",
                    { "font-semibold": c.key === sortKey }
                  )}
                  onClick={() =>
                    ["Name", "Type", "Zero"].includes(c.key as string)
                      ? undefined
                      : requestSort(c.key as SortKey)
                  }
                >
                  {c.label}
                  {c.key === sortKey ? (desc ? " ↓" : " ↑") : null}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {slice.map((d) => (
              <tr
                key={d.Name}
                className="even:bg-gray-50 hover:bg-spezi-50 cursor-pointer"
                onClick={() => onSelect(d)}
              >
                <td className="border p-2">{d.Name}</td>
                <td className="border p-2">{d.Type}</td>
                <td className="border p-2">{d.Zero ? "Yes" : "No"}</td>
                <td className="border p-2">{d.Rating}</td>
                <td className="border p-2">{d.Sweetness}</td>
                <td className="border p-2">{d.Fruityness}</td>
                <td className="border p-2">{d.Fizz}</td>
                <td className="border p-2">{d.Synthetic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pager */}
      {pageCount > 1 && (
        <div className="flex items-center gap-2 mt-4 justify-center">
          <button
            className="px-2 py-1 border rounded-sm disabled:opacity-40"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            ‹ Prev
          </button>
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              className={classNames(
                "w-9 h-9 border rounded-lg",
                i === page ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
              )}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-2 py-1 border rounded-sm disabled:opacity-40"
            disabled={page === pageCount - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Next ›
          </button>
        </div>
      )}
    </>
  );
}
