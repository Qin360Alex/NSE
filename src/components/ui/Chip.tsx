import type { ReactNode } from "react";

export type ChipTone = "neutral" | "ice" | "gold" | "mint" | "coral" | "nina";

export function Chip({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: ChipTone;
  children: ReactNode;
  className?: string;
}) {
  const toneClass = tone === "neutral" ? "" : `chip-${tone}`;
  return <span className={`chip ${toneClass} ${className}`}>{children}</span>;
}
