import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckList } from "@/components/company/CheckList";
import { AskNinaButton } from "@/components/nina/AskNinaButton";
import { Sources } from "@/components/Sources";
import { StudyStrip } from "@/components/StudyStrip";
import { ArcBackdrop } from "@/components/ui/ArcBackdrop";
import { Icon } from "@/components/ui/Icon";
import { getLesson, getMarket, getStock, stocks } from "@/lib/content";
import { commonSources, links } from "@/lib/site";
import { checksFor } from "@/lib/stocks";

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
    .slice(0, 4);
  const sources =
    stock.segment === "aims"
      ? [commonSources.nseList, commonSources.nseAims]
      : stock.segment === "main"
        ? [commonSources.nseList, commonSources.nseMims]
        : [commonSources.nseList, commonSources.nseFaqs];

  return (
    <>
      <header className="relative overflow-hidden border-b border-hair">
        <ArcBackdrop className="absolute -top-24 -right-28 h-120 w-120 opacity-70" />
        <div className="fade-up relative mx-auto max-w-6xl px-5 pt-10 pb-12 sm:px-8 sm:pt-14">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/companies", label: "Companies" },
              { label: stock.name },
            ]}
          />
          <p className="mt-10 font-mono text-5xl font-medium tracking-wider text-ice [text-shadow:0_0_30px_rgb(168_219_255/0.45)] sm:text-7xl">
            {stock.ticker}
          </p>
          <h1 className="display-md mt-3">{stock.name}</h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {market ? (
              <Link href={`/markets/${market.slug}`} className="chip chip-ice">
                {market.short} segment
              </Link>
            ) : null}
            <span className="chip">{stock.sector}</span>
            <span className="chip">No price shown</span>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{stock.summary}</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-6">
          {stock.watchout ? (
            <aside className="flex gap-4 rounded-3xl border border-gold/35 bg-gold/6 p-5 sm:p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold">
                <Icon name="alert" />
              </span>
              <div>
                <p className="font-display font-semibold text-gold">Read this first</p>
                <p className="mt-1 leading-relaxed text-soft">{stock.watchout}</p>
              </div>
            </aside>
          ) : null}

          <CheckList ticker={stock.ticker} checks={checksFor(stock.ticker)} />

          <div className="panel flex flex-col gap-4 rounded-3xl p-6 sm:flex-row sm:items-center">
            <svg viewBox="0 0 160 48" className="h-12 w-40 shrink-0" aria-hidden="true">
              <path
                d="M4 40C24 38 30 22 50 26S78 10 98 18 130 6 156 8"
                fill="none"
                className="stroke-faint"
                strokeWidth="2"
                strokeDasharray="3 6"
                strokeLinecap="round"
              />
              <path d="M70 6 90 42" className="stroke-coral" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-sm leading-relaxed text-muted">
              Swath shows no price for {stock.ticker}. For today&apos;s figure, use the{" "}
              <a className="link" href={links.nse} target="_blank" rel="noopener noreferrer">
                NSE website
                <span className="sr-only"> (opens in a new tab)</span>
              </a>{" "}
              or a licensed broker, and read the timestamp beside it.
            </p>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <dl className="glass rounded-3xl p-6 text-sm">
            <p className="eyebrow text-faint!">Study card</p>
            {[
              ["Ticker", stock.ticker],
              ["Segment", market?.name ?? stock.segment],
              ["Sector", stock.sector],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-hair py-3 last:border-b-0">
                <dt className="text-muted">{label}</dt>
                <dd className={`text-right ${label === "Ticker" ? "font-mono text-ice" : "text-fg"}`}>{value}</dd>
              </div>
            ))}
          </dl>
          {lesson ? (
            <Link href={`/learn/${lesson.slug}`} className="lit card-hover group block rounded-3xl p-6">
              <p className="text-xs text-gold">Practise with this listing</p>
              <p className="mt-2 font-display text-lg font-semibold group-hover:text-ice">{lesson.title}</p>
              <p className="mt-1 text-sm text-muted">{lesson.minutes} min lesson</p>
            </Link>
          ) : null}
          <AskNinaButton
            question={`Tell me about ${stock.ticker}`}
            label={`Ask Nina about ${stock.ticker}`}
            className="btn btn-ghost w-full border-nina/40 text-nina hover:border-nina/70! hover:bg-nina/10!"
          />
        </aside>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Sources sources={sources} className="mt-0 max-w-3xl" />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-faint">
          Segment labels can change. The NSE listed-companies page is the record for today.
        </p>
      </div>

      {related.length > 0 ? (
        <section className="mt-16 border-t border-hair" aria-labelledby="related-heading">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <p className="eyebrow">Same shelf</p>
            <h2 id="related-heading" className="display-md mt-3">
              Others on this shelf
            </h2>
            <div className="mt-8">
              <StudyStrip
                rows={related.map((item) => ({
                  ticker: item.ticker,
                  name: item.name,
                  segment: market?.short ?? item.segment,
                }))}
              />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
