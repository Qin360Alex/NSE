import type { Metadata } from "next";
import Link from "next/link";
import { CompanyBrowser } from "@/components/CompanyBrowser";
import { PageIntro } from "@/components/PageIntro";
import { markets, stocks } from "@/lib/content";
import { reviewed } from "@/lib/site";

export const metadata: Metadata = {
  title: "Companies",
  description: "A study list of NSE companies. Not the official roll, and not a price board.",
};

export default function CompaniesPage() {
  const rows = stocks.map((stock) => ({
    ticker: stock.ticker,
    name: stock.name,
    segment: stock.segment,
    sector: stock.sector,
    summary: stock.summary,
  }));
  const segments = markets
    .filter((market) => market.slug !== "fixed-income")
    .map((market) => ({
      slug: market.slug as "main" | "aims" | "gems",
      short: market.short,
      summary: market.summary,
    }));

  return (
    <>
      <PageIntro
        kicker="Companies"
        title="Names to practise on"
        lede={`This is a study list of ${stocks.length} issuers, reviewed ${reviewed}. It is not the official roll of the NSE, and it shows no prices. The exchange's own list is the complete record.`}
        crumbs={[{ href: "/", label: "Home" }, { label: "Companies" }]}
      />
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <CompanyBrowser rows={rows} segments={segments} />
        <noscript>
          <ul className="mt-8 space-y-2 text-soft">
            {stocks
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((stock) => (
                <li key={stock.ticker}>
                  <Link className="link" href={`/companies/${stock.ticker.toLowerCase()}`}>
                    {stock.name} ({stock.ticker})
                  </Link>
                </li>
              ))}
          </ul>
        </noscript>
      </div>
    </>
  );
}
