"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckBars } from "@/components/StudyStrip";
import { Icon } from "@/components/ui/Icon";
import { useStudy } from "@/lib/useStudy";

export type CompanyRow = {
  ticker: string;
  name: string;
  segment: "main" | "aims" | "gems";
  sector: string;
  summary: string;
};

export type SegmentOption = {
  slug: CompanyRow["segment"];
  short: string;
  summary: string;
};

export function CompanyBrowser({
  rows,
  segments,
}: {
  rows: CompanyRow[];
  segments: SegmentOption[];
}) {
  const study = useStudy();
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState<"all" | CompanyRow["segment"]>("all");
  const [sector, setSector] = useState("all");
  const sectors = useMemo(
    () => Array.from(new Set(rows.map((row) => row.sector))).sort((a, b) => a.localeCompare(b)),
    [rows],
  );
  const shown = rows
    .filter((row) => (segment === "all" ? true : row.segment === segment))
    .filter((row) => (sector === "all" ? true : row.sector === sector))
    .filter((row) => {
      const needle = query.trim().toLowerCase();
      if (!needle) return true;
      return `${row.name} ${row.ticker} ${row.sector} ${row.summary}`.toLowerCase().includes(needle);
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  const activeSegment = segments.find((item) => item.slug === segment);
  const filtered = query !== "" || segment !== "all" || sector !== "all";

  return (
    <div>
      <div className="glass grid gap-5 rounded-3xl p-5 sm:p-6 lg:grid-cols-[1.3fr_auto_minmax(0,0.8fr)] lg:items-end">
        <div>
          <label htmlFor="company-query" className="text-sm font-medium text-soft">
            Find a name
          </label>
          <div className="relative mt-2">
            <Icon name="search" className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              id="company-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Safaricom or SCOM"
              className="field pl-11!"
              autoComplete="off"
            />
          </div>
        </div>
        <fieldset>
          <legend className="text-sm font-medium text-soft">Segment</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <FilterChip label="All" pressed={segment === "all"} onClick={() => setSegment("all")} />
            {segments.map((item) => (
              <FilterChip
                key={item.slug}
                label={item.short}
                pressed={segment === item.slug}
                onClick={() => setSegment(item.slug)}
              />
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="company-sector" className="text-sm font-medium text-soft">
            Sector
          </label>
          <select
            id="company-sector"
            value={sector}
            onChange={(event) => setSector(event.target.value)}
            className="field mt-2"
          >
            <option value="all">All sectors</option>
            {sectors.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="font-mono text-xs tracking-wide text-muted">
          {shown.length} STUDY {shown.length === 1 ? "NAME" : "NAMES"}
        </p>
        {filtered ? (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ice hover:underline"
            onClick={() => {
              setQuery("");
              setSegment("all");
              setSector("all");
            }}
          >
            <Icon name="close" className="h-3.5 w-3.5" />
            Clear filters
          </button>
        ) : null}
      </div>
      {activeSegment ? <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{activeSegment.summary}</p> : null}

      {shown.length === 0 ? (
        <p className="mt-8 rounded-3xl border border-dashed border-hair-strong px-5 py-12 text-center text-muted">
          No study name matches. Clear the filters, or check the NSE list for a company this draft has not added.
        </p>
      ) : (
        <>
          <div className="panel mt-6 hidden overflow-hidden rounded-3xl md:block">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Study companies</caption>
              <thead>
                <tr className="border-b border-hair bg-white/2">
                  {["Ticker", "Company", "Sector", "Segment", "Your checks"].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-5 py-3.5 font-mono text-[0.68rem] font-normal tracking-[0.12em] text-faint uppercase"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shown.map((row) => {
                  const done = study.checks[row.ticker]?.length ?? 0;
                  return (
                    <tr key={row.ticker} className="group relative border-t border-hair transition-colors hover:bg-ice/4">
                      <td className="px-5 py-4 font-mono font-medium tracking-wide text-ice">{row.ticker}</td>
                      <th scope="row" className="px-5 py-4 font-medium">
                        <Link
                          className="text-fg after:absolute after:inset-0 group-hover:text-ice"
                          href={`/companies/${row.ticker.toLowerCase()}`}
                        >
                          {row.name}
                        </Link>
                      </th>
                      <td className="px-5 py-4 text-muted">{row.sector}</td>
                      <td className="px-5 py-4">
                        <span className="chip py-0.5! text-xs!">{labelFor(row.segment, segments)}</span>
                      </td>
                      <td className="w-40 px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <CheckBars done={done} label={false} />
                          </div>
                          <span className={`font-mono text-xs tabular-nums ${done === 3 ? "text-mint" : "text-faint"}`}>
                            {done}/3
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <ul className="mt-6 grid gap-3 md:hidden">
            {shown.map((row) => {
              const done = study.checks[row.ticker]?.length ?? 0;
              return (
                <li key={row.ticker}>
                  <Link href={`/companies/${row.ticker.toLowerCase()}`} className="glass block rounded-3xl p-5">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-mono font-medium tracking-wide text-ice">{row.ticker}</span>
                      <span className="chip py-0.5! text-xs!">{labelFor(row.segment, segments)}</span>
                    </span>
                    <span className="mt-2 block font-display text-lg font-semibold">{row.name}</span>
                    <span className="mt-1 block text-sm text-muted">{row.sector}</span>
                    <span className="mt-4 block">
                      <CheckBars done={done} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

function FilterChip({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`h-12 rounded-full border px-4 text-sm font-medium transition-colors ${
        pressed
          ? "border-ice bg-ice text-ink shadow-[0_0_20px_-4px_rgb(168_219_255/0.6)]"
          : "border-hair-strong text-soft hover:border-ice/50"
      }`}
    >
      {label}
    </button>
  );
}

function labelFor(segment: CompanyRow["segment"], segments: SegmentOption[]) {
  return segments.find((item) => item.slug === segment)?.short ?? segment;
}
