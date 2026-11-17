"use client";

import { useSyncExternalStore } from "react";
import { loadCompleted, toggleCompleted } from "@/lib/progress";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("swath-progress", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("swath-progress", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function readCompleted() {
  return loadCompleted().join("\n");
}

function useCompleted() {
  const value = useSyncExternalStore(subscribe, readCompleted, () => "");
  if (value.length === 0) return [];
  return value.split("\n");
}

export function ProgressSummary({ total }: { total: number }) {
  const count = useCompleted().length;
  return (
    <p className="text-sm text-ink">
      {count} of {total} lessons marked read on this device.
    </p>
  );
}

export function DoneFlag({ slug }: { slug: string }) {
  const done = useCompleted().includes(slug);
  if (!done) return null;
  return <span className="text-sm font-semibold text-green">Read on this device</span>;
}

export function MarkRead({ slug }: { slug: string }) {
  const done = useCompleted().includes(slug);
  return (
    <button
      type="button"
      onClick={() => toggleCompleted(slug)}
      className="inline-flex h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-semibold"
    >
      {done ? "Marked as read · clear" : "Mark this lesson as read"}
    </button>
  );
}
