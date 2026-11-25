import Link from "next/link";
import { ShelfGlyph } from "@/components/ui/ArcBackdrop";
import { Icon } from "@/components/ui/Icon";
import type { Market } from "@/lib/markets";

const levels: Record<Market["slug"], 0 | 1 | 2 | 3> = {
  main: 3,
  aims: 2,
  gems: 1,
  "fixed-income": 0,
};

export function ShelfCard({ market, count, index }: { market: Market; count: number; index: number }) {
  const lead = market.slug === "main";
  return (
    <Link
      href={`/markets/${market.slug}`}
      className={`card-hover group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-7 ${lead ? "lit" : "glass"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <ShelfGlyph level={levels[market.slug]} />
        <span className="font-mono text-xs text-faint">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className={`mt-6 text-sm font-medium ${market.slug === "fixed-income" ? "text-gold" : "text-ice"}`}>
        {market.short}
        {lead ? <span className="chip chip-gold ml-2 py-0! text-[0.68rem]!">Start here</span> : null}
      </p>
      <h3 className="mt-2 font-display text-2xl leading-tight font-semibold tracking-tight">{market.name}</h3>
      <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">{market.summary}</p>
      <p className="mt-6 flex items-center justify-between gap-3 border-t border-hair pt-4 text-sm">
        <span className="text-soft">
          {market.slug === "fixed-income" ? "Bonds, kept apart from shares" : `${count} study names`}
        </span>
        <Icon name="arrowRight" className="h-4 w-4 text-ice transition-transform group-hover:translate-x-1" />
      </p>
    </Link>
  );
}
