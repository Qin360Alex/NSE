import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { DoneFlag, ProgressSummary } from "@/components/Progress";
import { lessons } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learn",
  description: "Eight short lessons on the Nairobi Securities Exchange, in order.",
};

export default function LearnPage() {
  return (
    <>
      <PageIntro
        kicker="Learn"
        title="The path, in order"
        lede="Each lesson is a few minutes. Marking one as read only stores that mark in this browser. Nothing is sent anywhere."
        crumbs={[{ href: "/", label: "Home" }, { label: "Learn" }]}
      />
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <ProgressSummary total={lessons.length} />
        <ol className="mt-8">
          {lessons.map((lesson, index) => (
            <li key={lesson.slug} className="grid grid-cols-[auto_1fr] gap-4">
              <div className="flex flex-col items-center">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-pine font-serif text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {index < lessons.length - 1 ? <span className="w-px flex-1 bg-line" /> : null}
              </div>
              <article className="pb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-serif text-3xl">
                    <Link className="link" href={`/learn/${lesson.slug}`}>
                      {lesson.title}
                    </Link>
                  </h2>
                  <DoneFlag slug={lesson.slug} />
                </div>
                <p className="mt-2 leading-relaxed text-muted">{lesson.lede}</p>
                <p className="mt-2 text-sm text-muted">{lesson.minutes} min read</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
