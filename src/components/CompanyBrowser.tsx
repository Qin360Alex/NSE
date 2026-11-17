"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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

  return (
    <div>
      <div className="grid gap-4 rounded-3xl border border-line bg-white p-4 sm:p-5 lg:grid-cols-[1.4fr_auto_auto]">
        <label className="block">
          <span className="text-sm font-semibold">Find a name</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Safaricom or SCOM"
            className="mt-2 h-12 w-full rounded-2xl border border-line bg-paper px-4 outline-none"
          />
        </label>
        <fieldset>
          <legend className="text-sm font-semibold">Segment</legend>
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
        <label className="block">
          <span className="text-sm font-semibold">Sector</span>
          <select
            value={sector}
            onChange={(event) => setSector(event.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border border-line bg-paper px-3"
          >
            <option value="all">All sectors</option>
            {sectors.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted">
          {shown.length} study {shown.length === 1 ? "name" : "names"}
        </p>
        {query || segment !== "all" || sector !== "all" ? (
          <button
            type="button"
            className="text-sm font-semibold text-green"
            onClick={() => {
              setQuery("");
              setSegment("all");
              setSector("all");
            }}
          >
            Clear filters
          </button>
        ) : null}
      </div>
      {activeSegment ? <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{activeSegment.summary}</p> : null}
      {shown.length === 0 ? (
        <p className="mt-8 rounded-3xl border border-dashed border-line px-5 py-10 text-center text-muted">
          No study name matches. Clear the filters, or check the NSE list for a company this draft has not added.
        </p>
      ) : (
        <>
          <div className="mt-6 hidden overflow-hidden rounded-3xl border border-line bg-white md:block">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Study companies</caption>
              <thead className="bg-foam text-green">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Company</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Sector</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Segment</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((row) => (
                  <tr key={row.ticker} className="border-t border-line">
                    <th scope="row" className="px-4 py-4 font-semibold">
                      <Link className="link" href={`/companies/${row.ticker.toLowerCase()}`}>
                        {row.name}
                      </Link>
                    </th>
                    <td className="px-4 py-4 font-semibold">{row.ticker}</td>
                    <td className="px-4 py-4 text-muted">{row.sector}</td>
                    <td className="px-4 py-4 text-muted">{labelFor(row.segment, segments)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-6 space-y-3 md:hidden">
            {shown.map((row) => (
              <li key={row.ticker}>
                <Link href={`/companies/${row.ticker.toLowerCase()}`} className="block rounded-3xl border border-line bg-white p-4">
                  <span className="text-xs font-semibold text-green">{row.ticker}</span>
                  <span className="mt-1 block font-serif text-2xl">{row.name}</span>
                  <span className="mt-2 block text-sm text-muted">
                    {labelFor(row.segment, segments)} · {row.sector}
                  </span>
                </Link>
              </li>
            ))}
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
      className={`h-12 rounded-full px-4 text-sm font-semibold ${pressed ? "bg-green text-white" : "border border-line bg-paper text-ink"}`}
    >
      {label}
    </button>
  );
}

function labelFor(segment: CompanyRow["segment"], segments: SegmentOption[]) {
  return segments.find((item) => item.slug === segment)?.short ?? segment;
}
