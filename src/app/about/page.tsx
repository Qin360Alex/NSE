import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { Icon, type IconName } from "@/components/ui/Icon";
import { reviewed } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "What Swath is, what it refuses to do, and how a fact gets onto the page.",
};

const refusals: { icon: IconName; text: string }[] = [
  { icon: "ban", text: "Recommend a share, a bond, a REIT, or a fund." },
  { icon: "clock", text: "Forecast a price or print a live one." },
  { icon: "shield", text: "Open a CDS account, take an order, or connect to a broker." },
  { icon: "alert", text: "Claim endorsement from the NSE, the CMA, or the CDSC." },
];

const flow = [
  { title: "A person writes it", body: "Every sentence is written by a person, in plain words." },
  { title: "The source is named", body: "Each note links the official page it rests on." },
  { title: "The review is dated", body: `This draft was last reviewed on ${reviewed}.` },
  { title: "The source wins", body: "If Swath and an official page disagree, follow the official page." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        kicker="About"
        title="A study draft, kept small on purpose"
        lede="Swath helps a beginner in Kenya understand the Nairobi Securities Exchange. It is a founder draft. It is not a public launch, and it is not an official market service."
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      />
      <div className="mx-auto max-w-6xl space-y-6 px-5 py-12 sm:px-8">
        <section className="glass rounded-3xl p-6 sm:p-8" aria-labelledby="use-title">
          <p className="eyebrow">How to use it</p>
          <h2 id="use-title" className="display-md mt-3">
            A complete first sitting
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              <>Play the one-minute briefing on the home page.</>,
              <>
                Read <Link className="link" href="/learn/who-does-what">who does what</Link>.
              </>,
              <>
                Open <Link className="link" href="/markets/main">the Main segment</Link> and one company card.
              </>,
              <>Do the three checks, then answer the lesson questions.</>,
            ].map((step, index) => (
              <li key={index} className="rounded-2xl border border-hair p-5">
                <span className="font-mono text-xs text-ice">Step {index + 1}</span>
                <p className="mt-2 leading-relaxed text-soft">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="glass rounded-3xl p-6 sm:p-8" aria-labelledby="wont-title">
          <p className="eyebrow">Kept honest</p>
          <h2 id="wont-title" className="display-md mt-3">
            What it will not do
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {refusals.map((item) => (
              <li key={item.text} className="flex items-start gap-4 rounded-2xl border border-hair p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-hair-strong text-ice">
                  <Icon name={item.icon} />
                </span>
                <p className="pt-2 leading-relaxed text-soft">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="glass rounded-3xl p-6 sm:p-8" aria-labelledby="nina-title">
            <p className="eyebrow text-nina!">Nina</p>
            <h2 id="nina-title" className="mt-3 font-display text-2xl font-semibold">
              How the assistant works
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-soft">
              <p>
                An assistant that talks beyond its notes will eventually invent a fact, and an invented fact about a
                listed company is harmful. So Nina only searches Swath&apos;s own notes: the lessons, the glossary, the
                markets, and the study list.
              </p>
              <p>
                Each answer shows the note it came from. If the notes do not contain an answer, Nina says so. She
                refuses tips, forecasts, and prices. A later version may use AI to phrase answers, but it will keep to
                the same notes and the same refusals.
              </p>
            </div>
          </section>
          <section className="glass rounded-3xl p-6 sm:p-8" aria-labelledby="store-title">
            <p className="eyebrow">Privacy</p>
            <h2 id="store-title" className="mt-3 font-display text-2xl font-semibold">
              What this draft stores
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-soft">
              <p>
                There is no account. Lessons you mark as read, checks you tick, quiz results, and an optional nickname
                are stored in this browser, on this device, and nowhere else.
              </p>
              <p>
                Clearing the browser data removes them, or use <Link className="link" href="/desk">Clear this device</Link>{" "}
                on your desk. Swath does not ask for a name, an email, or a portfolio.
              </p>
            </div>
          </section>
        </div>

        <section className="glass rounded-3xl p-6 sm:p-8" aria-labelledby="fact-title">
          <p className="eyebrow">Traceability</p>
          <h2 id="fact-title" className="display-md mt-3">
            How a fact gets onto the page
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {flow.map((step, index) => (
              <li key={step.title} className="relative rounded-2xl border border-hair p-5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ice/15 font-mono text-xs text-ice">
                  {index + 1}
                </span>
                <p className="mt-4 font-display font-semibold">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl leading-relaxed text-muted">
            Prices are left off because a price without the exchange&apos;s timestamp does not belong in a classroom.
            Listing segments are explained with the names the NSE still publishes, with a plain note that the 2023
            listing rules revised those segments. Summaries are written in our own words. They are not copies of the
            NSE, CMA, or CDSC sites.
          </p>
        </section>

        <div className="pt-4">
          <Link className="btn btn-primary" href="/learn/the-nse-in-one-sitting">
            Start with lesson one
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
