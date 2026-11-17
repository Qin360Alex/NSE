"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { searchNotes } from "@/lib/search";

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const results = searchNotes(query);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function onInputKey(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((current) => Math.min(current + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter" && results[cursor]) {
      event.preventDefault();
      router.push(results[cursor].href);
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-pine/70 px-4 pt-[10vh]"
      onMouseDown={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="sr-only">
          Search Swath
        </h2>
        <label className="block border-b border-line px-5 py-4" htmlFor="swath-search">
          <span className="text-xs font-semibold text-green">Search the study notes</span>
          <input
            id="swath-search"
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCursor(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Try dividend, CDS, or SCOM"
            className="mt-2 w-full bg-transparent text-lg text-ink outline-none placeholder:text-muted"
            aria-controls="search-results"
            aria-activedescendant={results[cursor] ? `search-opt-${cursor}` : undefined}
            autoComplete="off"
          />
        </label>
        <ul id="search-results" role="listbox" aria-label="Search results" className="max-h-[50vh] overflow-auto py-2">
          {results.length === 0 ? (
            <li className="px-5 py-6 text-sm leading-relaxed text-muted">
              Nothing in the study notes matches that. Try dividend, CDS, or a ticker such as SCOM. Swath searches these notes only. It will not invent an answer.
            </li>
          ) : (
            results.map((hit, index) => (
              <li key={hit.href} id={`search-opt-${index}`} role="option" aria-selected={index === cursor}>
                <Link
                  href={hit.href}
                  onClick={onClose}
                  className={`flex items-baseline justify-between gap-4 px-5 py-3 ${index === cursor ? "bg-foam" : ""}`}
                >
                  <span className="font-medium text-ink">{hit.title}</span>
                  <span className="shrink-0 text-xs font-semibold text-green">{hit.kicker}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
