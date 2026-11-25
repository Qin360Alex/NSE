import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/Blocks";
import { PageIntro } from "@/components/PageIntro";
import { Sources } from "@/components/Sources";
import { StudyStrip } from "@/components/StudyStrip";
import { Icon } from "@/components/ui/Icon";
import { getMarket, markets, stocks } from "@/lib/content";

export function generateStaticParams() {
  return markets.map((market) => ({ slug: market.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const market = getMarket(slug);
  if (!market) return { title: "Market" };
  return { title: market.short, description: market.summary };
}

export default async function MarketPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const market = getMarket(slug);
  if (!market) notFound();
  const names = stocks.filter((stock) => stock.segment === market.slug).sort((a, b) => a.name.localeCompare(b.name));
  const position = markets.findIndex((item) => item.slug === market.slug);
  const sectors = new Set(names.map((stock) => stock.sector)).size;

  return (
    <>
      <PageIntro
        kicker={`Shelf ${position + 1} of ${markets.length} · ${market.short}`}
        title={market.name}
        lede={market.summary}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/markets", label: "Markets" },
          { label: market.short },
        ]}
        aside={
          <dl className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl">
            <div className="p-5">
              <dt className="text-xs text-muted">Study names</dt>
              <dd className="mt-1 font-display text-3xl font-semibold tabular-nums">
                {market.slug === "fixed-income" ? "–" : names.length}
              </dd>
            </div>
            <div className="p-5">
              <dt className="text-xs text-muted">Sectors</dt>
              <dd className="mt-1 font-display text-3xl font-semibold tabular-nums">
                {market.slug === "fixed-income" ? "–" : sectors}
              </dd>
            </div>
            <div className="col-span-2 border-t border-hair p-5">
              <dt className="text-xs text-muted">Reading order</dt>
              <dd className="mt-1 text-sm text-soft">
                {position === 0 ? "Start here" : `After ${markets[position - 1].short}`}
              </dd>
            </div>
          </dl>
        }
      />
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Blocks blocks={market.blocks} />
        <Sources sources={market.sources} />
      </article>
      {names.length > 0 ? (
        <section className="border-t border-hair" aria-labelledby="names-heading">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <p className="eyebrow">On this shelf</p>
            <h2 id="names-heading" className="display-md mt-3">
              Study names
            </h2>
            <div className="mt-8">
              <StudyStrip
                variant="grid"
                rows={names.map((stock) => ({
                  ticker: stock.ticker,
                  name: stock.name,
                  sector: stock.sector,
                  segment: market.short,
                }))}
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="border-t border-hair">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
            <div className="glass rounded-3xl p-7">
              <h2 className="font-display text-2xl font-semibold">No share list on this shelf</h2>
              <p className="mt-3 leading-relaxed text-muted">
                Bonds stay off the company browser so they are not mistaken for ordinary shares. The Central Bank of
                Kenya publishes government securities. The NSE publishes the fixed income market.
              </p>
              <Link href="/companies" className="btn btn-ghost btn-sm mt-6">
                Back to ordinary shares
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
