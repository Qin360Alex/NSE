import { Breadcrumbs } from "@/components/Breadcrumbs";

export function PageIntro({
  kicker,
  title,
  lede,
  crumbs,
}: {
  kicker: string;
  title: string;
  lede: string;
  crumbs?: { href?: string; label: string }[];
}) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {crumbs ? (
          <div className="mb-6">
            <Breadcrumbs items={crumbs} />
          </div>
        ) : null}
        <p className="text-sm font-semibold text-green">{kicker}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
      </div>
    </header>
  );
}
