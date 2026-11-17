import { glossary, lessons, markets, stocks } from "./content";

export type SearchHit = {
  href: string;
  title: string;
  kicker: string;
  text: string;
};

const hits: SearchHit[] = [
  {
    href: "/#briefing",
    title: "The NSE in one minute",
    kicker: "Briefing",
    text: "marketplace regulator CDS account what the exchange is",
  },
  ...lessons.map((lesson) => ({
    href: `/learn/${lesson.slug}`,
    title: lesson.title,
    kicker: "Lesson",
    text: `${lesson.lede} ${lesson.blocks
      .map((block) => (block.type === "ul" ? block.items.join(" ") : block.text))
      .join(" ")}`,
  })),
  ...markets.map((market) => ({
    href: `/markets/${market.slug}`,
    title: market.name,
    kicker: "Market",
    text: `${market.summary} ${market.short}`,
  })),
  ...stocks.map((stock) => ({
    href: `/companies/${stock.ticker.toLowerCase()}`,
    title: stock.name,
    kicker: stock.ticker,
    text: `${stock.summary} ${stock.sector} ${stock.watchout ?? ""} ${stock.segment}`,
  })),
  ...glossary.map((entry) => ({
    href: `/glossary#${entry.id}`,
    title: entry.term,
    kicker: "Glossary",
    text: entry.definition,
  })),
];

export function searchNotes(query: string): SearchHit[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) {
    return hits.filter((hit) =>
      [
        "/#briefing",
        "/learn/who-does-what",
        "/markets/main",
        "/companies/scom",
      ].includes(hit.href),
    );
  }

  return hits
    .filter((hit) => {
      const hay = `${hit.title} ${hit.kicker} ${hit.text}`.toLowerCase();
      return terms.every((term) => hay.includes(term));
    })
    .slice(0, 8);
}
