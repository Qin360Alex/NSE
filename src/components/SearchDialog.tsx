"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { openNina } from "@/lib/nina";
import { searchNotes, type SearchHit } from "@/lib/search";

function groupHits(hits: SearchHit[]) {
  const groups: { label: string; items: { hit: SearchHit; index: number }[] }[] = [];
  hits.forEach((hit, index) => {
    let group = groups.find((item) => item.label === hit.group);
    if (!group) {
      group = { label: hit.group, items: [] };
      groups.push(group);
    }
    group.items.push({ hit, index });
  });
  return groups;
}

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const results = searchNotes(query);
  const groups = groupHits(results);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
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

  useEffect(() => {
    document.getElementById(`search-opt-${cursor}`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

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
      className="overlay-in fixed inset-0 z-50 flex items-start justify-center bg-night/70 px-4 pt-[9vh] backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="pop-in glass glass-blur w-full max-w-xl overflow-hidden rounded-3xl bg-surface/90"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="sr-only">
          Search Swath
        </h2>
        <div className="flex items-center gap-3 border-b border-hair px-5">
          <Icon name="search" className="h-5 w-5 shrink-0 text-ice" />
          <label className="sr-only" htmlFor="swath-search">
            Search the study notes
          </label>
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
            className="h-16 w-full bg-transparent text-lg text-fg outline-none placeholder:text-faint"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={results[cursor] ? `search-opt-${cursor}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="key">esc</kbd>
        </div>
        <ul id="search-results" role="listbox" aria-label="Search results" className="max-h-[52vh] overflow-auto py-2">
          {results.length === 0 ? (
            <li className="px-5 py-8 text-sm leading-relaxed text-muted" role="presentation">
              Nothing in the study notes matches that. Try dividend, CDS, or a ticker such as SCOM. Swath searches these
              notes only. It will not invent an answer.
            </li>
          ) : (
            groups.map((group) => (
              <li key={group.label} role="presentation">
                <p className="eyebrow px-5 pt-3 pb-1.5 text-faint!">{query ? group.label : "Start here"}</p>
                <ul role="presentation">
                  {group.items.map(({ hit, index }) => (
                    <li key={hit.href} id={`search-opt-${index}`} role="option" aria-selected={index === cursor}>
                      <Link
                        href={hit.href}
                        onClick={onClose}
                        onMouseEnter={() => setCursor(index)}
                        className={`mx-2 flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 transition-colors ${
                          index === cursor ? "bg-ice/10 text-fg" : "text-soft"
                        }`}
                      >
                        <span className="min-w-0 truncate font-medium">{hit.title}</span>
                        <span className="flex shrink-0 items-center gap-2">
                          <span className="font-mono text-xs text-ice">{hit.kicker}</span>
                          {index === cursor ? <Icon name="arrowRight" className="h-4 w-4 text-ice" /> : null}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))
          )}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hair px-5 py-3 text-xs text-faint">
          <span className="hidden items-center gap-3 sm:flex">
            <span className="flex items-center gap-1.5">
              <kbd className="key">↑</kbd>
              <kbd className="key">↓</kbd> move
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="key">↵</kbd> open
            </span>
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 font-medium text-nina hover:underline"
            onClick={() => {
              const question = query.trim();
              onClose();
              openNina(question || undefined);
            }}
          >
            <Icon name="sparkle" className="h-3.5 w-3.5" />
            {query.trim() ? "Ask Nina instead" : "Ask Nina a question"}
          </button>
        </div>
      </div>
    </div>
  );
}
