import {
  compId,
  getMyTeamNames,
  pokeApi,
} from "@/app/helper";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { NavLink } from "@/components/NavLink";
import { ReactNode, Suspense } from "react";

export default async function AllPokemonLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main
      {...compId("AllPokemonLayout")}
      className={allPokemonLayoutMainClass}
    >
      <h1 className={allPokemonLayoutTitleClass}>
        All Pokémon
      </h1>
      <div className={allPokemonLayoutContentClass}>
        <Suspense fallback={<LoadingSpinner />}>
          <AllPokemonSidebar />
        </Suspense>
        <section
          className={allPokemonLayoutChildrenSectionClass}
        >
          {children}
        </section>
      </div>
    </main>
  );
}

async function AllPokemonSidebar() {
  const list = await pokeApi.get151();
  const teamNamesPromise = getMyTeamNames();

  return (
    <aside
      {...compId("AllPokemonSidebar")}
      className={allPokemonSidebarClass}
    >
      <ul className={allPokemonSidebarListClass}>
        {list.map((p) => (
          <li key={p.name}>
            <NavLink
              href={`/all-pokemon/${p.name.toLowerCase()}`}
              exact
              className={allPokemonNavLinkBaseClass}
              inactiveClassName={
                allPokemonNavLinkInactiveClass
              }
              activeClassName={allPokemonNavLinkActiveClass}
            >
              {p.name}

              <Suspense>
                <TeamBadge
                  name={p.name}
                  teamNamesPromise={teamNamesPromise}
                />
              </Suspense>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

async function TeamBadge(props: {
  name: string;
  teamNamesPromise: Promise<string[]>;
}) {
  const teamNames = await props.teamNamesPromise;
  const shouldShowBadge = teamNames.includes(props.name);

  if (!shouldShowBadge) {
    return null;
  }

  return (
    <span
      className="ml-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full"
      title="Part of my team"
      {...compId("TeamBadge")}
    >
      🏆
    </span>
  );
}

// Presentation style constants
const allPokemonLayoutMainClass =
  "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8";
const allPokemonLayoutTitleClass =
  "text-2xl font-bold mb-6";
const allPokemonLayoutContentClass = "flex gap-6";
const allPokemonLayoutChildrenSectionClass = "flex-1";
const allPokemonSidebarClass =
  "w-56 shrink-0 border border-gray-200 dark:border-gray-800 rounded-lg h-[600px] overflow-auto";
const allPokemonSidebarListClass =
  "divide-y divide-gray-100 dark:divide-gray-800 text-sm";
const allPokemonNavLinkBaseClass =
  "block px-3 py-2 text-sm transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60";
const allPokemonNavLinkInactiveClass =
  "text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/70";
const allPokemonNavLinkActiveClass =
  "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold shadow-inner";
