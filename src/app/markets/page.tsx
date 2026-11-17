import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
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
        <div className="grid gap-4">
          {markets.map((market, index) => {
            const count = stocks.filter((stock) => stock.segment === market.slug).length;
            return (
              <article key={market.slug} className="grid gap-4 rounded-3xl border border-line bg-white p-6 md:grid-cols-[8rem_1fr_auto] md:items-center">
                <p className="font-serif text-3xl text-green">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h2 className="font-serif text-3xl">
                    <Link className="link" href={`/markets/${market.slug}`}>
                      {market.name}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted">{market.summary}</p>
                </div>
                <p className="text-sm font-semibold text-green">
                  {market.slug === "fixed-income" ? "Separate from shares" : `${count} study names`}
                </p>
              </article>
            );
          })}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          Listing rules were revised in 2023. The NSE&apos;s own pages still use the older names in places. Each market page says which label to trust when they disagree: the exchange page, with its date.
        </p>
      </div>
    </>
  );
}
