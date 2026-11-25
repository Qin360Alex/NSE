import { links } from "@/lib/site";

const sources = [
  { short: "NSE", name: "Nairobi Securities Exchange", href: links.nse },
  { short: "CMA", name: "Capital Markets Authority", href: links.cma },
  { short: "CDSC", name: "Central Depository and Settlement Corporation", href: links.cdsc },
  { short: "CBK", name: "Central Bank of Kenya", href: links.cbk },
];

/* Where the mockup had partner logos. Plain wordmarks, because real logos would suggest an endorsement. */
export function SourceStrip() {
  return (
    <div className="border-y border-hair bg-white/1.5">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-6 sm:px-8 md:flex-row md:justify-between">
        <p className="eyebrow text-center text-faint! md:text-left">Read from official sources · not endorsed by them</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {sources.map((source) => (
            <li key={source.short}>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                title={source.name}
                className="font-display text-lg font-bold tracking-[0.12em] text-[#8696a8] transition-colors hover:text-ice"
              >
                {source.short}
                <span className="sr-only"> ({source.name}, opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
