"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <h1 className="font-serif text-5xl leading-tight">This page hit a problem.</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        The study notes are still available from the menu. Trying the page again usually clears a temporary fault.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex h-12 items-center rounded-full bg-green px-5 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}
