import type { SegmentId } from "./types";

export type Stock = {
  ticker: string;
  name: string;
  segment: Exclude<SegmentId, "fixed-income">;
  sector: string;
  summary: string;
  teaches: string;
  watchout?: string;
};

const studyChecks = (ticker: string) => [
  `On the NSE listed-companies page, find ${ticker} and write down the segment printed there today.`,
  "Open the latest annual report and copy one sentence, in the company's own words, about what it sells or does.",
  "Read the newest NSE announcement for this issuer. Note a dividend, a caution, a change of name, or the fact of nothing new. Write the date.",
];

export function checksFor(ticker: string) {
  return studyChecks(ticker);
}

type Seed = {
  ticker: string;
  name: string;
  segment: Stock["segment"];
  sector: string;
  summary: string;
  teaches?: string;
  watchout?: string;
};

function stock(seed: Seed): Stock {
  return {
    teaches: "how-to-study-a-company",
    ...seed,
  };
}

export const stocks: Stock[] = [
  stock({
    ticker: "SCOM",
    name: "Safaricom",
    segment: "main",
    sector: "Telecommunication and Technology",
    summary:
      "Kenya's main telecommunications company. Its ordinary shares are the usual first study, because the brand is already familiar. Familiar is not the same as researched.",
    teaches: "shares-and-dividends",
  }),
  stock({
    ticker: "EQTY",
    name: "Equity Group",
    segment: "main",
    sector: "Banking",
    summary:
      "The listed parent of a banking group. A clear first bank to describe: it takes deposits and makes loans, then the report shows what that produced.",
  }),
  stock({
    ticker: "KCB",
    name: "KCB Group",
    segment: "main",
    sector: "Banking",
    summary:
      "A listed banking group. Useful as a second bank, once you can already say what Equity Group does, so you can see what is similar and what the report says is different.",
  }),
  stock({
    ticker: "COOP",
    name: "Co-operative Bank of Kenya",
    segment: "main",
    sector: "Banking",
    summary: "A listed commercial bank. The same three checks apply. The name tells you the history. The annual report tells you the current business.",
  }),
  stock({
    ticker: "ABSA",
    name: "Absa Bank Kenya",
    segment: "main",
    sector: "Banking",
    summary: "A listed commercial bank. Read its report on its own. A parent brand outside Kenya is not a substitute for the Kenyan company's numbers.",
  }),
  stock({
    ticker: "NCBA",
    name: "NCBA Group",
    segment: "main",
    sector: "Banking",
    summary: "A listed banking group. Another ordinary-share example in a sector with many listings, which makes comparison possible once the method is familiar.",
  }),
  stock({
    ticker: "SCBK",
    name: "Standard Chartered Bank Kenya",
    segment: "main",
    sector: "Banking",
    summary: "A listed commercial bank. The international name is a clue to the group. The security you are studying is the Kenyan listing, ticker SCBK.",
  }),
  stock({
    ticker: "SBIC",
    name: "Stanbic Holdings",
    segment: "main",
    sector: "Banking",
    summary: "The listed holding company of the Stanbic banking business in Kenya. Study the listed entity named here, not a similarly named company in another country.",
  }),
  stock({
    ticker: "DTK",
    name: "Diamond Trust Bank",
    segment: "main",
    sector: "Banking",
    summary: "A listed bank. Use the three checks. Regional operations, if the report describes them, are part of the business, not a separate ticker.",
  }),
  stock({
    ticker: "IMH",
    name: "I&M Group",
    segment: "main",
    sector: "Banking",
    summary: "A listed banking group. The ticker is IMH. Do not invent a shorter code from the initials in the name.",
  }),
  stock({
    ticker: "EABL",
    name: "East African Breweries",
    segment: "main",
    sector: "Manufacturing and Allied",
    summary:
      "Makes and sells beverages. A useful contrast with the banks: you can point at a product, then see how the report talks about selling it.",
    teaches: "shares-and-dividends",
  }),
  stock({
    ticker: "BAT",
    name: "British American Tobacco Kenya",
    segment: "main",
    sector: "Manufacturing and Allied",
    summary:
      "A listed tobacco company. The product is easy to name and the regulatory setting is part of the business. Read the risk section of the report rather than skipping to the dividend.",
  }),
  stock({
    ticker: "CARB",
    name: "Carbacid Investments",
    segment: "main",
    sector: "Manufacturing and Allied",
    summary:
      "A listed industrial company known for carbon dioxide supplied to industrial customers. Confirm the current lines of business in the annual report before you repeat that sentence.",
  }),
  stock({
    ticker: "UNGA",
    name: "Unga Group",
    segment: "main",
    sector: "Manufacturing and Allied",
    summary: "A listed foods group. The report is the current product list. A memory of flour on a shelf is only a place to start.",
  }),
  stock({
    ticker: "KEGN",
    name: "KenGen",
    segment: "main",
    sector: "Energy and Petroleum",
    summary:
      "Kenya Electricity Generating Company. It generates electricity. The Government of Kenya is a major shareholder.",
    teaches: "who-does-what",
    watchout:
      "The size of the government holding is a figure in the annual report. Memorising a percentage from a classroom is how that figure goes stale.",
  }),
  stock({
    ticker: "KPLC",
    name: "Kenya Power",
    segment: "main",
    sector: "Energy and Petroleum",
    summary:
      "Distributes and retails electricity. This card is the ordinary share, ticker KPLC.",
    teaches: "facts-and-opinions",
    watchout:
      "Kenya Power also has preference shares listed separately. If a code is not exactly KPLC, it is a different security. Do not mix the prices, the dividends, or the rights.",
  }),
  stock({
    ticker: "TOTL",
    name: "TotalEnergies Marketing Kenya",
    segment: "main",
    sector: "Energy and Petroleum",
    summary: "Markets petroleum products. The ticker is TOTL. The brand on a forecourt and the listed company still need the report to say what the company currently does.",
  }),
  stock({
    ticker: "JUB",
    name: "Jubilee Holdings",
    segment: "main",
    sector: "Insurance",
    summary:
      "A listed insurance group. Insurance accounts take a second pass. Do this one after a bank already feels readable.",
  }),
  stock({
    ticker: "BRIT",
    name: "Britam Holdings",
    segment: "main",
    sector: "Insurance",
    summary: "A listed insurance and financial services group. Same caution as Jubilee: learn the method on a simpler company first.",
  }),
  stock({
    ticker: "CIC",
    name: "CIC Insurance Group",
    segment: "main",
    sector: "Insurance",
    summary: "A listed insurance group. The ticker is short. The report is not. Use the three checks and leave the ratios for later.",
  }),
  stock({
    ticker: "KNRE",
    name: "Kenya Re",
    segment: "main",
    sector: "Insurance",
    summary:
      "Kenya Reinsurance Corporation. It insures insurers. That one step of removal makes the report harder, so this is a later example, not a first one.",
  }),
  stock({
    ticker: "BAMB",
    name: "Bamburi Cement",
    segment: "main",
    sector: "Construction and Allied",
    summary: "Makes cement. The product is easy to name. Ownership of the company is not a permanent fact.",
    watchout:
      "Corporate actions can change who controls a company. Read the latest NSE announcement before you describe Bamburi's owners.",
  }),
  stock({
    ticker: "NMG",
    name: "Nation Media Group",
    segment: "main",
    sector: "Commercial and Services",
    summary: "A listed media group. A useful example of a business you may already read, which is still not the same thing as reading its accounts.",
  }),
  stock({
    ticker: "KQ",
    name: "Kenya Airways",
    segment: "main",
    sector: "Commercial and Services",
    summary: "A listed airline. The brand is famous. Fame is a poor teacher if it replaces the report.",
    teaches: "what-can-go-wrong",
    watchout:
      "Use Kenya Airways as practice in reading notices, not as a simple first company. A household name can still be a complicated business.",
  }),
  stock({
    ticker: "CTUM",
    name: "Centum",
    segment: "main",
    sector: "Investment",
    summary:
      "An investment company. It owns interests in other businesses, so the report is a stack of activities rather than one product line.",
  }),
  stock({
    ticker: "NSE",
    name: "Nairobi Securities Exchange",
    segment: "main",
    sector: "Investment Services",
    summary:
      "The exchange itself is a listed company. Its ordinary shares trade as NSE. You can study it the same way you study any other issuer.",
    teaches: "who-does-what",
    watchout:
      "A listing of the exchange is not an endorsement of Swath, and it does not turn the NSE into the regulator. The CMA still regulates. The NSE still runs the market.",
  }),
  stock({
    ticker: "CGEN",
    name: "Car & General",
    segment: "main",
    sector: "Automobiles and Accessories",
    summary:
      "Distributes vehicles, machinery, and related equipment. It is also an example of a sector with very few listed names, so there is little to compare it with on the exchange.",
  }),
  stock({
    ticker: "SASN",
    name: "Sasini",
    segment: "main",
    sector: "Agricultural",
    summary: "An agricultural company. The annual report is the list of what it grows and produces now.",
  }),
  stock({
    ticker: "KUKZ",
    name: "Kakuzi",
    segment: "main",
    sector: "Agricultural",
    summary: "An agricultural company with more than one crop. Let the latest report name them, rather than a remembered shopping list.",
  }),
  stock({
    ticker: "EGAD",
    name: "Eaagads",
    segment: "aims",
    sector: "Agricultural",
    summary: "A listed coffee company. The NSE companies list has labelled Eaagads as AIMS.",
    teaches: "market-segments",
    watchout: "Confirm today's segment on the NSE list. Listing rules were revised in 2023, and public pages have not all adopted one label.",
  }),
  stock({
    ticker: "KAPC",
    name: "Kapchorua Tea",
    segment: "aims",
    sector: "Agricultural",
    summary: "A listed tea company. The NSE companies list has labelled Kapchorua as AIMS.",
    teaches: "market-segments",
    watchout: "Confirm today's segment on the NSE list before you repeat the AIMS label.",
  }),
  stock({
    ticker: "LIMT",
    name: "Limuru Tea",
    segment: "aims",
    sector: "Agricultural",
    summary: "A listed tea company. The NSE's AIMS page has included Limuru Tea.",
    teaches: "market-segments",
    watchout: "Confirm today's segment and that the shares are trading. This card is a study name, not a status report.",
  }),
  stock({
    ticker: "WTK",
    name: "Williamson Tea Kenya",
    segment: "aims",
    sector: "Agricultural",
    summary: "A listed tea company. The NSE's AIMS page has included Williamson Tea.",
    teaches: "market-segments",
    watchout: "Confirm today's segment on the NSE list. A tea garden you can picture is not the same as a current classification.",
  }),
  stock({
    ticker: "LKL",
    name: "Longhorn Publishers",
    segment: "aims",
    sector: "Commercial and Services",
    summary: "Publishes books, especially for schools. The NSE's AIMS page has included Longhorn.",
    teaches: "market-segments",
    watchout: "Confirm today's segment. Then use the annual report for what the publishing business looks like now.",
  }),
  stock({
    ticker: "XPRS",
    name: "Express Kenya",
    segment: "aims",
    sector: "Commercial and Services",
    summary: "A smaller listed company the NSE's AIMS page has included. The ticker is XPRS.",
    teaches: "market-segments",
    watchout:
      "Confirm that the shares are trading, confirm the segment, and let the latest report describe the business. A remembered line of work is not enough.",
  }),
  stock({
    ticker: "HAFR",
    name: "Home Afrika",
    segment: "gems",
    sector: "Investment",
    summary:
      "A smaller listed company that entered through the Growth Enterprise Market Segment. It has been associated with real-estate projects.",
    teaches: "what-can-go-wrong",
    watchout:
      "Confirm the current segment and the trading status on the NSE. Smaller companies change, and this shelf is for practice, not a certificate of where the issuer sits today.",
  }),
  stock({
    ticker: "FTGH",
    name: "Flame Tree Group",
    segment: "gems",
    sector: "Manufacturing and Allied",
    summary:
      "A smaller listed company that entered through the Growth Enterprise Market Segment. Use the annual report for the current products.",
    teaches: "what-can-go-wrong",
    watchout: "Confirm the segment the NSE prints today. Do not treat this Growth shelf as a legal classification.",
  }),
  stock({
    ticker: "NBV",
    name: "Nairobi Business Ventures",
    segment: "gems",
    sector: "Investment",
    summary:
      "A smaller listed company that entered through the Growth Enterprise Market Segment. Its business has changed over time, which is the point of the example.",
    teaches: "what-can-go-wrong",
    watchout:
      "Read the latest report before you describe what NBV does. Then confirm the segment and the trading status on the NSE. A summary on Swath will not keep up with a change of strategy.",
  }),
];

export const featuredTickers = ["SCOM", "EQTY", "KCB", "EABL", "KEGN", "EGAD"] as const;

export function getStock(ticker: string) {
  const key = ticker.toLowerCase();
  return stocks.find((item) => item.ticker.toLowerCase() === key);
}
