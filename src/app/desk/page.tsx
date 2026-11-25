import type { Metadata } from "next";
import { DeskView } from "@/components/desk/DeskView";
import { lessons, markets, stocks } from "@/lib/content";
import { featuredTickers } from "@/lib/stocks";

export const metadata: Metadata = {
  title: "Your desk",
  description: "Your study desk: lessons read, company checks, and quiz results, kept in this browser only.",
};

export default function DeskPage() {
  const pathLessons = lessons.map(({ slug, title, minutes }) => ({ slug, title, minutes }));
  const rows = stocks.map((stock) => ({
    ticker: stock.ticker,
    name: stock.name,
    sector: stock.sector,
    segment: markets.find((market) => market.slug === stock.segment)?.short ?? stock.segment,
  }));

  return <DeskView lessons={pathLessons} rows={rows} featured={[...featuredTickers]} />;
}
