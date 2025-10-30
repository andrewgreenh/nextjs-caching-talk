import { cookies } from "next/headers";
import { request } from "node:http";

export function getRenderTime() {
  return (
    Math.round(((performance.now() / 1000) % 100) * 10) / 10
  );
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

export type PokemonDetails = {
  name: string;
  sprite: string;
  id: number;
};

export const pokeApi = {
  async get151(): Promise<PokemonSummary[]> {
    return await httpGet(
      "http://localhost:3001?url=https://pokeapi.co/api/v2/pokemon?limit=151",
    ).then((x) => x.results);
  },
  async getDetails(name: string) {
    return await httpGet(
      `http://localhost:3001?url=https://pokeapi.co/api/v2/pokemon/${name}`,
    ).then((x: any) => {
      return {
        name: x.name as string,
        sprite: x.sprites.front_default as string,
        id: x.id as number,
      };
    });
  },
};

const TEAM_COOKIE = "my-team";
const TEAM_MAX = 6;

async function readTeamCookie(): Promise<string[]> {
  const store = await cookies();
  const raw = store.get(TEAM_COOKIE)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed
        .filter((x) => typeof x === "string")
        .map((x) => x.toLowerCase());
    }
  } catch {
    // Ignore malformed cookie
  }
  return [];
}

async function writeTeamCookie(names: string[]) {
  const store = await cookies();
  store.set({
    name: TEAM_COOKIE,
    value: JSON.stringify(names),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function addToMyTeam(formData: FormData) {
  "use server";
  const name = formData
    .get("name")
    ?.toString()
    .toLowerCase();
  if (!name) return;
  const current = await readTeamCookie();
  if (current.includes(name)) return;
  const next = current.slice(0, TEAM_MAX - 1);
  next.unshift(name);
  await writeTeamCookie(next);
}

export async function removeFromMyTeam(formData: FormData) {
  "use server";
  const name = formData
    .get("name")
    ?.toString()
    .toLowerCase();
  if (!name) return;
  const current = await readTeamCookie();
  const next = current.filter((n) => n !== name);
  await writeTeamCookie(next);
}

export async function getMyTeamNames(): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await readTeamCookie();
}
