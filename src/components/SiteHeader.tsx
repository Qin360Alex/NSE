"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchDialog } from "@/components/SearchDialog";

const links = [
  { href: "/learn", label: "Learn" },
  { href: "/markets", label: "Markets" },
  { href: "/companies", label: "Companies" },
  { href: "/glossary", label: "Glossary" },
  { href: "/about", label: "About" },
];

function isCurrent(path: string, href: string) {
  return path === href || path.startsWith(`${href}/`);
}

export function SiteHeader() {
  const path = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [searchPath, setSearchPath] = useState<string | null>(null);
  const menuOpen = menuPath === path;
  const searchOpen = searchPath === path;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target?.isContentEditable) {
        return;
      }
      if (event.key === "/" || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) {
        event.preventDefault();
        setMenuPath(null);
        setSearchPath(path);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [path]);

  return (
    <div className="sticky top-0 z-40">
      <header className="border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3 sm:px-8">
          <Link href="/" className="flex items-center gap-3 rounded-xl">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-pine font-serif text-lg text-gold" aria-hidden="true">
              S
            </span>
            <span>
              <span className="block font-serif text-xl leading-none">Swath</span>
              <span className="block text-xs text-muted">NSE study desk</span>
            </span>
          </Link>
          <nav className="ml-auto hidden items-center gap-6 lg:flex" aria-label="Primary">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(path, item.href) ? "page" : undefined}
                className={`text-sm font-semibold ${isCurrent(path, item.href) ? "text-green underline decoration-gold decoration-2 underline-offset-8" : "text-ink"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-4">
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-ink"
              aria-expanded={searchOpen}
              aria-controls="swath-search-dialog"
              onClick={() => {
                setMenuPath(null);
                setSearchPath(path);
              }}
            >
              Search
              <kbd className="hidden rounded border border-line px-1.5 py-0.5 text-xs text-muted sm:inline">/</kbd>
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuPath(menuOpen ? null : path)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="text-lg leading-none">
                {menuOpen ? "×" : "☰"}
              </span>
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav id="mobile-nav" className="border-t border-line px-5 py-2 lg:hidden" aria-label="Mobile">
            {links.map((item) => (
                <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(path, item.href) ? "page" : undefined}
                className="block py-3 text-lg font-semibold"
                onClick={() => setMenuPath(null)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
      {searchOpen ? (
        <div id="swath-search-dialog">
          <SearchDialog onClose={() => setSearchPath(null)} />
        </div>
      ) : null}
    </div>
  );
}
