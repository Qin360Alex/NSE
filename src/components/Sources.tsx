import { OutLink } from "@/components/OutLink";
import { reviewed } from "@/lib/site";
import type { Source } from "@/lib/types";

export function Sources({ sources }: { sources: Source[] }) {
  return (
    <section className="mt-12 border-t border-line pt-6">
      <h2 className="font-serif text-2xl">Sources to check</h2>
      <ul className="mt-4 space-y-2">
        {sources.map((source) => (
          <li key={`${source.label}-${source.href}`}>
            <OutLink href={source.href}>{source.label}</OutLink>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Study notes reviewed {reviewed}. If a source page has changed since
        then, the source wins.
      </p>
    </section>
  );
}
