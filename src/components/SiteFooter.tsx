import Link from "next/link";
import { SwathLogo } from "@/components/brand/SwathMark";
import { OutLink } from "@/components/OutLink";
import { ArcBackdrop } from "@/components/ui/ArcBackdrop";
import { links, reviewed } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-chrome relative mt-24 overflow-hidden border-t border-hair bg-deep/80">
      <ArcBackdrop className="absolute -right-24 -bottom-40 h-112 w-md opacity-60" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <SwathLogo />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">
            A study desk for Kenyans learning the Nairobi Securities Exchange. Education only. Swath does not advise,
            recommend, trade, or forecast prices. It is not endorsed by the NSE, the CMA, or the CDSC.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="chip">Not investment advice</span>
            <span className="chip">Notes reviewed {reviewed}</span>
          </div>
        </div>
        <div>
          <p className="eyebrow">On this site</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link className="link" href="/learn">Lessons</Link></li>
            <li><Link className="link" href="/markets">Markets</Link></li>
            <li><Link className="link" href="/companies">Study companies</Link></li>
            <li><Link className="link" href="/glossary">Glossary</Link></li>
            <li><Link className="link" href="/desk">Your desk</Link></li>
            <li><Link className="link" href="/about">About Swath</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Official sources</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><OutLink href={links.nse}>Nairobi Securities Exchange</OutLink></li>
            <li><OutLink href={links.cma}>Capital Markets Authority</OutLink></li>
            <li><OutLink href={links.cdsc}>CDSC</OutLink></li>
            <li><OutLink href={links.cbk}>Central Bank of Kenya</OutLink></li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-hair">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-faint sm:px-8">
          Progress you make on Swath stays in this browser. Nothing is sent anywhere.
        </p>
      </div>
    </footer>
  );
}
