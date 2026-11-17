import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <p className="text-sm font-semibold text-green">404</p>
      <h1 className="mt-3 font-serif text-5xl leading-tight">This page is not on the study desk.</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        The link may be old, or the name may be misspelled. The markets, the company list, and the lessons are still here.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="inline-flex h-12 items-center rounded-full bg-green px-5 text-sm font-semibold text-white">
          Go home
        </Link>
        <Link href="/companies" className="inline-flex h-12 items-center rounded-full border border-line bg-white px-5 text-sm font-semibold">
          Find a company
        </Link>
      </div>
    </div>
  );
}
