import Link from "next/link";
import { Briefing } from "@/components/Briefing";
import { lessons, markets, stocks } from "@/lib/content";
import { featuredTickers, getStock } from "@/lib/stocks";

export default function HomePage() {
  const featured = featuredTickers
    .map((ticker) => getStock(ticker))
    .filter((stock) => stock !== undefined);

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <p className="text-sm font-semibold text-green">Nairobi Securities Exchange</p>
          <h1 className="mt-3 font-serif text-5xl leading-[1.05] sm:text-6xl">
            Learn the NSE in plain language.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Swath is a study desk for Kenyans who want to understand the market, from a first definition through to reading one listed company. It will not tell you what to buy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#briefing" className="inline-flex h-12 items-center rounded-full bg-gold px-5 text-sm font-semibold text-goldink">
              Play the one-minute briefing
            </a>
            <Link href="/markets" className="inline-flex h-12 items-center rounded-full border border-line bg-white px-5 text-sm font-semibold">
              See the markets
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat value={String(lessons.length)} label="short lessons" />
            <Stat value={String(markets.length)} label="market explainers" />
            <Stat value={String(stocks.length)} label="study companies" />
            <Stat value="0" label="price targets" />
          </dl>
        </div>
        <Briefing />
      </section>

      <section className="border-t border-line" aria-labelledby="markets-heading">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-green">Then the markets</p>
              <h2 id="markets-heading" className="mt-2 font-serif text-4xl">Four shelves, in ordinary words</h2>
            </div>
            <Link href="/markets" className="link text-sm font-semibold">
              Open the full comparison
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {markets.map((market) => {
              const count = stocks.filter((stock) => stock.segment === market.slug).length;
              const lead = market.slug === "main";
              return (
                <Link
                  key={market.slug}
                  href={`/markets/${market.slug}`}
                  className={`rounded-3xl border p-6 ${lead ? "border-pine bg-pine text-white" : "border-line bg-white"}`}
                >
                  <p className={`text-sm font-semibold ${lead ? "text-gold" : "text-green"}`}>{market.short}</p>
                  <h3 className="mt-3 font-serif text-3xl leading-tight">{market.name}</h3>
                  <p className={`mt-3 leading-relaxed ${lead ? "text-white/80" : "text-muted"}`}>{market.summary}</p>
                  <p className={`mt-5 text-sm font-semibold ${lead ? "text-gold" : "text-green"}`}>
                    {market.slug === "fixed-income" ? "Bonds, kept separate from shares" : `${count} study names`}
                  </p>
                </Link>
              );
            })}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
            The NSE also lists some REITs and ETFs, and it runs a derivatives market. Those are real, and they are a later study. This path stays with ordinary shares and a plain explanation of bonds.
          </p>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="companies-heading">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-green">Then a real listing</p>
              <h2 id="companies-heading" className="mt-2 font-serif text-4xl">Study a company, not a price</h2>
            </div>
            <Link href="/companies" className="link text-sm font-semibold">
              All {stocks.length} study names
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((stock) => (
              <li key={stock.ticker}>
                <Link href={`/companies/${stock.ticker.toLowerCase()}`} className="block h-full rounded-3xl border border-line bg-white p-5">
                  <span className="text-xs font-semibold text-green">{stock.ticker}</span>
                  <span className="mt-2 block font-serif text-2xl">{stock.name}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-muted">{stock.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="lessons-heading">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="text-sm font-semibold text-green">When you want the longer version</p>
          <h2 id="lessons-heading" className="mt-2 font-serif text-4xl">Eight lessons, in order</h2>
          <ol className="mt-8 grid gap-3 md:grid-cols-2">
            {lessons.map((lesson, index) => (
              <li key={lesson.slug}>
                <Link href={`/learn/${lesson.slug}`} className="flex h-full gap-4 rounded-3xl border border-line bg-white p-5">
                  <span className="font-serif text-2xl text-green">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-semibold">{lesson.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{lesson.lede}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-white" aria-labelledby="refuse-heading">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 id="refuse-heading" className="font-serif text-4xl">What this desk will not do</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Refusal title="Recommend a security" body="No share, bond, REIT, or fund is singled out as something to buy, hold, or sell." />
            <Refusal title="Predict a price" body="A future price is not a document. Swath does not print targets, and it does not print live prices." />
            <Refusal title="Take an order" body="Buying and selling belong with a licensed broker. There is no account opening on this site." />
          </div>
          <Link href="/about" className="link mt-8 inline-block text-sm font-semibold">
            Read how the draft is kept honest
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-serif text-4xl">{value}</dt>
      <dd className="mt-1 text-sm text-muted">{label}</dd>
    </div>
  );
}

function Refusal({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-serif text-2xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}
