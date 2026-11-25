"use client";

import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { recordVisit, toggleCheck } from "@/lib/progress";
import { useStudy } from "@/lib/useStudy";

export function CheckList({ ticker, checks }: { ticker: string; checks: string[] }) {
  const study = useStudy();
  const done = study.checks[ticker] ?? [];
  const count = checks.filter((_, index) => done.includes(index)).length;
  const complete = count === checks.length;

  useEffect(() => {
    recordVisit(ticker);
  }, [ticker]);

  return (
    <section className="glass rounded-3xl p-6 sm:p-8" aria-labelledby="checks-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Where a price chart would be</p>
          <h2 id="checks-title" className="mt-2 display-md">
            Three checks
          </h2>
        </div>
        <span className={`chip tabular-nums ${complete ? "chip-mint" : "chip-ice"}`} aria-live="polite">
          {count} of {checks.length} done
        </span>
      </div>
      <ol className="mt-8">
        {checks.map((check, index) => {
          const isDone = done.includes(index);
          const isLast = index === checks.length - 1;
          return (
            <li key={check} className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  aria-pressed={isDone}
                  aria-label={`Check ${index + 1}: ${isDone ? "done, tap to undo" : "mark as done"}`}
                  onClick={() => toggleCheck(ticker, index)}
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-sm transition-all ${
                    isDone
                      ? "border-mint bg-mint text-ink shadow-[0_0_18px_rgb(91_214_160/0.55)]"
                      : "border-hair-strong text-muted hover:border-ice/60 hover:text-ice"
                  }`}
                >
                  {isDone ? <Icon name="check" className="h-5 w-5" /> : index + 1}
                </button>
                {!isLast ? (
                  <span
                    className={`my-1 w-px flex-1 transition-colors ${isDone ? "bg-mint/50" : "bg-hair-strong"}`}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <p
                className={`pt-2 leading-relaxed transition-colors ${isLast ? "" : "pb-8"} ${
                  isDone ? "text-muted line-through decoration-mint/40" : "text-soft"
                }`}
              >
                {check}
              </p>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 rounded-2xl border border-hair bg-white/2 px-4 py-3 text-sm leading-relaxed text-muted">
        {complete
          ? "All three done. That is a clearer picture of what you still need to read, not a reason to buy or sell."
          : "Tick each check when you have done it. Your ticks stay in this browser only."}
      </p>
    </section>
  );
}
