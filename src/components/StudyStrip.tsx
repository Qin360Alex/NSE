"use client";

import Link from "next/link";
import { useStudy } from "@/lib/useStudy";

export type StudyRow = {
  ticker: string;
  name: string;
  segment: string;
  sector?: string;
};

export const CHECK_COUNT = 3;

export function CheckBars({ done, label = true }: { done: number; label?: boolean }) {
  return (
    <div>
      <div className="bars" aria-hidden="true">
        {Array.from({ length: CHECK_COUNT }, (_, index) => (
          <i key={index} data-done={index < done} />
        ))}
      </div>
      {label ? (
        <p className={`mt-2 text-xs ${done === CHECK_COUNT ? "text-mint" : "text-muted"}`}>
          {done === 0 ? "Not started" : done === CHECK_COUNT ? "All 3 checks done" : `${done} of 3 checks`}
        </p>
      ) : (
        <span className="sr-only">
          {done} of {CHECK_COUNT} checks done
        </span>
      )}
    </div>
  );
}

/* The mockup's ticker strip, with check progress where the price sparkline would be. */
export function StudyStrip({ rows, variant = "strip" }: { rows: StudyRow[]; variant?: "strip" | "grid" }) {
  const study = useStudy();
  const wrapper =
    variant === "strip"
      ? "grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-hair bg-hair lg:grid-cols-4"
      : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <ul className={wrapper}>
      {rows.map((row) => {
        const done = study.checks[row.ticker]?.length ?? 0;
        return (
          <li key={row.ticker} className={`min-w-0 ${variant === "strip" ? "bg-deep" : ""}`}>
            <Link
              href={`/companies/${row.ticker.toLowerCase()}`}
              className={`group flex h-full flex-col gap-1 p-5 transition-colors hover:bg-ice/5 ${
                variant === "grid" ? "glass card-hover rounded-3xl" : ""
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-mono text-base font-medium tracking-wide text-fg group-hover:text-ice">
                  {row.ticker}
                </span>
                <span className="chip px-2! py-0.5! text-[0.7rem]!">{row.segment}</span>
              </span>
              <span className="truncate text-sm text-muted">{row.name}</span>
              {row.sector && variant === "grid" ? (
                <span className="truncate text-xs text-faint">{row.sector}</span>
              ) : null}
              <span className="mt-2">
                <CheckBars done={done} />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
