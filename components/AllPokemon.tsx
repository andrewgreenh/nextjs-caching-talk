"use client";

import { PokemonSummary } from "@/app/helper";
import { useEffect, useState } from "react";

interface AllPokemonProps {
  initialList: PokemonSummary[];
}

interface Detail {
  name: string;
  id: number;
  sprite: string;
}

export function AllPokemon({ initialList }: AllPokemonProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selected) return;
    let cancelled = false;
    // Begin loading after microtask to avoid synchronous setState warning
    Promise.resolve().then(() => {
      if (cancelled) return;
      setLoading(true);
      setError(null);
      fetch(`/api/pokemon/${selected}`)
        .then((r) => r.json())
        .then((d: Detail) => {
          if (!cancelled) setDetail(d);
        })
        .catch((e) => !cancelled && setError(e.message))
        .finally(() => !cancelled && setLoading(false));
    });
    return () => {
      cancelled = true;
    };
  }, [selected]);

  return (
    <div className="flex gap-6">
      <aside className="w-56 shrink-0 border border-gray-200 dark:border-gray-800 rounded-lg h-[600px] overflow-auto">
        <ul className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
          {initialList.map((p) => (
            <li key={p.name}>
              <button
                onClick={() => setSelected(p.name)}
                className={[
                  "w-full text-left px-3 py-2 hover:bg-indigo-50 dark:hover:bg-gray-800 transition",
                  selected === p.name
                    ? "bg-indigo-100 dark:bg-gray-700 font-semibold"
                    : "bg-transparent",
                ].join(" ")}
              >
                {p.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="flex-1">
        {!selected && <p className="text-gray-500">Select a Pokémon to see details.</p>}
        {selected && loading && <p className="animate-pulse">Loading {selected}...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {detail && !loading && !error && (
          <div className="max-w-sm rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900 shadow-sm">
            <div className="flex items-center justify-center mb-4 h-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={detail.sprite}
                alt={detail.name}
                className="h-28 w-28 object-contain drop-shadow-md"
                loading="lazy"
              />
            </div>
            <h2 className="text-xl font-bold capitalize mb-2 flex items-center gap-2">
              {detail.name}
              <span className="text-xs font-medium rounded bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700">
                #{detail.id}
              </span>
            </h2>
            <button
              type="button"
              className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
              onClick={() => alert(`${detail.name} added to team (demo)`)}
            >
              Add to my team
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
