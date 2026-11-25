import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Icon } from "@/components/ui/Icon";
import { getLesson, glossary } from "@/lib/content";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Short definitions for the words a new NSE investor meets first.",
};

export default function GlossaryPage() {
  const entries = glossary.slice().sort((a, b) => a.term.localeCompare(b.term));
  const letters = Array.from(new Set(entries.map((entry) => entry.term[0].toUpperCase())));
  const groups = letters.map((letter) => ({
    letter,
    entries: entries.filter((entry) => entry.term[0].toUpperCase() === letter),
  }));

  return (
    <>
      <PageIntro
        kicker="Glossary"
        title="The words, kept short"
        lede="Each definition is a starting point. The lesson next to it is the longer version. The official page still wins if they disagree."
        crumbs={[{ href: "/", label: "Home" }, { label: "Glossary" }]}
        meta={<span className="chip">{entries.length} terms</span>}
      />
      <div className="sticky top-16 z-20 border-b border-hair bg-night/80 backdrop-blur-md">
        <nav className="scroll-x mx-auto max-w-6xl px-5 sm:px-8" aria-label="Jump to letter">
          <ul className="flex gap-1.5 py-3">
            {letters.map((letter) => (
              <li key={letter}>
                <a
                  href={`#letter-${letter}`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-hair font-mono text-sm text-muted transition-colors hover:border-ice/60 hover:text-ice"
                >
                  {letter}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl space-y-14 px-5 py-12 sm:px-8">
        {groups.map((group) => (
          <section key={group.letter} id={`letter-${group.letter}`} className="anchor" aria-labelledby={`h-${group.letter}`}>
            <h2
              id={`h-${group.letter}`}
              className="font-display text-5xl font-bold text-ice/80 [text-shadow:0_0_30px_rgb(168_219_255/0.35)]"
            >
              {group.letter}
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {group.entries.map((entry) => {
                const lesson = entry.lesson ? getLesson(entry.lesson) : undefined;
                return (
                  <li key={entry.id} id={entry.id} className="anchor glass flex flex-col rounded-3xl p-6 target:border-ice/60">
                    <h3 className="font-display text-xl font-semibold tracking-tight">{entry.term}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-soft">{entry.definition}</p>
                    {lesson ? (
                      <Link
                        className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-ice hover:underline"
                        href={`/learn/${lesson.slug}`}
                      >
                        <Icon name="book" className="h-4 w-4" />
                        Read {lesson.title}
                      </Link>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
