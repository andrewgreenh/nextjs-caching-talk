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

export function AllPokemon({
  initialList,
}: AllPokemonProps) {
  const [selected, setSelected] = useState<string | null>(
    null,
  );
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
    <div className={allPokemonWrapperClass}>
      <aside className={allPokemonSidebarClass}>
        <ul className={allPokemonSidebarListClass}>
          {initialList.map((p) => (
            <li key={p.name}>
              <button
                onClick={() => setSelected(p.name)}
                className={
                  selected === p.name
                    ? allPokemonListItemActiveClass
                    : allPokemonListItemClass
                }
              >
                {p.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className={allPokemonDetailSectionClass}>
        {!selected && (
          <p className={allPokemonIndexParagraphClass}>
            Select a Pokémon to see details.
          </p>
        )}
        {selected && loading && (
          <p className={allPokemonLoadingParagraphClass}>
            Loading {selected}...
          </p>
        )}
        {error && (
          <p className={allPokemonErrorParagraphClass}>
            Error: {error}
          </p>
        )}
        {detail && !loading && !error && (
          <div className={allPokemonCardWrapperClass}>
            <div
              className={allPokemonCardImageWrapperClass}
            >
              <img
                src={detail.sprite}
                alt={detail.name}
                className={allPokemonCardImageClass}
                loading="lazy"
              />
            </div>
            <h2 className={allPokemonCardTitleClass}>
              {detail.name}
              <span className={allPokemonCardIdBadgeClass}>
                #{detail.id}
              </span>
            </h2>
            <button
              type="button"
              className={allPokemonAddButtonClass}
              onClick={() =>
                alert(`${detail.name} added to team (demo)`)
              }
            >
              Add to my team
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

// Presentation style constants
const allPokemonWrapperClass = "flex gap-6";
const allPokemonSidebarClass =
  "w-56 shrink-0 border border-gray-200 dark:border-gray-800 rounded-lg h-[600px] overflow-auto";
const allPokemonSidebarListClass =
  "divide-y divide-gray-100 dark:divide-gray-800 text-sm";
const allPokemonListItemClass =
  "w-full text-left px-3 py-2 hover:bg-indigo-50 dark:hover:bg-gray-800 transition bg-transparent";
const allPokemonListItemActiveClass =
  "w-full text-left px-3 py-2 hover:bg-indigo-50 dark:hover:bg-gray-800 transition bg-indigo-100 dark:bg-gray-700 font-semibold";
const allPokemonDetailSectionClass = "flex-1";
const allPokemonIndexParagraphClass = "text-gray-500";
const allPokemonLoadingParagraphClass = "animate-pulse";
const allPokemonErrorParagraphClass = "text-red-600";
const allPokemonCardWrapperClass =
  "max-w-sm rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900 shadow-sm";
const allPokemonCardImageWrapperClass =
  "flex items-center justify-center mb-4 h-32";
const allPokemonCardImageClass =
  "h-28 w-28 object-contain drop-shadow-md";
const allPokemonCardTitleClass =
  "text-xl font-bold capitalize mb-2 flex items-center gap-2";
const allPokemonCardIdBadgeClass =
  "text-xs font-medium rounded bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700";
const allPokemonAddButtonClass =
  "mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";
