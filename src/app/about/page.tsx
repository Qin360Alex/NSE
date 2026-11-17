import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { reviewed } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "What Swath is, what it refuses to do, and how a fact gets onto the page.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        kicker="About"
        title="A study draft, kept small on purpose"
        lede="Swath helps a beginner in Kenya understand the Nairobi Securities Exchange. It is a founder draft. It is not a public launch, and it is not an official market service."
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      />
      <article className="mx-auto max-w-3xl space-y-10 px-5 py-12 text-lg leading-relaxed sm:px-8">
        <section>
          <h2 className="font-serif text-3xl">How to use it</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5">
            <li>Play the one-minute briefing on the home page.</li>
            <li>
              Read <Link className="link" href="/learn/who-does-what">who does what</Link>.
            </li>
            <li>
              Open <Link className="link" href="/markets/main">the Main segment</Link> and one company card.
            </li>
            <li>Do the three checks. Then answer the questions on the lesson. That is a complete first sitting.</li>
          </ol>
        </section>
        <section>
          <h2 className="font-serif text-3xl">What it will not do</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Recommend a share, a bond, a REIT, or a fund.</li>
            <li>Forecast a price or print a live one.</li>
            <li>Open a CDS account, take an order, or connect to a broker.</li>
            <li>Claim endorsement from the NSE, the CMA, or the CDSC.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-3xl">Why there is no chat box</h2>
          <p className="mt-4">
            A chat box that can talk beyond its notes will eventually invent a fact, and an invented fact about a listed company is harmful. Search in the header looks through the lessons, the glossary, the markets, and the study list. If the notes do not contain an answer, the search says so.
          </p>
          <p className="mt-4">
            A later assistant, if the founders build one, will be allowed to speak only from these notes, and it will have to refuse advice and forecasts. The notes come first so there is something true to stand on.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl">How a fact gets onto the page</h2>
          <p className="mt-4">
            A person writes the sentence, names the source, and dates the review. This draft was reviewed on {reviewed}. Prices are left off because a price without the exchange&apos;s timestamp does not belong in a classroom. Listing segments are explained with the names the NSE still publishes, and with a plain note that the 2023 listing rules revised those segments.
          </p>
          <p className="mt-4">
            If Swath and an official page disagree, follow the official page. Summaries here are written in our own words. They are not copies of the NSE, CMA, or CDSC sites.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl">What this draft stores</h2>
          <p className="mt-4">
            There is no account. Marking a lesson as read stores that mark in this browser, on this device, and nowhere else. Clearing the browser data removes it. Swath does not ask for a name, an email, or a portfolio.
          </p>
        </section>
        <p>
          <Link className="link font-semibold" href="/learn">
            Start with lesson one
          </Link>
        </p>
      </article>
    </>
  );
}
