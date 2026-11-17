import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { getLesson, glossary } from "@/lib/content";

export const metadata: Metadata = {
  title: "Glossary",
  description: "Short definitions for the words a new NSE investor meets first.",
};

export default function GlossaryPage() {
  const entries = glossary.slice().sort((a, b) => a.term.localeCompare(b.term));

  return (
    <>
      <PageIntro
        kicker="Glossary"
        title="The words, kept short"
        lede="Each definition is a starting point. The lesson next to it is the longer version. The official page still wins if they disagree."
        crumbs={[{ href: "/", label: "Home" }, { label: "Glossary" }]}
      />
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <ul className="space-y-8">
          {entries.map((entry) => {
            const lesson = entry.lesson ? getLesson(entry.lesson) : undefined;
            return (
              <li key={entry.id} id={entry.id} className="anchor border-b border-line pb-8">
                <h2 className="font-serif text-3xl">{entry.term}</h2>
                <p className="mt-3 leading-relaxed">{entry.definition}</p>
                {lesson ? (
                  <p className="mt-3 text-sm">
                    <Link className="link" href={`/learn/${lesson.slug}`}>
                      Read {lesson.title}
                    </Link>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
