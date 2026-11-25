/* The logo's double arc scaled up as a decorative backdrop. Always partial, never a full circle. */

export function ArcBackdrop({ className = "", broken = false }: { className?: string; broken?: boolean }) {
  return (
    <svg viewBox="0 0 400 400" className={`pointer-events-none ${className}`} aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round" className="stroke-ice">
        <path d="M28 372A176 176 0 0 1 292 90" strokeWidth="9" strokeOpacity="0.22" />
        <path d="M54 372A150 150 0 0 1 282 114" strokeWidth="2.5" strokeOpacity="0.2" />
        {broken ? (
          <path d="M346 196A176 176 0 0 1 380 372" strokeWidth="9" strokeOpacity="0.12" strokeDasharray="2 18" />
        ) : (
          <>
            <path d="M330 128A176 176 0 0 1 380 372" strokeWidth="9" strokeOpacity="0.22" />
            <path d="M318 150A150 150 0 0 1 354 372" strokeWidth="2.5" strokeOpacity="0.2" />
          </>
        )}
      </g>
      <path d="M40 350 396 36 254 372Z" className="fill-ice" fillOpacity="0.045" />
    </svg>
  );
}

/* Small segment glyph: more arcs for the more established shelf. */
export function ShelfGlyph({ level, className = "h-10 w-14" }: { level: 0 | 1 | 2 | 3; className?: string }) {
  if (level === 0) {
    return (
      <svg viewBox="0 0 56 40" className={className} aria-hidden="true" focusable="false">
        <g fill="none" strokeLinecap="round" className="stroke-gold">
          <path d="M6 30h44" strokeWidth="2.5" />
          <path d="M6 22h44" strokeWidth="1.5" strokeDasharray="3 5" opacity="0.7" />
          <circle cx="44" cy="30" r="3" className="fill-gold" />
        </g>
      </svg>
    );
  }
  const radii = [26, 19, 12].slice(0, level);
  return (
    <svg viewBox="0 0 56 40" className={className} aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round" className="stroke-ice">
        {radii.map((r, index) => (
          <path
            key={r}
            d={`M${28 - r} 36A${r} ${r} 0 0 1 ${28 + r} 36`}
            strokeWidth={index === 0 ? 3 : 2}
            strokeOpacity={1 - index * 0.25}
          />
        ))}
      </g>
    </svg>
  );
}
