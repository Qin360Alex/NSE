"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { openNina, openSearch } from "@/lib/nina";

export function AskNinaButton({
  question,
  label = "Ask Nina",
  className = "btn btn-ghost border-nina/40 text-nina hover:border-nina/70! hover:bg-nina/10!",
}: {
  question?: string;
  label?: string;
  className?: string;
}) {
  return (
    <button type="button" className={className} onClick={() => openNina(question)}>
      <Icon name="sparkle" className="h-4 w-4" />
      {label}
    </button>
  );
}

export function OpenSearchButton({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => openSearch()}>
      {children}
    </button>
  );
}
