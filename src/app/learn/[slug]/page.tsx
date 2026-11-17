import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/Blocks";
import { PageIntro } from "@/components/PageIntro";
import { DoneFlag, MarkRead } from "@/components/Progress";
import { Quiz } from "@/components/Quiz";
import { Sources } from "@/components/Sources";
import { getLesson, lessonNeighbors, lessons } from "@/lib/content";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Lesson" };
  return { title: lesson.title, description: lesson.lede };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const { index, prev, next } = lessonNeighbors(slug);

  return (
    <>
      <PageIntro
        kicker={`Lesson ${index + 1} of ${lessons.length}`}
        title={lesson.title}
        lede={lesson.lede}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/learn", label: "Learn" },
          { label: lesson.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">{lesson.minutes} min read</p>
          <DoneFlag slug={lesson.slug} />
        </div>
        <Blocks blocks={lesson.blocks} />
        <div className="mt-8">
          <MarkRead slug={lesson.slug} />
        </div>
        <Quiz key={lesson.slug} questions={lesson.questions} />
        <Sources sources={lesson.sources} />
        <nav className="mt-10 grid gap-3 border-t border-line pt-6 sm:grid-cols-2" aria-label="Lessons">
          {prev ? (
            <Link href={`/learn/${prev.slug}`} className="rounded-3xl border border-line bg-white p-4">
              <span className="text-xs font-semibold text-green">Previous</span>
              <span className="mt-1 block font-semibold">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/learn/${next.slug}`} className="rounded-3xl border border-line bg-white p-4 sm:text-right">
              <span className="text-xs font-semibold text-green">Next</span>
              <span className="mt-1 block font-semibold">{next.title}</span>
            </Link>
          ) : null}
        </nav>
      </article>
    </>
  );
}
