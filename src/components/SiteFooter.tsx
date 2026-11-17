import Link from "next/link";
import { OutLink } from "@/components/OutLink";
import { links, reviewed } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl">Swath</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink">
            A study desk for Kenyans learning the Nairobi Securities Exchange. Education only. Swath does not advise, recommend, trade, or forecast prices. It is not endorsed by the NSE, the CMA, or the CDSC.
          </p>
          <p className="mt-3 text-sm text-muted">Notes reviewed {reviewed}.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-green">On this site</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="link" href="/learn">Lessons</Link></li>
            <li><Link className="link" href="/markets">Markets</Link></li>
            <li><Link className="link" href="/companies">Study companies</Link></li>
            <li><Link className="link" href="/glossary">Glossary</Link></li>
            <li><Link className="link" href="/about">About this draft</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-green">Official sources</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><OutLink href={links.nse}>Nairobi Securities Exchange</OutLink></li>
            <li><OutLink href={links.cma}>Capital Markets Authority</OutLink></li>
            <li><OutLink href={links.cdsc}>CDSC</OutLink></li>
            <li><OutLink href={links.cbk}>Central Bank of Kenya</OutLink></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
