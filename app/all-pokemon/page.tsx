import { compId } from "@/app/helper";

export default async function AllPokemonIndex() {
  return (
    <p className={allPokemonIndexParagraphClass} {...compId("AllPokemonIndex")}>
      Select a Pokémon to see details.
    </p>
  );
}

// Presentation style constants
const allPokemonIndexParagraphClass = "text-gray-500";
