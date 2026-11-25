import type { Source } from "./types";

export const reviewed = "17 November 2026";
export const reviewedShort = "17 Nov 2026";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Short institution name for a source link, shown in bold on a source stamp. */
export function sourceOrg(href: string) {
  try {
    const host = new URL(href).hostname.replace(/^www\./, "");
    if (host.endsWith("nse.co.ke")) return "NSE";
    if (host.endsWith("cma.or.ke")) return "CMA";
    if (host.endsWith("cdsckenya.com")) return "CDSC";
    if (host.endsWith("centralbank.go.ke")) return "CBK";
    return host;
  } catch {
    return "Source";
  }
}

export const links = {
  nse: "https://www.nse.co.ke/",
  nseCompanies: "https://www.nse.co.ke/listed-companies/",
  nseMims: "https://www.nse.co.ke/main-investment-market-segment/",
  nseAims: "https://www.nse.co.ke/alternative-investment-market-segment/",
  nseFaqs: "https://www.nse.co.ke/faqs/",
  cma: "https://www.cma.or.ke/",
  cdsc: "https://cdsckenya.com/",
  cdscOpen: "https://cdsckenya.com/account-opening/",
  cbk: "https://www.centralbank.go.ke/",
} as const;

export const commonSources = {
  nseList: {
    label: "NSE listed companies",
    href: links.nseCompanies,
  },
  nseMims: {
    label: "NSE Main Investment Market Segment",
    href: links.nseMims,
  },
  nseAims: {
    label: "NSE Alternative Investment Market Segment",
    href: links.nseAims,
  },
  nseFaqs: {
    label: "NSE public education FAQs",
    href: links.nseFaqs,
  },
  cma: {
    label: "Capital Markets Authority",
    href: links.cma,
  },
  cdsc: {
    label: "Central Depository and Settlement Corporation",
    href: links.cdsc,
  },
  cdscOpen: {
    label: "CDSC account opening",
    href: links.cdscOpen,
  },
  cbk: {
    label: "Central Bank of Kenya",
    href: links.cbk,
  },
  nse: {
    label: "Nairobi Securities Exchange",
    href: links.nse,
  },
} satisfies Record<string, Source>;
