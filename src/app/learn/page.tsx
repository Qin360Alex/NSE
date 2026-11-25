import type { Metadata } from "next";
import Link from "next/link";
import { LearningPath } from "@/components/LearningPath";
import { PageIntro } from "@/components/PageIntro";
import { DoneFlag, ProgressSummary } from "@/components/Progress";
import { Icon } from "@/components/ui/Icon";
import { getLesson, lessons } from "@/lib/content";
import { stages } from "@/lib/path";

export const metadata: Metadata = {
  title: "Learn",
  description: "Eight short lessons on the Nairobi Securities Exchange, in order.",
};

export default function LearnPage() {
  const pathLessons = lessons.map(({ slug, title, minutes }) => ({ slug, title, minutes }));
  const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);

  return (
    <>
      <PageIntro
        kicker="Learn"
        title="The path, in order"
        lede="Eight short lessons in four stages. Marking a lesson as read stores that mark in this browser. Nothing is sent anywhere."
        crumbs={[{ href: "/", label: "Home" }, { label: "Learn" }]}
        meta={
          <>
            <span className="chip">
              <Icon name="book" className="h-3.5 w-3.5" />
              {lessons.length} lessons
            </span>
            <span className="chip">
              <Icon name="clock" className="h-3.5 w-3.5" />
              About {totalMinutes} minutes in all
            </span>
          </>
        }
        aside={<ProgressSummary slugs={lessons.map((lesson) => lesson.slug)} />}
      />

      <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8" aria-label="Learning path">
        <div className="glass rounded-4xl px-6 pt-12 pb-10 sm:px-12">
          <LearningPath lessons={pathLessons} />
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-5 py-16 sm:px-8">
        {stages.map((stage, stageIndex) => (
          <section key={stage.id} aria-labelledby={`stage-${stage.id}`}>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <p className="font-mono text-xs text-ice">Stage {stageIndex + 1}</p>
              <h2 id={`stage-${stage.id}`} className="font-display text-2xl font-semibold tracking-tight">
                {stage.label}
              </h2>
              <p className="text-sm text-muted">{stage.blurb}</p>
            </div>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {stage.lessons.map((slug) => {
                const lesson = getLesson(slug);
                if (!lesson) return null;
                const number = lessons.findIndex((item) => item.slug === slug) + 1;
                return (
                  <li key={slug}>
                    <Link
                      href={`/learn/${slug}`}
                      className="glass card-hover group flex h-full gap-5 rounded-3xl p-6"
                    >
                      <span className="font-display text-3xl leading-none font-semibold text-ice/80 tabular-nums">
                        {String(number).padStart(2, "0")}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="font-display text-xl font-semibold tracking-tight group-hover:text-ice">
                          {lesson.title}
                        </span>
                        <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{lesson.lede}</span>
                        <span className="mt-4 flex flex-wrap items-center gap-2">
                          <span className="chip">
                            <Icon name="clock" className="h-3.5 w-3.5" />
                            {lesson.minutes} min
                          </span>
                          <DoneFlag slug={slug} />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </>
  );
}
