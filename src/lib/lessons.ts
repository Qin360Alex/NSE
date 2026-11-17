import { commonSources } from "./site";
import type { Block, Question, Source } from "./types";

export type Lesson = {
  slug: string;
  title: string;
  lede: string;
  minutes: number;
  blocks: Block[];
  questions: Question[];
  sources: Source[];
};

export const lessons: Lesson[] = [
  {
    slug: "the-nse-in-one-sitting",
    title: "The NSE in one sitting",
    lede: "What the Nairobi Securities Exchange is, in the time it takes to drink a cup of tea.",
    minutes: 4,
    blocks: [
      {
        type: "p",
        text: "The Nairobi Securities Exchange is Kenya's securities exchange. Companies list securities on it. Investors buy and sell those securities through licensed intermediaries. The price on a given day is the price buyers and sellers agree. Nobody at the exchange owes you a rise.",
      },
      {
        type: "p",
        text: "Most beginners meet the exchange through ordinary shares: Safaricom, a bank, a brewer, an electricity company. The same marketplace also lists preference shares, bonds, real estate investment trusts, and exchange traded funds. They are different objects. A ticker that is one letter off is a different security.",
      },
      {
        type: "h2",
        text: "Three institutions, one sentence each",
      },
      {
        type: "ul",
        items: [
          "The NSE is the marketplace.",
          "The Capital Markets Authority is the regulator.",
          "The Central Depository and Settlement Corporation keeps the electronic record of who holds what, and it settles trades.",
        ],
      },
      {
        type: "p",
        text: "You do not need all three websites open to understand that split. You do need it before you trust a screenshot. A price without the exchange's own time and date is not a fact you can study. Swath therefore shows no prices at all.",
      },
      {
        type: "note",
        text: "Swath teaches this market. It does not recommend a security, forecast a price, or take an order. It is not the NSE, the CMA, or the CDSC.",
      },
    ],
    questions: [
      {
        prompt: "What is the NSE?",
        choices: [
          "Kenya's securities exchange, where listed securities are bought and sold.",
          "The ministry that sets income tax.",
          "A savings account offered by every commercial bank.",
        ],
        answer: 0,
        why: "The exchange is the marketplace. Tax and bank deposits are other systems.",
      },
      {
        prompt: "Why does Swath leave prices off the company cards?",
        choices: [
          "Because listed companies do not have prices.",
          "Because a price without the exchange's own time and date is easy to mistake for a fact.",
          "Because dividends and prices are the same number.",
        ],
        answer: 1,
        why: "A price is real only with its timestamp and its source. This draft would rather show none than show a stale one.",
      },
      {
        prompt: "What is Swath for?",
        choices: [
          "Telling you which share will rise.",
          "Teaching how the market works and how to read a listed company.",
          "Placing a buy order with a broker.",
        ],
        answer: 1,
        why: "The product is study. Orders belong with a licensed broker. Forecasts are outside the draft.",
      },
    ],
    sources: [commonSources.nse, commonSources.nseFaqs, commonSources.cma, commonSources.cdsc],
  },
  {
    slug: "who-does-what",
    title: "Who does what",
    lede: "The CMA, the NSE, and the CDSC are easy to blur together. They are three different jobs.",
    minutes: 5,
    blocks: [
      {
        type: "p",
        text: "The Capital Markets Authority regulates Kenya's capital markets. It licenses stockbrokers and other intermediaries, it sits over public offers, and it can sanction misconduct. It does not run the trading screen, and it does not choose shares for you. Its site is cma.or.ke.",
      },
      {
        type: "p",
        text: "The Nairobi Securities Exchange is the marketplace. Companies list there. Orders meet there. The NSE is also itself a listed company, ticker NSE. That listing does not make the exchange the regulator, and it does not mean the exchange endorses Swath or any other classroom.",
      },
      {
        type: "p",
        text: "The Central Depository and Settlement Corporation operates the Central Depository System. A CDS account is the electronic record of securities held in an investor's name. After a trade, ownership has to move and money has to move. That post-trade work is the CDSC's lane. The CDSC is regulated by the CMA. It is not a broker, and it is not a research desk.",
      },
      {
        type: "h2",
        text: "Where a beginner actually places an order",
      },
      {
        type: "p",
        text: "You buy or sell a listed share through a licensed intermediary: a stockbroker, or another licensee the CMA allows to take that order. Swath cannot take one. The list of licensees changes, so the CMA site is the place to confirm who is licensed, not a forwarded WhatsApp card.",
      },
      {
        type: "note",
        text: "The precise powers of each institution sit in the Capital Markets Act, the Central Depositories Act, and the rules the CMA has approved. You can learn the split above without reading the Acts. You should not guess what an Act says when a real dispute depends on the wording.",
      },
    ],
    questions: [
      {
        prompt: "Who regulates Kenya's capital markets?",
        choices: [
          "The Capital Markets Authority.",
          "The CDSC, acting as a stockbroker.",
          "Whichever bank holds your salary.",
        ],
        answer: 0,
        why: "The CMA is the regulator. The CDSC keeps the depository and settles trades. A commercial bank is not the markets regulator.",
      },
      {
        prompt: "The NSE is listed under the ticker NSE. What does that mean?",
        choices: [
          "The exchange is also a company with shareholders, and it is still the marketplace rather than the regulator.",
          "The exchange has become a government ministry.",
          "Every listed company is endorsed by Swath.",
        ],
        answer: 0,
        why: "A listing means the exchange's own shares trade. It does not move the CMA's job onto the exchange, and it is not an endorsement of this site.",
      },
      {
        prompt: "Who can take an order to buy a listed share?",
        choices: [
          "Any friend who already owns one.",
          "A licensed intermediary. The CMA site is where you confirm the licence.",
          "Swath, from the company card.",
        ],
        answer: 1,
        why: "Orders belong with licensees. Swath is a study desk.",
      },
    ],
    sources: [commonSources.cma, commonSources.nse, commonSources.cdsc, commonSources.nseList],
  },
  {
    slug: "market-segments",
    title: "The market segments",
    lede: "Main, Alternative, Growth, and fixed income. Plus the part everyone skips: the labels are being revised, so you confirm them.",
    minutes: 6,
    blocks: [
      {
        type: "p",
        text: "The NSE does not keep every issuer on one undifferentiated list. Segments exist so a large bank and a small growth company are not pretending to have passed the same front door. The names a beginner still meets in the exchange's own material are the Main Investment Market Segment (MIMS), the Alternative Investment Market Segment (AIMS), the Growth Enterprise Market Segment (GEMS), and the Fixed Income Securities Market Segment.",
      },
      {
        type: "h2",
        text: "What each name is trying to tell you",
      },
      {
        type: "ul",
        items: [
          "Main: larger, established companies. Start here.",
          "Alternative: smaller and mid-sized issuers, on the board the NSE still describes as AIMS.",
          "Growth: smaller companies that listed through GEMS. Use these as later practice.",
          "Fixed income: bonds and similar debt. You are a lender, not an owner.",
        ],
      },
      {
        type: "p",
        text: "Kenya's Public Offers, Listing and Disclosures Regulations, 2023 reworked those segments, including a main market and an SME market. The NSE said AIMS and GEMS issuers would be moved to the segment they qualify for. The exchange's own pages have not all switched to one vocabulary. Some still say AIMS. The FAQs still name GEMS.",
      },
      {
        type: "note",
        text: "When Swath and nse.co.ke disagree about a company's segment, the NSE page wins. Write down the date you looked. A label without a date is how a revised rule turns into a confident mistake.",
      },
      {
        type: "p",
        text: "Two more shelves sit beside ordinary shares, and this draft only defines them. A REIT is a listed real-estate trust. An ETF is a fund that trades on the exchange and holds a basket. The NSE also has a derivatives market. Derivatives, REITs, and ETFs are real. They are a later study, because they are easier to misunderstand than an ordinary share in a company whose product you already know.",
      },
    ],
    questions: [
      {
        prompt: "Why does Swath tell you to confirm a segment on the NSE site?",
        choices: [
          "Because the listing rules were revised, and the exchange's own pages still use more than one set of names.",
          "Because segments are a type of bank account.",
          "Because MIMS, AIMS, and GEMS are three tickers for Safaricom.",
        ],
        answer: 0,
        why: "The 2023 regulations changed the map, and the public pages have not all been rewritten the same way. The check is part of the lesson.",
      },
      {
        prompt: "A bond is best described as:",
        choices: [
          "An ordinary share with a nickname.",
          "A loan to an issuer, on the terms of that specific bond.",
          "A promise that a share price will not fall.",
        ],
        answer: 1,
        why: "Holding a bond makes you a lender. The terms are in the issue documents, and they differ by bond.",
      },
      {
        prompt: "Where should a first study company come from?",
        choices: [
          "The Main segment, where the business is easier to describe.",
          "A derivatives contract.",
          "Whichever name is trending in a group chat.",
        ],
        answer: 0,
        why: "The Main segment is the classroom. Smaller listings and derivatives can wait until the basic method feels ordinary.",
      },
    ],
    sources: [commonSources.nseMims, commonSources.nseAims, commonSources.nseFaqs, commonSources.nseList],
  },
  {
    slug: "shares-and-dividends",
    title: "Shares and dividends",
    lede: "Ownership, cash distributions, and the moment people mix up the company with the market.",
    minutes: 5,
    blocks: [
      {
        type: "p",
        text: "An ordinary share is a unit of ownership in the company that issued it. You do not own the company's buildings outright, and you do not own a slice of its next product in your kitchen. You own the share, with the rights that class of share carries. Preference shares are a different class. Kenya Power, for example, has preference shares listed separately from the ordinary share KPLC. If the code is not exactly the ticker on the card, it is not the same security.",
      },
      {
        type: "p",
        text: "A dividend is a distribution the company declares. It is often cash. It can also be zero for years. Nothing in a listing requires a dividend. People sometimes divide the dividend by the share price and call the result a yield. That arithmetic is only as fresh as both inputs, and both need dates. This draft does not compute yields, on purpose.",
      },
      {
        type: "h2",
        text: "When the company receives money, and when it does not",
      },
      {
        type: "p",
        text: "At an IPO, the company sells shares to the public and receives the issue proceeds, after costs. In a rights issue, the company offers new shares to existing holders, usually at a stated price, and the circular explains the choices. Once shares are trading between investors on the exchange, the money moves between those investors. The company does not receive a cheque because two strangers traded its shares on a Tuesday.",
      },
      {
        type: "p",
        text: "Bonus issues, splits, and rights issues are corporate actions. Each one is defined by its announcement. The word in a headline is not the terms. Read the notice, note the dates, and ignore any summary that cannot point at the notice.",
      },
      {
        type: "note",
        text: "A share can pay no dividend and still be a share. A dividend is not interest, and it is not a salary. It is declared, or it is not.",
      },
    ],
    questions: [
      {
        prompt: "An ordinary share is:",
        choices: [
          "A unit of ownership in the company that issued it.",
          "A loan the company must repay on a fixed date.",
          "The same thing as a CDS account.",
        ],
        answer: 0,
        why: "The share is ownership of that class of share. A bond is the loan. The CDS account is the record that holds the security.",
      },
      {
        prompt: "Which statement about dividends is accurate?",
        choices: [
          "Every listed company must pay one each year.",
          "A dividend is declared by the company, and it can be zero.",
          "The dividend and the share price are required to match.",
        ],
        answer: 1,
        why: "Declaration is a decision. There is no rule on this page that turns a listing into a guaranteed payment.",
      },
      {
        prompt: "When two investors trade a listed share on the NSE, who usually receives the money?",
        choices: [
          "The company, as if it were a new issue.",
          "The selling investor. The company receives money when it issues new shares.",
          "The Capital Markets Authority, as a fee equal to the price.",
        ],
        answer: 1,
        why: "Secondary-market trades are between investors. The company receives issue proceeds at an IPO, a rights issue, or another new issue.",
      },
    ],
    sources: [commonSources.nseFaqs, commonSources.nseList, commonSources.cdsc],
  },
  {
    slug: "the-cds-account",
    title: "The CDS account",
    lede: "The electronic record of what you hold, who opens it, and why Swath will not invent the form for you.",
    minutes: 5,
    blocks: [
      {
        type: "p",
        text: "A CDS account is an electronic account in the Central Depository System. Listed shares are held there in the investor's name. The Central Depository and Settlement Corporation operates that system. It is also the institution that clears and settles equity and corporate-bond transactions on the NSE.",
      },
      {
        type: "p",
        text: "You open the account through a Central Depository Agent. That is a licensed stockbroker, investment bank, or custodian bank. The CDSC also publishes its own digital channels, including the Dosikaa app, and the steps sit on the CDSC account-opening page. Swath does not copy those steps. A copied form, a copied fee, or a copied minimum amount is the first thing to go stale.",
      },
      {
        type: "h2",
        text: "What settlement is",
      },
      {
        type: "p",
        text: "A trade is agreed on the exchange. Settlement is the later moment when the securities and the money actually move. The number of business days is a published market rule. Learn the idea here, and read the NSE or CDSC page for the current number. A remembered cycle from a blog is not the rule.",
      },
      {
        type: "ul",
        items: [
          "The account is the record. It is not the decision to buy.",
          "The agent is the licensed door. A forwarded link is not an agent.",
          "Statements and the official channels are described by the CDSC, not by this lesson.",
        ],
      },
      {
        type: "note",
        text: "If a sentence on this page and a sentence on cdsckenya.com disagree, follow the CDSC page. It is their system.",
      },
    ],
    questions: [
      {
        prompt: "What does the CDSC do in this market?",
        choices: [
          "It chooses shares for beginners.",
          "It keeps the electronic record of holdings and clears and settles listed trades.",
          "It sets income-tax bands.",
        ],
        answer: 1,
        why: "The CDSC is the depository and the settlement institution. Selection of shares is not its job, and tax bands are not either.",
      },
      {
        prompt: "A Central Depository Agent is:",
        choices: [
          "Any person who already has a CDS account.",
          "A licensed stockbroker, investment bank, or custodian through whom an account is opened.",
          "A Swath company card.",
        ],
        answer: 1,
        why: "Agents are licensed institutions. The CDSC publishes the current routes, including its own app.",
      },
      {
        prompt: "Where should you read the current opening steps?",
        choices: [
          "On the CDSC account-opening page, because steps and amounts change.",
          "In a screenshot with no date.",
          "In this lesson, treated as a form.",
        ],
        answer: 0,
        why: "This lesson explains the idea. The procedure belongs to the institution that runs the system.",
      },
    ],
    sources: [commonSources.cdsc, commonSources.cdscOpen, commonSources.cma, commonSources.nse],
  },
  {
    slug: "how-to-study-a-company",
    title: "How to study a company",
    lede: "Three checks, in the same order, on every card. The point is a habit, not a verdict.",
    minutes: 6,
    blocks: [
      {
        type: "p",
        text: "Pick one company. Safaricom is a fair first choice because many Kenyans already know the brand, so the report is easier to connect to ordinary life. Knowing the brand is not research. It only means the first page will feel familiar.",
      },
      {
        type: "h2",
        text: "The three checks",
      },
      {
        type: "ul",
        items: [
          "Find the ticker on the NSE listed-companies page. Write the segment printed there, and the date you looked.",
          "Open the latest annual report. Copy one sentence, in the company's own words, about what it sells or does.",
          "Read the newest NSE announcement for that issuer. Note a dividend, a caution, a change of name, or the fact of nothing new. Write that date too.",
        ],
      },
      {
        type: "p",
        text: "Stop there on the first pass. You now know the identity of the security, the company's description of itself, and whether the public record has moved lately. People get into trouble by skipping to a target price somewhere between step one and step two.",
      },
      {
        type: "h2",
        text: "What the numbers are, before anyone turns them into a ratio",
      },
      {
        type: "p",
        text: "Revenue is what the business sold. Profit is what remained after the costs the accounts recognise. A dividend is cash or other value actually declared. These are three different facts. A ratio that mixes them with a share price is a calculation, and the calculation dies when any input is old. Swath does not print those ratios.",
      },
      {
        type: "p",
        text: "Insurance groups and investment companies take a second pass. An insurer's report is harder than a bank's. An investment company owns other businesses, so you are reading a stack of them. Kenya Re is insurance for insurers. Leave it until a straightforward company feels clear.",
      },
      {
        type: "note",
        text: "Finishing the three checks does not produce a buy or a sell. It produces a short list of what you still do not know. That list is the result.",
      },
    ],
    questions: [
      {
        prompt: "What is the first check?",
        choices: [
          "Ask a group chat which segment the company is in.",
          "Find the ticker on the NSE list and write down the segment printed there today.",
          "Memorise the advertising slogan.",
        ],
        answer: 1,
        why: "Identity comes from the exchange's list, with a date. A slogan is marketing.",
      },
      {
        prompt: "Which sentence belongs in your notes?",
        choices: [
          "A sentence from the annual report, in the company's words, about what it does.",
          "This share is about to double.",
          "The highest price in the last ten years, with no date attached.",
        ],
        answer: 0,
        why: "The report is the company speaking. A forecast and an undated price are not descriptions of the business.",
      },
      {
        prompt: "The three checks are finished when you can:",
        choices: [
          "Name a target price.",
          "Say what the company does, which security you mean, and what the latest notice said.",
          "Skip the annual report next time.",
        ],
        answer: 1,
        why: "The method produces understanding and a list of gaps. It does not replace the report, and it does not produce an order.",
      },
    ],
    sources: [commonSources.nseList, commonSources.nse, commonSources.cma],
  },
  {
    slug: "what-can-go-wrong",
    title: "What can go wrong",
    lede: "The short list of ways a confident beginner loses the plot. None of them require a villain.",
    minutes: 5,
    blocks: [
      {
        type: "p",
        text: "A share price can fall. A company can pass the dividend. A listing can be suspended, and the only reliable description of that halt is the exchange's notice. You can also misunderstand a true report. Most damage in a first year comes from the last one: a true document, read too fast, then repeated as a tip.",
      },
      {
        type: "p",
        text: "A famous brand is not a research method. Kenya Airways is a listed airline, and it is also a reminder that a name you know from the airport can be a complicated company. Read the report and the notices. Do not let the livery do the work.",
      },
      {
        type: "h2",
        text: "Thin information",
      },
      {
        type: "p",
        text: "Smaller listings can go quiet. Fewer reports get written about them, trading can be light, and the business itself can change. Home Afrika, Flame Tree, and Nairobi Business Ventures are on the study list for that reason. If you cannot explain how the company makes money after reading the latest report, leave it. Swath will not fill the silence with a suggestion.",
      },
      {
        type: "ul",
        items: [
          "A social-media tip has no segment, no date, and no annual report.",
          "A suspended security is a status, published by the NSE. Inventing the reason is how rumours start.",
          "Control of a company can change in a takeover. Bamburi is a useful reminder to read the latest announcement before you describe who owns a business.",
          "The Government of Kenya is a major shareholder in KenGen. The percentage is a fact in the report, not a number to memorise from a classroom.",
        ],
      },
      {
        type: "note",
        text: "If Swath is wrong, the official page still wins. This draft would rather send you there than smooth over a conflict.",
      },
    ],
    questions: [
      {
        prompt: "A household name on the NSE:",
        choices: [
          "Cannot fall in price.",
          "Can still be a complicated company. The brand is not the research.",
          "Is insured against loss by the exchange.",
        ],
        answer: 1,
        why: "Recognition makes the first page easier to read. It says nothing about the next report.",
      },
      {
        prompt: "A trading suspension means:",
        choices: [
          "The price is guaranteed to recover the next morning.",
          "Trading is halted, and the NSE notice is the status to read.",
          "Your CDS account has been closed.",
        ],
        answer: 1,
        why: "The notice is the fact. A recovery story and a closed account are different events, and neither is implied by the word suspension on its own.",
      },
      {
        prompt: "If the latest report still leaves you unable to explain the business, you should:",
        choices: [
          "Buy a small amount so you will feel motivated to learn.",
          "Leave it, and study a clearer company. Swath will not supply a tip to fill the gap.",
          "Ask for a target price.",
        ],
        answer: 1,
        why: "An order is not a study technique. The gap is the result. Closing it with a forecast is the failure mode.",
      },
    ],
    sources: [commonSources.nseList, commonSources.nse, commonSources.cma],
  },
  {
    slug: "facts-and-opinions",
    title: "Facts, calculations, and opinions",
    lede: "The sorting rule that keeps a study note from turning into a rumour.",
    minutes: 4,
    blocks: [
      {
        type: "p",
        text: "A fact can be checked against a document with a date. SCOM is the ticker for Safaricom's ordinary shares on the NSE. That is a fact for as long as the exchange's list says so. You re-check it when the date matters.",
      },
      {
        type: "p",
        text: "A calculation is arithmetic on top of facts. A dividend divided by a price is a calculation. Change either input and the result changes. If the price has no timestamp, the calculation has no date, and an undated calculation behaves like a rumour.",
      },
      {
        type: "p",
        text: "An opinion is a judgement: the business is easier to understand than another business, the report is long, the segment label looks stale. Opinions are allowed in a classroom. They have to wear a name tag. Swath's opinion is that beginners should start on the Main segment. That is a teaching choice, not a fact about future prices.",
      },
      {
        type: "h2",
        text: "The sentence Swath will not say",
      },
      {
        type: "ul",
        items: [
          "This share will be higher by December.",
          "You should buy this and not that.",
          "The dividend is safe.",
          "A thin listing is a bargain because few people are watching it.",
        ],
      },
      {
        type: "p",
        text: "There is no chat box on this draft. A box that can talk beyond these notes will eventually produce one of those sentences and sound calm while it does it. Search in the header looks through the lessons, the glossary, the markets, and the study list. If the notes do not contain it, the search says so. That is the whole machine.",
      },
      {
        type: "note",
        text: "Confidence is not a source. A date and a document are a source. When they conflict with Swath, keep the document.",
      },
    ],
    questions: [
      {
        prompt: "\"SCOM is the NSE ticker for Safaricom's ordinary shares\" is:",
        choices: [
          "A checkable fact, for as long as the exchange's list agrees.",
          "A forecast.",
          "A recommendation.",
        ],
        answer: 0,
        why: "You can open the list and see the code. You re-check it when you need today's label.",
      },
      {
        prompt: "\"This share will be higher in December\" is:",
        choices: [
          "A fact, if it is said with confidence.",
          "A forecast. Swath does not make those.",
          "A dividend.",
        ],
        answer: 1,
        why: "A future price is not a document. Tone of voice does not promote it.",
      },
      {
        prompt: "A yield worked out from a dividend and a price is:",
        choices: [
          "True forever, once calculated.",
          "A calculation that is only as fresh as its inputs, which need dates.",
          "Something Swath prints on every company card.",
        ],
        answer: 1,
        why: "Arithmetic inherits the age of its inputs. This draft leaves the arithmetic off the cards.",
      },
    ],
    sources: [commonSources.nseList, commonSources.cma, commonSources.nseFaqs],
  },
];

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function lessonNeighbors(slug: string) {
  const index = lessons.findIndex((lesson) => lesson.slug === slug);
  return {
    index,
    prev: index > 0 ? lessons[index - 1] : undefined,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined,
  };
}
