import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ShelfCard } from "@/components/ShelfCard";
import { Icon } from "@/components/ui/Icon";
import { markets, stocks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Markets",
  description: "The NSE segments a beginner actually meets, explained without a price board.",
};

export default function MarketsPage() {
  return (
    <>
      <PageIntro
        kicker="Markets"
        title="The shelves on the exchange"
        lede="Start with the Main segment. Use Alternative and Growth once you can already explain one large company. Keep bonds on their own shelf, because a bond is a loan."
        crumbs={[{ href: "/", label: "Home" }, { label: "Markets" }]}
      />
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm" aria-label="Suggested reading order">
          {markets.map((market, index) => (
            <li key={market.slug} className="flex items-center gap-2">
              <span className={`chip ${index === 0 ? "chip-gold" : ""}`}>
                <span className="font-mono text-[0.7rem] opacity-70">{index + 1}</span>
                {market.short}
              </span>
              {index < markets.length - 1 ? <Icon name="arrowRight" className="h-3.5 w-3.5 text-faint" /> : null}
            </li>
          ))}
        </ol>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {markets.map((market, index) => (
            <ShelfCard
              key={market.slug}
              market={market}
              index={index}
              count={stocks.filter((stock) => stock.segment === market.slug).length}
            />
          ))}
        </div>
        <div className="mt-8 flex max-w-3xl gap-3 rounded-2xl border border-gold/25 bg-gold/5 p-5 text-sm leading-relaxed text-soft">
          <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p>
            Listing rules were revised in 2023. The NSE&apos;s own pages still use the older names in places. Each
            market page says which label to trust when they disagree: the exchange page, with its date.
          </p>
        </div>
      </div>
    </>
  );
}
