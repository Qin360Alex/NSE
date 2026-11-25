import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArcBackdrop } from "@/components/ui/ArcBackdrop";

export function PageIntro({
  kicker,
  title,
  lede,
  crumbs,
  meta,
  aside,
  titleClassName = "display-lg",
}: {
  kicker: string;
  title: string;
  lede: string;
  crumbs?: { href?: string; label: string }[];
  meta?: ReactNode;
  aside?: ReactNode;
  titleClassName?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-hair">
      <ArcBackdrop className="absolute -top-24 -right-28 h-120 w-120 opacity-70 sm:-right-16" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pt-10 pb-12 sm:px-8 sm:pt-14 sm:pb-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="fade-up min-w-0">
          {crumbs ? (
            <div className="mb-8">
              <Breadcrumbs items={crumbs} />
            </div>
          ) : null}
          <p className="eyebrow">{kicker}</p>
          <h1 className={`mt-4 max-w-3xl ${titleClassName}`}>{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
          {meta ? <div className="mt-6 flex flex-wrap items-center gap-2">{meta}</div> : null}
        </div>
        {aside ? <div className="fade-up min-w-0 lg:w-80">{aside}</div> : null}
      </div>
    </header>
  );
}
