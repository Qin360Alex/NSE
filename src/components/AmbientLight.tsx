"use client";

import { useEffect } from "react";

/* Window light from the Habari mockup. It warms or cools with the time of day. */
function daypart(hour: number) {
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 16) return "day";
  if (hour >= 16 && hour < 20) return "evening";
  return "night";
}

export function AmbientLight() {
  useEffect(() => {
    function apply() {
      document.documentElement.dataset.daypart = daypart(new Date().getHours());
    }
    apply();
    const id = window.setInterval(apply, 10 * 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-window" />
    </div>
  );
}
