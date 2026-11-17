import type { ReactNode } from "react";

export function OutLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a className="link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
