import Link from "next/link";
import { ArcBackdrop } from "@/components/ui/ArcBackdrop";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <ArcBackdrop broken className="absolute top-0 -right-16 h-112 w-md sm:right-0" />
      <div className="relative max-w-2xl">
        <p className="font-mono text-7xl font-medium text-ice/80 [text-shadow:0_0_30px_rgb(168_219_255/0.4)]">404</p>
        <h1 className="display-lg mt-6">This page is not on the study desk.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          The link may be old, or the name may be misspelled. The markets, the company list, and the lessons are still
          here.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Go home
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
          <Link href="/companies" className="btn btn-ghost">
            Find a company
          </Link>
        </div>
      </div>
    </div>
  );
}
