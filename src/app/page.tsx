import Link from "next/link";
import { Briefing } from "@/components/Briefing";
import { ContinueBanner } from "@/components/landing/ContinueBanner";
import { HeroArt } from "@/components/landing/HeroArt";
import { SourceStrip } from "@/components/landing/SourceStrip";
import { LearningPath } from "@/components/LearningPath";
import { AskNinaButton } from "@/components/nina/AskNinaButton";
import { ShelfCard } from "@/components/ShelfCard";
import { StudyStrip } from "@/components/StudyStrip";
import { Icon, type IconName } from "@/components/ui/Icon";
import { lessons, markets, stocks } from "@/lib/content";
import { stages } from "@/lib/path";
import { featuredTickers, getStock } from "@/lib/stocks";

const steps = [
  { title: "Play the one-minute briefing", body: "Four chapters on who runs the market and who keeps the record." },
  { title: "Read who does what", body: "The NSE, the CMA, the CDSC and your broker, each in one paragraph." },
  { title: "Open one shelf and one company", body: "Start with the Main segment and a name you already know." },
  { title: "Do the three checks", body: "Then answer the lesson questions. That is a complete first sitting." },
];

const refusals: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "ban",
    title: "Recommend a security",
    body: "No share, bond, REIT, or fund is singled out as something to buy, hold, or sell.",
  },
  {
    icon: "clock",
    title: "Predict or print a price",
    body: "A future price is not a document. Swath prints no targets, and no live prices either.",
  },
  {
    icon: "shield",
    title: "Take an order",
    body: "Buying and selling belong with a licensed broker. There is no account opening here.",
  },
];

