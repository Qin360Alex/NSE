import { ArcBackdrop } from "@/components/ui/ArcBackdrop";
import { Icon } from "@/components/ui/Icon";

/* The landing mockup's tilted phone, rebuilt in HTML/CSS and showing a study session instead of a balance. */
export function HeroArt() {
  return (
    <div className="relative mx-auto h-136 w-full max-w-120" aria-hidden="true">
      <ArcBackdrop className="absolute inset-0 h-full w-full" />
      <span className="absolute top-[22%] left-[6%] h-2 w-2 rounded-full bg-ice shadow-[0_0_12px_#a8dbff]" />
      <span className="absolute top-[48%] left-[18%] h-2.5 w-2.5 rounded-full bg-mint/80 shadow-[0_0_12px_#5bd6a0]" />
      <span className="absolute right-[6%] bottom-[24%] h-2 w-2 rounded-full bg-ice shadow-[0_0_12px_#a8dbff]" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[8deg]">
        <div className="phone">
          <div className="mx-auto -mt-1 mb-3 h-5 w-20 rounded-full bg-black" />
          <div className="flex items-center justify-between text-[0.65rem] text-muted">
            <span className="font-mono">9:41</span>
            <span className="font-display text-xs font-semibold text-fg">Swath</span>
            <span className="flex gap-0.5">
              <i className="h-1.5 w-1.5 rounded-full bg-muted" />
              <i className="h-1.5 w-1.5 rounded-full bg-muted" />
            </span>
          </div>

          <p className="mt-4 text-[0.65rem] text-gold">Habari za asubuhi</p>
          <div className="mt-2 flex items-center gap-3">
            <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0">
              <circle cx="32" cy="32" r="26" fill="none" stroke="rgb(168 219 255 / 0.15)" strokeWidth="6" />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="#a8dbff"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="61 163"
                transform="rotate(-90 32 32)"
              />
              <text x="32" y="37" textAnchor="middle" fill="#eef3f8" fontSize="14" fontWeight="600">
                3/8
              </text>
            </svg>
            <div className="min-w-0 text-[0.65rem] leading-snug text-muted">
              <span className="block font-display text-xs font-semibold text-fg">The market segments</span>
              Lesson 3 · 6 min
            </div>
          </div>

          <svg viewBox="0 0 200 60" className="mt-3 w-full">
            <defs>
              <linearGradient id="hero-phone-line" x1="0" x2="1">
                <stop offset="0" stopColor="#a8dbff" />
                <stop offset="0.6" stopColor="#a8dbff" />
                <stop offset="1" stopColor="#e9b872" />
              </linearGradient>
            </defs>
            <path
              d="M4 54C24 54 28 38 44 40S70 26 88 30 116 18 132 22 168 8 196 6"
              fill="none"
              stroke="url(#hero-phone-line)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="88" cy="30" r="4" fill="#e9b872" />
          </svg>

          <div className="mt-2 flex flex-wrap gap-1">
            {["Basics", "Markets", "Companies"].map((label) => (
              <span
                key={label}
                className={`rounded-full border px-2 py-1 text-[0.58rem] ${
                  label === "Markets" ? "border-ice bg-ice text-ink" : "border-hair-strong text-muted"
                }`}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="mt-3 rounded-xl border border-nina/30 bg-nina/10 p-2.5 text-[0.62rem] leading-snug">
            <p className="flex items-center gap-1 font-semibold text-nina">
              <Icon name="sparkle" className="h-3 w-3" />
              What is a CDS account?
            </p>
            <p className="mt-1 text-muted">
              The electronic record of the shares you hold, kept by the CDSC and opened through a licensed agent.
            </p>
            <p className="mt-1.5 inline-block rounded border border-dashed border-hair-strong px-1.5 py-0.5 font-mono text-[0.52rem] text-muted">
              <b className="font-medium text-ice">CDSC</b> · 17 Nov 2026
            </p>
          </div>

          <div className="absolute inset-x-3 bottom-3 flex items-center justify-around rounded-2xl border border-hair bg-white/3 py-2 text-muted">
            <Icon name="desk" className="h-4 w-4 text-ice" />
            <Icon name="book" className="h-4 w-4" />
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ice text-ink">
              <Icon name="search" className="h-3.5 w-3.5" />
            </span>
            <Icon name="bank" className="h-4 w-4" />
            <Icon name="type" className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="float-chip glass glass-blur top-[12%] left-0 sm:-left-4">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-ice/15 font-mono text-xs text-ice">4</span>
        market shelves
      </div>
      <div className="float-chip glass glass-blur right-0 bottom-[26%] -rotate-3 sm:-right-4">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-mint/15 text-mint">
          <Icon name="check" className="h-4 w-4" />
        </span>
        The CMA is not the NSE
      </div>
      <div className="float-chip glass glass-blur bottom-[4%] left-[2%] rotate-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-gold/15 font-mono text-xs text-gold">8</span>
        short lessons
      </div>
    </div>
  );
}
