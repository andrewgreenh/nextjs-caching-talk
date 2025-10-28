import { compId } from "@/app/helper";

export default async function AllPokemonIndex() {
  return (
    <p className="text-gray-500" {...compId("AllPokemonIndex")}>
      Select a Pokémon to see details.
    </p>
  );
}
