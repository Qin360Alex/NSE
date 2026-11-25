import { SourceStamp } from "@/components/ui/SourceStamp";
import { reviewed } from "@/lib/site";
import type { Source } from "@/lib/types";

export function Sources({ sources, className = "mt-14" }: { sources: Source[]; className?: string }) {
  return (
    <section className={`glass rounded-3xl p-6 sm:p-7 ${className}`} aria-labelledby="sources-title">
      <p className="eyebrow">Traceability</p>
      <h2 id="sources-title" className="mt-2 font-display text-xl font-semibold">
        Sources to check
      </h2>
      <ul className="mt-5 flex flex-col items-start gap-2.5">
        {sources.map((source) => (
          <li key={`${source.label}-${source.href}`} className="max-w-full">
            <SourceStamp source={source} />
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm leading-relaxed text-muted">
        Study notes reviewed {reviewed}. If a source page has changed since then, the source wins.
      </p>
    </section>
  );
}
