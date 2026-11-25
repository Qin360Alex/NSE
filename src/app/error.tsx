"use client";

import { useEffect } from "react";
import { ArcBackdrop } from "@/components/ui/ArcBackdrop";
import { Icon } from "@/components/ui/Icon";

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <ArcBackdrop broken className="absolute top-0 -right-16 h-112 w-md sm:right-0" />
      <div className="relative max-w-2xl">
        <p className="eyebrow text-coral!">Something went wrong</p>
        <h1 className="display-lg mt-5">This page hit a problem.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          The study notes are still available from the menu. Trying the page again usually clears a temporary fault.
        </p>
        <button type="button" onClick={() => retry()} className="btn btn-primary mt-10">
          <Icon name="reset" className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
