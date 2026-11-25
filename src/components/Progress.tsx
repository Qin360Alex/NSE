"use client";

import { Icon } from "@/components/ui/Icon";
import { toggleLesson } from "@/lib/progress";
import { useStudy } from "@/lib/useStudy";

export function ProgressSummary({ slugs }: { slugs: string[] }) {
  const study = useStudy();
  const count = slugs.filter((slug) => slug in study.lessons).length;
  const pct = slugs.length === 0 ? 0 : Math.round((count / slugs.length) * 100);
  return (
    <div className="glass rounded-3xl p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm text-muted">Lessons read on this device</p>
        <p className="font-display text-2xl font-semibold tabular-nums">
          {count}
          <span className="text-base font-normal text-muted"> / {slugs.length}</span>
        </p>
      </div>
      <div
        className="meter mt-4"
        role="progressbar"
        aria-label="Lessons read"
        aria-valuemin={0}
        aria-valuemax={slugs.length}
        aria-valuenow={count}
      >
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 text-xs text-faint">Stored in this browser only. Nothing is sent anywhere.</p>
    </div>
  );
}

export function DoneFlag({ slug }: { slug: string }) {
  const study = useStudy();
  const quiz = study.quiz[slug];
  if (!(slug in study.lessons) && !quiz) return null;
  return (
    <span className="flex flex-wrap gap-2">
      {slug in study.lessons ? (
        <span className="chip chip-mint">
          <Icon name="check" className="h-3.5 w-3.5" />
          Read
        </span>
      ) : null}
      {quiz ? (
        <span className="chip">
          Quiz {quiz.correct}/{quiz.total}
        </span>
      ) : null}
    </span>
  );
}

export function MarkRead({ slug }: { slug: string }) {
  const study = useStudy();
  const done = slug in study.lessons;
  return (
    <button
      type="button"
      aria-pressed={done}
      onClick={() => toggleLesson(slug)}
      className={`btn ${done ? "btn-ghost border-mint/50 text-mint" : "btn-primary"}`}
    >
      <Icon name="check" className="h-4 w-4" />
      {done ? "Marked as read" : "Mark this lesson as read"}
    </button>
  );
}
