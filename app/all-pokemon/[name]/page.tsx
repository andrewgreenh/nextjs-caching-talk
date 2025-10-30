import { addToMyTeam, compId } from "@/app/helper";

export default async function PokemonDetailPage() {
  return (
    <div {...compId("PokemonDetailPage")}>
      <PokemonDetails />
    </div>
  );
}

async function PokemonDetails() {
  const id = 7;
  const name = "squirtle";
  const sprite = `	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <div
      {...compId("PokemonDetails")}
      className={pokemonDetailsWrapperClass}
    >
      <div className={pokemonDetailsImageWrapperClass}>
        <img
          src={sprite}
          alt={name}
          className={pokemonDetailsImageClass}
          loading="lazy"
        />
      </div>
      <h2 className={pokemonDetailsTitleClass}>
        {name}
        <span className={pokemonDetailsIdBadgeClass}>
          #{id}
        </span>
      </h2>
      <form
        action={addToMyTeam}
        className={pokemonDetailsFormClass}
      >
        <input type="hidden" name="name" value={name} />
        <button
          type="submit"
          className={pokemonDetailsButtonClass}
        >
          Add to my team
        </button>
      </form>
    </div>
  );
}

// Presentation style constants
const pokemonDetailsWrapperClass =
  "max-w-sm rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900 shadow-sm";
const pokemonDetailsImageWrapperClass =
  "flex items-center justify-center mb-4 h-32";
const pokemonDetailsImageClass =
  "h-28 w-28 object-contain drop-shadow-md";
const pokemonDetailsTitleClass =
  "text-xl font-bold capitalize mb-2 flex items-center gap-2";
const pokemonDetailsIdBadgeClass =
  "text-xs font-medium rounded bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700";
const pokemonDetailsFormClass = "mt-4";
const pokemonDetailsButtonClass =
  "inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";
