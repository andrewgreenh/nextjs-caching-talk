import { compId, PokemonDetails } from "@/app/helper";

export default async function MyTeamPage() {
  const details: PokemonDetails[] = [
    {
      id: 7,
      name: "squirtle",
      sprite: `	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png`,
    },
  ];

  return (
    <main {...compId("MyTeam")} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-r from-indigo-500 via-purple-500 to-pink-600">
        My Team
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {details.map((p) => (
          <article
            key={p.id}
            className="group relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm transition hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600"
          >
            <div className="flex items-center justify-center mb-4 h-32">
              <img
                src={p.sprite}
                alt={p.name}
                className="h-24 w-24 object-contain drop-shadow-md transition group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h2 className="text-lg font-semibold capitalize flex items-center gap-2">
              {p.name}
              <span className="text-xs font-medium rounded bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700">
                #{p.id}
              </span>
            </h2>
          </article>
        ))}
      </div>
    </main>
  );
}
