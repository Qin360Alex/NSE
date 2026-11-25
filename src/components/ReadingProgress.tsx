"use client";

import { useEffect, useRef } from "react";

/* A thin ice-to-gold bar under the header that fills as you read. */
export function ReadingProgress() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="no-print pointer-events-none fixed inset-x-0 top-16 z-30 h-0.5" aria-hidden="true">
      <span
        ref={barRef}
        className="block h-full origin-left bg-gradient-to-r from-ice to-gold shadow-[0_0_10px_rgb(233_184_114/0.7)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
