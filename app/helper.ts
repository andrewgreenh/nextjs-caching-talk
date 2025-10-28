import { request } from "node:http";

export function getRenderTime() {
  return Math.round(((performance.now() / 1000) % 100) * 10) / 10;
}

export function compId(name: string) {
  const time = getRenderTime();
  console.log(`[${name}] rendered at ${time}`);
  return {
    "data-component": name,
    "data-rendered-at": time,
  };
}

export async function httpGet(url: string) {
  return new Promise<any>((resolve) => {
    const req = request(url, { method: "GET" });
    req.end();

    req.on("response", async (res) => {
      let data = "";
      for await (const chunk of res) {
        data += chunk;
      }
      resolve(JSON.parse(data));
    });
  });
}

export type PokemonSummary = {
  name: string;
  url: string;
};

export const pokeApi = {
  async get151(): Promise<{ results: PokemonSummary[] }> {
    return await httpGet("http://localhost:3001?url=https://pokeapi.co/api/v2/pokemon?limit=151");
  },
  async getDetails(name: string) {
    return await httpGet(
      `http://localhost:3001?url=https://pokeapi.co/api/v2/pokemon/${name}`
    ).then((x: any) => {
      return {
        name: x.name as string,
        sprite: x.sprites.front_default as string,
        id: x.id as number,
      };
    });
  },
};
