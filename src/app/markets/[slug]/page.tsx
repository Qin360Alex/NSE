import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/Blocks";
import { PageIntro } from "@/components/PageIntro";
import { Sources } from "@/components/Sources";
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

  return (
    <>
      <PageIntro
        kicker={market.short}
        title={market.name}
        lede={market.summary}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/markets", label: "Markets" },
          { label: market.short },
        ]}
      />
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <Blocks blocks={market.blocks} />
        <Sources sources={market.sources} />
      </article>
      {names.length > 0 ? (
        <section className="border-t border-line" aria-labelledby="names-heading">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
            <h2 id="names-heading" className="font-serif text-3xl">Study names on this shelf</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {names.map((stock) => (
                <li key={stock.ticker}>
                  <Link href={`/companies/${stock.ticker.toLowerCase()}`} className="block rounded-3xl border border-line bg-white p-4">
                    <span className="text-xs font-semibold text-green">{stock.ticker}</span>
                    <span className="mt-1 block font-semibold">{stock.name}</span>
                    <span className="mt-2 block text-sm text-muted">{stock.sector}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="border-t border-line">
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
            <h2 className="font-serif text-3xl">No share list on this shelf</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Bonds stay off the company browser so they are not mistaken for ordinary shares. The Central Bank of Kenya publishes government securities. The NSE publishes the fixed income market.
            </p>
            <Link href="/companies" className="link mt-6 inline-block font-semibold">
              Back to ordinary shares
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
