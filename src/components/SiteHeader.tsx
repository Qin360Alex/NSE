"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SwathLogo } from "@/components/brand/SwathMark";
import { SearchDialog } from "@/components/SearchDialog";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SEARCH_EVENT } from "@/lib/nina";

const links: { href: string; label: string; icon: IconName }[] = [
  { href: "/learn", label: "Learn", icon: "book" },
  { href: "/markets", label: "Markets", icon: "layers" },
  { href: "/companies", label: "Companies", icon: "bank" },
  { href: "/glossary", label: "Glossary", icon: "type" },
  { href: "/desk", label: "Desk", icon: "desk" },
];

function isCurrent(path: string, href: string) {
  return path === href || path.startsWith(`${href}/`);
}

export function SiteHeader() {
  const path = usePathname();
  const [searchPath, setSearchPath] = useState<string | null>(null);
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
        setSearchPath(path);
      }
    }
    function onOpen() {
      setSearchPath(path);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(SEARCH_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(SEARCH_EVENT, onOpen);
    };
  }, [path]);

  return (
    <>
      <div className="site-chrome sticky top-0 z-40">
        <header className="header-glass">
          <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:px-8">
            <Link href="/" className="flex shrink-0 items-center rounded-xl" aria-label="Swath home">
              <SwathLogo />
            </Link>
            <span className="edu-tag hidden sm:inline-flex">Education only</span>
            <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Primary">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(path, item.href) ? "page" : undefined}
                  className="nav-link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-2 lg:ml-6">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2.5 rounded-xl border border-hair-strong bg-white/2 px-3 text-sm text-muted transition-colors hover:border-ice/50 hover:text-fg"
                aria-expanded={searchOpen}
                aria-controls="swath-search-dialog"
                aria-label="Search the study notes"
                onClick={() => setSearchPath(path)}
              >
                <Icon name="search" className="h-4 w-4" />
                <span className="hidden sm:inline">Search notes</span>
                <kbd className="key hidden sm:inline-grid">/</kbd>
              </button>
              <Link href="/learn" className="btn btn-primary btn-sm hidden md:inline-flex">
                Start learning
              </Link>
            </div>
          </div>
        </header>
        {searchOpen ? (
          <div id="swath-search-dialog">
            <SearchDialog onClose={() => setSearchPath(null)} />
          </div>
        ) : null}
      </div>
      <nav
        className="site-chrome tabbar fixed inset-x-0 bottom-0 z-40 lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        aria-label="Primary"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {links.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent(path, item.href) ? "page" : undefined}
                className="tab-link"
              >
                <Icon name={item.icon} className="h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
