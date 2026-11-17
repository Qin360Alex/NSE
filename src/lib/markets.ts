import { commonSources } from "./site";
import type { Block, SegmentId, Source } from "./types";

export type Market = {
  slug: SegmentId;
  short: string;
  name: string;
  summary: string;
  blocks: Block[];
  sources: Source[];
};

export const markets: Market[] = [
  {
    slug: "main",
    short: "Main",
    name: "Main Investment Market Segment",
    summary:
      "The NSE's premium board for larger, established companies. Most beginners should start here, because the businesses are easier to describe and the disclosures are usually easier to find.",
    blocks: [
      {
        type: "p",
        text: "The Main Investment Market Segment, usually shortened to MIMS, is the board the NSE describes as its premium market. It is where larger, established companies list ordinary shares. Safaricom, the big banks, East African Breweries, and KenGen sit here.",
      },
      {
        type: "p",
        text: "A listing on this board is not a seal of safety. It means the company met the entry rules that applied when it listed, and that it has continuing duties to publish information. A famous name on this board can still fall in price, skip a dividend, or publish a painful report.",
      },
      {
        type: "h2",
        text: "What to practise here",
      },
      {
        type: "ul",
        items: [
          "Pick one company and say, in one sentence, what it sells.",
          "Find its ticker on the NSE list and write down the segment printed there today.",
          "Open the latest annual report and notice how long it is. You are not meant to finish it in one sitting.",
        ],
      },
      {
        type: "p",
        text: "The NSE publishes the entry rules for this segment: years in business, how widely the shares are held, the financial record, and similar tests. Those thresholds get revised. Read the current table on the NSE page rather than a copied checklist.",
      },
      {
        type: "note",
        text: "Segment labels can change. If this page and the NSE listed-companies page ever disagree about a ticker, believe the NSE page and read the date on it.",
      },
    ],
    sources: [commonSources.nseMims, commonSources.nseList],
  },
  {
    slug: "aims",
    short: "Alternative",
    name: "Alternative Investment Market Segment",
    summary:
      "The board the NSE still describes for smaller and mid-sized issuers. You will meet the name AIMS on the exchange's own pages. Treat the label on any one company as something to confirm.",
    blocks: [
      {
        type: "p",
        text: "The NSE's Alternative Investment Market Segment page describes AIMS as a board for mid-sized companies that want a public listing with a lighter entry bar than the Main segment. Several tea companies, Eaagads, Longhorn Publishers, and Express Kenya are names that page has carried.",
      },
      {
        type: "p",
        text: "A lighter entry bar means less history, a smaller shareholder base, or both. That is a description, not a warning label and not an invitation. The annual report matters more here, because fewer people are writing about the company and a summary like this one goes stale faster.",
      },
      {
        type: "h2",
        text: "Two labels are in circulation",
      },
      {
        type: "p",
        text: "Kenya's Public Offers, Listing and Disclosures Regulations, 2023 reworked how listing segments are described, including a main market and an SME market. The NSE said issuers on AIMS and on the Growth Enterprise Market Segment would be placed on the segment they qualify for. At the same time, the exchange's own website has continued to publish an AIMS page and to print an AIMS label beside some issuers.",
      },
      {
        type: "note",
        text: "Swath teaches AIMS as a name you will still meet in NSE material. It does not certify that every company on this study list is legally classified as AIMS on the day you read this. Check the listed-companies page before you rely on the label.",
      },
    ],
    sources: [commonSources.nseAims, commonSources.nseList, commonSources.nseFaqs],
  },
  {
    slug: "gems",
    short: "Growth",
    name: "Growth Enterprise Market Segment",
    summary:
      "The older board for smaller growth companies. The study names here came through that door. Confirm where the NSE lists them today before you treat the label as current.",
    blocks: [
      {
        type: "p",
        text: "The Growth Enterprise Market Segment, GEMS, was the NSE board aimed at smaller growth companies. The exchange's public FAQs still name it alongside the Main and Alternative segments. Home Afrika, Flame Tree Group, and Nairobi Business Ventures are names investors met through that board.",
      },
      {
        type: "p",
        text: "Smaller listings are a harder classroom. The business can change, trading can be thin, and a brand you have never seen in a supermarket can still be a listed company. That is useful to know. It is a poor place to start if you cannot yet explain what Safaricom or Equity Group does.",
      },
      {
        type: "h2",
        text: "Why the label is cautious on purpose",
      },
      {
        type: "p",
        text: "Under the Public Offers, Listing and Disclosures Regulations, 2023, the NSE said GEMS issuers would be reclassified onto the Main segment or an SME segment, according to the rules they meet. Swath keeps these names in a Growth group so a beginner can see that not every listed company is a household name. The group is a study shelf, not a legal certificate.",
      },
      {
        type: "note",
        text: "Before you quote a segment for any of these companies, open the NSE listed-companies page and use the words printed there that day.",
      },
    ],
    sources: [commonSources.nseFaqs, commonSources.nseList],
  },
  {
    slug: "fixed-income",
    short: "Fixed income",
    name: "Fixed income securities",
    summary:
      "Bonds and similar instruments. A bond is a loan you make to an issuer. It is a different object from an ordinary share, so it lives on its own page and not in the company list.",
    blocks: [
      {
        type: "p",
        text: "The NSE's fixed income market is where debt securities trade. The two a beginner meets first are government securities and corporate bonds. A government bond is a loan to the Republic of Kenya. A corporate bond is a loan to a company. In both cases you are a lender, not an owner.",
      },
      {
        type: "p",
        text: "Each bond has its own terms: how much was issued, the interest it pays, when it pays, and when the principal is due back. Those terms live in the issue documents. Two bonds from the same issuer can be different securities. Swath does not list individual bonds in this draft, because a bond table without the issue documents is how people mix them up.",
      },
      {
        type: "h2",
        text: "One idea worth keeping",
      },
      {
        type: "p",
        text: "The price of an existing fixed-rate bond and the level of market interest rates tend to move in opposite directions. If rates in the market rise, an older bond that pays a lower rate becomes less attractive, so its price tends to fall. That is a textbook relationship, not a forecast about Kenya this month, and it does not tell you whether any particular bond is suitable for you.",
      },
      {
        type: "ul",
        items: [
          "The Central Bank of Kenya publishes government securities.",
          "The NSE publishes the fixed income market and the notices that belong to it.",
          "A share ticker such as SCOM is not a bond, even when the same company could also borrow.",
        ],
      },
      {
        type: "note",
        text: "Swath will not recommend a bond, a Treasury bill, or a fund. Read the instrument, then decide with information that has a date on it.",
      },
    ],
    sources: [commonSources.nse, commonSources.nseFaqs, commonSources.cbk],
  },
];

export function getMarket(slug: string) {
  return markets.find((market) => market.slug === slug);
}
