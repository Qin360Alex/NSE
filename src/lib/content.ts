import { glossary } from "./glossary";
import { getLesson, lessonNeighbors, lessons } from "./lessons";
import { getMarket, markets } from "./markets";
import { featuredTickers, getStock, stocks } from "./stocks";

const lessonSlugs = new Set(lessons.map((lesson) => lesson.slug));

for (const stock of stocks) {
  if (!lessonSlugs.has(stock.teaches)) {
    throw new Error(`Missing lesson "${stock.teaches}" for ${stock.ticker}`);
  }
}

const seen = new Set<string>();
for (const stock of stocks) {
  if (seen.has(stock.ticker)) {
    throw new Error(`Duplicate ticker ${stock.ticker}`);
  }
  seen.add(stock.ticker);
}

for (const ticker of featuredTickers) {
  if (!seen.has(ticker)) {
    throw new Error(`Featured ticker ${ticker} is not on the study list`);
  }
}

const marketSlugs = new Set(markets.map((market) => market.slug));
for (const stock of stocks) {
  if (!marketSlugs.has(stock.segment)) {
    throw new Error(`Unknown segment ${stock.segment} on ${stock.ticker}`);
  }
}

export {
  featuredTickers,
  getLesson,
  getMarket,
  getStock,
  glossary,
  lessonNeighbors,
  lessons,
  markets,
  stocks,
};
