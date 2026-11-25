/*
  The Swath mark, redrawn as a vector from design/reference/swathLogo.jpeg:
  an ice-blue double arc broken at the upper right, and a white swoosh
  made of fanned blades that cuts up through the gap.
*/

const blades: [number, number][] = [
  [10, 19],
  [22, 30],
  [33, 41],
  [44, 52],
  [55, 66],
];

function bladeY(x: number) {
  return 68 + ((x - 10) * 4) / 56;
}

export function SwathMark({ className = "h-7 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round" className="stroke-ice">
        <path d="M8 72A52 52 0 0 1 86 26" strokeWidth="5.5" />
        <path d="M18 72A42 42 0 0 1 80 35" strokeWidth="2.6" opacity="0.8" />
        <path d="M99 38A52 52 0 0 1 112 72" strokeWidth="5.5" />
        <path d="M94 45A42 42 0 0 1 102 72" strokeWidth="2.6" opacity="0.8" />
      </g>
      {blades.map(([a, b], index) => (
        <path
          key={a}
          d={`M117 7L${a} ${bladeY(a).toFixed(2)}L${b} ${bladeY(b).toFixed(2)}Z`}
          fill={index === 0 ? "#ffffff" : index < 3 ? "#e4f3ff" : "#a8dbff"}
          opacity={1 - index * 0.08}
        />
      ))}
    </svg>
  );
}

export function SwathLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const mark = size === "lg" ? "h-10 w-14" : size === "sm" ? "h-6 w-9" : "h-7 w-10";
  const word = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  return (
    <span className="inline-flex items-center gap-2.5">
      <SwathMark className={mark} />
      <span className={`wordmark ${word} leading-none text-fg`}>SWATH</span>
    </span>
  );
}
