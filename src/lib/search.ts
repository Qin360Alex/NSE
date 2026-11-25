import { glossary, lessons, markets, stocks } from "./content";

export type SearchGroup = "Start here" | "Lessons" | "Markets" | "Companies" | "Glossary";

export type SearchHit = {
  href: string;
  title: string;
  kicker: string;
  group: SearchGroup;
  text: string;
};

export const allHits: SearchHit[] = [
  {
    href: "/#briefing",
    title: "The NSE in one minute",
    kicker: "Briefing",
    group: "Start here",
    text: "The Nairobi Securities Exchange is where listed securities in Kenya are bought and sold. The Capital Markets Authority regulates this market. The CDSC keeps the electronic record of who holds listed shares.",
  },
  ...lessons.map((lesson) => ({
    href: `/learn/${lesson.slug}`,
    title: lesson.title,
    kicker: "Lesson",
    group: "Lessons" as const,
    text: `${lesson.lede} ${lesson.blocks
      .map((block) => (block.type === "ul" ? block.items.join(". ") : block.text))
      .join(" ")}`,
  })),
  ...markets.map((market) => ({
    href: `/markets/${market.slug}`,
    title: market.name,
    kicker: "Market",
    group: "Markets" as const,
    text: `${market.summary} ${market.short}`,
  })),
  ...stocks.map((stock) => ({
    href: `/companies/${stock.ticker.toLowerCase()}`,
    title: stock.name,
    kicker: stock.ticker,
    group: "Companies" as const,
    text: `${stock.summary} ${stock.sector} ${stock.watchout ?? ""} ${stock.segment}`,
  })),
  ...glossary.map((entry) => ({
    href: `/glossary#${entry.id}`,
    title: entry.term,
    kicker: "Glossary",
    group: "Glossary" as const,
    text: entry.definition,
  })),
];

const starters = ["/#briefing", "/learn/who-does-what", "/markets/main", "/companies/scom"];

export function searchNotes(query: string): SearchHit[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) {
    return allHits.filter((hit) => starters.includes(hit.href));
  }

  return allHits
    .filter((hit) => {
      const hay = `${hit.title} ${hit.kicker} ${hit.text}`.toLowerCase();
      return terms.every((term) => hay.includes(term));
    })
    .slice(0, 8);
}
