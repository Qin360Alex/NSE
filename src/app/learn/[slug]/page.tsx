import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, headingId } from "@/components/Blocks";
import { AskNinaButton } from "@/components/nina/AskNinaButton";
import { PageIntro } from "@/components/PageIntro";
import { DoneFlag, MarkRead } from "@/components/Progress";
import { Quiz } from "@/components/Quiz";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Sources } from "@/components/Sources";
import { Icon } from "@/components/ui/Icon";
import { getLesson, lessonNeighbors, lessons } from "@/lib/content";
import { stageFor } from "@/lib/path";

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
  const stage = stageFor(lesson.slug);
  const headings = lesson.blocks.filter((block) => block.type === "h2").map((block) => block.text);

  return (
    <>
      <ReadingProgress />
      <PageIntro
        kicker={`Lesson ${index + 1} of ${lessons.length}${stage ? ` · ${stage.label}` : ""}`}
        title={lesson.title}
        lede={lesson.lede}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/learn", label: "Learn" },
          { label: lesson.title },
        ]}
        meta={
          <>
            <span className="chip">
              <Icon name="clock" className="h-3.5 w-3.5" />
              {lesson.minutes} min read
            </span>
            <span className="chip">
              <Icon name="quiz" className="h-3.5 w-3.5" />
              {lesson.questions.length} questions
            </span>
            <DoneFlag slug={lesson.slug} />
          </>
        }
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_17rem]">
        <article className="min-w-0 max-w-[68ch]">
          <Blocks blocks={lesson.blocks} />
          <div className="mt-12 flex flex-wrap items-center gap-3 rounded-3xl border border-hair bg-white/2 p-5">
            <MarkRead slug={lesson.slug} />
            <p className="text-sm text-muted">Saved in this browser only.</p>
          </div>
          <Quiz key={lesson.slug} slug={lesson.slug} questions={lesson.questions} />
          <Sources sources={lesson.sources} />
          <nav className="mt-12 grid gap-3 sm:grid-cols-2" aria-label="Lessons">
            {prev ? (
              <Link href={`/learn/${prev.slug}`} className="glass card-hover group rounded-3xl p-5">
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <Icon name="arrowLeft" className="h-3.5 w-3.5" />
                  Previous
                </span>
                <span className="mt-2 block font-display font-semibold group-hover:text-ice">{prev.title}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next ? (
              <Link href={`/learn/${next.slug}`} className="lit card-hover group rounded-3xl p-5 sm:text-right">
                <span className="flex items-center gap-1.5 text-xs text-gold sm:justify-end">
                  Next up
                  <Icon name="arrowRight" className="h-3.5 w-3.5" />
                </span>
                <span className="mt-2 block font-display font-semibold group-hover:text-ice">{next.title}</span>
              </Link>
            ) : (
              <Link href="/desk" className="lit card-hover group rounded-3xl p-5 sm:text-right">
                <span className="flex items-center gap-1.5 text-xs text-gold sm:justify-end">
                  Path complete
                  <Icon name="arrowRight" className="h-3.5 w-3.5" />
                </span>
                <span className="mt-2 block font-display font-semibold group-hover:text-ice">Open your desk</span>
              </Link>
            )}
          </nav>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            {headings.length > 0 ? (
              <nav className="glass rounded-3xl p-5" aria-label="In this lesson">
                <p className="eyebrow text-faint!">In this lesson</p>
                <ol className="mt-4 space-y-2.5 text-sm">
                  {headings.map((heading) => (
                    <li key={heading}>
                      <a href={`#${headingId(heading)}`} className="block leading-snug text-muted hover:text-ice">
                        {heading}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#quiz" className="block text-muted hover:text-ice">
                      Check yourself
                    </a>
                  </li>
                </ol>
              </nav>
            ) : null}
            <div className="glass rounded-3xl p-5">
              <p className="text-sm text-muted">Stuck on a word?</p>
              <AskNinaButton
                question={`Explain ${lesson.title.toLowerCase()}`}
                label="Ask Nina about this"
                className="btn btn-ghost btn-sm mt-3 w-full border-nina/40 text-nina hover:border-nina/70! hover:bg-nina/10!"
              />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
