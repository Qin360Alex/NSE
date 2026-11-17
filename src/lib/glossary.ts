export type GlossaryEntry = {
  id: string;
  term: string;
  definition: string;
  lesson?: string;
};

export const glossary: GlossaryEntry[] = [
  {
    id: "share",
    term: "Share",
    definition:
      "A unit of ownership in the company that issued it. An ordinary share is the kind most beginners mean. It is not a savings account, and it is not a loan.",
    lesson: "shares-and-dividends",
  },
  {
    id: "ticker",
    term: "Ticker",
    definition:
      "The short code the exchange uses for a security. Safaricom's ordinary shares trade as SCOM. A different code is a different security, even when the company name looks similar.",
    lesson: "how-to-study-a-company",
  },
  {
    id: "dividend",
    term: "Dividend",
    definition:
      "A distribution a company declares to its shareholders, often in cash. It is not owed to you merely because you hold the share. The company can declare none.",
    lesson: "shares-and-dividends",
  },
  {
    id: "ipo",
    term: "IPO",
    definition:
      "An initial public offering. The company sells shares to the public and lists them. After that, most trading is between investors. The company does not receive the money from those later trades.",
    lesson: "shares-and-dividends",
  },
  {
    id: "secondary-market",
    term: "Secondary market",
    definition:
      "Trading between investors in shares that are already listed. This is the ordinary day on the NSE. It is different from an IPO or a rights issue, where the company itself is issuing shares.",
    lesson: "shares-and-dividends",
  },
  {
    id: "segment",
    term: "Market segment",
    definition:
      "A section of the exchange with its own entry rules. Names you will meet include the Main segment, AIMS, GEMS, and the fixed income market. Confirm the current label for a company on the NSE list.",
    lesson: "market-segments",
  },
  {
    id: "cds-account",
    term: "CDS account",
    definition:
      "The electronic account, in the Central Depository System, that holds listed securities in an investor's name. Opening one is done through a licensed Central Depository Agent, or through a channel the CDSC currently publishes.",
    lesson: "the-cds-account",
  },
  {
    id: "cda",
    term: "Central Depository Agent",
    definition:
      "A licensed stockbroker, investment bank, or custodian bank through which CDS accounts are opened and maintained. The CDSC publishes who these agents are.",
    lesson: "the-cds-account",
  },
  {
    id: "broker",
    term: "Stockbroker",
    definition:
      "A licensed intermediary that can take an order to buy or sell listed securities. Swath is not a broker and cannot take an order. The Capital Markets Authority licenses brokers.",
    lesson: "who-does-what",
  },
  {
    id: "corporate-action",
    term: "Corporate action",
    definition:
      "An event the company announces that changes something about the security: a dividend, a bonus issue, a split, or a rights issue. The announcement is the source. A headline is not.",
    lesson: "shares-and-dividends",
  },
  {
    id: "rights-issue",
    term: "Rights issue",
    definition:
      "An offer of new shares to existing shareholders, usually at a stated price, in proportion to the shares they already hold. The circular sets the choices. They differ by issue.",
    lesson: "shares-and-dividends",
  },
  {
    id: "bond",
    term: "Bond",
    definition:
      "A loan to an issuer, with an interest arrangement and a date when principal is due. A government bond and a corporate bond are both bonds. Neither one is an ordinary share.",
    lesson: "market-segments",
  },
  {
    id: "coupon",
    term: "Coupon",
    definition:
      "The interest a bond pays, on the terms of that bond. It is not the same thing as a dividend, and it is not the bond's market price.",
    lesson: "market-segments",
  },
  {
    id: "reit",
    term: "REIT",
    definition:
      "A real estate investment trust. It owns property and is listed so people can trade an interest in it. The NSE lists some REITs apart from ordinary shares. Read the trust's own documents. Swath does not rank them.",
    lesson: "market-segments",
  },
  {
    id: "etf",
    term: "ETF",
    definition:
      "An exchange traded fund. It holds a basket of assets and trades on the exchange. What is in the basket, and what it costs to hold, is in the fund documents. The NSE lists some ETFs.",
    lesson: "market-segments",
  },
  {
    id: "suspension",
    term: "Suspension",
    definition:
      "A halt in trading of a security, published by the exchange. The notice tells you the status. Until you have read it, you do not know whether the halt is brief or serious.",
    lesson: "what-can-go-wrong",
  },
  {
    id: "annual-report",
    term: "Annual report",
    definition:
      "The company's yearly account of its business, its numbers, and the risks it chooses to disclose. It is the first document to open when a summary, including a Swath card, is not enough.",
    lesson: "how-to-study-a-company",
  },
  {
    id: "regulator",
    term: "Regulator",
    definition:
      "For this market, the Capital Markets Authority. It licenses intermediaries and enforces the rules. It does not run the trading screen, and it does not pick shares for you.",
    lesson: "who-does-what",
  },
];
