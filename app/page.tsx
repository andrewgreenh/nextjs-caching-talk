import { compId } from "@/app/helper";

export default async function Home() {
  return (
    <main
      {...compId("Home")}
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-12"
    >
      {/* Decorative gradient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-linear-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-3xl" />
      </div>
      <h1 className="text-center font-extrabold tracking-tight">
        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-linear-to-r from-yellow-400 via-red-500 to-purple-600 drop-shadow-sm">
          Pokemon team configurator
        </span>
      </h1>
      <p className="mt-6 max-w-xl text-center text-base sm:text-lg text-gray-600 dark:text-gray-300">
        Craft your ultimate squad. Analyze types, balance stats, and optimize synergy.
      </p>
    </main>
  );
}
