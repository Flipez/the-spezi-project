import { Drink } from '@/pages';
import { useState, useMemo } from 'react';
import classNames from 'classnames';

type SortKey = keyof Pick<Drink, 'Rating' | 'Sweetness' | 'Fruityness' | 'Fizz' | 'Synthetic'>;

const cols: { key: SortKey | 'Name' | 'Type' | 'Zero'; label: string }[] = [
  { key: 'Name', label: 'Name' },
  { key: 'Type', label: 'Type' },
  { key: 'Zero', label: 'Sugar-free' },
  { key: 'Rating', label: 'Rating' },
  { key: 'Sweetness', label: 'Sweetness' },
  { key: 'Fruityness', label: 'Fruityness' },
  { key: 'Fizz', label: 'Fizz' },
  { key: 'Synthetic', label: 'Synthetic' },
];

interface Props {
  drinks: Drink[];
  onSelect: (d: Drink) => void;
  search: string;
  size?: number;
  selected?: Drink | null;
  setSelected?: (d: Drink | null) => void;
}

import { ChevronUpIcon, ChevronDownIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import DrinkDetails from './DrinkDetails';
import { useRef, useEffect } from 'react';

export default function DrinkTable({
  drinks,
  onSelect,
  search,
  size = 10,
  selected,
  setSelected,
}: Props) {
  const tableRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover on click outside or Escape
  useEffect(() => {
    if (!selected) return;
    function handle(e: MouseEvent | KeyboardEvent) {
      if (
        (e instanceof MouseEvent &&
          popoverRef.current &&
          !popoverRef.current.contains(e.target as Node)) ||
        (e instanceof KeyboardEvent && e.key === 'Escape')
      ) {
        if (setSelected) setSelected(null);
      }
    }
    document.addEventListener('mousedown', handle);
    document.addEventListener('keydown', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('keydown', handle);
    };
  }, [selected, setSelected]);

  const [sortKey, setSortKey] = useState<SortKey>('Rating');
  const [desc, setDesc] = useState(true);
  const [page, setPage] = useState(0);

  /* search filter */
  const searched = useMemo(() => {
    if (!search.trim()) return drinks;
    const q = search.toLowerCase();
    return drinks.filter(
      (d) => d.Name.toLowerCase().includes(q) || d.Manufacturer.toLowerCase().includes(q)
    );
  }, [drinks, search]);

  /* sort */
  const sorted = useMemo(() => {
    const dir = desc ? -1 : 1;
    return [...searched].sort((a, b) => dir * ((a[sortKey] as number) - (b[sortKey] as number)));
  }, [searched, sortKey, desc]);

  if (page > 0 && page * size >= sorted.length) setPage(0);
  const pageCount = Math.max(1, Math.ceil(sorted.length / size));
  const slice = sorted.slice(page * size, (page + 1) * size);

  const requestSort = (k: SortKey) =>
    k === sortKey ? setDesc(!desc) : (setSortKey(k), setDesc(true));

  return (
    <div
      className="bg-white/80 rounded-xl shadow border border-gray-200 p-4 relative"
      ref={tableRef}
    >
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              {cols.map((c) => (
                <th
                  key={c.label}
                  className={classNames(
                    'p-2 text-left font-normal cursor-pointer select-none border-b border-gray-200',
                    {
                      'font-semibold text-gray-900': c.key === sortKey,
                    }
                  )}
                  onClick={() =>
                    ['Name', 'Type', 'Zero'].includes(c.key as string)
                      ? undefined
                      : requestSort(c.key as SortKey)
                  }
                >
                  <span className="inline-flex items-center gap-1">
                    {c.label}
                    {c.key === sortKey ? (
                      desc ? (
                        <ChevronDownIcon className="w-4 h-4 text-gray-400 inline-block" />
                      ) : (
                        <ChevronUpIcon className="w-4 h-4 text-gray-400 inline-block" />
                      )
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {slice.map((d) => (
              <tr
                key={d.Name}
                className={classNames(
                  'even:bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group',
                  selected && selected.Name === d.Name && 'bg-spezi-50/80 ring-2 ring-spezi-400/40'
                )}
                onClick={() => onSelect(d)}
              >
                <td className="border-b border-gray-100 p-2 flex items-center gap-2">
                  {selected && selected.Name === d.Name ? (
                    <CheckCircleIcon className="w-4 h-4 text-spezi-400" />
                  ) : (
                    <CheckCircleIcon className="w-4 h-4 text-spezi-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                  {d.Name}
                </td>
                <td className="border-b border-gray-100 p-2">{d.Type}</td>
                <td className="border-b border-gray-100 p-2">{d.Zero ? 'Yes' : 'No'}</td>
                <td className="border-b border-gray-100 p-2">{d.Rating}</td>
                <td className="border-b border-gray-100 p-2">{d.Sweetness}</td>
                <td className="border-b border-gray-100 p-2">{d.Fruityness}</td>
                <td className="border-b border-gray-100 p-2">{d.Fizz}</td>
                <td className="border-b border-gray-100 p-2">{d.Synthetic}</td>
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
                'w-9 h-9 border rounded-lg',
                i === page ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
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
      {/* Popover/modal for DrinkDetails */}
      {selected && setSelected && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/20"
          style={{ backdropFilter: 'blur(1px)' }}
        >
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-3xl min-w-[340px] w-full z-50 relative animate-fade-in overflow-auto pt-8 md:pt-0">
            {/* Close button absolutely positioned for desktop */}
            <button
              onClick={() => setSelected(null)}
              className="hidden md:block absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              aria-label="Close details"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Inline close button for mobile, below title */}
            <div className="block md:hidden w-full">
              <button
                onClick={() => setSelected(null)}
                className="mt-2 mb-4 ml-auto flex items-center gap-1 text-gray-400 hover:text-gray-700"
                aria-label="Close details"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Close</span>
              </button>
            </div>
            <DrinkDetails drink={selected} />
          </div>
        </div>
      )}
    </div>
  );
}
