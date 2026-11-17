import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { Sources } from "@/components/Sources";
import { getLesson, getMarket, getStock, stocks } from "@/lib/content";
import { checksFor } from "@/lib/stocks";
import { commonSources } from "@/lib/site";

export function generateStaticParams() {
  return stocks.map((stock) => ({ ticker: stock.ticker.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  const stock = getStock(ticker);
  if (!stock) return { title: "Company" };
  return {
    title: `${stock.name} (${stock.ticker})`,
    description: stock.summary,
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  if (ticker !== ticker.toLowerCase()) {
    redirect(`/companies/${ticker.toLowerCase()}`);
  }
  const stock = getStock(ticker);
  if (!stock) notFound();
  const market = getMarket(stock.segment);
  const lesson = getLesson(stock.teaches);
  const related = stocks
    .filter((item) => item.segment === stock.segment && item.ticker !== stock.ticker)
    .slice(0, 3);

  return (
    <>
      <PageIntro
        kicker={stock.ticker}
        title={stock.name}
        lede={stock.summary}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/companies", label: "Companies" },
          { label: stock.name },
        ]}
      />
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <div className="flex flex-wrap gap-2">
          {market ? (
            <Link href={`/markets/${market.slug}`} className="rounded-full bg-foam px-3 py-1 text-sm font-semibold text-green">
              {market.short}
            </Link>
          ) : null}
          <span className="rounded-full border border-line px-3 py-1 text-sm">{stock.sector}</span>
        </div>
        {stock.watchout ? (
          <aside className="mt-6 border-l-4 border-gold bg-foam px-4 py-3 leading-relaxed">{stock.watchout}</aside>
        ) : null}
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Segment labels can change. The NSE listed-companies page is the record for today. Swath does not show a price for {stock.ticker}.
        </p>
        {lesson ? (
          <p className="mt-6 leading-relaxed">
            Use this listing to practise{" "}
            <Link className="link" href={`/learn/${lesson.slug}`}>
              {lesson.title}
            </Link>
            .
          </p>
        ) : null}
        <h2 className="mt-10 font-serif text-3xl">Three checks</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 leading-relaxed">
          {checksFor(stock.ticker).map((check) => (
            <li key={check}>{check}</li>
          ))}
        </ol>
        <p className="mt-6 leading-relaxed">
          Finishing the checks does not produce a buy or a sell. It produces a clearer picture of what you still need to read.
        </p>
        <Sources
          sources={
            stock.segment === "aims"
              ? [commonSources.nseList, commonSources.nseAims]
              : stock.segment === "main"
                ? [commonSources.nseList, commonSources.nseMims]
                : [commonSources.nseList, commonSources.nseFaqs]
          }
        />
      </article>
      {related.length > 0 ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
            <h2 className="font-serif text-3xl">Others on this shelf</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.ticker}>
                  <Link href={`/companies/${item.ticker.toLowerCase()}`} className="block rounded-3xl border border-line bg-white p-4">
                    <span className="text-xs font-semibold text-green">{item.ticker}</span>
                    <span className="mt-1 block font-semibold">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
