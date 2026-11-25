import { Icon } from "@/components/ui/Icon";
import { reviewedShort, sourceOrg } from "@/lib/site";
import type { Source } from "@/lib/types";

/* A dashed mono tag naming the source and the review date. The charter's traceability rule, made visible. */
export function SourceStamp({ source, showDate = true }: { source: Source; showDate?: boolean }) {
  return (
    <a className="stamp" href={source.href} target="_blank" rel="noopener noreferrer">
      <b>{sourceOrg(source.href)}</b>
      <span className="min-w-0 truncate">{source.label}</span>
      {showDate ? <span className="hidden shrink-0 text-faint sm:inline">· {reviewedShort}</span> : null}
      <Icon name="arrowUpRight" className="h-3.5 w-3.5 shrink-0" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/* A stamp for an answer that came from Swath's own notes. */
export function NoteStamp({ label }: { label: string }) {
  return (
    <span className="stamp">
      <b>Swath notes</b>
      <span className="min-w-0 truncate">{label}</span>
      <span className="shrink-0 text-faint">· {reviewedShort}</span>
    </span>
  );
}