export default function HomePage() {
  const pathLessons = lessons.map(({ slug, title, minutes }) => ({ slug, title, minutes }));
  const featured = featuredTickers
    .map((ticker) => getStock(ticker))
    .filter((stock) => stock !== undefined)
    .map((stock) => ({
      ticker: stock.ticker,
      name: stock.name,
      sector: stock.sector,
      segment: markets.find((market) => market.slug === stock.segment)?.short ?? stock.segment,
    }));

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 pt-12 pb-8 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-20 lg:pb-16">
          <div className="fade-up min-w-0">
            <p className="eyebrow">Nairobi Securities Exchange · study desk</p>
            <h1 className="display-xl mt-6">
              The NSE,
              <br />
              made simple.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              <span className="text-ice">Swath</span> helps you understand the Nairobi Securities Exchange in plain
              language, from your first definition to reading one listed company. It will not tell you what to buy.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/learn/the-nse-in-one-sitting" className="btn btn-primary">
                Start lesson 1
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
              <a href="#briefing" className="btn btn-ghost">
                <span className="play-ring">
                  <Icon name="play" className="h-3 w-3 translate-x-px" />
                </span>
                Play the briefing
              </a>
            </div>
            <ContinueBanner lessons={pathLessons} />
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-6 border-t border-hair pt-8 sm:grid-cols-4">
              <Stat value={String(lessons.length)} label="short lessons" />
              <Stat value={String(markets.length)} label="market shelves" />
              <Stat value={String(stocks.length)} label="study companies" />
              <Stat value="0" label="price targets" accent />
            </dl>
          </div>
          <HeroArt />
        </div>
        <SourceStrip />
      </section>

      {/* Briefing */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="eyebrow">Start with one minute</p>
          <h2 className="display-md mt-4">A first sitting, in four steps</h2>
          <p className="mt-4 max-w-md text-muted">
            You do not need to read everything. Follow these steps once and you will know how the market fits together.
          </p>
          <ol className="mt-8 space-y-1">
            {steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[auto_1fr] gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-ice/40 bg-ice/10 font-mono text-xs text-ice">
                    {index + 1}
                  </span>
                  {index < steps.length - 1 ? <span className="my-1 w-px flex-1 bg-hair-strong" /> : null}
                </div>
                <div className="pb-6">
                  <p className="font-display font-semibold text-fg">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Briefing />
      </section>

      {/* Learning path */}
      <section className="border-t border-hair" aria-labelledby="path-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">The learning path</p>
              <h2 id="path-heading" className="display-md mt-4">
                Eight lessons, from first word to first company
              </h2>
              <p className="mt-4 max-w-md text-muted">
                Each lesson takes a few minutes. The line warms from blue to gold as you go. Your progress stays in
                this browser.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-3">
                {stages.map((stage, index) => (
                  <li key={stage.id} className="glass rounded-2xl p-4">
                    <p className="font-mono text-xs text-faint">Stage {index + 1}</p>
                    <p className="mt-1 font-display font-semibold">{stage.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{stage.blurb}</p>
                  </li>
                ))}
              </ul>
              <Link href="/learn" className="btn btn-ghost mt-8">
                See the full path
                <Icon name="arrowRight" className="h-4 w-4" />
              </Link>
            </div>
            <div className="glass rounded-4xl px-6 pt-12 pb-10 sm:px-10">
              <LearningPath lessons={pathLessons} />
            </div>
          </div>
        </div>
      </section>

      {/* Markets */}
      <section className="border-t border-hair" aria-labelledby="markets-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">The markets</p>
              <h2 id="markets-heading" className="display-md mt-4">
                Four shelves, in ordinary words
              </h2>
            </div>
            <Link href="/markets" className="btn btn-quiet">
              Open the markets
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {markets.map((market, index) => (
              <ShelfCard
                key={market.slug}
                market={market}
                index={index}
                count={stocks.filter((stock) => stock.segment === market.slug).length}
              />
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-faint">
            The NSE also lists some REITs and ETFs, and it runs a derivatives market. Those are real, and they are a
            later study. This path stays with ordinary shares and a plain explanation of bonds.
          </p>
        </div>
      </section>

      {/* Companies */}
      <section className="border-t border-hair" aria-labelledby="companies-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">A real listing</p>
              <h2 id="companies-heading" className="display-md mt-4">
                Study a company, not a price
              </h2>
              <p className="mt-4 max-w-xl text-muted">
                Each card tracks the three checks you have done, where a trading app would show a price.
              </p>
            </div>
            <Link href="/companies" className="btn btn-quiet">
              All {stocks.length} study names
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10">
            <StudyStrip rows={featured} variant="grid" />
          </div>
        </div>
      </section>

      {/* Nina */}
      <section className="border-t border-hair" aria-labelledby="nina-heading">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-nina!">Meet Nina</p>
            <h2 id="nina-heading" className="display-md mt-4">
              A study assistant that shows her sources
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Ask a question in your own words. Nina answers from Swath&apos;s notes and names the note each answer came
              from.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Answers only from Swath's reviewed notes",
                "Every answer shows where it came from",
                "Says no to tips, forecasts and prices",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-soft">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-nina/15 text-nina">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <AskNinaButton question="What is a CDS account?" label="Ask Nina about CDS accounts" className="btn btn-nina mt-9" />
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-nina/10 blur-3xl" aria-hidden="true" />
            <div className="glass relative space-y-4 rounded-4xl p-6 sm:p-8">
              <div className="flex justify-end">
                <p className="rounded-2xl rounded-br-md bg-raised px-4 py-2.5 text-sm">Is the CMA the same as the NSE?</p>
              </div>
              <div className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-nina text-nina-ink">
                  <Icon name="sparkle" className="h-4 w-4" />
                </span>
                <div className="nina-bubble min-w-0 flex-1 p-4 text-sm leading-relaxed text-soft">
                  <p>No. They are different institutions.</p>
                  <p className="mt-2 text-muted">
                    &ldquo;The Capital Markets Authority regulates this market. The NSE runs the marketplace inside
                    that framework.&rdquo;
                  </p>
                  <p className="stamp mt-3">
                    <b>Swath notes</b> Who does what · 17 Nov 2026
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <p className="rounded-2xl rounded-br-md bg-raised px-4 py-2.5 text-sm">Should I buy Safaricom?</p>
              </div>
              <div className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-nina text-nina-ink">
                  <Icon name="sparkle" className="h-4 w-4" />
                </span>
                <div className="nina-bubble min-w-0 flex-1 p-4 text-sm leading-relaxed text-soft">
                  I can&apos;t tell you what to buy. I can show you how to study Safaricom yourself, starting with its
                  three checks.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-hair" aria-labelledby="refuse-heading">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="eyebrow">Kept honest on purpose</p>
          <h2 id="refuse-heading" className="display-md mt-4">
            What Swath will not do
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {refusals.map((item) => (
              <div key={item.title} className="glass rounded-3xl p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-hair-strong text-ice">
                  <Icon name={item.icon} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <Link href="/about" className="btn btn-quiet mt-8">
            Read how the notes are kept honest
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label, accent = false }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col-reverse">
      <dt className="mt-1 text-sm text-muted">{label}</dt>
      <dd className={`font-display text-4xl font-semibold tracking-tight tabular-nums ${accent ? "text-gold" : "text-fg"}`}>
        {value}
      </dd>
    </div>
  );
}
