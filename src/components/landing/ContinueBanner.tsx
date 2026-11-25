"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { PathLesson } from "@/lib/path";
import { useStudy } from "@/lib/useStudy";

/* For a returning learner: a quiet way back to where they stopped. */
export function ContinueBanner({ lessons }: { lessons: PathLesson[] }) {
  const study = useStudy();
  const read = lessons.filter((lesson) => lesson.slug in study.lessons).length;
  if (read === 0) return null;
  const next = lessons.find((lesson) => !(lesson.slug in study.lessons));

  return (
    <div className="fade-up glass mt-8 flex flex-wrap items-center gap-4 rounded-2xl p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
        <Icon name="desk" className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1 text-sm">
        <p className="font-medium text-gold">Karibu tena</p>
        <p className="text-muted">
          {read} of {lessons.length} lessons read.{" "}
          {next ? (
            <>
              Next up: <span className="text-fg">{next.title}</span>
            </>
          ) : (
            "You have read the whole path."
          )}
        </p>
      </div>
      <Link href="/desk" className="btn btn-ghost btn-sm">
        Open your desk
        <Icon name="arrowRight" className="h-4 w-4" />
      </Link>
    </div>
  );
}
