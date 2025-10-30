import {
  compId,
  getMyTeamNames,
  pokeApi,
  removeFromMyTeam,
} from "@/app/helper";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Suspense } from "react";

export default async function MyTeamPage() {
  return (
    <main {...compId("MyTeam")} className={myTeamMainClass}>
      <h1 className={myTeamTitleClass}>My Team</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <MyTeamGrid />
      </Suspense>
    </main>
  );
}

async function MyTeamGrid() {
  const teamNames = await getMyTeamNames();
  const details = await Promise.all(
    teamNames.map(pokeApi.getDetails),
  );

  return (
    <div
      {...compId("MyTeamGrid")}
      className={myTeamGridClass}
    >
      {details.map((p) => (
        <article key={p.id} className={myTeamCardClass}>
          <div className={myTeamCardImageWrapperClass}>
            <img
              src={p.sprite}
              alt={p.name}
              className={myTeamCardImageClass}
              loading="lazy"
            />
          </div>
          <h2 className={myTeamCardTitleClass}>
            {p.name}
            <span className={myTeamCardIdBadgeClass}>
              #{p.id}
            </span>
          </h2>
          <form
            action={removeFromMyTeam}
            className={myTeamRemoveFormClass}
          >
            <input
              type="hidden"
              name="name"
              value={p.name}
            />
            <button
              type="submit"
              className={myTeamRemoveButtonClass}
            >
              Remove
            </button>
          </form>
        </article>
      ))}
    </div>
  );
}

// Presentation style constants (extracted from inline className strings)
const myTeamMainClass =
  "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10";
const myTeamTitleClass =
  "text-3xl sm:text-4xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-600";
const myTeamGridClass =
  "grid gap-6 sm:grid-cols-2 md:grid-cols-3";
const myTeamCardClass =
  "group relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm transition hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600";
const myTeamCardImageWrapperClass =
  "flex items-center justify-center mb-4 h-32";
const myTeamCardImageClass =
  "h-24 w-24 object-contain drop-shadow-md transition group-hover:scale-105";
const myTeamCardTitleClass =
  "text-lg font-semibold capitalize flex items-center gap-2 mb-3";
const myTeamCardIdBadgeClass =
  "text-xs font-medium rounded bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700";
const myTeamRemoveFormClass = "mt-auto";
const myTeamRemoveButtonClass =
  "inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2";
