import { compId } from "@/app/helper";
import Link from "next/link";
import { NavLink } from "../components/NavLink";

const links: { href: string; label: string; exact?: boolean }[] = [
  { href: "/", label: "Home", exact: true },
  { href: "/my-team", label: "My Team" },
  { href: "/all-pokemon", label: "All Pokemon" },
];

export function Header() {
  return (
    <header
      {...compId("Header")}
      className="sticky top-0 z-40 backdrop-blur supports-backdrop-filter:bg-white/70 dark:supports-backdrop-filter:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800 shadow-sm"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-100 hover:opacity-80 transition-opacity"
          >
            <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Next.js Caching
            </span>
          </Link>
        </div>
        <nav aria-label="Main navigation" className="ml-auto">
          <ul className="flex items-center gap-2 sm:gap-4">
            {links.map(({ href, label, exact }) => (
              <li key={href}>
                <NavLink
                  href={href}
                  exact={exact}
                  className="relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
                  inactiveClassName="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-gray-800/70"
                  activeClassName="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 shadow-sm"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
